---
stage: implement
bolt: bolt-pack-apply-engine-1
created: 2026-01-26T00:50:00Z
---

## Implementation Walkthrough: pack-apply-engine

### Summary
Implemented a local apply engine for managed sections that supports dry-run/apply modes, deterministic ordering, and change summaries driven by selected components.

### Structure Overview
- `src/apply` hosts managed section parsing and apply execution with change tracking.
- `src/pack` provides a source loader that maps components to existing repository files.
- The Action entrypoint invokes the apply engine and reports change summaries.

### Completed Work
- [x] `src/apply/types.ts` - Defines apply modes, pack file shapes, change tracking, and summary types.
- [x] `src/apply/managed-sections.ts` - Handles managed marker rendering and controlled in-place updates.
- [x] `src/apply/engine.ts` - Applies managed updates, writes files in apply mode, and returns deterministic change summaries.
- [x] `src/pack/source.ts` - Loads pack source files per component mapping with warnings for missing paths.
- [x] `src/index.ts` - Executes the apply engine after selection and outputs change summaries.
- [x] `dist/index.js` - Synced Action entrypoint to include apply engine execution.

### Key Decisions
- **Managed markers only**: Existing files without markers are skipped to avoid overwriting custom content.
- **Deterministic ordering**: Inputs and writes are sorted to keep diffs stable.
- **Local pack source**: Components map to repository files as a stand-in for future remote pack sources.

### Deviations from Plan
- Apply operations target the local workspace only; GitHub API branch/PR writes are deferred.

### Dependencies Added
- [x] None for apply engine (built on Node fs + path).

### Developer Notes
- Apply engine assumes managed markers are present for updates; missing markers yield skipped changes with warnings.
- Future work should integrate pack templates from a versioned source rather than the current repo tree.
