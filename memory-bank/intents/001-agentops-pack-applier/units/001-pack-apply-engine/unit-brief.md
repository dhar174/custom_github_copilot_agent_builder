---
unit: 001-pack-apply-engine
intent: 001-agentops-pack-applier
phase: inception
status: draft
created: 2026-01-26T00:00:00Z
updated: 2026-01-26T00:00:00Z
---

# Unit Brief: pack-apply-engine

## Purpose
Render and apply the pack to target repos with managed sections, dry-run/apply modes, and idempotent reapply.

## Scope

### In Scope
- Rendering templates with inputs and pack metadata
- Managed section handling to protect repo customizations
- Dry-run and apply execution paths
- Idempotence checks and “no changes” reporting

### Out of Scope
- PR body/reporting (handled by pr-governance-and-reporting)
- Config schema and permissions (handled by config-and-packaging)

---

## Assigned Requirements

| FR | Requirement | Priority |
|----|-------------|----------|
| FR-1 | Apply pack via GitHub Action/workflow with PR default | Must |
| FR-2 | Idempotent updates with managed sections | Must |
| FR-6 | Safety modes with managed sections | Must |

---

## Domain Concepts

### Key Entities
| Entity | Description | Attributes |
|--------|-------------|------------|
| Pack manifest | Describes files and markers to apply | paths, markers, version |
| Rendered artifact | Output file after templating | path, managed blocks, checksum |

### Key Operations
| Operation | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| Render pack | Apply inputs to templates | pack source, inputs | rendered files |
| Apply with managed sections | Update managed blocks only | rendered files, repo files | updated files, diff summary |
| Idempotence check | Detect no-op reruns | rendered files, checksums | no-change signal |

---

## Story Summary

| Metric | Count |
|--------|-------|
| Total Stories | 3 |
| Must Have | 3 |
| Should Have | 0 |
| Could Have | 0 |

### Stories

| Story ID | Title | Priority | Status |
|----------|-------|----------|--------|
| 001-baseline-apply-and-dry-run | Baseline apply + dry-run | must | planned |
| 002-managed-sections-protection | Managed sections safety | must | planned |
| 003-idempotent-reapply-and-delta | Idempotent reapply | must | planned |

---

## Dependencies

### Depends On
| Unit | Reason |
|------|--------|
| 002-config-and-packaging | Needs config schema, pack metadata, permissions defaults |

### Depended By
| Unit | Reason |
|------|--------|
| 003-pr-governance-and-reporting | Needs stable diffs and apply outputs |

### External Dependencies
| System | Purpose | Risk |
|--------|---------|------|
| GitHub API | Branch, contents, PR refs | Medium |

---

## Technical Context

### Suggested Technology
TypeScript/Node scripts, pnpm; use YAML/Markdown rendering with strict ordering.

### Integration Points
| Integration | Type | Protocol |
|-------------|------|----------|
| GitHub API | API | REST |

### Data Storage
| Data | Type | Volume | Retention |
|------|------|--------|-----------|
| Rendered artifacts | Files in repo | Small | In-repo |

---

## Constraints
- Must not overwrite non-managed content.
- Must report no-change runs clearly.

---

## Success Criteria

### Functional
- [ ] Dry-run shows planned changes
- [ ] Apply updates managed sections only
- [ ] Re-run with no source change yields zero diff

### Non-Functional
- [ ] Stable ordering; no volatile timestamps
- [ ] Runtime target met (<10m typical)

### Quality
- [ ] Code coverage > 80%
- [ ] Acceptance criteria met
- [ ] Code reviewed and approved

---

## Bolt Suggestions

| Bolt | Type | Stories | Objective |
|------|------|---------|-----------|
| bolt-pack-apply-engine-1 | simple-construction-bolt | 001, 002, 003 | Render/apply with managed sections and idempotence |

---

## Notes
Consider hashing managed blocks to detect drift and avoid churn.