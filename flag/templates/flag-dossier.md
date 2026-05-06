---
flag_id: <YYYY-MM-DD-HHMM>-<slug>
flagged_at: <ISO-8601>
operator: jack
project: <project name>
session_id: <claude session id if available>
category_primary: K | R | F | S | C | H | T | V
category_secondary: <optional>
kb_had_answer: yes | no | partial
severity: P0 | P1 | P2
loop_artifacts:
  dossier: .claude/flags/<filename>
  memory_file: <path>
  sop_proposal_id: <SOP-PROPOSALS.md#<entry>>
  eval_set_entry: <jsonl line number>
  slack_posted: yes | no | webhook-unset
  panel_triggered: yes | no
---

# 🚩 Flag dossier — <slug>

## Operator's original ask (verbatim)

> <quote the prompt that produced the failed response>

## The flagged response (verbatim or excerpt)

> <quote the LLM response — full if short, excerpt with [...] if long>

## What was wrong (1-3 sentences, root cause not symptom)

<the actual reason, not "I apologize">

## Failure category

- **Primary:** <K|R|F|S|C|H|T|V> — <one-line meaning>
- **Secondary:** <optional second category>

## KB cross-check (mandatory)

| Source | Query run | Result | Verdict |
|---|---|---|---|
| Cognee `search_research` | "<exact query>" | <hits returned / timeout / N hits> | had it / didn't / partial |
| Mem0 `get_memories` | "<exact query>" | <hits / N facts> | had it / didn't / partial |
| Obsidian `search_notes` | "<exact query>" | <hits / N notes> | had it / didn't / partial |
| Local `Grep .planning/` | "<pattern>" | <files matched> | had it / didn't / partial |

**Overall verdict:** <KB HAD IT — retrieval miss (P0) | KB DIDN'T HAVE IT — content gap (P1) | PARTIAL>

## What should have happened

<the response the system should have produced — concrete, comparable to the actual one>

## Documented lesson (this is what future-you reads)

<2-5 lines, generalizable, written so a future Claude session can apply it without re-deriving>

## SOP-delta proposal

| Field | Value |
|---|---|
| SOP affected | <name or NEW> |
| Proposed change | <one or two sentences> |
| Rationale | <linking failure → fix> |
| Confidence | <0.0–1.0> |
| Owner approval needed | yes (operator) |

## Eval set entry

```json
{"prompt": "<operator's original ask paraphrased>", "expected_chunks": ["<source path>", "<source path>"], "rationale": "this prompt failed on <date>; correct retrieval would have surfaced these chunks", "added_by": "flag", "flag_id": "<YYYY-MM-DD-HHMM>-<slug>"}
```

## What changes next time

- **Behavioural** (Claude session-local change applied via auto-memory): <concrete>
- **System** (CORTEX/cycle-roadmap change proposed via SOP): <concrete>
- **Pre-emptive** (UserPromptSubmit boost for this topic per closure-loop mechanism #8): <topic slug for boost>

## Operator follow-up (if any)

- [ ] Operator reviews SOP proposal
- [ ] Operator confirms eval set entry is correct
- [ ] Operator decides: re-run original ask now, or move on?

## Audit trail

- [ ] Dossier committed to repo
- [ ] Auto-memory file updated
- [ ] Cognee chunk ingested (if reachable)
- [ ] Mem0 fact written (if tenant set)
- [ ] SOP-PROPOSALS.md appended
- [ ] Eval set updated
- [ ] FLAG-METRICS.json incremented
- [ ] Slack #cortex-flags posted (or noted webhook unset)
- [ ] If 3+ flags / 7d on this topic: panel auto-spawned
