---
name: promote-to-obsidian
description: |
  Converts raw NotebookLM synthesis text into a formatted, validated Obsidian vault entry using a 3-gate pipeline (conflict check → operator voice rewrite → entity linking). Use this skill when you have a NotebookLM synthesis ready to add to your permanent knowledge base. Gates validate against BRAIN.md and learnings.md, rewrite in operator voice (30-50% shorter), suggest related vault entity links, and write the promoted note with complete YAML frontmatter to Obsidian-Vault/wiki/concepts/.

  Trigger on: "promote this synthesis", "vault this", "add to obsidian", "save this to my knowledge base", "promote to obsidian", "add this NotebookLM output to vault", "save this synthesis", "write this to obsidian", "push to obsidian", "save to wiki", "promote", or whenever you paste raw NotebookLM text and want it stored permanently. Also triggers on: "conflict check this synthesis", "rewrite in operator voice", "link this to vault entities".
---

## What This Skill Does

Takes raw NotebookLM synthesis text and promotes it to your Obsidian vault using a 3-gate pipeline:

**Gate 1: Conflict Check** — Searches BRAIN.md + learnings.md for contradictions. Lists conflicts; does not block promotion. HIGH/MEDIUM/LOW severity flagged in frontmatter.

**Gate 2: Voice Rewrite** — Rewrites synthesis in operator voice (direct, action-biased, systems-thinking). Reduces length by 30-50%. Adds POM AI Implication section.

**Gate 3: Entity Linking** — Searches vault for related concepts and suggests 1-3 entity links. Auto-applied.

## How to Use

Paste the raw NotebookLM synthesis text. The skill will:
1. Run it through all 3 gates
2. Produce a rewritten version in operator voice
3. Suggest related vault entities
4. Write to Obsidian-Vault/wiki/concepts/
5. Update session-index.md with a new entry
6. Return file path + gate summary

## Gate Details

**Gate 1:** Searches BRAIN.md and learnings.md for contradictions. Non-blocking — ALL conflicts warn but never stop promotion. HIGH severity logged to active-plans.md.

**Gate 2:** Rewrites in operator voice. 30-50% reduction. Action-biased. Preserves core insight. Adds POM AI Implication section.

**Gate 3:** Searches vault for related concepts (filenames, frontmatter tags). Suggests 1-3 matches. Adds related-notes links to frontmatter automatically.

## Output

- File: Obsidian-Vault/wiki/concepts/<promoted-name>.md with full YAML frontmatter (14 fields)
- Updates: Obsidian-Vault/wiki/meta/session-index.md
- Creates: PROMOTION_REPORT.md (gate log for audit trail)
- May log: Conflicts to active-plans.md if Gate 1 finds HIGH severity

## Edge Cases

- Conflicts found: Listed, not blocking. Logged in frontmatter.
- Entity linking fails: Warns, does not block.
- File exists: Auto-versions with timestamp (filename_20260414-1523.md).
- Missing BRAIN.md/learnings.md: Gate 1 skips with warning.

## ROI

Time saved: ~7 min per promotion (manual = 8 min, skill = 67 sec). At 3-5 promotions/week = 1.5-2.5 hours/month recovered.
