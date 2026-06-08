---
title: Cloud-assist fraud detection
description: Opt-in SHA-256-hashed fraud signal sharing across Asteris stores. Privacy-first — no PII ever leaves.
---

Cloud-assist is an **opt-in** module that lets your store benefit from fraud signals seen on other Asteris Affiliates stores. New stores benefit from every prior store's blacklist. No personally identifiable info ever leaves your server — only SHA-256 hashes of suspicious identifiers.

## What it shares

When enabled, daily at 03:00 your local time, the plugin sends:

- **SHA-256 hashes** of email addresses associated with confirmed-fraudulent affiliates
- **SHA-256 hashes** of IP addresses used in confirmed self-referrals or fake clicks
- **SHA-256 hashes** of payout details (PayPal email, bank account number) that have been flagged as fraudulent

**Never sent:**

- The plaintext email, IP, or bank details
- Customer order data
- Affiliate names, addresses, profile data
- Commission amounts
- Anything that could identify the affiliate or customer

## What it receives

The plugin downloads a hashed blacklist from `pay.asteriscommerce.com/wp-json/asteris/v1/fraud/sync`. When a new affiliate signs up or generates clicks, their identifiers are hashed and compared against the blacklist.

A match triggers:

- **High confidence** (multi-store flag) — auto-reject the signup or auto-suspend the affiliate
- **Low confidence** (single-store flag) — admin notice for manual review

## Enable / disable

**Settings → Fraud → Cloud-assist → Enable**.

When enabled, the plugin shows a one-time consent screen explaining what's shared. You can disable at any time. Disabling stops both the upload (your hashes) and download (others' hashes) cycles.

## Privacy compliance

- **GDPR / AU Privacy Act**: SHA-256 hashes are not personal data under most interpretations because they can't be reversed to identify an individual. We treat them as personal data anyway and process under legitimate-interest basis (fraud prevention).
- **No third parties**: data lives only on `pay.asteriscommerce.com`. Not shared with Stripe, Cloudflare, or any other party.
- **Retention**: hashes are retained for 12 months. Older entries age out.
- **Opt-out by affiliate**: an affiliate can request their hashes be removed via [privacy@asteriscommerce.com](mailto:privacy@asteriscommerce.com).

## Effectiveness

The blacklist only grows. New Asteris stores join with zero contributions but full access to the existing list. Over time, the network effect makes early fraud signals widely catchable.

## Falsy positives

If the blacklist incorrectly flags a legitimate affiliate, contact us via [fraud-appeal@asterisaffiliates.com](mailto:fraud-appeal@asterisaffiliates.com). We review every appeal and remove false positives from the central list.

## Related

- [Self-referral prevention](/docs/fraud/self-referral)
- [IP throttling](/docs/fraud/ip-throttling)
- [Privacy Policy](/privacy)
