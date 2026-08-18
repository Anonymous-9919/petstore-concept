"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

function SearchContent() {
  const lang = useLanguageStore((s) => s.lang);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    import("@/data/products.json").then((mod) => {
      const all = mod.default as Product[];
      const q = query.toLowerCase();
      const filtered = all.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p as unknown as { ar_name?: string }).ar_name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.short_description?.toLowerCase().includes(q) ||
          p.categories?.some((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q))
      );
      setProducts(filtered);
      setLoading(false);
    });
  }, [query]);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {t("search.title", lang)}
      </h1>
      {query && (
        <p className="text-sm text-gray-500 mb-6">
          {t("search.results_for", lang)} &quot;{query}&quot; &mdash; {products.length} {t("category.products", lang)}
        </p>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-500">{t("general.loading", lang)}</div>
      ) : !query ? (
        <div className="text-center py-20">
          <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">{t("header.search_placeholder", lang)}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">{t("search.no_results", lang)}</p>
          <p className="text-sm text-gray-400 mt-1">{t("search.try_different", lang)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
