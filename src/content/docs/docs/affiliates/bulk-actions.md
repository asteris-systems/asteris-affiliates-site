---
title: Bulk actions + CSV export
description: Bulk-approve, reject, suspend, or pay affiliates. Export every admin list table to CSV.
---

Every admin list table supports bulk actions + CSV export. Honours the current filters and sort order.

## Bulk actions per entity

**Affiliates** — Approve, Reject, Suspend, Reinstate, Delete (where allowed)

**Commissions** — Approve, Reject, Mark paid, Mark unpaid

**Payouts** — Mark paid, Mark failed, Retry

## How to bulk

1. Apply filters first (status, date range, affiliate) so the action only affects what you want
2. Tick the rows (or "select all" — selects every row matching current filters, not just the visible page)
3. **Bulk actions → choose → Apply**
4. Confirm in the modal

## CSV export

Each list table has an **Export CSV** button (top right).

- Honours current filters
- Includes all columns currently visible
- Exports up to 50,000 rows per file (split into multiple files if larger)
- UTF-8 encoded
- First row is headers

Common exports:

- All affiliates with their lifetime earnings → `Affiliates → All → Export CSV`
- Pending commissions for this month → `Commissions → status: pending + date: this month → Export CSV`
- Last quarter's payouts for accounting → `Payouts → date range → Export CSV`

## Scheduled exports

Schedule weekly/monthly emailed CSV exports via WP-CLI:

```bash
wp asteris-aff schedule-export --type=commissions --frequency=weekly --to=accounting@example.com
```

See **[WP-CLI commands →](/docs/dev/wp-cli)**.

## Related

- [Approving + rejecting](/docs/affiliates/manage)
- [Payouts → manual](/docs/payouts/manual)
