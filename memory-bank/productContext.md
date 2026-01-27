# Product Context

## Problem Statement
Standardizing AI agent configurations across an organization is difficult. Repositories differ in language, framework, and purpose, making static "copy-paste" templates ineffective or bloated. Teams need a way to bootstrap and maintain high-quality, repository-aware Copilot/AgentOps environments without manual setup for every project.

## Solution
The **AgentOps Pack Applier** acts as an intelligent builder pipeline. It inspects a repository to understand its context (e.g., "This is a Next.js frontend" or "This is a Python microservice") and applies a tailored "pack" of AI instructions, agents, and prompts.

## User Experience
1.  **Installation**: A user adds a `workflow_call` reference to this builder in their repo's `.github/workflows`.
2.  **Execution**: The workflow runs automatically (or on dispatch).
3.  **Result**: The user receives a Pull Request titled "Configure AgentOps Framework".
4.  **Review**: The PR body explains *why* certain agents or instructions were added.
5.  **Maintenance**: Re-running the workflow updates the framework while respecting human customization in non-managed zones.

## Strategic differentiation
-   **Agentic Analysis**: "Sensing" phase goes beyond simple file existence checks to infer intent.
-   **Managed Blocks**: Sophisticated handling of mixed human/AI content allows for safe "refresh" operations, solving the "eject" problem common in scaffolding tools.
-   **Governance-by-Default**: Automatically plants seeds for `repo-profile.md` and `decision-log.md`, encouraging best practices for AI-assisted development.
