"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Brand {
  id: number;
  name: string;
  slug: string;
}

let cachedBrands: Brand[] | null = null;

async function loadBrands(): Promise<Brand[]> {
  if (cachedBrands) return cachedBrands;
  const mod = await import("@/data/brands.json");
  cachedBrands = mod.default.brands;
  return cachedBrands;
}

export function ShopByBrands() {
  const lang = useLanguageStore((s) => s.lang);
  const [brands, setBrands] = useState<Brand[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadBrands().then(setBrands);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (brands.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          {t("home.shop_by_brands", lang)}
        </h2>
        <Link
          href="/category"
          className="text-sm font-semibold flex items-center gap-1 hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          {t("home.view_all", lang)} <ChevronRight size={14} />
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="brands-carousel mx-[-12px]"
        >
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/collections/${brand.slug}`}
              className="brand-logo block"
            >
              <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-orange-50 to-white border border-gray-100 rounded-lg transition-all">
                <span className="brand-logo-text">{brand.name}</span>
              </div>
            </Link>
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
