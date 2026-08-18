"use client";

import { useEffect } from "react";
import { useThemeStore, useLanguageStore } from "@/lib/store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  const lang = useLanguageStore((s) => s.lang);

  useEffect(() => {
    const root = document.documentElement;
    root.className = `theme-${theme}`;
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.setAttribute("lang", lang);
  }, [theme, lang]);

  return <>{children}</>;
}
