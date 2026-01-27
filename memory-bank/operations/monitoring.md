---
unit: 001-agentops-pack-applier
env: staging
status: planned
created: 2026-01-26T19:05:00Z
---

# Monitoring Plan — AgentOps Pack Applier

## Signals to Track
- **Action run status**: success/failure for staging and production runs.
- **PR churn/no-op rate**: re-runs should yield zero diff when no source changes.
- **Managed section integrity**: alerts if files outside managed markers change unexpectedly.
- **API limits**: GitHub rate-limit headers; backoff applied on 429s.

## Alerting
- **Webhook**: POST to `${{ secrets.MONITORING_WEBHOOK }}` on failure or high-churn detection.
- **Payload**: run id, repo, pack version, apply/dry-run flag, PR URL/number (if any), warnings.
- **Channels**: Slack/MS Teams via incoming webhook (configure secret in consuming repo).

## Log Retention
- Keep GitHub Action run logs for staging/prod for at least 30 days.
- Persist summarized outcomes in PR comments or a run summary artifact when available.

## Implementation Notes
- Add a `if: failure()` notification step in workflows invoking the action.
- For churn detection, rely on apply engine `noChanges` flag; emit a warning when false positives occur.
- Ensure tokens used for webhooks are stored as secrets; avoid echoing secret values in logs.

## Rollout Steps
- Configure `MONITORING_WEBHOOK` secret in staging/prod repos.
- Enable notification step in staging workflow (added) and replicate to production when ready.
- Validate on a staging run: force a failure to confirm alert delivery, then a success to confirm silence.
