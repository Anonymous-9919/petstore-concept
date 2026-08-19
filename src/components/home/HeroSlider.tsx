"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguageStore } from "@/lib/store";

interface Slide {
  id: number;
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  cta_en: string;
  cta_ar: string;
  href: string;
  image: string;
}

let cachedSlides: Slide[] | null = null;

async function loadSlides(): Promise<Slide[]> {
  if (cachedSlides) return cachedSlides;
  const mod = await import("@/data/banners.json");
  cachedSlides = mod.default.hero_slides;
  return cachedSlides;
}

export function HeroSlider() {
  const lang = useLanguageStore((s) => s.lang);
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    loadSlides().then(setSlides);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  if (slides.length === 0) {
    return (
      <div className="relative overflow-hidden bg-gray-200 animate-pulse" style={{ height: "280px" }}>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden hero-slider">
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={s.image}
            alt={lang === "ar" ? s.title_ar : s.title_en}
            className="hero-slide-img"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/placeholder-banner.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-3 leading-tight">
                {lang === "ar" ? s.title_ar : s.title_en}
              </h1>
              <p className="text-sm md:text-lg opacity-90 mb-4 md:mb-6">
                {lang === "ar" ? s.subtitle_ar : s.subtitle_en}
              </p>
              <Link
                href={s.href}
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
              >
                {lang === "ar" ? s.cta_ar : s.cta_en}
              </Link>
            </div>
          </div>
        </div>
      ))}

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
