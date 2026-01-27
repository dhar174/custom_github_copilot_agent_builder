---
stage: implement
bolt: bolt-pr-governance-and-reporting-1
created: 2026-01-27T02:00:00Z
---

## Implementation Walkthrough: pr-governance-and-reporting

### Summary

Implemented the PR governance layer consisting of PR body generation, lifecycle management, and stability utilities. This allows the AgentOps Pack Applier to open and maintain high-quality pull requests with deterministic content, fulfilling FR-10 (Pull Request Creation) and NFR-3 (PR Quality).

### Structure Overview

- `src/pr/` - Dedicated directory for all PR-related logic.
- `src/pr/summary.ts` - Builds the PR markdown body including summaries, file lists (sorted), checklists, and governance notes.
- `src/pr/update.ts` - Handles the interaction with the GitHub API (Octokit) and Git commands to push branches and create/update PRs safely.
- `src/pr/stability.ts` - Provides utilities `deterministicSort` and `stabilizeContent` to ensure idempotence and stable diffs.
- `src/pr/types.ts` - Defines shared interfaces for PR operations.

### Completed Work

- [x] `src/pr/types.ts` - Defined `PrOptions`, `PrResult`, `PrContext` interfaces.
- [x] `src/pr/stability.ts` - Implemented `deterministicSort` and `stabilizeContent` to strip volatile fields like run IDs.
- [x] `src/pr/summary.ts` - Implemented `buildPrBody` with support for signals, questions, sorted file lists, warnings, and the mandatory review checklist.
- [x] `src/pr/update.ts` - Implemented `upsertPr` to handle branch pushing (with force option) and smart PR creation/updating (only if body changed).

### Key Decisions

- **Stable Sorting**: `src/pr/summary.ts` strictly sorts the file list before rendering to markdown. This ensures that even if the underlying engine returns files in a different order, the PR body remains stable (NFR-2).
- **PrUpdateConfig Interface**: Extended `PrOptions` to `PrUpdateConfig` to include `forcePush` control, defaulting to `true` for branch resets (standard for bot branches) but configurable.
- **Smart Update**: `upsertPr` checks `existingPr.body !== options.body` before calling the API to avoid unnecessary API calls and reducing "updated" notifications (Story 002).
