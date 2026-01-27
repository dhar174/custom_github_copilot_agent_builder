---
stage: plan
bolt: bolt-pr-governance-and-reporting-1
created: 2026-01-27T01:45:00Z
---

## Implementation Plan: pr-governance-and-reporting

### Objective
Implement the Pull Request governance layer for the AgentOps Pack Applier. This includes generating structured, informative PR bodies, ensuring deterministic updates to avoid churn, and managing the PR lifecycle (create/update) via the GitHub API. This aligns with `FR-10` (Pull Request Creation), `NFR-2` (Idempotence), and `NFR-3` (PR Quality) from the `agent_builder_first_intent.md` spec.

### Deliverables

1.  **PR Content Generator (`src/pr/summary.ts`)**
    *   Generates the PR title and body markdown.
    *   Includes:
        *   Repo signals summary (from `FR-10.2`).
        *   Pack version and target details.
        *   List of generated/updated files (sorted deterministically).
        *   Reviewer Checklist (Manual review items, safety checks).
        *   Questions/Assumptions section.
        *   MCP governance note (reference `mcp.md` per `FR-11`).

2.  **PR Lifecycle Manager (`src/pr/update.ts`)**
    *   GitHub API integration (using Octokit).
    *   Logic to find existing PR by branch (`agentops/apply-pack` default).
    *   Logic to create new PR or update exisiting PR body.
    *   Rate-limit handling (basic backoff or efficient querying).

3.  **Stability Utilities (`src/pr/stability.ts`)**
    *   Helpers to strip/isolate volatile timestamps from content before diffing.
    *   Deterministic sorting for file lists and maps.

### Dependencies
- **`@octokit/rest`**: For GitHub API interactions.
- **`src/apply/types.ts`**: To understand the `ApplyResult` structure (list of changed files).
- **`src/config/schema.ts`**: For PR configuration (title, branch name).

### Technical Approach

1.  **PR Content Generation**:
    *   Create a templating function that takes `ApplyResult`, `PlanManifest`, and `Config` as input.
    *   Use exact section headers defined in `agent_builder_first_intent.md` to ensure compliance.
    *   Ensure file lists are sorted `a-z` before rendering to Markdown.

2.  **PR Management**:
    *   Use `octokit.pulls.list({ head: branch })` to find existing PRs.
    *   If found: `octokit.pulls.update()`.
    *   If not found: `octokit.pulls.create()`.
    *   Handle 404s/Auth errors gracefully with actionable messages.

3.  **Stability**:
    *   Implement `stabilizeContent(content: string): string` to normalize line endings and strip known volatile patterns (like `Generated at: <timestamp>`) for diff comparisons if needed, though strictly we rely on the engines output.
    *   Ensure the engine's output (which feeds this bolt) is trusted, but the PR body itself must be stable.

### Acceptance Criteria

- [ ] **PR Body Compliance**: Generated body includes Summary, File List, Checklist, and Questions as per `agent_builder_first_intent.md`.
- [ ] **Idempotent Update**: Re-running the tool updates the *existing* PR body without creating duplicates.
- [ ] **Stable Ordering**: File lists in the PR body are always alphabetically sorted.
- [ ] **Checklist Included**: The mandatory reviewer checklist appears in the output.
- [ ] **Branch Naming**: Uses the configured branch name (default `agentops/apply-pack`).
