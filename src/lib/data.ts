import type { Product } from "./types";

/**
 * Single data source for products.
 *
 * TODAY: static JSON (current concept build).
 * WOOCOMMERCE: replace the two implementations below with:
 *   - getAllProducts(): fetch("/wp-json/wc/v3/products?per_page=100", { auth })
 *   - getProductBySlug(slug): fetch(`/wp-json/wc/v3/products?slug=${slug}`)
 * and map Woo fields -> Product (name, prices, images[], categories[],
 * stock_status, on_sale). Nothing else in the app changes.
 */

let cacheAll: Product[] | null = null;

export async function getAllProducts(): Promise<Product[]> {
  if (cacheAll) return cacheAll;
  const mod = await import("@/data/products.json");
  const raw = mod.default as unknown as Product[] | { products: Product[] };
  cacheAll = Array.isArray(raw) ? raw : raw.products;
  return cacheAll;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) || null;
}
