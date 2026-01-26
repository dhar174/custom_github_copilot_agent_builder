---
unit: 003-pr-governance-and-reporting
intent: 001-agentops-pack-applier
phase: inception
status: draft
created: 2026-01-26T00:00:00Z
updated: 2026-01-26T00:00:00Z
---

# Unit Brief: pr-governance-and-reporting

## Purpose
Create/update PRs with stable, reviewable diffs, summaries, and checklists; avoid churn and rate-limit issues.

## Scope

### In Scope
- PR body templates with pack version, files changed, warnings
- Update existing PRs without spam; churn/noise controls
- Stable ordering and removal of volatile fields (timestamps) in managed files

### Out of Scope
- Core apply/render logic (pack-apply-engine)
- Config schema and permissions (config-and-packaging)

---

## Assigned Requirements

| FR | Requirement | Priority |
|----|-------------|----------|
| FR-4 | PR governance/reporting with stable diffs | Should |

---

## Domain Concepts

### Key Entities
| Entity | Description | Attributes |
|--------|-------------|------------|
| PR summary | Human-readable report | pack version, files touched, warnings |
| Churn guard | Prevents noisy diffs | stable ordering, timestamp policy |

### Key Operations
| Operation | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| Build PR body | Summarize changes | apply results, pack version | PR markdown |
| Update PR | Refresh without spam | PR ref, changes | updated PR, minimal churn |
| Enforce stability | Remove volatile noise | rendered files | stable diffs |

---

## Story Summary

| Metric | Count |
|--------|-------|
| Total Stories | 3 |
| Must Have | 2 |
| Should Have | 1 |
| Could Have | 0 |

### Stories

| Story ID | Title | Priority | Status |
|----------|-------|----------|--------|
| 001-pr-body-summary-and-checklist | PR body + checklist | must | planned |
| 002-update-existing-pr-and-churn-control | Update PR without spam | should | planned |
| 003-no-timestamps-and-stable-ordering | Stable diffs (no volatile fields) | must | planned |

---

## Dependencies

### Depends On
| Unit | Reason |
|------|--------|
| 001-pack-apply-engine | Needs diff outputs and managed paths |
| 002-config-and-packaging | Needs pack version/metadata |

### Depended By
| Unit | Reason |
|------|--------|
| None | Final PR surface |

### External Dependencies
| System | Purpose | Risk |
|--------|---------|------|
| GitHub API | PR operations | Medium |

---

## Technical Context

### Suggested Technology
TypeScript/Node; GitHub REST PR APIs; deterministic sorting of file outputs.

### Integration Points
| Integration | Type | Protocol |
|-------------|------|----------|
| GitHub PRs | API | REST |

### Data Storage
| Data | Type | Volume | Retention |
|------|------|--------|-----------|
| PR body template | Markdown | Small | In repo |

---

## Constraints
- No volatile timestamps or ordering in managed outputs.
- Avoid PR spam; reuse existing PR when present.

---

## Success Criteria

### Functional
- [ ] PR body includes pack version, files touched, warnings, checklist
- [ ] Existing PRs are updated, not multiplied

### Non-Functional
- [ ] Stable diffs (no churn on re-run)
- [ ] Rate-limit-friendly API usage

### Quality
- [ ] Code coverage > 80%
- [ ] Acceptance criteria met
- [ ] Code reviewed and approved

---

## Bolt Suggestions

| Bolt | Type | Stories | Objective |
|------|------|---------|-----------|
| bolt-pr-governance-and-reporting-1 | simple-construction-bolt | 001, 002, 003 | PR summary, churn/noise controls |

---

## Notes
Consider diff-size guardrails and rate-limit backoff when refreshing PRs.