---
name: marathon-registry
version: "1.0"
created: "2026-05-05"
description: "Marathon Build Tracker registry workflow — register, update, list, and close cross-session builds in ~/.claude/MARATHON.md. Different from /marathon (autonomous build-loop skill). Triggers on: 'marathon list', 'marathon register', 'marathon update', 'marathon close', 'marathon conflicts', 'show active builds', 'list builds', 'register a build', 'check marathon conflicts', 'close marathon build'. The MARATHON.md file is the cross-session source of truth — every multi-session build registers here."
---

# Marathon Registry — MARATHON.md Workflow

Manages the global cross-session build registry at `C:\Users\jackp\.claude\MARATHON.md`.

**Distinct from `/marathon`:** that skill is the autonomous BUILD/SHIP loop. This skill is the file/registry management layer that any session uses to declare its locks and check for conflicts.

---

## Why This Exists

Without MARATHON.md tracking, parallel sessions destroy each other's work. With it:
- Each session declares its locked paths before starting
- Other sessions see locks at SessionStart (via marathon-tracker.js hook)
- Resume signals are explicit
- Completed builds become an audit trail

---

## Commands

### `marathon list` — Show all builds

Read MARATHON.md, parse all `### [MARATHON-NNN]` blocks. Output as a table grouped by status:

| ID | Status | Title | Project | Locks (truncated) |

Order: 🔴 IN_PROGRESS → ⏸️ PAUSED → 🔵 QUEUED → ✅ COMPLETE (last 5 only)

### `marathon register [short-name]` — Add a new build entry

Required fields (prompt user if not provided):
- **Title** (e.g., "runner-circuit-breaker")
- **Project** (CWD path or absolute)
- **Phase** (current phase or "Not started")
- **Locks** (comma-separated paths this build owns)
- **Scope** (1-2 sentences)
- **Session type** (TYPE-A autonomous OR TYPE-B dedicated)
- **Depends on** (other MARATHON IDs, or "Nothing")
- **Hold signal** (trigger that lets next session resume)

Auto-assign next ID by scanning existing entries (max + 1). Insert in "Active Builds" section. Output the registered block to confirm.

### `marathon update [id] [field] [value]` — Update a field

Examples:
- `marathon update MARATHON-003 status "🔴 IN_PROGRESS"`
- `marathon update MARATHON-003 phase "Phase 1 complete, testing"`
- `marathon update MARATHON-003 hold "Tests pass, awaiting deployment"`

Find the matching `### [MARATHON-NNN]` block, locate `**Field**:` pattern, replace value, stamp `last_updated`.

### `marathon close [id]` — Mark a build complete

1. Update status to `✅ COMPLETE (YYYY-MM-DD)`
2. Replace verbose fields with concise `**What shipped**:` block
3. Set Locks to `RELEASED`, Blocking to `Nothing`
4. Add row to `## Completed Builds (Archive)` table
5. Keep entry visible for 1 session, then remove on next /marathon close

### `marathon conflicts` — Check current CWD against active locks

Same logic as marathon-tracker.js hook, invoked manually. Useful before touching sensitive paths mid-session.

Output:
- 🚨 LOCK OVERLAP — IN_PROGRESS or PAUSED builds whose locks include CWD or its parents
- ⚠️ NEAR-MISS — locks share a parent dir but not exact CWD
- ✅ CLEAR — no overlap

### `marathon help` — Show command reference

---

## Trigger Patterns

- `/marathon-registry` (subcommands)
- "marathon list", "show active builds", "list builds"
- "marathon register", "register a build", "add to marathon"
- "marathon update", "update marathon"
- "marathon close", "complete build", "release marathon lock"
- "marathon conflicts", "check conflicts before I touch X"

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| MARATHON.md missing | Ask: "Recreate from template?" Use canonical structure (Active, Completed, Definitions, Conflict Protocol) |
| Two builds claim same lock | List both. Ask user which to release. Never silently overwrite |
| Closing a build with QUEUED dependents | Warn: "MARATHON-MMM depends on this. Promote MMM from QUEUED to IN_PROGRESS?" |
| Register collides with existing ID | Skip, use next available |
| Status emoji unrecognized | Default 🔴 IN_PROGRESS, warn user |

---

## File Format Contract

Every entry MUST have these fields (parser depends on them):

```markdown
### [MARATHON-NNN] project-name · build-name
- **Status**: [🔴 IN_PROGRESS / ⏸️ PAUSED / 🔵 QUEUED / ✅ COMPLETE]
- **Project**: [path]
- **Phase**: [current phase or "Not started"]
- **Locks**: [path1] · [path2] · ...
- **Scope**: [1-2 sentences]
- **Assigned session type**: TYPE-A AUTONOMOUS | TYPE-B DEDICATED
- **Hold signal**: [trigger to resume]
- **Depends on**: [Nothing / MARATHON-XXX]
- **Blocks**: [Nothing / MARATHON-ZZZ]
```

The marathon-tracker.js hook reads this format. Deviations break conflict detection.

---

## Integration Points

- **SessionStart hook** (`marathon-tracker.js start`) — surfaces conflicts in context automatically
- **SessionEnd hook** (`marathon-tracker.js end`) — stamps `last_session_end` heartbeat
- **wrap-up Step 2d** — Claude updates MARATHON.md status intelligently
- **start-session Step 0d** — Claude reacts to surfaced conflicts (HOLD/RESUME/work-around)

This skill is the manual interface — for explicit control without waiting for a session boundary.
