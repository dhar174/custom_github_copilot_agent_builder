---
intent: 001-agentops-pack-applier
phase: inception
status: context-defined
updated: 2026-01-26T00:00:00Z
---

# AgentOps Pack Applier - System Context

## System Overview
GitHub Actions-driven automation that applies and maintains a standardized Copilot/AgentOps pack (Markdown/YAML) in target repos via PRs, with safety mechanisms for idempotence and managed sections.

## Context Diagram

```mermaid
C4Context
    title System Context - AgentOps Pack Applier
    Person(maintainer, "Repo Maintainer", "Triggers workflow, reviews PR")
    Person(platform, "Platform Maintainer", "Manages pack source/policies")
    System_Boundary(sys, "AgentOps Pack Applier") {
        System(action, "GitHub Action + reusable workflow", "Renders pack, opens PR")
    }
    System_Ext(target, "Target Repo", "Receives managed files via PR")
    System_Ext(ghapi, "GitHub API", "Branches, PRs, contents API")

    Rel(maintainer, action, "Dispatch / schedule")
    Rel(platform, action, "Provides pack + config inputs")
    Rel(action, target, "Create/update branch + files")
    Rel(action, ghapi, "REST/GraphQL calls")
```

## External Integrations
- **GitHub API (REST/GraphQL)**: branch creation, contents updates, PR creation/update.
- **GitHub Actions runners**: execution environment (ubuntu-latest default).

## High-Level Constraints
- PR-only by default; no force-push unless explicitly configured.
- Use GITHUB_TOKEN where possible; optional PAT/App token for cross-repo.
- No secrets written to logs or generated files.

## Key NFR Goals
- Idempotent re-runs (zero diff when no source change).
- Stable, low-noise diffs (no volatile timestamps/order).
- Runtime target <10m (goal <5m) for base pack.