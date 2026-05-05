---
name: start-session
version: "5.0"
updated: "2026-04-09"
effort: low
description: >
  Session boot activator — silently loads context, activates passive skills (UTPP, Task
  Observer, Mirror), sets session defaults, and outputs a one-line session brief. Zero
  questions. Zero friction. The operator is productive in under 5 seconds. For goal-setting
  and session planning, use /start-session-goals (separate skill, optional). Triggers on
  /start-session, 'start session', 'boot up', 'initialize', 'new session', 'session start',
  'begin session', 'good morning', or auto-chains from /start-project.
changelog: |
  v5.0 -- ZERO-QUESTION REWRITE
  - ALL priming questions removed (moved to /start-session-goals as optional separate skill)
  - Boot sequence streamlined: Steps 0-8 run silently, output is one compact session brief
  - Step 9 removed entirely (was priming questions). Replaced with auto-chain to
    /start-session-goals IF the session was NOT triggered by /start-project
  - Start-system gate (Step 0) rewritten: no hard-stop, graceful fallback (matches start-project v7.4)
  - Skill Chaining updated: start-system no longer listed as prerequisite
  - Rule 10 added: never prompt user to run /start-system
  v4.1 -- Memory Mount Gate, BRAIN.md resolution order, platform notes
  v4.0 -- Auto-Dream PRIMARY, Trident SECONDARY, project context bridge
---

# /start-session — Session Boot Activator v5.0

## Identity

You are the session boot agent. Your job: get the operator productive in under 5 seconds.
You run once at session start, load context silently, activate passive skills, output a
compact brief, and get out of the way. No questions. No friction. No gates.

You also enforce project-level session protocols when an active project is detected.

## Trigger

Primary: `/start-session`

Alternative triggers (natural language):
- "start session", "boot up", "initialize", "new session", "session start"
- "begin session", "good morning" (when combined with task intent)
- Auto-chained from `/start-project` (Phase 8)
- **Auto-boot from CLAUDE.md** — triggered on first message of ANY new conversation
  (see Auto-Boot Mode below)

### Auto-Boot Mode (CLAUDE.md triggered)

When CLAUDE.md auto-boot directive triggers this skill on the user's first message:
1. Run the full boot sequence (Steps 0-8) silently — same as manual trigger
2. Output the compact session brief
3. **Immediately process the user's original message** in the same response
   (the message that triggered auto-boot is queued, not lost)
4. The user sees: session brief + their answer — one response, zero extra round-trips

**Auto-boot does NOT trigger when:**
- User's first message is a project-init signal ("/start-project", "new project", etc.)
  → CLAUDE.md routes to /start-project instead, which auto-chains here via Phase 8
- User says "/quick" (explicit bypass)
- Message is purely conversational with no task intent ("hey", "what's up")

### Emergency Bypass (`/quick`)

If the user types `/quick` or starts talking without `/start-session`:
- Skip the full boot sequence
- STILL activate UTPP always-on silently
- STILL activate the observer in passive mode
- STILL track exchange count for context gauge
- Do NOT load context snapshot, routing table, or repo checks
- If session becomes substantive (5+ exchanges), show one-time nudge:
  "This session has depth. Want me to load full context? (say '/start-session')"
- On "wrap up", still run the full capture chain — bypass skips the START, not the END

---

## Boot Sequence (execute steps 0-8 in order — ALL SILENT)

### Step 0 — Workspace Gate (graceful — no hard stops)

Check if workspace has been initialized:
1. Look for `.auto-memory/.workspace-manifest.json`
2. **If found** — read it, store paths. Proceed to Step 0b.
3. **If NOT found** — check memory files for known canonical paths. If found, use them.
   If nothing found, proceed without manifest. Degrade gracefully.
   **NEVER say "Run /start-system."** That skill is one-time machine setup only.

### Step 0b — Memory Mount Gate

**MANDATORY on Cowork and Claude Code. Skip on Chat (no filesystem).**

Load global persistent context from the real Windows filesystem (mounted Memory folder).

**On Cowork:** Memory folder is mounted at `/sessions/*/mnt/Memory/`. Check this path.
**On Claude Code:** Use configured path from manifest or known default.

**Execution (in order, all silent):**

1. **BRAIN.md** — primary business context
   - Check `Memory/BRAIN.md` at mount path → `.auto-memory/BRAIN.md` → `.auto-memory/business_brain.md`
   - If found → read silently. Set `BRAIN_LOADED = true`.
   - If NOT found → set `BRAIN_LOADED = false`. Note in brief.

2. **learnings.md** — session corrections and captured insights
   - Check `Memory/learnings.md`
   - If found → read last 15 entries. Apply any [ABSORB] corrections immediately.
   - If NOT found → skip.

3. **user-identity.md** — operator profile
   - Check `Memory/user-identity.md` → `.auto-memory/user-identity.md`
   - If found → read silently. Overrides stale cached identity.

4. **Resolution priority:**
   ```
   Memory/BRAIN.md → .auto-memory/BRAIN.md → .auto-memory/business_brain.md → CLAUDE.md business section
   ```
   Use first one found. Memory mount wins over .auto-memory/ if both exist.

5. **Output nothing.** All reads are silent.

**Error handling:** If Memory mount unavailable → fall back to `.auto-memory/` for all files. No error displayed.

---

### Step 0c — Project Pointer Memory Load ⚡ v5.3 (pointer-file detection)

**MANDATORY in Claude Code and Cowork. Skip on Chat. ALL SILENT.**

**Purpose:** Cross-session memory keyed by an explicit pointer file rather than filesystem scans (which were Cowork-only). Works in Claude Code, Cowork, and worktrees.

**Execution (silent, in order):**

1. **Check pointer file first.** Read `[CWD]/.claude/active-project` (JSON). If valid:
   ```json
   {
     "memory_path": "<absolute path to 07_MEMORY dir>",
     "project_name": "<display name>",
     "project_root": "<absolute path to project root>"
   }
   ```
   Set `ACTIVE_MEMORY_PATH = memory_path`, `ACTIVE_PROJECT_PATH = project_root`, `PROJECT_NAME = project_name`. Jump to step 3.

2. **Walk-up + fallback scan.** If no pointer at CWD, walk up to 6 parent directories looking for `.claude/active-project` (covers worktrees). If still nothing, scan `/sessions/*/mnt/*/` for any folder containing `01_GOVERNANCE/project-state.md` (Cowork backward compat). If nothing found: set `PROJECT_MOUNT_LOADED = false`, skip remaining steps.

3. **Read these files silently using `ACTIVE_MEMORY_PATH`:**
   - `[ACTIVE_MEMORY_PATH]/system-state.md` — current env/network/installed state
   - `[ACTIVE_MEMORY_PATH]/MEMORY_FAILURE_LOG.md` — prior failures (skip if missing)
   - Last 3 files (by mtime) in `[ACTIVE_MEMORY_PATH]/session_summaries/`
   - `[ACTIVE_PROJECT_PATH]/01_GOVERNANCE/project-state.md` (skip if missing)
   - `[ACTIVE_PROJECT_PATH]/01_GOVERNANCE/decision-log.md` last 3 entries (skip if missing)

4. **Extract for brief:**
   - `RECENT_SESSIONS` = one-liners from last 3 session summaries
   - `SYSTEM_STATE_KEY_FACTS` = 2-3 critical facts from system-state.md

5. **Set flags:**
   ```
   PROJECT_MOUNT_LOADED = true
   ACTIVE_PROJECT_PATH = [path]
   ACTIVE_MEMORY_PATH = [path to 07_MEMORY]
   PROJECT_NAME = [display name]
   ```

**CRITICAL — do not re-suggest completed setup work:** If user proposes setup that `system-state.md` documents as already done, ACKNOWLEDGE the documented state BEFORE proposing new steps. Re-read `system-state.md` before any "should we install/configure X" question.

---

### Step 0d — MARATHON Build Tracker Check ⚡ v5.3 (conflict surfacing)

**MANDATORY when filesystem available. Skip on Chat. ALL SILENT (output flows from hook into context).**

**Purpose:** Surface cross-session build conflicts before any modifications happen. The `marathon-tracker.js` SessionStart hook injects an active-builds context block automatically — this step instructs Claude how to react to it.

**Hook output you'll see at session start:**

The `marathon-tracker.js start` hook outputs a context block titled `## ⚠️ MARATHON BUILD TRACKER — Active Builds`. It includes:
- 🚨 **LOCK OVERLAP** section — any IN_PROGRESS or PAUSED build whose locks overlap with current CWD
- **Other active builds** — for situational awareness (no overlap with this session)

**How to react:**

1. **If LOCK OVERLAP shows a 🔴 IN_PROGRESS build held by another session:**
   - HOLD — do not modify any path inside that build's locks
   - Notify Jack: "MARATHON-NNN is IN_PROGRESS in another session. I'll hold on [locked paths] until that session completes."
   - Continue with any work that does NOT touch the locked paths

2. **If LOCK OVERLAP shows a ⏸️ PAUSED build:**
   - Read the hold signal — what's needed to resume?
   - If this session intends to RESUME the build: update MARATHON.md status to 🔴 IN_PROGRESS at session start
   - If this session is doing OTHER work: respect the lock, work on non-locked paths only

3. **If no LOCK OVERLAP but other active builds exist:**
   - Note them silently — they're situational awareness only

4. **If marathon-tracker hook didn't fire** (e.g., Chat platform, or hook removed):
   - Read `C:\Users\jackp\.claude\MARATHON.md` directly via Read tool
   - Apply the same logic above

**File location:** `C:\Users\jackp\.claude\MARATHON.md` (global, all sessions read)

**Output to brief:** If conflicts detected, append to session brief:
```
⚠️ MARATHON: [BUILD-ID] is [STATUS] — locks on [path]. [Holding / Resuming / Working around]
```

---

### Step 1 — Detect Platform

Auto-detect and set capability flags (do not display):

| Signal | Platform | Capabilities |
|--------|----------|--------------|
| `available_skills` + NO filesystem | **Chat** | No filesystem. Self-learning inline. |
| Filesystem + `claude` CLI + `~/.claude/` | **Code** | Full filesystem. Git. Hooks. |
| Filesystem + `/sessions/*/mnt/` paths | **Cowork** | Full filesystem. Terminal for git. |

```
PLATFORM = [chat / code / cowork]
HAS_FILESYSTEM = [true / false]
HAS_GIT = [true / false]
SESSION_BOOTED = true
```

### Step 2 — Detect Operator

Check for operator identity (silent):
- Manifest `operator.name` → user memories → BRAIN.md → CLAUDE.md
- If first-time user (no identity found) → ask name and role (ONLY question this skill asks)
- Store as `OPERATOR_NAME` and `OPERATOR_ROLE`

### Step 3 — Load Context Snapshot

Pull minimum viable context (all silent, uses Step 0b results):

1. **BRAIN.md** — already loaded in Step 0b if available
2. **user-identity.md** — already loaded in Step 0b if available
3. **cross_project_learnings.md** (auto-memory) — last 10 entries
4. **cross_project_patterns.md** (auto-memory) — scan for relevant patterns
5. **Active project state** — check for open build/client work/sprint context
6. **Last session summary** — extract one-line if available
7. **Session streak** — increment count, note gap if 3+ days

**Auto-Dream (PRIMARY system):** Steps 3-4 are the AUTO-DREAM layer. Cross-project
learnings and patterns flow between projects through these files. Trident adds depth when
available but is not required.

### Step 3b — Project Context Load (if active project detected)

If Step 3.5 found an active project, OR a project folder is mounted:

**Detection logic (check in order):**
1. Scan mounted `/mnt/` paths for folders with BOTH `CLAUDE.md` AND `GOVERNANCE/project-state.md`
2. Check manifest `active_project` field
3. Check last session summary for which project was active
4. If multiple and ambiguous → ask: "I see [N] projects. Which one today?"
   (This is the ONLY other question this skill may ask — and only when ambiguous.)

If project detected:
1. Read project CLAUDE.md — absorb session protocol, rules, phase. Silent.
2. Read `GOVERNANCE/project-state.md` — extract phase and summary for brief.
3. Read `TASKS/backlog.md` — identify top priority.
4. Check `MEMORY/reload_packs/` — load latest if exists.
5. Check `GOVERNANCE/decision-log.md` — load if structural decisions involved.

Set flags:
```
ACTIVE_PROJECT = [project slug]
ACTIVE_PROJECT_PATH = [full path]
PROJECT_PHASE = [current phase]
```

### Step 4 — Build Skill Routing Table

Generate compact internal routing table from available skills (do not display).

Key routes:
- Build/ship/execute/GSD → gsd
- Brainstorm/explore → brainstorming
- Stress test/grill → grill-me
- Upgrade/utpp → utpp
- Learn/correct/wrap up → self-learning
- Context check → context-hygiene
- Verify/QA → verification-loop
- New project → start-project
- Client build → build-start → build-prep
- Build done → build-complete
- Lead report → pom-lead-research-report
- Compile brain → business-brain-compiler
- Prompt builder → smart-start-light
- Debug/fix → systematic-debugging
- Session goals → start-session-goals
- Update instructions → Auto-Dream CLAUDE.md promotion (PRIMARY)
- Mirror/observe → trident-mirror (SECONDARY)
- Find skills → trident-scout (SECONDARY)
- Create skill → trident-factory (SECONDARY)
- System health → trident-auditor (SECONDARY)

### Step 5 — Activate Passive Skills

Silently activate (do NOT announce any of these):

1. **UTPP always-on** — auto-upgrade every user message for the rest of the session
2. **Task Observer** (one-skill-to-rule-them-all) — passive mode, queues observations
3. **Mirror Agent** (Trident) — if available, observes from first message
4. **Context Gauge** — track exchange count for threshold alerts
5. **Intervention Watchdog** — monitor for CLAUDE.md intervention triggers

### Step 6 — Set Session Defaults

Derive from operator role (silent):

| Role Category | Default Depth | Default Format | Bias |
|---------------|---------------|----------------|------|
| Builder / Developer | Structured, moderate | Markdown with tables | Action over information |
| Sales / Outreach | Concise, high-signal | Short paragraphs, bullets | Speed over depth |
| Strategy / Analyst | Deep analysis | Sections with evidence | Accuracy over speed |
| New user (no role) | Moderate | Balanced | Clarity over brevity |

### Step 7 — Repo Intake Check

If HAS_FILESYSTEM and HAS_GIT:
1. Check if workspace repo exists
2. Run `git pull origin main` to get team changes
3. Scan for unorganized content
4. If found → trigger repo-intake silently
5. If nothing → skip

### Step 8 — Check Maintenance Schedule

Check cadences. If due, append one-line notice to brief (not blocking).

| Cadence | Trigger | Notice |
|---------|---------|--------|
| Weekly Reset | 7+ days since last | "Weekly reset due. Say 'run weekly reset' when ready." |
| Monthly Audit | 30+ days since last | "Monthly skill audit due. Say 'run skill audit' when ready." |
| Quarterly Prune | 90+ days since last | "Quarterly prune due. Say 'run quarterly prune' when ready." |

---

## Session Brief (the ONLY visible output)

After all silent steps complete, output this compact brief:

```
━━━ Session Ready ━━━
[Name] ([Role]) | Skills: [count] | Observer: Active | UTPP: On
[If available] Last: [one-line summary of last session]
[If ACTIVE_PROJECT] Project: [name] — Phase [N]: [phase] | Next: [top priority]
[If BRAIN not loaded] ⚠️ BRAIN.md missing — run /business-brain-compiler
[If maintenance due] [one-line notice]
━━━━━━━━━━━━━━━━━━━━━
```

**That's it.** No questions. No menu. No options.

For first-time users ONLY, add below the brief (once, never again):
```
Quick commands: /start-session-goals (plan session) | /build-start (begin build) | /self-learning (capture)
```

### Auto-Boot Inline Response

**If this boot was triggered by CLAUDE.md auto-boot (not a manual /start-session):**
1. Output the session brief above
2. **Immediately process the user's original message** — the message that triggered auto-boot
3. Both appear in one response: brief first, then the full answer to their question/task
4. Do NOT add "Session ready. Type your task..." — they already typed it

**If this boot was triggered manually (/start-session) or from /start-project:**
After the brief, offer one line:
"Session ready. Type your task or say /start-session-goals to plan this session."
This is an OFFER, not a gate.

**If triggered from /start-project:** Suppress the /start-session-goals offer.
The operator just initialized a project — goals would be premature.

---

## Mid-Session Behaviors

### UTPP Always-On

Once booted, the UTPP pipeline is active on EVERY user message. No "utpp" suffix needed.

**Exceptions — do NOT apply UTPP to:** one-word confirmations ("yes", "no", "ok"),
navigation commands ("/compact", "/clear"), direct file references, wrap-up triggers,
answers to questions from other skills.

### Context Alerts

Track exchange count. Display threshold alerts at END of responses.

| Exchanges | Context Est. | Alert |
|-----------|-------------|-------|
| 15 | ~50% | "Context at ~50%. Good time to /compact after this task." |
| 25 | ~75% | "Context at ~75%. Recommend compacting soon." |
| 35 | ~90% | "Context at ~90%. Save summary now, start new session." |

### Skill Chaining

When the user's message matches multiple routing entries, chain in logical order:
- "brainstorm then build" → brainstorming → gsd
- "research this lead then draft outreach" → pom-lead-research-report → utpp
- "wrap up and update instructions" → self-learning → Auto-Dream promotion

### Task Boundary Detection

If the user shifts to a clearly different topic/project:
"Looks like a new task. Want me to run a quick context transition?"
This triggers context-hygiene's transition protocol.

**Project switch:** If user references a DIFFERENT project than `ACTIVE_PROJECT`:
"Switching project context to [new project]. Loading state now."
Re-run Step 3b for the new project.

### Intervention Watchdog

Monitor for anti-patterns from CLAUDE.md intervention triggers:
- Building without deployment plan
- Scope expanding beyond need
- 3+ options open late in a decision
- Tool comparison without shipping
- Premium attention on low-leverage work

Interventions are ONE sentence appended to end of response. Never interrupt. Never lecture.
Only flag when pattern is clear and sustained (2+ signals).

### Inactivity Auto-Wrap + Auto Dream (30 minutes)

If 30+ minutes between messages:
1. Run Auto Dream cycle silently
2. Run standard wrap-up capture
3. Output: "30+ min idle. Auto Dream ran — memory consolidated. Continuing fresh."
4. Process new message normally

### Auto Dream Consolidation Cycle (4 phases)

**Triggers:** 30+ min inactivity, "run auto dream" manual, pre-compaction, session end.

**Phase 1 — Orientation:** Survey auto-memory state.
**Phase 2 — Gather Signal:** Find contradictions, stale entries, duplicates, patterns.
**Phase 3 — Consolidation:** Delete contradicted facts, convert dates, merge duplicates,
update business_brain.md, promote validated patterns, check CLAUDE.md promotion candidates.
**Phase 4 — Prune and Index:** Clean MEMORY.md, re-sort, flag if >200 lines, stamp date.

CLAUDE.md promotion requires explicit user approval. Never auto-write.

---

## Session End Protocol

**Trigger:** "wrap up", "done", "goodnight", "session end", "done for today"

1. **Step 1a (ALWAYS):** Capture learnings → observer dump → session summary
2. **Step 1b (if project active):** Update project-state.md, backlog, session summaries,
   reload packs, build log
3. **Step 1b.5 (if project active):** Quick hygiene scan — flag misplaced files
4. **Step 1c (ALWAYS):** Dream consolidation — cross-project learnings, patterns,
   CLAUDE.md promotion check
5. **Step 2:** Capture chain: self-learning → Auto-Dream → trident-mirror (if available) → repo-sync
6. **Step 3:** Output session complete summary

---

## Error Handling

| Scenario | Action |
|----------|--------|
| Manifest not found | Use memory fallback. Continue. Never mention /start-system. |
| Context files missing | Note in brief. Continue. |
| Git pull fails | Log silently. Continue boot. |
| Unknown operator | Ask name and role (only allowed question). Save for future. |
| No projects detected | Skip. Set ACTIVE_PROJECT = none. |
| Multiple projects ambiguous | Ask which project (only other allowed question). |
| Observer activation fails | Log silently. Session still functional. |
| Dream cycle corrupt memory | Flag file, skip it, continue with healthy files. |
| Session end triggered mid-task | "Work in progress detected. Capture state before closing?" |
| session-config.md missing | Create with today's date. Continue. |

---

## Idempotency

Running `/start-session` twice is safe. `SESSION_BOOTED` flag prevents re-execution.
Second call outputs: "Session already initialized. Say '/restart-session' to force reboot."

---

## Absolute Rules

1. **ZERO questions during boot.** The only exceptions: first-time user (name/role) and
   ambiguous multi-project detection. Everything else resolves silently.
2. Never skip session end capture — Step 1a always runs.
3. Never auto-write to CLAUDE.md — propose changes, user approves.
4. Never display routing table or raw memory contents.
5. Never block on missing files — note and continue.
6. Never skip UTPP once activated.
7. Never force maintenance — cadences are nudges, not gates.
8. Trident is SECONDARY — skip if missing. Auto-Dream is PRIMARY.
9. Auto-Dream writes to `.auto-memory/` autonomously — only CLAUDE.md needs approval.
10. **Never prompt user to run /start-system.** Resolve paths autonomously through fallbacks.

---

## Platform Notes

| Platform | Boot | Mid-Session | End |
|----------|------|-------------|-----|
| **Chat** | Steps 1-5, 8. No filesystem. | UTPP + context alerts. | Step 1a only. |
| **Code** | Full boot (Steps 0-8). | All behaviors active. | Full chain + repo sync. |
| **Cowork** | Full boot (Steps 0-8). Step 0b loads Memory mount. | All active. | Full chain. Repo sync via terminal. |

**Cowork notes:**
- Skills directory (`.claude/skills/`) is read-only.
- Git on mounts may fail (use PAT-001 fallback).
- **Two storage layers:** `Memory/` mount (real Windows filesystem, git-synced) vs `.auto-memory/` (Cowork-internal, fallback only). Memory mount wins.

---

## Dependencies

**Required:** auto-memory files, CLAUDE.md (global)

**Strongly recommended:** `Memory/` mounted folder (canonical BRAIN.md, learnings.md, user-identity.md)

**Optional:** .workspace-manifest.json, session-config.md, Trident folder, workspace repo

---

## Skill Chaining

| Event | Chain To |
|-------|----------|
| Auto-chained FROM | /start-project (Phase 8 — after project init) |
| Session active | utpp (always-on), one-skill-to-rule-them-all (passive), trident-mirror (if available) |
| Session goals requested | /start-session-goals (optional, user-initiated) |
| Session end | self-learning → Auto-Dream → trident-mirror → repo-sync |
| Maintenance triggered | context-hygiene, file-organizer, trident-auditor |
| New project requested | start-project |

---

## Reference Files

- `references/session-end-protocol.md` — full session end capture chain
- `references/repo-intake.md` — auto-classification for loose files
- `references/repo-sync.md` — GitHub sync protocol

---

## CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| v5.0 | 2026-04-09 | ZERO-QUESTION REWRITE + AUTO-BOOT. All priming questions removed (moved to /start-session-goals). Boot is fully silent — outputs compact brief, then processes user's message inline (zero extra round-trips). Auto-Boot Mode added: CLAUDE.md directive triggers this skill on first message of every new conversation automatically. Auto-boot processes user's original message in same response as brief. Step 0 rewritten: no start-system hard stop. Rule 1: ZERO questions during boot. Rule 10: never prompt for start-system. Skill Chaining updated. |
| v4.1 | 2026-04-06 | Memory Mount Gate (Step 0b). BRAIN.md resolution order. Platform notes updated. |
| v4.0 | 2026-04-06 | Auto-Dream PRIMARY, Trident SECONDARY. Project context bridge (Step 3b). UTPP always-on. Intervention Watchdog. Inactivity auto-wrap. Dream consolidation cycle. |
