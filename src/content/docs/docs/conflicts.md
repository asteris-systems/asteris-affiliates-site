---
title: "Asteris Affiliates — Plugin conflicts"
description: "Known Asteris Affiliates plugin conflicts and how to resolve them. What to do if a module breaks after installing another plugin."
---
# Asteris Affiliates — Plugin conflicts

---

## How to diagnose a conflict

If an Asteris Affiliates module stops working after installing another plugin:

1. Deactivate the recently-installed plugin
2. Check if the Asteris Affiliates module works again
3. If yes: the deactivated plugin is causing the conflict
4. Email support@ with both plugin names and the symptom — we'll investigate

---

## Known co-existing plugins (no conflict)

- Yoast SEO (Asteris Affiliates SEO module steps aside if Yoast is active)
- Rank Math (same behaviour as Yoast)
- WooCommerce Subscriptions (co-exists without conflict)
- WP Rocket, WP Super Cache, LiteSpeed Cache (caching plugins — clear cache after enabling/disabling modules)
- Elementor, Beaver Builder, Bricks (page builders — Asteris Affiliates modules work within page-builder-built pages)
- WPML, Polylang (untested at v1.0 — community reports suggest compatibility)

---

## Known incompatibilities at v1.0

None confirmed at launch. Community-reported conflicts are documented here as they're verified.

If you're experiencing a conflict not listed here, email support@ — this page is updated as issues are confirmed and resolved.

---

## HPOS and Block Cart compatibility

Asteris Affiliates declares HPOS compatibility and Block Cart compatibility at the plugin level. Per-module verification is in progress for the 4 order-touching modules (PDF Invoices, Sequential Orders, Quote, Back-in-Stock) and the 4 cart-interaction modules (Side Cart, Free Shipping Bar, Trust Badges in cart, Stock Urgency in cart).

Until per-module verification is complete, stores on Block Cart should verify the cart-interaction modules work as expected on their install. Email support@ if you encounter issues.

[Troubleshooting →](/docs/troubleshooting) · [Support →](/support)

---

# MODULE DOCUMENTATION — ALL 19