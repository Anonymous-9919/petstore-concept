"use client";

import { useState, useEffect } from "react";

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

  if (slides.length === 0) {
    return (
      <section className="section-spacing-small">
        <div className="page-container">
          <div className="hero-slider" style={{ backgroundColor: "#f3f4f6" }}>
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Loading...
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing-small">
      <div className="page-container">
        <div className="hero-slider">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`hero-slide ${idx === current ? "active" : ""}`}
            >
              <img
                src={s.image}
                alt={s.title_en || `Slide ${s.id}`}
                className="hero-slide-img"
              />
            </div>
          ))}

          {/* Dots - bottom center */}
          <div className="hero-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`hero-dot ${idx === current ? "active" : ""}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
