"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/lib/store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);

  useEffect(() => {
    const root = document.documentElement;
    root.className = "theme-orange";
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.setAttribute("lang", lang);
  }, [lang]);

  return <>{children}</>;
}
