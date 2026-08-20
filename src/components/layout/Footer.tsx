"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export function Footer() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <footer className="site-footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div>
            <h3 className="font-bold text-lg mb-1">{t("footer.newsletter", lang)}</h3>
            <p className="text-sm opacity-80">{t("footer.newsletter_text", lang)}</p>
          </div>
          <form className="footer-newsletter-form">
            <input
              type="email"
              placeholder={t("footer.email_placeholder", lang)}
              className="footer-newsletter-input"
            />
            <button type="submit" className="footer-newsletter-btn">
              <Send size={14} />
              {t("footer.subscribe", lang)}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* About + Social */}
          <div className="footer-block-1">
            <div className="footer-about">
              <span className="text-xl font-extrabold tracking-tight">PET STORE</span>
            </div>
            <p className="footer-about-text">{t("footer.about_text", lang)}</p>
            <p className="footer-social-heading">{t("footer.follow_us", lang)}</p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/petstore.kw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/96598805010"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/petstore.kw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@petstore.kw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>

          {/* Pet Food Categories */}
          <div className="footer-column footer-block-2">
            <h4>{lang === "ar" ? "فئات طعام الحيوانات" : "Pet Food Category"}</h4>
            <ul>
              {[
                { label: lang === "ar" ? "طعام الكلاب" : "Dog Food", href: "/category/dog-dry-food" },
                { label: lang === "ar" ? "طعام القطط" : "Cat Food", href: "/category/cat-dry-food" },
                { label: lang === "ar" ? "طعام الأسماك" : "Fish Food", href: "/category/fish-dry-food" },
                { label: lang === "ar" ? "طعام الطيور" : "Bird Food", href: "/category/parrot-food" },
                { label: lang === "ar" ? "مكافآت الكلاب" : "Dog Treats", href: "/category/dog-dental-treat" },
                { label: lang === "ar" ? "مكافآت القطط" : "Cat Treats", href: "/category/cat-lickable-treats" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="footer-column footer-block-3">
            <h4>{lang === "ar" ? "روابط مفيدة" : "Useful Links"}</h4>
            <ul>
              {[
                { label: lang === "ar" ? "سلة التسوق" : "View Cart", href: "/cart" },
                { label: lang === "ar" ? "قائمة الأمنيات" : "My Wishlist", href: "/wishlist" },
                { label: lang === "ar" ? "من نحن" : "About Us", href: "/about" },
                { label: lang === "ar" ? "اتصل بنا" : "Contact Us", href: "/contact" },
                { label: "Sitemap", href: "/sitemap.xml" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-column footer-block-4">
            <h4>{lang === "ar" ? "خدماتنا" : "Our Services"}</h4>
            <ul>
              {[
                { label: lang === "ar" ? "معلومات التوصيل" : "Delivery Information", href: "/delivery-info" },
                { label: lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy", href: "/privacy" },
                { label: lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions", href: "/terms" },
                { label: lang === "ar" ? "المرجع/الاسترداد/الإلغاء" : "Return / Refund / Cancellation", href: "/delivery-info" },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Got Question? Call Us + Newsletter */}
          <div className="footer-block-5">
            <h4>{lang === "ar" ? "لديك سؤال؟ اتصل بنا" : "Got Question? Call Us!"}</h4>
            <a href="tel:+96598805010" className="footer-contact-link">
              <Phone size={14} /> +965 98805010
            </a>
            <a href="mailto:petstorekw@gmail.com" className="footer-contact-link">
              <Mail size={14} /> petstorekw@gmail.com
            </a>
            <div className="footer-newsletter">
              <p className="footer-newsletter-text">{t("footer.newsletter", lang)}</p>
              <form className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder={t("footer.email_placeholder", lang)}
                  className="footer-newsletter-input"
                />
                <button type="submit" className="footer-newsletter-btn" aria-label={t("footer.subscribe", lang)}>
                  <Send size={14} />
                  {t("footer.subscribe", lang)}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs opacity-60">{lang === "ar" ? "طرق الدفع:" : "We Accept:"}</span>
            </div>
            <div className="flex gap-2">
              <div className="bg-white rounded px-2 py-1 text-[10px] font-bold text-blue-900">VISA</div>
              <div className="bg-white rounded px-2 py-1 text-[10px] font-bold text-red-600">Mastercard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="footer-copyright-inner">
          <p>&copy; {new Date().getFullYear()} Pet Store. {t("footer.rights", lang)}</p>
          <p>{t("announce.line1", lang)}</p>
        </div>
      </div>
    </footer>
  );
}
