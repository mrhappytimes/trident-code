---
name: system-audit-weekly
version: "1.0"
created: "2026-05-06"
description: "Weekly Monday accountability ritual — runs the heartbeat manually, reviews invariants, spot-checks Cortex (3 random queries), audits MARATHON.md for stale builds, reads system-violations log, and updates system-metrics.md with the week's measurements. Triggers on: 'system audit', 'weekly audit', 'run weekly audit', 'system review', 'monday review', '/system-audit-weekly'. The human-in-the-loop catch for whatever the daily heartbeat missed."
---

# Weekly System Audit — Monday Accountability Ritual

The daily heartbeat catches binary failures (invariant red/green). This weekly ritual catches the things heartbeats can't measure: drift, quality, trend regressions, and gaps the heartbeat itself doesn't know about.

**Run every Monday morning OR after any 7-day stretch with no sessions.**

---

## The 6-Step Ritual

### Step 1 — Run the Heartbeat Manually

```bash
# Trigger GitHub Actions workflow_dispatch
gh workflow run system-heartbeat.yml --repo mrhappytimes/trident-code

# Wait for completion + check result
gh run watch --repo mrhappytimes/trident-code

# Read the latest pulse
curl -s https://raw.githubusercontent.com/mrhappytimes/trident-code/main/system-pulse.md
```

Expected: 0 invariants red (or any reds have an open GitHub issue with action plan).

### Step 2 — Read Invariants File for Drift

```bash
gh repo view mrhappytimes/trident-code --json url
# Read system-invariants.md from latest commit
```

For each invariant, ask:
- Is the `Last verified` field within the last 7 days?
- Has the threshold been adjusted recently? (Drift = silently lowering the bar)
- Is anything labeled "TBD" or "pending"? Why?

Flag any drift in the audit report.

### Step 3 — Spot-Check Cortex (3 random queries)

The heartbeat verifies Cortex MCP is reachable. This step verifies it returns USEFUL data.

```
1. mcp__cortex__get_ouroboros_brain  → must return BRAIN.md ≤7 days old
2. mcp__cortex__get_system_status     → must return current task counts
3. mcp__cortex__search_research(query="random topic from this week") → must return results <30 days old
```

Score: 3/3 pass = green. <3/3 = red, open issue.

### Step 4 — MARATHON.md Stale Build Audit

Read `~/.claude/MARATHON.md`. For each entry NOT in ✅ COMPLETE state:
- Status `🔴 IN_PROGRESS` for >7 days = stale (sessions abandoned mid-build)
- Status `⏸️ PAUSED` for >14 days = needs decision (resume, abort, or queue)
- Status `🔵 QUEUED` for >30 days = needs reprioritization

Action:
- Stale IN_PROGRESS: change to ⏸️ PAUSED with hold signal, OR mark abandoned
- Stale PAUSED: human decision — Jack picks resume/abort
- Stale QUEUED: revisit priority, possibly drop

### Step 5 — Violations Log Review

```bash
tail -200 ~/.claude/system-violations.log
```

For each entry in the past week, classify:
- **Resolved** — the violation was fixed within 24h
- **Open** — still red after >24h (escalate)
- **Recurring** — same invariant violated 3+ times this week (root-cause investigation required)

A recurring violation triggers mandatory retrospective.

### Step 6 — Update system-metrics.md

For each component in the metrics dashboard:
1. Read this week's heartbeat history (`system-pulse-history.csv`)
2. Compute current value for each axis
3. Compare to last week's value
4. Compare to baseline + target
5. Mark direction: ↑ improving, → flat, ↓ regressing
6. If 3+ weeks regressing on any axis → mandatory retrospective

Commit the updated `system-metrics.md` to trident-code repo.

---

## Output Format

After the 6 steps, produce a single audit report:

```markdown
# Weekly System Audit — [YYYY-MM-DD]

## Heartbeat
- Last run: [timestamp]
- Failures: N/M
- Open issues: [count + links]

## Invariants Drift
- [N] invariants verified within 7 days
- [N] showing drift (list)
- [N] pending/TBD (list with deadline)

## Cortex Spot-Check
- 3/3 queries returned fresh data: ✅ / ⚠️ / 🔴
- Latency p50: [Xs] · p95: [Ys]

## MARATHON.md Stale Builds
- IN_PROGRESS >7d: [list]
- PAUSED >14d: [list]
- QUEUED >30d: [list]

## Violations
- Resolved this week: N
- Open >24h: N (escalate)
- Recurring (3+): N (RETRO REQUIRED if any)

## Metrics Direction (per component)
- Runner: liveness ↑ accuracy ↑ latency → error_rate ↓ ...
- Cortex: ...
- Hooks: ...

## Action Items
1. [next concrete step]
2. ...

## Retrospectives Required
- [list any 3-week regressions]
- [list any recurring violations]
```

Save to `~/.claude/system-audits/YYYY-MM-DD.md`. Commit weekly summary to trident-code repo as `system-audits/[date]-summary.md`.

---

## Triggers

- Manual: "run weekly audit", "system audit", "/system-audit-weekly"
- Scheduled: Monday 9am ET (consider scheduled remote agent)
- Auto: After any 7-day stretch with no sessions (start-session detects gap → suggests audit)

---

## Failure Modes

| Scenario | Action |
|----------|--------|
| Heartbeat workflow won't trigger | Bypass: run invariant verify commands manually one by one |
| Cortex spot-check fails 3/3 | Heartbeat INV-005 should already be red; if not, heartbeat itself broken |
| MARATHON.md unparseable | Run /marathon-registry list to repair |
| system-violations.log missing | Note as gap; create empty file; investigate why hooks aren't writing |
| system-metrics.md hasn't been updated in 2+ weeks | This skill itself has been skipped — bigger problem, escalate |

---

## The Compounding Property

Each weekly audit refines the system in 3 ways:
1. **Detects drift** the daily heartbeat couldn't catch (semantic, not just binary)
2. **Adjusts thresholds** as baselines shift (don't lower bars; raise them when targets met)
3. **Adds new invariants** for failure modes discovered this week

The invariants file should grow over time as we learn what else can break. Each addition is a permanent immune-system response.

**Rule:** No invariant is removed unless 90+ days green. Invariants only graduate to "trusted" status, never disappear.
