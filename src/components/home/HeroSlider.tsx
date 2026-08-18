"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguageStore } from "@/lib/store";

const slides = [
  {
    id: 1,
    title_en: "Premium Pet Food",
    title_ar: "أعلاف حيوانات فاخرة",
    subtitle_en: "Shop top brands for your furry friends",
    subtitle_ar: "تسوق أفضل العلامات التجارية لأصدقائك",
    cta_en: "Shop Now",
    cta_ar: "تسوق الآن",
    href: "/category/cat-dry-food",
    gradient: "from-cyan-600 to-teal-700",
    emoji: "🐕",
  },
  {
    id: 2,
    title_en: "New Arrivals",
    title_ar: "وصل حديثاً",
    subtitle_en: "Discover the latest in pet supplies",
    subtitle_ar: "اكتشف أحدث مستلزمات الحيوانات",
    cta_en: "Explore",
    cta_ar: "استكشف",
    href: "/category",
    gradient: "from-orange-500 to-red-600",
    emoji: "🐈",
  },
  {
    id: 3,
    title_en: "Special Offers",
    title_ar: "عروض خاصة",
    subtitle_en: "Save big on your pet's favorites",
    subtitle_ar: "وفّر على مستلزمات حيوانك المفضلة",
    cta_en: "View Deals",
    cta_ar: "عرض العروض",
    href: "/category/special-offer",
    gradient: "from-violet-600 to-indigo-700",
    emoji: "🐠",
  },
];

export function HeroSlider() {
  const lang = useLanguageStore((s) => s.lang);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden">
      <div
        className={`bg-gradient-to-r ${slide.gradient} transition-all duration-700`}
        style={{ minHeight: "280px" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 flex items-center">
          <div className="flex-1 text-white">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-3 leading-tight animate-fade-in">
              {lang === "ar" ? slide.title_ar : slide.title_en}
            </h1>
            <p className="text-sm md:text-lg opacity-90 mb-4 md:mb-6 animate-fade-in">
              {lang === "ar" ? slide.subtitle_ar : slide.subtitle_en}
            </p>
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base animate-fade-in"
            >
              {lang === "ar" ? slide.cta_ar : slide.cta_en}
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center text-8xl lg:text-9xl opacity-20 select-none">
            {slide.emoji}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
