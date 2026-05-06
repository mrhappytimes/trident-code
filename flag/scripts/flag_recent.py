#!/usr/bin/env python3
"""
flag_recent.py — list recent flags grouped by topic_slug.

Usage:
  python flag_recent.py --window 7d                # default
  python flag_recent.py --window 30d --format digest
  python flag_recent.py --root /path/to/repo
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone, timedelta
from pathlib import Path


def parse_window(s: str) -> timedelta:
    if s.endswith("d"):
        return timedelta(days=int(s[:-1]))
    if s.endswith("h"):
        return timedelta(hours=int(s[:-1]))
    return timedelta(days=int(s))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--window", default="7d")
    ap.add_argument("--root", default=".")
    ap.add_argument("--format", default="list", choices=["list", "digest", "json"])
    args = ap.parse_args()

    root = Path(args.root).resolve()
    metrics_path = root / ".planning" / "FLAG-METRICS.json"
    if not metrics_path.exists():
        print("No flags yet — .planning/FLAG-METRICS.json not present.")
        return 0

    data = json.loads(metrics_path.read_text(encoding="utf-8"))
    flags = data.get("flags", [])

    cutoff = datetime.now(timezone.utc) - parse_window(args.window)
    recent = [
        f for f in flags
        if datetime.fromisoformat(f["ts"]) > cutoff
    ]

    if args.format == "json":
        print(json.dumps(recent, indent=2))
        return 0

    by_slug = defaultdict(list)
    for f in recent:
        by_slug[f["topic_slug"]].append(f)

    by_cat = Counter(f["category"] for f in recent)
    by_sev = Counter(f["severity"] for f in recent)

    if args.format == "digest":
        # Slack-postable digest
        print(f"🚩 Flag digest · last {args.window}")
        print(f"Total flags: {len(recent)}")
        print(f"By category: {' '.join(f'{k}({v})' for k, v in by_cat.most_common())}")
        print(f"By severity: {' '.join(f'{k}({v})' for k, v in by_sev.most_common())}")
        print()
        print("Top patterns:")
        for slug, items in sorted(by_slug.items(), key=lambda kv: -len(kv[1]))[:5]:
            warn = "  ⚠️ panel triggered" if len(items) >= 3 else ""
            print(f"  {slug}: {len(items)} flags{warn}")
        return 0

    # default list format
    print(f"Recent flags · last {args.window}")
    print("━" * 50)
    for f in sorted(recent, key=lambda x: x["ts"], reverse=True):
        print(
            f"{f['ts'][:10]} · {f['topic_slug']:30s} · "
            f"{f['severity']} · {f['category']} · {f['kb_verdict']}"
        )
    print()
    print("Top clusters:")
    for slug, items in sorted(by_slug.items(), key=lambda kv: -len(kv[1]))[:5]:
        warn = "  ⚠️  panel triggered" if len(items) >= 3 else ""
        print(f"  {slug}: {len(items)} flags{warn}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
