---
title: Custom cart adapter
description: Write your own adapter against the Order_Source interface. Single file. Works for any cart, CRM, or invoice system.
---

If you sell via a cart system Asteris doesn't ship an adapter for, you can write your own in a single file by implementing the `Order_Source` interface.

## The interface

```php
namespace AsterisAffiliates\Adapters;

interface Order_Source {
  public function source_slug(): string;           // e.g. 'gumroad', 'lemonsqueezy'
  public function label(): string;                 // human label for admin UI
  public function on_order_completed( int $order_id, array $context ): void;
  public function on_order_refunded( int $order_id, float $refund_amount ): void;
  public function get_order_total( int $order_id ): float;
  public function get_order_currency( int $order_id ): string;
  public function get_order_email( int $order_id ): string;
  public function get_order_items( int $order_id ): array;
}
```

## Skeleton

Drop a file in `wp-content/plugins/your-adapter/your-adapter.php`:

```php
<?php
/**
 * Plugin Name: Asteris Affiliates — Gumroad Adapter
 */

add_action( 'plugins_loaded', function() {
  if ( ! class_exists( '\\AsterisAffiliates\\Adapters\\Order_Source' ) ) return;

  class Gumroad_Adapter implements \AsterisAffiliates\Adapters\Order_Source {
    public function source_slug(): string { return 'gumroad'; }
    public function label(): string { return 'Gumroad'; }

    public function on_order_completed( int $order_id, array $context ): void {
      // Look up affiliate attribution from cookie/URL param/Gumroad metadata
      // Call $GLOBALS['asteris_aff']->credit_commission( $affiliate_id, $order_id, $amount );
    }

    public function on_order_refunded( int $order_id, float $refund_amount ): void {
      $GLOBALS['asteris_aff']->revoke_commission( $order_id, $refund_amount );
    }

    public function get_order_total( int $order_id ): float { /* ... */ }
    public function get_order_currency( int $order_id ): string { /* ... */ }
    public function get_order_email( int $order_id ): string { /* ... */ }
    public function get_order_items( int $order_id ): array { /* ... */ }
  }

  // Register
  do_action( 'asteris_aff_register_adapter', new Gumroad_Adapter() );
} );
```

## Wire to your cart's hooks

The adapter is **inert** until you call `on_order_completed()` and `on_order_refunded()` from your cart's webhook handlers / hooks. Common patterns:

- **Webhook receiver** — register a REST endpoint, validate the signature, call the adapter methods
- **Plugin hook listener** — if your cart fires WordPress actions (e.g. `gumroad_purchase_complete`), hook into those

## Reference adapters

- WooCommerce adapter — `src/Adapters/WC_Adapter.php`
- EDD adapter — `src/Adapters/EDD_Adapter.php`
- Surecart adapter — `src/Adapters/Surecart_Adapter.php`

Read these for working examples.

## Submitting back

If you write an adapter for a cart system other stores use, consider submitting it as a PR to the [GitHub repo](https://github.com/asteris-systems/asteris-affiliates) (when public). We'll merge well-written adapters as official integrations.

## Related

- [REST API](/docs/dev/rest-api)
- [Hooks + filters](/docs/dev/hooks-filters)
