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
  const lang = useLanguageStore((s) => s.lang);
  const displayName = lang === "ar" ? (name_ar || name) : name;

  return (
    <Link href={`/category/${slug}`} className="group">
      <div className="relative rounded-xl overflow-hidden bg-gray-50 aspect-square flex items-center justify-center transition-all group-hover:shadow-lg">
        {image ? (
          <img
            src={image}
            alt={displayName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="text-4xl">🐾</div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-center">
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
