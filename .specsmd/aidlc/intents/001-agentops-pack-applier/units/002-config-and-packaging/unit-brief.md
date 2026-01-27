---
unit: 002-config-and-packaging
intent: 001-agentops-pack-applier
phase: inception
status: complete
created: 2026-01-26T00:00:00.000Z
updated: 2026-01-26T00:00:00.000Z
---

# Unit Brief: config-and-packaging

## Purpose
Provide config schema/defaults, pack subset selection, and reusable action/workflow packaging with least-privilege permissions.

## Scope

### In Scope
- Config inputs/defaults and validation
- Pack subset selection (instructions-only, full pack, etc.)
- Action + composite workflow packaging and documentation
- Permissions/token strategy templates

### Out of Scope
- Apply/managed sections logic (pack-apply-engine)
- PR content/churn controls (pr-governance-and-reporting)

---

## Assigned Requirements

| FR | Requirement | Priority |
|----|-------------|----------|
| FR-3 | Configurable templates and subset selection | Should |
| FR-5 | Action/workflow packaging with documented inputs/outputs | Should |

---

## Domain Concepts

### Key Entities
| Entity | Description | Attributes |
|--------|-------------|------------|
| Config schema | Defines inputs/overrides | fields, defaults, required |
| Pack manifest | Lists components/subsets | components, version |

### Key Operations
| Operation | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| Validate config | Merge defaults and validate requireds | inputs, defaults | merged config or error |
| Select pack subset | Choose components to apply | config, manifest | component list |
| Package action/workflow | Emit action.yml and sample workflow | metadata, permissions | published action + example |

---

## Story Summary

| Metric | Count |
|--------|-------|
| Total Stories | 3 |
| Must Have | 1 |
| Should Have | 2 |
| Could Have | 0 |

### Stories

| Story ID | Title | Priority | Status |
|----------|-------|----------|--------|
| 001-configurable-inputs-and-defaults | Config inputs/defaults | must | planned |
| 002-selective-pack-components | Subset selection | should | planned |
| 003-permissions-and-token-strategy | Permissions/token strategy | should | planned |

---

## Dependencies

### Depends On
| Unit | Reason |
|------|--------|
| None | Foundation unit |

### Depended By
| Unit | Reason |
|------|--------|
| 001-pack-apply-engine | Needs config/manifest and permissions guidance |
| 003-pr-governance-and-reporting | Needs pack version and config metadata |

### External Dependencies
| System | Purpose | Risk |
|--------|---------|------|
| GitHub Actions | Workflow runtime | Low |

---

## Technical Context

### Suggested Technology
TypeScript/Node; action.yml for composite or JS action; pnpm packaging.

### Integration Points
| Integration | Type | Protocol |
|-------------|------|----------|
| GitHub Actions metadata | Action/workflow | YAML |

### Data Storage
| Data | Type | Volume | Retention |
|------|------|--------|-----------|
| Config defaults/manifest | YAML/JSON | Small | Versioned in repo |

---

## Constraints
- Permissions blocks must default to least-privilege.
- Prefer GITHUB_TOKEN; optional PAT/App only when required.

---

## Success Criteria

### Functional
- [ ] Config validation with helpful errors
- [ ] Subset selection works and skips non-selected components
- [ ] Action/workflow published with documented inputs/outputs

### Non-Functional
- [ ] Clear permission defaults; no over-scoped tokens

### Quality
- [ ] Code coverage > 80%
- [ ] Acceptance criteria met
- [ ] Code reviewed and approved

---

## Bolt Suggestions

| Bolt | Type | Stories | Objective |
|------|------|---------|-----------|
| bolt-config-and-packaging-1 | simple-construction-bolt | 001, 002, 003 | Config defaults, subset selection, packaging |

---

## Notes
Document required scopes and branch naming to align with protected branches.