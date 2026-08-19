"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

interface CategoryCardProps {
  name: string;
  name_ar?: string;
  slug: string;
  image: string;
  count?: number;
}

export function CategoryCard({ name, name_ar, slug, image, count }: CategoryCardProps) {
  const lang = useLanguageStore((s) => (s.lang));
  const displayName = lang === "ar" ? (name_ar || name) : name;

  return (
    <Link href={`/category/${slug}`} className="group">
      <div className="category-card">
        <img
          src={image}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/placeholder-pet.png";
          }}
        />
        <div className="category-card-overlay" />
        <div className="category-card-label">
          <h3 className="font-bold text-sm">{displayName}</h3>
          {count !== undefined && (
            <p className="text-[10px] opacity-80">
              {count} {lang === "ar" ? "منتج" : "products"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
