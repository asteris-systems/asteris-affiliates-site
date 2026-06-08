---
title: Suspension + reinstatement
description: Suspend affiliates who break terms; reinstate them without losing referral history.
---

Suspension blocks new referrals from being credited but **preserves** all historical commissions and payouts.

## Suspend an affiliate

**Affiliates → All affiliates → tick → Bulk actions → Suspend**.

Or from a single affiliate detail page: **Actions → Suspend**.

## What happens when suspended

- Their referral URL stops crediting new clicks
- Existing commissions remain in their balance
- They lose access to the affiliate portal (configurable — see Settings)
- They receive an optional notification email
- An audit log entry is created

## Reinstate

Same flow with **Bulk actions → Reinstate** (or Actions → Reinstate on detail page). New referrals start crediting again. Their existing history is unchanged.

## When to suspend vs reject

- **Suspend** — existing affiliate who broke terms (spam, self-referral, prohibited content). You may reinstate.
- **Reject** — new signup you don't want to approve. They never become active.
- **Delete** — permanent removal. Affiliates with commission history can't be deleted; suspend them instead.

## Audit log

Every suspension and reinstatement is logged with:
- Admin user who triggered
- Timestamp
- Optional reason (free text field)
- IP address

View at **Affiliates → Audit log**.

## Related

- [Approving + rejecting](/docs/affiliates/manage)
- [Self-referral prevention](/docs/fraud/self-referral)
