---
name: eval-generator
description: "Auto-generate binary evaluation files (evals.json) for any Claude Code skill. Use this skill whenever you need to create test cases, write binary assertions, generate evals, bootstrap an evals.json file, or prepare a skill for autoresearch self-improvement. Trigger on: 'generate evals', 'create evals.json', 'write assertions', 'bootstrap evals', 'prepare skill for autoresearch', 'create test cases for skill', 'eval generator', 'binary assertions', or any request to create evaluation criteria for a skill. Also trigger proactively when a user creates a new skill and hasn't set up evals yet."
---

# Eval Generator

Generate comprehensive binary evaluation files for any Claude Code skill in under 2 minutes.

## What This Does
Reads a target skill's SKILL.md and reference files, analyzes the rules and output patterns, and generates a complete `evals/evals.json` file containing test prompts and binary (true/false) assertions. This evals.json can then be used by the autoresearch skill for autonomous self-improvement loops.

## Process

### Step 1: Read the Target Skill
- Read the SKILL.md file completely
- Read all reference files mentioned in the SKILL.md
- Identify: output format rules, content requirements, structural patterns, forbidden patterns, length constraints, any explicit "always" or "never" rules

### Step 2: Extract Testable Rules
From the skill, extract every rule that can be verified with a binary true/false check:

**Categories to scan for:**
- Format rules (markdown structure, headings, bullet points)
- Length constraints (word counts, section limits, character limits)
- Content requirements (must include X, must reference Y)
- Forbidden patterns (no em-dashes, no questions at end, no filler phrases)
- Structural rules (standalone first line, CTA at end, specific section order)
- File output rules (specific file types, naming conventions)

### Step 3: Generate Test Prompts
Create 5 diverse test prompts that:
1. Cover DIFFERENT use cases of the skill
2. Range from simple to complex inputs
3. Include at least one edge case (minimal input, unusual request)
4. Represent REAL user prompts (not artificial test language)
5. Each tests different aspects of the skill's rules

### Step 4: Assign Assertions to Prompts
For each test prompt, write 5 binary assertions:
- At least 1 structural assertion (format/layout)
- At least 1 content assertion (includes required element)
- At least 1 constraint assertion (length/count limit)
- At least 1 forbidden pattern assertion (does NOT contain X)
- At least 1 skill-specific assertion (unique to this skill's purpose)

Total target: 25 assertions across 5 test prompts.

### Step 5: Validate Assertion Quality
Before outputting, check each assertion against these criteria:
- Is it truly binary? (Can only be true or false, no ambiguity)
- Is it testable without human judgment? (Could a script check it?)
- Is it derived from an actual rule in the SKILL.md? (Not invented)
- Is it specific enough? ("Under 300 words" not "concise")
- Could two people agree on the answer? (No subjectivity)

Remove any assertion that fails these checks.

### Step 6: Output evals.json
Write the file to `{skill_path}/evals/evals.json`:

```json
{
  "skill_name": "[name from SKILL.md frontmatter]",
  "generated_at": "[ISO timestamp]",
  "source_rules": [
    "Rule 1 extracted from SKILL.md",
    "Rule 2 extracted from SKILL.md"
  ],
  "evals": [
    {
      "id": 1,
      "prompt": "Realistic user prompt",
      "expected_output": "Description of what good output looks like",
      "assertions": [
        "Binary assertion 1",
        "Binary assertion 2",
        "Binary assertion 3",
        "Binary assertion 4",
        "Binary assertion 5"
      ]
    }
  ]
}
```

### Step 7: Summary Report
After generating, output a summary:
- Total test prompts: X
- Total assertions: X
- Assertions by category: structural (X), content (X), constraint (X), forbidden (X), skill-specific (X)
- Rules NOT covered (couldn't convert to binary): list any subjective rules that were skipped

## Important Notes
- The `source_rules` field documents which SKILL.md rules each assertion traces back to. This is critical for debugging when assertions fail.
- If a skill has reference files that contain additional rules (tone guides, templates, examples), read those too — they often contain testable rules.
- If the skill's SKILL.md is vague or has few explicit rules, flag this to the user and suggest they add more specific rules before running autoresearch.
- Always create the `evals/` directory inside the skill directory if it doesn't exist.

## Related Skills
- `autoresearch` — Uses the generated evals.json for autonomous self-improvement loops
- `skill-creator` — Full eval framework with qualitative review and benchmarking
