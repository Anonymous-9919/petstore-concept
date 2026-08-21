"use client";

import { useState, useEffect, useRef } from "react";

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
  image_mobile: string;
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
  const touchStartX = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    loadSlides().then(setSlides);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const goTo = (idx: number) => setCurrent((idx + slides.length) % slides.length);

  // Touch swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    pausedRef.current = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || slides.length < 2) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goTo(current + (delta < 0 ? 1 : -1));
      touchStartX.current = e.touches[0].clientX; // allow continuous swipes
    }
  };
  const onTouchEnd = () => {
    touchStartX.current = null;
    setTimeout(() => { pausedRef.current = false; }, 300);
  };

  if (slides.length === 0) {
    return (
      <section className="hero-section section-spacing-small">
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
    <section className="hero-section section-spacing-small">
      <div className="page-container">
        <div
          className="hero-slider"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`hero-slide ${idx === current ? "active" : ""}`}
            >
              {/* Full artwork on all viewports - box matches the art ratio,
                  so it fills every corner with zero crop (official-site behavior) */}
              <img
                src={s.image}
                alt={s.title_en || `Slide ${s.id}`}
                className="hero-slide-img"
                draggable={false}
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
