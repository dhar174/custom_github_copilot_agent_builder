---
id: 001-pr-body-summary-and-checklist
unit: 003-pr-governance-and-reporting
intent: 001-agentops-pack-applier
status: complete
priority: must
created: 2026-01-26T00:00:00Z
assigned_bolt: bolt-pr-governance-and-reporting-1
implemented: true
---

# Story: 001-pr-body-summary-and-checklist

## User Story

**As a** repo maintainer
**I want** PRs with clear summaries and review checklists
**So that** I can review and approve pack changes quickly and safely.

## Acceptance Criteria

- [ ] **Given** a pack apply run, **When** a PR is created/updated, **Then** the PR body lists pack version, files touched, and warnings/notes.
- [ ] **Given** reviewers open the PR, **When** they read the body, **Then** they see a checklist covering validations (lint, schema checks) and manual review spots.
- [ ] **Given** the pack is reapplied, **When** the PR already exists, **Then** the body is updated (not duplicated) with current info.

## Technical Notes
- Keep PR body stable and deterministic; include links to logs.

## Dependencies

### Requires
- Outputs from pack-apply-engine
- Metadata from config-and-packaging

### Enables
- 002-update-existing-pr-and-churn-control

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| PR already closed | Open a new PR or signal to reopen with clear message |
| Large file list | Collapse/limit with summary + link |
| Missing pack version | Mark as unknown and warn |

## Out of Scope
- Core apply logic