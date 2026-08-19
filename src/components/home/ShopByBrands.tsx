"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

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

  if (brands.length === 0) return null;

  return (
    <section className="py-6">
      <div className="page-container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {lang === "ar" ? "تسوق حسب البراندات الشهيرة" : "Shop by popular brands"}
          </h2>
          <Link
            href="/category"
            className="text-sm font-semibold hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            {lang === "ar" ? "عرض الكل" : "Show All"} →
          </Link>
        </div>
        <div
          ref={scrollRef}
          className="brands-carousel"
        >
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/collections/${brand.slug}`}
              className="brand-logo block"
            >
              <div className="w-44 h-44 flex items-center justify-center bg-white border border-gray-100 rounded-full hover:shadow-md transition-all">
                <span className="brand-logo-text text-center px-2">{brand.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
