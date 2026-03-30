# Trident for Claude Code — Installation & Quick Start

**Version:** 2.0 | **Platform:** Claude Code CLI | **Repo:** https://github.com/mrhappytimes/trident-code

---

## WHAT IS TRIDENT?

Trident is a self-improving AI governance system for power users. It mirrors your work, detects gaps, invents commands, audits itself, and learns across your team — all in the background.

**Four agents working for you:**
- **Mirror** — Observes sessions, tracks corrections, gaps, patterns, preferences, builds, quality
- **Scout** — Searches for solutions to gaps (commands, MCP, plugins, web)
- **Factory** — Builds new commands from Scout candidates
- **Auditor** — Runs health checks, flags constitutional violations

**10 Constitutional Principles** govern all behavior. No exceptions.

---

## INSTALLATION

### Option 1: Auto-Install (Easiest)

```bash
# Navigate to a Claude Code project directory
cd ~/my-project

# Start Claude Code
claude

# In the Claude Code session, type:
/trident-install
```

Trident auto-detects your environment, copies files, creates directories, and registers your identity. You'll be prompted to fill in `user_identity.md` with your name, role, and preferences.

### Option 2: Manual Install

1. **Clone or copy the trident-code folder** to your machine:
   ```bash
   git clone https://github.com/mrhappytimes/trident-code.git
   ```

2. **Copy commands to Claude Code:**
   - If using **global Claude Code config:**
     ```bash
     cp trident-code/commands/* ~/.claude/commands/
     ```
   - If using **repo-level config:**
     ```bash
     cp -r trident-code/.claude/* /path/to/project/.claude/
     ```

3. **Merge CLAUDE.md:**
   - If you don't have a CLAUDE.md yet:
     ```bash
     cp trident-code/CLAUDE.md ~/.claude/CLAUDE.md
     # OR for repo-level
     cp trident-code/CLAUDE.md /path/to/project/.claude/CLAUDE.md
     ```
   - If you already have CLAUDE.md, merge the Trident Protocol section manually

4. **Set up memory and config:**
   ```bash
   mkdir -p ~/.claude/memory ~/.claude/config
   cp trident-code/memory/* ~/.claude/memory/
   cp trident-code/config/* ~/.claude/config/
   ```

5. **Create Trident data directories:**
   ```bash
   mkdir -p ~/.claude/memory/factory-staging
   mkdir -p ~/.claude/memory/patterns-draft
   mkdir -p ~/.claude/memory/scout-candidates
   ```

6. **Start Claude Code and verify:**
   ```bash
   claude
   /audit
   ```

---

## POST-INSTALLATION SETUP

After installing, Trident needs your identity:

1. **Edit `~/.claude/memory/user_identity.md`:**
   ```markdown
   # User Identity

   setup_complete: false

   name: [Your Name]
   role: [Your Role — e.g., "Founder", "Engineer", "Product Manager"]
   team: [Your Team or Company]
   timezone: [Your Timezone — e.g., "America/Denver"]
   active_hours: "5AM - 10PM"

   primary_domains:
     - AI Integration
     - Infrastructure
     - [Your domain]

   tool_preferences:
     - Claude Code (primary)
     - [Your preferred tools]

   communication_preferences:
     - Slack
     - Email
     - [Your preference]
   ```

2. **Verify Supabase connection (optional):**
   If you want cross-user learning, update `~/.claude/config/supabase-config.md` with your credentials. Trident works without it, but Supabase enables team-wide intelligence.

3. **Run verification:**
   ```bash
   claude
   /audit
   ```

   You should see "setup_complete: true" in the audit report.

---

## DAILY WORKFLOW

### Normal Session (Learning Capture)

```bash
# Start Claude Code
claude

# Work normally — code, prompts, research, whatever

# At the end of the session, capture learning:
/mirror
```

Mirror observes:
- Corrections you made to Claude's output
- Gaps you asked Claude to fill
- Patterns in your workflows
- Your format and tone preferences
- Quality misses in responses

All captured locally in `~/.claude/memory/mirror-log.md`.

### Client Work Session (Enhanced Observation)

```bash
# Start a session
claude

# Mark start of client work:
/build-start
# Responds with form:
#   - Client name: [e.g., Acme Corp]
#   - Industry: [e.g., SaaS, Fintech, Healthcare, etc.]
#   - Project type: [Integration, Data Pipeline, API Design, etc.]
#   - Platform: [e.g., Vercel, Supabase, AWS, Custom]
#   - Scope: [e.g., "Build OAuth flow", "Audit database performance"]

# Do work — code, design, testing, documentation

# Mark end of client work:
/build-complete
# Responds with form:
#   - What worked: [Brief description]
#   - What didn't: [Blockers, gaps, rework needed]
#   - Key decisions: [Architectural choices]
#   - Patterns identified: [Reusable patterns for future]
#   - Time spent: [Hours]
#   - Confidence: [1-5 scale]
#   - Quality rating: [1-5 scale]

# Automatically triggers /mirror at end
```

Mirror captures build-specific signals:
- What client work looks like (patterns)
- Common blockers (gaps for Scout)
- Decisions and tradeoffs
- Quality metrics

Build patterns are staged to `~/.claude/memory/patterns-draft/` and can be promoted to team knowledge later.

### System Health Check

```bash
# Passive health check (every session, <10 seconds):
claude
/audit  # Returns GREEN or YELLOW

# Full assessment (on demand):
/audit --full
# Returns 160-point assessment across all 4 agents
```

Audit report saved to `~/.claude/memory/audit-report.md`.

---

## COMMAND REFERENCE

| Command | Trigger | Description |
|---------|---------|-------------|
| `/mirror` | Manual or auto | Capture session signals: corrections, gaps, patterns, preferences, builds, quality |
| `/scout` | On demand or auto | Search for solutions to gaps: commands, MCP registry, plugins, web |
| `/factory` | On demand or auto | Build new commands from Scout candidates, run constitutional review |
| `/build-start` | Manual | Mark start of client work, activate enhanced observation |
| `/build-complete` | Manual | Capture build patterns, quality metrics, decisions |
| `/audit` | On demand | Check system health (passive: <10s, full: 2-3 min) |
| `/self-learning` | Manual | Review and promote learning entries, manage deduplication |
| `/trident-install` | First-run | Setup or upgrade Trident installation |

---

## COMMAND FILES EXPLAINED

Each command is a `.md` file in `~/.claude/commands/`. Here's what each does:

### `mirror.md`
- **Passively observes** your session as you work
- **Captures 6 signal types:** corrections, gaps, patterns, preferences, builds, quality misses
- **Scores session health** 0-20
- **Aggregates** to gaps-tracker.md, patterns-tracker.md, corrections-tracker.md
- **Tags cross-user** signals for team learning

**When to use:** Automatically at session end, or manually with `/mirror`

### `scout.md`
- **Reads gaps** from Mirror's gap-tracker.md
- **Searches** installed commands → MCP registry → plugins → web → team solutions
- **Pre-screens** for security (blocks sensitive data, credentials, PII)
- **Scores** relevance × quality (threshold: 48+)
- **Stages candidates** to scout-candidates.md with sources and risk assessment

**When to use:** Automatically after Mirror, or manually with `/scout`

### `factory.md`
- **Reads Scout candidates** from scout-candidates.md
- **Builds new commands** (Skill Creation mode) or chains existing commands (Agent Composition mode)
- **Runs constitutional review** against all 10 principles
- **Cross-references** team patterns to avoid duplication
- **Stages** to factory-staging/ for user review and approval
- **Logs** all deployments to trident-changelog.md

**When to use:** Automatically after Scout, or manually with `/factory`

### `build-start.md`
- **Marks the beginning** of client work
- **Activates enhanced observation** (Mirror records more detail)
- **Collects project context:** client, industry, type, platform, scope
- **Logs to** active-builds.md for tracking

**When to use:** Manually at start of client project

### `build-complete.md`
- **Marks the end** of client work
- **Captures build pattern:** what worked, what didn't, decisions, patterns
- **Scores quality** and confidence (1-5 scale)
- **Stages patterns** to patterns-draft/ for promotion
- **Triggers final Mirror** capture
- **Syncs to Supabase** (async, non-blocking)

**When to use:** Manually at end of client project

### `self-learning.md`
- **Reviews captured signals** (from Mirror, Scout, Factory, Auditor)
- **Classifies** as Behavioral, Technical, Process, or Anti-pattern
- **Deduplicates** to prevent repeat learning
- **Manages size** (50-100 entries max)
- **Promotion pipeline:** Fast track (immediate), Standard (manual review), Prune (discard)
- **Feeds other agents:** Mirror uses for context, Scout for gap detection, Factory for command building

**When to use:** Weekly or monthly review, or on demand with `/self-learning`

### `auditor.md`
- **Passive check** every session (<10 seconds): agents running? Files intact? Git clean?
- **Full assessment** (2-3 min): 4 agents × 4 dimensions = 160-point audit
- **Constitutional review:** all commands comply with 10 principles
- **Emergency mode:** if score <120, escalates to user
- **Reports** to audit-report.md with timestamp, severity, recommendations

**When to use:** Automatically passive (every session), manually full (`/audit --full`)

### `trident-install.md`
- **Pre-flight checks:** Claude Code running? ~/.claude/ exists?
- **Copies files:** commands → .claude/commands/, memory → .claude/memory/, config → .claude/config/
- **Merges CLAUDE.md** into existing file if present
- **Creates directories:** factory-staging, patterns-draft, scout-candidates
- **Registers user:** prompts for identity info
- **Verification:** tests Supabase connection (if enabled), confirms all agents running
- **Announcement:** displays Trident banner with quick-start guide

**When to use:** First-run setup or upgrade (`/trident-install`)

---

## CONFIGURATION

Edit these files to customize Trident:

### `~/.claude/memory/user_identity.md`
- Your name, role, team
- Timezone and active hours
- Primary domains (what you work on)
- Tool preferences
- Communication preferences

### `~/.claude/config/trident-config.md`
- Session capture frequency (every session, daily, on-demand)
- Auditor alert thresholds (score <100 triggers warning)
- Mirror aggregation interval (hourly, daily, weekly)
- Supabase sync behavior (realtime, batch, disabled)
- Command deployment approval (auto-deploy if low-risk, manual review required)

### `~/.claude/config/supabase-config.md`
- **Project:** AI-BOSS
- **Project ID:** onvitjyxcwriqbssrchb
- **URL:** https://onvitjyxcwriqbssrchb.supabase.co
- **API Key:** [Your publishable key — see setup instructions]
- **Functions:** All defined in Supabase dashboard

Leave blank if you're not using team cross-learning. Trident works fully offline.

---

## FILE STRUCTURE

After installation, you'll have:

```
~/.claude/
├── CLAUDE.md                          # Trident constitution
├── commands/
│   ├── mirror.md
│   ├── scout.md
│   ├── factory.md
│   ├── auditor.md
│   ├── build-start.md
│   ├── build-complete.md
│   ├── self-learning.md
│   └── trident-install.md
├── memory/
│   ├── user_identity.md               # FILL IN: your identity
│   ├── setup_complete.md
│   ├── mirror-log.md                  # Appended each session
│   ├── gaps-tracker.md                # Aggregated gaps
│   ├── patterns-tracker.md            # Recurring patterns
│   ├── corrections-tracker.md         # Quality trends
│   ├── active-builds.md               # Ongoing projects
│   ├── trident-changelog.md           # All deployments
│   ├── team-registry.md               # Team member metadata
│   ├── audit-report.md                # Latest audit
│   ├── factory-staging/               # Commands pending approval
│   ├── patterns-draft/                # Build patterns for promotion
│   └── scout-candidates/              # Gap solutions staged
└── config/
    ├── supabase-config.md             # (Optional) Supabase credentials
    └── trident-config.md              # Customization options
```

If you're in a git repo, you can use repo-level `.claude/` instead of `~/.claude/`.

---

## TROUBLESHOOTING

### Setup isn't completing

Check `~/.claude/memory/setup_complete.md`. If it says `false`, fill in `~/.claude/memory/user_identity.md` with your name and role.

```bash
cat ~/.claude/memory/setup_complete.md
cat ~/.claude/memory/user_identity.md
```

Edit user_identity.md and save, then run `/audit` again.

### Audit returning YELLOW

Check `~/.claude/memory/audit-report.md` for severity and recommendation. Common issues:
- One of the 4 agents crashed (check command file syntax)
- Git repo is dirty (commit or stash changes)
- Supabase connection failed (if using team learning)

Run `/audit --full` for detailed breakdown.

### Commands not deploying

Check `~/.claude/memory/factory-staging/` for commands waiting review. Trident stages before deployment — you review, then move to `~/.claude/commands/` to deploy.

Example:
```bash
# Review the staged command
cat ~/.claude/memory/factory-staging/new-command.md

# If it looks good, deploy it:
cp ~/.claude/memory/factory-staging/new-command.md ~/.claude/commands/new-command.md

# Log the deployment:
echo "Deployed: new-command.md" >> ~/.claude/memory/trident-changelog.md
```

### Supabase sync failing

If you're not using team cross-learning, leave Supabase config blank. Trident works fully offline.

If you want to enable it:
1. Get your Supabase API key from the AI-BOSS project dashboard
2. Update `~/.claude/config/supabase-config.md`
3. Run `/audit` to test connection

### Mirror not capturing signals

Make sure you're running `/mirror` at the end of sessions. Mirror runs passively but needs explicit trigger to write output.

```bash
# End of session, capture learning:
/mirror

# Check output:
cat ~/.claude/memory/mirror-log.md
```

---

## NEXT STEPS

1. **Install Trident** using auto-install or manual steps above
2. **Fill in `user_identity.md`** with your info
3. **Run `/audit`** to verify everything is working
4. **Use `/mirror`** at the end of each session
5. **Check `audit-report.md`** weekly to see Trident's assessment
6. **Review `factory-staging/`** when new commands are staged — approve and deploy

---

## UPDATES & ROLLBACK

Trident updates are versioned. To update:

```bash
# Pull latest from GitHub
cd ~/trident-code
git pull

# Re-run install (safe to run multiple times)
cd /your/project
claude
/trident-install
```

All existing data (memory, patterns, builds) is preserved. Commands are updated, settings are merged.

To rollback:

```bash
# Check changelog for previous version
cat ~/.claude/memory/trident-changelog.md

# Restore old commands from git history
git log --oneline ~/.claude/commands/
git restore -S <commit-hash> -- ~/.claude/commands/
```

---

## SUPPORT

Issues? Questions? File a bug on GitHub:
https://github.com/mrhappytimes/trident-code/issues

Or check the detailed agent documentation:
- `~/.claude/commands/mirror.md` — How Mirror works
- `~/.claude/commands/scout.md` — How Scout works
- `~/.claude/commands/factory.md` — How Factory works
- `~/.claude/commands/auditor.md` — How Auditor works

---

**Welcome to Trident. Let's build something great.**
