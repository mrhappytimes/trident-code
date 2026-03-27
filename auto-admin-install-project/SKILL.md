---
name: auto-admin-install-project
description: "Trigger ONLY with /auto-admin-install-project. Automated deployment pipeline that takes the current conversation's project (scripts, configs, specs) through a quality gate, then generates and auto-executes a deploy package. Runs brainstorming review, risk assessment, grill-me questions, architecture upgrade, produces an HTML tracking dashboard, and executes all ready phases hands-free after a single user review."
---

# Auto Admin Install Project

## Purpose

Take the project built in the current conversation and deploy it -- fully. Review it, stress-test it, upgrade it, generate a deploy script, show it once for approval, then execute everything that can run now. If phases require time gaps (data collection, prerequisites), set up monitoring that alerts when the next phase is ready.

This is not a packager. It is an executor. The output is a deployed system, not a pile of scripts the user has to run manually.

## Trigger

**Only:** `/auto-admin-install-project`

No other trigger phrases. No auto-detection. User invokes this explicitly when a project is ready to ship.

## Input

The skill operates on **current conversation context** -- whatever project documents, scripts, configs, and specs were built or discussed in this session. It does NOT scan the filesystem or workspace folder for input. If the conversation lacks sufficient context, ask the user to provide or reference the missing pieces before proceeding.

## Pipeline

```
CONVERSATION CONTEXT (scripts, configs, guides, specs built this session)
  |
  v
STEP 1 -- INVENTORY + SUMMARY
  Catalog everything built. Summarize scope, dependencies, risks.
  Output: Project Summary Card
  |
  v
STEP 2 -- BRAINSTORMING REVIEW (inline pattern)
  Identify gaps, missing error handling, platform assumptions.
  Propose 2-3 improvements per component (high value, low effort).
  Output: Improvement Register
  |
  v
STEP 3 -- RISK ASSESSMENT (inline pattern)
  What fails during install? After install? Data loss? Security?
  Classify: Critical / High / Medium / Low
  Output: Risk Matrix
  |
  v
STEP 4 -- GRILL THE USER (inline pattern)
  3-7 high-value, decision-forcing questions.
  GATE: User must answer before proceeding.
  |
  v
STEP 5 -- ARCHITECTURE UPGRADE (inline pattern)
  Apply improvements + risk mitigations + user answers.
  Produce final upgraded versions of all project files.
  Output: Upgraded files + change log
  |
  v
STEP 6 -- GENERATE DEPLOY PACKAGE
  A) HTML Tracking Dashboard (saved to workspace)
  B) Deploy script(s) -- PowerShell for OS operations,
     Claude Code prompt for AI-judgment operations,
     or hybrid as needed. Pick whatever executes the job.
  |
  v
STEP 7 -- SINGLE REVIEW GATE
  Present to user: dashboard link, deploy script summary,
  what it will do, estimated time, highest risks.
  User approves ONCE. No further prompts.
  |
  v
STEP 8 -- AUTO-EXECUTE
  Run all phases that can execute now.
  If multi-phase: execute Phase 1, set up monitoring for Phase 2+.
  Report results.
```

## Execution Protocol

### Step 1 -- Inventory

Build an inventory from conversation context:

```
For each component:
  - Name
  - Type (script / config / guide / spec / template)
  - Platform (Windows / macOS / Linux / cross-platform)
  - Dependencies (tools, packages, services required)
  - Risk level (safe / review / critical)
```

Present as a summary card. Confirm scope before proceeding.

### Step 2 -- Brainstorming Review

Inline the brainstorming pattern (do NOT invoke the skill):

1. Review each component thoroughly
2. Identify: scope gaps, missing error handling, platform assumptions, dependency risks
3. Propose 2-3 improvements per component (highest value, lowest effort)
4. Rank improvements by impact

Output: Improvement register -- Item | Component | Impact | Effort | Recommended

### Step 3 -- Risk Assessment

Inline the risk-assessment pattern:

1. For each component and the project as a whole:
   - What could fail during install?
   - What could fail after install (runtime)?
   - What data could be lost?
   - What security exposures exist?
2. Classify: Critical / High / Medium / Low
3. For each risk: mitigation action + owner + status

Output: Risk matrix appended to the improvement register.

### Step 4 -- Grill the User

Present 3-7 questions. These MUST be:
- **High-value**: Each answer materially changes the output
- **Decision-forcing**: "X or Y?" not "Do you want X?"
- **Risk-surfacing**: Focus on items where human judgment beats AI inference

Use AskUserQuestion tool for structured input. Format:

```
QUESTION [N/total]: [Question text]
CONTEXT: [Why this matters -- 1 sentence]
OPTIONS:
  A) [Option with tradeoff]
  B) [Option with tradeoff]
  C) [Skip -- accept default: (state default)]
```

GATE: Do NOT proceed until all questions are answered. This is the last human input before execution.

### Step 5 -- Architecture Upgrade

Apply all improvements from Steps 2-4:

1. Rewrite components with risk mitigations baked in
2. Add error handling where flagged
3. Add platform guards where flagged (Windows = PowerShell, Safe-Create pattern)
4. Add verification steps where flagged
5. Merge user's grill-me answers into final version

Track: Original version | Changes made | Reason for change

### Step 6 -- Generate Deploy Package

Produce two outputs:

**A) HTML Tracking Dashboard** (see Dashboard Spec below)

**B) Deploy Script(s)** -- choose the right tool for the job:
  - **PowerShell (.ps1)**: For file operations, registry changes, scheduled tasks, Windows config -- anything deterministic that doesn't need AI judgment
  - **Claude Code prompt**: For operations requiring AI interpretation, adaptive error handling, or multi-step reasoning
  - **Hybrid**: PowerShell script + Claude Code prompt when the project needs both

Decision rule: If every step can be expressed as a deterministic command, use PowerShell. If any step requires judgment, interpretation, or adaptive behavior, use Claude Code or hybrid.

All scripts MUST:
- Use Safe-Create pattern (Test-Path guard, never overwrite silently)
- Target Windows / PowerShell
- Include error handling with clear failure messages
- Include verification checks after each major operation
- Use ASCII characters only (no em dashes, no Unicode that could corrupt in transfer)

Save to workspace folder with date prefix.

### Step 7 -- Single Review Gate

Present to the user:
1. Link to HTML dashboard
2. Complete deploy script (visible, copyable)
3. Summary: what it will do, how many operations, estimated time
4. Highest-risk items from the risk assessment
5. Clear statement: "After approval, this executes hands-free."

**Wait for explicit approval.** This is the ONE human gate. Do not proceed without it.

### Step 8 -- Auto-Execute

After approval:

**Single-phase projects:**
- Execute the deploy script
- Run all verification checks
- Report results (pass/fail per check)
- Save results to the HTML dashboard context

**Multi-phase projects:**
- Execute all phases whose prerequisites are currently met (typically Phase 1)
- For phases blocked by time or data prerequisites:
  - Create a monitoring mechanism (scheduled task or check script) that:
    - Runs on a defined interval (e.g., daily, weekly)
    - Checks gate criteria (e.g., "audit.jsonl has 500+ events")
    - Alerts the user when prerequisites are met (notification, log entry, or dashboard update)
  - Update the HTML dashboard to show phase status and what's being monitored
- Report: what executed, what's waiting, what triggers the next phase

## Dashboard Spec

The HTML dashboard is the user's command center. It lives in the browser -- persistent, always visible, not affected by terminal scrolling.

### Design System

Use the Trident scorecard design system (from dashboard-template.html in assets/):
```
--bg: #080a10    --surface: #11131d    --surface2: #181b27
--border: #232638    --accent: #6c5ce7
--green: #00b894    --blue: #74b9ff    --yellow: #fdcb6e    --red: #e17055
Font: Inter + JetBrains Mono
```

### Required Sections

**1. Bookmark Banner (MUST be first, impossible to miss)**
Full-width, bright accent background, large text:
"BOOKMARK THIS PAGE -- Keep it open until all phases are complete."
Include: "Ctrl+D (Windows) / Cmd+D (Mac)"

**2. Project Summary Card**
- Project name, created date, owner
- Component count, scripts, configs
- Estimated install time
- Overall risk level (color-coded badge)
- Execution mode: Single-phase or Multi-phase

**3. Upgrade Summary**
What changed from the original:
- Improvements applied (count + list)
- Risks mitigated (count + list)
- User decisions incorporated (from grill-me)
- Score impact estimate (0-100 scale, estimate improvement to relevant scorecard categories)

**4. Phase Tracker (multi-phase projects)**
Each phase card shows:
- Phase number + name
- Status: NOT STARTED / IN PROGRESS / COMPLETE / MONITORING
- Prerequisites (what must be true before this phase starts)
- Duration estimate
- Deliverables (what this phase produces)
- Checklist of tasks (clickable checkboxes)
- Monitoring status (if waiting for prerequisites)

Phase cards are collapsible. Current/active phase expanded by default.
Prerequisites shown as red/green indicators. Auto-unlock when all green.

**5. Execution Log**
Real-time (or post-execution) log of what ran:
- Timestamp | Operation | Result (pass/fail)
- Error details if any step failed
- Verification check results

**6. Benefits & Risks**
Two-column layout:
- Left: Benefits (green cards) -- what this system does for you
- Right: Risks (red cards) -- what to watch for, with mitigations

**7. File Manifest**
Table of all files in the deploy package:
- Filename | Type | Location | What it does
- Copy buttons for install paths

**8. Verification Checklist**
Post-install verification commands with expected output.
Checkboxes that persist via page state.

### Interactivity

- Clickable checkboxes (state in JS variables, NOT localStorage)
- Collapsible sections
- Copy buttons on all code blocks
- Progress bar updates as checkboxes are checked
- Phase prerequisites auto-check based on checkbox state
- Sticky nav for jumping between sections
- Color-coded status badges

### Phase Logic

Some projects need time between phases:
- Security audit: 60-90 days data collection before policy generation
- AI training: baseline metrics before optimization
- Team rollout: individual configs before team-wide deployment

When multi-phase is detected:

1. Break into phases with measurable gate criteria
2. Each phase has prerequisites that must be TRUE before proceeding
3. Dashboard shows all phases but only current phase is actionable
4. Future phases show locked prerequisite checklists
5. Include estimated duration per phase
6. Monitoring section shows what's being watched and current status

Phase monitoring approach:
```
Phase 1: Foundation (execute immediately)
  Prerequisites: None
  Tasks: Install scripts, configure settings, run initial test
  Gate: All verification checks pass
  Monitoring: None -- executes now

Phase 2: Data Collection (auto-monitored)
  Prerequisites: Phase 1 complete, hook running
  Tasks: Passive collection, periodic spot-checks
  Gate: audit.jsonl has 500+ events, 30+ days of data
  Monitoring: Scheduled task checks gate criteria weekly, alerts when met

Phase 3: Policy Generation (triggered when Phase 2 gate met)
  Prerequisites: Phase 2 gate criteria met
  Tasks: Run synthesis, review policy draft, lock final config
  Gate: policy-draft.json reviewed and approved
  Monitoring: Alert sent when Phase 2 monitoring passes
```

## Output Format

Always produce:
1. **HTML Dashboard** -- saved as `YYYY-MM-DD_[project-name]-dashboard.html`
2. **Deploy Script(s)** -- saved with date prefix
3. **Execution Report** -- what ran, what passed, what's monitoring

After execution, present:
- Link to HTML dashboard
- 3-line summary: what deployed, what's monitoring, highest-impact upgrade
- Any manual steps still needed (if any)

## Quality Gates

Before presenting for review (Step 7), verify:
- [ ] All conversation project components accounted for in manifest
- [ ] All risk mitigations from Step 3 applied or explicitly deferred with reason
- [ ] All user answers from Step 4 incorporated
- [ ] HTML dashboard renders correctly (no syntax errors)
- [ ] Deploy script uses Safe-Create pattern (no silent overwrites)
- [ ] Platform-correct: Windows paths and PowerShell
- [ ] ASCII only in all scripts (no em dashes or Unicode that corrupts on transfer)
- [ ] Bookmark banner is the first visible element
- [ ] Phase prerequisites are measurable (not vague)
- [ ] Monitoring mechanism defined for any time-gated phases
- [ ] Error handling present for every script operation

## Integration

This skill inlines patterns from (does NOT invoke directly):
- **brainstorming** -- component review and improvement identification
- **risk-assessment** -- risk register and mitigation planning
- **grill-me** -- high-value user questions before deployment
- **improve-codebase-architecture** -- architecture upgrades
- **scorecard-full-system** -- scoring for measuring upgrade impact
- **verification-loop** -- post-install verification checklist

## Safety Rules

1. **Single review gate.** User sees everything before execution. One approval, then hands-free.
2. **Safe-Create always.** Never overwrite existing files. Test-Path guard on every write.
3. **ASCII only in scripts.** Em dashes, smart quotes, and other Unicode corrupt during Cowork-to-Windows transfer.
4. **Deny list respected.** Never generate commands that match the user's deny rules in settings.json.
5. **Rollback plan.** Every deploy script must document how to undo what it did.
6. **No secrets in output.** API keys, tokens, passwords never appear in scripts or dashboards.
