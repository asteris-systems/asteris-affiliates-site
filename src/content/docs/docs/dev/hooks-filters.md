---
title: Hooks + filters
description: Action hooks fired by Asteris Affiliates + filter hooks for customisation.
---

The extensibility surface in v1.1.0.

## Action hooks

### Commission lifecycle

| Hook | Args | Fires when |
|---|---|---|
| `asteris_aff_commission_created` | `$commission_id, $affiliate_id, $amount_cents, $order` | After primary commission insert. `Tier2_Engine` listens to credit tier-2. |
| `asteris_aff_commission_changed` | `$affiliate_id` | After any commission mutate. `Aggregates_Service` listens. |
| `asteris_aff_commission_approved` | `$commission_id, $affiliate_id` | When commission moves from `pending` to `approved`. |
| `asteris_aff_commission_revoked` | `$commission_id, $reason` | When commission is reversed (refund, manual). |

### Payout lifecycle

| Hook | Args | Fires when |
|---|---|---|
| `asteris_aff_payout_created` | `$payout_id, $affiliate, $total_cents` | New payout queued. `PayPal_API` listens. |
| `asteris_aff_payout_completed` | `$payout_id, $affiliate, $method` | Payout marked paid. |
| `asteris_aff_payout_failed` | `$payout_id, $affiliate, $error_message` | Payout marked failed. |

### Affiliate lifecycle

| Hook | Args | Fires when |
|---|---|---|
| `asteris_aff_affiliate_created` | `$affiliate_id, $request_data` | New affiliate signup (before approval). |
| `asteris_aff_affiliate_approved` | `$affiliate_id` | Approval. |
| `asteris_aff_affiliate_suspended` | `$affiliate_id, $reason` | Suspension. |

### Cron tags

| Tag | Frequency |
|---|---|
| `asteris_aff_recompute_daily` | Daily — aggregate sweep |
| `asteris_aff_cloud_fraud_sync` | Daily — cloud-assist signal exchange |
| `asteris_aff_payout_batch` | Per configured schedule |

## Filter hooks

### Commission calculation

```php
// Override the resolved per-order rate (per-product / per-affiliate / default cascade)
apply_filters( 'asteris_aff_resolved_rate_bp', $rate_bp, $order, $affiliate, $year )

// Override commissionable subtotal (e.g. exclude specific products)
apply_filters( 'asteris_aff_commissionable_subtotal', $subtotal, $order )
```

### Email throttling

```php
// Override daily cap per template per recipient
apply_filters( 'asteris_aff_email_daily_cap', $cap, $template_slug, $recipient )
```

### AI swipe-copy

```php
// Hand prompt to your AI module — return generated string or null to fall back to seed snippet
apply_filters( 'asteris_ai_generate_text', $generated_text, $prompt, $context )
```

### Fraud signals

```php
// Custom fraud signal hashing
apply_filters( 'asteris_aff_fraud_signal_hash', $sha256_hash, $raw_identifier, $signal_type )
```

### Adapter registration

```php
// Action to register a custom Order_Source adapter
do_action( 'asteris_aff_register_adapter', $adapter_instance );
```

## Example: notify Slack on every new commission

```php
add_action( 'asteris_aff_commission_created', function( $commission_id, $affiliate_id, $amount_cents, $order ) {
  wp_remote_post( SLACK_WEBHOOK_URL, [
    'body' => wp_json_encode([
      'text' => sprintf( 'New commission: $%.2f to affiliate %d on order %d', $amount_cents / 100, $affiliate_id, $order->get_id() ),
    ]),
  ]);
}, 10, 4 );
```

## Related

- [REST API](/docs/dev/rest-api)
- [WP-CLI commands](/docs/dev/wp-cli)
- [Custom cart adapter](/docs/integrations/custom-adapter)
