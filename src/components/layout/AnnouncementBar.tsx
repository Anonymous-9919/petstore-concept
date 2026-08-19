"use client";

import { useState, useEffect } from "react";
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
    <div className="announcement-bar">
      <div className="announcement-bar-inner">
        <div className="announcement-text flex items-center gap-3">
          <span>{t(announcements[current], lang)}</span>
          <span className="opacity-30">|</span>
          <span className="font-semibold">{lang === "ar" ? "توصيل مجاني" : "Free shipping on orders above KD 10!"}</span>
          <span className="opacity-30">|</span>
          <span>{lang === "ar" ? "عروض حصرية" : "Exclusive deals on top pet brands!"}</span>
        </div>
      </div>
    </div>
  );
}
