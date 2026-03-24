#!/usr/bin/env python3
"""Append a result row to the autoresearch results.tsv file.

Usage:
    python log_results.py --results-path results.tsv \
        --iteration 1 \
        --commit abc1234 \
        --metric 87.5 \
        --delta "+2.5" \
        --status keep \
        --description "added explicit word count rule"
"""

import argparse
import os
from datetime import datetime, timezone


HEADERS = "iteration\tcommit\tmetric\tdelta\tstatus\tdescription\ttimestamp\n"

VALID_STATUSES = {"baseline", "keep", "discard", "no_change", "timeout", "error", "perfect"}


def log_result(
    results_path: str,
    iteration: int,
    commit: str,
    metric: float,
    delta: str,
    status: str,
    description: str,
) -> None:
    """Append one result row to the TSV file."""
    if status not in VALID_STATUSES:
        raise ValueError(f"Invalid status '{status}'. Must be one of: {VALID_STATUSES}")

    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")

    # Create file with headers if it doesn't exist
    if not os.path.exists(results_path):
        os.makedirs(os.path.dirname(results_path) or ".", exist_ok=True)
        with open(results_path, "w") as f:
            f.write(HEADERS)

    row = f"{iteration}\t{commit}\t{metric:.1f}\t{delta}\t{status}\t{description}\t{timestamp}\n"

    with open(results_path, "a") as f:
        f.write(row)

    print(f"Logged: iteration={iteration} metric={metric:.1f} delta={delta} status={status}")


def main():
    parser = argparse.ArgumentParser(description="Log autoresearch result to TSV")
    parser.add_argument("--results-path", required=True, help="Path to results.tsv")
    parser.add_argument("--iteration", type=int, required=True, help="Iteration number")
    parser.add_argument("--commit", default="-", help="Git commit hash (short)")
    parser.add_argument("--metric", type=float, required=True, help="Pass rate percentage")
    parser.add_argument("--delta", default="0.0", help="Change from previous iteration")
    parser.add_argument("--status", required=True, choices=sorted(VALID_STATUSES), help="Result status")
    parser.add_argument("--description", required=True, help="What was changed/attempted")
    args = parser.parse_args()

    log_result(
        results_path=args.results_path,
        iteration=args.iteration,
        commit=args.commit,
        metric=args.metric,
        delta=args.delta,
        status=args.status,
        description=args.description,
    )


if __name__ == "__main__":
    main()
