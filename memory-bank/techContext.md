# Technical Context

## Core Technologies
-   **Language**: TypeScript (Node.js)
-   **Runtime**: GitHub Actions Runner (ubuntu-latest)
-   **Package Manager**: npm / yarn
-   **Testing**: Vitest

## Key Libraries (Dependencies)
-   **@actions/core**: Input/Output handling for GitHub Actions.
-   **@actions/github**: Octokit client for PR creation and API calls.
-   **@actions/exec**: executing shell commands.
-   **js-yaml**: Parsing/serializing YAML frontmatter and configs.
-   **openai**: Client for LLM interactions (Planner/Reviewer agents).
-   **fs-extra**: Enhanced file system operations.

## Development Setup
-   **Build**: `tsc -p tsconfig.json` (Compiles TS to JS).
-   **Test**: `vitest run` (Unit and integration tests).
-   **Lint/Format**: Standard Prettier/ESLint configs (implied).

## Constraints
-   **Execution Time**: The entire workflow (Sense -> Plan -> Apply) should ideally complete under 5-10 minutes.
-   **Docker**: MVP does *not* use Docker-in-Docker; runs directly on the runner to minimize overhead and complexity.
-   **Tokens**: Requires `GITHUB_TOKEN` (or PAT) with `contents: write` and `pull-requests: write`.

## Project Structure
-   `src/`: Source code.
    -   `index.ts`: Entry point.
    -   `sense/`: Snapshot logic.
    -   `plan/`: Planner logic.
    -   `pack/`: Generator/Template logic.
    -   `apply/`: PR creation and managed block merging.
-   `dist/`: Compiled JS (committed for Actions).
-   `docs/`: Documentation.
-   `.github/`: workflows, agents, instructions.
