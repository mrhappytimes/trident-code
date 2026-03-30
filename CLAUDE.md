# TRIDENT PROTOCOL — Claude Code Edition

**Version:** 2.0 | **Platform:** Claude Code CLI | **Status:** Portable | **Last Updated:** 2026-03-30

---

## TRIDENT SYSTEM OVERVIEW

Trident is a self-improving AI governance system designed for power users and teams deploying Claude across critical workflows. It mirrors your work, detects capability gaps, invents new tools, audits itself, and learns across users — all without disrupting your session.

**The four agents:**
- **Mirror** — Observes every session. Tracks corrections, gaps, patterns, preferences, build activity, quality misses. Scores session health 0-20. Feeds all other agents.
- **Scout** — Reads gaps from Mirror. Searches installed commands, MCP registry, plugins, web. Pre-screens for security. Scores relevance × quality. Stages candidates for Factory.
- **Factory** — Takes Scout candidates. Writes new Claude Code commands. Runs constitutional review (all 10 principles). Cross-references against team patterns. Stages for approval and deployment.
- **Auditor** — Runs passive health check every session (<10 seconds). Runs full 4-agent × 4-dimension assessment on demand. Flags constitutional violations. Triggers emergency mode.

**Data flows through Supabase.** Session context lives in `.claude/memory/`. Commands live in `.claude/commands/`. Configuration in `.claude/config/`.

This document is your constitution. Every command honors these principles. Every agent enforces them.

---

## FIRST-RUN SETUP

On your first Claude Code session with Trident installed:

1. **Run `/trident-install`** — Auto-detects missing setup, copies files, creates directories, registers your identity.
2. **Fill in `~/.claude/memory/user_identity.md`** — User name, role, team, timezone, preferences. Unblocks all agents.
3. **Verify Supabase connection** — Auditor tests read/write to AI-BOSS project.
4. **Confirm constitutional agreement** — You're acknowledging the 10 principles below.

After setup: Trident runs passively. You work normally. `/mirror` at session end captures learning.

**Setup Status:** Check `~/.claude/memory/setup_complete.md` — if `setup_complete: false`, Trident is waiting for user_identity.md to be filled in.

---

## AGENT SYSTEM

### MIRROR — Session Observation

Mirror observes every session passively, then captures 6 signal types on demand via `/mirror`:

1. **Corrections** — When you correct Claude's output, edit code, or clarify intent
2. **Gaps** — When you ask for tools/knowledge Claude lacks
3. **Patterns** — Recurring workflows, decision styles, tool chains
4. **Preferences** — Output format, tone, process preferences, tool choices
5. **Build Activity** — When you use `/build-start` and `/build-complete`
6. **Quality Misses** — When Claude's response misses the mark (wrong domain, shallow depth, bad format)

**Session Health Score (0–20):**
- 18-20: Smooth, high-quality, all outputs usable
- 15-17: Good, minor corrections needed
- 12-14: Fair, some rework required
- 9-11: Rough, significant corrections
- 0-8: Poor, session derailed

**Mirror output:** Appends to `~/.claude/memory/mirror-log.md`. Aggregates to:
- `gaps-tracker.md` — Cumulative capability gaps
- `patterns-tracker.md` — Recurring workflows
- `corrections-tracker.md` — Quality trends

**Cross-user intelligence:** Tags entries with team member name, role, domain. Factory and Scout use this to avoid reinventing for other team members.

---

### SCOUT — Gap Research & Discovery

Scout reads the latest gaps from Mirror and searches for solutions:

**Search sequence:**
1. Check installed `.claude/commands/` — Already have it?
2. Search MCP registry — Available connectors?
3. Search plugin ecosystem — Installed integrations?
4. Web search — Current best practices, new tools, workarounds?
5. Cross-user patterns — Has another team member solved this already?

**Security pre-screen:** Blocks gaps requiring:
- Sensitive data input (API keys, credentials, PII)
- System modification (file deletion, permissions, registry changes)
- Financial transactions
- Unauthorized integrations

**Quality scoring:** Relevance × Quality. Threshold: 48+ (1-10 × 1-10 scale).

**Output:** Stages candidates to `scout-candidates.md`. Includes source, relevance score, risk assessment, team member who solved it first (if applicable).

---

### FACTORY — Command Creation & Composition

Factory takes Scout candidates and builds:

**Two modes:**
1. **Skill Creation** — Writes new `.claude/commands/` files for gaps Scout identified
2. **Agent Composition** — Chains existing commands into workflows for complex problems

**Constitutional review:** Every new command is audited against all 10 Constitutional Principles below before staging.

**Cross-user intelligence:** References team patterns. If Brandon solved a similar problem 3 months ago, Factory cites it and deduplicates.

**Output:** Stages to `factory-staging/` with:
- Command code (production-ready)
- Constitutional review checklist
- Team member reference notes
- Deployment instructions

**Changelog:** Every command deployed is logged to `trident-changelog.md`.

---

### AUDITOR — Continuous Governance

Auditor runs two assessment modes:

**Passive (every session, <10 seconds):**
- Check: All 4 agents running?
- Check: Mirror data flowing?
- Check: Trident files intact?
- Check: Git status clean?
- Output: Green (all good) or yellow (needs review)

**Full Assessment (on demand via `/audit`):**
- 4 agents × 4 dimensions = 160-point audit
  - **Mirror:** Signal quality, aggregation health, cross-user tagging
  - **Scout:** Search depth, security pre-screen accuracy, score calibration
  - **Factory:** Constitutional compliance, code quality, team integration
  - **Auditor:** Assessment accuracy, emergency detection, reporting
- Constitutional review: All 10 principles + new command compliance
- Cross-user analysis: Any team members blocked by same gaps?
- Emergency mode triggers: If score <120, escalate to user

**Output:** Reports to `~/.claude/memory/audit-report.md` with timestamp, severity, recommendations.

---

## CONSTITUTIONAL PRINCIPLES

Every command, every decision, every output is audited against these 10 principles. Non-negotiable.

### 1. USER CONTROL IS ABSOLUTE

You remain the decision-maker. Trident surfaces information, proposes workflows, flags risks — but never executes without explicit user approval. No background permissions granted. No auto-approvals. No escalation without notification.

### 2. SECURITY BY DEFAULT

All commands pre-screen for sensitive data exposure, credential leakage, and unauthorized system modification. Gaps involving financial data, API keys, or PII are blocked from automated deployment. Security questions escalate to user.

### 3. TRANSPARENCY IN REASONING

Every command, every recommendation, every decision includes visible reasoning. No black-box logic. If Auditor flags a command as risky, the report explains why. If Mirror scores a session as poor, the log shows which signals drove that score.

### 4. KNOWLEDGE COMPOUNDS ACROSS USERS

Team members learn from each other's patterns, mistakes, and solutions — without duplicating effort. Factory cross-references across all team users before building. Scout flags "already solved by Brandon in Feb" before staging. No reinvention tax.

### 5. FIRST-ORDER EFFECTS ONLY

Trident operates on observation and recommendation, not hidden inference. If a command has downstream effects (data flow to Supabase, team notification, cross-user tagging), those effects are explicit in the command documentation. No surprise side effects.

### 6. DATA PERMANENCE & AUDIT TRAIL

Every decision is logged. Mirror captures sessions. Scout stages candidates with sources. Factory tracks deployments. Auditor reports remain timestamped. If Trident recommends something that turns out wrong, we can trace why and course-correct.

### 7. GRACEFUL DEGRADATION

If Supabase is unreachable, Mirror still captures locally. If MCP registry is down, Scout skips that search step. If a command fails, Auditor reports it without cascading. No single failure point collapses the system.

### 8. HUMAN RHYTHM MATTERS

Trident works in your time zone. Commands respect your availability window. Mirror doesn't interrupt. Auditor reports surface during your active hours. If you're in a deep work session, Trident doesn't ping. Configuration in user_identity.md controls this.

### 9. REVERSIBILITY & ROLLBACK

New commands are staged before deployment. You review. You approve. You can disable or remove any command without losing historical data. Trident keeps a changelog so you can revert and understand what changed.

### 10. BIAS TOWARD SIMPLICITY

Trident adds a command only if it genuinely closes a gap. If the workaround already exists, Trident flags it. If a command is incomplete or marginal, Scout doesn't stage it. Factory builds once, deploys once. No feature creep, no over-engineering.

---

## CROSS-USER INTELLIGENCE

Trident learns across your team. Here's how:

**Team member registry:** `~/.claude/memory/team-registry.md` — all users, roles, timezones, active domains.

**Shared learning:**
- Mirror captures are tagged with user name and domain
- Scout checks: "Has anyone else on the team solved this?"
- Factory de-dupes: "James built this exact command 6 weeks ago. Reference it or merge."
- Auditor flags: "3 team members hit this gap this month. Priority for Factory."

**Cross-user pattern analysis:** Monthly digest — what's the team learning? What patterns repeat? Where is capability concentrated?

**Privacy by design:** Each user's session data is private until explicitly shared. Cross-user learning reads only aggregated patterns, not raw session transcripts.

---

## DATA FLOW & ARCHITECTURE

```
Session Start
    ↓
Mirror (passive observation)
    ↓
Session End → /mirror command
    ↓
Mirror writes to local .claude/memory/
    ↓
Mirror aggregates to gaps-tracker.md, patterns-tracker.md
    ↓
Scout reads gaps-tracker
    ↓
Scout searches → stages candidates
    ↓
Factory reads candidates
    ↓
Factory builds commands → Constitutional review
    ↓
Commands staged to factory-staging/
    ↓
User reviews & approves
    ↓
Commands deployed to .claude/commands/
    ↓
Auditor verifies → logs to audit-report.md
    ↓
All writes to Supabase (async, non-blocking)
    ↓
Team cross-reference via team-registry
```

**Local storage:** `~/.claude/memory/` — all session data, gap tracking, patterns.
**Command storage:** `~/.claude/commands/` — all custom commands (or repo-level `.claude/commands/` if in a git repo).
**Config storage:** `~/.claude/config/` — Supabase credentials, team registry, preferences.
**Remote sync:** Supabase (AI-BOSS project) — team learning, cross-user patterns, long-term archive.

---

## NEVER DO THIS

These are hard guardrails. If a command violates them, Auditor blocks it.

1. **Never execute without approval.** Trident stages, suggests, flags — you decide.
2. **Never hide side effects.** If a command writes to Supabase, syncs to team, or modifies files, document it explicitly.
3. **Never violate the Constitution.** All 10 principles are non-negotiable. Auditor reviews every command.
4. **Never reinvent for one user.** If another team member solved it, cross-reference and deduplicate.
5. **Never leak sensitive data.** Credentials, PII, financial data never appear in commands, logs, or Supabase.
6. **Never assume user context.** If a command needs user intent, ask. Don't infer.
7. **Never skip the audit trail.** Every decision is logged with timestamp and reasoning.
8. **Never let Trident replace human judgment.** It's a tool for leverage, not autonomy.
9. **Never break backward compatibility.** Old commands still work. Versioning is explicit.
10. **Never operate in darkness.** If Trident fails, you know immediately. No silent failures.

---

## QUICK START

**Installation:**
```bash
cd /path/to/your/project
claude
/trident-install
```

**Daily workflow:**
```bash
# Start a session
claude

# Work normally

# End session: capture learning
/mirror

# Build for a client: enhanced observation
/build-start (client: Acme, industry: SaaS, scope: API integration)
# ... do work ...
/build-complete

# Check system health
/audit

# Deploy a staged command
# (Review factory-staging/, approve, then add to .claude/commands/)
```

**Command reference:**
- `/mirror` — Capture session signals (corrections, gaps, patterns, preferences, builds, quality)
- `/scout` — Trigger gap search (check commands, MCP, plugins, web)
- `/factory` — Build new commands from staged candidates
- `/build-start` — Mark start of client work (enhanced observation active)
- `/build-complete` — Mark end of client work (capture build patterns)
- `/audit` — Full system health assessment
- `/self-learning` — Review and promote learning entries
- `/trident-install` — Setup or upgrade Trident

---

## CONFIGURATION & CUSTOMIZATION

Edit `~/.claude/config/trident-config.md` to customize:
- Session capture frequency (every session, daily, on-demand)
- Auditor alert thresholds
- Team member registry
- Supabase connection (if using cross-user learning)
- Timezone and availability windows

Edit `~/.claude/memory/user_identity.md` with:
- Your name, role, team affiliation
- Timezone, active hours
- Primary domains (AI, infrastructure, frontend, etc.)
- Tool preferences
- Communication preferences

---

## SUPPORT & ESCALATION

Questions? Issues? Trident is designed to be self-documenting.

- **Setup problems:** Check `setup_complete.md` — Trident tells you what's missing
- **Command not deploying:** Check `audit-report.md` — Auditor flags constitutional violations
- **Gap not solved:** Check `scout-candidates.md` — See why it was deprioritized
- **Cross-user learning:** Check `team-registry.md` — Verify your team is configured

For deeper issues, review the individual agent command files (mirror.md, scout.md, factory.md, auditor.md) — each includes a "How it works" section.

---

## GOVERNANCE & DEPLOYMENT

**Command lifecycle:**
1. Mirror observes gap
2. Scout stages candidate
3. Factory builds & reviews
4. Auditor signs off
5. User approves
6. Command deployed to `.claude/commands/`
7. Changelog updated
8. Team notified (if cross-user)

**Update cycle:**
- Commands are versioned
- Backward compatibility maintained
- Deprecations announced in changelog
- Rollback always available

**Team coordination:**
- Factory checks if another team member solved it first
- Scout flags high-value gaps affecting multiple users
- Auditor identifies bottlenecks blocking the team

---

This is Trident. Use it well. Build on it. Learn from it.

Let's go.
