---
title: WP-CLI commands
description: Full WP-CLI suite for affiliate operations, payouts, imports, scheduled tasks.
---

Every admin action is also available via WP-CLI. Useful for cron jobs, server scripts, bulk operations.

## Install

WP-CLI ships with most managed WordPress hosts. Verify:

```bash
wp --version
```

Asteris commands are auto-registered when the plugin is active. List them:

```bash
wp asteris-aff --help
```

## Affiliate management

```bash
# List
wp asteris-aff list --status=pending
wp asteris-aff list --status=active --format=csv > affiliates.csv

# Approve / reject / suspend
wp asteris-aff approve 123
wp asteris-aff reject 123 --reason="duplicate signup"
wp asteris-aff suspend 123 --reason="self-referral"
wp asteris-aff reinstate 123

# Single
wp asteris-aff get 123 --field=lifetime_earnings
```

## Commissions

```bash
# Approve / reject
wp asteris-aff commissions approve 456
wp asteris-aff commissions revoke 456 --reason="manual review"

# Bulk approve all eligible
wp asteris-aff run-approvals
```

## Payouts

```bash
# Run scheduled batches
wp asteris-aff run-payouts
wp asteris-aff run-payouts --method=paypal --dry-run

# Manual mark-paid from CSV
wp asteris-aff payouts mark-paid --csv=/path/to/paid.csv

# Export pending
wp asteris-aff payouts export --status=pending > pending.csv
```

## Stats + aggregates

```bash
# Recompute denormalised aggregates (use after data migration)
wp asteris-aff recompute-aggregates

# Stats for a single affiliate
wp asteris-aff stats 123

# Top performers
wp asteris-aff stats top --period=30d --limit=10
```

## Imports

```bash
wp asteris-aff import --source=affiliatewp
wp asteris-aff import --source=slicewp
wp asteris-aff import --source=tapfiliate --csv=/path/to/tapfiliate-export.csv
```

## Scheduled exports

```bash
wp asteris-aff schedule-export --type=commissions --frequency=weekly --to=accounting@example.com
```

## Throttle cleanup

```bash
wp asteris-aff throttle-cleanup
```

Removes throttle records older than the retention window (default 7 days).

## Cron alternative

Most stores let WP-Cron handle scheduled batches. For reliability, replace WP-Cron with a system cron pointing at WP-CLI:

```cron
0 * * * *  cd /var/www/yoursite.com && wp asteris-aff run-approvals --quiet
0 2 * * 1  cd /var/www/yoursite.com && wp asteris-aff run-payouts --quiet
```

## Related

- [REST API](/docs/dev/rest-api)
- [Hooks + filters](/docs/dev/hooks-filters)
