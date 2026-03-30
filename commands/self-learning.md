# Self-Learning — Signal Classification & Knowledge Promotion

**Trigger:** Manual (`/self-learning`) | **Runtime:** 5-10 min | **Effect:** Promotes learning, feeds all agents

---

## WHAT SELF-LEARNING DOES

Self-Learning reviews all captured signals (from Mirror, Scout, Factory, Auditor, Builds), classifies them, deduplicates, manages size, and promotes valuable signals to team knowledge. It's the quality gate between raw signals and reusable patterns.

---

## THE 6 SIGNAL TYPES (REVIEWED)

1. **Corrections** — What you fixed (output format, approach, clarity)
2. **Gaps** — What Claude couldn't do (tool, domain, integration)
3. **Patterns** — Recurring workflows (decision style, tool chains)
4. **Preferences** — How you like output (format, tone, detail)
5. **Build Activity** — Client work (what worked, what didn't)
6. **Quality Misses** — When Claude missed the mark (shallow, wrong approach)

Self-Learning takes all raw signals and asks: "Is this valuable? Is it a duplicate? Should we promote it to team knowledge?"

---

## CLASSIFICATION

Each signal is classified into 4 categories:

**BEHAVIORAL**
- Your working style, decision patterns, process preferences
- Example: "Always wants TL;DR at top, detailed breakdown below"
- **Action:** Feed to Mirror (improves prompt calibration for future)

**TECHNICAL**
- Domain knowledge, tool expertise, architecture understanding
- Example: "RAG production patterns are more nuanced than text summarization"
- **Action:** Feed to Scout (helps prioritize search depth for domain)

**PROCESS**
- Workflows, tools chains, communication patterns
- Example: "API Design → Code → Test → Deploy cycle works 95% success rate"
- **Action:** Feed to Factory (becomes automation candidate)

**ANTI-PATTERN**
- What doesn't work, gotchas, pitfalls to avoid
- Example: "GenUI components need 40% custom CSS override"
- **Action:** Flag to Scout (avoid recommending GenUI for form work)

---

## PROMOTION PIPELINE

Signals flow through 3 tracks:

### FAST TRACK (Immediate Promotion)
**Criteria:**
- Appears in 3+ sessions
- High confidence (you've validated it)
- Directly solves a gap

**Example:**
- Correction: "Always need code-only output, no explanation"
- Appears in: 5 sessions
- Action: Promote to Mirror preference (Claude learns this immediately)

**Timeline:** Same day

### STANDARD TRACK (Manual Review)
**Criteria:**
- Appears in 1-2 sessions
- Medium confidence
- Could be useful to team

**Example:**
- Build Pattern: "SaaS OAuth API workflow"
- Confidence: 4/5
- Action: Review during `/self-learning`, approve for promotion

**Timeline:** Weekly review

### PRUNE TRACK (Discard)
**Criteria:**
- One-off signal (doesn't repeat)
- Low confidence
- Marginal value

**Example:**
- Gap: "Need tool for X" (mentioned once 6 months ago, never again)
- Decision: Discard (if it becomes important, Mirror will capture again)

**Timeline:** Monthly cleanup

---

## HOW SELF-LEARNING WORKS

1. **Read raw signals** — From mirror-log.md, gaps-tracker.md, patterns-tracker.md, audit-report.md, patterns-draft/

2. **Classify each signal** — Behavioral, Technical, Process, or Anti-pattern

3. **Check for duplicates** — Has this signal appeared before? How many times?

4. **Score confidence** — How confident are you in this signal? (1-5 scale)

5. **Decide promotion** — Fast track (promote now) / Standard (queue for review) / Prune (discard)

6. **Feed agents** — Promoted signals feed:
   - **Mirror:** Update preference learning
   - **Scout:** Update domain and pattern knowledge
   - **Factory:** Convert processes to automation
   - **Auditor:** Mark anti-patterns as risk flags

7. **Manage size** — Keep 50-100 entries total (prune oldest or lowest-confidence)

---

## EXAMPLE SELF-LEARNING SESSION

**Raw signals to review:**

1. **Correction:** "Claude output too verbose, need tighter scope"
   - Classification: Behavioral
   - Frequency: 5x this month
   - Confidence: 5/5
   - Decision: Fast track (promote to Mirror immediately)

2. **Gap:** "No MCP for Stripe verification"
   - Classification: Technical
   - Frequency: 2x (Mar 28, Mar 30)
   - Confidence: 4/5
   - Decision: Standard track (Scout will build solution, monitor)

3. **Pattern:** "API Design → Code → Test → Deploy"
   - Classification: Process
   - Frequency: 3x/week
   - Confidence: 5/5
   - Decision: Fast track (convert to automation command)

4. **Preference:** "Want headers with ###"
   - Classification: Behavioral
   - Frequency: 10x (consistent across all sessions)
   - Confidence: 5/5
   - Decision: Fast track (Mirror learns this perfectly)

5. **Build Activity:** "GenUI needs 40% custom CSS"
   - Classification: Anti-pattern
   - Frequency: 2x (Acme build, previous project)
   - Confidence: 4/5
   - Decision: Standard track (flag to Scout: avoid GenUI for forms)

6. **Quality Miss:** "Explained RAG basics when I needed production patterns"
   - Classification: Technical
   - Frequency: 1x (one session)
   - Confidence: 3/5
   - Decision: Prune (if it repeats, will promote; not actionable yet)

---

## OUTPUT: SELF-LEARNING REPORT

All decisions logged to `~/.claude/memory/self-learning-report.md`:

```markdown
# Self-Learning Review — 2026-03-30

## Summary
- Signals reviewed: 12
- Classified: 12
- Duplicates found: 3
- Fast tracked: 4
- Standard tracked: 3
- Pruned: 2
- Size management: 72/100 entries (healthy)

## Fast Track Promotions (Immediate Effect)

### Behavioral: Verbosity Preference
- Signal: "Always need code-only output, no explanation"
- Frequency: 5 times
- Confidence: 5/5
- **Promoted:** Mirror now knows to reduce verbosity by default
- **Effect:** Next session, Claude will offer code-only mode

### Behavioral: Header Preference
- Signal: "Want headers with ### Markdown format"
- Frequency: 10 times
- Confidence: 5/5
- **Promoted:** Mirror locked in this format preference
- **Effect:** All future outputs use ### headers by default

### Process: API Design Workflow
- Pattern: "API Design → Code → Test → Deploy"
- Frequency: 3x/week (very consistent)
- Confidence: 5/5
- **Promoted:** Factory will build automation command
- **Command:** api-design-workflow.md (staged to factory-staging/)
- **Effect:** Next build can trigger full workflow with one command

## Standard Track (Queued for Review)

### Gap: Stripe Verification MCP
- Frequency: 2x
- Confidence: 4/5
- **Decision:** Scout actively searching for Stripe solutions
- **Timeline:** Candidates will stage within 1 week
- **Next:** If solution found, Factory builds integration command

### Anti-Pattern: GenUI CSS Overhead
- Pattern: "GenUI components need 40% custom CSS"
- Frequency: 2x
- Confidence: 4/5
- **Decision:** Flag to Scout as anti-pattern
- **Action:** Scout will avoid recommending GenUI for form work
- **Note:** GenUI fine for complex dashboards, not for simple forms

### Technical Gap: RAG Production Depth
- Signal: "Claude explained RAG basics when I needed production patterns"
- Frequency: 1x (but high impact)
- Confidence: 3/5
- **Decision:** Hold for next occurrence (if repeats, promote fast-track)
- **Note:** Scout will prioritize RAG production patterns higher

## Pruned (Discarded)

### Quality Miss: Tool naming issue
- Signal: "Searched for 'Slack integration' but tool is 'SlackAPI'"
- Frequency: 1x
- Confidence: 2/5
- **Decision:** Not actionable yet (naming is specific to tool, not pattern)
- **Note:** If repeats, will promote to Scout calibration

### Process: One-off workflow
- Signal: "Used custom script for data migration"
- Frequency: 1x
- Confidence: 2/5
- **Decision:** Too specific, not reusable enough
- **Note:** If you do migrations regularly, will promote

## Memory Management

**Total Entries:** 72/100 (healthy)
- Behavioral: 12 entries
- Technical: 18 entries
- Process: 25 entries
- Anti-pattern: 17 entries

**Oldest Entry:** 45 days old (API design workflow, still active)
**Lowest Confidence:** 2/5 (tool naming, candidate for purge if not promoted in 30 days)

**Action:** No cleanup needed (size healthy)

## Hooks Triggered

**Feed Mirror:** 4 signals promoted
- Mirror will recalibrate output preferences
- Next session benefits immediately

**Feed Scout:** 2 gaps + 1 anti-pattern
- Scout will prioritize Stripe solutions
- Scout will avoid GenUI recommendations
- Scout will search deeper for RAG production patterns

**Feed Factory:** 1 process becomes command
- Factory will build api-design-workflow.md
- Staged to factory-staging/ for review

**Feed Team:** 1 anti-pattern flagged
- Team-registry updated: "GenUI = heavy CSS overhead"
- Brandon and James notified (if team mode enabled)

## Cross-User Learning

**Team overlaps found:** 2
- James also hit RAG production pattern gap
- Brandon also needed Stripe integration

**Coordination notes:**
- James has RAG research — coordinate before Factory builds
- Brandon working on payment feature — share Stripe findings

---

## Next Self-Learning Review: 2026-04-06 (1 week)

Total signals to review then: ~15-20 (depending on session frequency)
```

---

## SIZE MANAGEMENT

Self-Learning keeps total entries between 50-100:

**If >100 entries:**
- Prune lowest-confidence entries (confidence <2/5)
- Prune oldest entries >90 days old
- Prune one-off signals that didn't repeat

**If <50 entries:**
- You're not capturing enough signals
- Run more sessions, trigger `/mirror` more often

**Healthy range:** 70-90 entries

---

## CONFIGURATION

Edit `~/.claude/config/trident-config.md`:

```
self_learning_auto_trigger: false # Manual review required
self_learning_frequency: "weekly" # When to review (if auto-enabled)
self_learning_fast_track_threshold: 3 # Promote after N occurrences
self_learning_confidence_threshold: 4 # Auto-promote if confidence 4+
self_learning_size_limit: 100 # Max entries before pruning
self_learning_retention_days: 90 # Prune signals older than this
```

---

## HOOKS EXPLAINED

When signals are promoted, they feed other agents:

**Hook 1: Feed Mirror**
- Promoted behavioral preferences
- Mirror uses to calibrate future output
- Effect: Claude learns your style immediately

**Hook 2: Feed Scout**
- Promoted gaps → Scout prioritizes searching
- Promoted anti-patterns → Scout avoids recommending
- Promoted domains → Scout searches deeper
- Effect: Next Scout run is smarter

**Hook 3: Feed Factory**
- Promoted processes → Factory builds automation
- Promoted patterns → Factory uses for workflows
- Effect: Next Factory run creates useful commands

**Hook 4: Feed Auditor**
- Promoted anti-patterns → Auditor flags risks
- Promoted preferences → Auditor scores against standards
- Effect: Auditor catches deviations from your proven patterns

**Hook 5: Team Tagging**
- If team mode enabled, promoted signals tagged with user_id
- Team can see: "Jack needed Stripe, promoted solution"
- Effect: Team learning compounds

---

## TROUBLESHOOTING

**Self-Learning not promoting signals:**
- Check that signals have frequency ≥3 or confidence ≥4
- Run `/self-learning --verbose` to see scoring logic
- Verify promotion thresholds in config

**Size exceeding 100 entries:**
- Run `/self-learning --prune` to clean up
- Set size_limit lower in config

**Promotions not feeding agents:**
- Check that Mirror, Scout, Factory, Auditor commands exist
- Run `/audit` to verify all agents operational
- Manually trigger `/scout` or `/factory` if needed

---

## NEXT STEPS

1. Run `/self-learning` weekly (recommended Friday end-of-week)
2. Review classification and promotion decisions
3. Approve fast-track promotions (immediate effect)
4. Review standard-track signals (decide to promote or hold)
5. Let pruning happen automatically (monthly cleanup)

---

**Self-Learning is your quality gate. It separates signal from noise, and compresses learning into action.**
