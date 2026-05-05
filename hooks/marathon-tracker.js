#!/usr/bin/env node
/**
 * marathon-tracker.js — dual-mode hook for MARATHON.md cross-session coordination.
 *
 * Mode A (SessionStart): Read MARATHON.md, find active builds whose locks overlap
 * with current CWD. Print a context block that gets injected into session start.
 *
 * Mode B (SessionEnd): Find the build entry matching CWD, stamp it with
 * last_session_end timestamp. Does NOT change status — Claude does that during
 * wrap-up Step 2d. This is just a heartbeat record.
 *
 * Mode is determined by CLAUDE_HOOK_EVENT env var or first CLI arg.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const MARATHON_FILE = path.join(os.homedir(), '.claude', 'MARATHON.md');
const LOG_FILE = path.join(os.homedir(), '.claude', 'hooks', 'marathon-tracker.log');

function logmsg(msg) {
  const ts = new Date().toISOString();
  try {
    fs.appendFileSync(LOG_FILE, '[' + ts + '] ' + msg + '\n');
  } catch (_) {}
}

function determineMode() {
  const event = (process.env.CLAUDE_HOOK_EVENT || process.env.HOOK_EVENT || '').toLowerCase();
  if (event.indexOf('sessionstart') !== -1 || event.indexOf('session_start') !== -1) return 'start';
  if (event.indexOf('sessionend') !== -1 || event.indexOf('session_end') !== -1) return 'end';
  const arg = (process.argv[2] || '').toLowerCase();
  if (arg === 'start' || arg === 'end') return arg;
  return 'end';
}

function readMarathonFile() {
  try {
    return fs.readFileSync(MARATHON_FILE, 'utf8');
  } catch (err) {
    logmsg('MARATHON.md not readable: ' + err.message);
    return null;
  }
}

function parseBuilds(content) {
  if (!content) return [];
  const builds = [];
  const blockRegex = /### \[MARATHON-(\d+)\]([^\n]*)\n([\s\S]*?)(?=\n### |\n## |\n---|$)/g;
  let match;
  while ((match = blockRegex.exec(content)) !== null) {
    const id = 'MARATHON-' + match[1];
    const title = match[2].trim();
    const body = match[3];
    const statusMatch = body.match(/\*\*Status\*\*:\s*([^\n]+)/);
    const projectMatch = body.match(/\*\*Project\*\*:\s*([^\n]+)/);
    const locksMatch = body.match(/\*\*Locks\*\*:\s*([^\n]+)/);
    const holdMatch = body.match(/\*\*Hold signal\*\*:\s*([^\n]+)/);
    const status = (statusMatch ? statusMatch[1].trim() : '').toLowerCase();
    const isActive = status.indexOf('in_progress') !== -1 || status.indexOf('paused') !== -1;
    builds.push({
      id: id,
      title: title,
      status: statusMatch ? statusMatch[1].trim() : 'UNKNOWN',
      project: projectMatch ? projectMatch[1].trim() : '',
      locks: locksMatch ? locksMatch[1].trim() : '',
      holdSignal: holdMatch ? holdMatch[1].trim() : '',
      isActive: isActive,
      blockStart: match.index,
      blockEnd: match.index + match[0].length,
      raw: match[0],
    });
  }
  return builds;
}

function normalizePath(p) {
  return p.split('\\').join('/').toLowerCase();
}

function lockOverlapsCwd(lockField, cwd) {
  if (!lockField) return false;
  const cwdNorm = normalizePath(cwd);
  const lockPaths = lockField.split(/[·,]/).map(function(s) { return s.trim(); });
  for (let i = 0; i < lockPaths.length; i++) {
    const lp = lockPaths[i];
    const stripped = lp.replace(/`/g, '').replace(/\/?\*\*$/, '').replace(/\/?\*$/, '').trim();
    if (!stripped) continue;
    const lockNorm = normalizePath(stripped);
    if (cwdNorm.indexOf(lockNorm) === 0 || lockNorm.indexOf(cwdNorm) === 0) {
      return lp;
    }
  }
  return false;
}

function modeStart(cwd) {
  const content = readMarathonFile();
  if (!content) {
    logmsg('SessionStart: MARATHON.md not found');
    return;
  }
  const builds = parseBuilds(content);
  const active = builds.filter(function(b) { return b.isActive; });
  if (active.length === 0) {
    logmsg('SessionStart: no active builds');
    return;
  }
  const conflicts = [];
  for (let i = 0; i < active.length; i++) {
    const build = active[i];
    const overlap = lockOverlapsCwd(build.locks, cwd);
    if (overlap || (build.project && normalizePath(cwd).indexOf(normalizePath(build.project)) !== -1)) {
      conflicts.push({ build: build, overlap: overlap });
    }
  }
  const lines = [];
  lines.push('');
  lines.push('## ⚠️ MARATHON BUILD TRACKER — Active Builds');
  lines.push('');
  if (conflicts.length > 0) {
    lines.push('### 🚨 LOCK OVERLAP for current working directory');
    for (let i = 0; i < conflicts.length; i++) {
      const c = conflicts[i];
      lines.push('- **' + c.build.id + '** (' + c.build.status + ') — overlap: `' + (c.overlap || c.build.project) + '`');
      if (c.build.holdSignal) lines.push('  - Hold signal: ' + c.build.holdSignal);
    }
    lines.push('');
    lines.push('**Action:** Verify before modifying any locked path. To resume a paused build, set its status to IN_PROGRESS in MARATHON.md.');
    lines.push('');
  }
  const otherActive = active.filter(function(b) {
    return !conflicts.some(function(c) { return c.build.id === b.id; });
  });
  if (otherActive.length > 0) {
    lines.push('### Other active builds (no overlap with this session)');
    for (let i = 0; i < otherActive.length; i++) {
      lines.push('- ' + otherActive[i].id + ' ' + otherActive[i].status + ' — ' + otherActive[i].title.trim());
    }
    lines.push('');
  }
  lines.push('_Source: ~/.claude/MARATHON.md · Update via wrap-up Step 2d._');
  lines.push('');
  process.stdout.write(lines.join('\n'));
  logmsg('SessionStart: ' + active.length + ' active, ' + conflicts.length + ' conflicts');
}

function modeEnd(cwd) {
  const content = readMarathonFile();
  if (!content) {
    logmsg('SessionEnd: MARATHON.md not found');
    return;
  }
  const builds = parseBuilds(content);
  const active = builds.filter(function(b) { return b.isActive; });
  let matched = null;
  for (let i = 0; i < active.length; i++) {
    const build = active[i];
    if (build.project && normalizePath(cwd).indexOf(normalizePath(build.project)) !== -1) {
      matched = build;
      break;
    }
    const overlap = lockOverlapsCwd(build.locks, cwd);
    if (overlap) {
      matched = build;
      break;
    }
  }
  if (!matched) {
    logmsg('SessionEnd: no active build matches CWD ' + cwd);
    return;
  }
  const ts = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const heartbeatLine = '- **last_session_end (heartbeat)**: ' + ts;
  let updatedBlock = matched.raw;
  const heartbeatRegex = /- \*\*last_session_end \(heartbeat\)\*\*:[^\n]*/;
  if (heartbeatRegex.test(updatedBlock)) {
    updatedBlock = updatedBlock.replace(heartbeatRegex, heartbeatLine);
  } else {
    updatedBlock = updatedBlock.replace(/(\*\*Status\*\*:[^\n]+)/, '$1\n' + heartbeatLine);
  }
  if (updatedBlock === matched.raw) {
    logmsg('SessionEnd: no changes for ' + matched.id);
    return;
  }
  const newContent = content.slice(0, matched.blockStart) + updatedBlock + content.slice(matched.blockEnd);
  try {
    fs.writeFileSync(MARATHON_FILE, newContent, 'utf8');
    logmsg('SessionEnd: stamped heartbeat on ' + matched.id);
  } catch (err) {
    logmsg('SessionEnd: write failed: ' + err.message);
  }
}

function main() {
  try {
    const mode = determineMode();
    const cwd = process.cwd();
    if (mode === 'start') {
      modeStart(cwd);
    } else {
      modeEnd(cwd);
    }
    process.exit(0);
  } catch (err) {
    logmsg('marathon-tracker error: ' + err.message);
    process.exit(0);
  }
}

main();
