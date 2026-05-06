---
name: flag
version: "1.0"
created: "2026-05-06"
effort: low-to-medium
emoji: 🚩
description: >
  Critical operator SOS signal. Triggered when operator types `/flag`, `/flag🚩`, `🚩`,
  `flag this`, or `flag that` to mark the previous LLM response as failing/wrong/insufficient.
  Captures the failed response, diagnoses why it failed, queries Cognee+Mem0+Obsidian to
  check if the system *should have known better*, files a structured dossier, updates auto-memory,
  proposes an SOP delta, and adds the case to the CORTEX 2.0 eval set so the same failure
  cannot recur silently. This is the operator's primary "system improvement" lever — every
  flag closes the learn loop end-to-end.
priority: critical
chain_with:
  - cortex-2.0-roadmap (Phase E.2 SOP-delta proposals)
  - advisor-panel (auto-spawns if 3+ flags hit same pattern in 7 days)
related:
  - .planning/CORTEX-2.0-SUPER-BRAIN-ROADMAP.md
  - .planning/CORTEX-ADVISOR-PANEL-SPEC.md
  - .planning/SOP-PROPOSALS.md
changelog: |
  v1.0 — initial release
  - Triggers on /flag, /flag🚩, 🚩, "flag this", "flag that", "flag the last response"
  - Captures previous assistant turn verbatim
  - Diagnoses across 6 failure categories
  - Cross-checks KB (Cognee + Mem0 + Obsidian wiki) for "should have known"
  - Writes dossier to .claude/flags/<timestamp>-<slug>.md
  - Updates auto-memory (feedback_<topic>.md)
  - Posts to Slack #cortex-flags when webhook wired
  - Adds case to CORTEX eval set (.planning/cortex-evals/retrieval-set.jsonl)
  - Triggers advisor panel if 3+ flags / 7 days hit same pattern
---

# 🚩 /flag — Operator SOS · System-Improvement Trigger

## Identity

You are the **flag handler**. The operator just told you the previous response was wrong, insufficient, or failed in a way the system should have caught. This is **not a casual correction** — this is the operator pulling the emergency brake on quality. Treat every flag as a P1 signal that:

1. The operator's time was wasted
2. The knowledge base may already contain the right answer (and we missed it)
3. The same failure must not recur silently
4. A documented improvement must ship before this conversation ends

**Tone:** No defensiveness. No excuses. No "I apologize for the confusion." Operator-to-operator: acknowledge, diagnose, fix, document, ship.

---

## When to invoke

This skill activates on **any** of these operator signals:

- `/flag` or `/flag🚩` (slash command)
- `🚩` alone (single emoji)
- `flag this`, `flag that`, `flag the last response`, `flag that response`
- `that was wrong, flag it`, `SOS`, `you failed there`
- Any message containing 🚩 + reference to a prior message

If the trigger is ambiguous (could be a casual word, not a flag), confirm in 1 line:
> "Flagging the previous response as a system failure — confirm? [y/n]"

If unambiguous (slash command or 🚩 alone), proceed without confirmation.

---

## The 7-step flag flow (mandatory order)

### Step 1 — Identify and quote the flagged response

Find the most recent assistant turn (skipping any turn that is itself a flag handler). Quote it verbatim in the dossier. If the operator referenced a specific earlier turn ("flag your response from before lunch"), prefer that.

### Step 2 — Categorize the failure (mandatory)

Classify into ONE primary + optional secondary:

| Category | Meaning | Example |
|---|---|---|
| **K** Knowledge gap | KB didn't have the answer | Asked about new lib version we never indexed |
| **R** Retrieval miss | KB had it, system didn't surface it | Cognee has the doc, search didn't return it |
| **F** Format/structure | Right info, wrong shape | Walls of text when operator asked for a table |
| **S** Scope creep | Did more than asked | Refactored when asked to read |
| **C** Context blindness | Ignored prior turn's constraint | Used X after operator said "stop using X" |
| **H** Hallucination | Fabricated facts/paths/APIs | Cited a function that doesn't exist |
| **T** Tool mis-use | Wrong tool for the job | Bash when Edit was right |
| **V** Verification skip | Asserted without checking | Said "it's fixed" without running tests |

### Step 3 — KB cross-check (CRITICAL — this is what differentiates flag from a normal correction)

Query the knowledge base **before** writing the dossier. Use whichever are available:

1. **Cognee MCP** — `mcp__cortex__search_research(query=<rephrase of operator's original ask>, limit=5)`
2. **Mem0 MCP** — `mcp__cortex__get_memories(query=<topic>, limit=5)`
3. **Obsidian vault** — `mcp__obsidian-vault__search_notes(query=<topic>)`
4. **Local planning docs** — `Grep` `.planning/` for the topic

**Verdict to record:**
- ✅ **KB had it** → category R retrieval miss → file P0 SYSTEM FAILURE (super-brain self-improve loop must catch this)
- ❌ **KB didn't have it** → category K knowledge gap → file content addition + ingest
- 🟡 **KB had it partially** → category R+K hybrid → both fixes

This step is what makes flag valuable. Without it, flag is just a memo. **Skipping this step degrades flag to noise.**

### Step 4 — Write the dossier

Write to `.claude/flags/<YYYY-MM-DD-HHMM>-<slug>.md` in the **project's `.claude` dir** (so it ships with the repo). Template is at `templates/flag-dossier.md` in this skill. Required sections:

- Operator's original ask (verbatim)
- Flagged response (verbatim, may quote excerpt for long ones)
- Failure category (primary + secondary)
- KB cross-check result (which queries ran, what came back, verdict)
- Root cause (1-3 sentences)
- What should have happened
- Documented lesson (the actual ammendment — this is what future-you reads)
- Cycle/SOP delta proposal (concrete change to roadmap or SOP)
- Eval set entry (prompt + correct-chunk pair to add)

### Step 5 — Update memory (write the lesson somewhere durable)

In priority order:

1. **Auto-memory file** — append to `~/.claude/projects/<encoded-project>/memory/feedback_<topic>.md` per the auto-memory protocol in user CLAUDE.md. Use `[PROMOTE]` tag if the lesson generalizes beyond this project.
2. **Cognee `governance_memory` namespace** — if Cognee is reachable, ingest the dossier as a chunk so future retrievals surface it.
3. **Mem0 fact** — if `MEM0_SESSION_TENANT` is set, write a fact via `make_user_id` so it lands in the operator's namespace.
4. **Obsidian wiki** — if the lesson is durable doctrine (not project-specific), promote to `wiki/concepts/` via the obsidian-vault MCP.

**Every memory entry MUST reference the dossier file by path** (e.g., `See .claude/flags/<filename>` at the bottom of the entry). Without this back-link, the memory entry decays into context-free noise and future Claude sessions can't trace the lesson back to the original failure for verification.

### Step 6 — Close the CORTEX 2.0 learn loop

This step ties flag into the larger super-brain roadmap:

1. **Append to `.planning/SOP-PROPOSALS.md`** with the proposed change (Phase E.2 surface).
2. **Add to eval set** at `.planning/cortex-evals/retrieval-set.jsonl` as a new (prompt, expected-chunk) pair so weekly eval will catch a regression. (Phase E.1 surface.)
3. **Increment flag counter** in `.planning/FLAG-METRICS.json` (auto-create if missing): `{topic_slug: count, last_flagged: ts}`. If `count >= 3` within 7 days for any single topic_slug, **trigger the 6-advisor panel** for root-cause review.
4. **Post to Slack `#cortex-flags`** if `SLACK_WEBHOOK_URL` is set in env. Format:
   ```
   🚩 FLAG · <category> · <slug>
   Ask    │ <one-line>
   Failed │ <one-line root cause>
   KB     │ HAD IT (retrieval miss) | DIDN'T HAVE IT | PARTIAL
   Lesson │ <one-line>
   Doc    │ .claude/flags/<filename>
   ```

### Step 7 — Reply to operator (concise, operator-tone)

Format:

```
🚩 Flagged. <category code> · <root cause one-liner>.

KB check     │ <HAD IT | DIDN'T HAVE IT | PARTIAL>
Captured     │ .claude/flags/<filename>
Memory       │ <which auto-memory file got the entry>
SOP proposal │ .planning/SOP-PROPOSALS.md#<entry>
Eval set     │ +1 case at .planning/cortex-evals/retrieval-set.jsonl
Slack        │ posted | webhook unset

What changes next time:
- <concrete behavioural change>
- <concrete system change>

<retry the operator's original ask correctly, OR ask the one clarifying question that the flag exposed>
```

**Do NOT** apologize at length. **Do NOT** restate what happened in flowery language. Operator wants: acknowledged, captured, fixed, retry.

---

## Closure-loop additions (the broader system)

This skill alone is reactive — one flag → one fix. To make the loop **proactive**, the following companion mechanisms ship with `/flag`:

| # | Mechanism | Trigger | Where |
|---|---|---|---|
| 1 | **`/flag-recent`** | operator command | shows last 7 days of flags + cluster summary |
| 2 | **Weekly auto-digest** | Sun 6pm cron | clusters all flags by topic, surfaces top 3 patterns |
| 3 | **Eval set auto-injection** | every flag step 6 | flagged cases become eval test pairs (Cycle E.1) |
| 4 | **Auto-panel review** | 3+ flags / 7d on same topic | spawns 6-advisor panel for root-cause |
| 5 | **Cycle generation** | high-confidence patterns from #4 | auto-drafts a roadmap cycle in `.planning/CYCLE-LOG.md` |
| 6 | **Slack 🚩 reaction** | react to LLM message with 🚩 in Slack | webhook fires same flow |
| 7 | **Confidence calibration** | every flag updates topic-flag-rate | system pre-emptively warns "I've been wrong here before" |
| 8 | **Pre-emptive retrieval boost** | high-flag-rate topic appears in prompt | UserPromptSubmit hook (Cycle B.1) increases top-K from 3 → 5 for that topic |

Mechanisms 3, 4, 5, 7, 8 wire into the CORTEX 2.0 roadmap directly — they're not separate work, they're the consumers of the data this skill produces.

---

## Hard rules

1. **Every flag MUST cross-check KB before writing the dossier.** Skipping this turns flag into a noise generator.
2. **Every flag MUST produce a documented lesson before the response ends.** "I'll remember this" is not an artifact.
3. **Every flag MUST add to the eval set.** Otherwise weekly eval can't catch regressions.
4. **No defensive language.** "I apologize for the confusion" is banned. Operator already knows. Move to fix.
5. **If the same flag fires for the same topic 3 times in 7 days, panel auto-spawns.** This is non-negotiable — it's how the loop closes against systemic blind spots.
6. **The dossier ships with the repo.** Project-local `.claude/flags/` directory, committed. Visible to other operators + future-you.

---

## Anti-patterns (do not do)

- ❌ "Got it, I'll be more careful next time" with no artifact
- ❌ Quoting the bad response without diagnosing why it was bad
- ❌ Skipping KB cross-check because "I already know it failed"
- ❌ Writing the dossier in a way only the current session can read (no internal state references)
- ❌ Treating flag like an apology — it's a fix-and-document command
- ❌ Failing silently when Cognee/Mem0 are unreachable — write what you can, log what you couldn't, never block the operator on infrastructure

---

## File layout (this skill ships)

```
~/.claude/skills/flag/
├── SKILL.md                          # this file
├── templates/
│   └── flag-dossier.md               # dossier template
├── scripts/
│   ├── file_flag.py                  # appends to FLAG-METRICS.json + posts to Slack
│   └── flag_recent.py                # /flag-recent command
└── references/
    └── closure-loop.md               # full design doc for mechanisms 1-8
```

---

## Quick test (paste into a fresh session)

```
[operator types]: /flag

[skill responds]:
Flagging your previous turn — was that the LLM response just above, or an earlier one? [y/<turn ref>]
```

If operator confirms, the 7-step flow runs end-to-end and produces:
1. A dossier file
2. A memory entry
3. An SOP-proposal entry
4. An eval-set entry
5. A flag-metrics increment
6. A Slack post (if wired)
7. A concise reply with what changed
