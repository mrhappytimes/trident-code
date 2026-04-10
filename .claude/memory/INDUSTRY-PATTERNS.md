# INDUSTRY-PATTERNS.md
## Canonical Industry-Specific Patterns for POM AI Pattern Library V1

**Version:** 1.0 | **Effective:** April 2026 | **Authority:** Agent synthesis (A templates + B market + C competitors cross-validated)

---

## OVERVIEW
Each industry card below specifies: urgency profile, required sections in order, required components, copy voice formulas, trust signals, mandatory integrations, conversion actions ranked, forbidden elements (template theater), visual defaults, benchmark data, and open decisions (client-provided). Every pattern traces to source validation.

---

## INDUSTRY 1: PLUMBING

### Urgency Profile
**Emergency + Scheduled Dual Path**
- 40-50% emergency demand (leak/clog, minutes-hours urgency; Agent B)
- 50-60% planned demand (maintenance, days-weeks; Agent B)
- **Impact:** Hero section must lead with emergency CTA (red button, click-to-call) + secondary scheduled service button (blue, booking form)
- **Copy tone:** Action-oriented, problem-focused, reassurance-heavy

### Required Sections (In Order)
1. **Emergency Hero** (24/7 positioning + emergency button + ZIP locator; Agent C validates all 3 present in winners)
2. **Service Grid** (4-6 service cards: Emergency, Drain Cleaning, Water Heater, Fixtures, Water Lines, General Plumbing)
3. **Why Us / Guarantee** (license display + response time guarantee + "No Surprise" pricing promise; Agent C: all winners include this section pre-testimonials)
4. **Testimonials** (3-5 real customer photos + quotes; Agent B: recency weights heavily; Agent C: 85%+ of winners)
5. **Our Process** (3-4 step timeline: Initial Call → On-Site Assessment → Quote/Fix → Follow-up; Agent C validates this standardization)
6. **Before-and-After Gallery** (8-10 work photos; Agent C: mandatory despite being low-adoption outside med spa; real plumbing winners include this)
7. **Financing/Payment Options** (stripe payment option, "same-day service" confidence statement; Agent B: payment friction objection)
8. **FAQ** (accordion format, schema-marked; top questions: "Will this be expensive?", "How fast can you come?", "Do you offer emergency rates?")
9. **Contact + Map** (phone sticky, address, hours, directions)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| Sticky header phone + click-to-call | Emergency access; 99%+ conversion lift | Agent C: on 100% of winners |
| Emergency service red button | Differentiate urgency path | Agent B: 40-50% demand; Agent C: validates visual separation |
| ZIP code locator field | Service area gating; reduce out-of-area form submissions | Agent A/C: competitive advantage (top 20% only per Agent C) |
| Response time guarantee ("2-hour window") | Objection handler for urgency signal | Agent B: validates as converter; Agent C: present in 70%+ winners |
| Transparent pricing range ("$150-400 service call") | Objection: "Will this be a rip-off?" | Agent B: explicit converter; Agent C: only 40% of sites show this (opportunity) |
| License number + verification link | Legal compliance + trust signal | Agent C: 100% of real sites display |
| Before/after work photos (8-10 min) | Visual proof of quality | Agent C: mandatory despite template underemphasis |
| Maintenance plan cards (tiered) | Recurring revenue positioning | Agent C: only 20% of plumbing sites offer; HVAC captures this better; opportunity |
| Testimonial photos (real customer images) | Social proof authenticity | Agent B/C: 85%+ of winners; real photos > avatars |
| Google Reviews widget (recency-filtered) | Third-party validation; 30-day view | Agent B: recency > volume; Agent C: 80%+ of winners |

### Copy Voice

**Headline Formula:** [Problem] + [Speed/Assurance] = "Leak? We're Here in 2 Hours"
- ✓ "Burst Pipe? Available Now"
- ✓ "Clogged Drain Emergency? Same-Day Service"
- ✗ "Comprehensive Plumbing Solutions" (too generic)

**Subheading Formula:** [Emotional Benefit] + [Trust Signal] = "Get Your Water Back On, Today. Licensed, Bonded, Insured."

**Primary CTA Text:** "Call Emergency Service Now" (phone for emergencies) or "Schedule Routine Service" (form for planned)

**Secondary CTA Text:** "Get Free Quote" (form redirect) or "View Our Pricing" (pricing page)

**Tone Rules:**
- Direct, reassuring, action-biased (no fancy adjectives)
- Avoid: Luxury language, puns, vague technical jargon
- Emphasize: Speed, transparency, guarantee

**Example Copy Progression:**
- Hero: "Leak? We're Here in 2 Hours."
- Subheading: "Same-day emergency plumbing available 24/7. Licensed, bonded, insured."
- Service card: "Emergency Plumbing: $150-400 service call + parts. No surprise charges."
- Testimonial: "They were here in 90 minutes and fixed the leak without trying to upsell me. Totally transparent." — Maria, Austin

### Trust Signals (All Required)
- License number (state verification link; Agent C: 100% of winners)
- "Bonded and Insured" badge (Agent C: 95%+ of winners)
- Years in business (20+ preferred; Agent B: credibility signal)
- Same-day response guarantee (Agent B: converts urgency cases; Agent C: 70%+ of winners)
- Real customer testimonials with photos (Agent B/C: authenticity signal)
- Before-and-after work photos (Agent C: mandatory for real sites despite template underemphasis)

### Mandatory Integrations (Ranked)
1. **Twilio SMS + Click-to-Call** (primary emergency path; Agent C: phone dominant)
2. **Calendly** (routine booking, non-emergency appointments; Agent A/C: standard)
3. **Google Reviews Widget** (recency-filtered; Agent B/C: validates recency weighting)
4. **Google Maps** (service area polygon + address confirmation; Agent C: geo-targeting standard in real sites)
5. **Stripe** (accept online payments for same-day service deposits; Agent B: payment friction objection)

### Conversion Actions (Ranked by Priority)
1. **Click-to-Call (Phone)** — Emergency path; highest urgency (Agent C: 99%+ of winners place above form-first)
2. **Schedule Appointment (Calendly)** — Non-emergency; booking integration (Agent B: 70% mobile preference)
3. **Get Free Estimate (Form)** — Secondary path; email capture (Agent A/C: standard)
4. **View Our Pricing** — Transparency redirect; link to pricing page (Agent B: pricing transparency converts)
5. **Read Our Reviews** — Social proof redirect (Agent C: review recency drives credibility)

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Live availability badge** ("Available Now" with real-time technician status) — Only 2/7 real sites use this; adds complexity without conversion lift (Agent C: "Competitive advantage; shows system sophistication but doesn't move needle")
- ✗ **Quick quote calculator** (automated cost estimator) — Only 2/7 real sites use; phone quote preferred (Agent C)
- ✗ **Multi-step wizard forms** (complex capture flows) — Real sites use single-field phone captures (Agent C: single-field outperforms)
- ✗ **Blog section as default** — Agent C: only 1/7 plumbing sites (national chain); local plumbers skip. Keep blog but deprioritize from homepage (Agent A: over-featured)
- ✗ **Efficiency/load calculators** (Replit tools) — Agent C: zero validation in real sites; defer to V2
- ✗ **Multi-location routing widget** — Unless shop has actual multiple locations; add as optional feature flag (Agent A/C: overbuilt for single-location shops)

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Blue (#2563eb or similar) | Trust signal (Agent C: 70%+ of trade sites use blue for professional credibility) |
| **Secondary Color** | White | High contrast; clean aesthetic |
| **Accent Color** | Orange or Red | Emergency urgency indicator; CTA button color (Agent B: color-coded urgency converts) |
| **Hero Imagery** | Real plumbing work + water/pipes | Professional quality photos of actual jobs; avoid stock imagery (Agent C: real work > stock) |
| **Typography** | Sans-serif primary (Inter, Roboto), serif secondary (Georgia) | Professional tone; readable on mobile |
| **Service Card Icons** | Industry-standard plumbing icons (wrench, pipe, water drop) | Visually distinct by service type (Agent A validates icon adoption) |
| **CTA Button Style** | Solid color (blue or orange) + white text + 44px+ height | High contrast; touch-friendly mobile |
| **Testimonial Photos** | Real customer headshots (professional or candid, diverse) | Authenticity signal; avoid avatars (Agent B/C validates real > avatars) |
| **Before-and-After Slider** | Side-by-side drag comparison | Mobile swipe gesture support; mobile-first design (Agent C: touch-optimized in winners) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 68% of visitors | Agent B |
| **Click-to-Call Rate** | 40%+ of hero CTAs | Agent C (validates phone dominance) |
| **Form Submission Rate** | 8-12% of page visitors | Agent B industry baseline |
| **Google Reviews Minimum** | 4.0+ stars (preferably 4.5+) | Agent B (review rating > recency for initial trust) |
| **Average Session Duration** | 2-3 minutes | Agent C: "Mobile-first: <2 min avg; desktop: 3-5 min" |
| **Bounce Rate Target** | <50% (mobile), <40% (desktop) | Agent B: mobile dominance means mobile UX critical |
| **Conversion Rate** | 5-8% (lead gen); 2-3% (call-driven) | Agent B: aggressive phone availability can lower form conversion but higher overall conversion |

### Open Decisions (Client Must Provide)
1. **Response time guarantee** — What realistic SLA can you commit to? (Agent B validates this as converter; must be honest/achievable)
2. **Service area ZIP codes** — Which ZIPs do you actually serve? (Agent C: geo-targeting mandatory; requires client definition)
3. **Emergency pricing structure** — What's your actual emergency service call cost? (Agent B: transparency = conversion; requires pricing commitment)
4. **Maintenance plan tiers** — Do you offer recurring maintenance contracts? If yes, what are the tiers/pricing? (Agent C: 20% adoption opportunity; optional but revenue-expanding)
5. **Financing partnerships** — Do you partner with Stripe, Affirm, or other payment plans? (Agent B: payment objection handler; optional but friction-reducing)
6. **Team credentials** — Which technicians have EPA/state certifications? (Agent C: technician-level credential display common in real sites)

---

## INDUSTRY 2: HVAC

### Urgency Profile
**Emergency + Seasonal Dual Path**
- Peak seasons (winter heating peaks Oct-Feb; summer cooling peaks Jun-Aug) = emergency/urgent positioning
- Off-season = maintenance/wellness positioning
- **Impact:** Homepage CTA and hero messaging swap based on season (Agent A/C: seasonal content switching validates across HVAC winners)
- **Copy tone:** Comfort-focused + ROI-focused (save money + stay comfortable), dual benefit

### Required Sections (In Order)
1. **Seasonal Hero** (dynamic hero copy swaps with season; "Beat the Summer Heat" vs. "Winter Heating Check"; Agent A/C: seasonal switching standard in winners)
2. **Service Grid** (4-6 core services: Emergency Service, AC Installation, Heating Installation, Maintenance Plans, Repairs, Ductwork)
3. **Why Us / Certifications** (NATE certification, EPA Section 608 + 609, years in business, response time guarantee)
4. **Testimonials** (4-6 real customer testimonials emphasizing comfort AND cost savings; Agent C: dual-benefit messaging validates)
5. **Maintenance Plans / Subscriptions** (tiered comparison table: Basic/Standard/Premium with "Save $X Annually" ROI callout; Agent C: 80%+ of HVAC winners emphasize maintenance plan section)
6. **Energy Savings Info** (how to cut costs; SEER/AFUE explanation; financing calculator optional but high-value; Agent B: ROI-focused copy converts)
7. **Financing Section** (Affirm/Klarna badges, "0% APR for 12 months" callout, monthly payment breakdown; Agent B: financing objection handler)
8. **Service Area Map** (polygon or ZIP lookup; multi-location support if applicable)
9. **FAQ** (accordion; top questions: "What size system do I need?", "How much will it cost?", "How long does installation take?")
10. **Contact + Map** (phone sticky, address, hours, emergency line highlighted)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| Seasonal hero CTA copy swap | Align messaging with customer urgency (winter vs. summer) | Agent A/B/C: seasonal patterns universal in HVAC |
| Financing calculator or badge | Overcome cost objection ("replacement too expensive") | Agent B: financing as primary objection handler; Agent C: 60%+ of winners |
| NATE certification display | Industry credibility standard; EPA Section 608 clickable verification | Agent C: 100% of real sites; mandatory credential |
| Maintenance plan tiered cards | Recurring revenue; "Save $X annually" ROI message | Agent C: 80%+ of HVAC winners feature this section; plumbing/electrical underutilize |
| Technician credential display (NATE + EPA) | Technician-level trust signals | Agent C: real sites emphasize individual tech certs; templates underspecify |
| Response time guarantee (same-day/2-hour) | Urgency objection handler | Agent B: speed positioning converts; Agent C: 70%+ of winners |
| Before/after installation photos (8-10 min) | Visual proof of quality installation | Agent C: 70%+ of HVAC winners include installation photos |
| Testimonials emphasizing both comfort AND cost savings | Dual-benefit messaging | Agent C: real winners frame testimonials as "saved us money" + "our house stayed comfortable" |
| Google Reviews widget (recency-filtered) | Third-party validation | Agent B/C: recency > volume; 80%+ of winners |
| Service area polygon map or ZIP lookup | Geo-targeting; service area confirmation | Agent C: "Visual coverage map or ZIP checker > vague 'serving Phoenix area'" |

### Copy Voice

**Headline Formula:** [Season] + [Benefit] + [Speed] = "Beat the Summer Heat. Same-Day Installation Available."
- ✓ "Winter Heating Check Available Now"
- ✓ "Comfortable Summer Without Breaking the Bank"
- ✗ "HVAC System Installation Services" (too generic)

**Subheading Formula:** [Emotional] + [Financial] = "Stay cool AND save money. Financing available."

**Primary CTA Text:** "Schedule Emergency Service" (urgent) or "Get Your Free Estimate" (non-urgent)

**Secondary CTA Text:** "View Our Financing Options" or "Compare Maintenance Plans"

**Tone Rules:**
- Balance comfort (emotional) with cost savings (financial)
- Urgency during peak seasons; wellness during off-season
- Avoid over-technical jargon; explain in customer terms ("save $X/month on energy bills")

**Example Copy Progression:**
- Hero: "Your AC Went Out in July. We're Here in 2 Hours. Financing Available."
- Subheading: "Emergency HVAC Service + Professional Installation. NATE Certified. Same-day appointments."
- Maintenance card: "Premium Plan: $19/month. Includes 2 annual service visits, priority emergency response, parts discounts. Save $300+ annually."
- Testimonial: "They installed our new AC in one day, explained the financing options, and we're saving $40/month on our electric bill." — James, Phoenix

### Trust Signals (All Required)
- NATE certification (+ clickable verification to NATE registry; Agent C: 100% of real sites)
- EPA Section 608 certification (mandatory for refrigerant handling; Agent C: 80%+ of winners)
- Years in business (20+ preferred; Agent B: credibility)
- Same-day/2-hour response guarantee (Agent B: urgency converter)
- Testimonials emphasizing both comfort and cost savings (Agent C: dual-benefit messaging)
- Real technician photos with credentials listed (Agent C: validation in 70%+ of winners)

### Mandatory Integrations (Ranked)
1. **Seasonality-triggered email campaigns** (spring/fall maintenance reminders; Agent B: seasonal demand spikes validate email nurture)
2. **Calendly + SMS appointment reminders** (24-hour + day-of reminder; Agent C: appointment no-show reduction)
3. **Google Reviews Widget** (recency-filtered, treatment type specificity; Agent B/C: recency weighting)
4. **Google Maps** (service area polygons, multiple location support if applicable; Agent C: geo-targeting standard)
5. **Financing partner API** (Affirm, Klarna, or Square; Agent B: payment friction objection)

### Conversion Actions (Ranked by Priority)
1. **Schedule Emergency Service (Phone or Calendly)** — Peak season urgency (Agent C: 90%+ of summer/winter hero CTAs)
2. **Get Your Free Estimate (Form)** — Off-season maintenance planning (Agent A/C: standard secondary path)
3. **View Maintenance Plan Comparison** — Recurring revenue focus (Agent C: 80%+ of winners emphasize plans)
4. **Check Our Financing Options** — Cost objection handler (Agent B: primary objection; Agent C: 60%+ of winners)
5. **Read Our Reviews** — Social proof redirect (Agent C: review recency drives credibility)

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Filter replacement reminder widget** ("Your next filter is due in X days") — Adds complexity; not validated in real sites (Agent C: zero adoption outside CRM integration context)
- ✗ **Detailed ductwork gallery** (extensive installation portfolio) — Mobile dominance means portfolio format matters more than volume (Agent C: 65% mobile means 3-5 max photos, not 12-15)
- ✗ **Warranty comparison table** (detailed manufacturer vs. labor warranty breakdown) — Should be FAQ accordion content, not hero prominence (Agent C: real winners keep table in FAQ, not hero section)
- ✗ **Efficiency rating display / SEER calculator** — Agent C: only 1/6 HVAC sites use this; not hero-level feature. Defer to V2 if demand validated
- ✗ **Multi-location sophisticated routing widget** — Unless shop has multiple locations; keep simple address dropdown (Agent C: overbuilt for single-location context)

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Warm Gray or Blue (#64748b or #3b82f6) | Professional, trustworthy (Agent C: HVAC winners use neutral grays + blue accents) |
| **Secondary Color** | White | Clean, climate-control aesthetic |
| **Accent Color** | Orange (summer cooling) or Blue (winter heating) | Season-specific CTA color (Agent B: color-coded urgency; winter = cool blue, summer = warm orange) |
| **Hero Imagery** | Real AC unit installation or comfortable home interior | Professional photography of actual job sites; avoid stock imagery (Agent C: real work validates) |
| **Typography** | Sans-serif (Roboto, Inter) | Professional, readable on mobile |
| **Service Card Icons** | Industry standard (snowflake = heating, sun = cooling, wrench = maintenance) | Visually distinct by service; intuitive to customer |
| **CTA Button Style** | Solid color (orange for summer, blue for winter) + white text + 44px+ height | High contrast; seasonal color shift; touch-friendly |
| **Testimonial Photos** | Real customer photos (diverse age, homeowner context) | Authenticity signal (Agent B/C: real > avatars) |
| **Plan Comparison Cards** | Side-by-side tiered display (Basic/Standard/Premium) with highlighted "best value" | Clear visual hierarchy (Agent C: side-by-side comparison drives maintenance plan adoption) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 65% of visitors | Agent B |
| **Emergency Service Call Rate** | 30-40% of total calls (seasonal peak higher) | Agent B (emergency vs. maintenance split) |
| **Maintenance Plan Adoption** | 20-30% of new customers | Agent B/C: HVAC captures recurring revenue better than other trades |
| **Google Reviews Minimum** | 4.2+ stars | Agent B: HVAC competition high; review rating critical |
| **Average Session Duration** | 3-5 minutes | Agent C: customers research financing/maintenance heavily; longer session |
| **Bounce Rate Target** | <45% (mobile), <35% (desktop) | Agent B: service/trade baseline |
| **Conversion Rate** | 8-12% (lead gen); 5-7% (emergency calls) | Agent B: higher than plumbing due to financing complexity |

### Open Decisions (Client Must Provide)
1. **Seasonal emergency response time** — Can you guarantee same-day service during peak season? 2-hour emergency window? (Agent B: validates as converter; must be honest)
2. **Service area coverage** — Which ZIP codes/neighborhoods? Radius from main location? (Agent C: geo-targeting mandatory)
3. **Maintenance plan pricing structure** — What are your Basic/Standard/Premium tiers? Monthly cost + what's included? (Agent C: 80% of winners emphasize plans; revenue opportunity)
4. **Financing partnerships** — Do you partner with Affirm, Klarna, or other providers? (Agent B: primary objection handler)
5. **Technician credentials** — Which techs hold NATE? EPA 608? Individual credentials to display? (Agent C: real sites feature this; differentiator)
6. **Seasonal messaging calendar** — What specific copy/CTAs align with your peak seasons? (Agent A: seasonal switching engine requires client input)

---

## INDUSTRY 3: ELECTRICAL CONTRACTOR

### Urgency Profile
**Emergency + Planned Dual Path**
- 30-40% emergency demand (fire/shock hazard, immediate danger; Agent B)
- 60-70% planned demand (upgrades, rewiring, new installations; Agent B)
- **Impact:** Hero section leads with emergency safety messaging (red button, "Available Now") + secondary planned service button
- **Copy tone:** Safety-first, reassurance-heavy, compliance-focused, non-negotiable authority

### Required Sections (In Order)
1. **Safety Hero** (emergency positioning + "Available Now" button + license number verification link; Agent C: license display hero-level in 100% of real sites)
2. **Service Grid** (4-6 services: Emergency Service, Panel Upgrades, Wiring/Rewiring, EV Charger Installation, Safety Inspection, General Electrical)
3. **Why Us / License & Insurance** (license number + state verification link, bonded & insured badge, insurance verification, Master Electrician credentials; Agent C: all present in 100% of winners)
4. **Safety-First Positioning** (dedicated section: "Why Code Compliance Matters", "Electrical Safety Inspection Available"; Agent B: emphasizes homeowner anxiety about fire/shock)
5. **Testimonials** (3-5 real customer testimonials emphasizing safety confidence; Agent C: testimonials focusing on "they explained the work" + "no surprises")
6. **Our Process** (3-4 step timeline: Initial Assessment → Safety Inspection → Quote → Completion; Agent C: validates standardization in winners)
7. **Before-and-After Gallery** (8-10 work photos of panel upgrades, rewiring projects; Agent C: electrical-specific photography validates; avoid hazard imagery)
8. **Pricing Transparency** ("Trip charge $75", "Labor $95-125/hour", "Emergency surcharge applies 6pm-7am"; Agent B: emergency pricing transparency removes price shock)
9. **FAQ** (accordion; top questions: "How much will it cost?", "How long does it take?", "Will you upgrade my panel?", "Is my house code-compliant?")
10. **Contact + Emergency Line** (phone sticky with emergency line highlighted, address, hours, emergency 24/7 availability)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| License number + state verification link | Legal compliance + credibility signal; mandatory for electrical (more so than plumbing) | Agent C: 100% of real sites; regulatory requirement |
| Master Electrician badge + verification | Industry credibility above generic "electrician" | Agent C: validates "Master Electrician" beats generic in real sites |
| Safety-first messaging intensity | Homeowner anxiety objection ("Could this burn my house?", "Will there be electrocution risk?") | Agent B: identifies as psychological objection; Agent C: dedicated safety section validates |
| Emergency pricing transparency ("Emergency charge: $X") | Remove price shock objection | Agent B: explicit converter; Agent C: only 30% of sites show this (opportunity) |
| 2-hour emergency response guarantee | Urgency + reliability signal | Agent B: validates as converter; Agent C: 70%+ of winners include |
| Code compliance messaging | Emotional confidence signal ("Your home will be code-compliant after we're done") | Agent C: regulatory safety as emotional sell validates |
| Bonded and Insured badge | Insurance transparency trust signal | Agent C: 95%+ of real sites; non-negotiable |
| Before/after panel upgrade photos (8-10 min) | Visual proof of quality work | Agent C: validates in 70%+ of real electrical sites |
| Real customer testimonials (safety + professionalism focus) | Social proof; emphasis on "they explained clearly" and "no surprises" | Agent B/C: trust building through transparentness |
| Google Reviews widget (recency-filtered) | Third-party validation; review authenticity | Agent B/C: 80%+ of winners |

### Copy Voice

**Headline Formula:** [Safety Concern] + [Expertise] + [Availability] = "Electrical Fire Risk? Call Now. Licensed & Insured."
- ✓ "Breaker Panel Trips? Emergency Service Available Now"
- ✓ "Code-Compliant Electrical Work You Can Trust"
- ✗ "Professional Electrical Services" (too generic)

**Subheading Formula:** [Authority] + [Assurance] = "Master Electrician. Licensed by State. No Surprises."

**Primary CTA Text:** "Call Emergency Electrician Now" (phone for emergencies) or "Schedule Inspection" (planned)

**Secondary CTA Text:** "Get Your Electrical Safety Inspection" or "Request a Quote"

**Tone Rules:**
- Non-negotiable authority (safety is not optional)
- Reassurance-heavy (homeowners are anxious)
- Avoid over-technical language; explain in customer terms
- Emphasize transparency and code compliance

**Example Copy Progression:**
- Hero: "Electrical Fire Risk? We're Here in 2 Hours. Licensed & Insured."
- Subheading: "Master Electrician on-call 24/7. All work code-compliant. No hidden charges."
- Service card: "Emergency Service: $75 trip charge + $95-125/hour labor. Emergency surcharge 6pm-7am. No surprises."
- Testimonial: "They fixed our overloaded circuit and explained exactly what was dangerous and how they fixed it. Peace of mind." — Susan, Denver

### Trust Signals (All Required)
- License number + state verification link (mandatory; Agent C: 100% of winners)
- Master Electrician credential (Agent C: validates "Master" beats generic)
- Bonded & Insured badge (Agent C: 95%+ of winners)
- 2-hour emergency response guarantee (Agent B: urgency converter)
- Real customer testimonials emphasizing clarity/transparency (Agent B/C: safety confidence through education)
- Code compliance promise ("Your home will pass inspection"; Agent C: validates as emotional sell)

### Mandatory Integrations (Ranked)
1. **Live availability widget + SMS dispatch** (real-time technician status; optional but high-value for emergency credibility; Agent C: 50%+ of real sites)
2. **Google Reviews Widget** (recency-filtered, safety/licensing mentioned in reviews; Agent B/C: credibility through recent validation)
3. **Calendly** (non-emergency booking; inspections, upgrades; Agent A/C: standard)
4. **State licensing verification API** (if available; else manual link to state licensing database; Agent C: verification link mandatory)
5. **Google Maps** (service area, multi-location routing if applicable; Agent C: geo-targeting standard)

### Conversion Actions (Ranked by Priority)
1. **Call Emergency Electrician (Phone)** — Highest urgency; click-to-call (Agent C: 99%+ of winners place emergency phone above form)
2. **Schedule Safety Inspection (Calendly or Form)** — Non-emergency planned work (Agent B: inspection booking converts)
3. **Get Your Free Estimate (Form)** — Secondary path for quotes (Agent A/C: standard)
4. **View Our Credentials** — Trust link to license verification (Agent C: clickable verification differentiates)
5. **Read Our Reviews** — Social proof (Agent C: recency-weighted reviews build safety confidence)

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Hazard photo gallery** (overloaded outlets, worn wiring images) — Creates liability risk; homeowners perceive as negligence documentation (Agent C: "These are liability risks"; real sites avoid)
- ✗ **Interactive safety checklist tool** — Over-featured; not validated in real sites (Agent C: zero adoption)
- ✗ **Load calculator** (Replit feature to estimate panel capacity) — Zero demand signal (Agent B: no mention; Agent C: zero adoption)
- ✗ **Permit code library** (localized reference guide) — Defer unless legal/compliance need proven (Agent C: "Kill unless legal/compliance need proven")
- ✗ **Detailed technical specs in portfolio** (homeowners don't read; focus on results) — Keep gallery simple; cut technical descriptions (Agent C validates)

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Blue (#2563eb) or Dark Blue (#1e40af) | Professional, trustworthy, safety signal (Agent C: 70%+ of electrical sites use blue for authority) |
| **Secondary Color** | White | Clean, high-contrast, professional |
| **Accent Color** | Yellow or Red | Warning/caution signal (electrical hazard standard); CTA button alert color (Agent B: color-coded urgency; emergency = red/yellow) |
| **Hero Imagery** | Real licensed electrician at work on panel/rewiring | Professional photography of actual jobs; never stock imagery (Agent C: real work beats stock) |
| **Typography** | Sans-serif (Roboto, Inter) | Professional, readable on mobile; safety signal clarity |
| **Service Card Icons** | Industry standard (lightning bolt = power, plug = outlet, panel = breaker box) | Visually distinct by service; intuitive |
| **CTA Button Style** | Solid red or yellow (emergency), blue (planned) + white text + 44px+ height | High contrast; urgent color for emergency; touch-friendly |
| **Testimonial Photos** | Real homeowner photos (diverse background context) | Authenticity signal (Agent B/C: real > avatars) |
| **Before-and-After Photos** | Panel upgrades, rewiring work in-progress and completed | Professional documentation of quality work (Agent C: validates in 70%+ of sites) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 65-70% of visitors | Agent B |
| **Emergency Call Rate** | 30-40% of total calls | Agent B (emergency vs. planned split) |
| **Google Reviews Minimum** | 4.3+ stars | Agent B: safety-sensitive industry; review rating critical |
| **Average Session Duration** | 2-3 minutes | Agent C: mobile-first; customers quickly assess trust + call |
| **Bounce Rate Target** | <50% (mobile), <40% (desktop) | Agent B: trade industry baseline |
| **Conversion Rate** | 6-10% (lead gen); 4-6% (emergency calls) | Agent B: urgency-weighted; safety anxiety drives calling |

### Open Decisions (Client Must Provide)
1. **License number + state** — What's your license #? Which state/jurisdiction? (Agent C: mandatory for verification link)
2. **Master Electrician credential** — Do you hold Master credential? EPA certification? (Agent C: validates as differentiator if available)
3. **Emergency response time guarantee** — What's realistic SLA? 1-hour? 2-hour? (Agent B: validates as converter; must be achievable)
4. **Service area coverage** — Which cities/ZIPs? Service radius? (Agent C: geo-targeting mandatory for trades)
5. **Bonding and insurance details** — Bonded? Insured? What coverage limits? (Agent C: 95%+ of real sites verify)
6. **Trip charge + hourly rate transparency** — What do you charge for emergency service calls? Labor rate? (Agent B: pricing transparency removes objection)

---

## INDUSTRY 4: LANDSCAPING / LAWN CARE

### Urgency Profile
**Recurring + Seasonal**
- 70% recurring demand (weekly/bi-weekly/monthly maintenance contracts; Agent B)
- 30% one-time demand (seasonal projects, design/build; Agent B)
- **Impact:** Primary CTA emphasizes recurring subscription booking; secondary CTA for one-time quotes
- **Copy tone:** Visual/aspirational + practical/maintenance-focused, seasonal urgency

### Required Sections (In Order)
1. **Seasonal Hero** (dynamic hero swaps with season: "Spring Cleanup Special Now Available" vs. "Fall Leaf Removal Booking Open"; Agent A/C: seasonal switching standard)
2. **Service Grid** (4-6 services: Spring Cleanup, Lawn Mowing (recurring), Landscaping Design, Aeration, Leaf Removal, General Maintenance)
3. **Why Us / Local Proof** (years in business, "Trusted by 500+ homeowners in [city]", hyperlocal validation; Agent C: "serving [neighborhoods]" validates)
4. **Testimonials** (3-5 with real customer photos; emphasize satisfaction + results; Agent C: photo quality drives conversion in visual industries)
5. **Before-and-After Gallery** (12-15 project images, mobile-optimized carousel/grid; Agent C: "12+ before/after photos in gallery grid" standard; 60%+ mobile means gallery UX critical)
6. **Service Grid for Recurring Plans** (tiered subscription: Weekly ($X/month), Bi-weekly ($X/month), Monthly ($X/month))
7. **Warranty/Satisfaction Guarantee** ("100% Satisfaction Guarantee. Free revisions until you're happy."; Agent C: validates "only 40% of sites mention guarantee"; opportunity)
8. **Seasonal Promotions** ("Spring Cleanup Special Available Now", "Fall Leaf Removal Package"; Agent B: seasonal demand spikes; Agent C: dynamic homepage banners validate)
9. **FAQ** (accordion; top questions: "How often do I need service?", "What's your service area?", "Do you guarantee satisfaction?")
10. **Contact + Map** (phone sticky, address, directions, service area map)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| Before-and-After Gallery (12-15+ project images) | Visual proof of quality; primary conversion driver for visual industries | Agent B: "visual trust building"; Agent C: "Portfolio always in top nav"; 90%+ adoption |
| Service area ZIP lookup | Service area confirmation; reduce out-of-area form submissions | Agent B: "service area (must service their zip code) as decision factor"; Agent C: validates as competitive advantage |
| Recurring service booking (Calendly + Stripe) | Subscription booking for weekly/bi-weekly/monthly contracts | Agent B: 70% recurring demand; Agent C: "Subscribe to monthly mowing for $X/month" validates subscription positioning |
| Mobile-responsive gallery | Mobile optimization critical (60%+ mobile dominance) | Agent B: 60%+ mobile abandonment if gallery not optimized; Agent C: "Mobile-responsive gallery must be mobile-optimized (most browsing happens on phone)" |
| Seasonal service promotions (dynamic banners) | Homepage CTA/copy swap by season ("Spring Cleanup" vs. "Fall Leaf Removal") | Agent B: seasonal demand spikes; Agent C: validates in real sites |
| Satisfaction Guarantee ("100% Satisfaction Guarantee. Free revisions until you're happy.") | Objection: "What if I don't like the work?" | Agent B: identifies objection; Agent C: "only 40% of sites mention guarantee" (opportunity) |
| Team photos (crew/owner) | Humanization; trust building | Agent C: "Crew/owner photos humanize the service" validates in 70%+ of winners |
| Testimonials with real customer photos | Social proof authenticity | Agent B/C: real photos > avatars; visual industries especially critical |
| Google Reviews widget (recency-filtered) | Third-party validation; service type mentioned (lawn mowing, spring cleanup) | Agent B/C: 80%+ of winners; recency weighting |
| Service area polygon map | Visual confirmation of service boundaries | Agent C: "Visual coverage map > vague 'serving Phoenix area'" validates in competitive advantage tier |

### Copy Voice

**Headline Formula:** [Seasonal Need] + [Result] = "Spring Cleanup Special. Your Lawn Ready by April."
- ✓ "Fall Leaf Removal Available Now"
- ✓ "Beautiful Outdoor Space. Starting at $X/Month"
- ✗ "Professional Landscaping Services" (too generic)

**Subheading Formula:** [Maintenance Benefit] + [Recurring Option] = "Healthy lawn needs consistent care. Subscribe today and save."

**Primary CTA Text:** "Schedule My Lawn Service" (recurring) or "Book Spring Cleanup" (seasonal)

**Secondary CTA Text:** "Get Your Free Quote" (one-time) or "View Our Portfolio"

**Tone Rules:**
- Balance aspirational (results/beauty) with practical (maintenance requirements)
- Seasonal urgency (capitalize on peak season language)
- Avoid over-design language; focus on "healthy lawn" + "beautiful yard"

**Example Copy Progression:**
- Hero: "Spring Cleanup Special. Book Now and Save $50."
- Subheading: "Professional lawn care for a healthier yard. Weekly or monthly plans available."
- Service card: "Monthly Maintenance Plan: $89/month. Includes weekly mowing, edging, blowing. Free first month."
- Testimonial: "Our yard looks amazing. They showed up every week, the service is consistent, and it's way less hassle than DIY." — Mark, Austin

### Trust Signals (All Required)
- Years in business (10+ preferred; Agent B: credibility signal)
- "Trusted by 500+ homeowners in [city]" hyperlocal validation (Agent C: validates "serving [neighborhoods]" social proof)
- Real customer testimonials with photos (Agent B/C: authenticity)
- Before-and-After gallery (12-15+ images; Agent C: 90%+ of real sites)
- Satisfaction guarantee ("100% Satisfaction Guarantee"; Agent C: validates as rare/differentiator)
- Team photos (crew humanization; Agent C: 70%+ of winners)

### Mandatory Integrations (Ranked)
1. **Recurring service booking (Calendly + Stripe)** — Weekly/bi-weekly/monthly scheduling + auto-renewal processing (Agent B: 70% recurring; mandatory for subscription model)
2. **Google Reviews Widget** (recency-filtered, service type mentioned: "lawn mowing," "spring cleanup"; Agent B/C: credibility)
3. **Google Maps** (service area polygons, not just neighborhoods; Agent C: geo-targeting standard; polygon > text description)
4. **Email seasonal campaigns** (April: "Spring Cleanup Available," Sept: "Fall Leaf Removal"; Agent B: seasonal demand spikes; Agent A: seasonal content engine)
5. **SMS reminders** (appointment day reminder for recurring clients; Agent B: reducing no-shows)

### Conversion Actions (Ranked by Priority)
1. **Schedule My Lawn Service (Calendly + Stripe)** — Recurring subscription booking (Agent C: 70% of demand is recurring; primary CTA)
2. **Book Spring Cleanup (Form or Calendly)** — Seasonal one-time project (Agent B: seasonal urgency; secondary urgency)
3. **Get Your Free Quote (Form)** — Design/build custom project (Agent B: planning behavior)
4. **View Our Portfolio** — Social proof/inspiration (Agent C: portfolio gallery primary nav item validates)
5. **Read Our Reviews** — Trust building (Agent C: recency-weighted reviews)

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Drone photography emphasis** (wide shots, aerial views as primary imagery) — 60%+ mobile dominance means ground-level before-afters more visible (Agent A: "over-featured"; Agent C: "Keep 2-3 drone shots max in hero/gallery; prioritize ground-level before/afters for mobile viewing")
- ✗ **12-15 project minimum portfolio requirement** — 60%+ mobile means smaller, optimized galleries perform better than massive portfolios (Agent A: "12-15 projects minimum"; Agent C: "Reduce to 8-10 projects, optimized for thumb-scroll galleries on mobile")
- ✗ **Blog integration as default** — SEO benefit too long-tail for MVP; dedicate homepage real estate to conversion CTAs (Agent A: "seasonal content"; Agent C: "blog implemented in 0% of real landscape sites")
- ✗ **Detailed pricing menu** (itemized pricing for every service) — Real sites avoid online pricing; phone quote is norm (Agent C: "Detailed pricing menu avoided in real sites; phone quote is norm")
- ✗ **Equipment/product showcase** (photos of equipment, brand names) — Focus on results, not tools (Agent C: "Cut unless integrated as 'here's what we use' minor section")

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Green (#16a34a or natural green) | Nature signal; landscaping brand (Agent C: natural green validates)
| **Secondary Color** | White or Cream | Clean, grass-like background |
| **Accent Color** | Brown or Gold | Earth tones; organic aesthetic |
| **Hero Imagery** | Real before-and-after transformation or beautiful completed yard | Professional photography of actual jobs; no stock imagery (Agent C: real work beats stock) |
| **Typography** | Sans-serif (Roboto, Poppins) | Professional, readable; modern landscape aesthetic |
| **Service Card Icons** | Industry standard (plant = lawn, rake = cleanup, shovel = landscaping) | Visually distinct by service; intuitive |
| **CTA Button Style** | Solid green + white text + 44px+ height | Nature signal; high contrast; touch-friendly |
| **Testimonial Photos** | Real homeowner photos (yard setting context) | Authenticity signal; context validates (Agent B/C: real > avatars) |
| **Before-and-After Gallery** | Grid layout (3 columns on desktop, 1 on mobile) or carousel; full-width, high-res images | Mobile-first optimization critical (Agent C: "Mobile-responsive gallery must be mobile-optimized"; 60%+ mobile) |
| **Team Photos** | Casual/professional crew photos with names | Humanization; trust building (Agent C: 70%+ of real sites) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 60-70% of visitors | Agent B |
| **Recurring Subscription Adoption** | 40-50% of new customers | Agent B (70% market demand; agent target: 40-50% capture) |
| **Google Reviews Minimum** | 4.4+ stars | Agent B: landscape competition; review rating critical |
| **Average Session Duration** | 2-4 minutes | Agent C: mobile-first; portfolio browsing + quick booking |
| **Bounce Rate Target** | <50% (mobile), <40% (desktop) | Agent B: visual industry; gallery engagement critical |
| **Conversion Rate** | 6-10% (lead gen); 3-5% (direct booking) | Agent B: recurring subscription vs. one-time quote split |

### Open Decisions (Client Must Provide)
1. **Service area coverage** — Which ZIP codes? Service radius? Neighborhoods? (Agent C: mandatory for geo-targeting)
2. **Recurring service tiers + pricing** — Weekly/bi-weekly/monthly options? Pricing per tier? (Agent B: 70% demand; requires pricing commitment)
3. **Seasonal promotions calendar** — What specials align with your peak seasons? Spring/fall pricing? (Agent A: seasonal switching engine requires client input)
4. **Satisfaction guarantee language** — Do you guarantee satisfaction? Revisions included? (Agent C: 40% of sites lack this; opportunity to differentiate)
5. **Team member names/photos** — Who are the crew leads? Owners? Available for team photos? (Agent C: humanization validates)
6. **Portfolio quality assessment** — Which 12-15 projects best showcase results? Before-and-after photo pairs available? (Agent C: portfolio is primary conversion driver; curation matters)

---

## INDUSTRY 5: AUTO REPAIR / MECHANIC

### Urgency Profile
**Urgent + Planned Mixed**
- 50% urgent demand (breakdown, failure, same-day need; Agent B)
- 50% planned demand (maintenance, inspections; Agent B)
- **Impact:** Dual CTA strategy: "Schedule Service Now" (urgent/callback) and "Get a Quote" (planned diagnosis)
- **Copy tone:** Honesty-focused (trust deficit in mechanic industry), transparency-heavy, objection-handler tone

### Required Sections (In Order)
1. **Hero + Trust Positioning** (headline: "Your Car. Our Expertise. Honest Repairs."; CTA: "Schedule Service Now" or "Get a Quote"; Agent C: "Honest mechanic positioning" validates as unique to auto)
2. **Why Choose Us / Honest Mechanic Positioning** (ASE certification, "We recommend only what you need", warranty prominently featured; Agent C: "Why not dealerships?" section unique to auto; "comparative messaging is industry-specific")
3. **Service Grid** (4-6 services: Oil Changes, Brake Service, Engine Diagnostics, Transmission Repair, Electrical, Maintenance)
4. **Flat-Rate Service Menu** (transparent pricing: "Oil Change: $49.99", "Brake Inspection: $75", etc.; Agent B: "flat-rate menus convert better"; Agent C: "Transparent pricing: 'Oil change: $49.99' beats 'Call for quote'")
5. **Trust Credentials** (ASE Shop badge + individual technician certifications, "Certified Technicians", warranty guarantee)
6. **Testimonials** (3-5 emphasizing honesty: "They explained the problem without trying to upsell me"; Agent C: "Testimonials emphasize honesty"; Agent B: trust objection)
7. **Before-and-After Work Photos** (6-8 vehicle repair documentation photos; Agent C: "Before/after vehicle photos; actual jobs >> stock imagery")
8. **Pricing Transparency Section** ("Transparent pricing, no surprises"; "Diagnostic fee waived if you service with us"; Agent B: objection handlers; Agent C: "Diagnostic fee transparency as standard winning language")
9. **Service History Tracking / Customer Portal** (optional but high-value: past invoices, warranty info; Agent C: validates as differentiator)
10. **FAQ** (accordion; top questions: "How much will it cost?", "Are you trying to upsell me?", "Do you honor other shop's diagnostics?", "What's your warranty?")
11. **Contact + Map** (phone sticky, address, hours, directions)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| ASE Certification display (Shop + Individual) | Industry credibility; trust signal in mechanic industry (trust deficit) | Agent B: "ASE-Certified" as trust builder; Agent C: "ASE Shop badge" standard |
| Flat-rate service menu (transparent pricing) | Objection: "Will you overcharge me?" | Agent B: "Flat-rate menus convert better"; Agent C: "Transparent pricing: 'Oil change: $49.99' beats 'Call for quote'" validates |
| "Honest mechanic" positioning ("We recommend only what you need") | Trust deficit recovery; unique to auto industry (Agent C: validates "Why not dealerships?" as auto-only messaging) |
| Warranty section (prominent, hero callout) | Objection handler: "What if something goes wrong?" | Agent B: "Warranty/guarantee visibility as objection-killer"; Agent C: "only top 40% prominently feature guarantees"; opportunity |
| Technician team photos + ASE credentials | Humanization + credibility; personalization over generic shop photo | Agent C: "Technician team photos + ASE certs of key technicians humanize service"; validates in winners |
| Before-and-After vehicle work photos (6-8 min) | Visual proof of quality work | Agent C: "Before/after vehicle photos; actual jobs >> stock imagery" validates |
| Real customer testimonials (honesty focus) | Social proof; emphasis on "they explained clearly without upselling" | Agent B/C: trust building through transparency |
| Diagnostic fee transparency ("Diagnostic fee waived if you service with us") | Objection handler for cost | Agent B: implied in estimate process; Agent C: "standard winning language" |
| Google Reviews widget (recency-filtered, service type specificity) | Third-party validation; reviews mentioning specific services + honesty | Agent B/C: credibility through recent validation |
| Service area + multi-location support (if applicable) | Location clarity | Agent C: "Mechanic near me is single-shop search"; simplify unless multi-location |

### Copy Voice

**Headline Formula:** [Reassurance] + [Expertise] = "Your Car. Our Expertise. Honest Repairs."
- ✓ "ASE-Certified Mechanics. Transparent Pricing. No Surprises."
- ✓ "We Recommend Only What You Need"
- ✗ "Professional Auto Repair Services" (too generic)

**Subheading Formula:** [Trust Signal] + [Commitment] = "ASE-Certified. We explain everything. Warranty on all work."

**Primary CTA Text:** "Schedule Service Now" (urgent) or "Get a Free Diagnostic" (planned)

**Secondary CTA Text:** "View Our Pricing Menu" or "Read Our Reviews"

**Tone Rules:**
- Honesty-first (offset mechanic industry trust deficit)
- Transparency in pricing and explanations
- Avoid upselling language; lead with "we recommend only what you need"
- Avoid generic "professional service" claims

**Example Copy Progression:**
- Hero: "Your Car. Our Expertise. We Recommend Only What You Need."
- Subheading: "ASE-Certified Mechanics. Transparent Pricing. Warranty on All Work."
- Service card: "Oil Change: $49.99 (10 min). Includes new filter, fluid top-off, visual inspection. Warranty: 6 months."
- Testimonial: "They found the issue, explained it clearly without trying to upsell, and fixed it right. That's why we keep coming back." — Tom, Denver

### Trust Signals (All Required)
- ASE Shop badge (Agent C: 100% of real sites; industry standard)
- Individual technician certifications + photos (Agent C: validates in winners; humanization)
- Flat-rate service menu with transparent pricing (Agent B: converter; Agent C: validates in real sites)
- Warranty guarantee ("Warranty on All Work"; Agent B: objection-killer; Agent C: only 40% feature prominently; opportunity)
- Real customer testimonials emphasizing honesty/transparency (Agent B/C: trust deficit recovery)
- Dealership comparison positioning (Agent C: "Half the price of dealership, same quality" unique to auto)

### Mandatory Integrations (Ranked)
1. **Google Reviews Widget** (recency-filtered, service type specificity: "oil change," "brake service"; Agent B/C: credibility)
2. **Calendly + SMS confirmations** (appointment + day-before reminder; Agent A/C: standard; Agent B: reducing no-shows)
3. **Stripe or Square for deposits** (enable online deposit before appointment to reduce no-shows; Agent B: payment friction objection; optional but trust-building)
4. **Google Maps** (location, hours, directions; Agent C: standard for service industries)
5. **Email service reminders** (seasonal: "Winter battery check due," "Summer AC service"; Agent B: nurture cadence)

### Conversion Actions (Ranked by Priority)
1. **Schedule Service Now (Phone or Calendly)** — Urgent path; highest conversion (Agent C: callback forms still dominant in real sites vs. online booking)
2. **Get a Free Diagnostic (Form or Phone)** — Planned/diagnosis path (Agent B: diagnostic service as separate booking option)
3. **View Our Pricing Menu** — Transparency redirect (Agent B: pricing transparency converts)
4. **Read Our Reviews** — Trust building (Agent C: recency-weighted reviews + honesty emphasis)
5. **Request a Quote (Form)** — Custom estimate for complex repairs (Agent A/C: standard secondary path)

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Multi-location support** (sophisticated location routing widget) — Unless shop has multiple locations; simplify to single address (Agent A: feature; Agent C: "Unless multi-location shop, deprioritize")
- ✗ **Vehicle year/make/model service picker** (complex form field) — Real sites simplify to "General Service" + "Brake Service" + "Diagnostics"; collect vehicle details on callback (Agent C: "Simplify to broad categories; drop vehicle picker for initial booking")
- ✗ **Diagnostic service explainer** (dedicated explainer page) — Keep 2-sentence explanation in FAQ; don't dedicate homepage real estate (Agent C: "Trust + urgency are converters, not education; keep explanation brief")
- ✗ **Customer vehicle maintenance record tool** (track service history) — Optional but high-value; defer to V2 unless existing CRM supports it (Agent A: feature; Agent C: deprioritize unless CRM-integrated)

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Dark Gray (#374151) or Dark Blue (#1e3a8a) | Professional, trustworthy, non-flashy (Agent C: "No-frills, expensive positioning" validates authority tone) |
| **Secondary Color** | White | High contrast; professional aesthetic |
| **Accent Color** | Blue or Red | Trust signal; ASE badge blue (Agent C: badge integration validates color) |
| **Hero Imagery** | Real mechanic at work on vehicle or completed repair | Professional photography of actual jobs; never stock imagery (Agent C: real work beats stock; validates) |
| **Typography** | Sans-serif (Roboto, Inter) | Professional, readable on mobile |
| **Service Card Icons** | Industry standard (wrench = service, car = maintenance, tools = diagnostics) | Visually distinct by service; intuitive |
| **CTA Button Style** | Solid blue or dark gray + white text + 44px+ height | Professional tone; high contrast; touch-friendly |
| **Testimonial Photos** | Real customer headshots (casual/professional blend) | Authenticity signal (Agent B/C: real > avatars) |
| **Before-and-After Photos** | Vehicle repair documentation (engine, transmission, brakes) | Professional work documentation (Agent C: "Before/after vehicle photos" validates) |
| **ASE Badge** | Official ASE Shop logo + individual technician badges | Credential integrity; verifiable (Agent C: badge integration validates design) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 60-65% of visitors | Agent B |
| **Urgent Service Call Rate** | 50% of total calls | Agent B (urgent vs. planned split) |
| **Google Reviews Minimum** | 4.3+ stars | Agent B: mechanic trust critical; review rating important |
| **Average Session Duration** | 2-3 minutes | Agent C: mobile-first; quick trust assessment + booking |
| **Bounce Rate Target** | <50% (mobile), <40% (desktop) | Agent B: service trade baseline |
| **Conversion Rate** | 6-10% (lead gen); 4-6% (urgent calls) | Agent B: urgency-weighted |

### Open Decisions (Client Must Provide)
1. **ASE certifications** — Does your shop hold ASE Shop certification? Which techs hold individual ASE? (Agent C: validates as differentiator if available)
2. **Service area coverage** — Single location or multiple locations? If multiple, address for each? (Agent C: simplify unless genuine multi-location)
3. **Flat-rate service menu** — What services do you offer? Pricing per service? Warranty terms? (Agent B: flat-rate mandatory; requires commitment)
4. **Warranty guarantee details** — What warranty applies to labor? To parts? Duration? (Agent C: "only 40% feature prominently"; opportunity to differentiate)
5. **Dealership comparison positioning** — Can you credibly claim "half the price of dealership"? (Agent C: validates as auto-only messaging if data supports)
6. **Team member credentials** — Which technicians have ASE? Available for team photos? (Agent C: validates as differentiator)

---

## INDUSTRY 6: MEDICAL SPA

### Urgency Profile
**Premium + Consultation-First**
- Consultation required before treatment (discovery-driven, not emergency-driven; Agent B)
- Medium urgency (cosmetic desire, not emergency; seasonal peaks: Jan resolutions, Apr-Jun summer body, holiday parties)
- **Impact:** Primary CTA is "Schedule Free Consultation"; secondary CTA is "Explore Treatments"; copy emphasizes "guided, not sold to"
- **Copy tone:** Aspirational but grounded, patient-centric, education-focused, natural results emphasis

### Required Sections (In Order)
1. **Hero + Consultation CTA** (headline: "Natural-Looking Results. Guided, Not Sold To."; CTA: "Schedule Free Consultation"; Agent C: "Consultation booking Primary CTA; 'Schedule Free Consultation'" validates)
2. **Treatment Areas / Concern-Based Menu** (organized by concern: Face, Skin, Body, specialized by procedure type; Agent C: "Organized by treatment type" validates)
3. **Why Us / Provider Credentials** (MD/PA/NP credentials with clickable state medical board verification, board certifications, specialized training; Agent C: validates as hero-level trust signal)
4. **Featured Treatments (Educational)** (3-4 treatment education sections: "How Botox Works", "What to Expect from Fillers"; Agent C: "Featured treatments (educational)" as section 4 validates earlier placement than templates suggest)
5. **Before-and-After Gallery** (20-40+ images organized by treatment type; diverse skin tones, ages, outcome ranges; Agent C: "Before/after photos (20-40+ image gallery; organized by treatment type)" validates)
6. **Patient Testimonials** (4-6 with photos, emphasizing natural results: "I look like myself, just rested"; Agent C: validates "Guided, Not Sold To" messaging in real winners)
7. **Provider Expertise** (detailed provider bios, credentials, philosophy; Agent C: validates as section 7)
8. **Treatment Process Explained** (what to expect before/during/after; aftercare instructions downloadable; Agent B: identifies as feature; Agent C: validates as section)
9. **Cost Transparency by Treatment** (pricing ranges: "Botox: $240-$480 per area"; Agent C: "specific range transparency as winning pattern, not generic 'call for quote'"; Agent B: validates transparency objection)
10. **Blog / Educational Content** (treatment guides, skincare routines, recovery expectations; Agent C: "Patient education / Blog" section standard in winners; higher priority than templates suggest)
11. **Referral Program** (optional; if offered, promote)
12. **Consultation Booking** (Acuity or similar; separate from treatment booking)
13. **Contact + Map** (phone, address, hours, parking info)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| Provider credentials (MD/PA/NP) + clickable state verification | Trust signal; regulatory compliance; address "Is this safe?" objection | Agent B/C: validates as primary converter; Agent C: "MD/DO, RN, Aesthetician licenses prominently featured" |
| Before-and-after gallery (20-40+ images, organized by treatment, diverse skin tones) | Visual proof of realistic results; trust builder | Agent B: "Before-and-after gallery (labeled, realistic, diverse)"; Agent C: "Before/after photos (20-40+ image gallery)" validates frequency and curation |
| "Guided, Not Sold To" messaging as primary brand positioning | Objection: "Will I look overdone?" + trust rebuilding | Agent C: "Guided, not sold to as explicit brand positioning" validates; primary differentiator from competitors |
| Consultation vs. treatment booking separate flows | Objection: "Want to meet provider first"; Discovery-driven urgency | Agent B: "consultation vs. treatment booking split"; Agent C: validates as standard in real sites |
| Cost transparency by treatment (pricing ranges) | Objection: "How much will it cost?" | Agent C: "Botox: $240-$480 per area pricing" validates specific ranges; Agent B: transparency = conversion |
| Ethical photo guidelines ("All photos unretouched, natural lighting, real clients") | Build confidence in before-and-after authenticity | Agent B: identifies as objection; Agent C: validates as trust signal |
| Aftercare instructions (downloadable/email) | Supports treatment process expectation-setting | Agent B: "aftercare instructions" as feature; Agent C: validates in real sites |
| Educational blog content (treatment guides, skincare routines) | Nurture + SEO; addresses educational objections | Agent B: identifies as nice-to-have; Agent C: "Blog / Education section" standard in winners; higher priority than templates suggest |
| Google Reviews widget (recency-filtered, treatment type mentioned) | Third-party validation; reviews mention specific treatments | Agent B/C: credibility through recent validation |
| HIPAA badge + data privacy statement | Objection: "Is my privacy protected?" | Agent B: "HIPAA compliance + SSL as visible trust signals"; Agent C: validates badge adoption |

### Copy Voice

**Headline Formula:** [Benefit] + [Philosophy] = "Natural-Looking Results. Guided, Not Sold To."
- ✓ "Look Like Yourself, Just Rested"
- ✓ "Subtle Enhancements by [Provider Name], MD"
- ✗ "Premium Medical Spa Services" (too generic)

**Subheading Formula:** [Credential] + [Philosophy] = "Board-certified MD leads every treatment. You're in expert hands."

**Primary CTA Text:** "Schedule Free Consultation" (no obligation; meet provider first)

**Secondary CTA Text:** "Explore Treatments" or "Read Our Reviews"

**Tone Rules:**
- Patient-centric (not luxury-centric; real patients > aspirational tone per Agent C)
- Grounded in realism ("natural results", "look like yourself")
- Education-focused; explain what procedures do and don't do
- Avoid over-promising or exotic language

**Example Copy Progression:**
- Hero: "Natural-Looking Results. Guided, Not Sold To. Schedule Your Free Consultation."
- Subheading: "Board-certified MD + master aesthetician. Your goals guide our recommendations."
- Treatment card: "Botox: $240-$480 per area. Smooths fine lines. Results visible in 3-7 days; peak effect at 2 weeks. Lasts 3-4 months. Free consultation included."
- Testimonial: "I was nervous about looking 'done'. Dr. Smith listened to exactly what I wanted and did way less than I expected. I look like myself, just refreshed." — Jennifer, Austin

### Trust Signals (All Required)
- MD/PA/NP credentials + state medical board verification link (mandatory; Agent C: 100% of real sites feature provider creds)
- Board certifications (American Board of Medical Aesthetics, etc.; Agent C: validates in winners)
- "Guided, Not Sold To" messaging as explicit positioning (Agent C: validates as winning language)
- Before-and-after gallery with diverse representation + "unretouched" disclaimer (Agent B/C: validates)
- Real patient testimonials emphasizing natural results (Agent B/C: authenticity signal)
- HIPAA badge + data privacy statement (Agent B: identifies; Agent C: validates rare but trust-building)
- FDA-cleared equipment mentioned (Agent C: "FDA clearance messaging rare"; opportunity)

### Mandatory Integrations (Ranked)
1. **Separate Consultation vs. Treatment booking flows** (Acuity Scheduling with custom booking types; Agent B: validates consultation-first model; Agent C: differentiates from treatment-first shops)
2. **Google Reviews Widget** (recency-filtered, treatment type mentioned; Agent B/C: credibility)
3. **Aftercare email automation** (post-treatment instructions sent automatically; Agent B: validates as feature; Agent C: real sites implement)
4. **SMS reminders** (appointment reminder + aftercare follow-up check-in; Agent B: engagement; Agent C: validates)
5. **Email newsletter** (monthly skincare tips + new treatment announcements + loyalty promotions; Agent B: nurture cadence; optional but high-value)

### Conversion Actions (Ranked by Priority)
1. **Schedule Free Consultation (Acuity)** — Primary urgency; no-obligation provider meeting (Agent B/C: validates consultation-first model)
2. **Explore Treatments (Form or Link)** — Secondary path; treatment education (Agent A/C: standard)
3. **View Our Before-and-After Gallery** — Social proof/inspiration (Agent C: before-after primary nav item validates)
4. **Read Our Reviews** — Trust building (Agent C: recency-weighted reviews)
5. **Book Your Treatment (Acuity)** — Post-consultation conversion (Agent C: separate booking flow validates)

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Luxury positioning pressure** (rose gold, cream, aspirational imagery emphasis) — Agent C: "Simplify palette; lead with credentials, not luxury"; Agent B: "68% mobile conversion + medical credibility as primary drivers"
- ✗ **Extensive blog section** (treatment education, skincare tips, aftercare) — Agent C: "Minimal presence on service industry sites"; templatize but don't over-feature; keep brief sections
- ✗ **Treatment comparison tool** ("Botox vs. Filler interactive") — Agent C: "Only 1/7 med spa sites use this"; templatize but defer to FAQ accordion, not dedicated tool
- ✗ **Loyalty program promotion** (referral/loyalty program as default) — Agent C: "only 3/7 real sites mention referral/loyalty"; optional, not required
- ✗ **Overly dramatic before-and-after photos** — Real sites emphasize subtle/natural transformations; avoid over-retouching or extreme changes (Agent C: validates)

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Neutral gray/tan (#9ca3af or warm #d4a574) or soft blue (#e0f2fe) | Professional, trustworthy, medical aesthetic (Agent C: "ELLEMES (sophisticated grays), Conqr (modern teal), Natural Body (warm peachy)" validates flexibility vs. rose gold rigidity) |
| **Secondary Color** | White | High contrast; clean aesthetic |
| **Accent Color** | Soft accent (sage, blush, soft teal) | Subtle elegance; not maximalist (Agent C: validates soft accents vs. luxury over-emphasis) |
| **Hero Imagery** | Professional before-and-after transformation or provider at work | Quality professional photography; diverse skin tone representation (Agent C: validates) |
| **Typography** | Sans-serif primary (Montserrat, Raleway), serif secondary (Lora) | Professional-modern blend; readable on mobile; supports both medical and aesthetic brand |
| **Service Card Icons** | Subtle icons (syringe for injectables, laser for skin treatments, face for facial) | Visually distinct; professional medical imagery |
| **CTA Button Style** | Solid color (soft accent) + white text + 44px+ height | High contrast; touch-friendly; aligned with soft palette |
| **Testimonial Photos** | Real patient headshots (professional; diverse age, skin tone) | Authenticity signal; diverse representation (Agent C: validates in winners) |
| **Before-and-After Slider** | Side-by-side drag comparison | Mobile swipe gesture support; highlight diversity (Agent C: validates touch-optimized in winners) |
| **Provider Credentials Display** | Professional bio cards with photo + credentials + board certification logos | Credibility through visual hierarchy (Agent C: validates in winners) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 68% of visitors | Agent B |
| **Consultation Booking Rate** | 40-50% of hero CTAs | Agent C: consultation-first model validates |
| **Google Reviews Minimum** | 4.5+ stars | Agent B: aesthetic industry; review rating critical |
| **Average Session Duration** | 3-5 minutes | Agent C: customers research treatments heavily; longer session |
| **Bounce Rate Target** | <45% (mobile), <35% (desktop) | Agent B: service industry baseline; higher engagement in aesthetic |
| **Conversion Rate** | 8-12% (lead gen); 5-8% (consultation bookings) | Agent B: consultation-first model |

### Open Decisions (Client Must Provide)
1. **Provider credentials** — MD/PA/NP/RN? State licenses? Board certifications? (Agent C: mandatory for verification links)
2. **Treatment menu + pricing** — Which treatments offered? Pricing ranges per treatment? (Agent B/C: transparency = conversion; requires pricing commitment)
3. **Before-and-after photos** — Do you have 20-40+ client photos with consent? Diverse skin tones represented? (Agent C: gallery curation critical for conversion)
4. **Consultation booking process** — Do you require consultation before treatment? Duration? Cost? (Agent B: validates consultation-first model; requires client commitment)
5. **Seasonal promotions calendar** — New Year resolutions package? Summer body promos? Holiday parties? (Agent B: seasonal demand peaks; requires client input)
6. **Aftercare protocols** — What aftercare instructions do you provide? Downloadable guides available? (Agent B: feature; requires client documentation)

---

## INDUSTRY 7: DENTAL PRACTICE

### Urgency Profile
**Scheduled + Emergency Mixed**
- 80% planned demand (routine cleanings, cosmetic work, preventive; days-weeks urgency; Agent B)
- 20% emergency demand (tooth pain, breakage; same-day urgency; Agent B)
- **Impact:** Dual CTA: "Schedule Appointment Now" (primary, routine booking) and "Emergency Dental Available" (secondary, urgent triage)
- **Copy tone:** Reassurance-heavy (dental anxiety objection), welcome-focused, education-focused, anxiety-reduction emphasis

### Required Sections (In Order)
1. **Hero + New Patient Welcome** (headline: "New Patients Welcome. Same-Day Appointments Available."; CTA: "Schedule Appointment" or "Emergency Dental"; Agent C: "Same-day appointments available as hero-level messaging" validates; Agent B: new patient acceptance prominent)
2. **Services Separated by Category** (General Dentistry vs. Cosmetic Dentistry; Agent C: "Cosmetic services explicitly featured"; separation acknowledges different urgency paths)
3. **Why Us / Anxiety-Reduction Positioning** (dedicated section for anxious patients with testimonials from anxious patients; "pain-free dentistry" guarantee; sedation options explained; Agent B: identifies as decision factor; Agent C: validates "underaddressed on real sites"; opportunity)
4. **Meet the Team** (provider photos + credentials + warmth signaling; keep simplified; Agent C: "Staff directory with bios deprioritized"; keep to 2-3 key providers)
5. **Testimonials** (4-6 with photos; emphasis on "felt comfortable", "no pain", "great experience"; Agent B/C: anxiety-relief emphasis validates)
6. **Before-and-After Gallery** (cosmetic dentistry focus; 8-10 images organized by procedure: whitening, veneers, aligners; Agent C: validates for cosmetic focus)
7. **Insurance + Payment Options** (insurance list + interactive checker (optional); "payment plans available" callout; Agent B: identifies "Do you accept my insurance?" as primary objection; Agent C: validates insurance list prominence)
8. **Treatment Process Explained** (what to expect: initial exam, treatment, follow-up; emphasize comfort/pain management; Agent C: validates "Treatment process explained")
9. **New Patient Offer** (hero-level pricing: "First cleaning + X-rays: $X"; Agent C: "New patient welcome offer… prominently featured"; opportunity)
10. **Emergency Triage Messaging** ("Emergency Dental Available. Call for Same-Day Appointment."; after-hours contact info in sticky header or hero; Agent C: "emergency underaddressed; opportunity: sticky emergency contact info")
11. **FAQ** (accordion; top questions: "Is it going to hurt?", "How often should I come?", "Do you offer sedation?", "Do you take my insurance?")
12. **Contact + Hours** (phone sticky, address, hours, emergency after-hours line, parking)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| Online appointment booking (Calendly or dental-specific) | Objection: "Do you have appointments available?"; convenience conversion | Agent B: "70% prefer online booking"; Agent C: validates as standard in real sites |
| Online new patient intake form | Objection: "Will I have to fill out forms in-office?"; pre-visit convenience | Agent B: identifies as feature; Agent C: validates "online intake form (pre-visit medical history + insurance capture)" standard in winners |
| Google Reviews widget (recency-filtered) | Third-party validation; review recency signals active practice | Agent B/C: credibility; 80%+ of winners |
| Insurance plan list + interactive checker (optional) | Objection: "Do you accept my insurance?"; transparency | Agent B: identifies; Agent C: validates "Insurance list visible early" |
| Anxiety-reduction positioning (dedicated section) | Objection: "I'm nervous about the dentist"; decision factor (Agent B: identifies; Agent C: validates "underaddressed"; opportunity) |
| New patient offer (hero-level pricing) | Conversion driver; accessibility signal | Agent C: "New patient welcome offer… prominently featured" validates as differentiator |
| Before-and-after gallery (cosmetic focus) | Visual proof of cosmetic dentistry quality | Agent C: validates for cosmetic-focused practices |
| Provider credentials display (DDS + specializations) | Trust signal; competence validation | Agent B/C: validates in winners |
| Testimonials emphasizing comfort + no pain | Social proof; anxiety-relief validation | Agent B/C: real patients validating "no pain" experience |
| Emergency appointment availability messaging | Objection: "What if it's an emergency?"; urgency signal | Agent B: identifies; Agent C: validates "underaddressed"; opportunity for sticky emergency info |

### Copy Voice

**Headline Formula:** [Welcome] + [Availability] = "New Patients Welcome. Same-Day Appointments Available."
- ✓ "Gentle Dentistry for Anxious Patients"
- ✓ "Pain-Free Dental Care You Can Trust"
- ✗ "Professional Dental Services" (too generic)

**Subheading Formula:** [Assurance] + [Accessibility] = "We understand dental anxiety. Sedation options available."

**Primary CTA Text:** "Schedule Appointment" (routine) or "Book Emergency Dental" (urgent)

**Secondary CTA Text:** "Learn About Sedation Options" or "Read Our Reviews"

**Tone Rules:**
- Reassurance-first (dental anxiety is real objection)
- Welcome-focused; "new patients welcome" language
- Education-focused; explain procedures in calm terms
- Avoid over-technical jargon

**Example Copy Progression:**
- Hero: "New Patients Welcome. Same-Day Appointments Available. Pain-Free Dentistry."
- Subheading: "We specialize in anxious patients. Sedation options available. You're in comfortable hands."
- Service card: "Teeth Cleaning: $120 (new patients: free X-rays included). Gentle, thorough care. Relaxing environment."
- Testimonial: "I've been terrified of the dentist my whole life. Dr. Smith's calm approach and explanation made me actually comfortable. I'll be back." — Maria, Austin

### Trust Signals (All Required)
- DDS credentials + state dental board verification (mandatory; Agent C: validates)
- Specialization credentials (orthodontist, cosmetic, oral surgeon) if applicable (Agent C: validates)
- "New patients welcome" messaging (Agent B: identifies; Agent C: validates "New patient acceptance visible, prominent" standard)
- "Same-day appointments available" callout (Agent C: validates as hero-level positioning)
- Real patient testimonials emphasizing comfort (Agent B/C: anxiety-relief signal)
- Insurance transparency (Agent B: identifies as objection; Agent C: validates "Insurance list visible early")
- "Pain-free dentistry" or sedation options (Agent B: identifies anxiety objection; Agent C: validates as differentiator)

### Mandatory Integrations (Ranked)
1. **Online appointment booking** (Calendly or dental-specific: Dentrix, Eaglesoft integration; Agent B/C: standard for routine + emergency triage)
2. **Online new patient intake form** (pre-visit medical history + insurance capture; Agent B: identifies; Agent C: validates standard)
3. **Google Reviews Widget** (recency-filtered; Agent B/C: credibility)
4. **Insurance plan list + interactive checker (optional)** (manually curated or Stripe Health integration if available; Agent B: identifies; Agent C: validates)
5. **SMS reminders** (appointment reminder + post-visit follow-up + recall reminders for maintenance; Agent B: engagement; Agent C: validates)

### Conversion Actions (Ranked by Priority)
1. **Schedule Appointment (Calendly or Dental Software)** — Primary routine path (Agent B: 70% prefer online; Agent C: validates standard CTA)
2. **Book Emergency Dental (Phone or Special Form)** — Secondary urgent path (Agent B: 20% emergency demand; Agent C: validates separate triage)
3. **Learn About Sedation Options (Link or Form)** — Anxiety-objection handler (Agent B: identifies; Agent C: validates differentiator)
4. **View Our Before-and-After (Gallery)** — Cosmetic trust building (Agent C: validates for cosmetic-focused practices)
5. **Read Our Reviews** — Social proof (Agent C: recency-weighted reviews)

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Extensive pediatric design variant** (kid-friendly design, playful tone, parent FAQ) — Agent C: "Most dental sites aren't pediatric-specific"; "Keep one 'We treat children' section; deprioritize dedicated subsite unless confirmed demand"
- ✗ **Multi-dentist directory with specializations** (staff bios, specialization breakdown) — Agent C: "simplify to 'Meet the Team' gallery; drop extensive specialization breakdown unless practice has complex specialties (orthodontics, implants)"
- ✗ **Blog integration** (oral health tips, cavity prevention) — Agent C: "Keep blog link in footer; don't prioritize on homepage"
- ✗ **Treatment cost calculator** (automated estimate tool) — Real sites avoid due to insurance variability; phone quote is standard (Agent C: "Treatment cost calculator avoided in real sites")
- ✗ **Insurance coverage checker tool** (interactive tool) — Agent C: "Over-featured. Real sites: 'Call to verify coverage', not interactive tool"
- ✗ **Online intake form as prominent feature** — Real sites use minimal; save for in-office (Agent C: validates minimal online use)

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Light Blue (#e0f2fe or #bfdbfe) or Mint (#d1fae5) | Calm, professional, dental/healthcare aesthetic (Agent C: validates light blue/mint as trust signals) |
| **Secondary Color** | White | High contrast; clean aesthetic; professional |
| **Accent Color** | Blue or Teal | Trust signal; calming color psychology (Agent C: validates for anxiety-reduction positioning) |
| **Hero Imagery** | Smiling patient with dentist (real photo) or beautiful smile close-up | Warmth signal; avoid clinical imagery (Agent C: real photos validate) |
| **Typography** | Sans-serif primary (Poppins, Raleway), serif secondary (Lora) | Professional-friendly blend; modern dental brand |
| **Service Card Icons** | Industry standard (tooth = cleaning, brush = preventive, smile = cosmetic) | Visually distinct by service; intuitive |
| **CTA Button Style** | Solid blue or teal + white text + 44px+ height | Calming color; high contrast; touch-friendly |
| **Testimonial Photos** | Real patient smiles (professional headshots; diverse age, smile types) | Authenticity signal; visual proof of results (Agent C: real > avatars) |
| **Before-and-After Slider** | Side-by-side smile transformation | Mobile swipe gesture support; highlight cosmetic results (Agent C: validates) |
| **Provider Photos** | Professional headshots with warm expression | Humanization; reduce anxiety through familiarity (Agent C: validates "Meet the Team" warmth) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 65-70% of visitors | Agent B |
| **Appointment Booking Rate** | 30-40% of page visitors (high for online booking) | Agent B: 70% prefer online; Agent C: validates |
| **Google Reviews Minimum** | 4.4+ stars | Agent B: competition; review rating important |
| **Average Session Duration** | 2-4 minutes | Agent C: mobile-first; appointment focus drives short sessions |
| **Bounce Rate Target** | <50% (mobile), <40% (desktop) | Agent B: routine booking industry; moderate engagement |
| **Conversion Rate** | 10-15% (lead gen); 5-8% (direct booking) | Agent B: online booking drives higher conversion |

### Open Decisions (Client Must Provide)
1. **DDS credentials + state licensing** — State dental board license #? Specializations? (Agent C: mandatory for verification links)
2. **New patient offer pricing** — What's your introductory offer? (Agent C: validates as hero-level differentiation)
3. **Insurance acceptance list** — Which insurance plans accepted? (Agent B: identifies as primary objection; Agent C: validates "Insurance list visible early")
4. **Sedation options availability** — Nitrous oxide? Oral sedation? IV sedation? (Agent B: anxiety objection; requires capability confirmation)
5. **Emergency availability + after-hours contact** — How do patients reach you in emergency outside business hours? (Agent C: validates "after-hours contact info sometimes hidden"; opportunity)
6. **Cosmetic vs. general separation** — Do you offer cosmetic services? Should website separate general vs. cosmetic? (Agent C: validates distinction in real sites)

---

## INDUSTRY 8: RESTAURANT / CAFE

### Urgency Profile
**Immediate + Planned Mixed**
- 60% immediate demand (hungry now; walk-in or quick booking; Agent B)
- 40% planned demand (reservation for special occasion; advance booking; Agent B)
- **Impact:** Hero section emphasizes "Open Now" status, reservation availability, and immediate menu access; <2 minute average session demands friction-free navigation
- **Copy tone:** Appetite appeal, hospitality-focused, convenience emphasis, community/local positioning

### Required Sections (In Order)
1. **Hero + Reservation/Order CTA** (headline emphasizes "Open Now" status, "Walk-ins Welcome" or "Advance Reservations Recommended"; food/ambiance photography as hero-level visual; Agent C: "Hours + status prominence" + "Real-time reservation availability display"; Agent B: 77% mobile + "average time on site <2 minutes" demands friction-free)
2. **Menu Accessibility** (full menu visible without visiting; searchable/filterable (dietary labels clickable, allergenic ingredients toggleable); Agent B: 77% mobile; Agent C: "Menu easily accessible — Full menu visible online before visit"; must be mobile-optimized)
3. **High-Quality Food / Ambiance Gallery** (food photography, interior/exterior atmosphere; Agent C: "Food photography quality as conversion driver; appetite appeal is #1 driver")
4. **Hours + Status Prominence** (sticky header "Open Until 10 PM" or "Closed (Open at 5 PM)" badge; Agent C: "Hours displayed prominently — Hero + header + footer; open/closed status clear" validates)
5. **Walk-in vs. Reservation Policy** (clarity: "We welcome walk-ins" or "Advance reservations recommended"; expected wait time if applicable; Agent C: "Walk-in vs. reservation policy clarity" as gap; opportunity)
6. **Location + Parking + Directions** (Google Map embedded, full hours, parking info, accessibility; Agent C: validates "Google Map embedded, full hours, parking info, accessibility")
7. **Real-Time Reservation / Delivery Integration** (OpenTable/Tock/Resy integration with "availability at a glance" display; DoorDash/Uber Eats/Grubhub buttons if offering delivery; Agent C: "Real-time reservation availability display" validates standard; "Delivery/takeout integration clarity" as gap)
8. **Reviews + Social Proof** (Google Reviews widget, user-generated photos trusted over professional; Agent C: "User-generated photos of food/ambiance (increasingly trusted vs. restaurant photos)")
9. **Local Sourcing / Ingredient Story** (farm-to-table, locally sourced, seasonal positioning; Agent C: "Local sourcing/ingredient story" validates as winning pattern real sites feature)
10. **Media Mentions / Influencer Features** ("As featured in [publication]", Instagram integration; Agent C: "Social proof from influencers / local media" validates)
11. **Hygiene + Health Department Rating** ("Health Department Rating: A" badge with link to public record; Agent C: validates as "Hygiene rating badge")
12. **Contact + Reservations** (phone, hours, reservation link prominent, delivery platform buttons)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| Real-time reservation availability display (OpenTable/Tock) | Objection: "Do you have availability?"; friction reduction (Agent B: 60% immediate demand) | Agent C: "Real-time reservation availability display" standard; "availability at a glance" validates |
| Mobile menu optimization (searchable, filterable, dietary labels) | Objection: "Do you have dietary options?"; mobile dominance means menu UX critical | Agent B: 77% mobile; Agent C: "Mobile-optimized menu (most browsing happens on phone)" validates |
| Hours + status prominently displayed (sticky header badge) | Objection: "Are you open?"; decision gating (Agent B: "open now?" as decision factor) | Agent C: "Hours + status prominence" validates as standard |
| Walk-in vs. reservation policy clarity | Objection: "Can I just walk in?" + "Do I need a reservation?"; clarity | Agent C: validates "Walk-in vs. reservation policy clarity" as gap; opportunity |
| Menu fully visible online + accessible without account creation | Objection: "What's on the menu?"; research phase (Agent B: 77% mobile before visit) | Agent C: "Menu easily accessible — Full menu visible online" validates |
| Delivery/takeout integration (DoorDash/Uber Eats/Grubhub buttons) | Separate search intent; convenience for non-dine-in customers (Agent B: identifies; Agent C: validates "Delivery/takeout integration clarity" as gap) |
| High-quality food photography (professional, appetite appeal) | Visual conversion driver; first impression (Agent C: "Food photography quality as conversion driver; appetite appeal is #1 driver") validates |
| Location/parking/accessibility information | Objection: "Where are you?" + "Is parking available?" (Agent B: identifies; Agent C: "Parking info accessible" validates) |
| Google Reviews widget (recency-filtered) | Third-party validation; recent reviews signal active business (Agent B/C: credibility) |
| User-generated photos (Instagram feed) | Community visibility + authenticity (Agent C: "User-generated photos trusted over restaurant photos") |

### Copy Voice

**Headline Formula:** [Experience] + [Availability] = "Amazing Food. Warm Hospitality. Open Until 10 PM."
- ✓ "Farm-Fresh Cuisine. Local Ingredients. Walk-Ins Welcome."
- ✓ "Seasonal Menu. Community Table. Reservations Available Now."
- ✗ "Fine Dining Restaurant" (too generic)

**Subheading Formula:** [Local Positioning] + [Emotion] = "Locally sourced. Made with love. Dine with us tonight."

**Primary CTA Text:** "Make a Reservation" (OpenTable/Tock) or "Order for Delivery" (DoorDash/Uber)

**Secondary CTA Text:** "View Our Menu" or "Read Our Reviews"

**Tone Rules:**
- Hospitality-focused; warmth and community emphasis
- Local positioning; farm-to-table or neighborhood narrative
- Appetite appeal in all food descriptions
- Avoid pretentious language; focus on comfort and community

**Example Copy Progression:**
- Hero: "Farm-Fresh Cuisine. Local Ingredients. We're Open Until 10 PM."
- Subheading: "Dine-in, takeout, or delivery. Seasonal menu. Walk-ins welcome."
- Menu section: "Grilled Salmon with Seasonal Vegetables (GF). Wild-caught salmon, local spring vegetables, house butter. $28"
- Testimonial: "The food was incredible and the vibe was so welcoming. We felt like part of the community. Best night out in months." — Alex, Denver

### Trust Signals (All Required)
- "Open Now" status (sticky header or hero badge; Agent C: validates)
- Real food photography (professional, appetite appeal; Agent C: "High-quality food photography — Appetite appeal is #1 driver")
- Google Reviews widget showing recent validation (Agent C: "Recent reviews signal active business")
- Health department rating badge (Agent C: "Hygiene rating badge validates; if available")
- User-generated photos from customers (Agent C: "increasingly trusted vs. restaurant photos")
- Local sourcing / ingredient story (Agent C: validates as winning pattern)
- Clear walk-in + reservation policy (Agent C: validates as gap/opportunity)

### Mandatory Integrations (Ranked)
1. **OpenTable or Tock booking** (real-time availability + reservation management; Agent B: implies; Agent C: validates "Reservation system integrated — Resy/OpenTable seamlessly integrated")
2. **Google Reviews Widget** (recency-filtered, recent reviews signal active business; Agent B/C: credibility)
3. **Google Maps** (location, directions, hours, parking notes; Agent C: validates standard)
4. **Delivery platform buttons** (DoorDash, Uber Eats, Grubhub if applicable; Agent C: "Delivery/takeout integration clarity" validates as gap)
5. **Instagram feed embed** (community visibility + user-generated content social proof; Agent C: "User-generated photos" validates)

### Conversion Actions (Ranked by Priority)
1. **Make a Reservation (OpenTable/Tock)** — Primary path; real-time availability (Agent C: validates standard CTA; <2 min session demand immediate access)
2. **Order for Delivery (DoorDash/Uber/Grubhub)** — Secondary path; convenience for non-dine-in (Agent B: identifies; Agent C: validates separate path)
3. **View Full Menu** — Discovery/research (Agent B: menu access as pre-visit research phase; Agent C: validates)
4. **Check Our Hours** (sticky header link) — Quick status check (Agent C: "Hours displayed prominently" validates)
5. **Read Our Reviews** — Social proof (Agent C: recency-weighted reviews)

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Extensive chef/team profiles** (head chef + key staff bios, culinary philosophy) — Agent C: "77% mobile, <2 min time-on-site"; "Keep 2-3 team photos + brief bios; kill extensive backstory sections"
- ✗ **Special events calendar** (happy hour, wine nights, chef's special) — Agent C: "Only high-end restaurants feature"; "Make conditional" (optional unless special events drive demand)
- ✗ **Blog / news section** (new dishes, chef updates, seasonal menus) — Agent C: "Keep blog URL; don't feature on homepage" (secondary nav priority)
- ✗ **Behind-the-scenes content** (preparation/sourcing photos as primary) — Agent C: "Simplify imagery to finished dishes + restaurant environment; deprioritize ingredient/prep photography"
- ✗ **Wine/beverage pairing guide** — Real restaurants don't implement unless fine dining (Agent C: "Remove from defaults")
- ✗ **Online ordering integration** (embed DoorDash) — Agent C: "Some feature it hero-level, others skip; optional, not required"

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Warm (brown, tan, gold) or brand color | Appetite appeal; warmth signal (Agent C: validates warm tones in real sites) |
| **Secondary Color** | White or Cream | Clean, elegant; food photography contrast |
| **Accent Color** | Orange or Deep Red | Appetite appeal; warm accent (Agent C: validates warm color schemes) |
| **Hero Imagery** | High-quality food photography or restaurant ambiance (real photo, not stock) | Appetite appeal; professional quality critical (Agent C: "Food photography quality as conversion driver"; 95%+ of winners) |
| **Typography** | Sans-serif primary (Poppins, Raleway), serif secondary (Lora) | Modern-elegant balance; readable on mobile |
| **Service Card Icons** (if used) | Minimalist icons (fork/knife, plate, wine glass) | Visual distinction by category; elegant aesthetic |
| **CTA Button Style** | Solid warm color + white text + 44px+ height | Appetite appeal through color; high contrast; touch-friendly |
| **Gallery Photos** | Food photography (finished dishes, ambiance, community) + user-generated photos | Professional quality + authenticity (Agent C: validates UGC trust) |
| **Review Display** | Google Reviews widget with recent reviews + star rating + customer photos | Recency emphasis; real customer voices (Agent C: validates recency weighting) |
| **Hours / Status Badge** | Sticky header placement; clear "Open Until X" or "Closed (Open at Y)" | Mobile-first; immediate status visibility (Agent C: validates sticky placement) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 77% of visitors | Agent B |
| **Average Session Duration** | <2 minutes | Agent C: "Mobile-first: <2 min avg" |
| **Reservation Booking Rate** | 40-60% of diners (varies by concept) | Agent B: 60% immediate demand; Agent C: validates reservation integration |
| **Google Reviews Minimum** | 4.3+ stars | Agent B: food/hospitality competition; review rating critical |
| **Bounce Rate Target** | <60% (mobile), <45% (desktop) | Agent B: mobile-dominant; short session = high friction → high bounce |
| **Conversion Rate** | 8-15% (reservation/delivery) | Agent B: immediate demand + convenience drive high conversion |

### Open Decisions (Client Must Provide)
1. **Menu format + dietary accommodations** — Full menu available for review? Dietary labels (GF, vegan, etc.)? Allergen info? (Agent C: "Allergen/dietary info accessibility" validates as compliance becoming standard)
2. **Walk-in vs. reservation policy** — Are walk-ins welcome? Reservation-only? Expected wait times? (Agent C: validates "Walk-in vs. reservation policy clarity" as gap; opportunity)
3. **Hours + holiday closures** — Regular hours? Holiday closures? Special event hours? (Agent C: validates "Hours displayed prominently" standard)
4. **Delivery/takeout offerings** — Do you offer delivery (DoorDash/Uber/Grubhub)? Takeout? (Agent B: identifies as separate intent; Agent C: validates integration)
5. **Parking + accessibility** — Street parking? Paid lot? Valet? Wheelchair accessible? (Agent C: validates "Parking info accessible" + "Accessibility" as real-site validation)
6. **Special events / private dining** — Do you host events? Private dining available? (Agent C: validates as conditional; only if demand-driven)
7. **Local sourcing / ingredient story** — Do you use local suppliers? Farm-to-table story? (Agent C: validates as winning pattern in real sites)
8. **Health department rating** — Available? Current rating? Link to public record? (Agent C: validates "Health Department Rating: A badge" as trust signal)

---

## SUMMARY TABLE: Industry Patterns Quick Reference

| Industry | Urgency | Primary CTA | Key Trust Signal | Critical Gap (From Cross-Review) | Mandatory Integration |
|----------|---------|------------|------------------|----------------------------------|----------------------|
| **Plumbing** | Emergency/Scheduled | Call or Book | License + Response Time | Phone placement prominence | Twilio SMS + Calendly |
| **HVAC** | Emergency/Seasonal | Schedule/Estimate | NATE Cert + Financing | Financing prominence + seasonal switch | Email campaigns + Calendly |
| **Electrical** | Emergency/Planned | Call or Book | License + Master Credential | License visibility + emergency pricing | Live availability + Google Ratings |
| **Landscaping** | Recurring/Seasonal | Subscribe or Quote | Portfolio + Local proof | Service area ZIP + seasonal messaging | Recurring booking + SMS |
| **Auto Repair** | Urgent/Planned | Schedule or Quote | ASE + Warranty | Warranty prominence + honest messaging | Google Ratings + SMS |
| **Med Spa** | Consultation/Planned | Schedule Consult | Provider Credentials | Cost transparency + educational blog | Consultation booking + SMS |
| **Dental** | Scheduled/Emergency | Schedule or Emergency | DDS + Insurance list | Anxiety reduction section + emergency info | Online booking + SMS |
| **Restaurant** | Immediate/Planned | Reserve or Order | Food Photo + Hours | Menu optimization + parking clarity | OpenTable/Tock + Instagram |

---

**End of INDUSTRY-PATTERNS.md**

---

# V2 WELLNESS CLUSTER (Industries 9-15)

## INDUSTRY 9: CHIROPRACTIC

### Urgency Profile
**High Urgency, Pain-Driven**
- 42% of bookings outside business hours (acute pain demand; Agent B)
- Same-day/next-day availability critical (Agent B/C validates)
- **Impact:** Mobile sticky CTA with phone number, hero-level urgency messaging ("Same-Day Openings Available")
- **Copy tone:** Warm clinical, trust-building, pain-focused, symptom-specific outcome promises

### Required Sections (In Order)
1. **Hero with Urgency** (pain-focused headline + professional chiropractor image + "Schedule Your Free Consultation" CTA + persistent phone in header/hero/sticky footer)
2. **Conditions Treated** (back pain, neck pain, headaches, sports injuries organized as landing page anchors; Agent C: condition-specific pages as SEO strategy)
3. **How It Works** (3-step visual: Consultation → Diagnosis → Treatment Plan; Agent C: validates process clarity as trust builder)
4. **Practitioner Bios** (doctor photo in clinical setting, DC license number + state verification link, years of experience, specialties, personal touch last; Agent C: real backgrounds beat neutral)
5. **Services** (modalities with icons: spinal manipulation, wellness plans, sports injury care; Agent C validates icon-based organization)
6. **Testimonials** (video testimonials preferred 30-60 sec, structured outcomes: pain scale 8→2, timeline, patient name/quote; Agent B/C: quantified outcomes > generic praise)
7. **Insurance Information** (accepted plans list above-fold, copay information, verification CTA "Verify Your Coverage"; Agent B: insurance transparency converts)
8. **New Patient Offer** (prominent hero banner: "$49 First Visit" or "Free Consultation"; Agent C: visual anchoring larger than business name)
9. **FAQ** (accordion: insurance questions, referral needs, treatment duration, safety protocols, contraindications)
10. **Contact** (phone in header/hero/sticky footer minimum, appointment booking widget embedded, maps)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| **Video testimonials (30-60 sec)** | 3x conversion lift vs. text; patient speaks authenticity | Agent B/C: quantified 3x+ multiplier |
| **Insurance logos + accepted plans list** | Removes insurance objection; above-fold placement | Agent B/C: non-negotiable for conversion |
| **Doctor photo in clinical setting** | Real backgrounds beat neutral; 20%+ trust lift | Agent C: professional attire (white coat) + treatment room validates |
| **Same-day availability messaging** | Addresses acute pain urgency (42% off-hours booking demand) | Agent B: urgency converter; Agent C: persistent phone validates |
| **Condition-specific landing pages** | SEO + conversion segmentation (back pain → /back-pain, etc.) | Agent C: condition-organized navigation standard in winners |
| **Practitioner specializations callout** | "Dr. Smith - Sports Injury Specialist" as primary headline | Agent C: specialization-first bio structure validates |
| **Insurance verification CTA** | "Verify Your Coverage" inline with insurance section | Agent B: friction removal; Agent C: only 30% of sites show (opportunity) |
| **Mobile sticky CTA (44px button)** | Zero-friction emergency booking on mobile | Agent C: fixed bottom button standard; critical for mobile dominance |
| **Pain scale testimonials (8→2, 6 weeks)** | Quantified outcomes outperform generic | Agent B: specific metrics convert; Agent C: validates time-to-outcome |
| **Google Reviews widget** | 4.8+ rating, 30+ reviews minimum; recency-filtered | Agent B/C: social proof table-stakes |

### Copy Voice

**Headline Formula:** [Symptom/Pain] + [Speed] + [Expertise] = "Chronic Back Pain? Relief in 2-4 Weeks. Licensed, Evidence-Based Care."
- ✓ "Neck Pain Relief Available Today"
- ✓ "Sports Injury? Get Back in the Game"
- ✗ "Comprehensive Chiropractic Services" (too generic)

**Subheading Formula:** [Authority] + [Outcome] = "Dr. Sarah Chen, DC. 15 years serving [community]. Get back to what matters."

**Primary CTA Text:** "Schedule Your Free Consultation" (warm, low-barrier) or "Book Your New Patient Exam"

**Secondary CTA Text:** "Verify Your Coverage" (insurance friction) or "View Our Testimonials"

**Tone Rules:**
- Problem-first (address the pain, not the modality)
- Avoid "subluxation" without explanation; use patient language
- Emphasize outcome (pain reduction, mobility) not technique
- Warm clinical blend: professional credentials + approachable humanity
- No jargon: explain modalities in plain language

**Example Copy Progression:**
- Hero: "Chronic Back Pain? Dr. Chen Has Relieved 2,000+ Patients. Free Consultation Available."
- Subheading: "15 years serving [city]. Evidence-based chiropractic care. Most patients see results in 4-6 weeks."
- Condition card: "Back Pain: Average pain reduction 8/10 → 2/10 in 6 sessions. Non-invasive, hands-on care."
- Testimonial: "I was skeptical about chiropractic. After 4 visits, my back pain was gone. Dr. Chen explained everything clearly." — Michael, Austin (Video, 45 sec)

### Trust Signals (All Required)
- DC license number + state verification link (Agent C: 100% of real sites)
- Years in business + patient volume ("Served 2,000+ patients"; Agent B: credibility anchor)
- Same-day/next-day availability guarantee (Agent B: urgency converter)
- Video testimonials with outcomes (Agent C: 3x conversion lift vs. text)
- Before-and-after outcome testimonials (pain scale, timeline; Agent B/C: quantified > generic)
- Evidence-based care positioning (avoid unsubstantiated wellness claims; Agent B validates clinical credibility need)
- Insurance logo list (Agent B: transparency signal)

### Mandatory Integrations (Ranked)
1. **Acuity Scheduling** (HIPAA-compliant, same-day booking, SMS reminders for appointment adherence; Agent A/C: 85% of wellness industries)
2. **Insurance verification widget** (accepted plans display, copay calculator, pre-auth status if available; Agent B: friction removal priority)
3. **Zoom for telehealth** (post-intake virtual follow-ups emerging; Agent B: consultation pathway option)
4. **IntakeQ** (HIPAA-compliant medical intake; reduce paper forms; Agent A: specialty form management)
5. **Google My Business sync** (local SEO; review aggregation; Agent B: local search dominance)

### Conversion Actions (Ranked by Priority)
1. **Schedule Your Free Consultation (Click-to-Call or Embedded Booking)** — Primary path; urgency signal (Agent C: 99% of winners place phone above form)
2. **Book Your New Patient Exam (Acuity Widget)** — Secondary path; booking widget on homepage
3. **Verify Your Coverage (Insurance Form)** — Friction removal; secondary CTA
4. **View Our Testimonials (Link to Video Gallery)** — Social proof redirect
5. **Call Emergency Service (Fixed Mobile Button, Tel:// Link)** — Sticky footer CTA for after-hours

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Before-and-after photo gallery (body symmetry)** — Agent C: "Medical imaging (X-rays) more credible than symmetry photos; keep optional, deprioritize." Only 35% real sites use; not top converter
- ✗ **Blog section as default** — Agent A: 72% templates include; Agent C: only 35% real sites maintain. Cut from MVP; post-V1 add
- ✗ **"Subluxation" clinical terminology** — Avoid in copy; causes skepticism without explanation
- ✗ **Extended facility tour** — Not conversion driver in real sites; keep minimal or omit
- ✗ **Live technician availability badge** — Only 2/7 real sites; adds complexity without lift

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Clinical Blue (#0052CC, #005A9C) | Trust signal; medical authority (Agent A/C: 85%+ use clinical blue) |
| **Secondary Color** | White | High contrast; professional |
| **Accent Color** | Warm Orange (#FF8C42) or Earth Tone | Energy/health signal; CTA button warmth (Agent B: color psychology validates) |
| **Hero Imagery** | Real chiropractor treating patient in clinic setting | Professional documentation; patient + practitioner visible (Agent C: real work beats stock) |
| **Typography** | Serif headers (authority), sans-serif body (clarity) | Professional blend; readable mobile |
| **Service Card Icons** | Industry standard (spine, hands, mobility icons) | Visually distinct by modality |
| **CTA Button Style** | Warm color (orange/rust) + white text + 44px+ height | Touch-friendly; stands out against blue background |
| **Testimonial Photos** | Real patient headshots (diverse age, professional context) | Authenticity signal (Agent B/C: real > avatars); diverse body types |
| **Practitioner Photos** | Professional headshot in clinic setting (white coat/business casual) + treatment room background | Real backgrounds validate trust; 20%+ lift (Agent C) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 65% of visitors | Agent B |
| **Same-Day Booking Rate** | 35-40% of hero CTAs | Agent B: acute pain urgency |
| **Phone Click Rate** | 45%+ of mobile visitors | Agent C: phone dominance in healthcare |
| **Testimonial Impact** | Video > text 3x conversion | Agent C: quantified multiplier |
| **Google Reviews Minimum** | 4.8+ stars, 30+ reviews | Agent B: credibility threshold |
| **Average Session Duration** | 2-3 minutes | Agent C: mobile-first urgency |
| **Bounce Rate Target** | <45% (mobile), <35% (desktop) | Agent B: healthcare baseline |
| **Conversion Rate** | 8-12% lead gen; 5-8% calls | Agent B: urgency-weighted |

### Open Decisions (Client Must Provide)
1. **Licensed credential state** — DC license number + state for verification link
2. **Same-day availability guarantee** — Can you commit to same-day appointments? What's realistic SLA?
3. **Patient volume** — How many patients served? Good credibility anchor ("2,000+ patients")
4. **Condition specialties** — Which conditions do you treat? (anchors for condition-specific landing pages)
5. **Insurance accepted** — Which plans? Can you provide list for display?
6. **Video testimonial inventory** — Do you have 3-5 patient testimonials on video? If not, plan to collect

---

## INDUSTRY 10: MASSAGE THERAPY / BODYWORK

### Urgency Profile
**Recurring + Low Urgency**
- 78% of bookings mobile local search ("massage therapist near me"; Agent B)
- 60% of revenue from recurring memberships/packages (Agent B)
- Mobile booking completion = table-stakes (Agent B: 3-5x conversion lift with embedded booking)
- **Copy tone:** Therapeutic calm, wellness-first, permission language, luxury-accessible blend

### Required Sections (In Order)
1. **Hero with Embedded Booking** (serene spa image + "Book Your Relaxation" CTA + embedded calendar widget inline; Agent C: embedded booking 3-5x lift vs. external links)
2. **Services Menu** (6-8 service cards: Swedish, Deep Tissue, Hot Stone, Aromatherapy, Sports Massage, Prenatal; with prices visible; Agent C: service grid not list)
3. **Therapist Directory** (therapist photos + LMT credentials + specialties + individual therapist availability; "Book with [Name]" button; Agent C: therapist-specific bookings > shared calendar)
4. **Pricing & Packages** (single session rates + package discounts visible ("5-pack saves $50") + membership tiers + gift certificates; Agent B: package discounts drive recurring revenue 60%+)
5. **Treatment Room Gallery** (4-6 photos of clean, peaceful treatment room; NOT spa aesthetic alone but hygiene emphasis; Agent B/C: cleanliness objection handler)
6. **Testimonials** (client testimonials with photos (18%+ conversion lift per Agent C) emphasizing relaxation + stress reduction; video testimonials 30-sec preferred)
7. **Therapist Specializations** ("Sports Massage Specialist", "Prenatal Expert", "Myofascial Release Certified"; Agent C: specialization headline validates)
8. **New Client Offer** ("10% Off Your First Massage" visible in hero or pricing section; Agent C: visual prominence)
9. **FAQ** (accordion: "What should I wear?", "Is massage therapeutic?", "Contraindications/pregnancy?", "Cancellation policy?")
10. **Contact** (phone in header + hero + sticky footer, hours including evening availability, embedded maps)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| **Embedded booking calendar on homepage** | 3-5x conversion vs. external links; frictionless mobile | Agent C: "Visitors book without leaving site"; quantified multiplier |
| **Therapist-specific availability display** | Customers book therapist by name; relationship critical | Agent B: therapist specialization + reviews per therapist |
| **Soft CTA language ("Book Your Relaxation")** | Massage psychology is "escape" not "transaction" | Agent C: psychological framing validates; not "Buy Now" |
| **Testimonial photos** | 18%+ conversion lift vs. text-only testimonials | Agent C: visual element impact quantified |
| **Treatment room photos (hygiene focus)** | Cleanliness explicitly blocks conversion if missing | Agent B: environmental trust signal; post-COVID critical |
| **Video testimonials (30-60 sec)** | 2-3x conversion vs. text; client speaks authenticity | Agent B/C: video multiplier consistent |
| **Massage type matcher/comparison** | Customer education; "Swedish vs. deep tissue vs. myofascial" | Agent B: educates customer decision-making |
| **Package pricing with % savings visible** | Drives membership/recurring revenue 60% of total | Agent B: recurring revenue emphasis critical for massage |
| **Google Reviews widget** | 4.8+ stars, 30+ reviews; recency-filtered | Agent B/C: credibility baseline |
| **Mobile-optimized single-step checkout** | Pick therapist → pick time → confirm, no desktop complexity | Agent B: mobile = primary booking channel |

### Copy Voice

**Headline Formula:** [Permission/Escape] + [Benefit] = "Escape the Stress. Book Your Healing Today."
- ✓ "Melt Into Relaxation"
- ✓ "Massage Therapy for Pain Relief & Stress Reduction"
- ✗ "Professional Massage Services" (too generic)

**Subheading Formula:** [Wellness Frame] + [Accessibility] = "Massage isn't a luxury—it's self-care. You deserve to feel better."

**Primary CTA Text:** "Book Your Massage Now" (warm, inviting)

**Secondary CTA Text:** "Claim Your First-Time Client Discount" or "Gift a Massage"

**Tone Rules:**
- Permission language ("Let yourself be taken care of")
- Wellness-first framing (health benefit, not indulgence)
- Therapeutic credibility (blend clinical + holistic)
- Soft, inviting tone (no pressure, low-barrier entry)
- Seasonal/timely hooks ("Combat holiday stress," "Post-workout recovery")

**Example Copy Progression:**
- Hero: "You deserve to feel better. Book your relaxation today."
- Subheading: "Swedish, deep tissue, hot stone, and specialty therapies. Licensed, experienced therapists."
- Service card: "Deep Tissue Massage: 60 min. Targets muscle tension and pain. $85 single session, $350 for 5-pack (save $75)."
- Testimonial: "I come every other week. [Therapist Name] really understands my tight shoulders and the stress relief is incredible." — Jennifer (Video, 45 sec, testimonial photo)

### Trust Signals (All Required)
- LMT (Licensed Massage Therapist) credentials + state license verification link (Agent C: 100% of real sites)
- Years of experience + specialization certifications (Agent A/C: expertise signal)
- Treatment room cleanliness photos (Agent B: hygiene objection handler)
- Testimonials with client photos (Agent C: 18%+ conversion lift)
- Google Reviews widget (4.8+ minimum, 30+ reviews; Agent B/C: social proof)
- Cancellation policy transparency (Agent C: 48-hour cancellation visible = conversion reducer friction)
- Real therapist photos (Agent C: real > stock; warmth/approachability critical)

### Mandatory Integrations (Ranked)
1. **MindBody** (dominant for spa/massage chains; built-in membership/recurring billing; Agent A: 60%+ adoption in segment)
2. **Acuity Scheduling** (boutique studios; therapist-specific availability; Agent A: growing for independent therapists)
3. **Stripe/Square recurring billing** (membership subscriptions backbone; Agent A/C: 88% of wellness)
4. **Mailchimp consent-based newsletter** (post-booking email only; HIPAA privacy-first; Agent A: opt-in model required)
5. **Google My Business sync** (local search dominance; review aggregation; Agent B: 90%+ of all industries)

### Conversion Actions (Ranked by Priority)
1. **Book Your Massage Now (Embedded Calendar)** — Primary path; no external redirect (Agent C: 3-5x lift vs. external)
2. **Claim Your First-Time Client Discount** — Friction removal; visual prominence
3. **Gift a Massage (Gift Certificate Purchase)** — Secondary revenue; e-commerce integration
4. **Become a Massage Member (Recurring Billing CTA)** — Membership focus; revenue stabilization
5. **View Available Therapists** — Social proof + credibility redirect

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Newsletter signup as default** — Agent A: 68% templates include blog; Agent C: only 45% real massage sites maintain blogs. Kill as default; post-V1 if content calendar exists
- ✗ **FAQ section as primary feature** — Agent A: 75% include; Agent C: lower priority than testimonials + booking. Make optional
- ✗ **Extended facility tour (8+ photos)** — Mobile dominance; cut carousel to 3-4 key photos
- ✗ **Retail shop integration** — Agent C: doesn't surface as converter. Defer unless explicit revenue stream

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Sage Green (#9CAF88, #A0A88F) or Soft Spa Blue (#6B9BB4) | Calming spa aesthetic (Agent A/C: 85%+ use warm neutrals) |
| **Secondary Color** | Cream/Off-White | Luxury, natural feel |
| **Accent Color** | Warm Stone/Taupe | Evokes natural elements, wellness aesthetic |
| **Hero Imagery** | Spa interior with candles/plants, serene nature (water, plants) OR massage in progress (professional, respectful) | Aesthetic appeal; therapeutic environment (Agent C: real environment beats stock) |
| **Typography** | Elegant serif headers (luxury feel), clean sans-serif body | Professional + inviting blend |
| **Service Card Icons** | Spa-specific (water, stones, hands, candle) | Visually distinct by service type |
| **CTA Button Style** | Soft warm color (sage, taupe) + white text + 44px+ height | Inviting, non-aggressive; spa psychology |
| **Testimonial Photos** | Real client headshots (diverse, happy, candid) | Authenticity; human connection (Agent B/C: real > avatars) |
| **Treatment Room Photos** | Clean, organized, peaceful space; towels, oils, candles visible | Hygiene + atmosphere assurance (Agent B: post-COVID critical) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 78% of local search ("massage near me") | Agent B |
| **Embedded Booking Conversion** | 3-5x vs. external links | Agent C: quantified multiplier |
| **Recurring Revenue (Memberships)** | 60% of total | Agent B: revenue model emphasis |
| **Testimonial with Photo Impact** | 18%+ conversion lift | Agent C: visual element validation |
| **Google Reviews Minimum** | 4.8+ stars, 30+ reviews | Agent B/C: credibility threshold |
| **Average Session Duration** | 2-3 minutes | Agent C: mobile-first; quick booking decision |
| **Conversion Rate** | 10-15% booking rate from site | Agent C: embedded booking drives high conversion |

### Open Decisions (Client Must Provide)
1. **LMT credentials + state** — License number + state for verification link
2. **Therapist specializations** — What specialties do therapists offer? (sports, prenatal, myofascial, etc.)
3. **Pricing structure** — Single session rate? Package discounts? Membership options?
4. **Membership model** — Do you offer recurring membership? What are tiers/benefits?
5. **Cancellation policy** — What's your cancellation window? (48-hour standard)
6. **Booking system** — MindBody or Acuity? Integration preference?

---

## INDUSTRY 11: GYM / PERSONAL TRAINING

### Urgency Profile
**Low Urgency + Seasonal Peaks**
- Extreme seasonality: 25-30% of annual signups in January (New Year's Resolution peak; Agent B)
- Off-season = low urgency; seasonal copy messaging swaps needed
- Free trial = risk removal (40-45% conversion uplift; Agent B/C)
- **Copy tone:** Energetic/aspirational, community-focused, inclusive, transformation-focused

### Required Sections (In Order)
1. **Hero with Free Trial** ("Start Your Transformation" + "Claim Your 7-Day Free Pass" CTA + before-and-after gallery visible without scroll; Agent C: before-after 23%+ lift)
2. **Success Stories / Transformations** (before-and-after gallery, 6-12 visible above fold, member name + weeks to goal + goal type; Agent C: 23%+ conversion lift; reorder: move after hero)
3. **Classes / Services** (4-6 service cards: group fitness, personal training, specialty classes with difficulty labels; Agent C: intensity/level filters critical)
4. **Class Schedule** (interactive calendar showing real availability + difficulty levels + instructor names + waitlist status; Agent C: transparency before commitment)
5. **Membership Tiers** (3-tier comparison table: Bronze/Silver/Gold with "what's included" + pricing clear; Agent B/C: 3 tiers reduce decision paralysis)
6. **Trainer / Instructor Bios** (photo + name + specialty (strength/cardio/rehab) + certifications (NASM-CPT, CrossFit) + client success stories; Agent C: specialization headline first)
7. **Pricing Comparison** (sticky table on scroll to keep visible; anchoring effect: "$29 first month" vs "$79/month" messaging; Agent C: scroll-spy comparison)
8. **Testimonials** (member transformation stories, video 30-60 sec preferred; outcome specificity: "Lost 20 lbs in 12 weeks," not generic praise)
9. **Facility Overview** (equipment photos, class floor, locker rooms, min 3-5 photos; Agent C: bury facility tour after testimonials, not primary)
10. **Contact + CTA** (phone sticky, map, hours, mobile fixed "Join Now" button minimum 44px)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| **Before-and-after transformation gallery** | 23%+ conversion lift; 6-12 visible above fold | Agent C: quantified placement impact |
| **3-tier membership comparison table** | Reduces decision paralysis; explicit "what's included" | Agent B/C: 3 options optimal; 6+ paralyzes |
| **Free trial or first-month discount** | 40-45% conversion uplift; risk reduction | Agent B/C: "$29 first month" anchoring effect validates |
| **Class schedule with real availability visible before login** | Transparency before commitment; reduces objection | Agent C: showing real spots available = conversion driver |
| **Difficulty/intensity level labels** (Beginner/Intermediate/Advanced) | Beginner intimidation barrier addressed; filtering enables | Agent B: intimidation objection; Agent C: filtering validates |
| **Trainer specialization callouts** | "Sarah - Weight Loss Specialist" not generic bio | Agent C: specialization headline validates |
| **Membership value calculator** | "At 2 classes/week, you save $X/month vs. drop-in" | Agent B: ROI math converts uncertainty |
| **Video testimonials + transformation metrics** | 2-3x conversion; "Lost 20 lbs in 12 weeks" > generic | Agent C: specific metrics validate; video multiplier |
| **Google Reviews widget** | 4.8+ stars, 30+ reviews | Agent B/C: credibility baseline |
| **Mobile fixed CTA button ("Join Now")** | 44px minimum, sticky bottom-right on scroll | Agent C: specific UX pattern standard in real sites |

### Copy Voice

**Headline Formula:** [Transformation] + [Community] + [Action] = "Transform Your Body, Transform Your Life. Join Our Community Today."
- ✓ "Start Your Fitness Journey. No Judgment, Just Results"
- ✓ "Crush Your Goals with Expert Trainers"
- ✗ "Professional Gym Services" (too generic)

**Subheading Formula:** [Inclusivity] + [Specificity] = "All fitness levels welcome. See results in 4 weeks."

**Primary CTA Text:** "Claim Your Free Class" or "Start Your 7-Day Free Trial"

**Secondary CTA Text:** "See Our Class Schedule" or "Meet Our Trainers"

**Tone Rules:**
- Energetic, action verb-heavy (Crush, Achieve, Unlock, Dominate)
- Inclusivity critical ("All levels welcome," "No judgment")
- Community framing (belong to group, shared goals)
- Specific outcomes (timeframes, metrics; not vague "get fit")
- Approachable authority (expert guidance + member support)

**Example Copy Progression:**
- Hero: "Transform Your Body in 12 Weeks. Free 7-Day Pass. All Levels Welcome."
- Subheading: "Expert trainers. Community support. Real results. See members' transformations."
- Class card: "High-Intensity Interval Training (HIIT) - Beginner-Friendly. Tuesday/Thursday 6pm. $20 drop-in or included with membership."
- Testimonial: "I was intimidated at first. After 4 weeks, I lost 8 lbs and have friends here who keep me accountable. Best decision." — Marcus (Video, 45 sec + transformation photos)

### Trust Signals (All Required)
- Real member transformation photos (before-and-after, diverse body types; Agent C: authenticity signal)
- Trainer certifications visible (NASM-CPT, CrossFit, etc.; Agent A: 91% frequency)
- Google Reviews (4.8+ stars, 30+ reviews; Agent B/C: social proof)
- Member testimonials with specific outcomes (Agent B: "Lose 10 lbs in 12 weeks" beats generic)
- Class schedule transparency (real availability visible before commitment; Agent C)
- Free trial / low-barrier entry (Agent B: risk removal converter)
- Facility quality photos (equipment, class floor, professional environment)

### Mandatory Integrations (Ranked)
1. **Wix Bookings (if Wix) or Acuity Scheduling (independent)** — Class + trainer session scheduling
2. **Wix Pricing Plans or Stripe recurring** — Membership management + billing
3. **Zoom for virtual classes** — Post-COVID standard; hybrid offering expected
4. **Instagram feed integration** — Show member activity, community energy (Agent A: growing for fitness community)
5. **Google My Business** — Local SEO; review aggregation

### Conversion Actions (Ranked by Priority)
1. **Claim Your Free Class / 7-Day Free Pass (CTA)** — Primary path; risk removal (Agent C: 40-45% conversion uplift)
2. **See Our Class Schedule (Link)** — Secondary path; transparency
3. **Meet Our Trainers (Directory Link)** — Trust/credibility redirect
4. **Start Your Free Trial (Recurring Booking)** — Membership pathway
5. **Read Our Reviews (Social Proof)** — Credibility anchor

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Facility tour photo carousel (8+ images)** — Agent A: 82% include; Agent C: real winners bury 6-7 sections down. Mobile dominance = minimal photos. Keep 3-5 max
- ✗ **Blog section as default** — Agent A: varies; Agent C: only 40% real gym sites maintain blog. Kill from MVP; post-V1 add
- ✗ **Complex equipment filtering tool** — No demand signal; keep simple class schedule only
- ✗ **Member referral program widget** — Agent C: doesn't surface as converter; defer unless active program

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Bold Energy (Electric Blue #0099FF, Vibrant Orange #FF6B35) | Gym energy aesthetic (Agent A/C: bold colors standard) |
| **Secondary Color** | Dark Gray/Charcoal (#2C2C2C) | Strength signal; contrast |
| **Accent Color** | Neon Green (#39FF14) or Bright Orange | High energy CTA; motivation signal |
| **Hero Imagery** | High-energy action shot (athlete mid-workout, trainer with client, group class energy) | Professional photography of real members (Agent C: real > stock) |
| **Typography** | Bold sans-serif headers (confidence), clean sans-serif body | Modern, high-contrast, readable mobile |
| **Service Card Icons** | Fitness-specific (dumbbells, people, running) | Visually distinct by service |
| **CTA Button Style** | Bold color (neon green/orange) + white text + 44px+ height | High contrast; energetic; touch-friendly |
| **Transformation Photos** | Real member before-and-after, diverse body types, candid success moments | Authenticity; relatability (Agent C: real photos validate) |
| **Trainer Photos** | Professional attire (gym clothes, professional headshot in gym setting) | Real credentials visible; authority |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 60%+ of visitors | Agent B |
| **Free Trial Conversion** | 40-45% uplift vs. no trial | Agent B/C: quantified multiplier |
| **January Peak** | 25-30% of annual signups | Agent B: seasonal concentration |
| **Google Reviews Minimum** | 4.8+ stars, 30+ reviews | Agent B: credibility threshold |
| **Transformation Story Impact** | Specific metrics > generic testimonials | Agent B: "Lose 20 lbs in 12 weeks" converts |
| **Class Schedule View Rate** | 60-70% of visitors check schedule | Agent C: transparency drives engagement |
| **Conversion Rate** | 10-15% lead gen (class booking) | Agent B: trial removal = high conversion |

### Open Decisions (Client Must Provide)
1. **Membership tiers + pricing** — Bronze/Silver/Gold structure with costs
2. **Free trial offering** — 7 days free? First month $X? Length + terms?
3. **Class schedule** — Core classes + times? Specialty offerings?
4. **Trainer specializations** — What specialties (strength, cardio, weight loss, etc.)?
5. **Transformation inventory** — Do you have member before-and-after photos? Testimonial video availability?
6. **Booking system** — Wix, Acuity, or other platform preference?

---

## INDUSTRY 12: YOGA STUDIO / PILATES STUDIO

### Urgency Profile
**Low Urgency, Wellness-Driven + Seasonal**
- Seasonality peaks January (New Year) and September (back-to-routine; Agent B)
- Low urgency allows for serene messaging (no emergency framing)
- Free class offer = 2-3x conversion multiplier (Agent C)
- **Copy tone:** Therapeutic calm, inclusive, transformation narrative, ritual framing

### Required Sections (In Order)
1. **Hero with Beginner-Friendly Messaging** ("Find Your Flow" + "All Bodies, All Abilities Welcome" + "First 3 Classes $30" CTA visible; Agent C: beginner-friendly positioning critical)
2. **Classes Offered** (yoga styles/pilates types with descriptions in plain language; Vinyasa, Hatha, Yin, Restorative, Mat Pilates, Reformer; Agent C: class-type filter explainer needed)
3. **Class Schedule with Filtering** (interactive calendar; filter by level (Beginner/All/Advanced), style (Vinyasa/Yin/etc.), instructor name; Agent C: filtering validates discovery)
4. **Instructor Bios** (photo + RYT certification (RYT-200, RYT-500) + training lineage + specialties + schedule; "Classes taught" listed in bio card; Agent C: specialization headline validates)
5. **Pricing / Memberships** (class packs vs. unlimited membership; "At 2 classes/week, you save $X/month"; intro offer ($30 for 3 classes) prominently displayed; Agent B/C: membership ROI calculator)
6. **Testimonials** (diverse member profiles: "Complete beginner," "Advanced," "Older adult"; transformation narratives about peace/strength; video 30-60 sec preferred)
7. **About the Studio** (2-3 sentences founder story/mission; NOT standalone section; fold into hero or header)
8. **Hybrid Delivery Option** (in-person + live Zoom classes visible; post-COVID standard; Agent B: hybrid demand)
9. **FAQ** (accordion: "I'm not flexible enough," "I'm a complete beginner," "Virtual vs. in-person?", "What should I bring?")
10. **Contact** (phone in header + sticky, embedded booking calendar, maps)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| **"Beginner-Friendly" messaging prominent in hero** | Intimidation barrier removal ("I'm not flexible enough") | Agent B: addresses primary objection; Agent C: validates messaging dominance |
| **Class type filtering (not just time-based)** | Student discovery by preference (Vinyasa, Yin, Hatha) | Agent C: filtering architecture validates conversion lift |
| **Free class offer or first month discounted** | 2-3x conversion uplift vs. no offer | Agent C: quantified multiplier; "First 3 Classes $30" validates |
| **Instructor photos + RYT certifications visible** | Credibility + connection; RYT-200/500 specificity | Agent C: yoga-specific certs validate; "trained by [teacher]" adds depth |
| **Membership ROI calculator** | "At 2 classes/week, you save $X/month vs. drop-in" | Agent B: financial clarity removes objection |
| **Neutral warm color palette (beige/sage/cream)** | 85% of high-performers; psychology of calm sanctuary | Agent C: industry-specific color pattern identifies |
| **Diverse testimonials (beginner, advanced, older adult)** | Inclusivity signal; relatability across ages/abilities | Agent B/C: diversity imagery validates |
| **Hybrid toggle (in-studio + live online)** | Post-COVID hybrid demand; Zoom link visibility per class | Agent B: emerging standard; Agent C: validates option visibility |
| **Video testimonials (30-60 sec)** | 2-3x conversion; student speaks transformation | Agent B/C: video multiplier consistent |
| **Google Reviews widget** | 4.8+ stars, 30+ reviews | Agent B/C: credibility baseline |

### Copy Voice

**Headline Formula:** [Transformation] + [Inclusivity] = "Find Your Flow. All Bodies, All Abilities Welcome."
- ✓ "Yoga Is a Journey, Not a Destination"
- ✓ "Strengthen Your Body, Calm Your Mind"
- ✗ "Professional Yoga Classes" (too generic)

**Subheading Formula:** [Ritual Frame] + [Permission] = "Begin your week centered. End your day grounded."

**Primary CTA Text:** "Book Your First Class" or "Claim Your Intro Offer" (3 classes for $30)

**Secondary CTA Text:** "View Class Schedule" or "Meet Our Instructors"

**Tone Rules:**
- Inclusive, non-judgmental ("Come as you are," "Your body is welcome")
- Ritual/transformation framing (journey, practice, peace)
- Avoid intensity/performance language; emphasize inner work
- Warm, inviting, low-pressure
- Acknowledge variety (different styles, different bodies, different goals)

**Example Copy Progression:**
- Hero: "All Bodies, All Abilities Welcome. Find Your Flow Today."
- Subheading: "Yoga and pilates for every level. Beginner-friendly classes daily."
- Class card: "Beginner Vinyasa Flow - Tuesday 9am. 60 min. Warm up, flowing sequences, cool down. Perfect for new students. $20 drop-in or included with membership."
- Testimonial: "I came in thinking I was too stiff for yoga. Sarah showed me it's not about flexibility—it's about practicing. I've never felt more peaceful." — Linda, 67 (Video, 45 sec)

### Trust Signals (All Required)
- RYT certification (RYT-200, RYT-500; Agent A/C: yoga-specific credentials)
- Instructor training lineage ("Trained in [modality], studied under [teacher]"; Agent C: validates depth)
- Google Reviews (4.8+ stars, 30+ reviews; Agent B/C: social proof)
- Diverse testimonials (beginners, advanced, various ages; Agent C: inclusivity signal)
- Class variety (multiple styles, multiple levels; Agent B: options reduce decision friction)
- Beginner-friendly messaging (visible, repeated; Agent C: critical psychological signal)
- Real instructor photos in studio setting (Agent C: warmth/approachability critical)

### Mandatory Integrations (Ranked)
1. **Acuity Scheduling** (primary for boutique studios; flexible recurring schedules; Agent A: most flexible for class complexity)
2. **Squarespace Scheduling (if Squarespace native)** — Built-in, frictionless
3. **Zoom for hybrid delivery** — Live class streaming + recording archive
4. **Stripe recurring billing** (if non-Squarespace) — Membership billing backbone
5. **Mailchimp consent-based newsletter** — Post-booking email; schedule reminders

### Conversion Actions (Ranked by Priority)
1. **Book Your First Class (Embedded Calendar)** — Primary path; frictionless mobile
2. **Claim Your Intro Offer** (3 classes for $30) — Friction removal; visual prominence hero
3. **View Class Schedule** (Filter + Calendar) — Discovery + transparency
4. **Meet Our Instructors** (Directory) — Trust/connection
5. **Read Our Reviews** — Social proof redirect

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Blog section as default** — Agent A: 71% include; Agent C: only 45% real yoga sites maintain blogs. Kill from MVP; post-V1 add
- ✗ **Retail shop integration (yoga mats, props, clothing)** — Agent C: doesn't surface as converter. Defer unless explicit revenue stream
- ✗ **Workshop calendar / special events** — Agent A: listed as common; Agent C: only 35% of real studios emphasize. Keep minimal secondary content
- ✗ **About section standalone** — Agent C: real winners fold philosophy into hero or 2-3 sentences. Cut full section

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Calming Blue (#5B9BD5, #4A90E2) or Soft Green (#A8D5B8, #7CB342) | Wellness aesthetic (Agent A: calming colors universal) |
| **Secondary Color** | Cream/Off-White | Natural, organic feel |
| **Accent Color** | Peachy Gold (#E8C4A0, #D4AF6A) | Warmth, chakra reference, inspiration |
| **Hero Imagery** | Person in yoga pose (diverse body types, ages) OR serene nature (water, plants, sunset) OR studio with natural light | Relatability + peace aesthetic (Agent C: diverse representation validates) |
| **Typography** | Elegant serif or script headers (organic), clean sans-serif body | Professional + warm blend; readable mobile |
| **Service Card Icons** | Yoga-specific (lotus, person, om symbol) | Visually distinct by class type |
| **CTA Button Style** | Soft warm color (sage, gold) + white text + 44px+ height | Inviting, non-aggressive; wellness psychology |
| **Testimonial Photos** | Real student headshots (diverse age, ethnicity, body type, happy/peaceful expression) | Authenticity; diversity signal (Agent B: inclusivity validates) |
| **Instructor Photos** | Real headshot in studio setting (yoga attire) + warm, approachable expression | Connection signal; humanity (Agent C: warmth critical) |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 60%+ of visitors | Agent B |
| **Free Class Offer Impact** | 2-3x conversion uplift | Agent C: quantified multiplier |
| **January/September Peak** | Seasonality; messaging variations expected | Agent B: seasonal demand spikes |
| **Google Reviews Minimum** | 4.8+ stars, 30+ reviews | Agent B/C: credibility threshold |
| **Membership Adoption Rate** | 60-70% of new students; recurring revenue critical | Agent B: yoga relies on subscriptions |
| **Class Schedule Filterability** | 70%+ interact with filters | Agent C: discovery enablement drives engagement |
| **Conversion Rate** | 12-18% class booking | Agent C: free intro offer drives high conversion |

### Open Decisions (Client Must Provide)
1. **Instructor credentials + training** — RYT-200 or RYT-500? Training lineage? Specialties?
2. **Class schedule** — Core classes + times? Specialty offerings (kids, senior, prenatal)?
3. **Intro offer structure** — 3 classes for $30? First month $49? Length + terms?
4. **Membership tiers** — Class pack pricing? Unlimited monthly? Drop-in rates?
5. **Hybrid delivery** — Do you offer Zoom classes? Live streaming + recording?
6. **Booking system** — Acuity, Squarespace, or other?

---

## INDUSTRY 13: PHYSICAL THERAPY / SPORTS REHABILITATION

### Urgency Profile
**High Urgency (Post-Surgical, Acute Injury)**
- Post-surgical patients need appointment within 2 days (high urgency; Agent B)
- Chronic patients = moderate urgency (weeks-to-months timeline)
- Insurance complexity = highest friction (Agent B: HIPAA + insurance pre-auth critical)
- **Copy tone:** Medical + achievable, evidence-based, patient-centric, outcome-focused, clinical credibility

### Required Sections (In Order)
1. **Hero with Insurance Clarity** ("Get Back in the Game" + "Insurance Accepted" badge above-fold + "Free Initial Evaluation" CTA; Agent B/C: insurance transparency converts)
2. **Conditions Treated** (organized by injury type: knee, shoulder, back, sports injury, post-surgical, arthritis; condition-specific landing pages SEO strategy; Agent C: condition-organized navigation validates)
3. **Insurance Information** (accepted plans list, copay information, pre-auth process explanation, referral upload button; Agent B: friction removal section)
4. **Services / Modalities** (manual therapy, exercise prescription, ultrasound, taping, sports-specific rehab; with icons; Agent C validates)
5. **Therapist Bios** (photo in treatment room + DPT + specialization headline + years experience + board certifications; "Book with [Name]" button; Agent C: specialization-first structure)
6. **Initial Evaluation** (what to expect, duration, cost, what to bring, evaluation pricing transparency; Agent B/C: clarity removes friction)
7. **Testimonials** (outcome-focused: return-to-sport timelines, ROM improvement %, patient name; video 45-60 sec preferred; Agent B: metrics > generic praise)
8. **Telehealth Option** ("Virtual evaluation available," "Hybrid protocol" visible; Agent B: emerging standard)
9. **Referral Information** ("Working with an MD?" referral form download, "Upload referral letter" button; Agent B: mandatory for insurance pathway)
10. **FAQ** (accordion: insurance, referral needs, cost, recovery timelines, whether DR referral required)
11. **Contact** (phone in header + hero + sticky footer, appointment booking embedded, maps)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| **Insurance acceptance "above-fold"** | Primary objection; transparency removes 20%+ friction | Agent B: HIGHEST objection across health industries |
| **Condition-specific landing pages** | SEO + conversion segmentation (knee → /knee-pain, etc.) | Agent C: systematic segmentation by condition validates |
| **DPT credentials + photo in treatment room** | Clinical credibility; 2x conversion lift vs. no photo | Agent C: real backgrounds + credentials quantified 2x multiplier |
| **"Same-day/next-day appointment" guarantee** | Urgency + reliability; addresses post-surgical timeline | Agent B: high-urgency converter; Agent C: 70%+ of winners |
| **Insurance pre-authorization display** | "We verify benefits before your appointment" | Agent B: CRITICAL unaddressed objection in templates |
| **Referral form upload button** | Insurance requirement; visible access critical | Agent B: mandatory; only 30% of sites show (opportunity) |
| **Initial evaluation pricing transparency** | "Evaluation: $150. Your copay estimate: $XX" | Agent B: price shock objection; Agent C: only 30% show (opportunity) |
| **Condition-specific outcome testimonials** | "Knee ACL Repair - Return to soccer in 12 weeks, ROM improved 40%" | Agent B: metrics validate; Agent C: condition-specific structure |
| **Telehealth toggle** | Hybrid protocol (initial in-person, follow-ups virtual) | Agent B: emerging standard post-COVID |
| **Video testimonials (45-60 sec)** | 2-3x conversion; patient speaks outcome authenticity | Agent B/C: video multiplier; outcomes-focused messaging |

### Copy Voice

**Headline Formula:** [Urgency] + [Outcome] + [Authority] = "Back to Sport in 8 Weeks. PT-Led Recovery Programs."
- ✓ "ACL Tear? Expert Rehab, Get Back in the Game"
- ✓ "Evidence-Based Physical Therapy. Return to Strength."
- ✗ "Professional Physical Therapy Services" (too generic)

**Subheading Formula:** [Authority] + [Outcome] = "Licensed PT. Insurance accepted. Average return-to-sport: 8-12 weeks."

**Primary CTA Text:** "Schedule Your Free Evaluation" (low-barrier) or "Book Your Initial Appointment"

**Secondary CTA Text:** "Verify Your Coverage" (insurance friction) or "Download Referral Form"

**Tone Rules:**
- Medical authority + patient empathy ("We understand the pain of being sidelined")
- Evidence-based (cite research, outcomes data)
- Patient-centric (your goals are our goals)
- Outcome-focused (return-to-function, return-to-sport, pain reduction metrics)
- Clinical credibility (DPT credentials, board certifications visible)

**Example Copy Progression:**
- Hero: "ACL Tear? Expert PT Gets Athletes Back to Sport. Insurance Accepted. Free Evaluation."
- Subheading: "Our licensed physical therapists specialize in sports injuries and post-surgical rehab. Average return-to-sport: 12-16 weeks."
- Condition card: "ACL Reconstruction Rehab: Custom protocol from day 1. Average ROM improvement 40% by week 8. Return to sport timeline: 12-16 weeks."
- Testimonial: "After my ACL surgery, I was terrified. The PT team had a clear plan and I followed it. 16 weeks later, I'm back playing soccer stronger than before." — David, 28 (Video, 45 sec)

### Trust Signals (All Required)
- DPT license + board certifications visible (Agent C: 94-98% of real sites; 2x conversion vs. no creds)
- Insurance acceptance list (Agent B: transparency signal)
- Real therapist photos in treatment setting (Agent C: real backgrounds validate)
- Outcomes with metrics (ROM improvement %, return-to-sport timeline; Agent B: data beats stories)
- Condition-specific testimonials (Agent B: outcome-specific testimonials > generic)
- Google Reviews (4.8+ stars, 30+ reviews; Agent B/C: social proof)
- Free evaluation offer (Agent B: low-barrier entry)

### Mandatory Integrations (Ranked)
1. **SimplePractice** (growing dominance; insurance integration, HIPAA-compliant patient portal; Agent A: 35% PT adoption growing; Agent B: medical practices favor)
2. **Acuity Scheduling** (alternative for independent PT; simpler, less full-featured; Agent A: second choice)
3. **Insurance verification API** (Humana, Aetna, BlueCross if available; SimplePractice has some built-in; Agent B: CRITICAL for friction removal)
4. **Zoom for telehealth** (HIPAA Business Associate Agreement required; post-COVID standard; Agent A: emerging)
5. **IntakeQ** (HIPAA-compliant medical intake forms; Agent A: specialty medical forms)

### Conversion Actions (Ranked by Priority)
1. **Schedule Your Evaluation (Phone or Acuity)** — Primary path; low-barrier urgency
2. **Verify Your Coverage (Insurance Form)** — Friction removal; secondary CTA
3. **Download Referral Form / Upload Referral** — Mandatory pathway; visibility critical
4. **Book Your Appointment (Embedded Booking)** — Direct path if no form friction
5. **Read Patient Testimonials** — Social proof/outcomes redirect

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Video exercise library (extensive YouTube gallery)** — Agent A: common feature; Agent C: only 50% real PT sites have; patient seeks clinic first, education second. Keep 1-2 demo videos max; defer library to post-V1
- ✗ **Patient portal feature (as primary)** — Agent A: lists "view records, exercises, progress"; Agent C: not booking converter. Move to secondary post-booking feature
- ✗ **Blog/resources as default** — Agent A: mentioned; Agent C: only 40% real PT sites maintain blogs. Kill from MVP; post-V1 add
- ✗ **Complex multi-location routing** — Unless practice has actual multiple locations; keep simple

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Medical Blue (#0052CC, #1E6DAD) | Clinical trust signal; medical authority (Agent A/C: standard) |
| **Secondary Color** | White | Clean, professional, high-contrast |
| **Accent Color** | Healing Green (#2E8B57, #7CB342) or Warm Orange (#FF8C42) | Energy/recovery signal (Agent A: balances medical blue) |
| **Hero Imagery** | Therapist-patient interaction in treatment setting OR athlete in recovery motion | Professional photography; clinical authority + human connection (Agent C: real work validates) |
| **Typography** | Professional sans-serif primary (trust), serif accents for headers | Modern, medical credibility, mobile-readable |
| **Service Card Icons** | Therapy-specific (hands, spine, person in motion) | Visually distinct by modality |
| **CTA Button Style** | Medical blue or warm orange + white text + 44px+ height | Clinical authority or recovery warmth; touch-friendly |
| **Testimonial Photos** | Real patient headshots (diverse age, professional context) | Authenticity; relatability (Agent C: real > stock) |
| **Therapist Photos** | Professional attire (scrubs or clinic casual) in treatment room setting | Clinical credibility; real environment validates trust |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 65%+ of visitors | Agent B |
| **Insurance Verification Impact** | 20%+ friction removal when transparent | Agent B: CRITICAL converter |
| **Phone Click Rate** | 45%+ mobile visitors | Agent C: phone dominance in healthcare |
| **Google Reviews Minimum** | 4.8+ stars, 30+ reviews | Agent B: credibility threshold |
| **Condition Page Segmentation** | 4-8 condition-specific landing pages | Agent C: systematic SEO strategy validates |
| **Video Testimonial Impact** | 2-3x conversion | Agent B/C: outcomes-focused video |
| **Conversion Rate** | 10-15% evaluation booking | Agent B: urgency-weighted |

### Open Decisions (Client Must Provide)
1. **DPT credentials + board certs** — License number, state, board certifications (APTA, orthopedic specialization?)
2. **Insurance accepted** — List of accepted plans
3. **Conditions treated** — Which conditions specialize? (ACL, shoulder, back, etc. for landing pages)
4. **Therapist bios + specializations** — Individual therapist specialties + certifications
5. **Evaluation pricing** — Cost of initial evaluation? Copay estimate available?
6. **Telehealth availability** — Hybrid protocol (initial in-person, follow-ups virtual)?
7. **Referral system** — Do you require MD referral? How do patients upload?

---

## INDUSTRY 14: MENTAL HEALTH COUNSELING / THERAPY PRACTICE

### Urgency Profile
**Moderate Urgency (Days-to-Weeks) + Crisis Pathway**
- Routine mental health = 7-30 day appointment wait acceptable (Agent B)
- Crisis = immediate (must reference crisis hotline 988; Agent B: distinct pathway)
- Cost + stigma = dual conversion blockers (Agent B: transparency + destigmatization critical)
- **Copy tone:** Safe, non-judgmental, empathetic, authentic, permission-granting, culturally sensitive

### Required Sections (In Order)
1. **Safe Space Hero** ("A Safe Space to Heal" + "Telehealth Available" visible + "Schedule Free 15-Min Consultation" CTA; Agent C: safe messaging + telehealth prominence)
2. **Crisis Resources** ("In Crisis? Call 988" in header/footer minimum; Agent B: mandatory ethical + trust signal; Agent C: underaddressed in real sites)
3. **About the Therapist** (photo + warmth + license/credentials visible (LCSW, LMFT, Psy.D.) + state credential number + specializations + approach; Agent C: therapist photo = 3x conversion multiplier)
4. **Services / Specializations** (depression, anxiety, trauma, couples, LGBTQ+, BIPOC expertise; filterable by condition; Agent B/C: specialty filtering enables discovery)
5. **Approach / Modalities** (CBT, DBT, EMDR, Psychodynamic in plain language + interactive explainers for each; Agent B: modality education removes objection)
6. **Testimonials** (anonymous client reviews emphasizing safety, progress, understanding; diverse client profiles implicit; video testimonials optional due to anonymity sensitivity; Agent B/C: safety-focused testimonials)
7. **Fees / Insurance** (sliding scale if offered (explicit "starting at $X-Y"), insurance accepted, superbill messaging; Agent B: cost transparency removes barrier)
8. **Telehealth / In-Person** (clearly marked "virtual-only," "in-person," or "hybrid" per therapist; Agent B/C: post-COVID standard, must be explicit)
9. **First Appointment** (what to expect, cost, duration, confidentiality limits, follow-up scheduling; Agent B: first-session clarity reduces anxiety)
10. **Contact / Booking** (3-field max: name, email, reason for visit; Agent C: form field psychology; frictionless for first contact)
11. **FAQ** (accordion: "Is therapy right for me?", "What's HIPAA?", "Do you prescribe?", "How does insurance work?", crisis resources link)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| **Therapist photo + warm expression** | 3x conversion multiplier; human connection critical | Agent C: quantified photo impact 3x+ |
| **License number + state credential visible** | Regulatory transparency; "Sarah Chen, LCSW, License #[state #]" | Agent C: state-license format specificity validates |
| **Specializations prominently displayed** | LGBTQ+-affirming, trauma-informed, BIPOC competency visible | Agent B: diversity + cultural competency signals values |
| **Free 15-min consultation offer** | Low-friction entry; removes anxiety for first-timers | Agent C: consultation removal barrier; widely adopted |
| **Booking form 3 fields max** | Psychological barrier: multi-step forms kill conversion | Agent C: field-count psychology; 3 max = table-stakes |
| **Cost transparency + sliding scale** | Cost + stigma = dual blockers; clarity removes objection | Agent B: pricing upfront = conversion multiplier |
| **Crisis resources (988 link)** | Ethical + trust signal; distinguish crisis from routine | Agent B: mandatory; Agent C: underaddressed in real sites (opportunity) |
| **Telehealth delivery method clarity** | "Virtual-only," "in-person," "hybrid" per therapist | Agent B: post-COVID demand; Agent C: visibility validates |
| **Blog / educational content** | 2-3x lead generation in therapy space | Agent C: content marketing unique to therapy; heavy impact |
| **Modality explainers (CBT, DBT, EMDR)** | Patient education; interactive tooltips reduce confusion | Agent B: modality education > generic listing |

### Copy Voice

**Headline Formula:** [Safety] + [Permission] = "A Safe Space to Heal. You're Not Alone."
- ✓ "Therapy for Anxiety, Depression, Trauma, & Relationships"
- ✓ "It's OK to Ask for Help. We're Here."
- ✗ "Professional Mental Health Services" (too generic)

**Subheading Formula:** [Empathy] + [Accessibility] = "Telehealth available. Flexible scheduling. Sliding scale. You deserve support."

**Primary CTA Text:** "Schedule a Free 15-Min Consultation" (low-barrier)

**Secondary CTA Text:** "Learn About My Approach" or "View My Insurance Options"

**Tone Rules:**
- Non-judgmental, welcoming ("Therapy is judgment-free space")
- Empathetic ("You've been carrying this alone for too long")
- Authentic, no clinical jargon (speak to feelings, not symptoms)
- Permission language ("It's OK to ask for help," "You deserve support")
- Culturally sensitive, diverse representation
- Hopeful but realistic ("Healing is possible. It takes time.")

**Example Copy Progression:**
- Hero: "A Safe Space to Heal. Therapy for Anxiety, Depression, Trauma. Telehealth Available."
- Subheading: "Sarah Chen, LCSW, License #[state]. Specializing in trauma, LGBTQ+ issues, cultural identity. Sliding scale available."
- Approach card: "EMDR (Eye Movement Desensitization and Reprocessing) is evidence-based trauma therapy. It helps process traumatic memories. [Click for explainer]"
- Testimonial (Anonymous): "I was terrified to start therapy. Sarah made me feel safe immediately. After 12 sessions, I actually feel better. Worth every penny." — J.M., Portland

### Trust Signals (All Required)
- License + state credential number visible (Agent C: validation format specificity)
- LCSW/LMFT/Psy.D. credentials with issuing organization (Agent A/C: regulatory credibility)
- Specialization visibility (LGBTQ+-affirming, trauma-informed, cultural competency; Agent B: values signal)
- Real therapist photo with warm expression (Agent C: 3x conversion multiplier)
- Crisis resource visibility (988 link; Agent B: ethical + trust signal)
- Cost transparency (sliding scale amount, insurance list, copay info; Agent B: removes objection)
- Google Reviews (4.8+ stars, 30+ reviews; Agent B/C: social proof)
- Telehealth availability prominent (Agent B: post-COVID expectation)

### Mandatory Integrations (Ranked)
1. **SimplePractice** (dominant: 90%+ therapy adoption; HIPAA-compliant portal, secure messaging, billing, insurance integration; Agent A: mandatory for therapy industry)
2. **Zoom for telehealth** (HIPAA Business Associate Agreement required; virtual session delivery standard; Agent A: post-COVID default)
3. **IntakeQ** (HIPAA-compliant intake forms; confidential health history collection; Agent A: specialty forms)
4. **Therapist directory feeds** (Psychology Today, TherapyDen; if applicable, cross-platform discoverability; Agent A: optional but visibility advantage)
5. **Mailchimp consent-based newsletter** (post-booking email only; HIPAA privacy-first; Agent A: opt-in model mandatory)

### Conversion Actions (Ranked by Priority)
1. **Schedule Free 15-Min Consultation (SimplePractice Embedded)** — Primary path; low-friction
2. **Send a Secure Message (Portal Link)** — Alternative pathway; secure comms transparency
3. **Request Intake Paperwork (Form)** — Secondary path; pre-booking option
4. **Learn About My Approach (Link to Modality Explainers)** — Trust/education redirect
5. **Contact Me About Availability (Form)** — Direct contact option

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Blog section as default** — Agent A: 72% include; Agent C: only 50% real therapy sites maintain blogs. Kill from MVP unless content calendar proven
- ✗ **Newsletter signup as default** — Agent A: assumes Mailchimp; Agent C: needs consent-based opt-in for HIPAA. Kill as default; add only if educational calendar exists
- ✗ **Therapist directory (multi-therapist)** — Only if group practice; mark as conditional

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Soft Blue (#8BA3B8, #6B9BB4) or Muted Green (#A8B8A8) | Calming, safe, trust signal (Agent A: soft colors universal) |
| **Secondary Color** | Cream/Off-White | Warm, welcoming, breathing room |
| **Accent Color** | Warm Cream/Sand (#E8DCC8, #D4C4B0) | Comfort, non-clinical warmth |
| **Hero Imagery** | Peaceful natural setting (plants, water, soft lighting) OR diverse therapist photo (warm expression, office setting) | Safety + human connection (Agent C: real therapist photo validates 3x multiplier) |
| **Typography** | Serif headers (warmth, approachability), sans-serif body (clarity) | Professional-but-warm blend; readable mobile |
| **Service Card Icons** | Mental health-specific (heart, head, people) | Visually distinct by specialization |
| **CTA Button Style** | Soft warm color (sage, cream) + white text + 44px+ height | Inviting, non-clinical, low-pressure |
| **Testimonial Photos** | Anonymous client testimonials (no photo, initials + city only) | Privacy-respecting; anonymity reduces barriers |
| **Therapist Photos** | Real headshot in office setting (warm expression, business casual) + diverse backgrounds | Connection signal; humanity; diversity validates values |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 65%+ of visitors | Agent B |
| **Therapist Photo Impact** | 3x conversion multiplier | Agent C: quantified photo power |
| **Free Consultation Booking Rate** | 40-50% of consultations lead to first session | Agent B: barrier removal converts |
| **Blog Content Impact** | 2-3x more leads | Agent C: content marketing unique to therapy |
| **Form Field Psychology** | 3-field max form optimal | Agent C: field-count specificity |
| **Google Reviews Minimum** | 4.8+ stars, 30+ reviews | Agent B: credibility threshold |
| **Conversion Rate** | 15-20% consultation booking | Agent B: low-barrier free consult drives high conversion |

### Open Decisions (Client Must Provide)
1. **License credentials + state** — LCSW/LMFT/Psy.D. + state license number
2. **Specializations** — Primary specialties (anxiety, depression, trauma, couples, LGBTQ+, BIPOC competency?)
3. **Therapy modalities** — Which approaches (CBT, DBT, EMDR, psychodynamic, somatic)?
4. **Cost structure** — Hourly rate? Sliding scale range (if offered)? Insurance accepted?
5. **Delivery method** — Telehealth-only, in-person, or hybrid?
6. **Booking system** — SimplePractice or alternative?
7. **Blog/content calendar** — Do you maintain educational blog? If yes, frequency?

---

## INDUSTRY 15: HYPERBARIC OXYGEN THERAPY / WELLNESS CENTER

### Urgency Profile
**High Urgency (Medical Cases) + Low Urgency (Wellness)**
- Medical pathway (diabetic wounds, post-surgical) = urgent + insurance-driven (Agent B)
- Wellness pathway (anti-aging, athletic recovery) = elective + self-pay (Agent B)
- **Impact:** Site must branch messaging clearly; medical vs. wellness copy differs sharply (Agent B: differentiation critical)
- **Copy tone:** Medical credibility + outcomes-based, scientific backing, honesty about FDA-approved vs. off-label

### Required Sections (In Order)
1. **Hero with Medical/Wellness Split** (clear branching: "Medical Protocol" vs. "Wellness Optimization" paths; OR dynamic hero that leads both with "Schedule Free Consultation"; Agent B/C: branching logic essential)
2. **What is HBOT** (animated or video explainer, 60-90 sec, FDA-approval status, mechanism visible; Agent A: CRITICAL for conversion; must be prominent hero element)
3. **Medical vs. Wellness Conditions** (2-column grid: FDA-approved indications (diabetic wounds, carbon monoxide, sports injury post-op) vs. emerging wellness benefits (anti-aging, athletic recovery); language differs by column; Agent B: branching honesty critical)
4. **Treatment Process** (session duration, what to expect, safety, frequency protocol; Agent A: transparency removes friction)
5. **Medical Director Credentials** (MD/DO + board certification (UHMS-certified preferred, rare/gold-standard; Agent C: medical director prominence validates) + years in HBOT specifically; Agent C: real centers emphasize HBOT-specific cert not generic practice)
6. **Testimonials/Outcomes** (medical cases: wound timeline to closure; athletic cases: return-to-sport timeline; pain scale before/after; Agent B/C: condition-specific outcome metrics)
7. **Session Pricing + ROI** ("40-session package: $4,200 total investment; typical protocol: 20-40 sessions; expected outcomes [condition-specific]"; Agent B: cost transparency removes objection)
8. **Financing Options** (CareCredit, payment plans, 0% APR messaging visible; Agent C: financing 2-3x commitment multiplier)
9. **Consultation Booking** ("Free 30-Min Consultation with Medical Director" as primary CTA; Agent B: consultation removal of barrier critical)
10. **Facility Photos** (chamber images, waiting area, professional environment; Agent C: "This is what I'm paying for" transparency)
11. **Safety & FAQ** (accordion: "Are there side effects?", "Contraindications?", "What's UHMS accreditation?", "How many sessions do I need?")
12. **Contact** (phone in header + sticky, booking embedded, maps)

### Required Components

| Component | Purpose | Source Data |
|-----------|---------|-------------|
| **Medical vs. wellness messaging split** | Distinct copy paths; FDA-approved ≠ wellness claims | Agent B: clarity overcomes skepticism; Agent C: branching validates |
| **Educational HBOT explainer video** | CRITICAL for conversion; FDA-approval confusion + mechanism mystery | Agent A: explicitly mandatory; HERO prominence required |
| **Conditions grid (FDA-approved vs. emerging)** | Honesty about claim limits; customer clarity removes objection | Agent B: branching honesty + transparency = trust multiplier |
| **Medical director credentials prominently displayed** | MD/DO + UHMS certification (rare, <150 US clinics) = gold standard | Agent C: UHMS cert validates 90%+ of winning sites; gold-standard differentiator |
| **Realistic session count visible** | "Most patients need 20-40 sessions" removes vague promises | Agent B: transparency = conversion; Agent C: visible in winners |
| **Package pricing with savings visible** | "40 sessions $4,200, save $1,200" psychology; ROI framing | Agent C: financing options 2-3x commitment multiplier |
| **Free 30-min consultation hook** | Best lead generation for HBOT; barrier removal | Agent B/C: director-level consultation as differentiator; winning pattern |
| **Before-after medical outcomes (photos/metrics)** | Wound photos or test results visible; clinical documentation | Agent C: medical outcomes > generic testimonials; credibility |
| **Financing options prominent** | "CareCredit available, 0% for 12 months" = 2-3x commitment lift | Agent C: quantified financing impact |
| **Facility photos (chamber + environment)** | Transparency builds confidence ("This is what I'm paying for") | Agent C: real chamber images validate trust |

### Copy Voice

**Headline Formula:** [Medical Authority] + [Outcomes] + [Accessibility] = "FDA-Approved Hyperbaric Oxygen Therapy. Accelerate Healing. Schedule Your Free Consultation."
- ✓ "Wound Healing & Athletic Recovery With Hyperbaric Oxygen"
- ✓ "Trusted by Doctors & Athletes. Proven Results."
- ✗ "Alternative Wellness Therapy Services" (too generic; risks credibility)

**Subheading Formula:** [Medical] + [Honesty] = "Board-Certified Medical Director. FDA-Approved for medical conditions. Emerging benefits for wellness seekers."

**Primary CTA Text:** "Schedule Your Free Consultation" (professional, low-barrier)

**Secondary CTA Text:** "Learn About Our Medical Protocol" or "Explore Wellness Options"

**Tone Rules:**
- Medical credibility + approachability (not sterile, but authoritative)
- Scientific backing (cite peer-reviewed research for medical, transparent about emerging for wellness)
- Honesty about FDA-approved vs. off-label (customer trust multiplier)
- Outcome-focused (specific timelines, metrics)
- Avoid unsubstantiated claims; differentiate medical/wellness pathways clearly

**Example Copy Progression:**
- Hero (Medical branch): "Diabetic Wound Healing. FDA-Approved Hyperbaric Oxygen Therapy. Average healing time: 12-20 weeks with protocol. Board-Certified Director."
- Hero (Wellness branch): "Athletic Recovery & Anti-Aging. Emerging benefits from hyperbaric oxygen. Consult with our medical director about your goals."
- Testimonial (Medical): "After a diabetic foot wound wouldn't heal with standard care, Dr. Smith recommended HBOT. 18 sessions later, it closed completely. Life-changing." — Robert, 62 (Medical case)
- Testimonial (Wellness): "I compete in endurance sports and HBOT helps my recovery time. I feel stronger and recover faster between races." — Maria, 45 (Wellness case)

### Trust Signals (All Required)
- MD/DO + UHMS certification (rare gold-standard; Agent C: validates differentiation)
- FDA-approval statement (medical pathway; Agent B: regulatory credibility)
- Honesty about FDA-approved vs. off-label claims (Agent B: transparency multiplier)
- Realistic session count visible (Agent B: removes vague promises)
- Before-after medical outcomes (wound photos, metrics; Agent C: clinical documentation)
- Facility/chamber photos (Agent C: transparency validates)
- Financial transparency (package pricing, financing options, outcomes ROI)
- Google Reviews (if applicable; Agent B/C: credibility baseline)

### Mandatory Integrations (Ranked)
1. **Acuity Scheduling** (consultation + session booking; supports flexible session management; Agent A: primary for HBOT)
2. **Custom patient intake system** (medical history depth required; SimplePractice-like; Agent A: not standard wellness form)
3. **Stripe/Square recurring billing** (session packages, membership subscriptions; Agent A: 88% of wellness)
4. **Insurance verification tool** (for medical cases; SimplePractice or manual; Agent A: lower priority than consultation; many centers self-pay)
5. **Referral management API** (send/receive MD referrals for medical cases; Agent A: optional; many centers manual)

### Conversion Actions (Ranked by Priority)
1. **Schedule Your Free Consultation (Acuity or Phone)** — Primary path; barrier removal (Agent C: 30-min director consultation validates)
2. **Learn About Our Medical Protocol** (Link to Medical pathway) — Medical case segmentation
3. **Explore Wellness Options** (Link to Wellness pathway) — Wellness case segmentation
4. **Download Condition Information / Medical Referral Form** — Friction removal for medical cases
5. **View Our Facility Photos / Chamber Gallery** — Confidence building

### Forbidden Elements (Template Theater per Agent C)
- ✗ **Referral program information display** — Agent A: lists as common; Agent C: doesn't surface as converter. Kill as default; add only if active referral incentive
- ✗ **Success rate statistics (published benchmarks)** — Agent B: HBOT lacks standardized benchmarks; public data sparse (especially wellness claims). Kill; use case studies instead (safer legally)
- ✗ **Retail supplement shop integration** — Agent A: doesn't mention; common in wellness centers. Kill as default; add only if revenue stream exists
- ✗ **Alternative therapy endorsements** — Risk regulatory blowback; focus on HBOT credibility only

### Visual Defaults

| Element | Default | Rationale |
|---------|---------|-----------|
| **Primary Color** | Medical Blue (#0052CC, #1E6DAD) | Clinical authority; medical credibility (Agent A: standard) |
| **Secondary Color** | White | Clean, clinical, high-contrast |
| **Accent Color** | Energy Orange (#FF8C42, #E67E22) | Vitality/healing signal; warmth (Agent A: balances medical blue) |
| **Hero Imagery** | Real hyperbaric chamber + diverse patients (medical + wellness contexts) | Professional documentation; credibility + relatability (Agent C: real chambers validate) |
| **Typography** | Professional sans-serif throughout (modern, medical authority) | Clinical but approachable; mobile-readable |
| **Service Card Icons** | Medical-specific (heart, lung, oxygen molecule) | Visually distinct by condition pathway |
| **CTA Button Style** | Medical blue or energy orange + white text + 44px+ height | Clinical authority or healing warmth; touch-friendly |
| **Testimonial Photos** | Real patient headshots with context (medical: post-treatment, wellness: active context) | Authenticity; outcome-focused visual proof |
| **Chamber Photos** | Real facility images, chamber visible, professional environment | Transparency + confidence building ("This is what I'm paying for") |

### Benchmark Data

| Metric | Target | Source |
|--------|--------|--------|
| **Mobile Traffic** | 60%+ of visitors | Agent B |
| **Free Consultation Conversion** | 30-40% of consultations lead to session booking | Agent B/C: barrier removal |
| **Financing Options Impact** | 2-3x commitment multiplier for high-cost packages | Agent C: quantified financing impact |
| **Google Reviews Minimum** | 4.5+ stars, 20+ reviews (lower volume due to specialty) | Agent B: credibility baseline (lower threshold than other industries) |
| **Session Package Adoption** | 80%+ of patients buy multi-session packages | Agent B: cost structure emphasis |
| **Conversion Rate** | 12-18% consultation booking | Agent B: free consultation drives inquiry |

### Open Decisions (Client Must Provide)
1. **Medical director credentials** — MD/DO + board certification (UHMS? ABMS?). Years in HBOT specifically
2. **Medical vs. wellness pathway structure** — How do you differentiate? Separate pages or branching logic?
3. **Condition focus** — What medical conditions do you treat? Wound care, sports medicine, other?
4. **Session pricing** — Cost per session? Typical package size? ROI messaging?
5. **Financing partnerships** — CareCredit? Payment plans? 0% terms offered?
6. **Facility capacity** — How many chambers? Session availability?
7. **Referral process** — How do physicians refer? Do you handle intake?

---

## Summary Notes

### Cross-Industry Governance Updates Required
- **Voice Profiles (New):** Add "Therapeutic/Clinical" (chiro, PT), "Studio/Aspirational" (yoga, gym, massage), "Mental Health/Safe" (therapy)
- **HIPAA Compliance (Mandatory):** Required for chiropractic, PT, mental health, massage (if insurance billing). Surface messaging as trust multiplier
- **Insurance Verification Component (Mandatory):** Required for chiro, PT, mental health. Friction removal = 20%+ conversion lift
- **Practitioner Bio Component (New Universal for Wellness):** Specialization-first structure (validated in C's real sites). License + state verification link required. Photo in clinical/work setting (20%+ trust lift)
- **Membership/Recurring Billing Component (Conditional):** Gym, yoga, massage, PT require emphasis. Dedicated section + ROI calculator
- **Default Section Order (Wellness Deviation):** Wellness can deviate from standard (practitioner bios earlier, insurance earlier, facility tour later). Document allowable variations
- **New Integrations (Canonical List):** Jane App, SimplePractice, MindBody, Acuity, IntakeQ, Psychology Today directory, Zoom (HIPAA BAA required)

### Critical Patterns from Cross-Review (A/B/C Reconciliation)
- **C wins on real sites:** Embedded booking (3-5x lift), sticky CTAs, video testimonials (2-3x lift), before-after gallery placement (23% lift for gym), financing impact (2-3x for high-cost services)
- **B wins on demand:** Insurance transparency timing, beginner-friendly psychology barriers, cost objection handling, seasonal messaging
- **A wins on section completeness:** Universal hierarchy validated; color palettes accurate; copy voice patterns 88%+ consistency
- **Conflicts resolved:** Where A templates theater (blog 71% vs. C's 40-45% real), C wins. Where B flags objection but A/C underspecify, implementation notes added.

