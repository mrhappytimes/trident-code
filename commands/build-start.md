# Build Start — Client Work Marker

**Trigger:** Manual (`/build-start`) | **Runtime:** <1 min | **Effect:** Activates enhanced observation

---

## WHAT BUILD-START DOES

`/build-start` marks the beginning of client or project work and activates enhanced Mirror observation. Mirror captures more detail during builds so you can later extract reusable patterns.

---

## WHEN TO USE

- Starting client project work
- Beginning a major feature or deliverable
- Whenever you want deeper learning capture

---

## HOW TO USE

```bash
/build-start
```

Responds with form:

```
Client Project Build Initiation

Client Name: [FILL IN — e.g., "Acme Corp"]
Industry: [SELECT from 10 categories below]
Project Type: [SELECT from list below]
Platform: [SELECT from list below]
Scope: [BRIEF DESCRIPTION — e.g., "Build OAuth flow", "Audit database performance"]
```

### Industry Categories (Select one)

1. SaaS
2. Fintech / Finance
3. Healthcare
4. E-Commerce
5. Real Estate
6. Manufacturing
7. Education
8. Government / Public Sector
9. Media / Publishing
10. Other (specify)

### Project Types (Select one)

- Integration
- Data Pipeline
- API Design
- Frontend Build
- Backend Build
- Infrastructure
- Security / Compliance
- Performance Optimization
- Audit / Assessment
- Other (specify)

### Platforms (Select one)

- Vercel / Next.js
- Supabase / PostgreSQL
- AWS
- Google Cloud
- Azure
- Custom / Self-hosted
- Multiple platforms
- Other (specify)

---

## EXAMPLE

```
Client Project Build Initiation

Client Name: Acme Corp
Industry: SaaS
Project Type: API Design + Backend Build
Platform: Supabase + Vercel
Scope: Build OAuth2 flow with JWT token management, rate limiting, webhook handling
```

After submission:

```
✓ Build started: acme-corp-oauth-api
  ID: build_20260330_001
  Started: 2026-03-30 14:45:00

Enhanced Mirror observation active.
Mirror will capture extra detail during this session.

Pair with /build-complete at end of work to capture patterns.
```

---

## WHAT CHANGES DURING BUILD

**Normal session:**
- Mirror captures 6 standard signals (corrections, gaps, patterns, preferences, quality, activity)

**During build (enhanced):**
- Mirror captures all 6 signals PLUS:
  - Architecture decisions and tradeoffs
  - Testing strategy and quality gates
  - Deployment considerations
  - Client feedback and iterations
  - Time spent per module
  - Integration points and dependencies
  - Performance requirements and constraints

---

## LOGGING LOCATION

Build is logged to `~/.claude/memory/active-builds.md`:

```markdown
# Active Builds

## Acme Corp — OAuth API (build_20260330_001)
- **Started:** 2026-03-30 14:45:00
- **Client:** Acme Corp
- **Industry:** SaaS
- **Type:** API Design + Backend Build
- **Platform:** Supabase + Vercel
- **Scope:** OAuth2 flow with JWT, rate limiting, webhooks
- **Status:** IN PROGRESS
- **Mirror:** Enhanced observation active

---

[Next build...]
```

---

## ENDING THE BUILD

At the end of your work session:

```bash
/build-complete
```

This closes the build, captures final patterns, and logs everything.

---

## CONFIGURATION

Edit `~/.claude/config/trident-config.md`:

```
build_auto_track: true # Auto-track time spent
build_pause_other_agents: false # Pause Scout/Factory during build
build_enhanced_observation_level: "detailed" # "minimal", "detailed", "comprehensive"
```

---

## NEXT STEPS

1. Run `/build-start` when beginning client work
2. Fill in the form (takes <1 minute)
3. Do your work normally (Mirror captures extra detail)
4. Run `/build-complete` at the end
5. Check patterns-draft/ for captured patterns

---

**Build markers enable learning. Use them to capture patterns, not friction.**
