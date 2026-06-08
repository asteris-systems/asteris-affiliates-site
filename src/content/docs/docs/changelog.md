---
title: Changelog
description: Every Asteris Affiliates release, version by version.
---

## v1.1.0 — 8 June 2026

**Major release · 23 features across 9 sprints.**

### Sprint 9A — Polish
- Bulk operations (approve/reject/suspend) on affiliates, commissions, payouts
- CSV export across all admin list tables
- Sortable column headers
- Date-range picker on Reports + Commissions
- WP admin dashboard widget

### Sprint 9B — Onboarding + UX
- Affiliate onboarding wizard (4 steps)
- Admin impersonation ("View as" with audit log)
- Email throttling per-recipient per-template per-day
- Per-product commission rates (WC product tab)
- i18n (translation-ready, .pot file)
- Mobile-responsive portal CSS

### Sprint 9C — Performance
- Denormalised aggregates (lifetime balances on affiliates table — no more SUM() across thousands of commissions)
- Stats API: cursor pagination + transient cache

### Sprint 9D — Licensing
- HMAC-signed licence client (activate / validate / deactivate against pay.asteriscommerce.com)

### Sprint 10+ — Differentiators
- Two-tier (MLM) referrals
- AI swipe-copy generator (16 seed snippets + AI variants)
- Vanity `/go/{handle}` landing pages with cookie + view tracking
- Cloud-assist fraud detection (opt-in, SHA-256 hashed signals)
- PayPal API auto-batch payout (OAuth2 + Payouts API)
- EDD + Surecart adapters
- A/B email testing on transactional emails

## v1.0.0 — May 2026

Initial release. Core affiliate tracking, commissions, manual payouts.

---

See the [roadmap](/roadmap) for what's queued in v1.2+.
