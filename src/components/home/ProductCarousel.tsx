"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

interface ProductCarouselProps {
  titleKey: string;
  collectionSlug: string;
  productCount?: number;
}

export function ProductCarousel({ titleKey, collectionSlug, productCount = 8 }: ProductCarouselProps) {
  const lang = useLanguageStore((s) => s.lang);
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("@/data/products.json").then((mod) => {
      const all = mod.default as Product[];
      const filtered = all.filter(p => {
        if (p.stock_status !== "instock") return false;
        if (!collectionSlug) return true;
        return p.categories?.some(c => c.slug === collectionSlug || c.slug.startsWith(collectionSlug.split("-")[0]));
      }).slice(0, productCount);
      setProducts(filtered);
    });
  }, [collectionSlug, productCount]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          {t(titleKey, lang)}
        </h2>
        <Link
          href={`/collections/${collectionSlug}`}
          className="text-sm font-semibold flex items-center gap-1 hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          {t("home.view_all", lang)} →
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[calc(25%-1rem)] md:min-w-[calc(20%-1rem)] lg:min-w-[calc(16.666%-1rem)]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
