#!/usr/bin/env node
/**
 * brain-staleness-check.js — SessionStart hook that warns if BRAIN.md is stale.
 *
 * Checks both local BRAIN.md (file mtime) AND OUROBOROS BRAIN.md timestamp
 * (via Cortex MCP if available — but for now just checks local file mtime).
 *
 * Stale = mtime > 7 days. Output is injected into session start context so
 * Claude can advise the operator to verify the distiller cron.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const CANDIDATES = [
  path.join(os.homedir(), '.claude', 'memory', 'active', 'BRAIN.md'),
  path.join(os.homedir(), '.claude', '.auto-memory', 'BRAIN.md'),
  path.join(os.homedir(), '.claude', '.auto-memory', 'business_brain.md'),
  path.join(os.homedir(), '.claude', 'BRAIN.md'),
];

const STALE_DAYS_WARN = 7;
const STALE_DAYS_CRITICAL = 14;
const LOG_FILE = path.join(os.homedir(), '.claude', 'hooks', 'brain-staleness-check.log');

function logmsg(msg) {
  const ts = new Date().toISOString();
  try {
    fs.appendFileSync(LOG_FILE, '[' + ts + '] ' + msg + '\n');
  } catch (_) {}
}

function findBrainFile() {
  for (let i = 0; i < CANDIDATES.length; i++) {
    if (fs.existsSync(CANDIDATES[i])) return CANDIDATES[i];
  }
  return null;
}

function daysOld(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const now = Date.now();
    const mtime = stats.mtimeMs;
    return Math.floor((now - mtime) / (1000 * 60 * 60 * 24));
  } catch (_) {
    return -1;
  }
}

function main() {
  try {
    const brainFile = findBrainFile();
    if (!brainFile) {
      logmsg('No BRAIN.md candidate found, skipping');
      return;
    }
    const days = daysOld(brainFile);
    if (days < 0) {
      logmsg('Could not stat ' + brainFile);
      return;
    }
    logmsg('BRAIN.md at ' + brainFile + ' is ' + days + ' days old');

    if (days >= STALE_DAYS_CRITICAL) {
      const lines = [
        '',
        '## 🚨 BRAIN.md CRITICAL STALENESS',
        '',
        'BRAIN.md is **' + days + ' days old** at `' + brainFile + '`',
        '',
        'This usually means the distiller cron stopped firing. Verify on Omega:',
        '```',
        'ssh root@100.92.44.56 "crontab -l | grep -i distill"',
        '```',
        'Expected: distiller at `30 3 * * 3,0` (Wed/Sun 3:30am UTC). If missing/broken, restart it. See MARATHON-007 in `~/.claude/MARATHON.md` for the full diagnostic checklist.',
        '',
      ];
      process.stdout.write(lines.join('\n'));
    } else if (days >= STALE_DAYS_WARN) {
      const lines = [
        '',
        '## ⚠️ BRAIN.md staleness',
        'BRAIN.md is ' + days + ' days old. Approaching stale threshold (' + STALE_DAYS_CRITICAL + ' days = critical).',
        '',
      ];
      process.stdout.write(lines.join('\n'));
    }
    process.exit(0);
  } catch (err) {
    logmsg('error: ' + err.message);
    process.exit(0);
  }
}

main();
