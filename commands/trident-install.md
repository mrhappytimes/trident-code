# Trident Install — First-Run Setup & Upgrades

**Trigger:** Manual (`/trident-install`) | **Runtime:** 2-5 min | **Effect:** Initializes entire system

---

## WHAT TRIDENT-INSTALL DOES

Trident-Install is the one-command setup for the entire Trident system. It:

1. Checks prerequisites (Claude Code running, ~/.claude/ exists)
2. Copies all command files to `.claude/commands/`
3. Merges CLAUDE.md constitution into your config
4. Sets up memory and config directories
5. Registers your user identity
6. Tests Supabase connection (optional)
7. Verifies all agents are operational
8. Prints quick-start guide

---

## WHEN TO USE

**First-time installation:**
```bash
cd ~/my-project
claude
/trident-install
```

**Upgrade existing installation:**
```bash
# Pull latest version
cd ~/trident-code
git pull

# Run install again (safe to re-run)
claude
/trident-install
```

**Reset/repair broken installation:**
```bash
# Re-run install to verify/restore files
/trident-install --force
```

---

## PRE-FLIGHT CHECKS

Trident-Install verifies prerequisites before proceeding:

**Check 1: Claude Code is running**
```
Verifying Claude Code environment...
✓ Claude Code CLI detected
✓ Session context available
```

**Check 2: ~/.claude/ directory exists**
```
Checking config directory...
✓ ~/.claude/ exists
  OR
✗ ~/.claude/ doesn't exist
  Action: Creating ~/.claude/ and subdirectories
```

**Check 3: Space available**
```
Checking disk space...
✓ >100MB available (Trident needs ~10MB)
```

**Check 4: Git (optional)**
```
Checking git...
✓ Git detected (optional, for version control)
  OR
⚠ Git not found (optional, system will work without it)
```

---

## INSTALLATION PROCESS

### Phase 1: Copy Command Files

```
Copying command files...

Copying mirror.md → ~/.claude/commands/
✓ mirror.md (12KB)

Copying scout.md → ~/.claude/commands/
✓ scout.md (18KB)

Copying factory.md → ~/.claude/commands/
✓ factory.md (22KB)

Copying auditor.md → ~/.claude/commands/
✓ auditor.md (16KB)

Copying build-start.md → ~/.claude/commands/
✓ build-start.md (5KB)

Copying build-complete.md → ~/.claude/commands/
✓ build-complete.md (12KB)

Copying self-learning.md → ~/.claude/commands/
✓ self-learning.md (14KB)

Copying trident-install.md → ~/.claude/commands/
✓ trident-install.md (12KB)

Total: 8 commands copied (111KB)
```

### Phase 2: Merge CLAUDE.md

```
Merging CLAUDE.md...

Checking for existing CLAUDE.md...
✓ CLAUDE.md found at ~/.claude/CLAUDE.md

Merging Trident Protocol section...
  - Preserving existing sections
  - Adding TRIDENT PROTOCOL
  - Adding AGENT SYSTEM
  - Adding CONSTITUTIONAL PRINCIPLES

Backup created: ~/.claude/CLAUDE.md.backup-20260330
✓ Merge complete
```

### Phase 3: Setup Memory & Config

```
Setting up memory system...

Creating directories:
✓ ~/.claude/memory/
✓ ~/.claude/memory/factory-staging/
✓ ~/.claude/memory/patterns-draft/
✓ ~/.claude/memory/scout-candidates/
✓ ~/.claude/config/

Copying memory files:
✓ MEMORY.md
✓ user_identity.md (REQUIRES SETUP)
✓ setup_complete.md (auto-populated)

Copying config files:
✓ supabase-config.md (optional, leave blank)
✓ trident-config.md (optional, use defaults)

Core files initialized ✓
```

### Phase 4: User Registration

```
Registering user identity...

This is Trident. I'm waking up for the first time.

Please tell me about you:
```

Prompts for:
- **Full Name:** (required)
- **Role:** (required) — Founder, Engineer, Product Manager, etc.
- **Team:** (required) — Company/team name or "Solo"
- **Timezone:** (required) — e.g., "America/Denver"

Auto-updates `~/.claude/memory/user_identity.md` with responses.

```
✓ Identity registered:
  Name: Jack Panas
  Role: Founder
  Team: Smart Start
  Timezone: America/Denver
```

### Phase 5: Optional Supabase Connection

```
Supabase optional. Want team cross-learning? (y/n)
```

If yes:
```
Get your API key from: https://app.supabase.com/
Project: AI-BOSS
Project ID: onvitjyxcwriqbssrchb

Paste your Supabase API key (or leave blank to skip):
[User enters key or presses enter to skip]

✓ Supabase configured (or skipped)
Testing connection...
✓ Connection successful
  OR
⚠ Could not reach Supabase (will use local-only mode)
```

### Phase 6: Verification

```
Verifying installation...

Checking agents:
✓ Mirror agent: /mirror command ready
✓ Scout agent: /scout command ready
✓ Factory agent: /factory command ready
✓ Auditor agent: /audit command ready
✓ Build markers: /build-start and /build-complete ready
✓ Self-learning: /self-learning command ready

Checking data files:
✓ mirror-log.md ready
✓ gaps-tracker.md ready
✓ patterns-tracker.md ready
✓ audit-report.md ready
✓ team-registry.md ready

Checking config:
✓ user_identity.md filled in
✓ CLAUDE.md merged
✓ supabase-config.md ready

Final status check:
✓ All systems green

Installation complete ✓
```

---

## ANNOUNCEMENT BANNER

After successful install, Trident prints:

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           ⚡ TRIDENT IS ONLINE ⚡                              ║
║                                                                ║
║     Self-improving AI governance system activated.            ║
║     Constitution: 10 principles enforced.                     ║
║     Agents: 4 systems running (Mirror, Scout, Factory,        ║
║                               Auditor).                       ║
║     Status: Ready for production use.                         ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                       QUICK START GUIDE                        ║
╟────────────────────────────────────────────────────────────────┤
║                                                                ║
║  1. NEXT SESSION: Run /mirror at end to capture learning      ║
║                                                                ║
║  2. CLIENT WORK: Use /build-start and /build-complete         ║
║                                                                ║
║  3. WEEKLY: Run /audit --full for system health               ║
║                                                                ║
║  4. TEAM: Enable team mode in user_identity.md to             ║
║           share patterns and learn together                   ║
║                                                                ║
║  More info: Read ~/.claude/commands/[agent].md                ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## UPGRADE PATH

Trident-Install is safe to re-run:

```
# Version 1.0 already installed
# New version 2.0 released, pull it
git pull

# Re-run install (safe)
/trident-install --upgrade

Installation process:
✓ Detects existing installation
✓ Backs up old files
✓ Copies new versions
✓ Merges config changes
✓ Preserves all data
✓ Verifies compatibility

Migration complete:
✓ Updated from v1.0 → v2.0
✓ All data preserved
✓ Ready to continue
```

---

## TROUBLESHOOTING INSTALLATION

**Issue: Permission denied creating directories**
```
Solution: Check permissions on ~/.claude/
$ ls -la ~/ | grep .claude
$ chmod 755 ~/.claude/
$ /trident-install --retry
```

**Issue: CLAUDE.md merge failed**
```
Solution: Manual merge required
$ cat ~/.claude/CLAUDE.md.backup-20260330 > ~/.claude/CLAUDE.md
$ Manually add TRIDENT PROTOCOL section
$ /trident-install --retry
```

**Issue: Command files not copying**
```
Solution: Check source files exist and are readable
$ ls -la ~/trident-code/commands/
$ /trident-install --force
```

**Issue: user_identity.md not filling in**
```
Solution: Fill manually
$ nano ~/.claude/memory/user_identity.md
[Edit file, save, exit]
$ /audit
[Verify setup_complete: true]
```

**Issue: Supabase connection failing**
```
Solution: Leave blank and use local-only
$ nano ~/.claude/config/supabase-config.md
[Leave API_KEY blank]
$ /trident-install --skip-supabase
```

---

## FORCE REINSTALL

If something is broken:

```bash
/trident-install --force
```

This will:
- Re-copy all command files (overwriting any changes)
- Re-merge CLAUDE.md
- Re-verify all systems
- Preserve all data files (mirror-log.md, gaps-tracker, etc.)

**Use when:**
- Commands won't load
- CLAUDE.md got corrupted
- Need to reset to known-good state
- Upgrading from older version

---

## OFFLINE SETUP

If internet is unavailable:

```bash
/trident-install --offline
```

This will:
- Skip Supabase connection test
- Skip MCP registry verification
- Install local-only version
- You can enable Supabase later: /audit --setup-supabase
```

---

## POST-INSTALLATION

After successful install, Trident is ready to use:

1. **Run your first session** with enhanced learning capture
   ```bash
   claude
   /mirror
   ```

2. **Trigger the agents** manually to test
   ```bash
   /scout      # Search for gaps (should be empty first run)
   /factory    # Build commands (should be empty first run)
   /audit      # Full system check
   ```

3. **Start a build** to test the full workflow
   ```bash
   /build-start
   # ... do some work ...
   /build-complete
   ```

4. **Run weekly audits** to monitor system health
   ```bash
   /audit --full
   ```

---

## UNINSTALL

If you want to remove Trident:

```bash
# Backup data first
cp -r ~/.claude/memory ~/trident-backup-20260330

# Remove Trident files
rm -rf ~/.claude/commands/mirror.md
rm -rf ~/.claude/commands/scout.md
rm -rf ~/.claude/commands/factory.md
rm -rf ~/.claude/commands/auditor.md
rm -rf ~/.claude/commands/build-*.md
rm -rf ~/.claude/commands/self-learning.md
rm -rf ~/.claude/commands/trident-install.md

# Keep your data (mirror-log.md, gaps, patterns, etc.)
# They're still in ~/.claude/memory/ for reference
```

All your learning data (mirror-log.md, gaps-tracker, patterns, builds) is preserved.

---

## NEXT STEPS AFTER INSTALL

1. **Read CLAUDE.md** — Understand the constitution and principles
2. **Read the individual agent docs** — Learn what each does
3. **Run `/mirror` at end of next session** — Capture your first learning
4. **Run `/build-start` and `/build-complete`** — Practice the workflow
5. **Run `/audit --full`** — See full system health

---

**Welcome to Trident. You're now part of a self-improving system. Let's build something great.**
