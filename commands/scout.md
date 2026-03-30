# Scout — Gap Research & Discovery

**Agent:** Scout (2 of 4) | **Trigger:** Auto (after Mirror) or manual (`/scout`) | **Runtime:** 2-5 min

---

## WHAT SCOUT DOES

Scout reads the latest gaps from Mirror and systematically searches for solutions. It checks installed commands, the MCP registry, the plugin ecosystem, web resources, and team knowledge — then stages the best candidates for Factory to build.

Scout runs automatically after Mirror (reading gaps-tracker.md), or you can trigger manually with `/scout`.

---

## SCOUT'S SEARCH SEQUENCE

Scout searches in this order:

### 1. CHECK INSTALLED COMMANDS
"Do we already have this?"

```
Is there a .claude/commands/ file that solves this gap?
If yes → Mark as "already solved, no action needed"
If no → Continue to step 2
```

**Time:** <5 seconds

**Example:**
- Gap: "Need Slack notification system"
- Check: Does `~/.claude/commands/slack-notify.md` exist?
- Result: Yes → Gap solved, no action needed

---

### 2. SEARCH MCP REGISTRY
"Is there a connector for this?"

Scout uses the Claude Code MCP registry to search for:
- Connectors to external services (Slack, GitHub, Stripe, etc.)
- Data integrations (databases, APIs, webhooks)
- Tool connectors (Zapier, Make, etc.)

**Time:** 30-60 seconds

**Example:**
- Gap: "Need Stripe verification MCP"
- Search: `mcp_registry.search("stripe")`
- Results: 2 Stripe connectors found, one has verify function
- Score: Relevance 9/10 (exact match), Quality 8/10 (well-maintained)

---

### 3. SEARCH PLUGIN ECOSYSTEM
"Is there an installed plugin for this?"

Scout checks Claude Code's available plugins (custom integrations, org-specific tools, community plugins).

**Time:** 30-60 seconds

**Example:**
- Gap: "RAG evaluation framework"
- Search: `plugin_registry.search("rag evaluation")`
- Results: 1 plugin found (RAG evaluator), community-built, 50+ users
- Score: Relevance 7/10 (good match), Quality 6/10 (community-maintained)

---

### 4. WEB SEARCH
"What's the current best practice?"

Scout searches the web for:
- New tools or libraries (current as of today)
- Best practices and patterns
- Workarounds and open-source solutions
- Tutorials and implementation guides

**Time:** 1-2 minutes

**Example:**
- Gap: "RAG production patterns"
- Search: `web.search("RAG production patterns 2026")`
- Results: 3 recent articles, 2 GitHub repos, 1 research paper
- Score: Articles 8/10 (current), GitHub repos 7/10 (active)

---

### 5. CROSS-USER PATTERN SEARCH
"Has a team member solved this?"

Scout checks team registry and team patterns (if team mode enabled).

```
Has another team member solved this gap?
- Brandon solved "Slack notifications" in Feb
- James solved "RAG chunking" in Mar
If found → Reference and prioritize (avoid duplication)
If not found → Continue
```

**Time:** <10 seconds

**Example:**
- Gap: "Stripe verification"
- Check: Team registry for "stripe" or "payment"
- Result: James solved similar gap 3 weeks ago
- Scout notes: "James has production Stripe integration, coordinate before rebuilding"

---

## SECURITY PRE-SCREEN

Before staging any candidate, Scout blocks solutions requiring:

**Hard blocks (never stage):**
- API keys, credentials, passwords required in setup
- Financial account information (bank details, SSN, payment methods)
- PII data collection (full name + email + address combos)
- System modification (file deletion, permission changes, registry edits)
- Unauthorized integrations (accessing user's private data without consent)

**Soft blocks (requires user approval to stage):**
- Data collection (analytics, usage tracking)
- Network sync (uploading data to external service)
- Plugin from unverified source
- Requires OAuth/sign-in

**Example:**
```
Candidate: "Stripe Verification Plugin"
Check: Does setup require API key?
Result: YES → Soft block (requires user approval)
Reason: API keys are sensitive, user must authorize
Action: Stages with warning, user reviews before Factory builds
```

---

## QUALITY SCORING

Scout scores every candidate: Relevance × Quality.

**Relevance (1-10):**
- 10: Exact match to gap description
- 8-9: Strong match, minor adaptation needed
- 6-7: Decent match, some workaround required
- 4-5: Partial match, significant workaround
- 1-3: Weak match, probably not useful

**Quality (1-10):**
- 10: Well-maintained, documented, used by many
- 8-9: Solid implementation, active support
- 6-7: Functional, occasional issues, limited docs
- 4-5: Basic functionality, needs work
- 1-3: Buggy, abandoned, poor quality

**Overall Score:** Relevance × Quality = 0-100

**Threshold for staging:** 48+ (4.8 × 10 or better)

**Examples:**
```
Candidate 1: Stripe MCP
- Relevance: 9 (exact match)
- Quality: 8 (well-maintained, 1000+ users)
- Score: 72/100 → STAGE

Candidate 2: Custom RAG Chunking Library
- Relevance: 7 (good match, needs adaptation)
- Quality: 6 (active development, sparse docs)
- Score: 42/100 → SKIP (below threshold)

Candidate 3: Brandon's Slack Integration Command
- Relevance: 8 (very similar use case)
- Quality: 9 (production-tested, documented)
- Score: 72/100 → STAGE (with cross-reference to Brandon)
```

---

## STAGING PROCESS

Scout stages all candidates ≥48/100 to `~/.claude/memory/scout-candidates/`:

**Format:**
```markdown
# Gap: [Gap Name]

**Score:** [Relevance × Quality] / 100

**Source:** [MCP registry | Plugin | Web | Team]

**Relevance:** X/10 — [Why this matches the gap]

**Quality:** X/10 — [Assessment of implementation quality]

**Description:** [2-3 sentence summary of what it does]

**How to use:** [Step-by-step setup and usage]

**Risks:**
- [Any security considerations]
- [Any compatibility issues]
- [Any dependencies]

**Cross-user notes:** [If another team member solved similar, reference here]

**Next step:** Factory builds from this candidate, or user approves/rejects
```

**Example:**
```markdown
# Gap: Stripe Payment Verification

**Score:** 72/100

**Source:** MCP registry (official Stripe team)

**Relevance:** 9/10 — Exactly matches gap requirement

**Quality:** 8/10 — Stripe-maintained, 1000+ active users, good docs

**Description:** Stripe MCP provides verify(), charge(), refund(), and webhook handling. Covers 95% of payment verification needs.

**How to use:**
1. Add API_KEY to .env
2. Import Stripe MCP via `/mcp add stripe`
3. Use verify() function in commands

**Risks:**
- API key required (soft block — user reviews before staging)
- Network-dependent (Stripe API must be reachable)
- Production implications (handle failures gracefully)

**Cross-user notes:** None on team (first request for this)

**Next step:** Factory will build Stripe-integration command
```

---

## SCOUT OUTPUT LOCATION

All staged candidates saved to `~/.claude/memory/scout-candidates/`:

```
scout-candidates/
├── gap-stripe-payment-verification.md
├── gap-rag-chunking-strategy.md
├── gap-slack-notifications.md
└── gap-genui-styling-framework.md
```

Factory reads this directory and builds commands from each candidate.

---

## SCOUT CONFIGURATION

Edit `~/.claude/config/trident-config.md` to customize Scout:

```
scout_search_depth: "deep" # "shallow" (fast), "deep" (thorough), "web-only", "team-only"
scout_auto_trigger: true # Auto-run after Mirror finishes
scout_quality_threshold: 48 # Minimum score to stage (0-100)
scout_security_mode: "balanced" # "strict" (no risk), "balanced" (soft blocks allowed), "permissive"
scout_team_priority: true # Prefer team solutions over external
```

---

## HOW SCOUT WORKS (STEP-BY-STEP)

1. **Trigger** — You run `/scout` or Mirror completes and auto-triggers Scout
2. **Read gaps** — Scout reads `~/.claude/memory/gaps-tracker.md` (ranked by priority)
3. **Top 5 gaps** — Scout takes the top 5 gaps (by frequency + recency + priority)
4. **For each gap:**
   - Check installed commands (5 sec)
   - Search MCP registry (60 sec)
   - Search plugins (60 sec)
   - Web search (2 min)
   - Check team patterns (10 sec)
   - Security pre-screen (10 sec)
   - Quality score (10 sec)
5. **Stage candidates** — All ≥48/100 candidates saved to scout-candidates/
6. **Report** — Scout prints summary:
   ```
   Scout Complete — 3 candidates staged
   - Stripe Verification (72/100) — MCP registry
   - RAG Chunking (54/100) — GitHub repo
   - Slack Integration (72/100) — Team (Brandon)

   Factory will review in next cycle.
   ```
7. **Factory reads** — Factory picks up staged candidates and builds commands

---

## EXAMPLE SCOUT SESSION

**Gaps to research:**
1. Stripe Payment Verification (critical, seen 3x)
2. RAG Chunking Strategy (high, seen 5x)
3. Email Notifications (medium, seen 1x)

**Scout search results:**

**Gap 1: Stripe Verification**
- MCP check: Found official Stripe MCP (72/100)
- Staged: Yes
- Status: Awaiting Factory build

**Gap 2: RAG Chunking**
- MCP check: No exact match
- Plugin check: RAG evaluator plugin found (54/100)
- Web search: 3 recent articles, 2 GitHub repos (70/100)
- Team check: Similar gap in James's notes, not exact solution
- Staged: 2 candidates (Web search result #1 is top priority)
- Status: Awaiting Factory composition

**Gap 3: Email Notifications**
- MCP check: Generic email MCP found (44/100) — below threshold
- Plugin check: No match
- Web search: Several solutions, none >48/100
- Staged: 0 candidates (all below quality threshold)
- Status: Hold for next Scout run (may improve as new tools released)

---

## INTEGRATION WITH FACTORY

After Scout stages candidates, Factory processes them:

```
Scout stages → scout-candidates/
    ↓
Factory reads → scout-candidates/
    ↓
Factory builds → factory-staging/
    ↓
User reviews → approves/rejects
    ↓
Approved → .claude/commands/
    ↓
Auditor verifies → audit-report.md
```

Scout doesn't build — it finds and qualifies. Factory builds from Scout's qualified list.

---

## CONFIGURATION: SEARCH DEPTH

**Shallow (fast):**
```
scout_search_depth: "shallow"
# Checks: installed commands → MCP only
# Time: 1 minute
# Use when: You need fast feedback, prefer existing tools
```

**Deep (thorough):**
```
scout_search_depth: "deep"
# Checks: all 5 sources (commands, MCP, plugins, web, team)
# Time: 5-10 minutes
# Use when: You need best possible solution, can wait
```

**Web-only (research):**
```
scout_search_depth: "web-only"
# Checks: web search only, skips MCP/plugins
# Time: 3 minutes
# Use when: You want current best practices, don't need ready-to-use
```

**Team-only (collaboration):**
```
scout_search_depth: "team-only"
# Checks: team patterns and existing team commands
# Time: <1 minute
# Use when: Team-first culture, avoid external dependencies
```

---

## TROUBLESHOOTING

**Scout staging nothing:**
- Check that gaps-tracker.md exists and has content
- Check quality_threshold isn't too high (try lowering to 40)
- Run with `--verbose` to see scoring for each candidate
- Gaps might be unsolvable (very niche, very new)

**Scout staging low-quality candidates:**
- Check quality_threshold is appropriate (default 48)
- Increase threshold to 55+ to be more selective
- Check that candidate descriptions are accurate (use `--verify`)

**Scout missing a tool I know exists:**
- MCP registry might be stale, try `--refresh-registry`
- Tool might be named differently, Scout search uses keyword matching
- Try web search with `--search "tool name"`

**Candidate got security blocked:**
- Check scout-candidates/ for "SOFT_BLOCK" note
- If it's legitimate, you can approve it: `claude --approve scout-candidates/[name].md`
- If it's dangerous, leave it blocked — Factory will skip it

---

## ADVANCED: CUSTOM SOURCES

If you have custom command sources (internal repo, private GitHub, custom registry):

1. Add to `~/.claude/config/trident-config.md`:
   ```
   custom_sources:
     - name: "Internal Repo"
       type: "git"
       url: "git@github.com:company/commands.git"
   ```

2. Scout will search these sources along with public MCP registry

3. Results weighted by source reliability (internal trusted more than community)

---

## NEXT STEPS

1. Run `/mirror` to generate gaps
2. Run `/scout` to search for solutions
3. Check `~/.claude/memory/scout-candidates/` for staged candidates
4. Wait for Factory to build, or manually trigger `/factory`
5. Review factory-staging/ for new commands

---

**Scout finds the answers. Factory builds the tools. Together, they close your gaps.**
