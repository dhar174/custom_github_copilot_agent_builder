# System Patterns

## Architecture: Sense-Plan-Act Pipeline

The system follows a linear, unidirectional data flow:

```mermaid
flowchart LR
    TargetRepo --> Sense[Sense: Snapshot]
    Sense --> Snapshot[RepoSnapshot JSON]
    Snapshot --> Plan[Plan: Planner Agent]
    Plan --> Manifest[PlanManifest JSON]
    Manifest --> Pack[Pack: Generator]
    Pack --> Bundle[FileBundle]
    Bundle --> Apply[Apply: PR Creator]
    Apply --> PR[GitHub Pull Request]
```

### 1. Sense (Snapshot)
-   **Role**: deterministically collect facts about the repo.
-   **Mechanism**: File system traversal, file content analysis (shallow).
-   **Output**: `RepoSnapshot` (JSON) - pure data, no decisions.

### 2. Plan (Planner Agent)
-   **Role**: Make decisions based on the snapshot.
-   **Mechanism**: LLM-based "Planner" (or deterministic logic for MVP) evaluates the snapshot against available capabilities.
-   **Output**: `PlanManifest` (JSON) - list of files to create/update, template selections, reasoning.

### 3. Pack (Generator)
-   **Role**: Construct the actual file content.
-   **Mechanism**: Template expansion + Specialist Agent refinement (optional).
-   **Output**: `FileBundle` - in-memory representation of file paths and content.

### 4. Apply (PR Creator)
-   **Role**: Commit changes and open PR.
-   **Mechanism**: GitHub API interaction.
-   **Constraint**: Never push to default branch; always PR. Handles "Managed Blocks" logic (merging new content with existing file content).

## Key Technical Decisions

-   **TypeScript/Node.js**: Chosen for strong typing and rich ecosystem for file handling and GitHub API interactions (`@actions/github`).
-   **Machine-Readable Intermediates**: `RepoSnapshot` and `PlanManifest` are JSON files, making the pipeline debuggable and testable at each stage.
-   **Managed Blocks**: Use of HTML comments (`<!-- agentops-managed -->`) to delimit AI-owned sections within files, enabling safe updates.
-   **Schema-First**: Strict schemas (via Zod or interfaces) for Snapshot and Manifest ensure reliability between steps.
