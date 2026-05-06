#!/usr/bin/env node
/**
 * pulse-check.js — SessionStart hook that fetches system-pulse.md from GitHub
 * and surfaces any red invariants in session context.
 *
 * The pulse.md is updated by .github/workflows/system-heartbeat.yml daily at 6am UTC.
 * This hook reads the most recent pulse, surfaces failures to Claude, and notes
 * the pulse age (so a stale pulse is itself a signal).
 *
 * Times out at 5s — never blocks session boot.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PULSE_URL = 'https://raw.githubusercontent.com/mrhappytimes/trident-code/main/system-pulse.md';
const FETCH_TIMEOUT_MS = 5000;
const STALE_HOURS = 36; // pulse should be <24h old; >36h means heartbeat itself failed
const LOG_FILE = path.join(os.homedir(), '.claude', 'hooks', 'pulse-check.log');

function logmsg(msg) {
  const ts = new Date().toISOString();
  try {
    fs.appendFileSync(LOG_FILE, '[' + ts + '] ' + msg + '\n');
  } catch (_) {}
}

function fetchPulse() {
  return new Promise(function(resolve) {
    const req = https.get(PULSE_URL, { timeout: FETCH_TIMEOUT_MS }, function(res) {
      if (res.statusCode !== 200) {
        resolve({ ok: false, reason: 'HTTP ' + res.statusCode });
        return;
      }
      let body = '';
      res.on('data', function(chunk) { body += chunk; });
      res.on('end', function() { resolve({ ok: true, body: body }); });
    });
    req.on('error', function(err) { resolve({ ok: false, reason: err.code || err.message }); });
    req.on('timeout', function() { req.destroy(); resolve({ ok: false, reason: 'timeout' }); });
  });
}

function parseGenerated(body) {
  const match = body.match(/_Generated:\s*([^·]+?)\s*·/);
  if (!match) return null;
  const tsStr = match[1].trim();
  // Format: "2026-05-06 06:01 UTC"
  const isoLike = tsStr.replace(' UTC', 'Z').replace(' ', 'T');
  const d = new Date(isoLike);
  return isNaN(d.getTime()) ? null : d;
}

function countFailures(body) {
  const match = body.match(/Failures:\s*(\d+)\s*\/\s*(\d+)/);
  if (!match) return null;
  return { failed: parseInt(match[1], 10), total: parseInt(match[2], 10) };
}

function extractRedRows(body) {
  const lines = body.split('\n');
  const reds = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('🔴 RED') !== -1) {
      // Extract cells: | INV-001 | desc | 🔴 RED | detail |
      const cells = lines[i].split('|').map(function(c) { return c.trim(); });
      if (cells.length >= 5) {
        reds.push({ id: cells[1], desc: cells[2], detail: cells[4] });
      }
    }
  }
  return reds;
}

async function main() {
  try {
    const result = await fetchPulse();
    if (!result.ok) {
      logmsg('Pulse fetch failed: ' + result.reason);
      // Don't surface unless this happens repeatedly (avoid noise on transient outages)
      process.exit(0);
    }

    const generated = parseGenerated(result.body);
    const failures = countFailures(result.body);
    const reds = extractRedRows(result.body);
    const now = new Date();
    const ageHours = generated ? Math.floor((now - generated) / (1000 * 60 * 60)) : null;

    logmsg('Pulse fetched. Generated=' + (generated ? generated.toISOString() : 'unknown') + ' age=' + ageHours + 'h failures=' + (failures ? failures.failed : '?'));

    const lines = [];
    let needsSurface = false;

    if (ageHours !== null && ageHours > STALE_HOURS) {
      lines.push('');
      lines.push('## ⚠️ System Pulse is STALE');
      lines.push('');
      lines.push('Last heartbeat ran ' + ageHours + ' hours ago (threshold: ' + STALE_HOURS + 'h).');
      lines.push('The external monitor itself may have failed. Check GitHub Actions:');
      lines.push('https://github.com/mrhappytimes/trident-code/actions/workflows/system-heartbeat.yml');
      lines.push('');
      needsSurface = true;
    }

    if (failures && failures.failed > 0) {
      lines.push('');
      lines.push('## 🔴 System Pulse: ' + failures.failed + '/' + failures.total + ' invariants RED');
      lines.push('');
      lines.push('Last heartbeat: ' + (generated ? generated.toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : 'unknown') + ' (' + (ageHours !== null ? ageHours + 'h ago' : 'age unknown') + ')');
      lines.push('');
      for (let i = 0; i < reds.length; i++) {
        lines.push('- **' + reds[i].id + '** ' + reds[i].desc + ' — `' + reds[i].detail + '`');
      }
      lines.push('');
      lines.push('Open issues: https://github.com/mrhappytimes/trident-code/issues?q=label%3Aheartbeat-alarm');
      lines.push('Verify commands + owners: `system-invariants.md`');
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
