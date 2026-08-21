# WooCommerce / WordPress Migration Map

The site is intentionally **data-driven**: every piece of admin-editable content lives in
`src/data/*.json` and is consumed by components through small async loaders
(`loadSlides()`, `loadNavData()` in `src/components/home/*`, `src/components/layout/*`).

When the site moves to WordPress + WooCommerce, each JSON file maps to a native WP concept
so the admin can manage everything from the dashboard without touching component code:

| JSON file today          | WordPress / WooCommerce equivalent                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| `products.json`          | WooCommerce Products REST API (`/wp-json/wc/v3/products`)               |
| `categories.json`        | Woo product categories (`/wc/v3/products/categories`)                   |
| `nav-data.json`          | WP menu (`wp_nav_menu`) or ACF repeater on an options page              |
| `banners.json`           | ACF options page ("Banners") - repeater fields per section              |
|   `hero_slides[]`        | ACF repeater: image (desktop), image_mobile, link, titles (en/ar)       |
|   `category_banners[]`   | ACF repeater: image, title, link                                        |
|   `age_banners_*[]`      | ACF repeater per species group                                          |
| `store.json`             | Woo settings (currency) + ACF options (phone/whatsapp/socials/delivery) |
| `brands.json`            | Woo brands / product attributes (`pa_brand`)                            |
| `whatsapp.json`          | ACF options                                                             |

## Component contract (keep it stable)

- Components never import JSON statically inside render paths that need SSR speed;
  they use the cached dynamic-import loaders. Swapping those loaders for
  `fetch('/wp-json/...')` calls is a one-file change per component.
- All images are plain `<img src>` with full public URLs - works unchanged when
  assets move to the WP media library.
- Prices are formatted via `formatPrice(price, currencyCode, decimals)` from
  `src/lib/utils.ts` - currency lives in store config, matching Woo currency settings.
- Cart/wishlist state is client-side (zustand + localStorage). On migration,
  swap `addItem/updateQuantity/removeItem` implementations for Woo Store API
  cart endpoints (`/wp-json/wc/store/v1/cart/add-item`) - signatures already match.

## Rules going forward

1. Never hard-code banner/product/link strings in components - add them to the JSON.
2. Keep JSON field names stable; they become the ACF/meta keys.
3. Keep EN/AR pairs (`*_en` / `*_ar`) - maps to WPML/Polylang fields later.
