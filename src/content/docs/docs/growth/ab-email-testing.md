---
title: A/B email testing
description: Run variant tests on transactional emails. Pick the winning subject line / body automatically.
---

A/B testing lets you run two variants of any transactional email (welcome, approval, commission earned, payout sent) and pick the one with the higher open rate.

## Create a test

**Affiliates → Email → A/B tests → New test**:

1. **Template** — choose the transactional email to test
2. **Variant A** — current copy (control)
3. **Variant B** — your alternative
4. **Split** — 50/50 default; adjust if you want a smaller test slice
5. **Sample size** — 100 recipients default; minimum for statistical confidence
6. **Activate**

The next 100 recipients of that template are split 50/50 between variants. After 100 recipients per variant, the test reports a winner based on open rate.

## What's tracked

- **Sent count** per variant
- **Open rate** (via tracking pixel — see below)
- **Statistical confidence** (basic z-test against the null hypothesis of equal performance)

> **Click tracking is queued for v1.2.** v1.1.0 tracks opens only. Until v1.2, judge variants on open rate alone.

## Open tracking

A 1×1 transparent GIF pixel is embedded in HTML email variants. When the email is opened, the pixel loads from `?asteris_aff_pixel=1&token=…` and counts the open.

Affiliates can disable pixel tracking individually in their portal (GDPR-friendly). Disabled-pixel opens don't count against either variant.

## Pick a winner

After the sample size is reached:

- **Auto-pick winner** (default) — variant with higher open rate becomes the default; the test stops
- **Manual review** — admin chooses; useful for close results or when you want to inspect variant content first

## Beyond transactional emails

A/B testing covers transactional emails only in v1.1.0. Marketing email A/B is queued for v1.2 (requires email-marketing module which we don't ship — recommend pairing with Asteris for WordPress's SMTP module + an external campaign tool).

## Related

- [Email throttling](/docs/growth/email-throttling)
- [Affiliate portal](/docs/affiliates/portal)
