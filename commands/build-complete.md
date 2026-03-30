# Build Complete — Client Work Closure & Pattern Capture

**Trigger:** Manual (`/build-complete`) | **Runtime:** 2-3 min | **Effect:** Captures build patterns, triggers Mirror

---

## WHAT BUILD-COMPLETE DOES

`/build-complete` closes the build initiated by `/build-start`, captures reusable patterns discovered during the work, generates a Build Pattern for future reference, and auto-triggers Mirror to capture final learning signals.

---

## WHEN TO USE

- At the end of client project work
- After major feature completion
- When you want to extract learning before moving on

---

## HOW TO USE

```bash
/build-complete
```

Responds with capture form (8 fields):

```
Build Completion Capture

[1] What worked well?
[Description of successful approaches, tools, patterns]

[2] What didn't work?
[Blockers, rework cycles, gaps discovered]

[3] Key architectural decisions:
[Major tradeoffs and why you chose them]

[4] Patterns identified for reuse:
[Workflows, code patterns, processes that could be automated]

[5] Time breakdown (hours):
[Planning: X, Coding: X, Testing: X, Integration: X, Other: X]

[6] Confidence in approach (1-5):
[1 = uncertain, 5 = proven and reliable]

[7] Quality rating (1-5):
[1 = rough draft, 5 = production-ready]

[8] What to remember for next similar project:
[Lessons learned, gotchas, tips for next time]
```

---

## EXAMPLE COMPLETION

```
Build Completion Capture

[1] What worked well?
- Supabase for schema design (Claude could generate 90% correct SQL)
- JWT approach validated by production testing
- Rate limiting strategy prevented all abuse attempts in testing
- Client approved design without rework cycles

[2] What didn't work?
- GenUI components required 40% custom CSS override (too heavyweight)
- Webhook testing in Supabase was clunky (eventually used ngrok + curl)
- OAuth redirect flow had 3-iteration learning curve with client

[3] Key architectural decisions:
- SQLite offline cache vs Firebase sync: chose SQLite for simplicity and control
- JWT refresh vs session cookies: chose JWT for stateless API design
- Rate limiting algorithm: token bucket (simple and effective)

[4] Patterns identified for reuse:
- OAuth2 + JWT + Rate Limiting workflow (use for future API projects)
- Supabase schema generation from Claude prompts (reusable for data modeling)
- GenUI customization strategy (pre-plan CSS overrides to avoid rework)

[5] Time breakdown:
- Planning: 2 hours
- Coding: 8 hours
- Testing: 3 hours
- Integration + Client feedback: 2 hours
- Total: 15 hours (2 days)

[6] Confidence in approach (1-5):
4/5 — Approach is proven. Would do 90% the same next time. Minor tweaks to webpack config and OAuth redirect flow.

[7] Quality rating (1-5):
4/5 — Production-ready except for one edge case in token refresh (noted for v1.1). Client happy.

[8] What to remember:
- Start webhook testing early (took longest during integration)
- GenUI is powerful but CSS overrides are heavy — pre-estimate 40% custom work
- OAuth flow complexity is underestimated by 2-3 hours (build-in buffer)
- Supabase is fantastic for rapid prototyping, ask Claude to generate schemas first
```

---

## OUTPUT: BUILD PATTERN

Build completion auto-generates a Build Pattern and stages it to `~/.claude/memory/patterns-draft/`:

```markdown
# Build Pattern: SaaS OAuth API

**Source:** Acme Corp OAuth Build (build_20260330_001) | **Date:** 2026-03-30 | **Quality:** 4/5

## Pattern Overview

**Name:** SaaS OAuth2 + JWT + Rate Limiting API

**Use Case:** Building a secure, scalable OAuth2 authentication system with JWT tokens, rate limiting, and webhook handling.

**Applicable To:** Any SaaS platform needing user auth and API rate limiting.

**Estimated Time:** 15 hours (2 days)

**Confidence:** 4/5 (proven in production)

## Architecture

```
Client
  ↓
OAuth2 Flow (3-step redirect)
  ↓
JWT Generation (15min expiry, 7-day refresh)
  ↓
SQLite Offline Cache (fallback if API down)
  ↓
Rate Limiting (Token Bucket, 100 req/min)
  ↓
Webhook Handling (Stripe, SendGrid, custom)
```

## Time Breakdown

- Planning: 2h (Architecture, security review, client alignment)
- Coding: 8h (OAuth flow, JWT logic, rate limiter, integrations)
- Testing: 3h (Unit tests, integration tests, security tests)
- Client Integration: 2h (Feedback loops, redirects, edge cases)

## What Worked

- Supabase for schema generation (Claude wrote 90% of SQL correctly on first try)
- JWT refresh strategy prevented token staleness issues
- Rate limiting with token bucket algorithm was simple and effective
- Client approval without rework cycles (good planning paid off)

## What Didn't Work

- GenUI components required 40% custom CSS override (too heavyweight for this project)
- Webhook testing in Supabase was awkward (ngrok + curl better)
- OAuth redirect flow had 3 iterations with client before approval

## Key Decisions

**Decision 1: Offline Cache Strategy**
- Option A: Firebase Realtime Sync (cloud-dependent)
- Option B: SQLite Local Cache (no cloud dependency)
- **Chose B** because: Better control, faster, simpler offline support
- Tradeoff: Must handle sync conflicts manually

**Decision 2: Token Strategy**
- Option A: Session cookies (stateful, server-side sessions)
- Option B: JWT tokens (stateless, scalable)
- **Chose B** because: Stateless design required for distributed Vercel deployment
- Tradeoff: No server-side logout, must handle client-side token revocation

**Decision 3: Rate Limiting Algorithm**
- Option A: Fixed window (simple but unfair)
- Option B: Sliding window (fair but complex)
- Option C: Token bucket (simple and fair)
- **Chose C** because: Best balance of simplicity and fairness
- Tradeoff: Requires memory for per-user bucket state

## Patterns Extracted for Reuse

**Pattern 1: OAuth2 Setup**
- Step 1: Register OAuth app with provider (Google, GitHub, Microsoft)
- Step 2: Generate authorization URL with state token
- Step 3: Handle redirect callback, exchange code for token
- Step 4: Store JWT securely (httpOnly cookie or localStorage with caution)
- Reusable across: All SaaS platforms needing user auth

**Pattern 2: Supabase Schema Generation**
- Prompt Claude: "Generate Supabase schema for [domain] with [requirements]"
- Claude generates SQL with indexes, RLS policies, and relationships
- Copy SQL to Supabase editor, run migration
- Reusable across: Any data modeling task

**Pattern 3: Rate Limiting**
- Implement token bucket with: max_tokens, refill_rate, current_tokens
- Per-user or global buckets depending on use case
- Reject requests if tokens < 1, deduct on success
- Reusable across: Any API needing rate limiting

## Gotchas to Avoid

1. **Token refresh timing:** JWT expiry is short (15min), refresh tokens must be long-lived and secure. Miss this and users logout unexpectedly.
2. **OAuth redirect loops:** If redirect URI doesn't match exactly (even trailing slash), OAuth provider rejects. Test early.
3. **GenUI is heavy:** Don't use GenUI for simple forms. Use for complex dashboard layouts. Plan 40% custom CSS time.
4. **Webhook testing:** Stripe webhooks can't be tested locally easily. Use ngrok or Supabase functions for local testing.
5. **Rate limiting state:** Token bucket state must persist across requests. Use Redis or database, not memory.

## Integration Points

- Stripe webhooks: For payment events
- SendGrid webhooks: For email delivery status
- OAuth providers: Google, GitHub, Microsoft (configurable)
- Supabase: Schema and real-time functions
- Vercel: Deployment and edge middleware

## Dependencies

- Supabase (for auth and database)
- JWT library (jsonwebtoken, jose, or similar)
- Rate limiter library (redis, memorycache, or custom)
- OAuth SDK (Google, GitHub, Microsoft official SDKs)
- Optional: Stripe SDK, SendGrid SDK

## Next Project Checklist

When building similar SaaS OAuth:
- [ ] Plan OAuth flow with state tokens (prevent CSRF)
- [ ] Design JWT refresh strategy before coding
- [ ] Choose rate limiting algorithm early (affects performance)
- [ ] Budget 3+ hours for OAuth redirect debugging
- [ ] Test webhooks with ngrok early (not at the end)
- [ ] Avoid GenUI for forms, plan custom CSS
- [ ] Get client approval on architecture before coding

## Quality Notes

- Production-ready except: one edge case in token refresh (noted for v1.1)
- Code coverage: 85% (good for client work)
- Performance: <100ms OAuth flow, <10ms rate limiting check
- Security: CSRF protected, SQL injection prevented, XSS mitigated
- Scalability: Handles 1000 concurrent users (tested), vertical scaling only

## Promoted? NO — awaiting review and team feedback

[Promotion managed by /self-learning command]
```

---

## STAGING & PROMOTION

Build Pattern is staged to `~/.claude/memory/patterns-draft/`:

**Status:** Awaiting promotion

Patterns can be promoted to team knowledge via `/self-learning` command.

---

## AUTO-TRIGGERED MIRROR

Build completion automatically runs `/mirror` at the end to capture final learning signals:

```
Build completion triggered Mirror capture...

Build Pattern captured:
  Name: SaaS OAuth API
  Quality: 4/5
  Reusable components: 3

Session signals captured:
  Corrections: 2 (OAuth redirect debugging, token refresh edge case)
  Gaps: 1 (Webhook testing tooling)
  Patterns: 3 (OAuth flow, Supabase generation, rate limiting)
  Build-specific: Architecture decisions, time breakdown, quality metrics

Session Health Score: 18/20 (excellent build quality)

All learning logged to mirror-log.md and staged patterns to patterns-draft/
```

---

## LOGGING LOCATION

Build is closed in `~/.claude/memory/active-builds.md`:

```markdown
## Acme Corp — OAuth API (build_20260330_001)
- **Status:** COMPLETED
- **Started:** 2026-03-30 14:45:00
- **Completed:** 2026-03-30 20:15:00
- **Duration:** 5.5 hours (15 hours total work)
- **Quality:** 4/5
- **Confidence:** 4/5
- **Pattern:** SaaS OAuth API (staged to patterns-draft/)
- **Key Learning:** GenUI overhead, webhook testing timing, OAuth redirect debugging
```

---

## BUILD PATTERN LIFECYCLE

**Step 1: Capture** — `/build-complete` generates pattern (staged to patterns-draft/)

**Step 2: Review** — You review pattern (manually or via `/self-learning`)

**Step 3: Promote** — Pattern promoted from draft to team knowledge (via command or manual)

**Step 4: Reference** — Future builds reference pattern, Scout and Factory use it

**Step 5: Evolve** — As you do more builds, pattern improves (version 1.0 → 1.1 → 2.0)

---

## CONFIGURATION

Edit `~/.claude/config/trident-config.md`:

```
build_pattern_generation: true # Auto-generate patterns from builds
build_pattern_quality_threshold: 3 # Patterns <3/5 marked as draft-only
build_pattern_auto_promote: false # Don't auto-promote (manual review required)
build_time_tracking: true # Track and include time breakdown
```

---

## TROUBLESHOOTING

**Build pattern not generating:**
- Check that you ran `/build-start` at beginning (required)
- Check `~/.claude/memory/active-builds.md` has active entry
- Run `/build-complete` again, it should generate

**Pattern quality score seems wrong:**
- Check the 8-field completion form (quality and confidence scores affect overall rating)
- Review the pattern in patterns-draft/ and edit if needed

**Pattern not promoting to team:**
- Check patterns-draft/ contains pattern
- Run `/self-learning` to review and promote
- Or manually move to team knowledge location if desired

---

## NEXT STEPS

1. Run `/build-complete` at the end of client work
2. Fill out the 8-field capture form (takes 2-3 minutes)
3. Check patterns-draft/ for generated pattern
4. Review pattern and consider promoting to team knowledge
5. Use pattern in future similar projects

---

**Build completion extracts learning. Use it to compound knowledge across projects.**
