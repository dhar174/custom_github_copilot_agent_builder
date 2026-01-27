# Coding Standards

## Overview
Coding standards for TypeScript/Node scripts and GitHub Actions workflows that generate markdown-based Copilot agents, prompts, and skills.

## Formatting
- Prettier defaults
- Line length: 100
- Indent: 2 spaces
- Trailing commas: all
- Semicolons: yes
- Quotes: single

## Linting
- ESLint with @typescript-eslint/recommended and plugin:prettier/recommended
- TypeScript strict mode
- Disallow any (use unknown)
- Unused vars: error; allow underscore prefix
- No default exports
- No console in src (allowed in scripts/automation)

## Naming Conventions
- camelCase: variables, functions, hooks (useX)
- PascalCase: types, interfaces, classes, React components (if added)
- UPPER_SNAKE: constants
- Files: kebab-case for libs/scripts; PascalCase for React components if added later

## File & Folder Organization
- Source under src/
- Co-locate tests as *.test.ts
- Prefer explicit exports; barrel exports optional for shared surfaces

## Testing Strategy
- Vitest for unit/integration
- Testing Library if UI surfaces later
- Coverage targets: 80% for library code, 60% for scripts
- Snapshots only for stable text outputs

## Error Handling Patterns
- Prefer typed Result/never over broad any
- Custom error classes for domain-specific failures
- Wrap async entrypoints with a top-level handler that logs and sets exit code

## Logging Standards
- Structured logging via console with JSON-like objects in Actions context
- Include correlation/run identifiers when available
- Never log secrets or tokens
- Levels: info, warn, error (debug only locally)

## CI Gates
- pnpm lint
- pnpm test --coverage
- pnpm prettier --check