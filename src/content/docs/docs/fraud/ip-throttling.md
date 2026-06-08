---
title: IP throttling
description: Rate-limit click and signup activity per IP. Blocks bot-driven referral spam.
---

IP throttling caps how many clicks, signups, or commission-earning orders can come from a single IP address per time window. Stops bot-driven referral spam and click-fraud campaigns.

## Default limits

| Action | Window | Cap |
|---|---|---|
| Referral clicks | 1 minute | 30 |
| Referral clicks | 1 hour | 200 |
| Affiliate signups | 1 hour | 5 |
| Affiliate signups | 1 day | 20 |
| Commission-earning orders | 1 hour | 10 |
| Commission-earning orders | 1 day | 30 |

Configure at **Settings → Fraud → IP throttling**.

## What happens at the cap

- **Clicks above cap** — silently dropped (no commission credit, no impression count)
- **Signups above cap** — registration form returns error: "Too many signups from this IP. Try again in N minutes."
- **Orders above cap** — order goes through but commission is **not credited**; admin notice fires for review

## Per-IP allowlist

Whitelist your office / agency IPs to prevent your own testing from triggering throttling:

**Settings → Fraud → IP allowlist** → paste comma-separated IPs or CIDR ranges.

## Per-affiliate IP scoping

By default, throttle counters are global (one IP across all affiliates). Switch to per-affiliate scoping if you have legitimate high-volume affiliates working from a shared office IP:

**Settings → Fraud → IP throttle scope → Per-affiliate**.

## Cloud-assist integration

When [cloud-assist fraud](/docs/fraud/cloud-assist) is enabled, IPs that hit throttle caps across multiple Asteris stores are added to the central hash blacklist after manual review.

## False positives

Mobile carriers (especially in Asia + Africa) use shared CG-NAT — thousands of users behind one public IP. If you serve those markets, raise the click cap or disable per-IP throttling for click counts (keep it for signups + commissions).

## Audit log

Every throttle hit is logged at **Affiliates → Audit log → IP throttle events**. Useful for diagnosing legitimate-user reports of "the form said too many signups."

## Related

- [Cloud-assist fraud detection](/docs/fraud/cloud-assist)
- [Self-referral prevention](/docs/fraud/self-referral)
