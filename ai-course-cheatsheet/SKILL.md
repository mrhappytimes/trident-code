---
name: ai-course-cheatsheet
description: Generate a 3-page printable HTML cheat sheet from any AI/ML course content. Produces a self-contained HTML file with core concepts, practical techniques, and a visual SVG flow diagram.
---

# AI Course Cheat Sheet Generator

When the user provides course content, lecture notes, or a course description, generate a comprehensive 3-page cheat sheet as a single self-contained HTML file.

## Output Format

Output a single, self-contained HTML file. All CSS must be inline (inside `<style>` tags). All graphics must be inline SVG. No external dependencies, no local file imports, no CDN links.

## Required 3-Page Structure

### Page 1: Core Framework & Key Concepts
- Identify the primary framework, model, or methodology from the course
- Define all key terms and concepts with concise explanations
- Use structured definitions (term: definition format)
- Organize concepts into logical groups

### Page 2: Practical Application & Techniques
- List practical techniques, methods, and implementation steps
- Include actionable guidance using words like "technique", "method", "apply", "practice", "implement", or "use"
- Provide a competency summary or skills checklist
- Cover all major topics mentioned in the course content

### Page 3: Visual Flow Diagram (SVG)
- Create an inline SVG diagram that connects all major concepts visually
- The SVG MUST use `<rect>` elements for concept boxes, `<path>` or `<line>` elements for arrows/connections, and `<text>` elements for labels
- Include `<circle>` elements for key decision points or highlights
- The SVG must contain multiple `<rect>`, `<path>`, `<circle>`, and `<text>` elements — not just one or two
- Make the diagram comprehensive: every major concept from the course should appear as a labeled node
- Use `viewBox` attribute on the SVG for responsive sizing

## Content Rules

- Cover ALL topics mentioned in the course input. Do not skip any.
- Even if the course input is minimal, elaborate and structure it into a full 3-page cheat sheet. Expand brief topics with definitions, examples, and relationships.
- Use proper heading tags (h1, h2, h3) to organize content. Use at least 3 heading tags per page.
- **Minimum line counts are MANDATORY**:
  - Short/minimal course input: output MUST be at least 300 lines of HTML.
  - Standard course input: output MUST be at least 500 lines of HTML.
  - Comprehensive course input: output SHOULD be 600-800+ lines of HTML.
- Never use placeholder text. No "TODO", "INSERT", "TBD", "PLACEHOLDER", or "[...]" markers.

## HTML Structure Template

Follow this exact skeleton structure for every output:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Course Name] - Cheat Sheet</title>
  <style>
    /* All CSS here — no external stylesheets */
    @media print { .page { page-break-after: always; } }
    .page { page-break-after: always; min-height: 100vh; }
  </style>
</head>
<body>
  <div class="page" id="page-1">
    <!-- Page 1: Core Framework & Key Concepts -->
  </div>
  <div class="page" id="page-2">
    <!-- Page 2: Practical Application & Techniques -->
  </div>
  <div class="page" id="page-3">
    <!-- Page 3: Visual Flow Diagram -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <!-- Use <rect>, <circle>, <path>, <text>, <line> elements -->
    </svg>
  </div>
</body>
</html>
```

## HTML/CSS Requirements

- Start with `<!DOCTYPE html>` and proper `<html>` opening and closing tags
- Use 3 `<div class="page">` elements with `page-break-after: always` CSS to separate pages
- Use inline `<style>` blocks for all styling — no external stylesheets, no local file imports
- Use a clean, readable design suitable for printing
- Style attributes on individual elements are allowed in addition to `<style>` blocks
