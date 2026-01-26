---
intent: 001-agentops-pack-applier
phase: inception
status: complete
created: 2026-01-26T00:00:00Z
updated: 2026-01-26T00:00:00Z
---

# Requirements: AgentOps Pack Applier

## Intent Overview
Automate applying and maintaining a standardized Copilot/AgentOps file framework (Markdown/YAML) across repos via GitHub Actions, producing PRs with reviewable diffs.

## Business Goals

| Goal | Success Metric | Priority |
|------|----------------|----------|
| Apply standard agent/prompt pack to target repos | PR opened/updated in < 10 minutes (goal < 5m for base pack) | Must |
| Keep packs idempotent and re-runnable | Zero-diff re-run when inputs/templates unchanged | Must |
| Support governance via PR workflow | PR-only by default; reviewable diffs with checklist and summary | Must |
| Enable configurable inputs per repo | Repo/profile inputs mapped to templates without manual edits | Should |
| Maintain auditability | Managed sections/markers and clear rationale in PR body | Should |

---

## Functional Requirements

### FR-1: Apply Pack to Target Repo
- **Description**: Accept repo/profile inputs and apply the standard agent/prompt pack (instructions, agents, prompts, models prompts, repo-profile, mcp, decision-log, spec/context/memory) to a target repository using a reusable GitHub Action/workflow.
- **Acceptance Criteria**: Given a target repo and inputs, the workflow/action creates or updates required files and opens/updates a PR with diffs; supports dry-run; respects PR-only default and avoids direct pushes unless explicitly enabled.
- **Priority**: Must
- **Related Stories**: TBD

### FR-2: Idempotent Updates
- **Description**: Re-running with the same inputs produces no diff; when source pack changes, only changed files are updated.
- **Acceptance Criteria**: Second run on same commit hash yields empty diff; when pack version increments, only changed files differ; run reports “no changes” on clean reapply; managed sections prevent overwriting repo-specific customizations outside managed markers.
- **Priority**: Must
- **Related Stories**: TBD

### FR-3: Configurable Templates
- **Description**: Allow repo-specific configuration (e.g., repo-profile metadata, enabled skills/agents) via inputs or config file, merged into template rendering.
- **Acceptance Criteria**: Inputs map to placeholders; missing optional inputs use defaults; required inputs cause failure with actionable message; template rendering logged in action output; supports selecting subsets of the pack (e.g., instructions-only) when configured.
- **Priority**: Should
- **Related Stories**: TBD

### FR-4: PR Governance and Reporting
- **Description**: The workflow creates/updates a PR with human-readable summary of applied pack, versions, and files changed; includes checklist for reviewers.
- **Acceptance Criteria**: PR body lists pack version, files touched, warnings/concerns (e.g., manual review areas), and links to logs; updates existing PR if already open; avoids churn (stable ordering, no volatile timestamps).
- **Priority**: Should
- **Related Stories**: TBD

### FR-5: Action/Workflow Packaging
- **Description**: Provide a reusable GitHub Action and a composite workflow example that consumes it.
- **Acceptance Criteria**: Action has inputs/outputs documented; example workflow runs on dispatch; minimal setup steps documented; permissions block follows least-privilege defaults (`contents: write`, `pull-requests: write` only when needed).
- **Priority**: Should
- **Related Stories**: TBD

### FR-6: Safety Modes (Managed Sections)
- **Description**: Support managed markers/sections to protect repo-specific customizations and avoid overwriting non-managed content.
- **Acceptance Criteria**: Managed blocks are updated; non-managed content remains untouched; refresh mode skips files not under management; logs list managed paths.
- **Priority**: Must
- **Related Stories**: TBD

---

## Non-Functional Requirements

### Performance
| Requirement | Metric | Target |
|-------------|--------|--------|
| Apply run time | End-to-end for medium repo | < 10 minutes (goal < 5 minutes base pack) |

### Scalability
| Requirement | Metric | Target |
|-------------|--------|--------|
| Re-run on multiple repos | Concurrent jobs via Actions | Support parallel runs without shared state |
| API efficiency | GitHub API usage | Use pagination/batching to stay within rate limits |

### Security
| Requirement | Standard | Notes |
|-------------|----------|-------|
| Auth | GitHub App/PAT | Least-privilege scopes; prefer GITHUB_TOKEN; no secrets in logs |
| Supply chain | Pin action versions | Use immutable SHAs where possible |
| Secrets handling | Logging | Prevent echoing tokens/env; redact outputs |

### Reliability
| Requirement | Metric | Target |
|-------------|--------|--------|
| Idempotence | Re-run diff | Zero-diff when no source changes |
| Failure handling | Retry | Clear failure messages; safe to re-run |
| Determinism | Ordering/stability | Stable ordering; no volatile timestamps unless in dedicated metadata blocks |

### Compliance
| Requirement | Standard | Notes |
|-------------|----------|-------|
| Data residency | GitHub-hosted only | No external data stores |
| Branch protections | PR-only flow | No force-push; branch naming configurable |

---

## Constraints

### Technical Constraints

**Project-wide standards**: Required standards loaded from memory-bank standards folder by Construction Agent.

**Intent-specific constraints**:
- GitHub-only automation (no other forge).
- Output limited to Markdown/YAML artifacts; no arbitrary code scaffolding beyond agent tooling files.
- Runs under GitHub Actions (hosted or self-hosted); must operate without external state.
- PR-only by default; avoids force-push unless explicitly configured.
- Managed sections to avoid overwriting non-managed content.

### Business Constraints
- Must produce PR-based changes for governance.
- Keep configuration lightweight (inputs or single config file); avoid bespoke per-repo scripting.

---

## Assumptions

| Assumption | Risk if Invalid | Mitigation |
|------------|-----------------|------------|
| Target repos permit GitHub App/PAT with necessary scopes | Cannot create branches/PRs | Document required scopes; fail with clear message |
| Repos have standard branch protections | PR may be blocked | Document expected workflow; allow branch naming config |
| Maintainers want PR-based governance vs direct pushes | Reduced governance | Keep PR path default; direct-commit flag gated and off by default |
| GitHub-hosted runners are available | Workflow fails on self-hosted-only env | Document runner expectations; keep actions runner-agnostic |

---

## Open Questions

| Question | Owner | Due Date | Resolution |
|----------|-------|----------|------------|
| Which pack source format? (single bundled repo vs packaged artifact) | TBD | TBD | Pending |
| How to version packs? (semver tag vs commit SHA) | TBD | TBD | Pending |
| Should we support selective components? (e.g., only instructions vs full pack) | TBD | TBD | Pending |