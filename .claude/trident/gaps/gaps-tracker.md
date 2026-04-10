# Gaps Tracker

## Active Gaps

### GAP-001: build-validation-capture (frequency: 1) [FACTORY-CANDIDATE]
- **Domain:** Client build feedback loop
- **Need:** Structured capture of results from real client builds (what worked, what needed manual override, accuracy vs governance target) that feeds deltas back into BUILD-GOVERNANCE.md and INDUSTRY-PATTERNS.md
- **First seen:** 2026-04-10 (Pattern Library V1 dashboard V2 open decisions)
- **Confidence fix helps:** HIGH
- **Related to:** pom-lead-research-report skill (adjacent but different purpose)

### GAP-002: pattern-library-refresh (frequency: 1)
- **Domain:** Governance file maintenance
- **Need:** Delta update skill that takes N new industries and merges them into existing pattern library without manual bash cat + edit work
- **First seen:** 2026-04-10 (V2 wellness expansion session)
- **Confidence fix helps:** MEDIUM
- **Workaround used:** manual bash concat + Edit tool for HTML dashboard updates

### GAP-003: github-sync-automation (frequency: 1)
- **Domain:** Repo sync
- **Need:** Wrapper around `push-to-github.ps1` that handles the trident-code repo push without Jack needing to open terminal
- **First seen:** 2026-04-10 (mentioned in CLAUDE.md, no skill exists)
- **Confidence fix helps:** MEDIUM
- **Note:** Jack left "push to trident-code" as open decision BOTH times this session — friction is real
