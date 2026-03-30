# Auditor — Continuous Governance & Health Assessment

**Agent:** Auditor (4 of 4) | **Trigger:** Auto (passive, every session) + manual (`/audit`) | **Runtime:** <10 sec (passive), 2-3 min (full)

---

## WHAT AUDITOR DOES

Auditor runs two assessment modes:

1. **Passive Health Check** — Every session, <10 seconds. Quick status: are all 4 agents running? Is data flowing? Is git clean?
2. **Full Assessment** — On demand, 2-3 minutes. Deep 160-point audit across 4 agents × 4 dimensions, constitutional review, cross-user analysis.

Auditor is the governance guardian. It catches drift, flags violations, and escalates when needed.

---

## PASSIVE HEALTH CHECK (EVERY SESSION)

Runs automatically, <10 seconds. Checks:

**Agent Status:**
- Mirror agent installed and running? ✓
- Scout agent installed? ✓
- Factory agent installed? ✓
- Auditor (self) operational? ✓

**Data Flow:**
- mirror-log.md exists and has recent entries? ✓
- gaps-tracker.md updated today? ✓
- patterns-tracker.md updated today? ✓
- audit-report.md recent? ✓

**System Health:**
- Trident files intact? ✓
- .claude/commands/ directory present? ✓
- ~/.claude/memory/ synced? ✓
- Git repo status clean? ✓

**Output:**
```
Passive Health Check — 2026-03-30 14:45:00

Status: GREEN ✓
- All 4 agents operational
- Data flowing normally
- Git status: clean
- No escalations

Next: Run /audit --full for deep assessment
```

**If issues detected:**
```
Status: YELLOW ⚠
- Mirror agent: Last run 3 hours ago (consider manual /mirror)
- Git status: 5 uncommitted files (commit or stash)
- Action: Run /audit --full for details
```

---

## FULL ASSESSMENT (`/audit` or `/audit --full`)

Deep, comprehensive audit: 2-3 minutes. Runs 4 agents × 4 dimensions = 160 points.

### Agent Dimensions (40 points each)

**MIRROR AGENT:**
- **Signal Quality (10 pts):** Are captured signals accurate and specific?
- **Aggregation Health (10 pts):** Do gaps-tracker, patterns-tracker, corrections-tracker reflect reality?
- **Cross-User Tagging (10 pts):** Are signals tagged with user_id, role, domain correctly?
- **Session Health Scoring (10 pts):** Is 0-20 health score calibrated properly?

**SCOUT AGENT:**
- **Search Depth (10 pts):** Are searches comprehensive? All 5 sources checked?
- **Security Pre-Screen (10 pts):** Are dangerous candidates correctly blocked?
- **Quality Scoring (10 pts):** Is relevance × quality calibration accurate?
- **Staging Accuracy (10 pts):** Are staged candidates worth Factory's time?

**FACTORY AGENT:**
- **Constitutional Compliance (10 pts):** Do all commands pass 10 principles?
- **Code Quality (10 pts):** Are built commands production-ready?
- **Team Integration (10 pts):** Are commands cross-referenced correctly?
- **Deployment Hygiene (10 pts):** Is changelog complete? Are staged commands clean?

**AUDITOR AGENT (self):**
- **Assessment Accuracy (10 pts):** Are audit findings correct? Low false positives?
- **Emergency Detection (10 pts):** Would Auditor catch critical failures?
- **Reporting Quality (10 pts):** Are reports actionable and clear?
- **Governance Enforcement (10 pts):** Are Constitutional Principles enforced?

### Constitutional Review (10 bonus points)

All 10 Constitutional Principles:
1. User Control Is Absolute → ✓
2. Security By Default → ✓
3. Transparency in Reasoning → ✓
4. Knowledge Compounds → ✓
5. First-Order Effects Only → ✓
6. Data Permanence → ✓
7. Graceful Degradation → ✓
8. Human Rhythm Matters → ✓
9. Reversibility → ✓
10. Bias Toward Simplicity → ✓

**Score:** 10/10 → +10 bonus

### Cross-User Analysis (team only)

If team mode enabled:
- Are other team members blocked by same gaps?
- Are patterns being shared effectively?
- Is duplicate work being prevented?

### Final Score & Recommendations

```
Full Audit Report — 2026-03-30 14:45:00

FINAL SCORE: 152/160 (95%)

Mirror Agent: 37/40 (92%)
  ✓ Signal quality excellent
  ✓ Aggregation working
  ✓ Cross-user tagging accurate
  ⚠ Health scoring slightly optimistic (noted)

Scout Agent: 38/40 (95%)
  ✓ Search depth comprehensive
  ✓ Security pre-screen tight
  ✓ Quality scoring calibrated well
  ⚠ One low-quality candidate staged (score 49, threshold 48)

Factory Agent: 40/40 (100%)
  ✓ Constitutional review flawless
  ✓ Code quality excellent
  ✓ Team integration strong
  ✓ Deployment hygiene perfect

Auditor Agent: 37/40 (92%)
  ✓ Assessments accurate
  ✓ Emergency detection working
  ✓ Reporting clear
  ⚠ False positive rate 2% (can be tightened)

Constitutional Principles: 10/10 ✓

RECOMMENDATIONS:
1. Continue current trajectory (score 95% is excellent)
2. Watch health score calibration in Mirror (slightly generous)
3. Tighten Scout quality threshold to 50 (to exclude marginal candidates)
4. No action required (system healthy)

Next audit: In 7 days or after 10 sessions
```

---

## EMERGENCY MODE TRIGGERS

If full score <120/160 (75%), Auditor escalates:

```
ALERT: Audit Score Below 120 (Emergency Mode)

Current Score: 110/160 (69%)

Critical Issues:
- Mirror: Signal capture failing (0 signals last 3 days)
- Scout: Security pre-screen too permissive (4 blocked candidates manually)
- Factory: 2 commands failed constitutional review

Action Required:
1. Check user_identity.md is filled in (Mirror needs this)
2. Run /audit --diagnose for breakdown
3. Review factory-staging/ for constitutional issues
4. Fix issues, then run /audit again

System will not auto-deploy until score >120.
```

---

## AUDITOR OUTPUT FORMAT

All reports saved to `~/.claude/memory/audit-report.md`:

```markdown
# Audit Report — 2026-03-30 14:45:00

## Summary
- **Status:** GREEN
- **Score:** 152/160 (95%)
- **Timestamp:** 2026-03-30T14:45:00Z
- **Trend:** Improving (last week 148/160)

## Agent Scores

| Agent | Score | Trend | Status |
|-------|-------|-------|--------|
| Mirror | 37/40 | ↑ | Excellent |
| Scout | 38/40 | ↓ | Very Good |
| Factory | 40/40 | → | Perfect |
| Auditor | 37/40 | → | Excellent |

## Constitutional Review

All 10 principles: ✓ PASS

## Detailed Findings

### Mirror Agent: 37/40
- Signal Quality: 9/10 (capturing well)
- Aggregation Health: 9/10 (tracking accurately)
- Cross-User Tagging: 9/10 (user_id correct)
- Health Scoring: 10/10 (calibrated well)
- **Note:** Health score slightly optimistic (consider -0.5pt adjustment)

### Scout Agent: 38/40
- Search Depth: 10/10 (all sources checked)
- Security Pre-Screen: 9/10 (one false negative noted)
- Quality Scoring: 9/10 (well-calibrated)
- Staging Accuracy: 10/10 (Factory happy with candidates)
- **Note:** One candidate (score 49) is marginally below quality bar

### Factory Agent: 40/40
- Constitutional Compliance: 10/10 (perfect)
- Code Quality: 10/10 (production-ready)
- Team Integration: 10/10 (cross-referenced well)
- Deployment Hygiene: 10/10 (changelog pristine)

### Auditor Agent: 37/40
- Assessment Accuracy: 9/10 (2% false positive rate)
- Emergency Detection: 9/10 (sensitive threshold)
- Reporting Quality: 10/10 (clear and actionable)
- Governance Enforcement: 9/10 (Constitutional principles tight)

## Cross-User Analysis

Team Size: 3 members (Jack, Brandon, James)
Shared Gaps: 2 (Stripe integration, RAG evaluation)
Cross-Team Patterns: 1 (API design workflow used by all)
Duplication Prevented: 1 command (Jack and Brandon both needed Slack integration)

## Recommendations

1. **Continue current trajectory.** System is healthy and improving.
2. **Watch Scout quality threshold.** One marginal candidate (49/100) got staged. Consider raising threshold to 50.
3. **Mirror health scoring calibration.** Slightly generous (off by 0.5pt on average). Can tighten.
4. **No action required.** All critical systems functioning.

## Next Audit

- **Scheduled:** 2026-04-06 (7 days)
- **Trigger:** After 10 sessions (whichever comes first)
- **Escalation:** If score drops below 120/160

---

**Audit Status: ✓ PASSED**
```

---

## RUNNING AUDITOR MANUALLY

**Quick health check:**
```bash
/audit
# Output: GREEN or YELLOW (takes <10 seconds)
```

**Full assessment:**
```bash
/audit --full
# Output: 160-point detailed report (takes 2-3 minutes)
```

**Diagnostic deep dive:**
```bash
/audit --diagnose
# Output: Agent-by-agent breakdown with specific issues
# Takes 3-5 minutes, very detailed
```

**Refresh configuration:**
```bash
/audit --refresh-config
# Re-reads trident-config.md and user_identity.md
# Applies any config changes
```

**Refresh team registry:**
```bash
/audit --refresh-team
# Syncs team-registry.md from Supabase (if enabled)
```

---

## AUDITOR CONFIGURATION

Edit `~/.claude/config/trident-config.md`:

```
auditor_passive_frequency: "every-session" # When to run quick check
auditor_full_frequency: "weekly" # When to run deep audit (auto-trigger)
auditor_score_threshold_warning: 120 # Score <this = WARNING
auditor_score_threshold_critical: 100 # Score <this = EMERGENCY MODE
auditor_emergency_mode_action: "stop-deployments" # "stop-deployments", "alert-only"
auditor_false_positive_tolerance: "2%" # Acceptable false positive rate
```

---

## CONSTITUTIONAL PRINCIPLES ENFORCEMENT

Auditor verifies every command against all 10 principles. Sample enforcement:

**Principle 1: User Control**
- Command doesn't auto-execute? ✓
- User can disable/remove? ✓
- No hidden permissions? ✓

**Principle 2: Security**
- No credentials exposed? ✓
- No PII in logs? ✓
- Clear security warnings? ✓

... (same for all 10)

**Result:** Principle ✓ PASS or ✗ FAIL

If any principle FAILs, command is blocked from deployment.

---

## ESCALATION POLICY

**Score 140-160 (87-100%):** GREEN — All good, continue
**Score 120-139 (75-86%):** YELLOW — Monitor, address recommendations
**Score 100-119 (62-74%):** ORANGE — Critical issues, fix before deploying new commands
**Score <100 (0-61%):** RED — Emergency mode, system paused until fixed

---

## AUDITOR SELF-CHECK

Auditor audits itself every run:

```
Auditor Self-Check:
- Am I accurately assessing Mirror? (cross-check sample signals)
- Am I fairly scoring Scout? (verify quality scores match reality)
- Am I catching all Factory violations? (test with edge cases)
- Am I detecting emergencies correctly? (sensitivity test)

Result: 37/40 (self-assessment is 92% accurate)
```

---

## TROUBLESHOOTING

**Audit score dropped suddenly:**
- Check mirror-log.md for recent errors
- Check git status (uncommitted files can lower score)
- Run `/audit --diagnose` for breakdown

**False positives (Auditor flagging non-issues):**
- Check auditor scoring calibration
- Run `/audit --calibrate` to retrain
- Set false_positive_tolerance higher if needed

**Audit not running automatically:**
- Check auditor_passive_frequency in config
- Verify Auditor agent file exists: `~/.claude/commands/auditor.md`
- Run manually: `/audit`

**Emergency mode triggered:**
- Check audit-report.md for specific issues
- Address critical issues listed
- Run `/audit --full` to verify fixes
- Run `/audit --clear-emergency` to resume normal operation

---

## NEXT STEPS

1. Run `/audit` after each session to verify health
2. Run `/audit --full` weekly for deep assessment
3. Review audit-report.md for recommendations
4. Address any YELLOW or RED flags
5. Keep score ≥120 to maintain normal operations

---

**Auditor is your safety net. It catches problems before they cascade.**
