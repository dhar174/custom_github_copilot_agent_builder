# Permissions and Token Strategy

## Defaults
- Use `GITHUB_TOKEN` when applying packs within the same repository.
- Minimal permissions: `contents: write`; add `pull-requests: write` only when PR creation is enabled.
- Avoid broader scopes unless required for cross-repo operations.

## Overrides
- For cross-repo applies, allow an `override_token` input.
- Document required scopes: `contents: write`, `pull-requests: write`.
- Mask tokens in logs; do not echo secrets.

## Branch and Protection Notes
- Use a dedicated PR branch (e.g., `agentops/pack-applier`).
- Do not force-push unless explicitly configured.
- Respect branch protection; rely on PR flow by default.

## Audit and Stability
- Keep permissions explicit in `action.yml` and sample workflow.
- Prefer stable, deterministic outputs to minimize churn on re-runs.
