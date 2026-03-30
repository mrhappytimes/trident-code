# Mirror — Session Observation

**Agent:** Mirror (1 of 4) | **Trigger:** Manual (`/mirror`) or auto (end of `/build-complete`) | **Runtime:** <30 sec

---

## WHAT MIRROR DOES

Mirror observes your Claude Code session and captures 6 signal types, then scores session health 0-20. Every signal feeds Scout, Factory, and Auditor — they use your learning to improve continuously.

Mirror runs passively as you work (no interruption), then writes output when you explicitly trigger `/mirror` or when a `/build-complete` ends.

---

## THE 6 SIGNALS

### 1. CORRECTIONS
When you correct Claude's output (edit code, rewrite text, clarify intent):

**What to capture:**
- What Claude got wrong (too verbose, wrong language, missing context, wrong approach)
- How you fixed it
- Why the fix was better

**Example signal:**
```
Correction Type: Output Format
Description: Claude provided verbose explanation when I asked for code only
Fix: Re-prompted with "code-only, no explanation"
Impact: 40% faster feedback loop
```

**How Mirror captures it:** Watches for your edits, prompts you at session end if corrections detected

---

### 2. GAPS
When you ask Claude for something it can't do (missing tool, unknown domain, requires external service):

**What to capture:**
- What you asked for (capability, integration, knowledge)
- What Claude couldn't do
- What you need it for (context)

**Example signal:**
```
Gap Type: Tool Integration
Description: Need MCP connector for Slack, doesn't exist in registry
Context: Building cross-team notification system
Priority: High (blocking 2 other projects)
```

**How Mirror captures it:** You report gaps during `/mirror` trigger, or Mirror flags them from chat patterns

---

### 3. PATTERNS
Recurring workflows, decision styles, tool chains, process sequences:

**What to capture:**
- What you do repeatedly (code review process, deployment workflow, design review)
- When and why you do it (triggers, frequency, context)
- What tools you use (Claude, Cursor, Git, manual testing)

**Example signal:**
```
Pattern Type: Workflow
Description: API design review → Prompt Claude → Test with curl → Iterate
Frequency: 3x per week
Quality Rating: 18/20 (very reliable)
Time to Execute: 2 hours
```

**How Mirror captures it:** Aggregates from session signals over time, identifies recurring sequences

---

### 4. PREFERENCES
Output format, tone, process preferences, tool choices:

**What to capture:**
- How you like Claude to respond (format, detail level, structure)
- What tools you prefer
- What you always ask for (headers, examples, code snippets, explanations)

**Example signal:**
```
Preference Type: Output Format
Description: Always want Markdown with ### headers, code blocks with language, TL;DR at top
Confidence: 100% (you ask for this every time)
```

**How Mirror captures it:** Watches what you ask for repeatedly, learns your defaults

---

### 5. BUILD ACTIVITY
When you use `/build-start` and `/build-complete`:

**What to capture:**
- Client, project, industry, scope
- What worked (tools, approaches, patterns)
- What didn't work (blockers, rework needed, gaps discovered)
- Quality of output (1-5 scale)
- Confidence in approach (1-5 scale)
- Time spent
- Key decisions and tradeoffs

**Example signal:**
```
Build: Acme Corp API Integration
Worked: Supabase + Claude for schema design, 90% first-draft accuracy
Didn't Work: GenUI components, needed custom styling
Gap Discovered: No good MCP for Stripe verification
Quality: 4/5 (small rework needed)
Confidence: 5/5 (approach proven)
Time: 6 hours
Key Decision: SQLite for offline sync (vs Firebase)
```

**How Mirror captures it:** Automatic capture during `/build-start` and `/build-complete`

---

### 6. QUALITY MISSES
When Claude's response misses the mark:

**What to capture:**
- What you asked for (intent)
- What Claude provided (output)
- Why it missed (shallow, wrong domain, bad format, incomplete, hallucinated)
- What you needed instead

**Example signal:**
```
Quality Miss Type: Shallow Depth
Request: Explain RAG architecture for production systems
Claude Provided: 3-paragraph overview, basic concepts
Needed: 15+ minute deep dive, specific tradeoffs, implementation patterns
Impact: Required 3 iterations to get usable depth
```

**How Mirror captures it:** You report during `/mirror` trigger, or identified from patterns of rework

---

## SESSION HEALTH SCORE (0-20)

Mirror scores overall session health 0-20 based on signal distribution:

**18-20: Excellent**
- All outputs usable without rework
- Few or no corrections needed
- Clear patterns in how you work
- Gaps identified clearly

**15-17: Good**
- 1-2 minor corrections per session
- Good pattern match
- Occasional clarification needed

**12-14: Fair**
- 3-5 corrections per session
- Patterns emerging but Claude often misses intent
- Regular rework cycles

**9-11: Rough**
- 5-10+ corrections per session
- Significant rework needed
- Claude frequently off-target

**0-8: Poor**
- Session derailed, most outputs unusable
- Fundamental misalignment between intent and output
- May indicate wrong tool for the task

**Scoring logic:**
- Start: 15 (baseline)
- +1 per high-quality output, clean pattern match
- -1 per correction, rework cycle, gap
- -2 per quality miss requiring significant rework

---

## HOW MIRROR WORKS

1. **Passive observation** — As you work, Mirror watches patterns in:
   - Your prompts (what you ask for)
   - Corrections (what you fix)
   - Rework cycles (how many iterations until satisfied)
   - Tool usage (Claude → VS Code → Claude → deploy)
   - Pain points (where you get stuck)

2. **On trigger** (`/mirror`) — Mirror asks:
   ```
   Session Signals Capture

   This session, did you make ANY corrections to Claude's output?
   (Type 'yes' if you had to edit, rewrite, or re-prompt to get what you needed)

   Did Claude miss any capability gaps?
   (Type 'yes' if Claude couldn't do something you needed)

   Any quality misses or rework cycles?
   (Type 'yes' if outputs didn't meet expectations)

   What was the overall quality?
   (1-5 scale: 1=poor, 5=excellent)
   ```

3. **You respond** — Mirror collects your answers, calculates health score

4. **Mirror writes output** — All signals appended to `~/.claude/memory/mirror-log.md`

5. **Mirror aggregates** — All signals fed into three aggregate files:
   - `gaps-tracker.md` — Cumulative gaps by category and priority
   - `patterns-tracker.md` — Recurring workflows by frequency
   - `corrections-tracker.md` — Quality trends and root causes

---

## CROSS-USER INTELLIGENCE TAGGING

Every signal is tagged:
```
user_id: [Your name]
role: [Your role]
domain: [Primary domain — e.g., "AI Integration"]
session_date: [ISO timestamp]
```

This enables:
- Scout to find: "Has Brandon solved this gap before?"
- Factory to avoid: "James built this exact command in Feb"
- Auditor to flag: "3 team members hit this same gap"

**Privacy:** Raw session context is private. Only aggregated signals (e.g., "2 team members need Slack integration") shared across team.

---

## MIRROR OUTPUT FORMAT

Mirror appends to `~/.claude/memory/mirror-log.md`:

```markdown
## Session: 2026-03-30T14:45:00

**User:** Jack Panas | **Domain:** AI Integration | **Health Score:** 17/20

### Signals Captured

#### Correction (1)
- Type: Prompt Clarity
- What Claude Got Wrong: Provided 3 approaches when I only asked for the simplest
- Fix: Re-prompted with "just the simplest approach, no alternatives"
- Impact: Reduced output by 70%, easier to follow

#### Gaps (2)
- Gap 1: No MCP for Supabase Vector queries (critical)
- Gap 2: RAG chunking strategy needs domain-specific tuning (moderate)

#### Patterns (3)
- Pattern 1: API Design → Code → Test → Deploy (weekly, high success rate)
- Pattern 2: Knowledge capture via /build-complete → patterns-draft (3x per month)

#### Preferences (1)
- Always want TL;DR at top, detailed breakdown below
- Markdown with ### headers preferred
- Code blocks with language specified

#### Build Activity (1)
- Client: Acme Corp
- What Worked: Supabase + Claude for schema design
- What Didn't: GenUI, needed custom styling
- Gap Discovered: No MCP for Stripe verification
- Quality: 4/5
- Confidence: 5/5
- Time: 6 hours
- Key Decision: SQLite for offline sync

#### Quality Misses (1)
- Request: Explain RAG production patterns
- Claude Provided: 3-paragraph overview
- Needed: Deep dive, 15+ min read
- Impact: 3 iterations to get usable depth

### Recommendations
- Scout should search for: Stripe verification MCP, RAG chunking strategies, GenUI alternatives
- Factory should build: Custom RAG evaluation command for your specific domain
- Auditor should check: Why quality misses happened (maybe domain knowledge gap?)

### Next Session Actions
1. Review scout-candidates.md for Stripe MCP solutions
2. If none found, Factory will stage custom command
3. Try RAG chunking strategies in next build
```

---

## AGGREGATION: GAPS-TRACKER

Mirror aggregates all gap signals into `gaps-tracker.md`:

```markdown
# Gaps Tracker — Aggregated by Priority

## Critical (Solve ASAP)
- Stripe Verification MCP: First seen Mar 28, last seen Mar 30, frequency: 2x, solved_by: [if team knows]
- RAG Production Patterns: First seen Mar 25, last seen Mar 30, frequency: 5x, critical for builds

## High (This Month)
- GenUI Styling Framework: Frequency: 2x, blocking 1 project
- Supabase Vector Optimization: Frequency: 1x, moderate impact

## Medium (Later)
- Email Notification System: Frequency: 1x, low priority
```

Scout uses this to decide what to research. Highest-frequency, newest gaps get priority.

---

## AGGREGATION: PATTERNS-TRACKER

Mirror aggregates recurring patterns into `patterns-tracker.md`:

```markdown
# Patterns Tracker — By Frequency

## Workflow: API Design → Code → Test → Deploy
- Frequency: 3x/week
- Success Rate: 95%
- Quality Rating: 18/20
- Time to Execute: 2 hours
- Tools Used: Claude Code, curl, Git

## Knowledge Capture: Build → /build-complete → patterns-draft
- Frequency: 3x/month
- Success Rate: 100%
- Reusability: High
- Promoted Patterns: [Reference to factory-built commands]
```

Factory uses this to build reusable commands and workflows. High-frequency patterns become commands.

---

## AGGREGATION: CORRECTIONS-TRACKER

Mirror aggregates quality trends into `corrections-tracker.md`:

```markdown
# Corrections Tracker — Quality Trends

## Correction Types (This Month)
- Prompt Clarity: 8x (Claude too verbose, needs tighter scope)
- Format Issues: 5x (Wrong output structure, missing code blocks)
- Domain Depth: 3x (Too surface-level, needs production knowledge)
- Wrong Approach: 2x (Claude chose suboptimal architecture)

## Root Causes
- Prompt clarity: I'm not being explicit about scope
- Domain depth: Claude needs more context about production constraints
- Format: Need to establish format preference earlier

## Trend
- Corrections trending down (15 last week, 10 this week)
- Quality misses clustering around RAG topics
- Best session health when using `/build-start` (enables deeper context)
```

Auditor uses this to flag if quality is degrading or if specific domains need help.

---

## INTEGRATION WITH OTHER AGENTS

**Scout reads:**
- `gaps-tracker.md` — What to search for
- `corrections-tracker.md` — What went wrong (context for search)

**Factory reads:**
- `patterns-tracker.md` — What workflows to automate
- `gaps-tracker.md` — What gaps to solve with new commands
- `corrections-tracker.md` — Quality issues to address

**Auditor reads:**
- `mirror-log.md` — Overall session health trend
- `corrections-tracker.md` — Quality degradation alerts
- `patterns-tracker.md` — Coverage of critical workflows

---

## WHEN TO RUN MIRROR

**Automatic triggers:**
- End of every `/build-complete` (captures build signals)
- End of every `/audit --full` (captures health assessment)

**Manual trigger:**
- `/mirror` at the end of any regular session
- `/mirror --quick` for rapid capture (skip detailed prompts)
- `/mirror --detailed` for comprehensive capture (more prompts)

**Recommendation:** Run `/mirror` at the end of your session so you don't lose learning. Takes <30 seconds.

---

## CONFIGURATION

Edit `~/.claude/config/trident-config.md` to customize Mirror behavior:

```
mirror_observation_level: "active" # "passive only", "active (detailed)", "minimal"
mirror_capture_frequency: "every-session" # "every-session", "daily", "manual"
mirror_auto_trigger: true # true = auto-trigger on /build-complete, false = manual only
mirror_aggregation_frequency: "daily" # How often to recalc gaps/patterns/corrections
```

---

## TROUBLESHOOTING

**Mirror not capturing signals:**
- Make sure you run `/mirror` at end of session
- Check that `~/.claude/memory/mirror-log.md` exists
- Check `user_identity.md` is filled in (name, role required)

**Session health score seems wrong:**
- Check mirror-log.md to see what signals were captured
- Run `/audit` to get full breakdown of scoring logic
- If score is consistently low, check corrections-tracker.md for patterns

**Gaps not aggregating:**
- Wait 1-2 minutes for aggregation to run
- Check `gaps-tracker.md` exists
- Run `/audit` to force immediate aggregation

**Can't find a past signal:**
- Mirror-log.md keeps 500 latest entries
- Older signals archived to Supabase (if enabled)
- Check `~/.claude/memory/mirror-log.md | grep "[search term]"`

---

## ADVANCED: CUSTOM SIGNAL TYPES

If you want to track custom signals (e.g., "Architecture decisions", "Customer feedback", "Performance metrics"):

1. Add to your `user_identity.md`:
   ```
   custom_signals:
     - type: "Architecture Decision"
       description: "Major design choices and tradeoffs"
   ```

2. Mention custom signals when running `/mirror`
3. Mirror will capture and tag them automatically
4. Scout and Factory can use them for intelligent recommendations

---

## NEXT STEPS

1. Run `/mirror` at the end of your next session
2. Check `~/.claude/memory/mirror-log.md` to see captured signals
3. Run `/audit` to verify health score
4. Check `gaps-tracker.md` to see what Scout will search for
5. Look at `factory-staging/` in a few hours to see what Factory builds

---

**Mirror watches so you can learn. Use it to compound your Claude mastery.**
