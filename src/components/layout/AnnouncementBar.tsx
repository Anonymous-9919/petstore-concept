"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Phone, Truck, Shield } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";

const announcements = ["announce.line1", "announce.line2", "announce.line3"];

export function AnnouncementBar() {
  const lang = useLanguageStore((s) => s.lang);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full text-[var(--color-text-inverse)] text-xs md:text-sm"
      style={{ backgroundColor: "var(--color-bg-announcement)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-1.5">
        {/* Trust info - desktop */}
        <div className="hidden md:flex items-center gap-6">
          <span className="flex items-center gap-1">
            <Phone size={14} />
            <span>{t("header.phone", lang)}: +965 98805010</span>
          </span>
          <span className="flex items-center gap-1">
            <Truck size={14} />
            <span>{t("announce.line2", lang)}</span>
          </span>
          <span className="flex items-center gap-1">
            <Shield size={14} />
            <span>{t("badge.secure_payment", lang)}</span>
          </span>
        </div>

        {/* Rotating text - mobile */}
        <div className="md:hidden flex-1 text-center font-medium">
          <span className="animate-fade-in" key={current}>
            {t(announcements[current], lang)}
          </span>
        </div>

        {/* Arrow navigation */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length)}
            className="p-0.5 hover:bg-white/20 rounded transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-[10px] opacity-70">
            {current + 1}/{announcements.length}
          </span>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % announcements.length)}
            className="p-0.5 hover:bg-white/20 rounded transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
