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
      const seenImages = new Set();
      const filtered = all
        .filter(p => {
          if (p.stock_status !== "instock") return false;
          if (!collectionSlug) return true;
          return p.categories?.some(c => c.slug === collectionSlug || c.slug.startsWith(collectionSlug.split("-")[0]));
        })
        .filter(p => {
          const imgSrc = p.images?.[0]?.src;
          if (seenImages.has(imgSrc)) return false;
          seenImages.add(imgSrc);
          return true;
        })
        .slice(0, productCount);
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
    <section className="section-spacing-medium">
      <div className="page-container">
        <div className="product-carousel-header">
          <h2 className="product-carousel-title">
            {t(titleKey, lang)}
          </h2>
          <Link
            href={`/collections/${collectionSlug}`}
            className="product-carousel-link"
          >
            {t("home.view_all", lang)} →
          </Link>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="product-carousel-track"
          >
            {products.map((product) => (
              <div key={product.id} className="product-carousel-item">
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
      </div>
    </section>
  );
}
