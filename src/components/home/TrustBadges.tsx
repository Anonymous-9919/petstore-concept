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
    <div className="bg-[var(--color-bg-alt)] border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-2 justify-center md:justify-start">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--color-primary-50)" }}
              >
                <badge.icon size={18} style={{ color: "var(--color-primary)" }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-tight">{t(badge.title, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
