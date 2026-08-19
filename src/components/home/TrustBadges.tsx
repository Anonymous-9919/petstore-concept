"use client";

import { Truck, Headphones, RotateCcw, ShieldCheck, Banknote } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";

const badges = [
  { icon: Headphones, title: "badge.support", desc: "badge.whatsapp_247" },
  { icon: Truck, title: "badge.free_delivery", desc: "badge.free_delivery_desc" },
  { icon: RotateCcw, title: "badge.easy_returns", desc: "badge.easy_returns_desc" },
  { icon: ShieldCheck, title: "badge.secure_payment", desc: "badge.secure_payment_desc" },
  { icon: Banknote, title: "badge.pay_on_delivery", desc: "badge.pay_on_delivery_desc" },
];

export function TrustBadges() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <div className="trust-badges">
      <div className="page-container">
        <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {badges.map((badge) => (
            <div key={badge.title} className="trust-badge-item flex-shrink-0">
              <div
                className="trust-badge-icon"
                style={{ backgroundColor: "var(--color-primary-50)" }}
              >
                <badge.icon size={24} style={{ color: "var(--color-primary)" }} />
              </div>
              <div>
                <p className="trust-badge-text">{t(badge.title, lang)}</p>
                <p className="trust-badge-desc">{t(badge.desc, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
