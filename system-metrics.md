# System Metrics — Multi-Dimensional Measurement
_Karpathy + HELM discipline: never optimize one dimension in isolation. Track 6 axes per component. Baseline today, improve over time, alarm on regression._

**Version:** 1.0  
**Created:** 2026-05-06 (baseline date)  
**Updated by:** External heartbeat (GitHub Actions daily 6am UTC) writes the rolling values  
**Reviewed:** Weekly Mondays via `/system-audit-weekly`

---

## The 6 Measurement Axes (every component must report all 6)

| Axis | Definition | Unit | Cadence |
|------|------------|------|---------|
| **Liveness** | Is it running right now? | bool | per-heartbeat |
| **Freshness** | How long since last successful run? | hours | per-heartbeat |
| **Accuracy** | Does it produce correct output? (binary eval pass rate) | % | per-eval-run |
| **Latency** | How long does it take? p50/p95/p99 | seconds | per-invocation |
| **Error rate** | Failures / total invocations | % | rolling 24h |
| **Coverage** | What % of expected behavior is exercised by tests? | % | per-skill release |

A regression in ANY axis triggers investigation, even if the targeted axis improved. (HELM principle: optimizing accuracy at the cost of latency or robustness is a regression.)

---

## Component Scorecard — 2026-05-06 Baselines

### OUROBOROS Runner
| Axis | Baseline | Target | Threshold | Last Measured |
|------|----------|--------|-----------|---------------|
| Liveness | active | active | inactive>5m | 2026-05-06 |
| Freshness | <1h | <1h | >24h | 2026-05-06 |
| Accuracy (task success) | 4.4% lifetime / 16% recent | 60% by 2026-06-01 | <30% rolling 24h | 2026-05-06 |
| Latency (avg task) | 0.9 min | 0.5 min | >5 min | 2026-05-06 |
| Error rate (24h) | TBD by heartbeat | <40% | >70% | pending day 1 |
| Coverage (eval tests) | 0% (no eval suite yet) | 80% by 2026-06-15 | <50% | TBD |

### Cortex Knowledge Graph
| Axis | Baseline | Target | Threshold | Last Measured |
|------|----------|--------|-----------|---------------|
| Liveness | reachable | reachable | unreachable>10m | 2026-05-06 |
| Freshness (BRAIN.md) | <1d (just regenerated) | <7d always | >7d red, >14d critical | 2026-05-06 |
| Accuracy (RAG eval) | unmeasured | 70%+ faithfulness/relevance | <50% | TBD |
| Latency (search p95) | timed out previously | <5s | >10s or timeout | partial |
| Error rate (MCP calls) | ~10% (timeouts) | <2% | >20% | 2026-05-06 |
| Coverage (chunks indexed) | 129,651 | growing | regression = red | 2026-05-06 |

### Hooks Subsystem
| Axis | Baseline | Target | Threshold | Last Measured |
|------|----------|--------|-----------|---------------|
| Liveness | 10/10 registered | 100% | <100% | 2026-05-06 |
| Freshness (logs) | varies, all <30d | <7d after last fire | >30d stale | 2026-05-06 |
| Accuracy (verify-hooks pass) | 100% (9/9 → 10/10) | 100% always | <100% | 2026-05-06 |
| Latency (hook overhead) | <100ms each | <50ms | >500ms total at boot | partial |
| Error rate (hook crashes) | 0 known | 0 | any non-zero | 2026-05-06 |
| Coverage (hooks with logs) | 6/10 | 10/10 | <80% | 2026-05-06 |

### Skills Subsystem
| Axis | Baseline | Target | Threshold | Last Measured |
|------|----------|--------|-----------|---------------|
| Liveness | all loadable | 100% loadable | any unparseable | 2026-05-06 |
| Freshness (last edit) | varies | top 10 used <30d | top 10 stale >90d | 2026-05-06 |
| Accuracy (eval pass) | unmeasured | 80% per skill | <60% | TBD via auto-research |
| Latency (skill load) | <50ms | <50ms | >200ms | partial |
| Error rate (skill failures) | unknown | <5% | >15% | TBD |
| Coverage (skills with evals.json) | ~5/180 | 50% by 2026-07-01 | <20% | 2026-05-06 |

### Distiller Pipeline
| Axis | Baseline | Target | Threshold | Last Measured |
|------|----------|--------|-----------|---------------|
| Liveness (cron firing) | green (post-fix) | green | last fire >7d | 2026-05-06 |
| Freshness (BRAIN.md gen) | <1d | <7d | >7d | 2026-05-06 |
| Accuracy (research synth quality) | unmeasured | manual review 4/5 quality | <3/5 | TBD |
| Latency (full distill run) | ~minutes | <30 min | >2 hours | 2026-05-06 |
| Error rate (cron-fail rate) | 14d silent failure (now fixed) | 0 | 1 missed window | 2026-05-06 |
| Coverage (research files indexed) | 129K | growing | regression | 2026-05-06 |

### Marathon Tracker (cross-session conflict prevention)
| Axis | Baseline | Target | Threshold | Last Measured |
|------|----------|--------|-----------|---------------|
| Liveness (hook fires) | yes (verified) | yes always | hook silent at boot | 2026-05-06 |
| Freshness (last_session_end) | <1h | <session-pace | >7d on active build | 2026-05-06 |
| Accuracy (conflict detection) | manually verified pass | 100% precision/recall | any miss | 2026-05-06 |
| Latency (parse + render) | <100ms | <100ms | >500ms | 2026-05-06 |
| Error rate (parse fails) | 0 | 0 | any | 2026-05-06 |
| Coverage (active builds tracked) | 11 entries | all sessions register | any unregistered build | 2026-05-06 |

---

## Trend Tracking (Karpathy loss-curve style)

The heartbeat appends a row to `system-metrics-history.csv` (also in this repo) every run. Format:

```csv
date,component,axis,value,threshold,direction
2026-05-06,runner,accuracy,4.4,30,red
2026-05-06,cortex,freshness,1d,7d,green
2026-05-06,hooks,accuracy,100,100,green
```

Each Monday, `/system-audit-weekly` plots the last 30 days and flags regressions.

**Rule:** If any metric trends downward 3 weeks in a row, mandatory retrospective. No exceptions.

---

## The Karpathy Loop (per-skill self-improvement)

For any skill or hook with an `evals/evals.json`:

```
1. Run binary assertions          → score = pass / total
2. Compare to last week's score   → delta
3. If regression: open issue, halt promotion
4. If flat 3+ weeks: target for improvement (auto-research skill)
5. If improving: lock new score as baseline
6. Commit measurement to history.csv
```

Skills currently with evals: ~5/180. Skills targeted for evals by 2026-07-01: top 50 by usage frequency.

---

## The HELM Multi-Metric Discipline

**Banned:** "I optimized X" without showing what happened to Y, Z, W.

Every change report must include:
- **Targeted metric**: what got better
- **Side effects**: what happened to all 5 other axes
- **Net assessment**: did total system health improve?

If side-effect axes regressed: the change is a Pareto regression and must be justified or reverted.

---

## Anti-Patterns (banned per STANDARD)

- "Self-aware" / "compounds from here" without timestamps
- Claims of improvement without before/after numbers
- Hooks/skills/services without all 6 axes baselined
- Single-axis optimization without checking the other 5
- Regression detection longer than 24 hours

---

## What "Self-Improving" Actually Means

It means: every metric on this dashboard moves toward its target faster than entropy degrades it. Today's baselines are floor. Every week, we either:
1. Move at least one metric closer to its target (active improvement), OR
2. Stabilize a metric that was drifting (defensive maintenance)

A week with neither = wasted week = retrospective.
