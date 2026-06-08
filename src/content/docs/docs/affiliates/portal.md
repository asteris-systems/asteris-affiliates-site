---
title: Affiliate portal (front-end)
description: The customer-facing dashboard where affiliates log in, view stats, generate referral links, and access marketing materials.
---

The affiliate portal is the front-end interface your affiliates use to manage their account. It lives at `/affiliate-portal` by default (configurable).

## Pages in the portal

| Page | Purpose |
|---|---|
| **Dashboard** | At-a-glance stats: 30-day commissions, pending, paid, top product |
| **Referrals** | Full referral history with conversion details |
| **Commissions** | Every commission earned, with order context |
| **Payouts** | Payout history + next-payout estimate |
| **Links** | Generate referral URLs + vanity `/go/handle` links |
| **Swipe copy** | Pre-written marketing snippets (paid tier only) |
| **Profile** | Edit name, email, payout method, payout details |

## Setup

The portal pages are auto-created on plugin activation. To re-create or reset:

**Affiliates → Tools → Recreate portal pages**.

## Pretty URLs

The portal lives under `/affiliate-portal/{section}` (e.g. `/affiliate-portal/commissions`). Change the slug at **Settings → Affiliate portal → URL slug**.

## Mobile-responsive

The portal CSS is mobile-first. Affiliates can manage their account from a phone — useful for checking commissions on the go.

## White-label CSS (Agency tier)

Override the portal styling with your own CSS at **Settings → Affiliate portal → Custom CSS**. Brand colours, fonts, logo — all customisable.

## Self-requested payouts

Off by default. Enable at **Settings → Payouts → Allow self-requested payouts**. Affiliates can then click **Request payout** when they meet the minimum threshold.

## Login + registration

- Registration form at `/affiliate-portal/register` (or wherever you place the `[asteris_aff_register]` shortcode)
- Login at `/affiliate-portal/login`
- Password reset via the standard WP password reset flow

## Related

- [Approving + rejecting](/docs/affiliates/manage)
- [AI Swipe Copy library](/docs/growth/ai-swipe-copy)
- [Vanity landing pages](/docs/growth/landing-pages)
