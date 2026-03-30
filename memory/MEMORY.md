# Memory Index — Trident for Claude Code

**Platform:** Claude Code CLI | **Status:** Template | **Auto-Updated:** Yes

This file is a quick reference to all memory files in `~/.claude/memory/`. Files below marked with **(auto-populated)** are updated by Trident agents as the system runs. You can read them anytime, but don't edit them manually — let the agents handle it.

---

## STRUCTURE

### User Identity
- **[user_identity.md](user_identity.md)** — Your name, role, team, timezone, preferences. EDIT THIS on first-run. After that, leave for Trident to update.

### Session Captures
- **mirror-log.md** (auto-populated) — Raw signals from each session: corrections, gaps, patterns, preferences, builds, quality scores
- **setup_complete.md** (auto-populated) — Boolean flag (true/false) indicating whether first-run setup is complete

### Gap & Pattern Tracking
- **gaps-tracker.md** (auto-populated) — Aggregated capability gaps by category, frequency, recency, priority
- **patterns-tracker.md** (auto-populated) — Recurring workflows, decision patterns, tool chains
- **corrections-tracker.md** (auto-populated) — Quality trends: types of mistakes, frequency, root causes

### Build Project Metadata
- **active-builds.md** (auto-populated) — Ongoing client projects: client name, industry, start date, status
- **patterns-draft/** (auto-populated) — Build patterns staged for promotion: what worked, decisions, reusable patterns

### Command Deployment & Learning
- **trident-changelog.md** (auto-populated) — Audit trail of all commands deployed, updated, removed, with dates and authors
- **factory-staging/** (auto-populated) — Commands pending user review before deployment
- **scout-candidates/** (auto-populated) — Gap solutions staged by Scout, waiting for Factory to build

### Team & Cross-User Intelligence
- **team-registry.md** (auto-populated) — All team members, roles, timezones, domains. Updated when new team members join.

### Health & Auditing
- **audit-report.md** (auto-populated) — Latest Auditor assessment: health score, flagged issues, agent status, timestamp

---

## HOW TO USE MEMORY

**Read-only usage (everyday):**
```bash
# Check Mirror's latest session analysis
cat ~/.claude/memory/mirror-log.md | tail -50

# Check current gaps
cat ~/.claude/memory/gaps-tracker.md

# Check what commands are staged for review
ls ~/.claude/memory/factory-staging/
cat ~/.claude/memory/factory-staging/[command-name].md

# Check latest audit
cat ~/.claude/memory/audit-report.md
```

**Edit-only for:**
- `user_identity.md` — First-run setup and profile updates
- `trident-config.md` — Customization options (if needed)

**Never edit manually:**
- mirror-log.md, gaps-tracker.md, patterns-tracker.md, audit-report.md, etc.
- These are owned by Trident agents. Editing breaks the system.

---

## FIRST-RUN SETUP

After installing Trident:

1. Edit `~/.claude/memory/user_identity.md`
   - Fill in: name, role, team, timezone, primary_domains, preferences
   - Save the file

2. Run `/audit`
   - Trident verifies setup
   - Sets `setup_complete: true` automatically

3. Run `/mirror`
   - Capture your first learning signal
   - This confirms the system is working

---

## FILE REFERENCE

| File | Type | Owned By | Update Frequency | Editable? |
|------|------|----------|------------------|-----------|
| user_identity.md | Config | You | First-run + as needed | **YES** |
| setup_complete.md | Status | Trident | Auto | NO |
| mirror-log.md | Data | Mirror agent | Each /mirror | NO |
| gaps-tracker.md | Data | Mirror agent | Daily | NO |
| patterns-tracker.md | Data | Mirror agent | Daily | NO |
| corrections-tracker.md | Data | Mirror agent | Daily | NO |
| active-builds.md | Data | Build agents | Per /build-start/complete | NO |
| patterns-draft/ | Data | Build agents | Per /build-complete | NO |
| trident-changelog.md | Audit | Factory agent | Per deployment | NO |
| factory-staging/ | Data | Factory agent | Per /factory | NO |
| scout-candidates/ | Data | Scout agent | Per /scout | NO |
| team-registry.md | Data | Trident | When team updated | NO |
| audit-report.md | Audit | Auditor agent | Per /audit | NO |

---

## DATA FLOW REFERENCE

```
User Session
    ↓
Mirror (passive observation)
    ↓
User runs /mirror (or end of /build-complete)
    ↓
Mirror writes to mirror-log.md
    ↓
Mirror aggregates to gaps-tracker.md, patterns-tracker.md, corrections-tracker.md
    ↓
Scout reads gaps-tracker.md
    ↓
Scout searches and stages to scout-candidates/
    ↓
Factory reads scout-candidates/
    ↓
Factory builds and stages to factory-staging/
    ↓
User reviews factory-staging/[command].md
    ↓
User moves to .claude/commands/ to deploy
    ↓
Factory logs to trident-changelog.md
    ↓
Auditor verifies in audit-report.md
```

---

## MEMORY SIZE MANAGEMENT

Trident auto-manages memory to keep systems performant:

- **mirror-log.md** — Keeps 500 latest entries (~2 weeks at normal usage). Older entries archived to Supabase (if enabled).
- **gaps-tracker.md** — Top 50 gaps by priority. Solved gaps moved to archive.
- **patterns-tracker.md** — Top 30 patterns by frequency. Stale patterns pruned monthly.
- **scout-candidates/** — Staging area only. Candidates moved to factory-staging/ or discarded after 7 days.
- **factory-staging/** — Review queue. Commands must be approved within 30 days or discarded. Zero leftovers.
- **active-builds.md** — Current projects only. Completed projects moved to archive after 90 days.
- **trident-changelog.md** — Permanent audit trail. Never pruned.

All archives available in Supabase (if enabled) for historical reference.

---

## TROUBLESHOOTING MEMORY

**Can't find a recent session in mirror-log.md:**
- Make sure you ran `/mirror` at session end
- Mirror only writes when explicitly triggered or when /build-complete runs

**Gaps aren't aggregating to gaps-tracker.md:**
- Check Mirror is capturing signals correctly: `cat ~/.claude/memory/mirror-log.md`
- Wait 1-2 minutes for aggregation to run
- Run `/audit` to trigger immediate aggregation

**Factory-staging has old commands:**
- Commands are auto-discarded after 30 days
- You can manually delete: `rm ~/.claude/memory/factory-staging/[old-command].md`
- Next audit will clean up

**Team-registry is blank:**
- It's auto-populated when you enable team mode
- If solo, it stays blank (that's fine)
- Add members manually if needed: edit team-registry.md, one per line

---

## EXPORTING MEMORY FOR BACKUP

```bash
# Backup all memory
cp -r ~/.claude/memory ~/backups/trident-memory-backup-$(date +%Y%m%d)

# Or sync to cloud
rsync -av ~/.claude/memory/ s3://my-bucket/trident-memory/
```

Trident doesn't auto-backup. Recommend monthly backups if using offline mode (no Supabase).

---

## NEXT STEPS

1. **First-run:** Edit user_identity.md with your info
2. **Verify:** Run `/audit` to confirm setup
3. **Capture:** Run `/mirror` at end of first session
4. **Monitor:** Check audit-report.md weekly
5. **Review:** Check factory-staging/ when commands are staged

---

**Memory files are Trident's brain. Take care of them, and they'll take care of you.**
