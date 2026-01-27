# System Architecture

## Overview
Script-first architecture: TypeScript/Node utilities and GitHub Actions workflows that generate and manage markdown artifacts (agents, prompts, skills). No persistent backend; repo and Actions are the runtime.

## Architecture Style
Monorepo library + automation pipelines. Logic lives in reusable TS modules; workflows orchestrate lint/test/generate/publish steps. Stateless runs; state is git-tracked artifacts.

## API Design
Primary external APIs: GitHub REST/GraphQL. Internal surface is CLI/Action inputs and markdown outputs. Keep commands idempotent; prefer explicit flags over implicit defaults.

## State Management
Ephemeral during runs; persisted state is the git repo (markdown files). Avoid hidden caches; if caching is used, make cache keys explicit.

## Caching Strategy
Use GitHub Actions cache for pnpm store and node_modules keyed by lockfile + node version. Do not cache generated markdown to avoid drift.

## Security Patterns
Least-privilege GitHub App/PAT; secrets stored only in Actions secrets/vars. No secrets in logs or artifacts. Validate user-supplied inputs before writing files.