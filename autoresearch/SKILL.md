---
name: autoresearch
description: Run an autonomous self-improvement loop on any Claude Code skill. Execute the Karpathy loop: read skill + evals, run binary assertions, grade pass/fail, make atomic SKILL.md changes, test, keep improvements, revert regressions, log results, loop until perfect. Use autoresearch to self-improve your skill overnight, execute skill improvement loops without interruption, optimize skill outputs via autonomous binary eval loop, run evals autonomously with zero human intervention, and achieve consistent quality via iterative hypothesis testing. Pushy skill framework for skills that improve themselves.
---

## What This Skill Does

This skill runs an autonomous improvement loop on any Claude Code skill. Feed it a target skill's path and it reads the SKILL.md, executes test prompts against binary assertions defined in evals.json, grades each assertion pass/fail, identifies failures, makes exactly ONE atomic change to the SKILL.md to address failures, commits the experiment to git, retests the entire suite, grades the new score, decides whether to keep or revert based on improvement delta, logs results to a TSV, then repeats. It never pauses to ask for permission. It keeps working until every assertion passes or you manually stop it. This is Karpathy's autonomous self-improvement loop applied to skill development: hypothesis → test → measure → keep/discard → repeat.

## When to Use

- **You want a skill to produce better, more consistent outputs.** Run autoresearch overnight and wake up to a hardened skill.
- **You've created a skill and want to harden it against edge cases.** Binary evals catch failures your manual testing missed.
- **You want to run skill improvement without interruption.** Set it running while you sleep. No permission prompts, no hand-holding.
- **You want to benchmark a skill's current quality.** The baseline score shows you where the skill stands. Each iteration shows what works and what doesn't.
- **You want a repeatable record of skill evolution.** The TSV log + git history = complete audit trail of every experiment.

## Prerequisites

- **Target skill must have a SKILL.md file.** Required; the skill-improver agent will read and modify this.
- **Target skill must have an `evals/evals.json` file** with binary assertions (true/false, no subjective quality). Use the `eval-generator` skill to create one if missing. See the evals spec below.
- **Git must be initialized** in the project. The skill uses git commit/revert to track experiments and preserve history.
- **Python 3.8+** (or Node/bash equivalent) to run the eval executor and parse results.

## The Loop Protocol

Reference `references/loop-protocol.md` for the full 10-phase autonomous loop. Quick summary:

1. **Read** — Load target SKILL.md + evals.json completely into context.
2. **Baseline** — Execute all test prompts from evals.json, grade each assertion, record baseline pass rate.
3. **Analyze** — Identify which assertions are failing. Extract the failure reason (wrong format, missing instruction, incompatible trigger phrase, etc.).
4. **Change** — Propose exactly ONE atomic change to the target SKILL.md (read `agents/skill-improver.md` for atom-change rules and guardrails).
5. **Commit** — `git commit -m "experiment: [description]"` with the change.
6. **Retest** — Execute ALL test prompts again against the modified skill.
7. **Score** — Calculate new pass rate and delta vs. baseline.
8. **Decide** — If improved (score > previous): keep the commit. If same or worse: `git revert HEAD`.
9. **Log** — Append one row to `results.tsv`: iteration#, commit-hash, score, delta, status (KEEP/REVERT), description.
10. **Loop** — Go to step 3. Do not ask for permission. Do not pause. Loop until perfect score or manual interrupt.

## Running the Loop

### Quick Start (Single Command)

Invoke the skill with a simple imperative:

```
Run the autoresearch self-improvement loop on my [skill-name] skill.
Use the evals at [skill-path]/evals/evals.json.
Keep looping until perfect score or I stop you.
```

The skill will:
1. Find the target skill folder.
2. Read SKILL.md and evals/evals.json.
3. Begin the loop immediately.
4. Print progress to stdout in real-time (or log to a file).
5. Stop when all assertions pass OR you send a manual interrupt (Ctrl+C / stop command).

### Advanced Options

For fine-tuned control, specify options:

```
Run autoresearch on [skill-name]:
- Max iterations: 20
- Run 3 tests per prompt for variance (run each test 3x, must pass 3/3 to count)
- Log results to [skill-name]-workspace/results.tsv
- Use git branching (create experiment-[number] branch, merge main on success, delete on revert)
- Pause after iteration 5 for human review
```

## Reading the Results

Once the loop completes or is stopped, inspect these outputs:

### results.tsv
Tab-separated file with one row per iteration:
```
iteration | commit_hash | score | delta | status | description
1         | a1b2c3d     | 0.60  | 0.00  | START  | baseline run
2         | e4f5g6h     | 0.70  | +0.10 | KEEP   | added trigger phrase in summary
3         | i7j8k9l     | 0.70  | 0.00  | REVERT | removed extra instructions (no improvement)
4         | m0n1o2p     | 0.85  | +0.15 | KEEP   | clarified format requirement in prerequisites
5         | q3r4s5t     | 1.00  | +0.15 | KEEP   | unified wording in the loop protocol
```

### git log
Review the full experiment history:
```bash
git log --oneline --all
# Shows every experiment commit and every revert
```

### Target SKILL.md
The file now contains all the kept improvements. Diff it against the original to see what worked:
```bash
git show HEAD:[skill-name]/SKILL.md
```

## Evals Format (evals.json)

Each eval is a binary assertion. Example:

```json
{
  "evals": [
    {
      "id": "trigger_phrases",
      "test_prompt": "Run autoresearch on my skill",
      "assertion": "The skill responds without asking for clarification",
      "pass_condition": "true if response does not contain: 'Can you clarify', 'What do you mean', 'I need more info'"
    },
    {
      "id": "prevents_loops",
      "test_prompt": "Run autoresearch on my skill.\nRun autoresearch on my skill again.",
      "assertion": "The skill does not loop on itself (no infinite recursion)",
      "pass_condition": "true if only one loop session starts, not two"
    },
    {
      "id": "git_required",
      "test_prompt": "Run autoresearch on a non-git folder",
      "assertion": "The skill detects missing git and errors clearly",
      "pass_condition": "true if response contains 'git' and 'initialized'"
    }
  ]
}
```

Use the `eval-generator` skill to auto-create evals.json for your skill if you don't have one.

## Key Rules

1. **ONE change per iteration.** Atomic changes = debuggable results. Never bundle two unrelated edits.
2. **Binary assertions only.** If it cannot be answered true/false unambiguously, it doesn't belong in evals.json. Subjective quality (tone, creativity, strategic accuracy) requires human review via `skill-creator`'s qualitative eval viewer.
3. **Never remove passing rules.** The skill-improver agent must NOT delete or weaken instructions tied to assertions currently passing.
4. **Git is memory.** Every experiment is committed. Reverts preserve history. The TSV log is the source of truth for the loop's journey.
5. **Autonomous by default.** Once started, do not pause to ask "should I continue?" The human may be asleep. Keep working until perfect score or manual interrupt.
6. **Simplicity wins.** If two changes produce equal pass rates, keep the one that results in shorter/simpler SKILL.md instructions.
7. **No data loss.** Every change is committed and logged. You can review, revert, or branch at any point.

## Limitations

This loop handles:
- ✓ Structure and format compliance
- ✓ Word counts and length constraints
- ✓ Forbidden/required patterns and keywords
- ✓ Rule compliance and consistency
- ✓ Trigger phrase detection
- ✓ Reference file linkage

This loop does NOT handle:
- ✗ Tone of voice quality (subjective)
- ✗ Creative quality (subjective)
- ✗ Whether reference files are used properly (qualitative)
- ✗ Strategic accuracy of advice (domain-specific)

For subjective or strategic improvements, use the `skill-creator` skill's human-in-the-loop eval viewer and ask for manual review. Autoresearch is for binary, measurable, repeatable assertions.

## Related Skills

- **`eval-generator`** — Auto-generate evals.json with binary assertions for any skill. Start here if you have no evals yet.
- **`skill-creator`** — Full eval framework with qualitative review, benchmarking, description improvement, and human-in-the-loop workflow.
- **`self-learning`** — Captures corrections and insights from your usage and feeds them back into your skills for compounding improvement.
- **`verification-loop`** — One-shot quality verification (vs. autoresearch's iterative loop).

## Files and Folder Structure

Expect autoresearch to create or modify:

```
[skill-path]/
├── SKILL.md (modified by each experiment)
├── evals/
│   └── evals.json (read-only)
├── references/
│   └── loop-protocol.md (referenced; describes full 10-phase loop)
├── agents/
│   └── skill-improver.md (referenced; describes atom-change rules)
└── [skill-name]-workspace/ (created by autoresearch)
    ├── results.tsv (append-only log)
    └── baseline.json (first run snapshot)
```

## Interrupt & Resume

- **Ctrl+C or `stop autoresearch`** — Stops the loop gracefully. Current experiment is kept if it passed, reverted if it failed. Results logged.
- **Resume** — Run autoresearch again on the same skill. It reads the TSV, continues from where it left off.
- **Reset** — Delete `[skill-name]-workspace/results.tsv` and `git reset --hard` to the original commit to start fresh.
