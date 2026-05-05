#!/usr/bin/env node
/**
 * SessionEnd hook — writes a minimal session record to the active project's 07_MEMORY.
 *
 * Reads `.claude/active-project` pointer file (JSON) to find where to write.
 * Pointer file format: { memory_path, project_name, project_root }
 *
 * Walks up from CWD to find the pointer, covering worktree sessions where
 * CWD is a subdirectory of the project root.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const LOG_FILE = path.join(os.homedir(), '.claude', 'hooks', 'session-memory-writer.log');

function log(msg) {
  const ts = new Date().toISOString();
  try {
    fs.appendFileSync(LOG_FILE, `[${ts}] ${msg}\n`);
  } catch (_) {}
}

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
    setTimeout(() => resolve(data), 3000);
  });
}

function findPointerFile(startDir) {
  let dir = startDir;
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(dir, '.claude', 'active-project');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function extractSessionInfo(conversation) {
  const messages = conversation?.messages || [];
  const total = messages.length;

  const userMessages = messages
    .filter(m => m.role === 'user')
    .map(m => {
      const content = Array.isArray(m.content)
        ? m.content.filter(c => c.type === 'text').map(c => c.text).join(' ')
        : String(m.content || '');
      return content.slice(0, 300);
    });

  const toolUses = messages
    .flatMap(m => Array.isArray(m.content) ? m.content : [])
    .filter(c => c.type === 'tool_use');

  const filesWritten = toolUses
    .filter(t => ['Write', 'Edit'].includes(t.name))
    .map(t => {
      try {
        const input = typeof t.input === 'string' ? JSON.parse(t.input) : t.input;
        return input.file_path || input.path || '';
      } catch (_) { return ''; }
    })
    .filter(Boolean);

  const filesRead = toolUses
    .filter(t => t.name === 'Read')
    .map(t => {
      try {
        const input = typeof t.input === 'string' ? JSON.parse(t.input) : t.input;
        return input.file_path || input.path || '';
      } catch (_) { return ''; }
    })
    .filter(Boolean);

  const bashCommands = toolUses
    .filter(t => t.name === 'Bash')
    .map(t => {
      try {
        const input = typeof t.input === 'string' ? JSON.parse(t.input) : t.input;
        return input.command || '';
      } catch (_) { return ''; }
    })
    .filter(Boolean)
    .slice(-5);

  const lastUserMsg = userMessages[userMessages.length - 1] || '';
  const firstUserMsg = userMessages[0] || '';

  return {
    totalMessages: total,
    userMessageCount: userMessages.length,
    filesWritten: [...new Set(filesWritten)],
    filesRead: [...new Set(filesRead)].slice(0, 8),
    bashCommands,
    lastUserMsg: lastUserMsg.slice(0, 200),
    firstUserMsg: firstUserMsg.slice(0, 200),
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 40)
    .replace(/-+$/, '');
}

function formatDate(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

function formatTime(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getHours())}${pad(d.getMinutes())}`;
}

async function main() {
  try {
    const raw = await readStdin();
    let conversation = {};

    try {
      conversation = JSON.parse(raw);
    } catch (_) {
      log('stdin not JSON or empty — writing minimal record');
    }

    const pointerPath = findPointerFile(process.cwd());
    if (!pointerPath) {
      log(`No .claude/active-project found walking up from ${process.cwd()} — skipping`);
      process.exit(0);
    }

    let pointer;
    try {
      pointer = JSON.parse(fs.readFileSync(pointerPath, 'utf8'));
    } catch (err) {
      log(`Failed to parse pointer file ${pointerPath}: ${err.message}`);
      process.exit(0);
    }

    const { memory_path, project_name = 'Unknown Project', project_root } = pointer;
    if (!memory_path) {
      log(`Pointer file missing memory_path: ${pointerPath}`);
      process.exit(0);
    }

    const summariesDir = path.join(memory_path, 'session_summaries');
    fs.mkdirSync(summariesDir, { recursive: true });

    const now = new Date();
    const dateStr = formatDate(now);
    const timeStr = formatTime(now);

    const info = extractSessionInfo(conversation);

    // Build topic slug from first user message
    const topicSource = info.firstUserMsg || info.lastUserMsg || 'session';
    const slug = slugify(topicSource) || 'session';

    const filename = `${dateStr}_${timeStr}_${slug}.md`;
    const filePath = path.join(summariesDir, filename);

    const changedFiles = info.filesWritten.length > 0
      ? info.filesWritten.map(f => `- \`${f}\``).join('\n')
      : '- (no files written)';

    const openLoops = info.lastUserMsg
      ? `- Last request: ${info.lastUserMsg}`
      : '- (no open loops captured)';

    const summary = `# Session — ${dateStr} ${timeStr.slice(0,2)}:${timeStr.slice(2)} — ${slug}
Project: ${project_name}

## Session focus
${info.firstUserMsg || '(session start not captured)'}

## What changed
${changedFiles}

## Stats
- Messages: ${info.totalMessages} total (${info.userMessageCount} from user)
- Files read: ${info.filesRead.length > 0 ? info.filesRead.join(', ') : 'none'}

## Open loops / last request
${openLoops}

## Next priority
(Fill in at wrap-up)
`;

    fs.writeFileSync(filePath, summary, 'utf8');
    log(`Wrote session summary to ${filePath}`);
    process.exit(0);

  } catch (err) {
    log(`session-memory-writer error: ${err.message}`);
    process.exit(0); // Never block session end
  }
}

main();
