# Autonomous Loop Protocol

## Overview
This protocol governs how the autoresearch skill runs autonomous improvement iterations on a target skill. It is based on Karpathy's autoresearch pattern: read → change → test → score → keep or revert → repeat.

## Phase 1: Initialize
- Read the target SKILL.md file completely
- Read evals/evals.json — parse all test prompts and assertions
- Initialize results.tsv if it doesn't exist (headers: iteration, commit, metric, delta, status, description, timestamp)
- Check git status — ensure clean working tree
- Create experiment branch if configured: `git checkout -b autoresearch/[skill-name]`

## Phase 2: Baseline
- Run each test prompt through the target skill
- For each output, evaluate every binary assertion (true/false)
- Calculate baseline score: (passed assertions / total assertions) × 100
- Record as iteration 0 in results.tsv with status "baseline"
- If baseline is 100%, skill is already perfect — report and exit

## Phase 3: Analyze Failures
- List all failing assertions grouped by test prompt
- Identify patterns: Are failures structural (formatting), content (missing elements), or constraint violations (word count, forbidden patterns)?
- Prioritize: Fix the most common failure pattern first (highest impact per change)

## Phase 4: Make ONE Change
- Read the skill-improver agent instructions (agents/skill-improver.md)
- Propose exactly ONE atomic change to the target SKILL.md
- The change must be: specific, testable, and targeted at the highest-priority failing assertion
- Apply the change to the SKILL.md file

## Phase 5: Commit
- `git add [path-to-target-SKILL.md]`
- `git commit -m "experiment: [concise description of what changed and why]"`
- Record the commit hash for potential revert

## Phase 6: Retest
- Run ALL test prompts again (not just the ones that failed)
- A change that fixes one assertion might break another
- Evaluate every assertion on every test prompt

## Phase 7: Score
- Calculate new pass rate
- Calculate delta from previous iteration (not from baseline)
- Format: "+2.5%" or "-1.3%" or "0.0%"

## Phase 8: Decide
- IF score improved (delta > 0): KEEP the commit. Status = "keep"
- IF score unchanged (delta = 0): REVERT. Status = "no_change" — try a different approach next iteration
- IF score decreased (delta < 0): REVERT. `git revert HEAD --no-edit`. Status = "discard"
- IF score is 100%: DONE. Status = "perfect". Exit the loop.

## Phase 9: Log
Append one row to results.tsv:
```
{iteration}\t{commit_hash}\t{score}\t{delta}\t{status}\t{description}\t{timestamp}
```

## Phase 10: Loop
- Return to Phase 3
- CRITICAL: Do not ask the human if you should continue
- CRITICAL: Do not suggest stopping points
- The human may be asleep or away. You are autonomous.
- Continue until: perfect score (100%), max iterations reached, or manual interruption

## Crash Recovery
- **Parse error in SKILL.md after edit**: Fix immediately, don't count as iteration
- **Test prompt timeout**: Revert the change, log as "timeout", try different approach
- **Runtime error in test**: Retry up to 3 times. If still failing, revert and log as "error"
- **Git conflict**: Abort change, reset to clean state, continue from Phase 3

## Stall Detection
If the score hasn't improved for 5 consecutive iterations:
1. Re-read the ENTIRE SKILL.md with fresh eyes
2. Look for structural issues rather than incremental fixes
3. Consider combining near-miss changes from the git history
4. Try a radically different approach to the failing assertion(s)

## Results File Format (results.tsv)
```
iteration	commit	metric	delta	status	description	timestamp
0	a1b2c3d	85.0	0.0	baseline	initial state	2026-03-24T03:15:00
1	b2c3d4e	87.5	+2.5	keep	added explicit word count rule	2026-03-24T03:18:00
2	-	87.5	0.0	no_change	tried reordering output sections	2026-03-24T03:21:00
3	c3d4e5f	90.0	+2.5	keep	added standalone first line rule	2026-03-24T03:24:00
```
