---
title: "WordPress Multisite support"
description: "Asteris Affiliates does not officially support WordPress Multisite at v1.0. Planned for v1.1. Here's the workaround for v1.0 multisite operators and the timeline."
---

# WordPress Multisite

**Asteris Affiliates does NOT officially support WordPress Multisite at v1.0.** Planned for **v1.1** (6–12 weeks post-v1.0 launch).

This is a deliberate scope-limit. Multisite licence-activation is materially different from single-site (per-network vs per-subsite, network-admin vs subsite-admin, HPOS interaction with separate WC tables per subsite). Rushing multisite support into v1.0 risked shipping partial coverage that would fail unpredictably for the subset of customers running multisite. The honest call was to defer + ship it properly in v1.1.

---

## What this means in practice

### If you're running standard single-site WordPress

Ignore this page entirely. Asteris works the way you expect.

### If you're running a multisite network (subdomain or subdirectory)

You can install Asteris but the following caveats apply:

- **Each subsite consumes one activation slot from your tier limit.** Starter (1 site) would only work on one subsite. Pro (3 sites) covers 3 subsites. Agency (unlimited) covers all subsites — but each subsite still activates individually.
- **Network-admin licensing is not tested at v1.0.** Don't expect "activate Asteris for the whole network" to work cleanly. Activate per-subsite via each subsite's WP admin.
- **HPOS multisite interaction is not tested.** Each subsite has its own WC orders table; the licence-activation layer hasn't been verified against this configuration.
- **Bug reports for multisite-specific issues will NOT receive fixes until v1.1.** This is documented in the EULA at §11. If you install on multisite at v1.0 and something breaks specifically because of the multisite configuration, that's outside the supplied-functionality envelope under Australian Consumer Law s260 — your standard refund window still applies (14 days), but ongoing bug-fix support for multisite-specific issues waits for v1.1.

### If you're an agency with multisite clients

We don't recommend deploying Asteris to your multisite clients at v1.0. Either:
1. Wait for v1.1 (6–12 weeks post-launch — see [/roadmap](/roadmap))
2. Or run Asteris on each client's main subsite only, treating other subsites as separate licence activations

---

## What v1.1 multisite support will include

- Per-subsite licence activation working cleanly through network admin
- "Activate for whole network" option (uses up to your tier's activation count)
- HPOS interaction verified across multisite WC tables
- Network-admin UI for the Modules page (toggle modules at network level, override per-subsite)
- Multisite-specific bug-fix support included in standard SLA
- Tested against the four most common multisite scenarios: subdomain, subdirectory, mapped-domain, and large-scale (50+ subsite) networks

---

## Contact before purchase

If you run a multisite network and need official support before v1.1 ships, **email support@asterisaffiliates.com before purchase** so we can discuss your specific configuration. We may be able to offer a partial workaround (e.g. Agency tier with a slot reserved for multisite testing) but cannot promise multisite-specific bug fixes until v1.1.

---

## See also

- [Pricing + tiers](/pricing) — tier activation counts
- [Licensing details](/docs/licensing) — how activation works in single-site mode
- [EULA §11 Multisite](/license#11-wordpress-multisite)
- [Roadmap](/roadmap) — v1.1 timeline
