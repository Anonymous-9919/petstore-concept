"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

interface AgeBanner {
  id: string;
  title_en: string;
  title_ar: string;
  href: string;
  image: string;
}

interface AgeBannerRowProps {
  type: "dog" | "cat";
}

let cachedBannersDog: AgeBanner[] | null = null;
let cachedBannersCat: AgeBanner[] | null = null;

export function AgeBannerRow({ type }: AgeBannerRowProps) {
  const lang = useLanguageStore((s) => s.lang);
  const [banners, setBanners] = useState<AgeBanner[]>([]);

  useEffect(() => {
    import("@/data/banners.json").then((mod) => {
      const data = mod.default;
      const key = type === "dog" ? "age_banners_dog" : "age_banners_cat";
      let cache = type === "dog" ? cachedBannersDog : cachedBannersCat;
      if (!cache) {
        cache = data[key] || [];
        if (type === "dog") cachedBannersDog = cache;
        else cachedBannersCat = cache;
      }
      setBanners(cache);
    });
  }, [type]);

  if (banners.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="promo-banner-text">
                <h3>{lang === "ar" ? banner.title_ar : banner.title_en}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
