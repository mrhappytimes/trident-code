# Patterns Tracker

## Recurring Patterns

### PATTERN-001: parallel-research-pipeline (frequency: 2) [FACTORY-CANDIDATE]
- **Description:** Multi-agent research synthesis with cross-lens validation
- **Steps:**
  1. AskUserQuestion to lock scope (industries, depth, destination)
  2. Launch 3 parallel general-purpose agents with different lenses (Supply-side / Demand-side / Reality-check)
  3. Wait for all 3 to complete
  4. Launch 3 parallel cross-review agents with rotated lens assignments (A audits B, B audits C, C audits A)
  5. Launch 1 synthesis agent that reads all 6 files and produces canonical outputs
  6. Install to workspace folder + .claude/memory in parallel
  7. Build HTML dashboard
  8. Verification pass (file counts, section counts, structure)
- **Occurrences:** 2026-04-10 V1 (8 industries, trades/service/hospitality), 2026-04-10 V2 (7 industries, health/wellness)
- **Success rate:** 2/2 delivered acceptable output
- **Composite agent potential:** HIGH — this is a reusable meta-workflow for any research-heavy deliverable
- **Estimated time saved if skill exists:** 15-20 min of orchestration per run

### PATTERN-002: scope-intervention-then-execute (frequency: 2) [BEST-PRACTICE]
- **Description:** Response protocol when Jack presents underspecified but high-leverage brief
- **Steps:**
  1. Identify unbounded elements in the brief (recursion, "until done", "all options")
  2. Briefly push back on unbounded elements with explicit caps
  3. Run gold standard check: "Is this building toward $100K target?"
  4. If yes: lock V1 scope via 2-3 option AskUserQuestion
  5. Execute without further clarification cycles
- **Occurrences:** Both V1 and V2 brief this session
- **Should be documented in CLAUDE.md** as standard response protocol
