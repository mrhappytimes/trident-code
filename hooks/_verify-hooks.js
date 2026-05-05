#!/usr/bin/env node
/**
 * _verify-hooks.js — Hook integrity verification suite.
 *
 * Reads ~/.claude/settings.json, finds all registered hook commands,
 * and verifies:
 *  1. Each command file exists on disk
 *  2. Each .js file parses without syntax errors (node --check)
 *  3. Each .py file has a valid shebang or is invokable
 *  4. Each log file has been written to recently (heartbeat check)
 *
 * Run manually: node ~/.claude/hooks/_verify-hooks.js
 * Output is a Markdown report. Exit 0 if all green, 1 if issues found.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const SETTINGS_FILE = path.join(os.homedir(), '.claude', 'settings.json');
const HOOKS_DIR = path.join(os.homedir(), '.claude', 'hooks');
const STALE_LOG_DAYS = 30;

function readSettings() {
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  } catch (err) {
    console.error('Failed to read settings.json: ' + err.message);
    process.exit(2);
  }
}

function extractHookCommands(settings) {
  const events = settings.hooks || {};
  const commands = [];
  for (const eventName of Object.keys(events)) {
    const eventArr = events[eventName] || [];
    for (let i = 0; i < eventArr.length; i++) {
      const matcher = eventArr[i].matcher || '*';
      const hookList = eventArr[i].hooks || [];
      for (let j = 0; j < hookList.length; j++) {
        commands.push({
          event: eventName,
          matcher: matcher,
          command: hookList[j].command,
          timeout: hookList[j].timeout,
        });
      }
    }
  }
  return commands;
}

function parseCommandPath(cmd) {
  // Extract the script path from `node "path/to/script.js" [args]` or `python3 "..."`
  const match = cmd.match(/^(node|python3|python|sh|bash)\s+"([^"]+)"/);
  if (match) return { interpreter: match[1], scriptPath: match[2], rest: cmd };
  // Try without quotes
  const match2 = cmd.match(/^(node|python3|python|sh|bash)\s+(\S+)/);
  if (match2) return { interpreter: match2[1], scriptPath: match2[2], rest: cmd };
  return { interpreter: 'unknown', scriptPath: cmd.trim(), rest: cmd };
}

function checkSyntax(interpreter, scriptPath) {
  try {
    if (interpreter === 'node') {
      execFileSync('node', ['--check', scriptPath], { stdio: 'pipe' });
      return { ok: true };
    }
    if (interpreter === 'python3' || interpreter === 'python') {
      execFileSync(interpreter, ['-m', 'py_compile', scriptPath], { stdio: 'pipe' });
      return { ok: true };
    }
    if (interpreter === 'sh' || interpreter === 'bash') {
      execFileSync(interpreter, ['-n', scriptPath], { stdio: 'pipe' });
      return { ok: true };
    }
    return { ok: true, note: 'no syntax check for ' + interpreter };
  } catch (err) {
    return { ok: false, error: (err.stderr || err.message || '').toString().slice(0, 200) };
  }
}

function findLogFile(scriptPath) {
  const baseName = path.basename(scriptPath, path.extname(scriptPath));
  const logCandidates = [
    path.join(HOOKS_DIR, baseName + '.log'),
    path.join(HOOKS_DIR, baseName + '-capture.log'),
  ];
  for (let i = 0; i < logCandidates.length; i++) {
    if (fs.existsSync(logCandidates[i])) return logCandidates[i];
  }
  return null;
}

function checkLogFreshness(logPath) {
  if (!logPath) return { hasLog: false };
  try {
    const stats = fs.statSync(logPath);
    const ageDays = Math.floor((Date.now() - stats.mtimeMs) / (1000 * 60 * 60 * 24));
    return { hasLog: true, path: logPath, ageDays: ageDays, stale: ageDays > STALE_LOG_DAYS };
  } catch (_) {
    return { hasLog: false };
  }
}

function main() {
  const settings = readSettings();
  const commands = extractHookCommands(settings);

  const lines = [];
  lines.push('# Hook Verification Report');
  lines.push('');
  lines.push('_Run: ' + new Date().toISOString() + '_');
  lines.push('');
  lines.push('Total registered hooks: **' + commands.length + '**');
  lines.push('');
  lines.push('| Event | Hook | Exists | Syntax | Log Status |');
  lines.push('|-------|------|--------|--------|------------|');

  let issues = 0;

  for (let i = 0; i < commands.length; i++) {
    const c = commands[i];
    const parsed = parseCommandPath(c.command);
    const exists = fs.existsSync(parsed.scriptPath);
    const fileLabel = path.basename(parsed.scriptPath);

    let existCol = exists ? '✅' : '❌ MISSING';
    let syntaxCol = '—';
    let logCol = '—';

    if (exists) {
      const syntax = checkSyntax(parsed.interpreter, parsed.scriptPath);
      syntaxCol = syntax.ok ? '✅' : '❌ ' + (syntax.error || 'invalid');
      if (!syntax.ok) issues++;

      const log = checkLogFreshness(findLogFile(parsed.scriptPath));
      if (!log.hasLog) {
        logCol = '— (no log file)';
      } else if (log.stale) {
        logCol = '⚠️ ' + log.ageDays + 'd stale';
      } else {
        logCol = '✅ ' + log.ageDays + 'd';
      }
    } else {
      issues++;
    }

    lines.push('| ' + c.event + ' | `' + fileLabel + '` | ' + existCol + ' | ' + syntaxCol + ' | ' + logCol + ' |');
  }

  lines.push('');
  lines.push('## Summary');
  lines.push('- Total hooks: ' + commands.length);
  lines.push('- Issues found: ' + issues);
  lines.push('');

  // Also check for orphan files in hooks/ that aren't registered
  const allHookFiles = fs.readdirSync(HOOKS_DIR).filter(function(f) {
    return /\.(js|mjs|py|sh)$/.test(f) && !f.startsWith('_');
  });
  const registeredBasenames = commands.map(function(c) {
    return path.basename(parseCommandPath(c.command).scriptPath);
  });
  const orphans = allHookFiles.filter(function(f) {
    return registeredBasenames.indexOf(f) === -1;
  });

  if (orphans.length > 0) {
    lines.push('## Orphan files (in hooks/ but not in settings.json)');
    for (let i = 0; i < orphans.length; i++) {
      lines.push('- `' + orphans[i] + '`');
    }
    lines.push('');
  }

  process.stdout.write(lines.join('\n') + '\n');
  process.exit(issues > 0 ? 1 : 0);
}

main();
