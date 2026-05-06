# /flag Closure-Loop Design

This document explains the **8 mechanisms** that turn a single `/flag` from a one-shot fix into a self-improving loop. Each mechanism either consumes data the flag skill produces, or pre-empts future flags using historical flag data.

---

## Mechanism 1 — `/flag-recent` (operator-on-demand)

**What:** Operator command. Lists last N days of flags grouped by `topic_slug`, with cluster summaries. Surfaces "you flagged the same topic 4 times" without operator having to grep.

**Implementation:** `~/.claude/skills/flag/scripts/flag_recent.py` (companion to `file_flag.py`).

**Triggers on:** `/flag-recent`, `/flag-recent 30d`, `flag log`, `show me recent flags`.

**Output:**
```
Recent flags · last 7 days
━━━━━━━━━━━━━━━━━━━━━━━━━━
2026-05-06 · cortex-2.0-roadmap (P1, R) — KB had it, retrieval miss
2026-05-05 · cortex-2.0-roadmap (P1, R) — KB had it, retrieval miss
2026-05-03 · helmsman-routing  (P2, K) — KB didn't have it
... 

Top clusters
- cortex-2.0-roadmap: 3 flags / 7d  ⚠️ panel triggered
- helmsman-routing:  1 flag

Run `/flag-detail <flag-id>` for full dossier.
```

---

## Mechanism 2 — Weekly auto-digest (Sun 6pm cron)

**What:** Every Sunday 6pm, cron compiles all flags from the prior 7 days into a digest, posts to Slack `#cortex-flags`, and writes to `.planning/flag-digests/<week-of>.md`.

**Implementation:** Cron on the operator's laptop (or fleet host) running `flag_recent.py --window 7d --format digest`.

**Format:**
```
🚩 Flag digest · Week of 2026-05-04 → 2026-05-10
Total flags: 6
By category: R(4) K(1) F(1)
By severity: P1(5) P2(1)

Top 3 patterns:
1. cortex-2.0-roadmap (3 flags) — retrieval miss; root cause TBD by panel run 2026-05-08
2. helmsman-routing  (1 flag) — content gap; SOP delta merged
3. fleet-state freshness (1 flag) — stale FLEET-LIVE-STATE.md

Open SOP proposals: 2 (.planning/SOP-PROPOSALS.md)
Eval set additions: 6 (.planning/cortex-evals/retrieval-set.jsonl)
```

---

## Mechanism 3 — Eval set auto-injection (every flag · Cycle E.1 surface)

**What:** Step 6 of `/flag` flow appends a new (prompt, expected_chunks) entry to `.planning/cortex-evals/retrieval-set.jsonl`. The next weekly eval run (Cycle E.1) measures whether the system now retrieves correctly.

**Why it matters:** Without this, a flagged failure has no test guarding against regression. With it, every flag becomes a permanent eval case.

**Format per entry:** see `flag-dossier.md` template `## Eval set entry` block.

---

## Mechanism 4 — Auto-panel review (3+ flags / 7d / same topic)

**What:** When `file_flag.py` detects ≥3 flags on the same `topic_slug` within 7 days, it sets `panel_trigger=True`. The next marathon cycle reads this signal and spawns the 6-advisor panel scoped to "root-cause this topic_slug pattern."

**Implementation:** `.planning/FLAG-METRICS.json` is the durable signal. Marathon cron checks it on every cycle boundary.

**Panel output:** verdict + root-cause + proposed cycle. Posted to Slack and appended to `.planning/CYCLE-LOG.md` as a panel-issued cycle.

---

## Mechanism 5 — Cycle generation (high-confidence patterns → roadmap cycles)

**What:** When the panel from Mechanism 4 returns a confident root-cause, it auto-drafts a roadmap improvement cycle (e.g. "Cycle B.3 — boost top-K for cortex-2.0-roadmap topic"). The cycle goes into `.planning/CYCLE-LOG.md` queued for next phase.

**Why it matters:** Closes the loop from operator pain → durable system change without operator authoring the cycle themselves.

**Constraint:** Auto-generated cycles MUST pass through the standard cycle gate (operator-approve at phase boundary). They don't auto-execute — they auto-propose.

---

## Mechanism 6 — Slack 🚩 reaction (operator-friction = zero)

**What:** Operator can react to any LLM message in Slack with the 🚩 emoji. A Slack webhook + Slack app handler converts the reaction into a `/flag` invocation against that message.

**Implementation:** Slack Events API subscription on `reaction_added`. Webhook posts to dashboard `/api/flag/from-slack` which spawns a Claude Code session running the `/flag` skill against the captured message.

**Status:** Future — needs Slack app + dashboard endpoint. Documented here so the integration path is clear.

---

## Mechanism 7 — Confidence calibration (per-topic flag-rate)

**What:** Every flag updates a per-topic flag-rate metric: `flags_per_100_responses`. High flag-rate topics are tagged as "system-weak."

**Surface:** `/admin/cortex` dashboard (Phase F.2) shows a heatmap of topic_slug × flag-rate.

**Use:** Operators can see at a glance "the system is weakest on X" — guides where to invest training/ingest budget.

---

## Mechanism 8 — Pre-emptive retrieval boost (UserPromptSubmit hook integration)

**What:** The Cycle B.1 UserPromptSubmit hook reads `.planning/FLAG-METRICS.json` on every prompt. If the prompt's detected topic matches a topic with `flag_rate >= threshold`, the hook:

1. Increases top-K from 3 → 5 for that topic's namespace
2. Prepends a warning chunk: `⚠️ This topic has been flagged N times in the last 30 days. Be extra careful with retrieval relevance.`

**Why it matters:** Most powerful mechanism. Past failures literally make future retrievals smarter for the failing topic.

**Implementation:** Hook reads metrics on every prompt (cheap — single file read). Threshold tuning is operator-configurable via env var `FLAG_BOOST_THRESHOLD` (default: 2 flags / 30 days).

---

## End-to-end loop diagram

```
operator types /flag
        │
        ▼
   Step 1-4: capture + diagnose + KB cross-check + dossier write
        │
        ▼
   Step 5: memory updates (auto-memory + Cognee + Mem0 + Obsidian)
        │
        ▼
   Step 6: closure
        │
        ├──► .planning/SOP-PROPOSALS.md         (M2/E.2 surface)
        ├──► .planning/cortex-evals/retrieval-set.jsonl  (M3/E.1)
        ├──► .planning/FLAG-METRICS.json        (M4/M7/M8 fuel)
        ├──► Slack #cortex-flags post           (M2 weekly digest)
        └──► panel_trigger if recent_count >= 3 (M4 → M5)
        │
        ▼
   Step 7: operator-facing reply
        │
        ▼
   ┌────────────────────────────────────────┐
   │  Background loops fire on this data:   │
   │                                        │
   │  • Weekly digest (M2)                  │
   │  • Auto-panel root-cause (M4)          │
   │  • Auto-cycle generation (M5)          │
   │  • UserPromptSubmit boost (M8)         │
   │  • Heatmap surfacing (M7)              │
   └────────────────────────────────────────┘
        │
        ▼
   Same flag CANNOT recur silently
```

---

## What this skill explicitly does NOT do

- Apologize. Operator-tone, no defensive language.
- Auto-merge an SOP proposal. Operator approves SOPs.
- Auto-spawn panels for single flags. Threshold is 3/7d.
- Block on Slack/Cognee/Mem0 unavailability. Always degrades gracefully and logs what couldn't ship.
- Replace the full `/gsd:debug` flow for genuine bugs in code. Flag is for *response quality* failures; bugs are bugs.
