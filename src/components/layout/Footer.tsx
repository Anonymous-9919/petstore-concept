"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export function Footer() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <footer style={{ backgroundColor: "var(--color-bg-footer)" }} className="text-[var(--color-text-inverse)]">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">{t("footer.newsletter", lang)}</h3>
              <p className="text-sm opacity-80">{t("footer.newsletter_text", lang)}</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder={t("footer.email_placeholder", lang)}
                className="flex-1 md:w-72 px-4 py-2 rounded-l-lg text-sm text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-r-lg font-semibold text-sm transition-colors flex items-center gap-1"
              >
                <Send size={14} />
                {t("footer.subscribe", lang)}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>PS</span>
              </div>
              <div className="font-bold text-base">PET STORE</div>
            </div>
            <p className="text-sm opacity-80 mb-4 leading-relaxed">{t("footer.about_text", lang)}</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/petstore.kw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/96598805010"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">{t("footer.quick_links", lang)}</h4>
            <ul className="space-y-2">
              {[
                { label: "footer.about_us", href: "/about" },
                { label: "footer.contact", href: "/contact" },
                { label: "footer.delivery_info", href: "/delivery-info" },
                { label: "footer.privacy_policy", href: "/privacy" },
                { label: "footer.terms", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {t(link.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop by Pet */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">{t("footer.shop_by_pet", lang)}</h4>
            <ul className="space-y-2">
              {[
                { label: "footer.all_pets", href: "/category" },
                { label: "footer.dogs", href: "/category/dog" },
                { label: "footer.cats", href: "/category/cat" },
                { label: "footer.birds", href: "/category/birds" },
                { label: "footer.fish", href: "/category/fish" },
                { label: "footer.small_pets_footer", href: "/category/small-pets" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {t(link.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">{t("footer.contact_us", lang)}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+96598805010" className="hover:underline">+965 98805010</a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:petstorekw@gmail.com" className="hover:underline">petstorekw@gmail.com</a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>{lang === "ar" ? "الكويت" : "Kuwait"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs opacity-70">
            <p>&copy; {new Date().getFullYear()} Pet Store. {t("footer.rights", lang)}</p>
            <p>{t("announce.line1", lang)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
