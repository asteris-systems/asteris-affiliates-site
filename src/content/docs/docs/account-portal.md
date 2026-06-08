---
title: "Account portal (/account)"
description: "Customer self-service portal for licence management, downloads, invoices, and email changes. Planned for v1.1 — placeholder + workflow here."
---

# Account portal (`/account`)

**The Asteris account portal ships in v1.1** (planned 6–12 weeks post-v1.0 launch). This page documents the planned scope + the v1.0 workaround.

---

## v1.0 — what to do without the portal

Until the portal ships, every account operation runs through email:

| If you want to… | Email | Response time |
|---|---|---|
| Move your licence to a new domain | support@asterisaffiliates.com with old + new domain | 1–2 business days |
| Download a previous plugin version | support@ with your order ID + version wanted | 1 business day |
| Get a copy of your past invoices | support@ with order ID(s) | 1 business day |
| Change the email address on your account | support@ with current + new email | 1 business day |
| Cancel an annual or monthly subscription | Lemon Squeezy customer portal → Cancel (self-serve), OR email support@ | Self-serve = instant; email = 1 business day |
| Request a refund (within 14-day window) | support@ with "REFUND" in the subject line + order ID | 24 hours |

Lemon Squeezy also provides a [customer portal at app.lemonsqueezy.com/my-orders](https://app.lemonsqueezy.com/my-orders) for subscription management, payment-method updates, and invoice downloads. This is independent of Asteris and works at v1.0 today.

---

## v1.1 — what the Asteris portal will include

The portal will live at `asterisaffiliates.com/account` with magic-link authentication (no password to manage).

### Planned features

- **Licence dashboard** — see all your active Asteris licences across all your purchases, with current activation count + tier
- **Per-site activation management** — deactivate / move / reset activation for any site, no support email needed
- **Versioned downloads** — download any past Asteris release zip (last 10 versions), useful for rollback per [Troubleshooting](/docs/troubleshooting#a-plugin-update-broke-my-site---how-do-i-roll-back)
- **Invoice + receipt history** — every Lemon Squeezy invoice ever issued to your account, downloadable PDF
- **Email change** — update your account email, with magic-link verification of the new address
- **Subscription management** — pause / cancel / change tier (Lemon Squeezy embedded, no separate portal trip)
- **Founder badge + cohort info** — for launch-window subscribers, displays your Founder status + locked rate
- **Support ticket history** — every email you've sent to support@, threaded by issue, with response status

### Authentication

- **Magic-link only at v1.0 of the portal** — no password to manage, no password reset flow to support. Email your address → click the link → 24-hour session.
- **Email-change with double-verification** — change requests require confirmation from both old and new email addresses (prevents account takeover via single compromised inbox).
- **Session lifetime:** 24 hours, automatic logout. Re-request a magic link to re-authenticate.

### Architecture

Cloudflare Worker thin-proxy in front of Lemon Squeezy's customer + licence APIs. R2 for signed plugin-zip downloads. KV for short-lived magic-link tokens. No customer-data database on our infrastructure — Lemon Squeezy is the source of truth for everything except magic-link tokens (which expire after 15 minutes anyway).

Full spec: `02-specs/account_portal_spec.md` (internal — exists in the repo).

---

## Influence the v1.1 scope

If there's an account operation you need that's not listed, **email founder@asteriscommerce.com** before we build v1.1. The list above is the planned scope based on what we expect customers will ask for; ground-truth feedback from actual launch customers will reshape it.

---

## See also

- [Roadmap](/roadmap) — v1.1 timeline
- [Troubleshooting → rollback path](/docs/troubleshooting#a-plugin-update-broke-my-site---how-do-i-roll-back) — uses /account for versioned downloads when shipped
- [Pricing + tiers](/pricing) — current pricing
- [Lemon Squeezy customer portal](https://app.lemonsqueezy.com/my-orders) — v1.0 alternative
