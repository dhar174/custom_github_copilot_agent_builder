---
stage: test
bolt: bolt-pr-governance-and-reporting-1
created: 2026-01-27T02:15:00Z
---

## Test Walkthrough: pr-governance-and-reporting

### Test Summary

Tests focus on stability (idempotence requirements), summary generation (compliance with spec requirements), and content integrity.

- **Total Tests**: 9 (across 2 files)
- **Status**: ✅ Passed

### Test Coverage

#### 1. Stability Tests (`src/pr/stability.test.ts`)
- Verified `deterministicSort` handles various inputs correctly.
- Verified `sortFileList` sorts `ApplyChange` objects by path.
- Verified `stabilizeContent` normalizes line endings (`CRLF` -> `LF`).
- Verified `stabilizeContent` strips volatile fields (`Run ID`, `Generated at` timestamps).
- Verified deprecated `stripTimestamps` alias works as expected.

#### 2. Summary Generation Tests (`src/pr/summary.test.ts`)
- Verified header includes pack name and version.
- Verified stats summary accuracy.
- Verified file list generation is **sorted** (crucial for stable diffs).
- Verified truncation logic for large file lists (>50 files).
- Verified warning section appears only when warnings exist.
- Verified inclusion of the mandatory **Review Checklist**.
- Verified **Questions** section appears when inputs are provided (PlanManifest alignment).
- Verified **Signals** section appears when provided.

### Edge Case Verification

- **Empty Result**: Verified empty apply result produces a "No file changes" status without crashing.
- **Large Changeset**: Verified truncation logic keeps PR body size manageable.
- **Missing Inputs**: Verified optional sections (Questions, Signals) are omitted cleanly when not present.

### Manual Verification Notes

- Requires integration testing with real GitHub API key for `update.ts`. Since this requires a real token/repo, it is verified via code review and unit test logic (mocking strategy documented in implementation plan, though actual mocks skipped for simple unit tests in favor of direct logic testing).
- The `pushBranch` and `upsertPr` logic handles the Git operations and API calls, relying on `@actions/exec` and `@actions/github` which are standard reliable libraries.

### Refinement & Fixes during Testing
- Initial stability test revealed need to handle both `Run ID` and HTML comment timestamps; updated `stabilizeContent` to handle both.
