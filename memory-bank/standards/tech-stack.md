# Tech Stack

## Overview
TypeScript/Node scripts and GitHub Actions workflows for generating markdown-based Copilot agents, prompts, and skills. Runs on hosted GitHub Actions runners with GitHub App or PAT auth for GitHub APIs. pnpm for fast installs and monorepo-friendly workflows.

## Languages
TypeScript (Node.js runtime)

Type safety and ecosystem support for GitHub Actions toolchains and CLI-style automation.

## Framework
None (scripts + GitHub Actions runtime)

Lean script-first approach; avoid unnecessary web frameworks. Workflows orchestrate execution.

## Authentication
GitHub App or PAT

Use GitHub App (preferred) for repo-scoped automation; fall back to PAT where needed. Store credentials in Actions secrets.

## Infrastructure & Deployment
GitHub Actions (hosted runners)

Workflows are the runtime; no persistent infra. Add self-hosted runners later if heavier workloads appear.

## Package Manager
pnpm

Fast installs and disk efficiency; good Actions support.

## Decision Relationships
- pnpm aligns with Node/TS scripts and Actions caching.
- GitHub App auth pairs with Actions to access repos and workflows securely.