# API Conventions

## Overview
Conventions for invoking GitHub APIs and exposing internal script/Action inputs and outputs.

## API Style
- External: GitHub REST/GraphQL only; prefer REST v3 for simplicity, GraphQL when batching reduces rate limits.
- Internal: CLI/Action parameters as the public surface; treat generated markdown files as outputs, not APIs.

## Versioning
- Respect GitHub API versions/preview headers when required.
- Internal scripts use semantic versioning via package version; surface version in `--version` flag.

## Response Format
- External: JSON from GitHub APIs.
- Internal: CLI/Action outputs human-friendly Markdown plus optional JSON logs for diagnostics.

## Error Format
- GitHub errors: surface status code, message, and docs URL when present.
- Internal errors: `{ message, code, context }` where `code` is a short token (e.g., `GITHUB_AUTH`, `IO_WRITE`). Exit non-zero on failure.

## Pagination
- Follow GitHub Link headers for pagination; request sensible page sizes (e.g., 50–100) to balance rate limits.