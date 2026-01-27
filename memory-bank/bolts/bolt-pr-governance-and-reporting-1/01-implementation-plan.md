---
stage: 1-plan
status: complete
created: 2026-01-26T17:30:00Z
completed: 2026-01-26T17:35:00Z
artifacts_produced:
  - 01-implementation-plan.md
---

# bolt-pr-governance-and-reporting-1 — Stage 1: Implementation Plan

## Overview

This bolt implements PR governance and reporting for the agentops pack applier. It focuses on:
1. **PR body summaries** with pack metadata, changed files, and checklists
2. **Churn control** — avoiding duplicate/spam updates via existing PR reuse and no-op detection
3. **Stable outputs** — removing volatile fields (timestamps) and enforcing deterministic ordering

This bolt depends on **bolt-pack-apply-engine-1** (now complete) which provides:
- Apply results with file lists and change summaries
- Managed section markers for controlled updates
- File write tracking (added, updated, unchanged, skipped)

---

## Stage 1: Plan — Deliverables

### 1.1 PR Summary Module (`src/pr/summary.ts`)

**Purpose**: Build PR body markdown from apply results and pack metadata.

**Inputs**:
- `ApplyResult` from apply engine (files, changes, summary)
- Pack version, components, and metadata
- GitHub context (repo, workflow run)

**Outputs**:
- PR body markdown with:
  - Pack version and timestamp
  - Summary line (X files changed, Y warnings)
  - File listing (files added/updated/skipped)
  - Warnings and notes section
  - Review checklist (lint, schema, manual spots)

**Key Design**:
- **Deterministic**: No volatile run timestamps in body; use pack version + file count for identity
- **Readable**: Collapsible sections for large diffs; concise for review
- **Linkable**: Include references to workflow run and logs

**Functions**:
- `buildPrBody(results: ApplyResult, packMeta: PackMetadata, ghContext: GHContext): string`
- `formatFileList(files: FileChange[]): string` — stable sorted list
- `renderChecklist(components: string[]): string` — standard review steps

### 1.2 PR Update Module (`src/pr/update.ts`)

**Purpose**: Create/update GitHub PRs with churn controls.

**Inputs**:
- GitHub token and repo context
- PR body (from summary module)
- PR branch name (deterministic, e.g., `agentops/pack-{pack-version}`)
- Diff content (files changed)

**Outputs**:
- Created or updated PR number
- Change summary (created new / updated existing / no changes)
- Status (success / already-merged / rate-limited / error)

**Key Design**:
- **Reuse**: Check for existing open PR on branch; update if present
- **No-op detection**: Compare body + branch diff; skip if identical
- **Rate-limit safe**: Batch operations; implement backoff on 429 errors

**Functions**:
- `upsertPr(token: string, repo: RepoContext, prOptions: PrOptions): Promise<PrResult>`
- `findExistingPr(token: string, repo: RepoContext, branchName: string): Promise<PullRequest | null>`
- `updatePrBody(token: string, repo: RepoContext, prNumber: number, body: string): Promise<void>`
- `detectChurn(oldBody: string, newBody: string): boolean` — true if identical

### 1.3 Stability Guards Module (`src/pr/stability.ts`)

**Purpose**: Enforce stable outputs to avoid false churn.

**Key Mechanisms**:
- **Ordered output**: Sort file lists, component names, and keys before serialization
- **Timestamp removal**: Strip volatile run times; use pack version + hash instead
- **Whitespace normalization**: Standardize line endings (LF) and indentation
- **Metadata control**: Keep metadata blocks in separate sections; minimize updates

**Functions**:
- `sortFileList(files: FileChange[]): FileChange[]`
- `normalizeLineEndings(content: string): string`
- `stripTimestamps(body: string): string` — remove run timestamps, keep version
- `deterministicHash(content: string): string` — stable content fingerprint

### 1.4 Integration (`src/index.ts` update)

**Changes to main action**:
1. After `applyPackFiles()` completes, invoke PR governance:
   ```typescript
   const prSummary = buildPrBody(applyResult, packMetadata, ghContext);
   const prResult = await upsertPr(token, repo, {
     body: prSummary,
     branch: `agentops/pack-${packMetadata.version}`,
     diffs: applyResult.files,
   });
   ```
2. Output PR number and status to GitHub Actions
3. Emit change summary with PR info

---

## Stage 2: Implementation — Tasks

1. **Create PR summary module** with body builder, file list formatter, checklist renderer
2. **Create PR update module** with upsert logic, existing PR finder, body update function, churn detector
3. **Create stability module** with sorting, normalization, timestamp stripping
4. **Integrate** PR governance into action entrypoint (`src/index.ts`)
5. **Update tests** to cover:
   - PR body generation (format, content, stability)
   - Upsert logic (create new, update existing, no-op detection)
   - Churn guards (stable body, identical re-run shows no changes)
   - Integration (action runs PR update after apply)

---

## Stage 3: Testing — Acceptance Criteria

### 001-pr-body-summary-and-checklist
- ✅ PR body includes pack version, files changed, warnings
- ✅ Review checklist covers lint, schema checks, manual spots
- ✅ Body updates on reapply without duplication

### 002-update-existing-pr-and-churn-control
- ✅ Existing PR updated instead of creating duplicates
- ✅ No-op re-run shows no new commits/diffs
- ✅ API calls are batched with backoff

### 003-no-timestamps-and-stable-ordering
- ✅ Reapply with no logical changes → no diff changes
- ✅ File list and metadata sorted deterministically
- ✅ Line endings and whitespace normalized

---

## Dependencies & Assumptions

**Requires**:
- bolt-pack-apply-engine-1 (completed) ✅
- GitHub API access (PR creation/update)
- @actions/core for context (repo, token, etc.)

**Assumptions**:
- Pack version is stable and unique per release
- File paths are relative to repo root
- GitHub token has PR write permissions

---

## Risk & Mitigation

| Risk | Mitigation |
|------|-----------|
| Rate limits on frequent runs | Batch operations; implement exponential backoff; check headers |
| PR body drift on concurrent runs | Use deterministic sorting + content hash; detect no-op |
| Closed/merged PR handling | Check PR state; open new PR if needed with note |
| Timestamp creep in outputs | Strip all run times; pin version + hash only |

---

## Success Metrics

- [ ] All 3 stories' acceptance criteria met
- [ ] PR body is deterministic (identical on re-run without logic changes)
- [ ] Existing PRs reused (no spam)
- [ ] Rate-limit safe (backoff applied on 429)
- [ ] Code coverage > 80%

---

## Next Steps

**Stage 2 (Implement)**: Create the 3 modules (summary, update, stability) and integrate into action.
**Stage 3 (Test)**: Unit tests for each module + integration tests for full PR workflow.
**Completion**: Run bolt-complete.cjs to mark all 3 stories complete.
