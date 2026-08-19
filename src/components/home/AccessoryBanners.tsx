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
    <section className="section-spacing-small">
      <div className="page-container">
        <div className="accessory-banner-grid">
          {banners.map((banner) => (
            <Link key={banner.id} href={banner.href} className="block">
              <div className="promo-banner">
                <img
                  src={banner.image}
                  alt={lang === "ar" ? banner.title_ar : banner.title_en}
                  className={`promo-banner-img${banner.image.includes("/assets/pc-") ? " filter-purple-to-orange" : ""}`}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
