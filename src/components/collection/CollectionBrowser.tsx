"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { useLanguageStore } from "@/lib/store";
import {
  buildFacets, applyFilters, priceBounds, SORT_OPTIONS,
  emptyFilters, type FilterState,
} from "@/lib/filters";
import type { Product } from "@/lib/types";
import { SlidersHorizontal, X } from "lucide-react";

interface Props {
  items: Product[];
}

export function CollectionBrowser({ items }: Props) {
  const lang = useLanguageStore((s) => s.lang);
  const [f, setF] = useState<FilterState>(emptyFilters());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const facets = useMemo(() => buildFacets(items), [items]);
  const [pMinBound, pMaxBound] = useMemo(() => priceBounds(items), [items]);
  const filtered = useMemo(() => applyFilters(items, f), [items, f]);

  const toggle = (key: "pets" | "cats" | "brands" | "lifestage" | "avail", value: string) =>
    setF((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const activeCount =
    f.pets.length + f.cats.length + f.brands.length + f.lifestage.length +
    f.avail.length + (f.onSale ? 1 : 0) +
    (f.priceMin != null ? 1 : 0) + (f.priceMax != null ? 1 : 0);

  const facetPanel = (
    <>
      {/* Price */}
      <div className="filter-group">
        <h4>{lang === "ar" ? "السعر" : "Price"}</h4>
        <div className="filter-price-row">
          <input
            type="number" placeholder="0" min={0}
            value={f.priceMin ?? ""}
            onChange={(e) => setF((p) => ({ ...p, priceMin: e.target.value === "" ? null : +e.target.value }))}
          />
          <span>–</span>
          <input
            type="number" placeholder={String(Math.ceil(pMaxBound))} min={0}
            value={f.priceMax ?? ""}
            onChange={(e) => setF((p) => ({ ...p, priceMax: e.target.value === "" ? null : +e.target.value }))}
          />
        </div>
      </div>

      {facets.map((g) => (
        <div key={g.key} className="filter-group">
          <h4>{lang === "ar" ? g.title_ar : g.title_en}</h4>
          <div className="filter-options">
            {g.options.map((o) => (
              <label key={o.value} className="filter-option">
                <input
                  type="checkbox"
                  checked={f[g.key].includes(o.value)}
                  onChange={() => toggle(g.key, o.value)}
                />
                <span>{lang === "ar" ? o.label_ar : o.label_en}</span>
                <em>({o.count})</em>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* On sale */}
      <div className="filter-group">
        <label className="filter-option">
          <input
            type="checkbox"
            checked={f.onSale}
            onChange={(e) => setF((p) => ({ ...p, onSale: e.target.checked }))}
          />
          <span>{lang === "ar" ? "عليه خصم" : "On sale"}</span>
        </label>
      </div>

      {activeCount > 0 && (
        <button className="filter-clear" onClick={() => setF(emptyFilters())}>
          {lang === "ar" ? "مسح الكل" : "Clear all"} ({activeCount})
        </button>
      )}
    </>
  );

  return (
    <div>
      {/* Mobile top bar */}
      <button className="collection-filter-bar lg:hidden" onClick={() => setDrawerOpen(true)}>
        <SlidersHorizontal size={16} />
        <span>{lang === "ar" ? "تصفية وترتيب" : "Filter and sort"}</span>
        {activeCount > 0 && <b>{activeCount}</b>}
      </button>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className={`absolute inset-y-0 w-[85%] max-w-[360px] bg-white shadow-xl overflow-y-auto ${lang === "ar" ? "right-0" : "left-0"}`}>
            <div className="flex items-center justify-between px-5 h-14 border-b border-black/5 sticky top-0 bg-white">
              <span className="font-bold text-[15px]">{lang === "ar" ? "تصفية وترتيب" : "Filter and sort"}</span>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close filters"><X size={20} /></button>
            </div>
            <div className="px-5 py-4">{facetPanel}</div>
            <div className="sticky bottom-0 bg-white border-t border-black/5 p-4">
              <button className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold" onClick={() => setDrawerOpen(false)}>
                {lang === "ar" ? `عرض ${filtered.length} منتج` : `Show ${filtered.length} products`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sort row */}
      <div className="collection-topbar">
        <span className="text-sm text-gray-500" dir="ltr">{filtered.length}</span>
        <select
          className="sort-select"
          value={f.sort}
          onChange={(e) => setF((p) => ({ ...p, sort: e.target.value }))}
          aria-label="Sort"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{lang === "ar" ? o.ar : o.en}</option>
          ))}
        </select>
      </div>

      <div className="collection-layout">
        {/* Desktop sidebar */}
        <aside className="collection-sidebar hidden lg:block">{facetPanel}</aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              {lang === "ar" ? "لا توجد منتجات مطابقة" : "No matching products"}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
