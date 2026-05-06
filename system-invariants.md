# System Invariants — POM AI Operating Floor
_The list of things that MUST be true. If any is false for >24h, the system has failed and a retrospective is required._

**Version:** 1.0  
**Created:** 2026-05-06  
**Owner:** Jack (verified weekly via `/system-audit-weekly`)  
**External heartbeat:** GitHub Actions `.github/workflows/system-heartbeat.yml` runs daily 6am UTC and updates `system-pulse.md`.

---

## How to Read

Each invariant has 6 fields:
- **Assertion** — the thing that must be true
- **Verify** — single bash command, exit 0 = green, non-zero = red
- **Threshold** — the boundary that flips green → red
- **Alarm channel** — where the failure surfaces (GitHub issue, Slack, log)
- **Owner** — who's accountable (human or autoremediation)
- **Last verified** — timestamp updated by heartbeat (2026-05-06 = baseline today)

---

## Critical Invariants (10)

### INVARIANT-001 — BRAIN.md is fresh
- **Assertion:** Distilled BRAIN.md updates within 7 days of last cron window (Wed/Sun 3:30am UTC)
- **Verify:** `ssh root@100.92.44.56 "find /workspace/distiller-output/BRAIN.md -mtime -7 -print | grep -q ."`
- **Threshold:** mtime > 7 days = red; > 14 days = critical
- **Alarm channel:** GitHub issue + brain-staleness-check.js at SessionStart
- **Owner:** Omega distiller cron + autoremediation (re-run on detection)
- **Last verified:** 2026-05-06 (BRAIN.md regenerated this session)
- **Why this matters:** This is THE invariant that failed 14 days silent. It is invariant #1 forever.

### INVARIANT-002 — Distiller cron is well-formed
- **Assertion:** Omega root crontab has ≥10 lines (one per OUROBOROS cron entry, properly newline-separated)
- **Verify:** `ssh root@100.92.44.56 "wc -l < /var/spool/cron/crontabs/root | awk '{exit (\$1<10)}'"`
- **Threshold:** < 10 lines = red (single-line concatenation bug recurrence)
- **Alarm channel:** GitHub issue + visible at SessionStart via pulse-check
- **Owner:** Jack (manual fix per `ops/omega/CRONTAB-FIX-2026-05-05.md`)
- **Last verified:** 2026-05-06 (11 lines confirmed)
- **Why this matters:** The 14-day silent failure root cause. Detect concat regression instantly.

### INVARIANT-003 — Runner systemd unit is active
- **Assertion:** `ouroboros-runner.service` is in `active (running)` state on Alpha
- **Verify:** `ssh root@49.13.199.174 "systemctl is-active ouroboros-runner"`
- **Threshold:** Output != "active" for >5 min = red
- **Alarm channel:** GitHub issue + Slack (when wired)
- **Owner:** systemd auto-restart + Jack escalation if 3 restarts in 1h
- **Last verified:** 2026-05-06 (active per MARATHON-003)

### INVARIANT-004 — Circuit breaker not stale-tripped
- **Assertion:** If `/workspace/runtime/circuit-breaker.flag` exists, it's <1h old (true billing event, not zombie)
- **Verify:** `ssh root@49.13.199.174 "[ ! -f /workspace/runtime/circuit-breaker.flag ] || find /workspace/runtime/circuit-breaker.flag -mmin -60 -print | grep -q ."`
- **Threshold:** Flag present + >1h old = red (means runner halted but never recovered)
- **Alarm channel:** GitHub issue immediately
- **Owner:** Jack (verify Anthropic credit, manual recovery)
- **Last verified:** 2026-05-06 (flag absent — runner healthy)

### INVARIANT-005 — Cortex MCP responds
- **Assertion:** TCP probe to Omega 100.92.44.56:8765 succeeds within 3s
- **Verify:** `nc -zw3 100.92.44.56 8765`
- **Threshold:** 3 consecutive failures (3 days) = red
- **Alarm channel:** GitHub issue + cortex-health-check.js at SessionStart
- **Owner:** Tailscale + Omega service (auto-recovery), Jack escalation
- **Last verified:** 2026-05-06 (silent pass)

### INVARIANT-006 — MARATHON.md is parseable
- **Assertion:** `~/.claude/MARATHON.md` parses cleanly via marathon-tracker.js (no malformed entries)
- **Verify:** `node ~/.claude/hooks/marathon-tracker.js start >/dev/null && echo OK`
- **Threshold:** Any parse error = red
- **Alarm channel:** Local log + visible at SessionStart
- **Owner:** /marathon-registry skill (manual fix on flag)
- **Last verified:** 2026-05-06 (Wave A/B/C all verified)

### INVARIANT-007 — Hooks 100% green
- **Assertion:** `node _verify-hooks.js` exits 0 (all registered hooks: exists + syntax + logs not stale)
- **Verify:** `node ~/.claude/hooks/_verify-hooks.js`
- **Threshold:** Any hook missing/broken/stale-log >30d = red
- **Alarm channel:** GitHub issue + visible at session start
- **Owner:** Jack (any breakage = immediate fix)
- **Last verified:** 2026-05-06 (9/9 green; cortex-health-check makes 10/10 next sweep)

### INVARIANT-008 — Last session within 7 days
- **Assertion:** Most recent file in any 07_MEMORY/session_summaries/ has mtime <7 days
- **Verify:** `find C:/Dev/*/07_MEMORY/session_summaries -name "*.md" -mtime -7 | head -1 | grep -q .`
- **Threshold:** No session in 7 days = yellow (not red — Jack might be on vacation, but signal needed)
- **Alarm channel:** GitHub issue (informational, not blocking)
- **Owner:** Jack
- **Last verified:** 2026-05-06 (this session)

### INVARIANT-009 — Task success rate ≥30% over rolling 24h
- **Assertion:** Of last 24h of OUROBOROS task completions, ≥30% succeeded (eval'd by Cortex `get_system_status`)
- **Verify:** Custom — heartbeat queries Cortex MCP and checks 24h success rate
- **Threshold:** <30% = red (current baseline ~4.4% lifetime — Wave 1 fixes should move this above 30%)
- **Alarm channel:** GitHub issue + tracked in system-metrics.md
- **Owner:** OUROBOROS runner (autoremediation via circuit breaker), Jack escalation
- **Last verified:** 2026-05-06 baseline = 4.4% lifetime (target: 60% by 2026-06-01)

### INVARIANT-010 — Tailscale fleet all peers online
- **Assertion:** All 4 expected Tailscale peers (Alpha, Beta, Gamma, Omega) online
- **Verify:** `tailscale status --json | jq '[.Peer[] | select(.Online == false)] | length' | grep -q '^0$'`
- **Threshold:** Any peer offline >10 min = red
- **Alarm channel:** GitHub issue
- **Owner:** Hetzner + Tailscale (auto-recovery), Jack escalation
- **Last verified:** 2026-05-06 (assumed green — heartbeat will confirm tomorrow)

---

## Adding a New Invariant

When you build a new feature/skill/hook, add an invariant here BEFORE marking the work complete. The build is not done until:
1. The invariant is added with all 6 fields filled
2. The verify command runs from the heartbeat workflow
3. The current state passes (otherwise the work is broken on day 1)

**This is a Standard requirement (see STANDARD.md commandment 4).**

---

## Format Contract

The heartbeat parser depends on this structure. Every invariant:
- Starts with `### INVARIANT-NNN — <short title>`
- Has bullet fields: Assertion, Verify, Threshold, Alarm channel, Owner, Last verified
- Verify command must be a single line (no multi-line shell)
- Last verified gets auto-updated by heartbeat success
