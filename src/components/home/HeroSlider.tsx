"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    loadSlides().then(setSlides);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  if (slides.length === 0) {
    return (
      <div className="hero-slider" style={{ backgroundColor: "#f3f4f6" }}>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="hero-slider">
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`hero-slide ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <img
            src={s.image}
            alt={s.title_en || `Slide ${s.id}`}
            className="hero-slide-img"
          />
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="hero-nav-btn left-4"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="hero-nav-btn right-4"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`hero-dot ${i === current ? "active bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
