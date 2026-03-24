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
- Use boxes, arrows, paths, and labels to show relationships
- The SVG must contain at least one `<path>`, `<rect>`, or `<circle>` element
- Make the diagram comprehensive enough to serve as a visual summary of the entire course

## Content Rules

- Cover ALL topics mentioned in the course input. Do not skip any.
- Even if the course input is minimal, elaborate and structure it into a full 3-page cheat sheet.
- Use proper heading tags (h1, h2, h3) to organize content.
- The output HTML must be over 200 lines minimum. For substantial courses, aim for 500+ lines.
- Never use placeholder text. No "TODO", "INSERT", "TBD", "PLACEHOLDER", or "[...]" markers.

## HTML/CSS Requirements

- Start with `<!DOCTYPE html>` and proper `<html>` tags
- Use CSS page-break rules to separate the 3 pages for printing
- Use inline `<style>` blocks for all styling
- Use a clean, readable design suitable for printing
- Each page should be clearly separated with page-break-after or equivalent CSS
