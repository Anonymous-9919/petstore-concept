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
        {/* Desktop: all messages in one centered line, separated by | (PetCentral) */}
        <div className="announcement-text hidden md:flex">
          {announcements.map((key, i) => (
            <span key={key} className="flex items-center whitespace-nowrap">
              {i > 0 && <span className="announcement-sep mx-3">|</span>}
              <span>{t(key, lang)}</span>
            </span>
          ))}
        </div>

        {/* Mobile: one rotating message at a time */}
        <div className="announcement-text md:hidden justify-center text-center">
          <span className="truncate">{t(announcements[current], lang)}</span>
        </div>
      </div>
    </div>
  );
}
