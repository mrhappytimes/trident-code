# Binary Assertion Patterns — Comprehensive Reference

A cheat sheet of 50+ testable assertion patterns for eval-generator. Each pattern is binary (true/false), script-checkable, and derived from common skill rules. Use these templates to quickly generate assertions for any skill type.

---

## STRUCTURAL ASSERTIONS (10 patterns)

### 1. Markdown Heading Structure
```
Output contains exactly N top-level (H1) headings
Output contains all required section headings in order: "Heading1", "Heading2", "Heading3"
Output begins with a top-level heading
First heading in output is "Section Name"
```
**Example:** `Output contains exactly 3 H1 headings` (true/false)

### 2. Markdown List Formatting
```
Output contains at least N bullet points
Output contains at least N numbered list items
All bullet points use consistent formatting (- or *)
Numbered lists are sequential (1, 2, 3, etc.)
```
**Example:** `Output contains at least 5 bullet points` (true/false)

### 3. Paragraph Structure
```
First paragraph is a standalone opening statement
Output has at least N paragraphs
No paragraph exceeds M words
First line is not indented or bulleted
```
**Example:** `First paragraph stands alone without headers` (true/false)

### 4. Markdown Code Blocks
```
Output contains code block(s) with language identifier
JSON examples use triple backticks with "json" identifier
Code blocks are properly closed (opening and closing ```)
SQL/Python/JavaScript examples use correct syntax highlighting
```
**Example:** `All code blocks have language identifiers (json, python, etc.)` (true/false)

### 5. Line Breaks and Spacing
```
Sections are separated by blank lines
No more than 2 consecutive blank lines
Output does not start with blank lines
Output does not end with excessive blank lines
```
**Example:** `Sections are separated by at least one blank line` (true/false)

### 6. Table Formatting
```
Tables use markdown format with | delimiters
Tables have header row with separator (|---|)
All rows have same column count as header
Table header is bold (or uses proper markdown)
```
**Example:** `All markdown tables have a header row` (true/false)

### 7. Quote/Callout Formatting
```
Blockquotes use > syntax
All blockquotes are properly formatted
Callouts follow specified format (e.g., ::: {.callout})
Numbered/bulleted callouts maintain structure
```
**Example:** `All blockquotes use > syntax` (true/false)

### 8. Link Formatting
```
All links use markdown syntax: [text](url)
No bare URLs in output
URLs in links start with http:// or https://
Link text is descriptive (not "click here")
```
**Example:** `All links use markdown format [text](url)` (true/false)

### 9. Emphasis and Styling
```
Bold text uses ** delimiters, not __ or <b>
Italics use _ or * delimiters consistently
Strikethrough uses ~~text~~ syntax
No HTML tags (<b>, <i>, <em>) in markdown output
```
**Example:** `Bold text uses ** delimiters, not HTML tags` (true/false)

### 10. File Path and Directory Structure
```
Output uses forward slashes for paths (/ not \)
Paths relative to project root start with ./
Absolute paths start with /
File extensions match output spec (e.g., .json, .md, .py)
```
**Example:** `All file paths use forward slashes` (true/false)

---

## CONTENT REQUIREMENT ASSERTIONS (12 patterns)

### 11. Mandatory Sections
```
Output includes a section titled "Summary"
Output includes a section titled "Next Steps"
Output includes a "Related Resources" section
Output includes an "Implementation" section
```
**Example:** `Output includes a "Key Findings" section` (true/false)

### 12. Required Information
```
Output includes at least one example
Output mentions the user's stated goal/problem
Output includes a specific date or timeframe
Output references the source document/skill name
```
**Example:** `Output references the source skill by name` (true/false)

### 13. Technical Details
```
Output includes version numbers (e.g., Python 3.x)
Output specifies required dependencies
Output includes API keys or credentials formatting guidance
Output lists command-line flags or options
```
**Example:** `Output specifies required Python version` (true/false)

### 14. Metadata/Attribution
```
Output includes a generated timestamp
Output includes skill name or script name
Output includes author name or attribution
Output includes source URL or reference
```
**Example:** `Output includes a generated timestamp` (true/false)

### 15. Diversity of Examples
```
Output contains at least N different examples
Examples cover at least N different use cases
At least one example is a complete working case
Examples progress from simple to complex
```
**Example:** `Output includes at least 3 different examples` (true/false)

### 16. Explanatory Text
```
Every code example is preceded by explanation
Each section includes a 1-sentence summary
Technical terms are defined on first use
Acronyms are spelled out on first mention
```
**Example:** `Every code example has preceding explanation` (true/false)

### 17. CTA and Guidance
```
Output ends with a clear call-to-action
Output includes "Next steps" guidance
Output suggests follow-up resources
Output directs user to take specific action
```
**Example:** `Output ends with a next steps section` (true/false)

### 18. Cross-References
```
Output includes internal links between sections
Output cites external references with URLs
Output mentions related skills or tools
Output includes comparison to alternatives
```
**Example:** `Output includes at least 2 external references` (true/false)

### 19. Data Format
```
JSON output is valid and parseable
Numbers are formatted as integers or floats (not strings)
Dates use ISO 8601 format (YYYY-MM-DD)
Booleans use true/false (not 1/0 or Yes/No)
```
**Example:** `Output JSON is valid and parseable` (true/false)

### 20. Contextual Adaptation
```
Output acknowledges user's specific constraint/requirement
Output references the provided input directly
Output mentions user's stated difficulty or goal
Output personalizes response to user's context
```
**Example:** `Output directly references the user's input` (true/false)

### 21. Completeness
```
Output addresses all questions asked in prompt
Output provides multiple perspectives/options
Output includes both pros and cons
Output is self-contained (doesn't require external reading)
```
**Example:** `Output addresses all parts of the user's question` (true/false)

### 22. Accuracy and Verification
```
Output includes disclaimers where appropriate
Output distinguishes between fact and opinion
Output cites sources for specific claims
Output is grounded in the provided context (not hallucinated)
```
**Example:** `All claims are grounded in provided context` (true/false)

---

## LENGTH AND CONSTRAINT ASSERTIONS (10 patterns)

### 23. Word Count Limits
```
Output is under N words
Output is at least N words
Each section is under M words
No paragraph exceeds P words
```
**Example:** `Output is under 500 words` (true/false)

### 24. Character Limits
```
Output is under N characters
Output title is under 100 characters
Each heading is under 80 characters
Line length does not exceed 120 characters
```
**Example:** `Output is under 5000 characters` (true/false)

### 25. Line Count
```
Output is fewer than N lines
Summary section is 3-5 lines
No section exceeds N lines
```
**Example:** `Output is fewer than 100 lines` (true/false)

### 26. Section Count and Balance
```
Output contains exactly N top-level sections
Output contains N–M subsections
No section is significantly longer than others (balance check)
Each section has comparable depth
```
**Example:** `Output contains between 4 and 6 top-level sections` (true/false)

### 27. List Item Count
```
Bulleted list has at least N items
Numbered list has no more than M items
Each section has 2–4 key points
```
**Example:** `Main bullet list has at least 3 items` (true/false)

### 28. Example Count
```
Output includes at least N code examples
Output includes at least N real-world examples
At least one example is under 10 lines
At least one example exceeds 20 lines
```
**Example:** `Output includes at least 2 code examples` (true/false)

### 29. Citation/Reference Count
```
Output includes at least N citations
Output references at least N external sources
Output includes at least N internal links
```
**Example:** `Output includes at least 3 external references` (true/false)

### 30. Field Count (for structured output)
```
Each record includes all N required fields
Each JSON object has 5–8 properties
No field value exceeds M characters
```
**Example:** `Each JSON object includes all required fields` (true/false)

### 31. Response Time or Size
```
Output file size is under N MB
Output can be processed in under M seconds
Output is suitable for email transmission (under 25MB)
```
**Example:** `Output file size is under 10MB` (true/false)

### 32. Density and Detail
```
Output is information-dense (no filler)
No section is repetitive with another
Every sentence adds new information
```
**Example:** `Output contains no redundant sections` (true/false)

---

## FORBIDDEN PATTERN ASSERTIONS (10 patterns)

### 33. Forbidden Words/Phrases
```
Output does not contain "TBD"
Output does not contain "TODO"
Output does not contain "[PLACEHOLDER]"
Output does not contain filler phrases like "It's important to note"
```
**Example:** `Output does not contain "TBD" or "TODO"` (true/false)

### 34. Forbidden Punctuation
```
Output does not use em-dashes (—)
Output does not use multiple exclamation marks (!!)
Output does not end with a question mark
Output does not contain contractions (don't, can't)
```
**Example:** `Output does not contain em-dashes (—)` (true/false)

### 35. Forbidden HTML/Markup
```
Output does not contain HTML tags (<p>, <div>, etc.)
Output does not contain LaTeX markup ($$)
Output does not use Unicode symbols (→, ←, ⚡)
Output does not contain XML declarations
```
**Example:** `Output does not contain HTML tags` (true/false)

### 36. Forbidden File Types
```
Output does not reference .exe files
Output does not suggest downloading .zip from untrusted sources
Output does not include API keys or secrets
Output does not reference deprecated versions (Python 2.7)
```
**Example:** `Output does not expose API keys or credentials` (true/false)

### 37. Forbidden Tone/Voice
```
Output does not ask rhetorical questions
Output does not use "Dear user" salutations
Output does not use "As you may know" filler
Output does not apologize or over-hedge
```
**Example:** `Output does not use filler phrases like "As you may know"` (true/false)

### 38. Forbidden External Dependencies
```
Output does not require paid tools (unless specified)
Output does not reference unavailable services
Output does not depend on external APIs without fallback
Output does not assume specific OS (doesn't say "Windows only")
```
**Example:** `Output does not assume Windows-only environment` (true/false)

### 39. Forbidden Assumptions
```
Output does not assume user's technical level
Output does not assume user has prior context
Output does not assume specific software is installed
Output does not assume specific file formats exist
```
**Example:** `Output does not assume prior knowledge of the topic` (true/false)

### 40. Forbidden Contradictions
```
Output does not contradict earlier statements
Output does not recommend incompatible approaches
Output does not list mutually exclusive options as simultaneous
Output reasoning is internally consistent
```
**Example:** `Output is internally consistent (no contradictions)` (true/false)

### 41. Forbidden Length/Density Issues
```
Output does not have walls of text (paragraphs over 150 words)
Output does not bury important info in middle of section
Output does not repeat examples unnecessarily
Output does not include lorem ipsum or dummy content
```
**Example:** `Output does not contain paragraphs exceeding 150 words` (true/false)

### 42. Forbidden Attribution Errors
```
Output does not misattribute quotes
Output does not cite sources that don't exist
Output does not use "research shows" without reference
Output does not make claims presented as fact without sources
```
**Example:** `All citations reference valid sources` (true/false)

---

## FORMAT AND OUTPUT TYPE ASSERTIONS (10 patterns)

### 43. Output Format Type
```
Output is valid markdown (not HTML or plain text)
Output is valid JSON (parseable by JSON parser)
Output is valid YAML (proper indentation and syntax)
Output is valid CSV (proper comma/newline structure)
```
**Example:** `Output is valid JSON` (true/false)

### 44. File Output Naming
```
File is named according to spec: {prefix}_{suffix}.md
Filename includes date in YYYY-MM-DD format
Filename uses kebab-case (not snake_case or camelCase)
File extension matches content type
```
**Example:** `Filename uses kebab-case and includes date` (true/false)

### 45. Encoding and Character Set
```
Output uses UTF-8 encoding
Output does not contain BOM (byte order mark)
Output uses only ASCII for code examples
Output preserves Unicode in text content
```
**Example:** `Output uses UTF-8 encoding` (true/false)

### 46. Newline and Whitespace Standards
```
Output uses LF (not CRLF) line endings
Lines do not have trailing whitespace
Indentation uses spaces (not tabs)
Indentation is consistent (2 or 4 spaces)
```
**Example:** `Output uses consistent 2-space indentation` (true/false)

### 47. Output Destination
```
File is written to correct directory
File is placed in expected location (e.g., /outputs)
File permissions are readable (not encrypted)
File is not saved inside excluded directories
```
**Example:** `File is saved to /outputs directory` (true/false)

### 48. Directory Structure
```
Subdirectories are created if needed
Directory names use kebab-case
No files are created outside specified path
Directory hierarchy matches expected structure
```
**Example:** `Directory structure is created correctly` (true/false)

### 49. Multiple Output Handling
```
If multiple outputs, each file is named uniquely
Batch files are numbered sequentially (001, 002, etc.)
No filename collisions occur
All files are placed in same parent directory
```
**Example:** `Multiple outputs are numbered sequentially` (true/false)

### 50. Metadata in Output
```
Output includes frontmatter (YAML or markdown comments)
Frontmatter contains required fields (title, date, author)
Output includes generation timestamp
Output includes version number or revision
```
**Example:** `Output includes YAML frontmatter with title and date` (true/false)

### 51. API Response Format
```
Response includes status code or success indicator
Response includes error message if applicable
Response includes pagination info if data is large
Response is consistent with documented schema
```
**Example:** `Response includes status field` (true/false)

### 52. Compression and Size Optimization
```
Output is not unnecessarily bloated
Repetitive content is consolidated
Examples are concise (not verbose)
Boilerplate is minimized
```
**Example:** `Output does not contain redundant examples` (true/false)

---

## SKILL-SPECIFIC ASSERTIONS (8 patterns)

### 53. Purpose Fulfillment
```
Output achieves the stated goal of the skill
Output solves the problem presented in the prompt
Output delivers the specific deliverable requested
Output is actionable (not just informational)
```
**Example:** `Output achieves the stated goal` (true/false)

### 54. Accuracy Within Domain
```
Output is accurate for the stated domain/context
Output uses correct terminology (no mixed terminology)
Output reflects current best practices
Output is not outdated or deprecated
```
**Example:** `Output uses correct terminology for the domain` (true/false)

### 55. Completeness vs. Brevity Balance
```
Output is complete enough to be useful
Output is concise enough to not overwhelm
Output prioritizes essential information
Output includes only relevant details
```
**Example:** `Output is complete without being overwhelming` (true/false)

### 56. User Intent Alignment
```
Output directly addresses user's request
Output doesn't over-deliver on unasked questions
Output doesn't under-deliver on explicit requests
Output tone matches requested formality level
```
**Example:** `Output directly addresses the user's request` (true/false)

### 57. Reusability and Extensibility
```
Output is reusable for similar tasks
Output provides templates or patterns
Output can be adapted to different contexts
Output includes customization options
```
**Example:** `Output provides reusable patterns` (true/false)

### 58. Integration with Related Skills
```
Output references or links to related skills
Output is compatible with downstream skills
Output format matches expected input for next step
Output includes hooks for further automation
```
**Example:** `Output references related skills where applicable` (true/false)

### 59. Error Handling and Edge Cases
```
Output addresses potential failure modes
Output includes fallback or alternative approaches
Output acknowledges limitations or constraints
Output suggests what to do if X fails
```
**Example:** `Output acknowledges limitations or constraints` (true/false)

### 60. Documentation and Explanation
```
Output is self-explanatory (minimal external knowledge needed)
Output includes enough detail to understand "why" not just "what"
Output teaches the principle, not just the answer
Output is suitable for someone learning the topic
```
**Example:** `Output explains the reasoning, not just the answer` (true/false)

---

## QUICK REFERENCE LOOKUP

| Category | Pattern Count | Use When |
|----------|---|---|
| Structural | 10 | Skill outputs markdown, tables, lists, code blocks |
| Content Requirements | 12 | Skill must include specific sections, examples, citations |
| Length/Constraints | 10 | Skill has word limits, section counts, density rules |
| Forbidden Patterns | 10 | Skill prohibits certain words, tones, punctuation, dependencies |
| Format/Output Type | 10 | Skill generates files, JSON, structured data, or specific formats |
| Skill-Specific | 8 | Skill achieves unique purpose, has custom rules |

---

## ASSERTION GENERATION WORKFLOW

1. **Scan SKILL.md** for rules marked with: "always", "never", "must", "should", "required", "forbidden"
2. **Match rules to patterns above** — most rules fit one of these 60 templates
3. **Instantiate template** with skill-specific details
4. **Validate** — is it binary? testable? derived from actual rule?
5. **Add to assertions array** in evals.json

---

## EXAMPLE: Applying Patterns to a Real Skill

**Skill Rule:** "Output must be under 300 words, include at least 3 examples, use H2 headings for each section, and never use exclamation marks."

**Matching Patterns:**
- Pattern #23 (Word Count): `Output is under 300 words`
- Pattern #28 (Example Count): `Output includes at least 3 examples`
- Pattern #1 (Heading Structure): `Output uses H2 headings for all sections`
- Pattern #34 (Forbidden Punctuation): `Output does not contain exclamation marks`

**Result:** 4 assertions derived from 4 pattern templates, all directly traceable to SKILL.md rules.
