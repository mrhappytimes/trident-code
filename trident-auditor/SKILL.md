---
name: trident-auditor
description: Cross-agent quality gate and monthly synthesis engine. Dual-mode: passive (every session, silent <10 seconds — reads latest Mirror/Scout data, updates system health) and active (monthly or manual — full analysis, scoring, HTML presentation, recommendations). Triggers passively on every session start. Active triggers: /monthly-report, /auditor-report, /auditor-status, "trident report", "how is trident performing", first session of any month. Part of the Trident self-improving agent system.
---

# trident-auditor — Cross-Agent Quality Gate

## Purpose
Ensure the Mirror and Scout are aligned, effective, and improving. Score all three agents monthly. Produce recommendations that drive next month's priorities. Generate an interactive HTML presentation for Jack's review.

---

## Passive Mode (every session, silent)

Runs at session start. Zero output. Under 10 seconds.

1. Read latest entries from `mirror/patterns.md`
2. Read latest entries from `scout/changelog.md`
3. Update `auditor/system-health.md` with current state
4. Check for any CRITICAL alerts (if found, surface ONE line at session start)
5. **No other output**

---

## Active Mode (monthly or manual)

**Trigger phrases:** `/monthly-report`, `/auditor-report`, `/auditor-status`, "trident report", "how is trident performing", first session of any month

### Step 1 — Data Collection (3 min)
- Read all Mirror session logs from past 30 days (`.claude/trident/mirror/session-log-*.md`)
- Read all Scout nightly logs from past 30 days (`.claude/trident/scout/nightly-log-*.md`)
- Read Factory registry and metrics (`.claude/trident/factory/agent-registry.md`, `factory-metrics.md`)
- Read previous month's report for comparison baseline
- Read `.claude/memory/pending/pending-updates.json` for unconfirmed updates

### Step 2 — Analysis (5 min)

**Mirror Analysis**
- Total sessions observed
- Correction trend (increasing / decreasing / stable)
- Top 3 correction categories
- Skill gap closure rate (gaps identified vs. gaps filled by Scout)
- Workflow evolution (new patterns, deprecated patterns)
- Reflection buffer quality (are self-critiques improving?)

**Scout Analysis**
- Total nightly runs completed
- Skills discovered / tested / installed / rejected
- Source effectiveness (which sources produce best skills)
- Quality trend of installed skills over time
- Security blocks (any threats caught?)

**Factory Analysis**
- Agents built / staged / deployed / rejected
- Agent quality trend (scores improving?)
- Pattern library growth (how many confirmed patterns?)
- Most effective composition patterns
- Least effective composition patterns

**Cross-Agent Analysis**
- Mirror-Scout alignment: is Scout finding what Mirror needs?
- Gap closure velocity: how fast are identified gaps getting filled?
- Agent utility: are deployed agents actually being used?
- System overhead: is Trident consuming too much context or time?

### Step 3 — Scoring (2 min)

Score each dimension 1-10. Be honest — fabricated scores break the improvement loop.

```
Mirror Score: X/10
- Observation quality: X/10
- Pattern detection: X/10
- Gap identification: X/10
- Non-interference: X/10

Scout Score: X/10
- Source coverage: X/10
- Candidate quality: X/10
- Install success rate: X/10
- Gap targeting: X/10

Factory Score: X/10
- Composition creativity: X/10
- Test rigor: X/10
- Build quality trend: X/10
- Learning capture: X/10

System Overall: X/10
- Cross-agent alignment: X/10
- Gap closure velocity: X/10
- Self-improvement rate: X/10
- Overhead cost: X/10 (lower overhead = higher score)
```

### Step 4 — Constitutional Review (2 min)

Check all proposed changes against Trident's Constitution (`.claude/trident/CONSTITUTION.md`):
- Does the proposed skill or agent modification align with all 10 principles?
- Flag any constitutional violations before presenting to Jack
- No change proceeds to deployment without constitutional clearance

### Step 5 — Recommendations (2 min)

Write `auditor/recommendations.md` — Scout reads this nightly:

```markdown
## CRITICAL (address this week)
1. [specific action for specific agent]

## HIGH (address this month)
1. [specific action]

## MEDIUM (consider next month)
1. [specific action]

## AGENT FACTORY FEEDBACK
- Agent [name] scored [X/10] — specific improvement: [detail]
- Pattern [ID] confirmed/invalidated by usage data
- Next agent should prioritize [domain] based on gap data

## SCOUT TARGETING
- Focus searches on: [specific gaps]
- Deprioritize: [sources that aren't yielding quality]
```

### Step 6 — Save Reference Data (1 min)

Update `auditor/report-data.json` with the current run's scores. This file is the persistent score history that the HTML report reads on load. Structure:

```json
{
  "version": "1.0",
  "lastUpdated": "YYYY-MM-DD",
  "history": [
    {
      "date": "YYYY-MM-DD",
      "label": "Month X — Description",
      "overall": 6.1,
      "mirror": 6.5, "scout": 6.8, "factory": 5.0, "system": 5.3,
      "notes": "One-line summary of what changed",
      "subScores": { ... }
    }
  ],
  "currentScores": { ... },
  "keyMetrics": { ... }
}
```

Append the new entry to the `history` array. Never overwrite previous entries — this is the audit trail.

### Step 7 — Monthly Presentation (5 min)

Generate an interactive HTML report with **8 tabs** saved to `auditor/monthly-report-YYYY-MM.html`:

**Tab 1: Executive Dashboard**
- System health score (canvas circle, color-coded)
- 6-stat grid: sessions, skills, agents, scout runs, gaps closed, constitution violations
- Agent score cards with sub-dimensions and trend arrows
- Full sub-dimension bar charts for all 4 agents
- Month timeline table
- Wins / Concerns split cards
- Health history timeline (all checkpoints)
- Constitutional compliance grid (all 10 principles)
- Cross-agent alignment cards

**Tab 2: New Agents**
- Each agent built this month with full detail tables
- Composition, dependencies, I/O specs, origin chain
- Constitutional review status + test status

**Tab 3: Skill Changes**
- Inventory change table (installed, deployed, rejected, staged)
- Before/after inventory comparison
- Source effectiveness ranking table
- Gap closure status cards

**Tab 4: Scout Activity**
- 6-stat grid: runs, candidates, installed, rejected, repos searched, new repos
- Candidates evaluated table with scores, status, reasons
- Run-by-run breakdown cards
- Source registry table with status
- Pending work tracker

**Tab 5: Mirror Insights**
- Jack's workflow patterns (top 3)
- All emerging patterns table with occurrence counts
- Correction trends table with categories
- Session log summary table
- Open skill gaps
- Mirror health warning (if applicable)

**Tab 6: Recommendations**
- Prioritized: Critical / High / Medium sections
- Scout targeting table for next month
- Factory feedback table

**Tab 7: Factory Learning Curve**
- Build quality table
- Active learnings (rules) cards
- Emerging patterns table
- Quality trajectory with projections
- Phase gate status

**Tab 8: History**
- Overall health trend chart (canvas line chart with area fill)
- Agent score trends chart (4-line canvas chart)
- Auto-logged entries from localStorage (seeded from report-data.json)
- Each entry shows: date, label, overall score, delta vs previous, per-agent scores with arrows, notes
- Clear All button
- Entry count badge on tab

**History auto-save behavior:**
- On page load, read localStorage key `trident-auditor-history`
- If empty, seed from embedded SEED_HISTORY array (copied from report-data.json)
- Add current report's entry if not already present (dedup by label)
- Render entries newest-first with delta calculations

**Design system:**
- Dark theme: `--bg:#080a10`, `--surface:#11131d`, `--accent:#6c5ce7`
- Fonts: Inter (text) + JetBrains Mono (numbers/code)
- Canvas-drawn score circles (reusable `drawCircle` function)
- Color coding: green (7+), blue (5-6.9), yellow (3-4.9), red (0-2.9)

---

## Mode Output Constraints

### Quick Status Mode (`/auditor-status`, "how is trident performing")
- Output MUST be under 500 words total
- Show ONLY the summary table: agent name, overall score (X/10), trend arrow (▲▼→)
- Show any SLA violations or CRITICAL alerts below the table
- Do NOT generate an HTML report
- Do NOT show sub-dimension scoring tables
- Do NOT run Steps 4-7 (constitutional review, recommendations, reference data, HTML)
- Read data from `auditor/system-health.md` and latest Mirror/Scout files, then summarize

### Full Report Mode (`/auditor-report`, `/monthly-report`, "trident report")
- Run all 7 steps including HTML generation
- Show full sub-dimension scoring for all 4 agents
- Generate `auditor/monthly-report-YYYY-MM.html`
- Update all output files

### Passive Mode (session start)
- ZERO visible output unless a CRITICAL alert exists
- Do NOT show scoring tables
- Do NOT generate an HTML report
- Do NOT run analysis steps — only read latest data and update `auditor/system-health.md`
- If a CRITICAL alert exists, surface exactly ONE line

## Manual Commands
- `/auditor-report` → full report mode (all 7 steps)
- `/monthly-report` → same as above
- `/auditor-status` → quick status mode (summary table only)
- "trident report" → same as /auditor-report
- "how is trident performing" → same as /auditor-status

## Output Files
- `auditor/monthly-report-YYYY-MM.html` — Interactive 8-tab HTML report (always overwrite current month)
- `auditor/report-data.json` — Persistent score history (append new entries, never overwrite old ones)
- `auditor/recommendations.md` — Scout reads this nightly
- `auditor/agent-scores.md` — Factory reads this
- `auditor/system-health.md` — Updated every run
- `auditor/cross-agent-insights.md` — Cross-agent alignment status

## Integration
- **Reads:** all Mirror logs, all Scout logs, all Factory data, `auditor/report-data.json` (score history)
- **Writes to:** all files listed in Output Files above
- **Triggers:** instructions-maintainer when learnings hit promotion threshold
- **References:** BRAIN.md for business alignment checking, CONSTITUTION.md for compliance review
