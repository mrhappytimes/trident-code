#!/usr/bin/env node
/**
 * pulse-check.js — SessionStart hook that fetches system-pulse.md and surfaces
 * any red invariants in session context.
 *
 * v2 (2026-05-06): Switched from raw.githubusercontent.com (public-only) to
 * `gh api` (handles private repos via local gh CLI auth). The pulse.md is now
 * committed by .github/workflows/system-heartbeat.yml in ai-ops-user/ouroboros-dashboard
 * (private). The local user's gh CLI is authenticated for that repo.
 *
 * Times out at 6s — never blocks session boot.
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO = 'ai-ops-user/ouroboros-dashboard';
const FILE_PATH = 'system-pulse.md';
const FETCH_TIMEOUT_MS = 6000;
const STALE_HOURS = 36;
const LOG_FILE = path.join(os.homedir(), '.claude', 'hooks', 'pulse-check.log');

function logmsg(msg) {
  const ts = new Date().toISOString();
  try {
    fs.appendFileSync(LOG_FILE, '[' + ts + '] ' + msg + '\n');
  } catch (_) {}
}

function fetchPulse() {
  const result = spawnSync('gh', [
    'api',
    'repos/' + REPO + '/contents/' + FILE_PATH,
    '--jq', '.content',
  ], { timeout: FETCH_TIMEOUT_MS, encoding: 'utf8' });

  if (result.error) {
    return { ok: false, reason: result.error.code || result.error.message };
  }
  if (result.status !== 0) {
    return { ok: false, reason: 'gh api status ' + result.status + ' ' + (result.stderr || '').slice(0, 100) };
  }
  // gh returns base64-encoded content
  const b64 = (result.stdout || '').trim();
  if (!b64) return { ok: false, reason: 'empty response' };
  try {
    const decoded = Buffer.from(b64, 'base64').toString('utf8');
    return { ok: true, body: decoded };
  } catch (e) {
    return { ok: false, reason: 'decode failed: ' + e.message };
  }
}

function parseGenerated(body) {
  const match = body.match(/_Generated:\s*([^·]+?)\s*·/);
  if (!match) return null;
  const tsStr = match[1].trim();
  const isoLike = tsStr.replace(' UTC', 'Z').replace(' ', 'T');
  const d = new Date(isoLike);
  return isNaN(d.getTime()) ? null : d;
}

function countFailures(body) {
  const match = body.match(/Failures:\*\*?\s*(\d+)\s*\/\s*(\d+)/);
  if (!match) {
    const alt = body.match(/Failures:\s*(\d+)\s*\/\s*(\d+)/);
    if (!alt) return null;
    return { failed: parseInt(alt[1], 10), total: parseInt(alt[2], 10) };
  }
  return { failed: parseInt(match[1], 10), total: parseInt(match[2], 10) };
}

function extractRedRows(body) {
  const lines = body.split('\n');
  const reds = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('🔴 RED') !== -1) {
      const cells = lines[i].split('|').map(function(c) { return c.trim(); });
      if (cells.length >= 5) {
        reds.push({ id: cells[1], desc: cells[2], detail: cells[4] });
      }
    }
  }
  return reds;
}

function main() {
  try {
    const result = fetchPulse();
    if (!result.ok) {
      logmsg('Pulse fetch failed: ' + result.reason);
      process.exit(0);
    }

    const generated = parseGenerated(result.body);
    const failures = countFailures(result.body);
    const reds = extractRedRows(result.body);
    const now = new Date();
    const ageHours = generated ? Math.floor((now - generated) / (1000 * 60 * 60)) : null;

    logmsg('Pulse fetched. Generated=' + (generated ? generated.toISOString() : 'unknown') +
           ' age=' + ageHours + 'h failures=' + (failures ? failures.failed : '?'));

    const lines = [];
    let needsSurface = false;

    if (ageHours !== null && ageHours > STALE_HOURS) {
      lines.push('');
      lines.push('## ⚠️ System Pulse is STALE');
      lines.push('');
      lines.push('Last heartbeat ran ' + ageHours + ' hours ago (threshold: ' + STALE_HOURS + 'h).');
      lines.push('The external monitor itself may have failed. Check:');
      lines.push('https://github.com/' + REPO + '/actions/workflows/system-heartbeat.yml');
      lines.push('');
      needsSurface = true;
    }

    if (failures && failures.failed > 0) {
      lines.push('');
      lines.push('## 🔴 System Pulse: ' + failures.failed + '/' + failures.total + ' invariants RED');
      lines.push('');
      lines.push('Last heartbeat: ' + (generated ? generated.toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : 'unknown') +
                 ' (' + (ageHours !== null ? ageHours + 'h ago' : 'age unknown') + ')');
      lines.push('');
      for (let i = 0; i < reds.length; i++) {
        lines.push('- **' + reds[i].id + '** ' + reds[i].desc + ' — `' + reds[i].detail + '`');
      }
      lines.push('');
      lines.push('Open issues: https://github.com/' + REPO + '/issues?q=label%3Aheartbeat-alarm+is%3Aopen');
      lines.push('Verify commands + owners: https://github.com/mrhappytimes/trident-code/blob/main/system-invariants.md');
      lines.push('');
      needsSurface = true;
    }

    if (needsSurface) {
      process.stdout.write(lines.join('\n'));
    }
    process.exit(0);
  } catch (err) {
    logmsg('error: ' + err.message);
    process.exit(0);
  }
}

main();
