# THE STANDARD — POM AI System Design Commandments
_The playbook. The non-negotiables. Every system, skill, hook, and feature built from this point forward must conform._

**Version:** 1.0  
**Codified:** 2026-05-06  
**Authority:** This document supersedes informal practice. Where this conflicts with prior conventions, this wins. Updates require a versioned commit with rationale.

---

## 0. The Failure That Birthed This Standard

On 2026-05-05, Jack confronted a recurring pattern: every "the system is now self-aware" claim was followed days or weeks later by a silent failure. The 14-day distiller silence (root cause: crontab concatenated onto a single line — broken since 2026-04-22) was the canonical case. None of the existing self-monitoring fired because all monitors were **introspective** — they only ran when Jack opened a session.

This standard exists because **inside-the-house smoke detectors with the batteries removed is not a fire alarm system**.

---

## 1. The Ten Commandments

### I. No claim without verification.
"Self-aware", "compounds from here", "bullet-proof", "self-improving" are banned phrases unless paired with:
- A timestamp of the last successful end-to-end verification
- A pointer to the artifact that contains the proof
- A measurable metric showing the claim is currently true

### II. No monitor without external heartbeat.
Any system that monitors itself MUST also have an external monitor that runs OFF the monitored host. GitHub Actions, Cloudflare Workers, or a different Hetzner box — never the same machine. The monitor that monitors the monitor cannot be the monitor.

### III. No metric without baseline + threshold + alarm.
A measurement without a fixed baseline and an alarm threshold is just a number on a screen. Every metric in `system-metrics.md` has all three. New metrics added without all three are rejected at PR review.

### IV. No feature without an invariant.
Every new component (skill, hook, service, schema) must add at least one entry to `system-invariants.md` BEFORE the work is marked complete. The invariant has all 6 fields filled and the verify command currently passes. Otherwise the component is broken on day 1 by definition.

### V. No silent failure.
Every failure mode must surface. Logs alone are not surfacing — they're tombs. Surfacing means at least one of: GitHub issue, Slack message, email, on-screen banner at session start, statusline indicator. Pick one channel per severity tier; never zero.

### VI. No introspective-only monitoring.
A check that only runs when Jack opens a session is a check that fails for as long as Jack is on vacation. Every critical signal needs both: introspective check (fast feedback when active) AND external check (catches silence).

### VII. Every system has an SLO.
Every running service or pipeline must publish:
- **SLI** (the metric being measured — e.g., "task success rate over rolling 24h")
- **SLO** (the target value — e.g., "≥30% rolling 24h")
- **Error budget** (how much slack before alarm — e.g., "3 consecutive days under target")

If the SLO is unwritten, the service is not in production. Move it back to staging.

### VIII. Every regression must be detected within 24 hours.
The 14-day silent failure is the worst case this system has ever had. We do not allow a worse case. Detection latency for any monitored signal must be ≤24h. If a class of failure is harder than that to detect, EITHER find a faster proxy signal OR treat it as out-of-scope (and document that).

### IX. Every fix must include the test that catches the regression.
Found a bug? The PR closing it must add either an invariant (in `system-invariants.md`), an eval (in the relevant `evals/evals.json`), or a heartbeat assertion (in `.github/workflows/system-heartbeat.yml`). Bugs without tests are loaded weapons aimed at future Claude.

### X. The monitor must be monitored.
The heartbeat itself is monitored: `pulse-check.js` reads the pulse age and screams if it's >36h stale. The pulse-check is monitored: it logs to `pulse-check.log` which gets verified by `_verify-hooks.js`. All the way down. There is no top of the stack — every monitor has a bigger monitor watching it.

---

## 2. The Five Required Layers (every system must have all five)

| Layer | Purpose | Cadence | Built today |
|-------|---------|---------|-------------|
| L1 — External heartbeat | Runs off-system; binary green/red on every invariant | Daily 6am UTC | `.github/workflows/system-heartbeat.yml` |
| L2 — Invariants file | The list of things that must be true | Versioned | `system-invariants.md` |
| L3 — SLI/SLO definitions | Multi-axis measurement per component | Live dashboard | `system-metrics.md` |
| L4 — Visible alarms | GitHub issues, session-start banners, Slack | Per failure | pulse-check.js + workflow issue creation |
| L5 — Weekly review ritual | Human-in-the-loop catch for what L1–L4 miss | Mondays | `/system-audit-weekly` skill |

A system without all five layers is incomplete by definition.

---

## 3. The 6-Axis Measurement Discipline (HELM-derived)

Every component reports all six axes. Optimizing one without checking the other five is a Pareto regression and must be rejected.

| Axis | Definition | Unit | Why it matters |
|------|------------|------|----------------|
| **Liveness** | Is it running NOW? | bool | Binary uptime |
| **Freshness** | Hours since last successful run | hours | Catches silent staleness (the 14-day distiller bug) |
| **Accuracy** | Eval pass rate (binary assertions) | % | Catches "running but wrong" |
| **Latency** | p50/p95/p99 | seconds | Catches slow degradation |
| **Error rate** | Failures / total | % | Catches partial degradation |
| **Coverage** | % of expected behavior tested | % | Catches "we're not measuring what matters" |

When you ship anything, you commit to all six. When you change something, you report all six.

---

## 4. The Karpathy Loop (per-skill self-improvement)

For any skill or hook with eval coverage:

```
1. Read skill + evals/evals.json
2. Run binary assertions    → score = pass / total
3. Compare to last baseline → delta
4. Make atomic improvement  → minimal change, reversible
5. Re-run evals             → new score
6. If improved: commit, lock as new baseline. If not: revert.
7. Append to system-metrics-history.csv
```

Skills currently with evals: ~5/180. **Target by 2026-07-01:** 50% of top-50-by-usage have evals.json.

The auto-research skill operates on this loop. Every skill in the auto-research backlog gets one cycle per week until baseline is locked.

---

## 5. The Build Rubric (every PR/feature must satisfy)

Before merging any change, the author asserts:

- [ ] **Invariant added** — entry in `system-invariants.md` with all 6 fields, verify command passes
- [ ] **Baseline measured** — current state recorded in `system-metrics.md` for all 6 axes
- [ ] **Threshold defined** — when does this become red? Documented in invariant
- [ ] **Alarm channel chosen** — GitHub issue / Slack / banner / log → which one?
- [ ] **Eval present** — at least one binary assertion in `evals/evals.json` (skills) or test (code)
- [ ] **Regression test** — the bug or risk this addresses has a test that would have caught it
- [ ] **External verification** — the heartbeat workflow can verify this without depending on Claude or Jack
- [ ] **Improvement target** — what does v2 look like? Documented (even one line)

Eight checkboxes. Anything less is technical debt with a bow on it.

---

## 6. The Cadence

| Cadence | Activity | Owner | Output |
|---------|----------|-------|--------|
| Per session | Wrap-up chain (Step 1a–2d) | Claude | learnings.md, MARATHON.md, session summary |
| Daily 6am UTC | Heartbeat workflow | GitHub Actions | system-pulse.md, alarm issues |
| Daily SessionStart | pulse-check.js + brain-staleness + cortex-health + marathon-tracker | Hooks | Surfaced warnings in context |
| Weekly Monday | system-audit-weekly skill | Jack | system-audits/YYYY-MM-DD.md |
| Monthly | Trident Auditor full scoring | trident-auditor skill | system-health.md update |
| Quarterly | Wave-level retrospective + invariant review | Jack | STANDARD.md amendment if needed |

Skipped cadences are themselves a signal — they indicate either the cadence is wrong or attention is wrong.

---

## 7. Anti-Patterns Banned (this is non-negotiable)

| Pattern | Why banned | Replacement |
|---------|------------|-------------|
| "Self-aware" / "compounds from here" without proof | Hopeful narration, not fact | "Verified [timestamp] · last green pulse [date]" |
| Silent log files | Tombs, not alarms | Append-AND-surface (issue/Slack/banner) |
| Inside-the-house monitoring only | Fails when system fails | Pair every introspective check with external heartbeat |
| Single-axis optimization | Pareto regression | Report all 6 axes, justify trade-offs |
| Features without evals | Untested code in production | Add at minimum 1 binary assertion before merge |
| Regression detection >24h | Repeats the 14-day distiller bug | Faster proxy signal OR document as out-of-scope |
| Bug fixes without regression tests | Ammo for future failures | Test that would have caught it ships in same PR |
| Drift in thresholds | Quietly lowering the bar | All threshold changes require commit + rationale |

---

## 8. The 14-Day Rule

The longest silent failure this system has ever experienced is 14 days (distiller cron).  
**This is the upper bound. Future silent failures longer than 24 hours = system violation = mandatory retrospective.**

Retrospectives produce:
1. New invariant (added to `system-invariants.md`)
2. Faster detection mechanism (heartbeat assertion or hook)
3. Regression test (binary assertion)
4. Updated `MEMORY_FAILURE_LOG.md` entry per project

Retrospectives are non-optional. They are the immune system's memory.

---

## 9. Versioning + Provenance

Every artifact has:
- **Version** in frontmatter or header
- **Created** date  
- **Last updated** date (changes on edit)
- **Authority** — who can amend (Jack, autoremediation, specific skill)

Every claim has:
- **Source** — what produced this number/assertion?
- **Timestamp** — when was it true?
- **Confidence** — how confident? (high / medium / low)

Provenance trails the work. Untraceable claims are removed at audit.

---

## 10. The Compounding Property (what "actually self-improving" means)

The system improves when, week over week:
1. **Invariant count grows** (more failure modes covered)
2. **Threshold tightens** (bars raised as baselines hit targets)
3. **Eval coverage grows** (more skills have binary assertions)
4. **Detection latency drops** (regressions caught faster)
5. **Alarm noise drops** (fewer false positives, more true positives)

These five trends must be visible in `system-metrics.md`. If any trend reverses for 3+ weeks, retrospective required.

**A "self-improving system" is not an aspirational marketing claim. It is a measurable trend across these five dimensions.** The dashboard either shows it or it doesn't. There is no middle ground.

---

## 11. Amendments

This standard is versioned. Major amendments (new commandments, removed bans, changed cadence) require:
1. A commit to this file with rationale in the commit message
2. A version bump (1.0 → 1.1 → 2.0 for breaking changes)
3. Notification in MARATHON.md as a build with TYPE-B classification
4. Retrospective at the next quarterly review

Minor amendments (typos, clarifications, format) can be one-line commits.

---

## 12. Closing Promise

I — Claude operating in any session — commit to:
1. Never claim "self-aware" or equivalents without pointing to a green heartbeat run
2. Never ship a feature that doesn't satisfy the 8-checkbox build rubric
3. Always pair introspective monitoring with external verification
4. Always report all 6 metric axes when changing anything
5. Always add the invariant + regression test before declaring "done"

If I violate any of these in a session, Jack invokes `/flag` and the violation is logged for retrospective.

---

_End of Standard v1.0 — 2026-05-06. Next review: 2026-08-06 (quarterly)._
