# Writing Binary Assertions — A Practical Guide

## The Golden Rule
If two reasonable people could disagree on the answer, it is NOT binary. Do not put it in evals.json.

## What Makes a Good Binary Assertion

### Structure Assertions
- "First line is a standalone sentence (not part of a paragraph)"
- "Contains at least [N] line breaks between sections"
- "Output has exactly [N] sections/headers"
- "Starts with a # heading"
- "Ends with a call-to-action, not a question"

### Length/Count Assertions
- "Total word count is under [N]"
- "Total word count is over [N]"
- "Contains exactly [N] bullet points"
- "Each bullet point is 1-2 sentences"
- "Has between [N] and [M] paragraphs"

### Content Presence Assertions
- "Contains at least one specific number or statistic"
- "Includes a code example"
- "References [specific concept] from the skill's reference files"
- "Contains the user's name/company when provided"
- "Includes a date or timestamp"

### Forbidden Pattern Assertions
- "Does not contain em-dashes (—)"
- "Does not contain exclamation marks"
- "Does not use the phrase 'It's worth noting'"
- "Does not start with 'Sure' or 'Absolutely'"
- "Does not contain placeholder text like [INSERT] or TBD"

### Format Assertions
- "Output is valid markdown"
- "All links are formatted as [text](url)"
- "Tables have header rows"
- "Code blocks specify a language"
- "Headings follow a hierarchy (no skipping levels)"

## What NOT to Assert (Subjective — Needs Human Review)
- "Has a compelling subject line" ← two people could disagree
- "Matches our brand voice" ← subjective
- "Is creative and engaging" ← subjective
- "Uses appropriate persuasion" ← subjective
- "Is well-written" ← subjective

## How Many Assertions Per Test?
- **Minimum:** 3 per test prompt (too few = not enough signal)
- **Sweet spot:** 5 per test prompt
- **Maximum:** 8 per test prompt (too many = noise, diminishing returns)
- **Across all tests:** 25 total assertions is a good target (5 prompts × 5 assertions)

## Writing Test Prompts
- Use prompts that represent REAL usage of the skill
- Cover different scenarios (happy path, edge cases, minimal input, complex input)
- Each prompt should test a DIFFERENT aspect of the skill
- Example spread for a copywriting skill:
  1. Short LinkedIn post (tests length constraints)
  2. Long-form blog intro (tests structure)
  3. Email subject lines (tests format)
  4. CTA-heavy landing page copy (tests persuasion elements)
  5. Minimal-input prompt (tests graceful handling)

## evals.json Template
```json
{
  "skill_name": "your-skill-name",
  "evals": [
    {
      "id": 1,
      "prompt": "The exact prompt a user would type",
      "expected_output": "Human-readable description of what good output looks like",
      "assertions": [
        "Binary assertion 1 (true/false)",
        "Binary assertion 2 (true/false)",
        "Binary assertion 3 (true/false)",
        "Binary assertion 4 (true/false)",
        "Binary assertion 5 (true/false)"
      ]
    }
  ]
}
```

## Common Mistakes

### Mistake 1: Assertions That Are Too Vague
❌ "Output is good"
✅ "Output contains at least 3 numbered steps with explanations"

### Mistake 2: Assertions That Require Interpretation
❌ "Tone is professional"
✅ "Does not contain casual phrases like 'hey', 'gonna', 'kinda'"

### Mistake 3: Assertions That Depend on External Context
❌ "References best practices"
✅ "Mentions OWASP or NIST framework by name"

### Mistake 4: Too Many Interdependent Assertions
❌ Testing 8 assertions that all check different aspects of tone
✅ Testing 2-3 tone assertions + other structural checks

### Mistake 5: Assertions That Are Impossible to Fail
❌ "Output contains text" (always true)
✅ "Output contains a specific metric (e.g., 'productivity increased by X%')"

## Tips for Strong Evals

1. **Write assertions as checkable rules, not judgments.**
   - Rule: "First paragraph is fewer than 100 words"
   - Judgment: "Introduction is concise" ← don't use

2. **Test the OPPOSITE too.**
   - If testing "contains at least 1 example", also test a scenario where 0 examples would fail

3. **Use exact metrics when possible.**
   - "Exactly 5 bullet points" beats "several bullet points"
   - "Under 200 words" beats "not too long"

4. **Group assertions by failure pattern.**
   - Structural: headers, sections, format
   - Content: examples, stats, specificity
   - Constraints: word count, forbidden phrases, tone

5. **Test the skill's unique value, not generic writing.**
   - For a "subject line" skill: test word count, no questions, compelling hook
   - For a "data summary" skill: test presence of metrics, headers, comparison language
