---
title: REST API
description: REST endpoints for stats, affiliates, commissions, payouts. Cursor-paginated, transient-cached.
---

Asteris Affiliates ships a REST API for headless dashboards, mobile apps, and integrations. All endpoints require authentication.

## Authentication

Two methods supported:

- **WordPress application passwords** — recommended for server-to-server (admin → external dashboard)
- **JWT** (via plugin) — recommended for mobile apps where affiliates log in directly

Set the `Authorization` header:

```
Authorization: Bearer <token>
```

Or basic auth with WP credentials.

## Base URL

`https://yoursite.com/wp-json/asteris-aff/v1/`

## Endpoints (v1.1.0)

### Affiliates

- `GET /affiliates` — list (cursor-paginated)
- `GET /affiliates/{id}` — single
- `POST /affiliates` — create
- `PATCH /affiliates/{id}` — update (status, payout method, etc.)
- `DELETE /affiliates/{id}` — only if no commission history

### Commissions

- `GET /commissions` — list (cursor-paginated, filter by affiliate, status, date range)
- `GET /commissions/{id}` — single
- `PATCH /commissions/{id}` — admin only (approve, reject, revoke)

### Payouts

- `GET /payouts` — list batches
- `GET /payouts/{id}` — batch details
- `POST /payouts/run-batch` — trigger new batch (admin only)

### Stats (most used)

- `GET /stats/affiliate/{id}` — single affiliate's lifetime stats (denormalised aggregates, sub-50ms response)
- `GET /stats/dashboard` — admin dashboard summary (cached 60s)
- `GET /stats/top-affiliates?period=30d&limit=10` — leaderboard

### Vanity links

- `GET /vanity/{handle}` — landing page config
- `POST /vanity` — create new vanity URL

## Pagination

Cursor-based, not offset-based:

```json
{
  "data": [...],
  "next_cursor": "eyJpZCI6MTIzfQ==",
  "has_more": true
}
```

Pass `?cursor=...` on the next request.

## Rate limits

- **Read endpoints** — 600 req/min/user
- **Write endpoints** — 60 req/min/user
- **Bulk write** — 10 req/min/user

429 returned above limits.

## Caching

Stats endpoints are transient-cached for 60 seconds. Add `?fresh=1` to bypass (admin only).

## Schema

OpenAPI 3.1 spec at `https://yoursite.com/wp-json/asteris-aff/v1/openapi.json`.

## Related

- [WP-CLI commands](/docs/dev/wp-cli)
- [Hooks + filters](/docs/dev/hooks-filters)
