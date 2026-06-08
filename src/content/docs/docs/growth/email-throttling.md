---
title: Email throttling
description: Per-recipient per-template per-day cap. Stops runaway send loops.
---

Email throttling protects your store (and your affiliates' inboxes) from runaway sends. If a bug or misconfiguration would otherwise blast someone with 50 commission-earned emails in an hour, throttling caps them.

## Default cap

**10 emails per recipient per template per day**. Configurable at **Settings → Email → Throttle**.

Above the cap, additional emails are silently dropped and logged in **Affiliates → Audit log → Throttled emails**.

## Hard cap

Above the soft cap, there's a hard cap of **50 emails per recipient per template per day**. The hard cap can't be raised — it's a safety net against runaway loops.

## Per-template override

Some templates legitimately need higher caps (e.g. real-time commission notifications for high-volume affiliates). Override per template:

**Settings → Email → Per-template caps**:

| Template | Default cap |
|---|---|
| Commission earned | 10/day |
| Welcome | 1/day |
| Approval / rejection | 1/day |
| Payout sent | 5/day |
| Password reset | 5/day |
| Test connection | 20/day (admin only) |

## What counts as "same template"

Templates are identified by their slug (e.g. `commission_earned`, `welcome`). Two emails from the same template to the same recipient count toward the cap, regardless of body content (A/B variants count together).

## Inspecting throttle activity

**Affiliates → Audit log → Throttled emails** shows:

- Recipient
- Template slug
- Timestamp of the throttle decision
- Reason ("daily cap reached")

Useful for diagnosing missing-email reports from affiliates.

## Filter hook

Override the cap programmatically per recipient/template:

```php
add_filter( 'asteris_aff_email_daily_cap', function( $cap, $template_slug, $recipient ) {
  if ( $template_slug === 'commission_earned' && is_super_affiliate( $recipient ) ) {
    return 50;
  }
  return $cap;
}, 10, 3 );
```

## Cron cleanup

Throttle records older than 7 days are pruned daily. Reduce the window via `asteris_aff_throttle_retention_days` filter.

## Related

- [A/B email testing](/docs/growth/ab-email-testing)
- [Hooks + filters](/docs/dev/hooks-filters)
