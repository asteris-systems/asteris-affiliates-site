---
title: Self-referral prevention
description: Block affiliates from referring themselves. Detect logged-in affiliate's own orders. Optional manual flag for review.
---

Self-referral is the most common form of affiliate fraud: an affiliate signs up, uses their own link to buy something, and earns commission on their own purchase.

Asteris Affiliates detects and blocks several patterns automatically.

## Detection patterns

The plugin checks (in order):

1. **Logged-in WP user match** — if the buyer's WP user ID equals the referring affiliate's WP user ID, block.
2. **Email match** — if the order's billing email equals the referring affiliate's account email, block.
3. **Payout-detail match** — if the order's billing email equals any value in the affiliate's payout details (PayPal email, bank holder email), block.
4. **IP match within 24h** — if the order's IP was used to sign in to the referring affiliate's account in the last 24 hours, flag for review.
5. **Cookie-IP-account triangle** — if the same IP saw both the affiliate's portal and the checkout within 24 hours, flag.

## Default response per pattern

| Pattern | Default action | Configurable |
|---|---|---|
| 1. WP user match | Block + revoke commission | No |
| 2. Email match | Block + revoke commission | Yes |
| 3. Payout-detail match | Block + revoke commission | Yes |
| 4. IP match within 24h | Flag for review | Yes — can auto-block |
| 5. Cookie-IP-account triangle | Flag for review | Yes |

Configure at **Settings → Fraud → Self-referral**.

## Manual flag

Admins can flag any commission as "suspected self-referral" → it moves to **Commissions → Flagged** for batch review.

## Affiliate appeal

If an affiliate believes a commission was incorrectly flagged (e.g. they share an IP with a household member who bought legitimately), they can submit an appeal from the portal. Admins see appeals in **Affiliates → Appeals**.

## Aggressive vs lenient

For low-trust environments (open signups, anonymous affiliates), enable all 5 patterns + auto-block. For high-trust (invite-only, vetted affiliates), enable patterns 1–3 only and treat 4–5 as soft flags.

## Related

- [Cloud-assist fraud detection](/docs/fraud/cloud-assist)
- [IP throttling](/docs/fraud/ip-throttling)
- [Suspension + reinstatement](/docs/affiliates/suspension)
