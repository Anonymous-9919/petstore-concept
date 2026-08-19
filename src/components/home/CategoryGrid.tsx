"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { CategoryCard } from "@/components/category/CategoryCard";

interface CategoryConfig {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  image: string;
}

let cachedCategories: CategoryConfig[] | null = null;

async function loadCategories(): Promise<CategoryConfig[]> {
  if (cachedCategories) return cachedCategories;
  const mod = await import("@/data/banners.json");
  cachedCategories = mod.default.category_banners;
  return cachedCategories;
}

export function CategoryGrid() {
  const lang = useLanguageStore((s) => s.lang);
  const [categories, setCategories] = useState<CategoryConfig[]>([]);

  useEffect(() => {
    loadCategories().then(setCategories);
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="section-spacing-small">
      <div className="page-container">
        <div className="section-heading-container">
          <h2 className="section-heading">
            {t("home.explore_categories", lang)}
          </h2>
        </div>

        <div className="category-grid">
          {categories.map((cat: CategoryConfig) => (
            <CategoryCard
              key={cat.id}
              name={cat.title_en}
              name_ar={cat.title_ar}
              slug={cat.slug}
              image={cat.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
