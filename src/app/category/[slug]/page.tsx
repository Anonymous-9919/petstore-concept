"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, X, ChevronDown, Grid3X3, List } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice, sortProducts } from "@/lib/utils";
import type { Product, SortOption, ViewMode } from "@/lib/types";

const categoryNames: Record<string, { en: string; ar: string }> = {
  "dog": { en: "Dog", ar: "الكلاب" },
  "cat": { en: "Cat", ar: "القطط" },
  "birds": { en: "Birds", ar: "الطيور" },
  "fish": { en: "Fish", ar: "الأسماك" },
  "small-pets": { en: "Small Pets", ar: "الحيوانات الصغيرة" },
  "shop-by-need": { en: "Shop By Need", ar: "تسوق حسب الحاجة" },
  "dog-dry-food": { en: "Dog Dry Food", ar: "طعام كلاب جاف" },
  "dog-wet-food": { en: "Dog Wet Food", ar: "طعام كلاب رطب" },
  "dog-treats": { en: "Dog Treats", ar: "مكافآت كلاب" },
  "dog-toys": { en: "Dog Toys", ar: "ألعاب كلاب" },
  "dog-accessories": { en: "Dog Accessories", ar: "اكسسوارات كلاب" },
  "cat-dry-food": { en: "Cat Dry Food", ar: "طعام قطط جاف" },
  "cat-wet-food": { en: "Cat Wet Food", ar: "طعام قطط رطب" },
  "cat-treats": { en: "Cat Treats", ar: "مكافآت قطط" },
  "cat-toys": { en: "Cat Toys", ar: "ألعاب قطط" },
  "cat-accessories": { en: "Cat Accessories", ar: "اكسسوارات قطط" },
  "cat-litter-and-boxes": { en: "Cat Litter & Boxes", ar: "تراب وصناديق قطط" },
  "cat-scratchers": { en: "Cat Scratchers", ar: "خداشات قطط" },
  "bird-food": { en: "Bird Food", ar: "طعام طيور" },
  "bird-toys": { en: "Bird Toys", ar: "ألعاب طيور" },
  "bird-cage": { en: "Bird Cage", ar: "أقفاص طيور" },
  "bird-needs-accessories": { en: "Bird Accessories", ar: "اكسسوارات طيور" },
  "fish-food": { en: "Fish Food", ar: "طعام أسماك" },
  "fish-needs-accessories": { en: "Fish Accessories", ar: "اكسسوارات أسماك" },
  "rabbit-needs-accessories": { en: "Rabbit", ar: "الأرانب" },
  "hamster-needs-accessories": { en: "Hamster", ar: "الهامستر" },
  "reptile-food": { en: "Reptile Food", ar: "طعام زواحف" },
  "reptile-needs-accessories": { en: "Reptile Accessories", ar: "اكسسوارات زواحف" },
  "pet-cage": { en: "Pet Cages", ar: "أقفاص حيوانات" },
  "pet-beds-houses": { en: "Pet Beds & Houses", ar: "أسرّة وبيوت" },
  "pets-carrier-travel-bags": { en: "Carrier & Travel Bags", ar: "حقائب سفر" },
  "healthcare-supplements": { en: "Healthcare & Supplements", ar: "المكملات الغذائية" },
  "grooming-hygiene": { en: "Grooming & Hygiene", ar: "العناية والنظافة" },
  "pet-milk": { en: "Pet Milk", ar: "حليب حيوانات" },
  "special-offer": { en: "Special Offers", ar: "عروض خاصة" },
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = useLanguageStore((s) => s.lang);
  const [slug, setSlug] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    import("@/data/products.json").then((mod) => {
      const all = mod.default as Product[];
      let filtered = all.filter((p) => {
        if (!p.categories || p.categories.length === 0) return false;
        // Match slug as category slug, or as pet type group
        if (p.categories.some((c) => c.slug === slug)) return true;
        // Group matching
        if (slug === "dog" && p.categories.some((c) => c.slug.startsWith("dog"))) return true;
        if (slug === "cat" && p.categories.some((c) => c.slug.startsWith("cat"))) return true;
        if (slug === "birds" && p.categories.some((c) => c.slug.startsWith("bird"))) return true;
        if (slug === "fish" && p.categories.some((c) => c.slug.startsWith("fish"))) return true;
        if (slug === "small-pets" && p.categories.some((c) =>
          ["rabbit", "hamster", "reptile", "pet-cage"].some(s => c.slug.includes(s))
        )) return true;
        return false;
      });
      setProducts(filtered);
      setLoading(false);
    });
  }, [slug]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (inStockOnly) {
      result = result.filter((p) => p.stock_status === "instock");
    }
    result = result.filter((p) => {
      const price = parseFloat(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    return sortProducts(result, sort);
  }, [products, sort, priceRange, inStockOnly]);

  const catName = categoryNames[slug] || { en: slug, ar: slug };

  // Breadcrumbs
  const breadcrumbs = [
    { label: t("breadcrumb.home", lang), href: "/" },
    { label: lang === "ar" ? catName.ar : catName.en, href: `/category/${slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {breadcrumbs.map((bc, i) => (
              <span key={bc.href} className="flex items-center gap-1">
                {i > 0 && <span>/</span>}
                <Link href={bc.href} className="hover:text-[var(--color-primary)] transition-colors">
                  {bc.label}
                </Link>
              </span>
            ))}
          </div>
        </div>

        {/* Title + controls */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {lang === "ar" ? catName.ar : catName.en}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredProducts.length} {t("category.products", lang)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm border border-[var(--color-border)] rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="featured">{t("sort.featured", lang)}</option>
                <option value="price_asc">{t("sort.price_asc", lang)}</option>
                <option value="price_desc">{t("sort.price_desc", lang)}</option>
                <option value="newest">{t("sort.newest", lang)}</option>
                <option value="name_asc">{t("sort.name_asc", lang)}</option>
                <option value="name_desc">{t("sort.name_desc", lang)}</option>
              </select>

              {/* View mode */}
              <div className="hidden md:flex border border-[var(--color-border)] rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-[var(--color-primary)] text-white" : "bg-white text-gray-500"}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-[var(--color-primary)] text-white" : "bg-white text-gray-500"}`}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>

              {/* Filter toggle - mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-1 text-sm border border-[var(--color-border)] rounded-lg px-3 py-2 bg-white"
              >
                <SlidersHorizontal size={14} />
                {t("category.filter", lang)}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
          <div className="flex gap-6">
            {/* Sidebar Filters - desktop */}
            <aside className={`w-64 flex-shrink-0 ${showFilters ? "block" : "hidden"} md:block`}>
              <div className="bg-white border border-[var(--color-border)] rounded-xl p-4 sticky top-36">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm">{t("category.filter", lang)}</h3>
                  <button onClick={() => setShowFilters(false)} className="md:hidden">
                    <X size={16} />
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    {t("category.price_range", lang)}
                  </h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder={t("category.min_price", lang)}
                      value={priceRange[0] || ""}
                      onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                      className="w-full text-sm border border-[var(--color-border)] rounded px-2 py-1.5"
                      step="0.5"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder={t("category.max_price", lang)}
                      value={priceRange[1] || ""}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 50])}
                      className="w-full text-sm border border-[var(--color-border)] rounded px-2 py-1.5"
                      step="0.5"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    {t("category.availability", lang)}
                  </h4>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{t("category.in_stock", lang)}</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center py-20 text-gray-500">{t("general.loading", lang)}</div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 mb-4">{t("category.no_products", lang)}</p>
                  <button
                    onClick={() => { setPriceRange([0, 50]); setInStockOnly(false); }}
                    className="btn-outline text-sm"
                  >
                    {t("category.clear_filters", lang)}
                  </button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                      : "grid grid-cols-1 md:grid-cols-2 gap-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
