"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

interface PromoBanner {
  id: string;
  title_en: string;
  title_ar: string;
  href: string;
  image: string;
}

let cachedBanners: PromoBanner[] | null = null;

async function loadBanners(): Promise<PromoBanner[]> {
  if (cachedBanners) return cachedBanners;
  const mod = await import("@/data/banners.json");
  cachedBanners = mod.default.two_promo_banners;
  return cachedBanners;
}

export function TwoBannerRow() {
  const lang = useLanguageStore((s) => s.lang);
  const [banners, setBanners] = useState<PromoBanner[]>([]);

  useEffect(() => {
    loadBanners().then(setBanners);
  }, []);

  if (banners.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <Link key={banner.id} href={banner.href} className="block">
            <div className="promo-banner">
              <img
                src={banner.image}
                alt={lang === "ar" ? banner.title_ar : banner.title_en}
                className="promo-banner-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/placeholder-banner.jpg";
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
