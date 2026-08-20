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
  image_mobile: string;
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
    <section className="section-spacing-small">
      <div className="page-container">
        <div className="two-promo-grid">
          {banners.map((banner) => (
            <Link key={banner.id} href={banner.href} className="block">
              <div className="promo-banner">
                <picture>
                  <source media="(max-width: 992px)" srcSet={banner.image_mobile} />
                  <img
                    src={banner.image}
                    alt={lang === "ar" ? banner.title_ar : banner.title_en}
                    className={`promo-banner-img${banner.image.includes("/assets/pc-") ? " filter-purple-to-orange" : ""}`}
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
