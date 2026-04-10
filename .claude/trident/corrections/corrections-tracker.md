# Corrections Tracker

## Density by Category

| Category | Count | Last Seen |
|----------|-------|-----------|
| scope | 1 | 2026-04-10 |
| tone | 0 | — |
| format | 0 | — |
| structure | 0 | — |
| content | 0 | — |
| approach | 0 | — |
| speed | 0 | — |

## Corrections Log

### CORRECTION-001: scope — 2026-04-10
- **Context:** Pattern Library V1 brief
- **What happened:** Jack's brief included unbounded recursion language ("agents keep analyzing each others data... until all agents have gone over each others data")
- **Claude's response:** Intervened per CLAUDE.md triggers BEFORE launching agents. Collapsed to single cross-review pass, capped source list, forced V1 scope lock via AskUserQuestion.
- **Jack's response:** Accepted ("Locked. Recommended option.")
- **Classification:** This is NOT a Claude mistake — it's the CORRECT intervention per CLAUDE.md's scope-creep triggers. Logged here as a pattern indicator: Jack presents ambitious briefs that NEED scope interventions, and the intervention protocol is working as designed.
- **Action:** None — continue intervening on unbounded briefs. This is the CLAUDE.md-prescribed behavior.
