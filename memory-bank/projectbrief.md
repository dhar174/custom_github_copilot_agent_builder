# Project Brief

## Overview
The **AgentOps Framework Generator** (repo: `agentops-pack-applier`) is a specialized tool designed to produce repository-specific Copilot/AgentOps frameworks for any target repository. Rather than applying a static template, it utilizes an agentic "Sense-Plan-Act" approach to analyze a target repository, decide on its unique needs, and generate appropriate configurations, instructions, and agents.

## Core Goals
1.  **Repository-Specific Generation**: Create tailored AI configurations (instructions, agents, prompts) based on the target repo's tech stack and structure.
2.  **Agentic Workflow**: Use internal agents (Sensing, Planning) to determine the best framework configuration, avoiding "one-size-fits-all" solutions.
3.  **Governance & Standards**: Enforce consistent governance via `docs/agentops/` files (repo-profile, mcp, decision-log).
4.  **Reusable GitHub Action**: Serve as a reusable workflow (`.github/workflows/apply.yml`) callable by other repositories.
5.  **Idempotence & Safety**: Ensure re-runs are safe, non-destructive to human edits (via managed blocks), and deterministic where required.

## Scope
-   **Input**: A target GitHub repository.
-   **Process**:
    -   **Sense**: Snapshot repository state (languages, framework, existing AI config).
    -   **Plan**: Generate a `PlanManifest` deciding what files to create/update.
    -   **Pack/Gen**: Produce a file bundle using templates and specialist agents.
    -   **Apply**: Open a Pull Request with the changes.
-   **Output**: A PR containing `.github/copilot-instructions.md`, custom agents, prompts, and memory bank artifacts.

## Success Metrics
-   **Determinism**: Unchanged inputs produce identical outputs (idempotence).
-   **Safety**: Human edits in unmanaged sections are preserved.
-   **Speed**: Generate and open a PR within 10 minutes.
-   **Quality**: Generated files pass linting and internal reviewer agent checks.
