"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

interface BannerConfig {
  id: string;
  href: string;
  image: string;
  image_mobile: string;
  title_en: string;
  title_ar: string;
}

let cachedBanner: BannerConfig | null = null;

async function loadBanner(): Promise<BannerConfig> {
  if (cachedBanner) return cachedBanner;
  const mod = await import("@/data/banners.json");
  cachedBanner = mod.default.main_banner;
  return cachedBanner;
}

export function MainBanner() {
  const lang = useLanguageStore((s) => s.lang);
  const [banner, setBanner] = useState<BannerConfig | null>(null);

  useEffect(() => {
    loadBanner().then(setBanner);
  }, []);

  if (!banner) return null;

  return (
    <section className="section-spacing-medium">
      <div className="page-container">
        <Link href={banner.href} className="block main-banner">
          <div className="promo-banner">
            <picture>
              <source media="(max-width: 992px)" srcSet={banner.image_mobile} />
              <img
                src={banner.image}
                alt={lang === "ar" ? banner.title_ar : banner.title_en}
                className="promo-banner-img"
              />
            </picture>
          </div>
        </Link>
      </div>
    </section>
  );
}
