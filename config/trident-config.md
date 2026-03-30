# Trident Configuration — Customization Options

**Status:** Optional | **Defaults:** Recommended | **Override:** Edit this file

This file controls how Trident behaves. All settings have sensible defaults. Only edit if you want to customize.

---

## MIRROR CONFIGURATION

**Signal Observation Level**
```
mirror_observation_level: "active"
# Options: "passive only" (minimal), "active (detailed)", "minimal"
# What it does: Controls how much Mirror tracks
# Recommendation: "active" (captures more learning)
```

**Signal Capture Frequency**
```
mirror_capture_frequency: "every-session"
# Options: "every-session", "daily", "manual"
# What it does: When Mirror writes output
# Recommendation: "every-session" (most learning)
```

**Auto-trigger on Build Complete**
```
mirror_auto_trigger: true
# Options: true, false
# What it does: Automatically run /mirror at end of /build-complete
# Recommendation: true (ensures learning is captured)
```

**Aggregation Frequency**
```
mirror_aggregation_frequency: "daily"
# Options: "hourly", "daily", "weekly", "manual"
# What it does: How often to recalculate gaps/patterns/corrections
# Recommendation: "daily" (fast enough, not too often)
```

---

## SCOUT CONFIGURATION

**Search Depth**
```
scout_search_depth: "deep"
# Options: "shallow" (fast), "deep" (thorough), "web-only", "team-only"
# What it does: How comprehensive Scout searches
# Shallow: Check installed + MCP only (1 min)
# Deep: All 5 sources (5-10 min)
# Web-only: Web search only (research)
# Team-only: Team patterns only (collaboration)
# Recommendation: "deep" (best solutions)
```

**Auto-trigger After Mirror**
```
scout_auto_trigger: true
# Options: true, false
# What it does: Automatically run Scout after Mirror finishes
# Recommendation: true (continuous improvement)
```

**Quality Threshold**
```
scout_quality_threshold: 48
# Range: 0-100
# What it does: Minimum relevance × quality to stage
# Higher = more selective, fewer candidates
# Lower = more candidates, some marginal
# Recommendation: 48 (balanced, or 50+ for strict selection)
```

**Security Mode**
```
scout_security_mode: "balanced"
# Options: "strict" (no risk), "balanced" (soft blocks allowed), "permissive"
# What it does: How aggressively to block risky candidates
# Strict: Block anything with any risk
# Balanced: Block hard risks, soft-block and ask for soft risks
# Permissive: Minimum blocks
# Recommendation: "balanced" (practical, safe)
```

**Team Priority**
```
scout_team_priority: true
# Options: true, false
# What it does: Prefer team solutions over external
# Recommendation: true (avoid dependency explosion, prefer internal)
```

---

## FACTORY CONFIGURATION

**Auto-trigger After Scout**
```
factory_auto_trigger: true
# Options: true, false
# What it does: Automatically build from Scout candidates
# Recommendation: true (continuous improvement)
```

**Build Threshold**
```
factory_quality_threshold: 65
# Range: 0-100
# What it does: Minimum Scout score to build immediately
# Higher score = immediate build
# Lower score = queue for review
# Recommendation: 65 (high quality) or 55 (more aggressive)
```

**Build Mode**
```
factory_build_mode: "balanced"
# Options: "aggressive" (build everything), "balanced", "conservative" (only high-quality)
# What it does: How many commands to build
# Aggressive: Build all 48+ candidates
# Balanced: Build 65+ immediately, stage 48-64 for review
# Conservative: Build 75+ only
# Recommendation: "balanced" (practical, maintains quality)
```

**Team Deduplication**
```
factory_team_dedup: true
# Options: true, false
# What it does: Check team before building duplicate
# Recommendation: true (avoid redundant work)
```

**Staging Review Window**
```
factory_staging_review_window: 30
# Range: 1-90 (days)
# What it does: Auto-discard staged commands if not reviewed in N days
# Recommendation: 30 (monthly review cycle)
```

**Deployment Approval**
```
factory_deployment_approval: "manual"
# Options: "auto-deploy-lowrisk", "manual"
# What it does: Require user approval before deploying
# Auto-deploy-lowrisk: Deploy automatically if score 75+
# Manual: Always ask user
# Recommendation: "manual" (stay in control)
```

---

## AUDITOR CONFIGURATION

**Passive Check Frequency**
```
auditor_passive_frequency: "every-session"
# Options: "every-session", "daily", "manual"
# What it does: When to run quick health check
# Recommendation: "every-session" (monitor continuously)
```

**Full Audit Frequency**
```
auditor_full_frequency: "weekly"
# Options: "daily", "weekly", "monthly", "manual"
# What it does: When to run 160-point deep assessment
# Recommendation: "weekly" (catch drift early)
```

**Emergency Threshold (Warning)**
```
auditor_score_threshold_warning: 120
# Range: 0-160
# What it does: Score <this triggers WARNING
# Recommendation: 120 (75% health)
```

**Emergency Threshold (Critical)**
```
auditor_score_threshold_critical: 100
# Range: 0-160
# What it does: Score <this triggers CRITICAL (stops deployments)
# Recommendation: 100 (62% health = something is broken)
```

**Emergency Mode Action**
```
auditor_emergency_mode_action: "stop-deployments"
# Options: "stop-deployments", "alert-only"
# What it does: If critical threshold hit, stop/alert
# Recommendation: "stop-deployments" (safety first)
```

**False Positive Tolerance**
```
auditor_false_positive_tolerance: "2%"
# Range: "1%" to "10%"
# What it does: Acceptable rate of incorrect flags
# Higher = more lenient, fewer false positives
# Lower = stricter, catches more edge cases
# Recommendation: "2%" (balanced)
```

---

## BUILD CONFIGURATION

**Auto-track Time**
```
build_auto_track: true
# Options: true, false
# What it does: Automatically measure time spent per build
# Recommendation: true (useful for estimation)
```

**Pause Other Agents During Build**
```
build_pause_other_agents: false
# Options: true, false
# What it does: Pause Scout/Factory while in /build-start ... /build-complete
# Recommendation: false (let them run, they enhance builds)
```

**Enhanced Observation Level**
```
build_enhanced_observation_level: "detailed"
# Options: "minimal", "detailed", "comprehensive"
# What it does: How much extra detail Mirror captures during builds
# Minimal: Standard 6 signals only
# Detailed: Add architecture, decisions, time breakdown
# Comprehensive: Everything + integration points + gotchas
# Recommendation: "detailed" (good learning without overhead)
```

**Pattern Generation**
```
build_pattern_generation: true
# Options: true, false
# What it does: Auto-generate Build Patterns from /build-complete
# Recommendation: true (extract learning)
```

**Pattern Quality Threshold**
```
build_pattern_quality_threshold: 3
# Range: 1-5
# What it does: Pattern marked as "draft" if quality <this
# Quality 3-5: Ready to share
# Quality 1-2: Needs improvement before promoting
# Recommendation: 3 (balanced)
```

**Auto-promote Patterns**
```
build_pattern_auto_promote: false
# Options: true, false
# What it does: Automatically promote patterns to team
# Recommendation: false (review before sharing)
```

---

## SELF-LEARNING CONFIGURATION

**Auto-trigger**
```
self_learning_auto_trigger: false
# Options: true, false
# What it does: Automatically review signals weekly
# Recommendation: false (manual review is better)
```

**Review Frequency (if auto-triggered)**
```
self_learning_frequency: "weekly"
# Options: "daily", "weekly", "monthly"
# What it does: How often to auto-review if enabled
# Recommendation: "weekly" (Friday end-of-week)
```

**Fast-track Threshold**
```
self_learning_fast_track_threshold: 3
# Range: 1-10
# What it does: Promote signal immediately if it appears N times
# Lower = more aggressive promotion
# Higher = only promote proven patterns
# Recommendation: 3 (good balance)
```

**Confidence Threshold**
```
self_learning_confidence_threshold: 4
# Range: 1-5
# What it does: Auto-promote if confidence 4+
# 5 = certain (auto-promote)
# 3-4 = very likely (consider promoting)
# 1-2 = uncertain (hold for more data)
# Recommendation: 4 (high confidence only)
```

**Size Limit**
```
self_learning_size_limit: 100
# Range: 50-200
# What it does: Max entries before auto-pruning
# Lower = more aggressive pruning
# Higher = keep more history
# Recommendation: 100 (good balance)
```

**Retention Period**
```
self_learning_retention_days: 90
# Range: 30-365 (days)
# What it does: Auto-prune entries older than N days
# Recommendation: 90 (3 months = good window)
```

---

## DATA SYNC CONFIGURATION

**Session Capture Frequency**
```
data_capture_frequency: "every-session"
# Options: "every-session", "daily", "manual"
# What it does: When to save session data locally
# Recommendation: "every-session" (always safe)
```

**Supabase Sync Frequency (if enabled)**
```
data_supabase_sync_frequency: "daily"
# Options: "hourly", "daily", "weekly", "manual"
# What it does: When to sync to Supabase
# Hourly = real-time, uses bandwidth
# Daily = good for team learning, efficient
# Weekly = minimal bandwidth, delayed insights
# Recommendation: "daily" (good balance)
```

**Supabase Sync Behavior**
```
data_supabase_sync_behavior: "non-blocking"
# Options: "non-blocking" (async), "blocking" (wait for sync)
# What it does: Should Trident wait for Supabase?
# Non-blocking = fast, Supabase syncs in background
# Blocking = ensures sync, might delay response
# Recommendation: "non-blocking" (don't interrupt workflow)
```

**Local Data Retention**
```
data_local_retention_days: 180
# Range: 30-365 (days)
# What it does: Keep local copies for N days before archiving
# Recommendation: 180 (6 months = good history)
```

---

## TEAM CONFIGURATION

**Team Mode** (from user_identity.md, reference here)
```
team_mode: false
# Options: true (enabled), false (solo)
# What it does: Enable cross-user learning
# Recommendation: false if solo, true if team
```

**Team Sync Frequency** (if team mode enabled)
```
team_sync_frequency: "daily"
# Options: "hourly", "daily", "weekly", "manual"
# What it does: When to sync team patterns and learning
# Recommendation: "daily"
```

**Share Your Patterns**
```
team_share_patterns: "aggregated"
# Options: "yes" (raw), "aggregated" (patterns only), "no" (private)
# What it does: What gets shared with team
# Yes = everything
# Aggregated = patterns and learning, not session details
# No = private, see team patterns but don't share
# Recommendation: "aggregated" (learn together, keep sessions private)
```

**Cross-User Learning Consent**
```
team_cross_user_learning: true
# Options: true (enabled), false (disabled)
# What it does: Allow Trident to learn from team signals
# Recommendation: true (if team mode enabled)
```

---

## NOTIFICATION CONFIGURATION

**Notification Method**
```
notifications_method: "cli-output"
# Options: "cli-output" (terminal), "email", "slack", "none"
# What it does: How Trident alerts you
# Recommendation: "cli-output" (instant, in terminal)
```

**Notification Frequency**
```
notifications_frequency: "end-of-session"
# Options: "immediate", "end-of-session", "daily-digest", "weekly-digest"
# What it does: When to send alerts
# Immediate = ping you during session (distracting)
# End-of-session = one summary at end
# Daily/weekly = batched reports
# Recommendation: "end-of-session" (minimal disruption)
```

**What to Include in Reports**
```
notifications_include:
  - "gaps-and-recommendations"
  - "build-patterns"
  - "quality-trends"
  - "cross-user-learning"
# Pick which sections to include in notifications
# Recommendation: Include everything (brief summary)
```

---

## ADVANCED CUSTOMIZATION

**Custom Command Templates**
```
factory_template: "default"
# Options: "default", "custom"
# What it does: Use custom templates for new commands
# Recommendation: "default" (proven format)
```

**Custom Signal Types**
```
custom_signals: []
# Example:
# custom_signals:
#   - type: "Architecture Decision"
#     description: "Major design choices and tradeoffs"
#   - type: "Customer Feedback"
#     description: "Direct feedback from clients"
# Recommendation: Keep empty unless you have special needs
```

**Custom Sources (Team)**
```
custom_sources: []
# Example:
# custom_sources:
#   - name: "Internal Commands Repo"
#     type: "git"
#     url: "git@github.com:company/commands.git"
# Scout will search these in addition to public sources
```

---

## DEFAULTS (RECOMMENDED)

If you want sensible defaults without customizing, use this:

```yaml
mirror_observation_level: "active"
mirror_capture_frequency: "every-session"
mirror_auto_trigger: true
mirror_aggregation_frequency: "daily"

scout_search_depth: "deep"
scout_auto_trigger: true
scout_quality_threshold: 48
scout_security_mode: "balanced"
scout_team_priority: true

factory_auto_trigger: true
factory_quality_threshold: 65
factory_build_mode: "balanced"
factory_team_dedup: true
factory_staging_review_window: 30
factory_deployment_approval: "manual"

auditor_passive_frequency: "every-session"
auditor_full_frequency: "weekly"
auditor_score_threshold_warning: 120
auditor_score_threshold_critical: 100
auditor_emergency_mode_action: "stop-deployments"
auditor_false_positive_tolerance: "2%"

build_auto_track: true
build_pause_other_agents: false
build_enhanced_observation_level: "detailed"
build_pattern_generation: true
build_pattern_quality_threshold: 3
build_pattern_auto_promote: false

self_learning_auto_trigger: false
self_learning_frequency: "weekly"
self_learning_fast_track_threshold: 3
self_learning_confidence_threshold: 4
self_learning_size_limit: 100
self_learning_retention_days: 90

notifications_method: "cli-output"
notifications_frequency: "end-of-session"
```

---

## HOW TO USE THIS FILE

**To customize one setting:**
```
1. Find the setting above
2. Change the value
3. Save this file
4. Run /audit to apply changes
```

**To customize multiple settings:**
```
1. Edit all settings at once
2. Save the file
3. Run /audit --full to verify
```

**To reset to defaults:**
```
1. Delete this file
2. Run /trident-install
3. New defaults will be created
```

---

**These settings fine-tune Trident's behavior. Defaults are recommended for most users.**
