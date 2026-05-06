# MARATHON BUILD TRACKER
_Global cross-session conflict registry. Updated by wrap-up Step 2d and SessionEnd hook._
_Last updated: 2026-05-05 20:45 · Updated by: wrap-up Step 2d · session: ouroboros-common_

---

## HOW TO READ THIS FILE

- **🔴 IN_PROGRESS** — Build is active. Other sessions: do NOT modify locked paths.
- **⏸️ PAUSED** — Session ended mid-build. Resume trigger listed. Other sessions: hold on locked paths.
- **✅ COMPLETE** — Build finished. Locks released.
- **🔵 QUEUED** — Scheduled for next dedicated session. Not started.
- **Locks** — File paths/repos this build has exclusive ownership of. Other sessions must not write to these.
- **Hold signal** — The event or trigger that lets a waiting session proceed.

---

## Active Builds

### [MARATHON-001] ouroboros-common · multi-user-fleet-migration
- **Status**: ✅ COMPLETE (Phase 1+2 — 2026-05-05 22:19)
- **Project**: `C:\Dev\ouroboros-common`
- **Branch**: `claude/fervent-robinson-c5f84c` (3 commits — needs PR/merge)
- **What shipped (Phase 1)**:
  - `fleet/code-server/provision-user.sh` (per-teammate provisioner — Linux user, port allocation, systemd template, extensions, profiles, gitconfig)
  - `fleet/code-server/provision-router.sh` (nginx router on 127.0.0.1:8079 keyed on `Cf-Access-Authenticated-User-Email`)
  - `fleet/code-server/code-server@.service` (systemd template unit)
  - `fleet/code-server/.gitattributes` (force LF for shell/conf — CRLF was breaking marketplace lookup)
- **What shipped (Phase 2 — Alpha live)**:
  - `code-server@jack.service` active on 127.0.0.1:8082 (35 extensions, Admin+Business+Personal profiles, sudo, gitconfig)
  - nginx router active on 127.0.0.1:8079 (default site disabled to avoid :80 conflict with dashboard-nginx)
  - CF tunnel `44b3b494-...-d06dbd` ingress v5→v6: `dev-alpha.mybusinessdashboard.ai` → `http://localhost:8079`
- **Verified hold signals**: SSH ✅ · idempotent (3rd run = 35 already present) ✅ · CF Access route ✅ · 35 ext registered ✅ · dashboard prod stack unchanged ✅
- **Locks**: RELEASED
- **Hold signal for next session**: none — Phase 3 is queued as MARATHON-001b
- **Blocks**: nothing
- **Notes**:
  - User URL is `https://dev-alpha.mybusinessdashboard.ai/` (NOT `/jack/` — routing is header-based, not path-based, per HANDOFF-multi-user.md)
  - Alpha public IP is `49.13.199.174`, NOT `46.224.192.227` (that's Gamma) — Tailnet IP `100.92.200.113` was correct
  - CF token at `C:\Dev\.cf-token-temp.txt` valid until 2026-05-08 (rotate before then)

### [MARATHON-001b] ouroboros-common · multi-user-fleet-migration · Phase 3
- **Status**: 🔵 QUEUED
- **Project**: `C:\Dev\ouroboros-common`
- **Phase**: Phase 3 (Baley + James on Alpha; all 3 on Beta + Gamma) + Phase 4 (deploy workflow + docs)
- **Locks**: `C:\Dev\ouroboros-common\fleet\code-server\**` · Alpha/Beta/Gamma `/etc/nginx/conf.d/` · `/etc/ouroboros/code-server-ports.json`
- **Hold signal**: Jack confirms Phase 2 working (jack@alpha browser test) before Phase 3 starts
- **Assigned session type**: DEDICATED
- **Next action**: Resume in fresh session — `provision-user.sh baley ... admin` + `provision-user.sh james ... business` on Alpha; then full Phase 2 sweep on Beta + Gamma

### [MARATHON-002] ouroboros-common · 07-memory-system
- **Status**: ✅ COMPLETE (2026-05-05)
- **Project**: `C:\Dev\ouroboros-common` · `C:\Dev\autonomous-devops-agent`
- **What shipped**: Pointer files, session-memory-writer.js hook, Step 0d/1b/7c skill updates, canonical-standards.md
- **Locks**: RELEASED
- **Blocking**: Nothing — changes are additive

### [MARATHON-003] ouroboros-agent · runner-circuit-breaker
- **Status**: ✅ COMPLETE (2026-05-05 ~17:25 — Alpha `/workspace/runtime/runner.sh` deployed)
- **Project**: Alpha `/workspace/`
- **What shipped**: billing-error circuit breaker — detects `billing_error` /
  `Credit balance is too low` / `credit_balance_too_low` / `insufficient_quota`
  / `payment_required` in claude run logs. On detection: writes
  `/workspace/runtime/circuit-breaker.flag`, increments consecutive counter,
  sleeps 1800s. Pre-flight check at top of main loop skips iterations while
  flag is fresh. After 3 consecutive billing errors: halt + log to
  `/workspace/logs/circuit-breaker-tripped.log`. Counter resets on any
  non-billing task outcome.
- **Verified**: bash -n syntax PASS; 3 detection scenarios PASS in container;
  runner restarted, auth check ✓, picked up local task normally
- **Repo**: commit `28cb235` — `runtime/runner.sh` reconciled with deployed
  (was 18771-byte Apr 19 version, drifted from container's 19264; now 23036
  with circuit breaker)
- **Locks**: RELEASED

### [MARATHON-006] ouroboros-agent · queue-rebalance-audit-cap
- **Status**: ✅ COMPLETE (2026-05-05 ~17:55 — Alpha `/workspace/runtime/loop_controller.py` deployed)
- **Project**: Alpha `/workspace/`
- **What shipped**: 15% audit/monitor cap at template-selection time in
  `loop_controller.py`. New `_is_audit_template()` classifier on substring
  markers (audit/monitor/drift-analysis/system-prompt-audit/...) and
  `_enforce_audit_cap()` that trims audits in batch so audit ≤ total*0.15.
  Floor allows ≥1 audit when total ≥7 so cap isn't hard ban. AUDIT_CAP_PCT
  env override.
- **Verified**: classifier 6/6 PASS; cap math PASS at total=4/7/20; AST parse
  PASS in container; AUDIT_CAP referenced 4× in deployed file
- **Snapshot at change**: 18 queue + 200 done all research-synthesis (0 audit)
  — cap is preventive
- **Repo**: commits `a4a40d9` (loop_controller) + `d5b6332`
  (governance/CHANGES-2026-05-05.md). Also pushed CHANGES doc to Alpha
  `/workspace/governance/CHANGES-2026-05-05.md`.
- **Note**: `loop_controller.py` only fires when QUEUE_BACKEND=r2; Alpha
  currently runs local backend with separate alpha-refill generator outside
  `runtime/`. Local generator emits no audit/monitor tasks today, so no
  parallel patch needed.
- **Locks**: RELEASED

### [MARATHON-007] ouroboros-agent · distiller-cron-verification
- **Status**: ✅ COMPLETE (2026-05-05 ~18:05 — Omega crontab fixed)
- **Project**: Omega (100.92.44.56)
- **Root cause found**: `/var/spool/cron/crontabs/root` had all 10 OUROBOROS
  cron entries concatenated onto a SINGLE line (verified via cat -A: 1100+
  bytes with one trailing `$`). Other crons fired by accident via bash
  interpretation of the concatenated command; the 30-3 distiller line did
  not. Last successful distiller fire was 2026-04-22 — 3 windows missed.
- **What shipped**: Multi-line canonical crontab (11 entries, proper newlines)
  installed on Omega via `crontab /root/crontab.clean`. Backup at
  `/root/crontab.backup-2026-05-05`. cron service active, schedule reloaded.
- **Verified**: crontab -l + /var/spool/cron/crontabs/root both show 11 lines
  via cat -A; manual distiller.py invocation completed end-to-end (exit 0):
  20 new research files distilled, BRAIN.md regenerated 18531 bytes,
  mtime advanced from 2026-04-21 to 2026-05-06 01:09 UTC
- **Repo**: commit `363c146` — `ops/omega/crontab.clean.txt` (canonical) +
  `ops/omega/CRONTAB-FIX-2026-05-05.md` (incident notes & follow-ups)
- **Scheduled-fire confirmation**: next cron window Wed 2026-05-06 03:30 UTC
  (~2h after fix landed) — already redundant since manual run succeeded,
  but operator can spot-check mtime tomorrow as a regression catch.
- **Follow-ups recorded**: (1) add Omega session-start hook to alarm on
  crontab <5 lines; (2) audit fleet/ provisioning scripts for any path
  that writes crontab without preserving newlines.
- **Locks**: RELEASED

### [MARATHON-011] global-claude-config · external-heartbeat-and-standard
- **Status**: 🔴 IN_PROGRESS (started 2026-05-06 00:30)
- **Project**: `C:\Users\jackp\Claude-Projects\trident-code` + `C:\Users\jackp\.claude`
- **Phase**: Wave D — external accountability layer + measurable metrics + THE STANDARD
- **Locks**: `Claude-Projects/trident-code/system-invariants.md` (new) · `Claude-Projects/trident-code/system-metrics.md` (new) · `Claude-Projects/trident-code/.github/workflows/system-heartbeat.yml` (new) · `Claude-Projects/trident-code/STANDARD.md` (new) · `~/.claude/hooks/pulse-check.js` (new) · `~/.claude/skills/system-audit-weekly/**` (new) · `~/.claude/STANDARD.md` (new)
- **Scope**: External heartbeat (GitHub Actions, off-system), invariants file, metrics dashboard with Karpathy/HELM-style multi-dimensional measurement, weekly audit skill, pulse-check SessionStart hook, THE STANDARD playbook codifying 10 commandments + measurable design rubric
- **Assigned session type**: TYPE-A AUTONOMOUS
- **Concurrent with**: Nothing (all new paths)
- **Hold signal**: All 7 deliverables shipped + pushed to GitHub

### [MARATHON-004] ouroboros-agent · cognee-ingestion-fix
- **Status**: 🔵 QUEUED (Wave 2 — dedicated session)
- **Project**: Alpha/Omega `/workspace/`
- **Phase**: Not started
- **Locks**: Omega `/workspace/ingest.py` · Omega `/workspace/cognee/` · LanceDB schema
- **Scope**: Fix `cognee_ingested` flag always returning 0 — custom ingestion.py with working callback
- **Assigned session type**: DEDICATED (requires SSH to Omega, schema changes)
- **Depends on**: [MARATHON-001] Phase 2 verified (stable Alpha)
- **Blocks**: Knowledge graph activation ([MARATHON-005])

### [MARATHON-008] global-claude-config · session-quality-hooks
- **Status**: ✅ COMPLETE (2026-05-05)
- **Project**: `C:\Users\jackp\.claude` (global Claude config)
- **What shipped**:
  - `hooks/marathon-tracker.js` (dual-mode SessionStart/SessionEnd) — registered in settings.json
  - `hooks/brain-staleness-check.js` — registered in settings.json (caught 40-day staleness immediately)
  - `skills/start-session/SKILL.md` Step 0c (pointer-file project memory load) + Step 0d (MARATHON conflict surfacing)
  - Cowork-only scan-pattern audit: 3 active skills + all hooks clean (start-session, wrap-up, self-learning all use pointer-first)
  - `get-shit-done/workflows/quick.md` lightweight-inline fallback for repos without ROADMAP.md
- **Locks**: RELEASED
- **Blocking**: Nothing — additive changes only

### [MARATHON-009] global-claude-config · wave-b-leverage-batch
- **Status**: ✅ COMPLETE (2026-05-05)
- **Project**: `C:\Users\jackp\.claude` + `C:\Users\jackp\Claude-Projects\`
- **What shipped**:
  - **B1**: Discovered actual repo is `mrhappytimes/trident-code` (POM doesn't exist on GitHub). Fixed 3 references in `wrap-up/SKILL.md`. Repo-sync will now actually push at session-end instead of silently skipping.
  - **B2**: `~/.claude/hooks/_verify-hooks.js` — hook integrity suite. Initial sweep: 9/9 hooks ✅ green (exists + syntax + log freshness), 0 issues. Caught 3 orphans correctly (cortex-health-check before registration, gsd-statusline=statusLine not hook, gsd-workflow-guard=opt-in toggle).
  - **B3**: `~/.claude/skills/marathon-registry/SKILL.md` — manual MARATHON.md interface (commands: list/register/update/close/conflicts/help). Distinct from /marathon BUILD/SHIP loop skill.
  - **B4**: `~/.claude/hooks/cortex-health-check.js` — TCP probes Omega at 100.92.44.56:8765 at SessionStart. Registered in settings.json. Silent on success, surfaces warning + Tailscale check guidance on failure.
- **Locks**: RELEASED
- **Blocking**: Nothing — all additive

### [MARATHON-010] global-claude-config · wave-c-operational-hardening
- **Status**: ✅ COMPLETE (2026-05-05)
- **Project**: `C:\Users\jackp\.claude` + `C:\Users\jackp\Claude-Projects\trident-code`
- **What shipped**:
  - **C1+C2**: Synced 5 hooks + 4 skills + MARATHON.md to `Claude-Projects/trident-code/`. Resolved rebase conflict via hard-reset + reapply. **Pushed to GitHub at `mrhappytimes/trident-code` commit `56fba6e`**. Today's work is now durable across machines.
  - **C3**: Live SessionEnd hook test — synthetic stdin to `session-memory-writer.js` correctly wrote summary to `C:\Dev\ouroboros-common\07_MEMORY\session_summaries\` (walk-up directory pointer detection verified). Test summary file cleaned up afterward.
  - **C4**: Archived 4 stale skill backups to `~/.claude/skills/_archive/`: `meta-pain-check.bak.20260415`, `start-project.bak-20260505`, `start-session.bak-20260505-v3.0`, `start-session.bak-20260505-v4.0`. Skill list now clean (zero `.bak` directories surfacing in skill registry).
- **Locks**: RELEASED
- **Blocking**: Nothing

### [MARATHON-005] ouroboros-agent · knowledge-graph-activation
- **Status**: 🔵 QUEUED (Wave 3)
- **Project**: Omega · Alpha
- **Phase**: Not started
- **Locks**: Omega `/workspace/kuzudb/` · Omega `/workspace/cognee/graph_layer/`
- **Scope**: Wire KuzuDB graph layer into Cognee — enable multi-hop traversal + relationship queries
- **Assigned session type**: DEDICATED (architecture changes)
- **Depends on**: [MARATHON-004] Cognee ingestion fixed
- **Blocks**: Session memory → Cortex graph loop

---

## Completed Builds (Archive)

| ID | Build | Completed | Notes |
|----|-------|-----------|-------|
| MARATHON-002 | 07_MEMORY pointer system | 2026-05-05 | Pointer files + hook + 3 skill updates |
| MARATHON-008 | session-quality-hooks | 2026-05-05 | marathon-tracker + brain-staleness hooks, Step 0c/0d, GSD fallback |
| MARATHON-009 | wave-b-leverage-batch | 2026-05-05 | repo-sync→trident-code path fix, _verify-hooks.js, /marathon-registry skill, cortex-health-check.js |
| MARATHON-010 | wave-c-operational-hardening | 2026-05-05 | Synced + pushed to GitHub (commit 56fba6e), hook chain validated, 4 stale backups archived |

---

## Session Type Definitions

### TYPE-A — Autonomous Session
Runs independently in background. Jack doesn't need to be present.
**Rules:**
- Only modifies files/systems with no active MARATHON locks held by another session
- Never touches production server configs
- Never sends messages, emails, or external communications without Jack
- Auto-commits with descriptive messages
- Updates MARATHON.md when a phase completes
- Caps at 2 hours runtime then pauses and writes status

**Good for:** Runner fixes, hook additions, skill updates, research ingestion, file reorganization, documentation

### TYPE-B — Dedicated Session
Requires Jack's attention for decisions, verification, or external system access.
**Rules:**
- Explicitly declares its MARATHON locks at session start (updates this file)
- Announces to Jack when it needs to HOLD waiting for another session
- Announces when another session needs to HOLD waiting for it
- Never starts if a conflicting MARATHON lock is IN_PROGRESS
- Updates MARATHON.md at every phase boundary

**Good for:** Server provisioning, schema migrations, revenue feature builds, external service configuration, multi-step architecture changes

---

## Conflict Detection Protocol

At session start, Claude reads this file and checks:
1. Does current CWD match any IN_PROGRESS or PAUSED build's `Project` or `Locks` path?
2. If YES → surface warning: "⚠️ MARATHON conflict: [BUILD-ID] is [STATUS] with locks on [path]. Resolve before modifying."
3. If build is PAUSED → check hold signal → advise Jack whether to resume or wait
4. If build is IN_PROGRESS in another session → HOLD and notify Jack

---
_Format: Updated by Claude as part of wrap-up Step 2d. Hook: session-memory-writer.js stamps `last_session_end`._
_Source of truth: This file. Do not maintain separate per-project conflict logs._
