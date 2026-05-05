#!/usr/bin/env node
/**
 * cortex-health-check.js — SessionStart hook that probes Cortex MCP availability.
 *
 * The Cortex MCP runs on Omega at 100.92.44.56:8765 (Tailscale).
 * If the TCP socket is unreachable, surface a warning at session start
 * so Claude knows file-based memory is the only ground truth this session.
 *
 * Times out at 2 seconds — never blocks session boot.
 */

const net = require('net');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CORTEX_HOST = '100.92.44.56';
const CORTEX_PORT = 8765;
const TIMEOUT_MS = 2000;
const LOG_FILE = path.join(os.homedir(), '.claude', 'hooks', 'cortex-health-check.log');

function logmsg(msg) {
  const ts = new Date().toISOString();
  try {
    fs.appendFileSync(LOG_FILE, '[' + ts + '] ' + msg + '\n');
  } catch (_) {}
}

function probe(host, port, timeoutMs) {
  return new Promise(function(resolve) {
    const socket = new net.Socket();
    let resolved = false;
    const settle = function(result) {
      if (resolved) return;
      resolved = true;
      try { socket.destroy(); } catch (_) {}
      resolve(result);
    };
    socket.setTimeout(timeoutMs);
    socket.on('connect', function() { settle({ ok: true }); });
    socket.on('timeout', function() { settle({ ok: false, reason: 'timeout' }); });
    socket.on('error', function(err) { settle({ ok: false, reason: err.code || err.message }); });
    socket.connect(port, host);
  });
}

async function main() {
  try {
    const result = await probe(CORTEX_HOST, CORTEX_PORT, TIMEOUT_MS);
    if (result.ok) {
      logmsg('Cortex reachable at ' + CORTEX_HOST + ':' + CORTEX_PORT);
      // Silent success — no output unless degraded
      process.exit(0);
    }
    logmsg('Cortex unreachable: ' + result.reason);
    const lines = [
      '',
      '## ⚠️ Cortex MCP Health',
      '',
      'Cortex at `' + CORTEX_HOST + ':' + CORTEX_PORT + '` is unreachable (' + result.reason + ').',
      '',
      'Implications:',
      '- `mcp__cortex__*` tools will fail — no live `get_ouroboros_brain`, `search_research`, or `get_system_status`',
      '- File-based memory (`~/.claude/memory/`, `.auto-memory/`, `07_MEMORY/`) is the only ground truth this session',
      '- Do NOT assume fleet state — verify Tailscale + Omega availability before making decisions about OUROBOROS health',
      '',
      'Quick check: `tailscale status` to confirm peer connectivity.',
      '',
    ];
    process.stdout.write(lines.join('\n'));
    process.exit(0);
  } catch (err) {
    logmsg('error: ' + err.message);
    process.exit(0);
  }
}

main();
