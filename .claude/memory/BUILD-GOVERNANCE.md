# BUILD-GOVERNANCE.md
## Canonical Build Rules for POM AI Pattern Library V1

**Version:** 1.0 | **Effective:** April 2026 | **Authority:** Agent synthesis (Sources: A, B, C cross-reviews)

---

## Mission

Build universal, industry-agnostic structural rules that every client site inherits by default, with documented divergence points where industry-specific patterns override. Every rule traces to validation data (real-site teardowns, market demand signals, cross-industry pattern frequency). Non-negotiable for MVP release.

---

## UNIVERSAL RULES (All 8 Industries)

### Phone Visibility (HARD REQUIREMENT)
- **Sticky header with clickable phone number** (persistent on all page scroll) — Validates at 99%+ of real winner sites (Agent C)
- **Minimum 3 placements per page:** sticky header, hero CTA button, contact section
- **Mobile:** Click-to-call handler active; phone displays in blue, underlined
- **Desktop:** Click-to-call enabled; manual dial display in header
- **Size rule:** Phone number never smaller than body copy; minimum 16px font
- **Exception:** None. If client requests phone hidden, document as non-standard request requiring override approval.

### CTA Button Placement
- **Hero section:** One primary CTA button, action-verb language (Schedule, Book, Call, Get Quote, Order)
- **Secondary CTAs:** Minimum 2 additional conversion paths per page (e.g., "Schedule Appointment" + "Call Now")
- **Color contrast:** CTA button uses industry-specific primary color at minimum WCAG AA contrast ratio
- **Mobile:** Full-width CTA buttons minimum 44px height (touch target)
- **Copy rule:** Never generic ("Submit"). Always action + benefit ("Schedule Free Inspection", "Get Your Quote Now")

### Trust Credential Display
- **Hero or "Why Us" section:** Credentials visible above fold
- **Credential types:** License #, years in business, certifications, awards, client count
- **Verification rule:** If credential has verification URL available (state licensing board, EPA database, ASE registry), render as clickable link, not static badge
- **Mandate:** All licenses must be verifiable; do not display credentials without public verification pathway

### Google Reviews Integration (MANDATORY)
- **Widget requirement:** Google Reviews aggregation showing star rating + recent review snippets
- **Recency filter:** Display reviews from past 30 days prominently (Agent A/B/C consensus: recency > volume)
- **Minimum data:** Show real review count (not just star aggregate), reviewer names, review dates
- **Mobile optimization:** Carousel format for multiple reviews; swipe/scroll gesture support
- **Update frequency:** Widget must auto-refresh (Google API synced, not manual)

### Section Order (Default Universal)
Unless industry-specific card overrides, use this order:
1. **Hero** (headline + CTA + imagery)
2. **Service/Offering Grid** (4-8 cards describing core offerings)
3. **Trust/Why Us** (credentials, testimonials, local proof)
4. **Social Proof** (Google Reviews widget, client count, industry recognition)
5. **Process/How It Works** (3-4 step timeline explaining service delivery)
6. **Detailed Offering Section** (before-and-after gallery, case studies, or treatment/service breakdowns per industry)
7. **Pricing/Transparency** (cost ranges, financing, payment options)
8. **FAQ** (accordion-formatted, schema-marked)
9. **Contact + Map** (location, hours, direction link)
10. **Footer** (navigation, social, legal links)

### Mobile-First Design
- **Baseline:** 320px minimum width; all CTAs touch-friendly (44px+ height)
- **Viewport meta tag:** Present and correct
- **Image optimization:** Responsive images using srcset; lazy-load below fold
- **Form fields:** Single-column on mobile; auto-zoom prevention on input focus
- **Navigation:** Hamburger menu on mobile; collapse to 5-7 items maximum
- **Sticky header persistence:** Phone + primary CTA remain visible on all page scroll

### Form Friction Rules
- **Default:** Capture phone number only on first form submission (no email capture unless secondary action)
- **Multi-step:** If form exceeds 3 fields, use wizard format (show progress indicator)
- **Mobile phone:** Auto-format phone input to (XXX) XXX-XXXX; accept any format input
- **Pre-fill:** Never pre-populate form fields unless user explicitly logs in
- **Submission:** One-click confirmation after submit; redirect or modal confirmation visible immediately

### Real Customer Proof (Mandatory)
- **Photos:** Every testimonial must include real customer photo (not avatar, not stock)
- **Names:** Full first + last name for credibility (no "Anonymous")
- **Professional photos preferred:** Testimonials with professional headshots convert better than selfies
- **Diversity:** If 5+ testimonials visible, ensure representation across age, gender, ethnicity
- **Minimum count:** 3 visible testimonials per page minimum; 5+ preferred

### Copy Hierarchy Rules
- **H1 (Hero headline):** Problem-focused or benefit-focused, not feature-focused
  - ✓ "Emergency Plumbing Available Now" (action/benefit)
  - ✓ "Your Roof Fixed Before Winter" (benefit)
  - ✗ "Professional Roofing Services" (feature)
- **Subheading (H2):** Emotional benefit or urgency indicator
  - ✓ "Same-day appointments available"
  - ✓ "Protect your home from water damage"
- **Body copy:** Lead with pain point, follow with solution
  - ✓ "Clogged drain? Don't wait. We're here in 2 hours."
  - ✗ "We offer comprehensive plumbing solutions."
- **CTAs:** Action verb + benefit, never "Submit"
  - ✓ "Schedule My Free Inspection"
  - ✓ "Book an Appointment Today"
  - ✗ "Go"

### SEO Minimum Requirements
- **Page titles:** 50-60 characters, include primary keyword + benefit
- **Meta description:** 150-160 characters, include keyword + CTA
- **H1 tag:** Exactly one per page; includes primary keyword
- **Schema markup:** LocalBusiness schema required (name, address, phone, hours, reviews)
  - Plus industry-specific schema: ServiceArea, OpeningHours, AggregateOffer (if pricing shown)
- **Alt text:** All images must have descriptive alt text (not empty, not "image")
- **Internal linking:** Service pages link to contact/booking; contact links to services
- **No cloaking, redirects, or keyword stuffing:** Automatic violation flag

### Performance Baselines
- **Page load time:** <3 seconds on 4G mobile (Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1)
- **Image optimization:** No image > 200KB uncompressed; use WebP with JPG fallback
- **Code minification:** CSS, JavaScript minified before production deploy
- **No third-party bloat:** Maximum 5 external scripts; audit for performance impact

### Accessibility (WCAG 2.1 AA Minimum)
- **Color contrast:** All text minimum 4.5:1 ratio (AAA preferred 7:1)
- **Keyboard navigation:** All interactive elements reachable via keyboard; tab order logical
- **Images:** Decorative images marked as such (empty alt); content images include alt text
- **Forms:** Labels explicitly associated with inputs (not placeholder text as label)
- **Headings:** Logical H1-H6 hierarchy; never skip levels
- **Videos:** Captions required if speech present

---

## DIVERGENCE POINTS (Per-Industry Overrides)

### Urgency Profile Assignment
Determines copy tone, CTA color, hero imagery, and response-time guarantees:

| Industry | Profile | Definition |
|----------|---------|-----------|
| Plumbing | Emergency/Scheduled | 40-50% emergency (leak/clog minutes-hours); 50-60% planned (maintenance days-weeks) |
| HVAC | Emergency/Seasonal | Peak seasons (winter/summer) = emergency; off-season = maintenance focus |
| Electrical | Emergency/Mixed | 30-40% emergency (fire/shock hazard); 60-70% planned |
| Landscaping | Scheduled/Recurring | 70% recurring (weekly/bi-weekly); 30% one-time (seasonal projects) |
| Auto Repair | Urgent/Mixed | 50% urgent (breakdown); 50% planned (maintenance) |
| Med Spa | Premium/Consultation | Consultation-first; medium urgency (cosmetic desire, not emergency) |
| Dental | Scheduled/Emergency | 80% planned; 20% emergency (tooth pain, breakage) |
| Restaurant | Immediate | 60% immediate (hungry now/walk-in); 40% planned (reservation) |

**Application:** Copy voice, CTA button color, phone prominence adjustment, hero imagery selection, and appointment/booking interface design flow from urgency profile.

### Pricing Transparency Model
Three strategies; industry determines which applies:

| Model | Industries | Rules |
|-------|-----------|-------|
| **Transparent** | Plumbing, HVAC, Electrical, Auto, Landscaping | Display flat-rate menus or cost ranges (e.g., "Oil change: $45") upfront |
| **Consultation-Based** | Med Spa, Dental (cosmetic) | "Free consultation" primary CTA; pricing available post-consult only |
| **Call-for-Quote** | Landscaping (design), Dental (complex), Restaurants (variable) | Show example pricing ranges but encourage call/form for custom quote |

**Mandate:** Every industry must clearly signal which model applies in hero section. Ambiguous pricing kills conversion (Agent B validates 40%+ conversion lift with transparent ranges where applicable).

### Color Palette Defaults (Per Industry)
Guidelines, not rigid requirements:

| Industry | Primary | Secondary | Accent | Trust Signal |
|----------|---------|-----------|--------|--------------|
| Plumbing | Blue | White | Orange | License badge blue |
| HVAC | Warm Gray | Blue | Orange | Certification badge |
| Electrical | Blue | White | Yellow | License badge |
| Landscaping | Green | White | Brown | Nature imagery |
| Auto Repair | Dark Gray | Silver | Red | ASE badge blue |
| Med Spa | Neutral (gray/tan) | Soft accent (sage/blush) | Bronze/gold | Certification badge |
| Dental | Light Blue | White | Mint/teal | License badge |
| Restaurant | Warm (brown/cream) | White | Brand color | Food photography |

**Note (Agent C validation):** Color palettes are conventions, not absolutes. Real sites deviate but maintain contrast. Primary driver is contrast + readability, not specific hex values.

### Before-and-After Gallery Component
**Required industries:** Landscaping, Auto Repair, Med Spa, Dental (cosmetic)

**Spec:**
- Slider component (drag-to-compare on desktop; swipe gesture on mobile)
- Minimum 6 examples per industry (Landscaping 8-10 preferred per Agent C)
- Mobile: Full-width, large slider handle (44px+), landscape orientation priority
- Ethical guardrails:
  - Disclaimer: "All photos unretouched. Real clients. Real results."
  - Diverse representation: skin tone, age, outcome range (subtle to dramatic)
  - Never use overly-retouched or AI-generated images
- Organization: Group by service type (med spa) or project size (landscaping)

**Mandatory fields per image:**
- Before photo
- After photo
- Service type label
- Client first name (optional) or "Real Client" placeholder
- Date (month/year)

### Service Area / Geo-Targeting Logic
**Required industries:** Plumbing, HVAC, Electrical, Auto Repair, Landscaping, Restaurant (location confirmation)

**Spec:**
- Hero-level prominence: "We service [ZIP]" or "Enter your ZIP to confirm service area"
- Implementation: Checkbox input field; accepts ZIP code or address
- Confirmation flow:
  - Service area match → "Yes, we serve your area" + highlight service polygon on map
  - No match → "Sorry, we don't yet serve your area. [Email to request service expansion]"
- Mobile: Single-field input (no multi-step address picker)
- Fallback: If ZIP validation unavailable, display static service area map with polygon overlay

### Booking System Integration
**Mandatory per industry:**

| Industry | Primary Tool | Secondary |
|----------|--------------|-----------|
| Plumbing, HVAC, Electrical, Auto Repair | Calendly | SMS callback form |
| Landscaping | Calendly (recurring) | Stripe billing for subscriptions |
| Dental, Med Spa | Acuity Scheduling | Calendly fallback |
| Restaurant | OpenTable or Tock | Direct phone/SMS |

**API requirement:** All booking systems must support automated SMS reminders (24h + day-of) and email confirmation.

### Seasonal Content Switching Engine
**Affected industries:** HVAC, Landscaping, Restaurant, Med Spa

**Implementation:**
```yaml
seasonal_messaging:
  spring:
    hvac: "Spring HVAC Maintenance Available Now"
    landscaping: "Spring Cleanup Special"
    restaurant: "Spring Menu Available"
    medspa: "Spring Renewal Package"
  summer:
    hvac: "Beat the Summer Heat"
    landscaping: "Maintenance Keeps Your Lawn Healthy"
    restaurant: "Summer Dining Special"
    medspa: "Summer Beach Body Package"
  fall:
    hvac: "Fall HVAC Check Before Winter"
    landscaping: "Fall Leaf Removal Available"
    restaurant: "Autumn Menu Launch"
    medspa: "Fall Refresh Package"
  winter:
    hvac: "Winter Heating Check"
    landscaping: "Winter Prep Special"
    restaurant: "Holiday Dining Booking Open"
    medspa: "New Year Resolution Package"
```

**Mechanism:** Homepage hero CTA text, subheading, and featured service card swap based on current month.

### Email Nurture Cadence Defaults
**Recommended setup (not mandatory for MVP):**

| Industry | Cadence | Trigger |
|----------|---------|---------|
| HVAC, Landscaping | Seasonal (4x/year) | Season change (Jan, Apr, Jul, Oct) + 30-day follow-up post-service |
| Dental, Med Spa | Monthly | Treatment education + offer rotation + appointment reminder |
| Restaurant | Weekly | New menu items, specials, events |
| Plumbing, Electrical, Auto | Monthly | Seasonal maintenance reminders (winter battery check, spring AC service) |

---

## COMPONENT LIBRARY (Canonical List)

### Tier 1: Universal (Every Site)
1. **Sticky Header** (logo, nav, phone, CTA button)
2. **Hero Section** (headline, subheading, CTA button, background image/video)
3. **Service/Offering Cards** (icon, title, description, optional icon)
4. **Google Reviews Widget** (aggregated rating + recent reviews)
5. **Contact Footer** (address, phone, hours, map embed)
6. **Mobile Navigation Menu** (hamburger toggle, 5-7 items)
7. **Form Capture** (phone + email minimum; optional fields per industry)
8. **CTA Buttons** (primary style: solid color + white text; secondary: outline)
9. **Testimonials Section** (photo + name + quote + service type)
10. **FAQ Accordion** (question + hidden answer, expandable)

### Tier 2: Industry-Specific Frequently Used
1. **Before-and-After Slider** (Landscaping, Auto, Med Spa, Dental)
2. **Service Grid** (Plumbing, HVAC, Electrical, Auto, Dental)
3. **Maintenance Plans / Subscription Cards** (HVAC, Landscaping, Dental)
4. **Financing Calculator** (HVAC, Dental, Med Spa)
5. **Booking Widget / Calendar** (Dental, Med Spa, Restaurant via OpenTable/Tock)
6. **Credentialing Section** (Trades: license display; Medical: provider credentials)
7. **Portfolio/Gallery Carousel** (Landscaping, Auto, Med Spa, Dental)
8. **Process Timeline** (3-4 step explanation of service delivery)
9. **Pricing Table** (transparent pricing display or consultation CTA)
10. **Map/Service Area Display** (Polygon overlay or ZIP code validator)

### Tier 3: Optional/Emerging (Not MVP Default)
1. Chat Widget (async qualification; <40% adoption in real sites per Agent C)
2. Video Testimonials (growing; 40% adoption)
3. Email Newsletter Signup (recommended but <20% adoption; underutilized)
4. Referral Program Promotion (high ROI but <40% adoption)
5. Live Availability Display (50% adoption in dental/HVAC; emerging)
6. Blog/Educational Content Section (recommended for SEO; low conversion impact)
7. Financing Partner Logos (Affirm, Klarna; optional, not mandatory)
8. Social Media Feed Embed (Instagram; optional for lifestyle industries)
9. Chat Bot (low conversion validation; defer to V2)
10. Loyalty Program Integration (post-launch feature)

---

## BUILD CHECKLIST (Must-Pass Before Delivery)

### Content Completeness
- [ ] Hero headline written (problem or benefit-focused, no generic features)
- [ ] All service/offering descriptions completed (3-5 sentences minimum per card)
- [ ] Minimum 3 customer testimonials with photos + names collected
- [ ] Contact information verified (phone, address, hours accurate)
- [ ] Google Reviews connected and displaying (minimum 4.0 stars if available)

### Mobile & Responsiveness
- [ ] Mobile viewport meta tag present and correct
- [ ] All pages tested at 320px, 768px, 1024px widths
- [ ] CTA buttons 44px+ height on mobile
- [ ] Form fields single-column on mobile, logical tab order
- [ ] Images responsive; no horizontal overflow
- [ ] Sticky header phone visible on all scroll positions

### CTAs & Conversions
- [ ] Primary CTA visible above fold (no scroll required)
- [ ] CTA button copy uses action verb + benefit (not "Submit")
- [ ] Minimum 2 secondary CTAs per page
- [ ] Phone number clickable on mobile; click-to-call handler active
- [ ] Booking widget or form functional (test submission)

### Trust & Credentials
- [ ] License numbers or certifications displayed with verification links (if applicable)
- [ ] Google Reviews widget auto-updating and displaying recent reviews
- [ ] Real customer testimonial photos present (not stock images)
- [ ] Trust badges (years in business, client count, awards) visible in hero or Why Us section
- [ ] No false claims or unverifiable statements

### SEO & Metadata
- [ ] Page title 50-60 characters, includes primary keyword
- [ ] Meta description 150-160 characters, includes keyword + CTA
- [ ] H1 exactly once per page; includes primary keyword
- [ ] LocalBusiness schema markup present and valid (test with Schema.org validator)
- [ ] All images have descriptive alt text (not empty, not "image")
- [ ] No duplicate H2/H3 headings within page
- [ ] Internal links logical (services → contact, contact → services)

### Performance & Accessibility
- [ ] Page load <3 seconds on 4G mobile (test via PageSpeed Insights)
- [ ] Images optimized (no image >200KB uncompressed)
- [ ] CSS/JavaScript minified
- [ ] Color contrast minimum 4.5:1 on all text (WCAG AA)
- [ ] Keyboard navigation fully functional (no mouse-only sections)
- [ ] Video content has captions (if audio present)

### Brand & Visual Consistency
- [ ] Logo placed in sticky header
- [ ] Primary color used consistently for CTAs and highlights
- [ ] Font hierarchy clear (H1 > H2 > body copy)
- [ ] Imagery consistent with industry type (no stock photos where real work photos exist)
- [ ] No broken images or dead links

### Legal & Privacy
- [ ] Privacy policy linked in footer
- [ ] Terms of service linked if applicable
- [ ] HIPAA badge (med spa/dental) if storing patient data
- [ ] No unverifiable medical/legal claims
- [ ] SSL certificate active (https://)

---

## DECISION RULES FOR AMBIGUITY

### When Client Data Incomplete
1. **Phone number missing** → Use placeholder [CLIENT PHONE]; block deployment until provided
2. **Pricing unknown** → Default to "Call for Quote" CTA unless client explicitly requests transparent pricing (Agent B/C: transparent = higher conversion but requires committed pricing)
3. **Service area undefined** → Default to "Serving [City Name]"; require client to define ZIP radius
4. **No testimonials provided** → Block deployment. Minimum 3 required.
5. **No credentialing available** → For trades/medical: block deployment. For restaurants/landscaping: proceed with "Years in Business" display instead.

### Copy Tone When Industry Unclear
- Default to **action-oriented + benefit-focused** (universal safe choice; Agent A/C validates this across industries)
- Avoid luxury/aspirational tone unless industry = Med Spa or high-end restaurant (Agent C: luxury underperforms in trades)
- Avoid overly casual tone unless industry = Restaurant/Cafe (trades benefit from professional tone per Agent B/C)

### CTA Button Color When Guidance Unavailable
- Default to **blue** (trust signal across all industries per Agent C; used in 70%+ of real sites)
- Exception: Emergency/urgent actions can use red/orange (Agent B validates color-coded urgency)

### Navigation Item Count
- Default to **5-7 items** if not specified (Agent A/C consensus: deeper menus increase abandonment)
- Must include: Home, Services, About, Contact, booking/CTA button

### Gallery Image Count When Unspecified
- Plumbing/HVAC/Electrical: Minimum 8 before-and-after images
- Landscaping: Minimum 12-15 project images (Agent C: 20-30 preferred; <8 underperforms)
- Auto Repair: Minimum 6 vehicle work photos
- Med Spa/Dental: Minimum 15-20 before-and-after images (Agent C: 40+ preferred)
- Restaurant: Minimum 12 food/ambiance photos

### Booking System Default (If Client Doesn't Specify)
- Plumbing/HVAC/Electrical/Auto/Landscaping → **Calendly** (most flexible, lowest cost)
- Dental/Med Spa → **Acuity Scheduling** (multi-provider support)
- Restaurant → **OpenTable or Tock** (industry-standard)

### Deployment Block Triggers (Must Resolve Before Go-Live)
1. Page load time >3 seconds on 4G mobile
2. Color contrast <4.5:1 WCAG AA on any text
3. Missing primary CTA button
4. Missing phone number in sticky header
5. Schema.org validation errors
6. No testimonials with photos
7. Unverified licensing/credentialing claims
8. SSL certificate not active
9. Mobile test failures (responsive design broken at any breakpoint)
10. Contact form non-functional (test submission fails)

---

## VERSION CONTROL & AMENDMENTS

**Current Version:** 1.0 | **Locked:** April 2026 | **Next Review:** August 2026

**How to Request Amendment:**
1. Document contradictory evidence (real-site teardown, market demand signal)
2. Link to source (Agent A, B, C file reference)
3. Propose rule change + rationale
4. Route through Auditor approval before implementation

**Immutable Rules (Cannot Be Amended Without Auditor Review):**
- Phone visibility requirement (99%+ validation)
- Mobile-first design mandate (65-77% mobile traffic across all industries)
- Trust credential display requirement (compliance + conversion)
- Google Reviews integration (recency > volume, Agent B/C consensus)

---

**End of BUILD-GOVERNANCE.md**

---

# V2 WELLNESS CLUSTER EXTENSIONS

*Added April 10, 2026 — applies when industry is Chiropractic, Massage, Gym/PT, Yoga, Physical Therapy, Mental Health, or Hyperbaric.*

# GOVERNANCE-WELLNESS-PATCH.md
## Universal Governance Updates for BUILD-GOVERNANCE.md (Wellness Cluster Industries 9-15)

This patch applies to all wellness industries. Apply each section in order to your existing BUILD-GOVERNANCE.md.

---

## 1. ADD NEW VOICE PROFILES SECTION

**Location:** After existing Voice Profiles section (Core, E-commerce, SaaS)

```
### Voice Profile: Therapeutic/Clinical
**Industries:** Chiropractic, Physical Therapy/Sports Rehabilitation, Mental Health Counseling
**Tone Pillars:** Evidence-based, reassuring, credential-forward, specificity-obsessed, outcome-measurable
**Constraint:** HIPAA compliance required in all copy. No guarantees or promises of cure. Every claim traceable to clinical foundation.
**Signature Pattern:** Problem statement → diagnostic clarity → modality-specific mechanism → expected timeline → credentials/evidence → call to action (booking)
**Forbidden:** Before/after imagery in mental health. Outcome guarantees. Unattributed testimonials. Vague modality descriptions.
**Voice Example:** "Cervical subluxation causing radiating arm pain requires precise adjustment. Dr. [Name] uses real-time imaging to target the specific vertebral misalignment driving your symptoms. 73% of new patients report measurable pain reduction within 4 visits. Schedule your initial assessment."

### Voice Profile: Studio/Aspirational
**Industries:** Yoga/Pilates Studio, Gym/Personal Training, Massage Therapy/Bodywork
**Tone Pillars:** Transformational, lifestyle-oriented, community-forward, accessible, results-visible, energy-positive
**Constraint:** Before/after imagery allowed (gym only with consent). Outcome claims must be defensible and non-medical. Community and belonging drive narrative.
**Signature Pattern:** Lifestyle aspiration → barrier removal → modality/trainer/studio credibility → community proof → transformation timeline → call to action (membership or session)
**Forbidden:** Medical claims. Diagnosis language. Guaranteed weight loss or body transformation. Exclusionary fitness gatekeeping.
**Voice Example:** "Your morning yoga practice shouldn't require a 45-minute commute. Our 6am Vinyasa flows are designed for working professionals—15 minutes of guided movement to build strength, calm, and clarity before your day starts. Join 400+ practitioners who've made this their ritual. First class free."

### Voice Profile: Mental Health/Safe
**Industries:** Mental Health Counseling/Therapy
**Tone Pillars:** Empathetic, non-judgmental, safe-space-affirming, credential-explicit, confidentiality-obsessed, stigma-dissolving
**Constraint:** HIPAA compliance non-negotiable. No outcome guarantees. Normalize therapy language. Crisis resources visible on every page. Never position therapy as "fix" or "cure"—position as "skilled partnership."
**Signature Pattern:** Normalization statement → specific modality/issue competency → therapist credential + specialty → safe-space affirmation → confidentiality guarantee → crisis resource → booking pathway
**Forbidden:** Before/after language. Success rate claims. Therapy outcome metrics. Comparing therapists. Emergency replacement for crisis care.
**Voice Example:** "Anxiety doesn't mean something is wrong with you—it means you'd benefit from skilled support. Sarah Chen, LMFT, specializes in workplace anxiety and uses evidence-based CBT with high-achievers. Your sessions are completely confidential. If you're in crisis, call 988 (Suicide & Crisis Lifeline) immediately. Book a confidential phone consultation."
```

---

## 2. ADD HIPAA COMPLIANCE UNIVERSAL RULE

**Location:** New section in Governance under "Compliance & Privacy"

```
### HIPAA Compliance Tier System (Wellness Industries)

**TIER 1 — MANDATORY FULL HIPAA BAA & ADHERENCE** (Highest Privacy Requirement)
- Mental Health Counseling/Therapy
- Physical Therapy/Sports Rehabilitation
- Chiropractic (when billing insurance)

**Requirements for Tier 1:**
- All patient data handling requires HIPAA-compliant infrastructure
- Booking systems, email communication, file storage must have Business Associate Agreements (BAAs)
- "Your information is protected under HIPAA confidentiality" must appear on booking form and privacy policy
- Crisis/emergency resources (988, local mental health emergency lines) visible on Mental Health only
- No patient names, conditions, or testimonial details without explicit written consent
- Testimonials must be attribute-only: "Sarah M." not full name; no condition mention
- Video testimonials require signed HIPAA-compliant consent (example: "I've worked with Dr. Lee on my back pain and feel stronger")
- No social proof that reveals health conditions (forbidden: "Patient with fibromyalgia reports 60% pain reduction")
- Contact forms limited to 3 fields maximum (name, email, booking preference)
- Email marketing for Tier 1 MUST include clear unsubscribe and only for appointment reminders/clinical updates (no promotions)

**TIER 2 — CONDITIONAL HIPAA ADHERENCE** (Moderate Privacy Requirement)
- Massage Therapy/Bodywork (when billing insurance or handling client medical history)
- Hyperbaric Oxygen Therapy/Wellness Center (medical cases; wellness-only lower requirement)

**Requirements for Tier 2:**
- BAAs required for booking systems if handling insurance information
- Privacy policy must disclose any data sharing (e.g., "appointment info shared with insurance per provider contract")
- Testimonials may include general outcomes ("felt rejuvenated," "improved mobility") but not specific conditions
- Form fields capped at 5 fields maximum if collecting health history
- Email marketing allowed for promotions only with clear opt-out

**TIER 3 — STANDARD PRIVACY ONLY** (Lower Privacy Requirement)
- Gym/Personal Training
- Yoga/Pilates Studio
- Massage Therapy/Bodywork (wellness-only, no insurance billing)

**Requirements for Tier 3:**
- Standard privacy policy + cookie disclosure
- Testimonials can include outcomes and general health aspirations ("lost 15 lbs," "feel more flexible")
- Before/after imagery allowed (gym only) with written consent
- Form fields standard (name, email, phone, goal/reason)
- Email marketing standard (promotions, class updates, memberships)

**Crossover Rule:** If a wellness business operates in multiple tiers (e.g., massage studio that bills some clients' insurance), default to HIGHEST tier requirement (Tier 1) across entire site. Example: A massage therapist who accepts insurance must use Tier 1 HIPAA compliance on all patient data.

**Testing Requirement:** Before launch, audit booking system, email provider, file storage, and communication tools for HIPAA compliance. Document BAAs.
```

---

## 3. ADD INSURANCE VERIFICATION COMPONENT

**Location:** New required component in Universal Components section

```
### INSURANCE VERIFICATION & TRANSPARENCY COMPONENT (Required for Tier 1 & Tier 2 Industries)

**Industries Requiring This Component:** Chiropractic, Physical Therapy, Mental Health, Hyperbaric (medical cases), Massage (insurance billing)

**Component Structure:**

#### Insurance Accepted Section (Hero or Navigation)
- Placement: Above the fold on homepage; sticky header if mobile
- Content: Logo list (OR bulleted list if using logos is complex) of accepted insurance carriers
- Example: "We accept: Aetna, Blue Cross Blue Shield, Cigna, Humana, United Healthcare, Medicare, Medicaid"
- Copy Hook: "Most insurance plans are accepted. Verify your coverage below."
- CTA Button: "Verify Your Insurance" → Links to one of:
  - Embedded insurance verification tool (e.g., Instamed, CoverMyMeds)
  - Contact form with 3 fields (insurance provider, member ID, date of birth) → auto-response with 24-hour verification
  - Phone number with clear phone support hours

#### Insurance Verification Tool (Mandatory)
- **Best Option:** SimplePractice or IntakeQ (both have embedded insurance verification)
  - Patient enters insurance info during booking
  - System auto-checks eligibility in real-time
  - Reduces no-shows and billing surprises
- **Second Option:** Contact form redirecting to specialist staff
- **Third Option (Lowest Friction):** Phone number with clear accessibility

#### Billing Transparency Section (Separate Page or Dedicated Footer Link)
- Heading: "Insurance & Billing"
- Content Required:
  - Which insurance plans accepted + excluded
  - What happens if insurance denies claim (patient responsibility policy)
  - Out-of-pocket cost estimate tool (if available)
  - Copay/deductible explanation
  - Payment plan options (if applicable—Tier 1/2 industries often offer financing for high-cost care)
  - Clear statement: "We will bill your insurance. You pay your copay/deductible at visit."
- Example Tone: "We handle insurance billing so you don't have to. We accept [list]. If your plan requires prior authorization, we'll submit and follow up. You'll always know your expected cost before your first visit."

#### Copy Voice (Insurance Section Specific)
- Problem-first: "Insurance billing confusion costs you time and money."
- Solution-clear: "We verify your coverage before your first appointment, handle all claims submission, and keep you informed of costs."
- Trust signal: "Transparent billing since [year]. 94% of patients have insurance approved before first visit."

#### Forbidden Elements (Insurance Section)
- Avoid vague language: "We may accept your insurance" → Replace with "We accept [specific list]"
- Avoid burying carrier logos: Must appear hero or navigation
- Avoid requiring full claim form before booking: Tier 1/2 only need member ID and plan name
- Avoid promising coverage: "Your insurance covers this treatment 100%" → Replace with "Most plans cover this modality; verify your coverage below"
- Avoid outdated carrier lists: Review quarterly

#### Mobile Requirement
- Insurance verification CTA must be visible on mobile without scrolling
- Phone number (clickable tel://) repeated in header and footer
- Verification tool must be mobile-responsive (SimplePractice/IntakeQ meet this)
```

---

## 4. UPDATE PRACTITIONER BIO COMPONENT (New Universal Standard for Wellness)

**Location:** Update existing Bio section or add as mandatory new component for Industries 9-15

```
### PRACTITIONER BIO COMPONENT (Required for All Wellness Industries—Chiropractic, PT, Mental Health, Massage, Yoga, Gym, Hyperbaric)

**Why:** Practitioner credibility and specialization are THE primary conversion driver in wellness. Reorder from generic "Name + credentials + story" to "Specialization + credentials + proof."

#### Mandatory Sub-Components (In This Order):

1. **Practitioner Name + Primary Specialization (Headline)**
   - Format: "[Name], [Credential], [Specialization]"
   - Examples:
     - "Dr. Michael Torres, DC — Sports Injury & Athlete Recovery Specialist"
     - "Jennifer Wu, LMFT — Anxiety & Workplace Performance Specialist"
     - "Marcus Johnson, NASM-CPT — Postpartum Fitness & Pelvic Floor Restoration"
   - Why Specialization First: Research (Agent C) shows 3x higher booking conversion when specialization appears in headline vs. buried in bio text

2. **Credentials (Explicit List)**
   - Format: Bulleted or comma-separated, full credential names (not abbreviations alone)
   - Examples:
     - "Licensed Marriage and Family Therapist (LMFT) | Board-Certified in Cognitive Behavioral Therapy | 15+ years clinical practice"
     - "Chiropractor (DC) | Certified in Graston Technique | Certified Athletic Trainer (ATC)"
   - Why: Tier 1 industries (mental health, PT, chiro) MUST show licensure explicitly

3. **Experience + Specificity (Quantified)**
   - Format: "[X] years working with [specific population/condition]"
   - Examples:
     - "16 years treating chronic lower back pain in desk workers. Specialty: corporate office ergonomics assessment and post-op spinal fusion rehab."
     - "12 years working with high-functioning anxiety in tech industry leaders. Modality: CBT-informed solution-focused therapy."
     - "8 years training postpartum clients. Specialty: diastasis recti restoration and pelvic floor coordination."
   - Why: Specific populations convert higher than generic practitioners

4. **Caseload + Outcomes (Non-Guaranteed, Measurable)**
   - Format: "Sees [X] clients/patients per [timeframe]. [X]% report [specific outcome]"
   - Examples:
     - "Currently seeing 25+ athletes per month. 78% return to sport without further injury."
     - "200+ clients in practice lifetime. 82% report reduced anxiety symptoms within 8 sessions."
   - Why: Social proof + transparency. Numbers validate experience without outcome guarantees

5. **Training + Modalities (Technical Credibility)**
   - Format: "[Modality 1], [Modality 2] | Trained at [Organization/Mentors]"
   - Examples:
     - "Trigger Point Release | Deep Tissue Massage | Sports Massage | Trained under [Mentor Name], Advanced Certification from [Institute]"
     - "Vinyasa Flow | Alignment-Based Yoga | Yin Yoga | 200-hour certification (Yoga Alliance) | Advanced studies with [Teacher Name]"
   - Why: Differentiates practitioners; details attract condition-specific seekers

6. **Philosophy + Personal Touch (Story, Max 2 Sentences)**
   - Format: "Why I do this work. What makes me different."
   - Examples:
     - "I believe recovery isn't one-size-fits-all. Every athlete's path back to sport is different, and I customize each phase of rehab to match YOUR goals."
     - "Therapy works best when you feel genuinely understood. I create space for the messy, complicated feelings that don't fit into neat diagnoses."
   - Why: Humanizes; builds trust; differentiates from competitors

7. **Bookable Profile Link (Explicit CTA)**
   - Format: Button or link text: "Book with [Name]" or "Schedule with [Name]"
   - Destination: Direct to practitioner-specific booking (if system supports) or general booking with note "I prefer [Practitioner Name]"
   - Why: Agent C research shows 3-5x booking lift when practitioners are directly bookable vs. generic "Book Now"

#### Layout Template (Mobile-First)
```
[PRACTITIONER PHOTO — High-Quality Headshot or Action Shot]

[NAME], [CREDENTIAL] — [SPECIALIZATION]

[CREDENTIALS BULLETED]

[EXPERIENCE + SPECIFICITY — 1 paragraph, max 50 words]

[CASELOAD + OUTCOMES — 1 line]

[TRAINING + MODALITIES — 1 line or 2 lines max]

[PHILOSOPHY — 1-2 sentences, conversational tone]

[BUTTON: Book with [Name]]
```

#### Photo Requirements (Conversion Impact)
- Headshot (65% of real sites per Agent C) or action shot (practitioner working with client)
- Warm, approachable expression (no stiff corporate headshots)
- Visible name + credential label on photo (optional but 18% higher click-through per Agent C)
- Min resolution: 400x500px; file size optimized for mobile

#### Forbidden Elements (Practitioner Bios)
- Generic credentials without license number (Tier 1: always include license #)
- Before/after photos (unless Gym/Personal Training with consent; FORBIDDEN in Mental Health)
- Vague specializations: "I work with all clients" → Replace with specific populations/conditions
- Personal life overload: Philosophy section is NOT autobiography
- Buried practitioner role: Always lead with "Dr." / "Therapist" / "Trainer" + name
- Multiple practitioners listed without clear photo/name matching: Use repeating component for each

#### Voice Tone (Practitioner Bios)
- Confident but not arrogant ("Specialist in X" not "Expert in everything")
- Warm but professional (conversational philosophy, clinical credentials)
- Evidence-based (outcomes, specific training, measurable experience)
- Accessible (explain modalities for non-expert readers)
```

---

## 5. ADD MEMBERSHIP & RECURRING BILLING COMPONENT

**Location:** New required component for Industries 9-15 (specific industries noted)

```
### MEMBERSHIP & RECURRING BILLING COMPONENT (Required for Gym, Yoga, Massage, PT, Hyperbaric)

**Industries Requiring This Component:** 
- Gym/Personal Training (primary revenue model)
- Yoga/Pilates Studio (primary revenue model)
- Massage Therapy (60% of revenue per Agent B market analysis)
- Physical Therapy (if rehab packages offered)
- Hyperbaric Oxygen (multi-session package model common)

**Why:** Agent B research shows recurring revenue from memberships/packages is primary business model for 80%+ of wellness businesses. Membership prominence converts higher than session-by-session booking.

#### Component Structure:

**1. Hero/Pricing Section Placement**
- Membership options must appear ABOVE THE FOLD on homepage
- Not hidden in a secondary "Pricing" page
- Not a dropdown or modal; full transparency on options and cost

**2. Membership Tier Structure**
- Minimum 2 options (Basic + Premium recommended)
- Maximum 4 options (decision paralysis above 3)
- Format: Card layout (one per option) with clear visual differentiation

**Card Layout per Tier:**
```
[TIER NAME] — [PRICE/MONTH or PRICE/PACKAGE]

[PRIMARY BENEFIT IN BOLD] (e.g., "8 Classes Monthly" or "Unlimited Massage")

Benefits List (Bulleted):
- Specific benefit 1 (be prescriptive, not vague)
- Specific benefit 2
- Specific benefit 3
- [etc.]

Hidden Benefits (Only show on hover or expansion):
- Less prominent add-ons
- Cancellation policy
- Rollover/pause policy

[CTA BUTTON: "Join [Tier Name]" or "Get Started"]
```

**Tier Examples by Industry:**

*Gym/Personal Training:*
- Starter: $49/mo, 4 group classes, gym access (no personal training)
- Performance: $99/mo, unlimited classes, gym access, 2 PT sessions/month
- Elite: $199/mo, unlimited classes, gym access, unlimited PT sessions, nutrition coaching

*Yoga/Pilates Studio:*
- Class Pack: $99/month, 8 classes (14-day expiration)
- Unlimited: $149/month, unlimited classes, member discount on workshops
- Premium: $199/month, unlimited + 1 private session/month + guest passes

*Massage Therapy:*
- 4-Pack: $360 (4x 60-min massage, $90 each), valid 12 months
- Membership: $129/month, 1 massage monthly + 10% add-on services
- VIP: $249/month, 2 massages monthly + priority booking + 15% add-on services

*Physical Therapy (Packages):*
- Starter: $1,200, 8 visits (initial eval + 7 follow-up), 4-week program
- Standard: $2,400, 16 visits, 8-week program with home exercise progression
- Premium: $4,000, 24 visits, 12-week program + telehealth follow-up

**3. Transparent Pricing Copy**
- No hidden fees language: "What you see is what you pay"
- Cancellation policy visible in tier card or tooltip
- Auto-renewal clarity: "Renews monthly unless cancelled 7 days prior"
- Pause option visible: "Need a break? Pause for up to 2 months"
- "First [session/class/massage] free" callout if applicable (powerful converter)

**4. Comparison Table (Optional but Recommended)**
- Rows: Feature (classes, gym access, PT sessions, booking priority, etc.)
- Columns: Each tier
- Checkmark/X for inclusion
- Helps fence-sitters decide

**5. Conversion Actions (Membership-Specific)**
- Primary CTA: "Join Now" or "Get Started" (no "Learn More" for membership tier cards)
- Secondary CTA: "Compare Plans" (links to comparison table)
- Friction-reducer: "Money-back guarantee if not satisfied in first month" (where applicable)
- Social proof: "400+ members. 4.8/5 star rating" (near CTA)

**6. Sticky Mobile CTA**
- Floating button (44px min height) on mobile, visible when scrolling
- Text: "View Memberships" or "Get Started"
- Color: High contrast (typically brand primary)
- Always accessible, never scrolls off-screen

**7. FAQ Section (Membership-Specific)**
- Titled: "Membership Questions"
- Required Q&As:
  - "Can I cancel anytime?" → Be honest. "Yes, anytime with 7 days notice" or "30-day commitment required."
  - "Do classes/sessions rollover?" → Explicit policy
  - "Can I pause?" → Yes/no; if yes, duration allowed
  - "What if I miss classes?" → Expiration policy
  - "Can I switch tiers?" → Upgrade/downgrade policy
  - "Is there a trial?" → Free trial, free class, or money-back offer if applicable

**8. Trust Signals (Membership-Specific)**
- "Pause or cancel anytime" (if true)
- "[X]+ happy members" (social proof specific to membership)
- "Money-back if not satisfied in first month" (risk-reversal)
- "No long-term contract required" (if applicable)
- "[X]% member retention rate" (if >85%, include)

#### Forbidden Elements (Membership Component)
- Hidden pricing: "Contact for rates" → Replace with transparent tiering
- Unlimited false claims: "Unlimited classes" with small-print blackout times → Be specific: "Unlimited yoga classes, all times except peak hours (5-7pm weekdays)"
- Confusing rollover language: "Classes don't expire but must be used within 90 days unless rolled over with retention fee" → Replace with: "Classes expire after 90 days with no rollover."
- Bait-and-switch tiers: Lowest tier so stripped down it's unusable → Ensure lowest tier is genuinely functional
- No cancel policy visible: FORBIDDEN. Always state clearly.
- Discount tactics unclear: "50% off memberships this week only" without start/end date → Be specific: "Offer valid April 10-20, 2026 only"

#### Conversion Multipliers (Membership-Specific, from Agent C Research)
- **"First class/session free" offer:** 2.3x booking conversion multiplier
- **Comparison table:** 15% higher conversion vs. card-only
- **Sticky mobile CTA:** 3.2x mobile conversion vs. none
- **Money-back guarantee:** 1.8x conversion on price-hesitant segment
- **Testimonial specific to membership:** "I'm 8 months into the Unlimited plan and actually come to 20+ classes per month—worth every cent" → 2x more persuasive than generic testimonial
```

---

## 6. UPDATE DEFAULT SECTION ORDER NOTE (Wellness Cluster Deviation)

**Location:** Governance section on "Default Section Order" or "Page Structure"

```
### NOTE: Wellness Industries (9-15) — Deviation from Standard V1 Section Order

**Standard V1 Order (Industries 1-8):**
1. Hero
2. Value Proposition
3. Services
4. Testimonials/Social Proof
5. FAQ
6. Contact
7. Footer

**WELLNESS CLUSTER ORDER (Industries 9-15) — Reordered for Higher Conversion:**

**For Tier 1 (Mental Health, PT, Chiropractic):**
1. Hero + Insurance Accepted (sticky, visible above fold)
2. Urgency Statement + Problem-First Copy
3. Practitioner Bio(s) — Specialization-first, credential-explicit, direct booking CTA
4. Insurance Verification Tool (embedded or form redirect)
5. Services/Modalities (condition-specific if applicable)
6. Booking System (embedded, sticky mobile CTA)
7. Testimonials (outcome-specific, condition-relevant, HIPAA-compliant)
8. FAQ (insurance, HIPAA confidentiality, cancellation, billing)
9. Crisis/Emergency Resources (Mental Health only; visible footer link)
10. Contact/Office Info
11. Footer

**Rationale for Reorder:**
- Insurance acceptance above fold = reduces objection immediately (Agent B: 42% hesitation on "Does my insurance work?")
- Practitioner bio early = credibility established before service details (Agent C: 3x booking lift vs. generic descriptions)
- Booking system early = friction reduction; user can commit while convinced (Agent C: 3-5x conversion embedded vs. external redirect)
- Testimonials after booking = reinforce decision, not primary driver (Agent C: real sites show booking CTA before social proof)
- Crisis resources visible (Mental Health) = accessibility + legal protection

**For Tier 2 (Massage Insurance-Billing, Hyperbaric Medical):**
1. Hero + Insurance Accepted
2. Practitioner/Facility Bio
3. Booking System (sticky mobile)
4. Services (condition-specific if applicable)
5. Insurance Verification Tool
6. Testimonials
7. FAQ
8. Contact
9. Footer

**For Tier 3 (Gym, Yoga, Massage Wellness-Only):**
1. Hero + Membership Offer (above fold)
2. Membership Tiers (prominent, transparent pricing)
3. Practitioner/Trainer Bios (aspirational, transformation-focused)
4. Classes/Services (community-focused description)
5. Transformation/Results Testimonials (before-after if gym)
6. Booking/Membership CTA (sticky, prominent)
7. FAQ
8. Contact
9. Footer

**Conversion Implication:** Do not force all wellness industries into standard V1 order. Tier 1 require credibility-first structure; Tier 2 need insurance transparency early; Tier 3 prioritize membership/transformation. Reordering increases conversion 18-34% vs. one-size-fits-all V1 order (Agent C real-site analysis).

**Facility Tour Section (Not Primary):**
- Agent A reported 82% of templates include full facility tour (photos, 3D virtual tour)
- Agent C found real-converting sites bury facility tour as section 6-7 or optional gallery
- **Governance Override:** Do NOT lead with facility tour. Include as optional visual gallery AFTER booking CTA, not before.
- **Exception:** Gym/Personal Training can lead with transformation story + gym photos (aspirational), then move to membership tiers
```

---

## 7. ADD INTEGRATIONS TO CANONICAL LIST

**Location:** Governance section on "Mandatory/Recommended Integrations by Industry"

```
### WELLNESS INTEGRATIONS — NEW CANONICAL REQUIREMENTS (Industries 9-15)

#### TIER 1 INDUSTRIES (Mental Health, PT, Chiropractic) — HIPAA-Compliant Integrations Required

**Booking/Scheduling (Choose One):**
- **SimplePractice** (Recommended for Tier 1): HIPAA BAA included; insurance verification built-in; EHR features; telehealth (HIPAA BAA required for video); patient portal; billing integration
- **Jane App**: HIPAA BAA included; calendar + forms; telehealth ready; strong for PT/chiro
- **IntakeQ**: HIPAA BAA; intake forms + booking; insurance verification; lower cost option
- **Psychology Today Directory**: Listing + integration for mental health practitioners (not full booking, but drives traffic)

**Telehealth (Tier 1 Only — Mental Health & PT if remote sessions offered):**
- **Zoom (with HIPAA BAA)**: Only if BAA is signed and video room link not public
  - Forbidden: Public Zoom link in hero. Always use authenticated booking system that generates secure room.
- **SimplePractice Telehealth Module** (preferred): HIPAA-native, no separate BAA required
- **Jane App Telehealth**: HIPAA-compliant video built into booking

**Insurance Verification (Choose One):**
- **SimplePractice Insurance Verification** (built-in if using SP booking)
- **Instamed**: Standalone verification, integrates with most booking systems
- **CoverMyMeds**: Prior auth + eligibility checking; often pre-required by PT/chiro

**Email (HIPAA-Compliant):**
- Standard email (Gmail, Outlook) is NOT HIPAA-compliant; do not send patient info via standard email
- **Option 1:** Patient portal within SimplePractice/Jane App (preferred)
- **Option 2:** Dedicated HIPAA email provider (Hushmail, ProtonMail Business) — higher cost
- **Option 3:** Use booking system's built-in messaging only (no external email for patient data)

#### TIER 2 INDUSTRIES (Massage Insurance-Billing, Hyperbaric Medical Cases) — Insurance Transparency Required

**Booking/Scheduling:**
- **MindBody** (strong for massage; insurance + membership built-in)
- **Acuity Scheduling** (flexible, integrates with many CRMs; no native insurance verification but can custom-field it)
- **SimplePractice** (if handling medical cases; overkill for wellness-only massage)
- **Vagaro**: Appointment + membership + billing; common for spas/massage

**Insurance Verification (if insurance-billing):**
- **Instamed** or **CoverMyMeds** (see Tier 1)
- OR manual verification process (contact insurance, document, provide to patient)

**Email:**
- Standard email acceptable for Tier 2; no patient health data in email unless encrypted
- If sending appointment reminders with condition mention: Use booking system message or HIPAA email

#### TIER 3 INDUSTRIES (Gym, Yoga, Massage Wellness-Only) — Standard Integrations

**Booking/Scheduling:**
- **MindBody** (industry standard for yoga/pilates/massage)
- **Acuity Scheduling** (flexible, affordable, class scheduling)
- **Zen Planner** (fitness-focused; gym, personal training)
- **Mariana Tek**: Class scheduling + billing + member portal
- **Mindbody** (yoga, pilates, massage, fitness all strong)

**Membership/Billing (Tier 3 Focused):**
- **MindBody**: Class packages, memberships, auto-billing, member app
- **Zen Planner**: Fitness memberships, trainer scheduling, nutrition tracking
- **Mariana Tek**: Hybrid gym/group fitness billing
- **Stripe/Square**: Standalone billing if not bundled with booking

**Email:**
- Standard email acceptable; use booking system newsletter features for class promotions, membership offers

#### INTEGRATION HIERARCHY (Ranked by Conversion Impact, from Agent C Research)

**Tier 1 Priority Order:**
1. **HIPAA-Compliant Booking + Insurance Verification** (SimplePractice or Jane App) — Non-negotiable; 45% of patients verify insurance before booking
2. **Telehealth (if offering remote sessions)** — SimplePractice or native module; 3x booking lift if remote option available for hesitant patients
3. **Patient Portal** — 25% higher patient compliance with home exercises/instructions
4. **Email/SMS Reminders** (HIPAA-approved only) — 18% reduction in no-shows

**Tier 2 Priority Order:**
1. **Membership/Recurring Billing** (MindBody or SimplePractice) — 60% massage revenue from memberships (Agent B)
2. **Insurance Verification** — 35% of insured massage clients verify before booking
3. **Class/Appointment Calendar** — Visible availability = 2x booking conversion vs. "contact us"
4. **Client Intake Forms** — Pre-booking form completion = 12% higher conversion

**Tier 3 Priority Order:**
1. **Class Schedule + Live Availability** (MindBody, Acuity) — 2.5x conversion vs. hidden schedule
2. **Membership/Auto-Billing** (MindBody, Zen Planner) — Core revenue model; prominent on homepage
3. **Member Mobile App** (if integrated) — 40% higher attendance, 25% higher retention per app feature
4. **SMS Reminders** (class reminders, membership renewals) — 18% lower no-show rate

#### Forbidden Integration Patterns (Template Theater from Agent C)
- Google Calendar embed (looks amateur; use professional booking system)
- Multiple conflicting booking systems (e.g., Calendly + MindBody; pick one)
- Hidden integrations (no credit card required sign-up modals; use transparent booking)
- Broken insurance links (insurance verification tool that doesn't work; test quarterly)
- Outdated insurance lists (update carrier logos + list quarterly)
- Missing HIPAA BAAs (Tier 1/2: verify every vendor has signed BAA before launch)
```

---

## 8. ADD VOICE INTEGRATION NOTE

**Location:** Governance section on "Voice & Messaging Standards"

```
### WELLNESS VOICE INTEGRATION — Copy Hierarchy for Industries 9-15

**All wellness industries (Tier 1, 2, 3) follow this copy hierarchy:**

**Tier 1 (Clinical/Therapeutic):**
Problem Statement → Diagnostic Clarity → Modality/Evidence → Timeline → Credentials → CTA (Booking)

**Example Flow:**
"Chronic neck pain limits your work and sleep [problem]. Your cervical spine subluxation is pressing on nerve roots [diagnostic clarity]. We use precision X-ray guided adjustment to reposition vertebrae [modality/evidence]. 73% of new chiro patients report measurable improvement within 4 visits [timeline]. Dr. Torres is a Board-Certified Chiropractor with 16 years of athlete recovery specialization [credentials]. Schedule your assessment today [CTA]."

**Tier 2 (Insurance-Focused):**
Problem/Lifestyle Need → Solution/Modality → Credentials → Insurance Transparency → CTA

**Example Flow:**
"Your recovery from knee surgery needs expert guidance [problem]. Physical therapy rebuilds strength and restores range of motion in 8-12 weeks [solution]. Dr. Chen is a licensed PT with 10+ years post-surgical rehab [credentials]. We accept most insurance plans and verify coverage before your first visit [insurance]. Book your initial assessment [CTA]."

**Tier 3 (Aspirational/Community):**
Lifestyle Aspiration → Barrier Removal → Credentials/Community → Transformation Timeline → CTA

**Example Flow:**
"You want to feel strong and flexible without expensive gym memberships [aspiration]. Our unlimited yoga membership is $149/month with community classes every day at convenient times [barrier removal]. Classes taught by 200+ certified yoga teachers focused on alignment and accessibility [credentials/community]. Most members report noticeably better mobility within 3 weeks [timeline]. Join our community [CTA]."

**Universal Copy Rules (All Tiers):**
- Lead with problem or aspiration (NOT credential)
- Be specific (not "helps with pain" → "reduces chronic lower back pain in desk workers")
- Show evidence (percentages, timelines, social proof)
- Make HIPAA requirement invisible (Tier 1: weave into testimonials + privacy copy, not as friction)
- CTA is always actionable booking, not "Learn More"
- Seasonal variations (see Benchmark Data in each industry card for peak demand periods)
```

---

## SUMMARY OF PATCHES

Apply these 8 sections to your BUILD-GOVERNANCE.md in order:

1. **New Voice Profiles** (Therapeutic/Clinical, Studio/Aspirational, Mental Health/Safe) — Wellness-specific tone templates
2. **HIPAA Compliance Tier System** — Three-tier framework with specific requirements per industry
3. **Insurance Verification Component** — Required structure for Tier 1/2 industries
4. **Practitioner Bio Component** — New universal standard; specialization-first reordering
5. **Membership & Recurring Billing Component** — Required for gym, yoga, massage, PT, hyperbaric
6. **Section Order Deviation Note** — Wellness can deviate from standard V1 order (credibility-first for Tier 1)
7. **Integration Canonical List** — HIPAA-compliant integrations for Tier 1; MindBody/Acuity for Tier 3
8. **Voice Integration Note** — Copy hierarchy templates for all three tiers

**Total Governance Impact:** 8 new components/rules to absorb 7 new wellness industries into the Pattern Library while maintaining HIPAA compliance, practitioner credibility, and industry-specific conversion patterns.
