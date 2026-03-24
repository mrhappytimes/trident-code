# Results Logging Specification

## File: results.tsv
Tab-separated values file tracking every iteration of the autoresearch loop.

## Headers
```
iteration	commit	metric	delta	status	description	timestamp
```

## Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| iteration | int | Sequential iteration number (0 = baseline) |
| commit | string | Git commit hash (short form, 7 chars). "-" if reverted. |
| metric | float | Pass rate as percentage (0.0 to 100.0) |
| delta | string | Change from previous iteration. Format: "+2.5", "-1.3", "0.0" |
| status | enum | One of: baseline, keep, discard, no_change, timeout, error, perfect |
| description | string | What was changed (for keep) or attempted (for discard/no_change) |
| timestamp | ISO8601 | When the iteration completed |

## Status Values

| Status | Meaning | Git Action |
|--------|---------|------------|
| baseline | Initial measurement, no changes made | None |
| keep | Score improved, change was committed | Commit kept |
| discard | Score decreased, change was reverted | `git revert HEAD` |
| no_change | Score unchanged, change was reverted | `git revert HEAD` |
| timeout | Test timed out, change was reverted | `git revert HEAD` |
| error | Runtime error, change was reverted | `git revert HEAD` |
| perfect | 100% pass rate achieved, loop complete | Final commit kept |

## Example
```
iteration	commit	metric	delta	status	description	timestamp
0	a1b2c3d	80.0	0.0	baseline	initial state	2026-03-24T03:15:00
1	b2c3d4e	85.0	+5.0	keep	added explicit first-line-standalone rule	2026-03-24T03:18:22
2	-	82.5	-2.5	discard	moved CTA section before conclusion	2026-03-24T03:21:45
3	c3d4e5f	87.5	+2.5	keep	added word count constraint to instructions	2026-03-24T03:25:01
4	-	87.5	0.0	no_change	reworded formatting section for clarity	2026-03-24T03:28:33
5	d4e5f6g	92.5	+5.0	keep	added forbidden-patterns checklist	2026-03-24T03:31:12
6	e5f6g7h	100.0	+7.5	perfect	added explicit no-questions-at-end rule	2026-03-24T03:34:50
```

## Reading the Results

### Improving Trend
Metric steadily increases across "keep" iterations. Example: 80% → 85% → 87.5% → 92.5% → 100%. This is the ideal pattern — each change incrementally improves the skill.

### Stalled
Multiple consecutive "no_change" or "discard" rows indicate the skill-improver needs to try radically different approaches. If 5+ iterations see no improvement, re-read the SKILL.md and evals with fresh eyes. Consider structural changes instead of incremental tweaks.

### Volatile
Alternating keep/discard or high variance in deltas suggests assertions may be conflicting with each other, or the test prompts are inconsistent. Review evals.json for clarity and interdependencies.

## Appending New Rows

Each iteration appends exactly one row. Format:
```
{iteration_number}\t{commit_hash_or_dash}\t{pass_percentage}\t{delta_string}\t{status_value}\t{description_text}\t{ISO8601_timestamp}
```

**Example row:**
```
7	f6g7h8i	95.0	+2.5	keep	clarified assertion wording in section 3	2026-03-24T03:37:45
```

**Notes:**
- Use tabs (not spaces) to separate fields
- Timestamp must include timezone (e.g., `2026-03-24T03:37:45-08:00` or `2026-03-24T03:37:45Z`)
- Delta format includes sign: `+5.0`, `-2.5`, or `0.0` (always show 1 decimal)
- Commit hash is 7 characters (short form). Use `-` if the commit was reverted and not recorded
- Description should fit on one line; if wrapping, use underscores for spaces or keep to 80 chars

## Querying Results

To find the best version of the skill:
- Look for the row with the highest `metric` value
- If multiple rows have the same high metric, prefer the one with the earliest `iteration` (fewer changes = simpler)

To debug stalls:
- Group consecutive rows by iteration number
- Count "discard" + "no_change" in a row. If ≥ 5, review the failing assertions

To track improvement velocity:
- Calculate average delta across all "keep" rows
- Declining velocity (e.g., +3.0, +2.5, +1.0) suggests diminishing returns — the easy wins are gone
