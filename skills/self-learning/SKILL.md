---
name: self-learning
description: "Trident Self-Learning System — captures session corrections, mistakes, and insights into learnings.md. Extended with Trident hooks: feeds Mirror, tags team learnings [TEAM], flags promotions for CLAUDE.md, and pushes to shared Supabase. Trigger at END of any meaningful work session, or when user says 'wrap up', 'what did we learn', 'session wrap', 'log learnings', 'capture corrections', 'capture insights', 'learned today', 'self-learning', 'session learnings', 'end of session', 'goodnight', 'done for today'. This is the foundation of the self-improving loop — use it every session."
effort: medium
version: "3.3"
updated: "2026-04-14"
changelog: |
  v3.3 -- OBSIDIAN SYNC AMENDMENT (2026-04-14)
  - Step 3 entry template: added Source session + Primary artifact fields
  - Step 7b added: mandatory Obsidian MCP writes at session end
    (session-index.md row, active-plans.md status, hot.md open loops)
  - Output section: open items now require Source + Artifact on every item
  - Auto-Chain updated to include Obsidian sync before instructions-maintainer
  - Fixes root cause of context-loss incidents #1 and #3
---

# Self-Learning Skill (Trident Extended)

Capture what worked, what didn't, and what Claude must do differently. This skill closes the feedback loop between sessions.

## Why This Matters

Every time a user corrects Claude, that's a tax. Without capture, you pay that tax again next session. With capture, you pay once, write the rule, and it compounds across every future interaction.

## When to Run

- **End of any session** where substantive work was done (execution, planning, analysis)
- **After Claude made a mistake** the user corrected
- **After a multi-step task** where the approach evolved or required course correction
- **When the user explicitly signals:** "wrap up", "done", "goodnight", "end session", "what did we learn", "capture that", "learned today", "done for today", "save what we learned"
- **After two failed corrections** on the same issue (automatic escalation to [PROMOTE])
- **Weekly as a review/prune ritual** to consolidate and archive

## File Location

`learnings.md` in the `.claude/` directory (or working directory if no `.claude/` exists).

## Pre-Flight Check

Before capturing, execute ALL checks:

1. **Verify learnings.md exists** — if not, create with header: `# Learnings & Session Corrections`
2. **Check session viability** — if session was <5 minutes of work, skip capture. Output: "Micro-session (<5 min), no learnings to capture." Return.
3. **Idempotency check** — scan learnings.md for entries dated TODAY with matching context. If found, ask user: "I found a learning from earlier today on [topic]. Merge with new insights, or log separately?"
4. **Size check** — count entries in learnings.md. If 80+, warn: "learnings.md has [N] entries (cap: 100). Run maintenance soon." If 100+, run Size Management (below) before appending.

## Capture Process

### Step 1: Scan Session for 6 Signal Types

1. **Corrections** — Where did the user redirect Claude?
   - "You suggested X, but I needed Y"
   - "That approach was wrong, do this instead"
   - Any explicit "no, actually..." moment
   - Format: `CORRECTION: [category] — [what you did] → [what user wanted]`
   - Categories: tone, format, structure, content, scope, approach, speed, tool choice

2. **Quality Rejections** — Where was output not good enough without explicit correction?
   - User rewrote significantly
   - User said "that's not quite right" but didn't fully specify the fix
   - User's fix revealed a pattern Claude missed
   - Format: `QUALITY: [domain] — [what was wrong] — [user's fix]`

3. **Approach Pivots** — Where did the plan change mid-execution?
   - Strategy shifted based on new information
   - Original plan was valid but inefficient
   - Risk or blocker forced a path change
   - Format: `PIVOT: [domain] — [original plan] → [new plan] — [trigger]`

4. **Repeated Corrections** — Same class of error corrected 2+ times (MUST be captured and flagged [PROMOTE])
   - Format: `REPEATED: [category] — [error pattern] — [occurrences: N]`

5. **Wins** — What worked exceptionally well?
   - Approach that user praised or adopted
   - Problem-solving method user wants to reuse
   - Format: `WIN: [domain] — [what worked] — [why it stood out]`

6. **Tool/Format Preferences** — Delivery preferences revealed
   - Format preference (markdown over docx, etc.)
   - Tool preference (Google Docs over Word, etc.)
   - Process preference (ship fast vs. perfect, etc.)
   - Format: `PREFERENCE: [category] — [signal] — [context]`

**Batch handling (10+ signals):** Process in priority order: Repeated Corrections first, then Corrections, Quality Rejections, Pivots, Preferences, Wins. Show progress: "Processing learning 3 of 12..."

### Step 2: Classify Each Learning

| Type | Definition | Destination | Promotion Path |
|------|-----------|-------------|-----------------|
| **Behavioral** | How Claude acts, tone, approach | learnings.md → eventual CLAUDE.md | Standard (3+ appearances) |
| **Technical** | Code patterns, tool usage, libraries | learnings.md → eventual skill update | [SKILL-UPDATE] tag |
| **Process** | Workflow sequence, gates, decision trees | learnings.md → eventual skill or SOP | [FACTORY-CANDIDATE] if recurring |
| **Anti-pattern** | What to STOP doing (explicit user instruction) | learnings.md → FAST TRACK to CLAUDE.md | Same session, if clear |

### Step 3: Write Structured Entries

```markdown
### [DATE] — [Short Title]
**Type:** [Behavioral / Technical / Process / Anti-pattern / Quality / Preference]
**Context:** What was being worked on (1-2 sentences)
**What happened:** The specific mistake, correction, insight, or win (2-3 sentences)
**Correction:** What must happen instead (1 sentence, imperative)
**Applies to:** [category or domain]
**Confidence:** [high / medium / low] (see Confidence Criteria below)
**Occurrences this session:** [1 / 2+ if repeated]
**Source session:** [session_id where this originated — use current session ID]
**Primary artifact:** [file path, vault note link, or skill name this relates to — or "none"]
**Tags:** [TEAM] [BEST-PRACTICE] [SCOUT-PRIORITY] [FACTORY-CANDIDATE] [PROMOTE] [HOLD] (as applicable)
```

**Source session + Primary artifact are REQUIRED fields.** Every entry must have them.
- Source session prevents orphaned open items — a future Claude can pull the exact session and artifact to understand context.
- Primary artifact links the learning to a concrete output (e.g., `[[active-plans]]`, `skills/promote-to-obsidian/SKILL.md`, `wiki/meta/system-state.md`).
- If no artifact exists: write `"none"` — do NOT leave blank.

### Confidence Criteria

Assign confidence based on objective signals, not gut feel:

| Level | Criteria | Examples |
|-------|----------|---------|
| **High** | User explicitly stated rule, OR same correction appeared 2+ times, OR user praised the fix | "Never do X again", repeated correction, "yes exactly that" |
| **Medium** | User corrected once with clear reasoning, OR implicit signal from behavior | Single correction with explanation, user rewrote output |
| **Low** | Inferred from context without explicit user feedback, OR contradicts earlier learning | Pattern noticed but not validated, ambiguous signal |

### Step 4: Deduplication Logic

Before appending ANY entry, execute this algorithm:

1. **Scan learnings.md** for entries with matching context (same domain, same correction topic)
2. **If exact duplicate found** (same context, same correction, same date):
   - Do NOT append
   - Report to user: "This learning is already captured [date]"
   - Offer: "Increment the occurrence count, or log as separate case?"

3. **If similar entry found** (same domain, similar correction, different dates):
   - Check dates: if earlier entry is <30 days old, treat as related
   - Merge: update earlier entry — upgrade confidence (low→medium, medium→high), increment `Occurrences: N+1`
   - Report: "[DATE] learning merged with [EARLIER_DATE] learning. Confidence upgraded to [level]."

4. **If contradictory entry found** (same domain, OPPOSITE corrections):
   - Contradiction detected. Report to user:
     - "Contradiction found: [EARLIER_DATE] says 'do X', new learning says 'do Y'. Which is correct?"
   - User action required: archive the old one (tag `[SUPERSEDED]`), keep the new one, or merge with note
   - Never silently override

5. **If no match:** Proceed to append

### Step 5: Append to learnings.md

- **Newest entries at the TOP** (reverse chronological)
- **Validate entry format** before writing — every field from Step 3 template must be present. If any field is empty, fill with "[NEEDS REVIEW]" and flag to user.
- **After appending**, show confirmation: "Captured: [Type] — [title]"
- **If 2+ entries appended**, show count: "Captured 3 learnings from this session"

### Step 6: Promotion Check

Execute promotion logic **immediately after capture** (same session):

#### Fast Track (same session):
- **Anti-patterns** → If user said "never do X again", propose adding to CLAUDE.md immediately with tag `[PROMOTE]`
- **Explicit "always/never" user instructions** → Flag `[PROMOTE]` and show preview of proposed CLAUDE.md change
- **Two+ corrections on the same issue** → Automatically tag `[PROMOTE]` with note: "Repeated correction detected"

#### Standard Track:
- **High confidence + 3+ appearances across sessions** → Tag `[PROMOTE]` for CLAUDE.md (instructions-maintainer processes this)
- **High confidence + skill-specific** → Tag `[SKILL-UPDATE]` with target skill name
- **Medium confidence + 2 appearances** → Do NOT promote; leave for next review

#### Hold Track:
- If user says "not ready to promote" or "still testing this" → Tag `[HOLD]` instead of `[PROMOTE]`. Re-evaluate next weekly review.
- `[HOLD]` entries are excluded from automatic promotion until user manually removes the tag.

#### Prune Track:
- **60+ days, no reinforcement** → Tag `[REVIEW]` (candidate for archival)
- **Already in CLAUDE.md or a skill** → Tag `[ABSORBED]` for removal in next maintenance pass

### Step 7: Team & System Integration

#### Hook 1: Feed Mirror
If `gaps-tracker.md`, `patterns-tracker.md`, or `corrections-tracker.md` exist in the working directory, append relevant observations:
- New gaps → append to `gaps-tracker.md` with date and confidence
- Workflow patterns → append to `patterns-tracker.md` with frequency marker
- Corrections by category → increment counter in `corrections-tracker.md`

#### Hook 2: Team Tagging
For each learning, evaluate: "Would this help OTHER team members?"
- `[TEAM]` — correction that applies to anyone using this system
- `[BEST-PRACTICE]` — proven better way discovered this session
- `[USER-SPECIFIC]` — only applies to this user's context/preferences
- Team-tagged learnings are manually reviewed for shared Supabase push (off-session)

#### Hook 3: Cross-User Learning (if Supabase connected)
Check if another team member already solved this:
- Do any other users have a `[BEST-PRACTICE]` tag on a similar issue?
- If yes, note in learnings.md: "Team insight available: [user] found [approach]. Apply?"
- Do NOT auto-apply; surface for user decision

#### Hook 4: Scout/Factory Flagging
- **Skill gaps** → `[SCOUT-PRIORITY]` if same gap appears 3+ times across sessions
- **Workflow patterns** → `[FACTORY-CANDIDATE]` if same multi-step pattern appears 2+ times

### Step 7b — Obsidian Session-End Sync ⚡ NEW IN v3.3

**MANDATORY when obsidian-vault MCP is available. Runs AFTER learnings.md is written. ALL via MCP.**

This step closes the write loop. Without it, learnings stay in learnings.md but never reach the Obsidian vault — meaning the next session's Claude boots without knowing what happened. This was the root cause of context-loss incidents #1 and #3.

**Execute in order:**

1. **Append to `wiki/meta/session-index.md`**
   - Add one row to the session index table (newest at top)
   - Format: `| [DATE] | [session_id] | [#keyword1 #keyword2 ...] | [one-sentence summary — what was accomplished] | [primary artifact link or —] |`
   - Keywords: 3-7 tags. Use `#` prefix. Match the topics actually worked on.
   - Summary: imperative tense. "Built X, fixed Y, shipped Z." Not "We worked on..."
   - If session_id unknown: use `session-[DATE]-[topic]` as fallback

2. **Update `wiki/meta/active-plans.md`**
   - For EVERY in-flight plan that was touched this session: update Status, Next action, Last updated fields
   - If a plan completed: move to ✅ COMPLETED section
   - If a new multi-session plan was scoped: add it to 🟢 IN-FLIGHT section with full entry
   - Do NOT update plans that weren't touched

3. **Update `wiki/hot.md`**
   - Replace "Open Loops" section with the current open items from this session
   - Replace "What Just Shipped" with what was completed this session
   - Replace "Current Focus" with what is next priority
   - hot.md is a living doc — overwrite stale content, don't append

**Error handling:**
- obsidian-vault MCP unavailable → skip Step 7b, add ⚠️ to session output: "Obsidian sync skipped — MCP unavailable. Manually update session-index.md."
- Individual file write fails → log which file failed, continue with others. Never block full session end on one file.

## Error Handling

| Scenario | Action |
|----------|--------|
| **Empty session (no learnings)** | Output: "No substantive corrections or insights this session. Session focused on [task type]." Do NOT create empty entries. Still run Step 7b. |
| **Malformed entry from user** | Ask: "This learning is incomplete. Clarify [missing part]?" Do not append until complete. |
| **Contradiction detected** | Pause dedup. Report both versions to user. Ask: "Which approach is correct?" Do NOT auto-resolve. |
| **learnings.md missing or corrupted** | Create fresh file with header. Log: `[DATE] — System | learnings.md created/recovered`. Continue. |
| **User cancels mid-capture** | Output: "Capture cancelled. No entries appended." Do NOT save partial work. |
| **Promotion threshold ambiguous** | Respect user override. Tag `[HOLD]` instead of `[PROMOTE]`. Re-evaluate next review. |
| **Entry fails format validation** | Flag missing fields with `[NEEDS REVIEW]`. Append entry. Alert user: "Entry has incomplete fields." |
| **Obsidian MCP unavailable** | Skip Step 7b. Add ⚠️ to output. Continue to closing block. |

## Size Management

Target: 50-100 entries max. Warning at 80. Mandatory maintenance at 100+.

When exceeding 100 (or on user request):
1. Remove `[ABSORBED]` entries (already in CLAUDE.md or a skill)
2. Remove `[SUPERSEDED]` entries (contradicted by newer learnings)
3. Merge related entries (consolidate 2-3 similar learnings into 1 synthesis)
4. Archive low-confidence entries >90 days → `learnings-archive.md`
5. Verify remaining entries still apply (ask user: "Is this still relevant?")
6. Compress format where possible (shorten context descriptions without losing meaning)
7. Report: "Maintenance complete. [N] entries removed, [M] archived, [K] merged. Current count: [X]."

## Output to User

After capture, show:

```
Captured [N] learnings this session:
  - [count] [Type] ([brief description])
  - [count] [Type] ([brief description])

[If any] Promoted to [PROMOTE]: [title]
[If any] Contradictions requiring decision: [count]
[If any] Team-relevant [TEAM]: [title]
[If 80+] Warning: learnings.md has [N] entries (cap: 100). Run maintenance soon.

Most impactful correction: [one-line summary]

Open for next session:
1. [Task name]
   - Source: [session_id] (this session)
   - Artifact: [file path, vault note link, or skill name — required]
2. [Task name]
   - Source: [session_id]
   - Artifact: [artifact link]
[Every open item MUST have Source + Artifact. Never output a flat bullet list of open items.]
```

**ALWAYS end every self-learning output with this exact closing block — no exceptions:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  SELF-LEARNING COMPLETE
      Session context documented and stored.
      [N] learnings captured · [N] promoted · [DATE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Fill in the actual numbers. The closing block is the LAST text output. Nothing appears after it.

## Auto-Chain: Obsidian Sync → Then /instructions-maintainer

**After the closing block, execute in order — no user prompt needed:**

1. **Run Step 7b (Obsidian sync)** if not already completed during capture
2. **Invoke `/instructions-maintainer`** — processes any `[PROMOTE]` or `[TEAM]` tagged entries for CLAUDE.md promotion

Both steps are mandatory. They are one pipeline:
session work → self-learning captures → Obsidian syncs → instructions-maintainer promotes → CLAUDE.md permanently improves.

The operator should never have to manually trigger any part of this chain.

## Skill Integration Map

| Upstream (feeds into self-learning) | Downstream (self-learning feeds to) |
|-----|-----|
| **one-skill-to-rule-them-all** → observations | **instructions-maintainer** ← `[PROMOTE]` entries |
| **trident-mirror** → corrections | **trident-factory** ← `[FACTORY-CANDIDATE]` |
| **User feedback** (explicit corrections) | **trident-scout** ← `[SCOUT-PRIORITY]` |
| **Explicit instruction** ("never do X") | **shared Supabase** ← `[TEAM]` learnings |
| | **Obsidian vault** ← session-index, active-plans, hot.md (Step 7b) |

**Before:** No upstream dependency. Trigger independently at session end.
**After:** Step 7b (Obsidian) → Instructions-maintainer consumes `[PROMOTE]` entries. Run self-learning BEFORE instructions-maintainer in maintenance workflows.

## Platform Notes

- **Cowork:** Full support. Reads/writes learnings.md directly. Step 7b runs via obsidian-vault MCP.
- **Claude Code:** Full support. Can commit learnings.md to git for team sharing. Step 7b runs if obsidian-vault MCP configured.
- **Claude.ai Chat:** Manual mode. Produce structured learning list in response; user copies to their learnings.md file. Step 7b skipped (no MCP).

## Idempotency Guarantee

This skill is idempotent:
- Running twice on the same session data will NOT create duplicates (Step 4 dedup prevents it)
- Running on empty session produces safe no-op output
- Running after learnings.md was manually edited will detect and prompt for merge strategy
- Format validation catches malformed entries before they corrupt the file
- Step 7b: session-index.md dedup by session_id — same session ID won't be appended twice
