import type { Product, Category, StoreSettings } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_WC_API_URL || "https://petstorekw.com/wp-json/wc/v3";

// --- WooCommerce API Adapter ---
// Future: Replace with real API calls when backend is ready

export async function fetchProducts(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  sort?: string;
}): Promise<{ products: Product[]; total: number; totalPages: number }> {
  // TODO: Replace with real API
  // const query = new URLSearchParams();
  // if (params?.page) query.set("page", String(params.page));
  // if (params?.per_page) query.set("per_page", String(params.per_page));
  // if (params?.category) query.set("category", params.category);
  // if (params?.search) query.set("search", params.search);
  //
  // const res = await fetch(`${API_BASE}/products?${query}`, {
  //   headers: {
  //     Authorization: `Basic ${btoa(`${NEXT_PUBLIC_WC_KEY}:${NEXT_PUBLIC_WC_SECRET}`)}`,
  //   },
  // });
  // const total = parseInt(res.headers.get("X-WP-Total") || "0", 10);
  // const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "0", 10);
  // const products = await res.json();
  // return { products, total, totalPages };

  const products = await import("@/data/products.json");
  let filtered = products.default as Product[];

  if (params?.category) {
    filtered = filtered.filter((p) =>
      p.categories?.some((c) => c.slug === params.category)
    );
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const perPage = params?.per_page || 24;
  const page = params?.page || 1;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  return { products: paged, total, totalPages: Math.ceil(total / perPage) };
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const products = await import("@/data/products.json");
  const all = products.default as Product[];
  return all.find((p) => p.slug === slug) || null;
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const products = await import("@/data/products.json");
  const all = products.default as Product[];
  return all.find((p) => p.id === id) || null;
}

export async function fetchCategories(): Promise<Category[]> {
  const cats = await import("@/data/categories.json");
  return cats.default as Category[];
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await import("@/data/categories.json");
  const all = cats.default as Category[];
  return all.find((c) => c.slug === slug) || null;
}

export async function fetchProductsByCategory(
  categorySlug: string,
  page = 1,
  perPage = 24
): Promise<{ products: Product[]; total: number; totalPages: number }> {
  return fetchProducts({ page, per_page: perPage, category: categorySlug });
}

export async function fetchFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await import("@/data/products.json");
  const all = products.default as Product[];
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function fetchSaleProducts(limit = 12): Promise<Product[]> {
  const products = await import("@/data/products.json");
  const all = products.default as Product[];
  return all.filter((p) => p.on_sale).slice(0, limit);
}

export async function fetchRelatedProducts(productId: number, categoryIds: number[], limit = 4): Promise<Product[]> {
  const products = await import("@/data/products.json");
  const all = products.default as Product[];
  return all
    .filter(
      (p) =>
        p.id !== productId &&
        p.categories?.some((c) => categoryIds.includes(c.id))
    )
    .slice(0, limit);
}

export async function fetchStoreSettings(): Promise<StoreSettings> {
  const store = await import("@/data/store.json");
  return store.default as StoreSettings;
}
