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
  image_mobile: string;
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
    <section className="section-spacing-small">
      <div className="page-container">
        <div className="age-banner-grid">
          {banners.map((banner) => (
            <Link key={banner.id} href={banner.href} className="block">
              <div className="promo-banner">
                <picture>
                  <source media="(max-width: 992px)" srcSet={banner.image_mobile} />
                  <img
                    src={banner.image}
                    alt={lang === "ar" ? banner.title_ar : banner.title_en}
                    className="promo-banner-img filter-purple-to-orange"
                  />
                </picture>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
