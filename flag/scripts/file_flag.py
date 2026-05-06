#!/usr/bin/env python3
"""
file_flag.py — flag dossier helper.

Run from the /flag skill body to:
  1. Append to .planning/FLAG-METRICS.json (count flags per topic_slug, sliding 7-day window)
  2. Detect 3+ flags / 7d on same topic_slug → return panel_trigger=True
  3. Post to Slack via SLACK_WEBHOOK_URL env var (if set)
  4. Append to .planning/SOP-PROPOSALS.md
  5. Append eval set entry to .planning/cortex-evals/retrieval-set.jsonl

Usage:
  python file_flag.py \
      --topic-slug cortex-2.0-roadmap \
      --category R \
      --kb-verdict had-it \
      --dossier .claude/flags/2026-05-06-1830-roadmap-format.md \
      --severity P1 \
      --eval-prompt "build me a phased roadmap for cortex 2.0" \
      --eval-chunk .planning/CORTEX-2.0-SUPER-BRAIN-ROADMAP.md
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path


def load_metrics(path: Path) -> dict:
    if not path.exists():
        return {"flags": []}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"flags": []}


def save_metrics(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2), encoding="utf-8")


def count_recent(metrics: dict, topic_slug: str, days: int = 7) -> int:
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    return sum(
        1
        for f in metrics.get("flags", [])
        if f.get("topic_slug") == topic_slug
        and datetime.fromisoformat(f["ts"]) > cutoff
    )


def append_sop_proposal(path: Path, slug: str, proposal: str, dossier: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc).isoformat(timespec="seconds")
    block = (
        f"\n## {ts} · {slug} · from /flag\n\n"
        f"**Proposal:** {proposal}\n\n"
        f"**Source dossier:** {dossier}\n\n"
        f"**Operator action:** APPROVE / REJECT / DEFER\n"
    )
    with path.open("a", encoding="utf-8") as fh:
        fh.write(block)


def append_eval_entry(path: Path, prompt: str, expected_chunks: list[str], flag_id: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    entry = {
        "prompt": prompt,
        "expected_chunks": expected_chunks,
        "rationale": f"added by /flag {flag_id}",
        "added_by": "flag",
        "flag_id": flag_id,
        "added_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }
    with path.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry) + "\n")


def post_to_slack(payload: dict) -> bool:
    url = os.environ.get("SLACK_WEBHOOK_URL")
    if not url:
        return False
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        urllib.request.urlopen(req, timeout=4)
        return True
    except Exception:
        return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--topic-slug", required=True)
    ap.add_argument("--category", required=True, help="K|R|F|S|C|H|T|V (primary)")
    ap.add_argument("--kb-verdict", required=True, choices=["had-it", "didnt-have-it", "partial"])
    ap.add_argument("--dossier", required=True, help="path to dossier file")
    ap.add_argument("--severity", default="P1", choices=["P0", "P1", "P2"])
    ap.add_argument("--eval-prompt", required=True)
    ap.add_argument("--eval-chunk", action="append", default=[], help="repeatable")
    ap.add_argument("--sop-proposal", default="", help="one-line proposed SOP delta")
    ap.add_argument("--root", default=".", help="repo root (default cwd)")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    metrics_path = root / ".planning" / "FLAG-METRICS.json"
    sop_path = root / ".planning" / "SOP-PROPOSALS.md"
    eval_path = root / ".planning" / "cortex-evals" / "retrieval-set.jsonl"

    flag_id = Path(args.dossier).stem  # YYYY-MM-DD-HHMM-slug

    # 1. Increment metrics
    metrics = load_metrics(metrics_path)
    metrics.setdefault("flags", []).append(
        {
            "ts": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "topic_slug": args.topic_slug,
            "category": args.category,
            "kb_verdict": args.kb_verdict,
            "severity": args.severity,
            "dossier": args.dossier,
            "flag_id": flag_id,
        }
    )
    save_metrics(metrics_path, metrics)
    recent_count = count_recent(metrics, args.topic_slug, days=7)
    panel_trigger = recent_count >= 3

    # 2. Append SOP proposal
    if args.sop_proposal:
        append_sop_proposal(sop_path, args.topic_slug, args.sop_proposal, args.dossier)

    # 3. Append eval set entry
    if args.eval_chunk:
        append_eval_entry(eval_path, args.eval_prompt, args.eval_chunk, flag_id)

    # 4. Slack post
    slack_text = (
        f"🚩 *FLAG* · `{args.category}` · `{args.topic_slug}` · {args.severity}\n"
        f">*KB:* {args.kb_verdict}\n"
        f">*Dossier:* `{args.dossier}`\n"
        f">*Recent flags this topic (7d):* {recent_count}"
        f"{'  ⚠️ *PANEL AUTO-TRIGGERED*' if panel_trigger else ''}"
    )
    slack_ok = post_to_slack({"text": slack_text})

    # 4b. Append to CYCLE-LOG.md (project-level audit trail)
    cycle_log = root / ".planning" / "CYCLE-LOG.md"
    if cycle_log.exists():
        ts = datetime.now(timezone.utc).isoformat(timespec="seconds")
        line = (
            f"\n## {ts[:10]} · 🚩 FLAG · {args.topic_slug}\n\n"
            f"- **Category:** {args.category} · **KB:** {args.kb_verdict} · **Severity:** {args.severity}\n"
            f"- **Dossier:** `{args.dossier}`\n"
            f"- **Recent (7d):** {recent_count}{'  ⚠️ panel triggered' if panel_trigger else ''}\n"
        )
        with cycle_log.open("a", encoding="utf-8") as fh:
            fh.write(line)

    # 5. Report
    result = {
        "flag_id": flag_id,
        "recent_count_7d": recent_count,
        "panel_trigger": panel_trigger,
        "slack_posted": slack_ok,
        "metrics_path": str(metrics_path),
        "sop_path": str(sop_path) if args.sop_proposal else None,
        "eval_path": str(eval_path) if args.eval_chunk else None,
    }
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
