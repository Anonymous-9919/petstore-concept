"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";

interface BannerConfig {
  id: string;
  href: string;
  image: string;
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
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <Link href={banner.href} className="block">
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
    </section>
  );
}
