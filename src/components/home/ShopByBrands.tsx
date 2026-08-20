"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

interface Brand {
  id: number;
  name: string;
  slug: string;
  image?: string;
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
    <section className="section-spacing-small">
      <div className="page-container">
        <div className="section-heading-container">
          <h2 className="section-heading">
            {lang === "ar" ? "تسوق حسب البراندات الشهيرة" : "Shop by popular brands"}
          </h2>
        </div>
        <div className="brands-carousel-outer">
          <div ref={scrollRef} className="brands-carousel">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/collections/${brand.slug}`}
                className="brand-logo-item"
              >
                <div className="brand-logo-image">
                  {brand.image ? (
                    <img src={brand.image} alt={brand.name} />
                  ) : (
                    <span className="brand-logo-text">{brand.name}</span>
                  )}
                </div>
                <p className="brand-logo-name">{brand.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="section-btn-container">
          <Link href="/category" className="btn-small">
            {lang === "ar" ? "عرض الكل" : "Show All"}
          </Link>
        </div>
      </div>
    </section>
  );
}
