---
name: wrap-up
description: "Session end sequencer — runs the FULL POM AI wrap-up chain in the correct order: self-learning → Task Observer dump → project state update → Auto-Dream → Obsidian sync → trident-mirror → instructions-maintainer (conditional) → repo-sync. Invoke whenever the user says 'wrap up', 'call it a night', 'goodnight', 'done for today', 'done', 'session end', 'end of session', 'that's it for tonight', 'let's close out', 'all done'. This is the canonical session-end sequencer — always run it at the end of every meaningful session."
version: "2.0"
created: "2026-04-21"
source: "Cowork Session End Protocol — start-session/SKILL.md lines 534-551 + wrap-up-session-chain-reference.md"
---

# Wrap-Up — Full Session End Sequencer

Chains the complete POM AI session-end pipeline. The order matters — each step feeds the next. Do not reorder. Do not skip steps unless explicitly indicated.

---

## Execution Chain (9 steps, sequential)

### Step 1a — Self-Learning + Task Observer Dump

Run both in this step before moving on.

**1a-A: Invoke `self-learning` skill**

Self-learning scans the session for 6 signal types:
1. Corrections (user redirected Claude)
2. Quality rejections (output wasn't good enough)
3. Approach pivots (plan changed mid-execution)
4. Repeated corrections (same error 2+ times → auto-tag [PROMOTE])
5. Wins (what worked well)
6. Tool/format preferences

It then:
- Classifies each learning as Behavioral / Technical / Process / Anti-pattern
- Writes structured entries to `learnings.md` (newest at top, all required fields)
- Runs dedup logic — merges similar, flags contradictions to user
- Runs promotion check — fast-track anti-patterns, standard track at 3+ occurrences
- Feeds tracker files: gaps-tracker.md, patterns-tracker.md, corrections-tracker.md
- Tags team-relevant learnings [TEAM] / [BEST-PRACTICE]
- Flags [SCOUT-PRIORITY] at 3+ gap frequency, [FACTORY-CANDIDATE] at 2+ pattern frequency

**1a-B: Invoke `one-skill-to-rule-them-all-fixed` skill (Task Observer dump)**

The Task Observer has been watching passively all session. At wrap-up it dumps its log:
- Writes to `.claude/task-observer-log-YYYY-MM-DD.md`
- Contents: corrections, new patterns, observer blind spots
- Each observation tagged with: affected skill, suggested improvement, confidence level
- Includes "New Skill Candidates" section and self-assessment

If the skill isn't installed or fails: skip silently, note in summary.

**Hand off to Step 1b:** Note whether a project is currently active.

---

### Step 1b — Project State Update (CONDITIONAL — only if project active)

**Skip this step if no project is mounted.**

**Detection (check in order):**
1. Check `[CWD]/.claude/active-project` — if it exists and is valid JSON, parse it:
   - `memory_path` → where to write session summaries
   - `project_name` → display name for the summary file
   - `project_root` → root for governance files
   Set `ACTIVE_MEMORY_PATH = memory_path`, `ACTIVE_PROJECT_PATH = project_root`.
2. Fallback: if no pointer file, check if `[CWD]/01_GOVERNANCE/project-state.md` exists.
   Set `ACTIVE_PROJECT_PATH = CWD`, `ACTIVE_MEMORY_PATH = CWD/07_MEMORY`.
3. If neither found: skip this step entirely.

If an active project is detected:
1. Update `[ACTIVE_PROJECT_PATH]/01_GOVERNANCE/project-state.md` if it exists — current phase, what changed, what's next
2. Update backlog if any items were completed or added
3. **Write session summary to `[ACTIVE_MEMORY_PATH]/session_summaries/YYYY-MM-DD_HHMM_topic.md`** — this is the primary output; always write it when a project is detected
4. Update or create reload pack in `[ACTIVE_MEMORY_PATH]/reload_packs/` (if dir exists)
5. Append to build log if build work was done

**Session summary format (minimal, always write):**
```markdown
# Session — [YYYY-MM-DD HH:MM] — [topic slug]
Project: [project_name]

## Session focus
[1-2 sentences on what was worked on]

## What changed
- [bullet per meaningful change]

## Open loops
- [unresolved items or blockers]

## Next priority
[single most important next action]
```

---

### Step 1b.5 — Quick Hygiene Scan (CONDITIONAL — only if project active)

Quick scan for misplaced files in the project directory. Flag any files that are in root when they should be in a subdirectory. Do not move without asking. One-line report: "X misplaced files detected" or "Project structure clean."

---

### Step 1c — Auto-Dream Consolidation

Auto-Dream consolidates cross-session memory from `.auto-memory/`. 4 phases:

**Phase 1 — Orientation:** Survey `.auto-memory/` state. Count files. Check MEMORY.md index.

**Phase 2 — Gather Signal:** Find:
- Contradictions between memory files
- Stale entries (relative dates → convert to absolute)
- Duplicates across files
- Patterns that have appeared in multiple sessions

**Phase 3 — Consolidation:**
- Delete contradicted facts (keep the more recent/explicit one)
- Convert relative dates to absolute ("last Tuesday" → "2026-04-15")
- Merge duplicates
- Update `business_brain.md` if business context changed
- Promote validated patterns
- Flag CLAUDE.md promotion candidates for user approval (never auto-write CLAUDE.md from Auto-Dream)

**Phase 4 — Prune and Index:**
- Clean MEMORY.md index (remove stale entries)
- Re-sort entries by recency
- Flag if >200 lines
- Stamp `Last updated:` date

**Note:** Auto-Dream CLAUDE.md promotions always require explicit user approval — never auto-write.

---

### Step 1d — Obsidian Vault Sync

**Run if obsidian-vault MCP is available. Wrap each write in try/except — never block on one failure.**

5 writes, in order:

1. **Append to `wiki/meta/session-index.md`** — one row: date, session_id, keywords (3-7 #tags), one-sentence summary (imperative tense: "Built X, fixed Y"), primary artifact link
2. **Update `wiki/meta/active-plans.md`** — advance any in-flight plan status that was touched. Move completed plans to ✅ section. Add new multi-session plans.
3. **Update `wiki/hot.md`** — overwrite (not append): Current Focus, Open Loops, What Just Shipped. This is a living doc.
4. **Update `wiki/meta/system-state.md`** — if any env/install/network state changed, update the relevant row. If nothing changed, update only `Last updated:` line.
5. **Error aggregation** — if any write failed, report immediately with which file and the error. Never silently swallow.

If obsidian-vault MCP unavailable: note ⚠️ in summary, continue to Step 2.

**Fallback:** If Step 1d fails on 2+ writes, invoke `obsidian-sync-watchdog` skill if available.

---

### Step 1e — Cognee Ingest

**Run after Obsidian sync. Skip silently on SSH failure — never block the wrap-up chain.**

Write the full session summary to the Gamma RESEARCH queue for Cognee ingestion into LanceDB.

**Format (200 words max):**

```markdown
# Session Wrap — [PROJECT] · [YYYY-MM-DD HH:MM]
type: session-wrap
tags: #session-memory #[project-slug] #[YYYY-MM-DD]

## Focus
[1-2 sentences on the session's primary work]

## Decisions Made
- [decision] → [outcome/choice]

## Learnings Captured
- [key learnings from self-learning step]

## What Shipped
- [anything completed or deployed]

## Open Loops Carried Forward
- [unresolved items for next session]

## Next Priority
[single most important action for next session]
```

**Write via SSH to Gamma RESEARCH queue:**
```bash
ssh -i ~/.ssh/ouroboros_hetzner root@46.224.192.227 \
  "cat > /workspace/RESEARCH/wrap-$(date +%Y%m%d-%H%M%S).md" << 'SUMMARY'
[formatted summary]
SUMMARY
```

**Rules:**
- Fire-and-forget — do NOT wait for distiller confirmation
- If SSH fails: log ⚠️ in wrap-up summary, continue chain
- Distiller picks up within 30 min on its cron schedule
- This is the most complete Cognee write — use the full session context from Steps 1a-1d

---

### Step 2a — Trident Mirror

Invoke the `trident-mirror` skill.

It scans for 6 observation types: corrections, skill gaps, workflow patterns, preference signals, build activity, quality misses. Scores session health on 4 dimensions (0-5 each, /20 total). Writes to:
- `C:\Users\jackp\.claude\trident\mirror\session-log-[DATE].md`
- `skill-gaps.md` (append new gaps, increment frequency)
- `patterns.md` (append new patterns)
- `correction-density.md` (increment categories)

**Dedup note:** Self-learning already wrote to tracker files in Step 1a. Trident-Mirror should increment frequencies and add new observations, not duplicate Step 1a entries.

Flags: `[SCOUT-PRIORITY]` at 3+ gap frequency. `[FACTORY-CANDIDATE]` at 3+ pattern frequency. `[AUDITOR-REVIEW]` if health score <12/20.

**Hand off:** Pass [PROMOTE] entry list from self-learning to Step 2b.

---

### Step 2b — Instructions Maintainer (CONDITIONAL)

**Only runs if self-learning (Step 1a) tagged any entries [PROMOTE], or if anti-patterns were explicitly detected.**

Invoke `anthropic-skills:instructions-maintainer`.

It:
- Reads learnings.md for [PROMOTE] tagged entries
- Drafts CLAUDE.md edits (additions, modifications)
- Presents diff to user for approval
- On approval: applies changes to CLAUDE.md, tags promoted entries [ABSORBED]

If no [PROMOTE] entries: skip silently.

---

### Step 2c — Repo Sync

Invoke the `repo-sync` skill (from `start-session/repo-sync.md`).

It:
- Detects changed skill files in `~/.claude/skills/` vs trident-code repo
- Copies changed skill folders to `C:\Users\jackp\Claude-Projects\trident-code\`
- Commits with descriptive message: "Update: [skills] — [date]"
- Pushes to `github.com/mrhappytimes/trident-code`
- Flags any unmapped new skills for repo-intake

If trident-code repo doesn't exist or git isn't configured: note in summary, skip silently.

---

### Step 2d — Marathon Build Tracker Update

**Always run. Takes <60s. Never block on failure.**

Read `C:\Users\jackp\.claude\MARATHON.md` and update it:

1. **Find current project entry** — match CWD against `Project` field in any MARATHON entry. If pointer file exists, use `project_root`.
2. **Stamp `last_session: [DATE]`** on the matching entry.
3. **Update status if a build phase completed this session:**
   - Phase completed → advance phase counter or mark ✅ COMPLETE
   - Build paused (session ending mid-build) → set ⏸️ PAUSED + update `Hold signal` with what's needed to resume
   - New build started → add a new MARATHON entry (use next available ID)
4. **Release locks** if build is COMPLETE.
5. **Conflict check for next session:** scan for any PAUSED or IN_PROGRESS entries in MARATHON.md and list them in the wrap-up summary so Jack knows what's pending before starting the next session.

**Output line in summary:** `Marathon: [N] active builds · [build names] · [any PAUSED items needing resume]`

---

## Combined Output Format

After all steps complete, show ONE consolidated summary. No separate outputs from each sub-skill:

```
━━━ Session Wrapped · [DATE] ━━━

Self-learning:  [N] learnings captured · [N] promoted · [N] team-tagged
Task Observer:  [✅ dumped to task-observer-log-DATE.md / ⚠️ skipped]
Project state:  [✅ updated / — (no project active)]
Auto-Dream:     [N] memory files consolidated · [N] contradictions resolved
Obsidian sync:  [✅ 4/4 writes / ⚠️ N failed: (list files)]
Cognee ingest:  [✅ queued → /workspace/RESEARCH/wrap-*.md / ⚠️ skipped (SSH unavailable)]

Mirror:         [N] observations · health [X]/20
CLAUDE.md:      [✅ N rules promoted / — (no PROMOTE entries)]
Repo sync:      [N] skills updated / no changes
Marathon:       [N] active builds · [build IDs] · [paused items]

Open for next session:
  1. [top priority] (Source: this session · Artifact: [file/link])
  2. [second priority] (Source: this session · Artifact: [file/link])
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Quick Wrap Mode

User says "quick wrap" or "just mirror":
- Run Step 2a (trident-mirror) only
- Skip everything else
- Output: "Quick wrap done — [N] observations captured. Full chain skipped."

---

## Error Handling

| Scenario | Action |
|----------|--------|
| self-learning fails | Log error, skip to Task Observer, continue chain. Note in summary. |
| Task Observer not installed | Skip 1a-B silently. Note in summary. |
| No project mounted | Skip Steps 1b and 1b.5 silently. |
| Auto-Dream finds CLAUDE.md candidates | ALWAYS show user for approval — never auto-write. |
| Obsidian MCP unavailable | Note ⚠️, continue. learnings.md is the backup. |
| instructions-maintainer skipped | Only skip if zero [PROMOTE] entries — never skip if entries exist. |
| Repo sync fails (auth/network) | Note in summary. Tell user to push manually next session. |
| SSH to Gamma fails (Step 1e) | Log ⚠️ in summary, skip Cognee ingest, continue chain. |
| Any step hangs >30s | Abandon that step, continue chain, note in summary. |

---

## Files Written at Session End (Complete Map)

| File | Writer | When |
|------|--------|------|
| `learnings.md` | self-learning | Step 1a |
| `.claude/task-observer-log-DATE.md` | Task Observer | Step 1a |
| `01_GOVERNANCE/project-state.md` | wrap-up | Step 1b (if project active) |
| `07_MEMORY/session_summaries/*.md` | wrap-up | Step 1b (if project active) |
| `.auto-memory/*.md` | Auto-Dream | Step 1c |
| `MEMORY.md` | Auto-Dream | Step 1c |
| `wiki/meta/session-index.md` | Obsidian sync | Step 1d |
| `wiki/meta/active-plans.md` | Obsidian sync | Step 1d |
| `wiki/hot.md` | Obsidian sync | Step 1d |
| `wiki/meta/system-state.md` | Obsidian sync | Step 1d |
| `trident/mirror/session-log-DATE.md` | trident-mirror | Step 2a |
| `trident/mirror/skill-gaps.md` | trident-mirror | Step 2a |
| `trident/mirror/patterns.md` | trident-mirror | Step 2a |
| `trident/mirror/correction-density.md` | trident-mirror | Step 2a |
| `CLAUDE.md` | instructions-maintainer | Step 2b (conditional) |
| `trident-code repo / GitHub` | repo-sync | Step 2c |
| `/workspace/RESEARCH/wrap-*.md` on Gamma | Cognee ingest | Step 1e (if SSH available) |
