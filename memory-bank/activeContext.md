# Active Context

## Current Focus
Initial setup of the **AgentOps Framework Generator** repository. We are currently establishing the `memory-bank` structure to track the project's evolution and strictly defining the core architecture before full implementation.

## Recent Changes
-   **Repository Initialization**: Created `src/index.ts` and core module skeletons (`sense/`, `plan/`, `pack/`, `apply/`).
-   **Specification Definition**: Drafted `docs/specs/agent_builder_first_intent.md` outlining the Functional Requirements (FRs) and standard workflow.
-   **Instruction Setup**: Added `.github/instructions/` for strict behavioral control of the coding agent.
-   **Memory Bank Creation**: (Current Action) Populating `memory-bank/` with foundational context files.

## Active Decisions
-   **Specification-First**: Adopting a rigourous `docs/specs/` approach to drive development.
-   **Managed Blocks Strategy**: Implementing a marker-based system to allow re-running the tool without destroying user edits.

## Next Steps
1.  **Complete Memory Bank**: Finish populating `progress.md` and `tasks/`.
2.  **Implementation - Sense**: Flesh out `src/sense/snapshot.ts` to actually collect repo signals.
3.  **Implementation - Plan**: Implement the `Planner` class to generate `PlanManifest`.
4.  **Implementation - Apply**: Build the `upsertPr` logic in `src/pr/update.ts`.
