---
stage: plan
bolt: bolt-pack-apply-engine-1
created: 2026-01-26T00:35:00Z
---

## Implementation Plan: pack-apply-engine

### Objective
Implement the pack apply engine with dry-run/apply modes, managed section updates, and idempotent reapply behavior for deterministic diffs.

### Deliverables
- Core apply engine that computes file changes, supports dry-run vs apply, and reports no-change runs.
- Managed section updater that only replaces managed blocks and skips files without markers in refresh mode.
- Deterministic ordering and hashing strategy to avoid churn and enable idempotent reapply.
- Unit tests covering dry-run/apply, managed section behavior, and idempotence.

### Dependencies
- Config + manifest from 002-config-and-packaging: inputs, component selection, and permissions defaults.
- GitHub API client utilities (to be added in this bolt or referenced from existing modules as needed).

### Technical Approach
- Define a pack file manifest that includes target paths, managed markers, and rendered content for each component.
- Implement a managed block parser/replacer with strict marker validation and stable serialization.
- Build an apply pipeline that produces a change set (added/updated/skipped) and a summary; in apply mode, write to a branch; in dry-run, only report.
- Use deterministic ordering for file writes and diffs; consider checksum per managed block to short-circuit writes.

### Acceptance Criteria
- [ ] Dry-run emits a change summary without writing files.
- [ ] Apply updates only managed sections, skipping files without markers in refresh mode.
- [ ] Re-run with no changes yields zero diffs and a clear “no changes” report.
- [ ] Ordering is stable and avoids volatile timestamps.
