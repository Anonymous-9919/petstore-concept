"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

interface AccessoryBanner {
  id: string;
  title_en: string;
  title_ar: string;
  href: string;
  image: string;
}

let cachedBanners: AccessoryBanner[] | null = null;

export function AccessoryBanners() {
  const lang = useLanguageStore((s) => s.lang);
  const [banners, setBanners] = useState<AccessoryBanner[]>([]);

  useEffect(() => {
    import("@/data/banners.json").then((mod) => {
      if (!cachedBanners) {
        cachedBanners = mod.default.accessory_banners;
      }
      setBanners(cachedBanners);
    });
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
