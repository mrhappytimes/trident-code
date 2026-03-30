# Factory — Command Creation & Composition

**Agent:** Factory (3 of 4) | **Trigger:** Auto (after Scout) or manual (`/factory`) | **Runtime:** 3-15 min

---

## WHAT FACTORY DOES

Factory takes Scout's staged candidates and builds production-ready Claude Code commands. It operates in two modes:

1. **Skill Creation** — Writes entirely new commands from Scout candidates
2. **Agent Composition** — Chains existing commands into workflows for complex problems

Every new command runs through constitutional review (all 10 principles), cross-user deduplication, and staging before deployment.

---

## FACTORY'S TWO MODES

### MODE 1: SKILL CREATION

Build a brand-new command from scratch.

**When to use:**
- Scout found a gap with no existing solution
- Building a custom tool unique to your workflow
- Automating a repetitive process

**Example:**
```
Scout staged: "RAG evaluation framework"
Mode: Skill Creation
Factory builds: evaluate-rag.md (new command)
Steps:
  1. Design command signature
  2. Write implementation
  3. Add examples
  4. Constitutional review
  5. Stage to factory-staging/
```

**Result:** New command ready for user review and deployment.

---

### MODE 2: AGENT COMPOSITION

Chain existing commands into a larger workflow.

**When to use:**
- Scout found multiple small solutions that work together
- Need to orchestrate multiple commands
- Building a complex business process

**Example:**
```
Scout staged: "Slack notification", "Email notification", "Build logging"
Mode: Agent Composition
Factory composes: notify-and-log.md (workflow command)
Steps:
  1. Reference existing commands
  2. Define workflow sequence
  3. Add coordination logic
  4. Constitutional review
  5. Stage to factory-staging/
```

**Result:** New workflow command that chains simpler commands.

---

## FACTORY WORKFLOW (STEP-BY-STEP)

### 1. READ SCOUT CANDIDATES
Factory reads `~/.claude/memory/scout-candidates/` and picks top candidates:
- Score ≥65/100 (high quality) → immediate build
- Score 48-64/100 (good) → prioritize
- Score <48 → skip (Scout threshold already filtered these)

### 2. CROSS-USER DEDUPLICATION CHECK
Before building, Factory checks: "Has another team member solved this?"

**Process:**
```
Candidate: "Stripe Payment Integration"
Check team-registry for similar commands:
  - James built "Stripe Invoice Generator" 3 months ago
  - Brandon requested Stripe in Feb (not built yet)
Factory decision:
  - Reference James's command
  - Extend it rather than duplicate
  - Tag James as cross-reference
  - Mention Brandon in deployment notes
```

**Benefits:**
- Avoids reinventing the wheel
- Reduces total command count (3 small commands beat 10 duplicates)
- Enables team knowledge sharing

### 3. COMMAND DESIGN

Factory sketches the command structure:

```markdown
# Command Name
## Input
- Required parameters
- Optional parameters
## Output
- What it returns
- Format (JSON, markdown, etc.)
## Examples
- 1-2 real-world usage examples
## Dependencies
- Other commands, MCP, plugins
- External services needed
## Error Handling
- What goes wrong
- How to recover
```

### 4. IMPLEMENTATION

Factory writes the full command code/instructions.

**Command anatomy for Claude Code:**

```markdown
# [Command Name]

**Purpose:** [1-2 sentence description]
**Input:** [Parameters]
**Output:** [What it returns]
**Trigger:** `/[command-name]` or auto

## How to Use

[Step-by-step instructions]

## Examples

```
[Example 1]
```

[Example 2]

## Implementation

[Detailed implementation instructions for Claude to follow]

## Error Handling

[What can go wrong and how to handle it]

## Configuration

[Any customization options]

## Dependencies

[Other commands, MCP, plugins, external services]

## Troubleshooting

[Common issues and solutions]
```

### 5. CONSTITUTIONAL REVIEW

Factory audits the command against all 10 Constitutional Principles:

```
✓ Principle 1: User Control Is Absolute
  Check: Does command require approval before executing? YES
  ✓ PASS

✓ Principle 2: Security By Default
  Check: Any sensitive data? Credentials? PII?
  - Uses API key (soft block, user reviews)
  ✓ PASS (with soft block noted)

✓ Principle 3: Transparency in Reasoning
  Check: Is reasoning visible? Yes, command explains each step
  ✓ PASS

... [repeat for all 10 principles]

Final Review Score: 9/10 (one soft block on API key handling)
Clearance: Approved for staging
```

### 6. CROSS-REFERENCE & TEAM TAGGING

Factory adds cross-references:

```markdown
## Cross-References

- **Related commands:** stripe-invoices.md (James), payment-logging.md (Brandon)
- **MCP dependencies:** Stripe official MCP v2.1+
- **Team knowledge:** James has production experience with Stripe + webhooks
- **Known limitations:** Stripe API rate limits (100 req/min), plan for throttling

## Team Deployment Notes

- Coordinate with James for webhook setup
- Check Brandon's logging pattern for consistency
- Update team-registry with new command
```

### 7. STAGING

Command staged to `~/.claude/memory/factory-staging/`:

```
factory-staging/
├── stripe-verification.md       (new command, ready for review)
├── rag-evaluator-workflow.md    (composed workflow, ready for review)
└── slack-integration-enhanced.md (extended from existing)
```

**Staging metadata:**
```markdown
# Deployment Checklist

- [ ] User reviewed command
- [ ] User approved deployment
- [ ] User tested (optional but recommended)
- [ ] Move to .claude/commands/
- [ ] Run /audit to verify
- [ ] Update trident-changelog.md
```

### 8. DEPLOYMENT

User reviews staged command, approves, then:

```bash
# Move from staging to active
cp ~/.claude/memory/factory-staging/stripe-verification.md ~/.claude/commands/stripe-verification.md

# Update changelog
echo "Deployed: stripe-verification.md (Relevance:9, Quality:8, BuildTime:30min)" >> ~/.claude/memory/trident-changelog.md

# Verify
/audit
```

---

## CONSTITUTIONAL REVIEW CHECKLIST

Factory verifies every command:

**Principle 1: User Control**
- Does the command require explicit approval? ✓
- Can user disable/remove it? ✓
- Does it execute without permission? ✗ (FAIL)

**Principle 2: Security By Default**
- Any credentials exposed? ✗
- PII handled securely? ✓
- Can it modify system files? ✗
- Clear security warnings? ✓

**Principle 3: Transparency**
- Is reasoning visible? ✓
- Are assumptions documented? ✓
- Is error handling clear? ✓

**Principle 4: Knowledge Compounds**
- Cross-referenced to team? ✓
- Marked if another user solved similar? ✓
- Avoids duplication? ✓

**Principle 5: First-Order Effects**
- All side effects documented? ✓
- Supabase writes mentioned? ✓
- Team notifications listed? ✓

**Principle 6: Data Permanence**
- Logged with timestamp? ✓
- Traceable to origin (Scout candidate)? ✓
- Rollback available? ✓

**Principle 7: Graceful Degradation**
- Handles missing dependencies? ✓
- Works offline? ✓
- Fails safely? ✓

**Principle 8: Human Rhythm**
- Respects timezone? ✓
- Won't interrupt deep work? ✓
- Notification timing appropriate? ✓

**Principle 9: Reversibility**
- Can be disabled? ✓
- Can be removed? ✓
- Previous version available? ✓

**Principle 10: Bias Toward Simplicity**
- Genuinely closes a gap? ✓
- Not feature creep? ✓
- Minimal, focused, clear? ✓

**Clearance:** 10/10 → Approved for staging

---

## FACTORY OUTPUT

All builds logged to `~/.claude/memory/trident-changelog.md`:

```markdown
## 2026-03-30

### Deployed: stripe-verification.md
- **Author:** Factory (from Scout candidate)
- **Source gap:** Stripe Payment Verification (Critical)
- **Relevance score:** 9/10
- **Quality score:** 8/10
- **Constitutional review:** 10/10
- **Build time:** 30 minutes
- **Cross-references:** James's stripe-invoices.md, Stripe official MCP
- **Status:** Approved and deployed

### Deployed: rag-evaluator-workflow.md
- **Author:** Factory (agent composition)
- **Source gaps:** RAG Chunking (High) + RAG Production (High)
- **Components:** evaluate-chunking.md + evaluate-quality.md + log-results.md
- **Constitutional review:** 9/10 (minor logging concerns noted)
- **Build time:** 45 minutes
- **Status:** Approved and deployed

### Skipped: email-notifications.md
- **Reason:** Quality score 42/100 (below 48 threshold), held for next Scout run
- **Status:** Monitoring for better candidates
```

---

## EXAMPLE: SKILL CREATION

**Input from Scout:**
```
Candidate: Stripe Payment Verification MCP
Score: 72/100
Description: Stripe MCP with verify(), charge(), refund()
How to use: Import API key, call functions
```

**Factory builds:**
```markdown
# Stripe Payment Verification

**Purpose:** Verify Stripe payments, charges, and handle refunds
**Trigger:** `/verify-stripe [payment_id]`

## How to Use

```bash
/verify-stripe payment_id=pi_1234567890
```

Returns payment status, timestamp, amount, customer info.

## Examples

Example 1: Verify payment before processing
```
/verify-stripe payment_id=pi_abc123
Output:
  Status: SUCCEEDED
  Amount: $99.99
  Customer: Acme Corp
  Timestamp: 2026-03-30T14:45:00Z
```

## Implementation

This command requires Stripe MCP connector. Setup:
1. Add your Stripe API key to .env
2. Load Stripe MCP
3. Call verify() with payment_id

## Error Handling

- Invalid payment_id → Returns 404
- API unavailable → Retry with backoff
- Rate limit → Queue request

## Configuration

- Max retries: 3
- Retry backoff: 2s, 4s, 8s
- Timeout: 10s

## Dependencies

- Stripe official MCP (v2.1+)
- API key from Stripe dashboard

## Cross-References

- James built stripe-invoices.md with similar pattern
- Related: payment-logging.md (Brandon)
- Webhook handling in stripe-webhook-processor.md

## Troubleshooting

**"API key invalid"** → Check .env, regenerate key on Stripe dashboard
**"Rate limited"** → Wait 60 seconds, check volume
**"Payment not found"** → Verify payment_id format (pi_XXXXXXX)
```

**Constitutional review:** 10/10 ✓

**Status:** Staged to factory-staging/stripe-verification.md

---

## EXAMPLE: AGENT COMPOSITION

**Input from Scout:**
```
Candidate 1: RAG Chunking Strategy (Score 70/100)
Candidate 2: RAG Quality Evaluation (Score 65/100)
Candidate 3: Evaluation Logging (Score 72/100)
```

**Factory composes:**
```markdown
# RAG Quality Pipeline

**Purpose:** End-to-end RAG evaluation: chunk → evaluate → log
**Trigger:** `/rag-quality-check [doc_path]`

## How to Use

```
/rag-quality-check doc_path=/path/to/document.txt
```

Returns quality score, recommendations, logged to database.

## Examples

[Example 1: Evaluate 10-page API documentation]
[Example 2: Batch evaluate multiple documents]

## Implementation

This is an agent composition that chains three commands:
1. `/rag-chunk` — Split document into chunks
2. `/evaluate-chunk` — Score each chunk
3. `/log-rag-results` — Save results

## Workflow

```
Input: document.txt
  ↓
/rag-chunk → chunks.json
  ↓
/evaluate-chunk → evaluations.json
  ↓
/log-rag-results → database
  ↓
Output: Quality report
```

## Error Handling

If /rag-chunk fails → Return error, don't proceed
If /evaluate-chunk fails → Log partial results, continue
If /log-rag-results fails → Keep local copy, retry on next sync

## Cross-References

- Builds on: rag-chunk.md, evaluate-chunk.md, log-rag-results.md
- Related: rag-production-patterns.md
- Team: Jack's RAG research, James's chunking strategy

## Dependencies

- Three component commands must be deployed first
- Requires database write access (for logging)
```

**Constitutional review:** 9/10 ✓ (noted: ensure partial failure handling is robust)

**Status:** Staged to factory-staging/rag-quality-pipeline.md

---

## FACTORY CONFIGURATION

Edit `~/.claude/config/trident-config.md`:

```
factory_auto_trigger: true # Auto-run after Scout completes
factory_quality_threshold: 65 # Score threshold for immediate build
factory_build_mode: "balanced" # "aggressive" (build everything), "balanced", "conservative" (only high-quality)
factory_team_dedup: true # Check team before building
factory_staging_review_window: 30 # Days before staging auto-discarded
factory_deployment_approval: "manual" # "auto-deploy-lowrisk", "manual" (user reviews)
```

---

## TROUBLESHOOTING

**Factory not building from staged candidates:**
- Check scout-candidates/ has content
- Check quality_threshold in config (try lowering to 55)
- Run `/factory --verbose` to see decision logic

**Command in factory-staging not deploying:**
- Check command is approved (all checkboxes checked)
- Check constitutional review passed
- Manually move to .claude/commands/ if needed
- Run `/audit` to verify

**Constitutional review failed:**
- Check audit-report.md for specific principle violations
- Edit the command to address violations
- Re-stage and review

**Cross-user references are wrong:**
- Check team-registry.md is accurate
- Run `/audit --refresh-team` to update

---

## ADVANCED: CUSTOM BUILD TEMPLATES

If you want Factory to build commands using custom templates:

1. Create template in `~/.claude/config/command-templates/[type].md`
2. Reference in `trident-config.md`: `factory_template: "custom"`
3. Factory uses template structure for all new builds

---

## NEXT STEPS

1. Scout stages candidates to scout-candidates/
2. Factory auto-reads and builds (or trigger `/factory`)
3. Review factory-staging/ for new commands
4. Move approved commands to .claude/commands/
5. Run `/audit` to verify deployment
6. Check trident-changelog.md for record

---

**Factory turns ideas into tools. Constitutional review keeps them safe.**
