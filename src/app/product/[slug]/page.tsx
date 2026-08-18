"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { useLanguageStore, useCartStore, useWishlistStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { formatPrice, cn, getBestPrice, calcDiscount, getProductImage } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

function ProductInner({ slug }: { slug: string }) {
  const lang = useLanguageStore((s) => s.lang);
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();

  const [product, setProduct] = useState<Product | "loading" | "not_found">("loading");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState<"description" | "details">("description");

  useEffect(() => {
    import("@/data/products.json").then((mod) => {
      const all = mod.default as Product[];
      const found = all.find((p) => p.slug === slug);
      if (found) {
        setProduct(found);
        const related = all
          .filter(
            (p) =>
              p.id !== found.id &&
              p.categories?.some((c) =>
                found.categories?.some((fc) => fc.id === c.id)
              )
          )
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        setProduct("not_found");
      }
    });
  }, [slug]);

  if (product === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 py-20">
        {t("general.loading", lang)}
      </div>
    );
  }

  if (product === "not_found") {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 py-20">
        {t("general.error", lang)}
      </div>
    );
  }

  const name = lang === "ar" ? (product as unknown as { ar_name?: string }).ar_name || product.name : product.name;
  const description = lang === "ar" ? (product as unknown as { ar_description?: string }).ar_description || product.description : product.description;
  const shortDesc = lang === "ar"
    ? (product as unknown as { ar_short_description?: string }).ar_short_description || product.short_description
    : product.short_description;
  const bestPrice = getBestPrice(product);
  const originalPrice = product.regular_price && parseFloat(product.regular_price) > parseFloat(bestPrice)
    ? product.regular_price
    : null;
  const discount = originalPrice ? calcDiscount(parseFloat(bestPrice), parseFloat(originalPrice)) : 0;
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    const key = `${product.id}-default`;
    addItem({
      key,
      product_id: product.id,
      variation_id: 0,
      quantity,
      name: name,
      price: bestPrice,
      image: getProductImage(product),
    });
  };

  const handleWishlist = () => {
    if (wishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product.id);
    }
  };

  const breadcrumbs = [
    { label: t("breadcrumb.home", lang), href: "/" },
    ...(product.categories || []).map((c) => ({
      label: c.name,
      href: `/category/${c.slug}`,
    })),
    { label: name, href: `/product/${product.slug}` },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
          {breadcrumbs.map((bc, i) => (
            <span key={bc.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={10} className="rtl-flip" />}
              <Link href={bc.href} className="hover:text-[var(--color-primary)] transition-colors">
                {bc.label}
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Images */}
          <div>
            <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center mb-3">
              <img
                src={product.images?.[selectedImage]?.src || getProductImage(product)}
                alt={name}
                className="w-full h-full object-contain"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-gray-50",
                      selectedImage === i ? "border-[var(--color-primary)]" : "border-transparent"
                    )}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {discount > 0 && (
                <span className="badge badge-sale">-{discount}%</span>
              )}
              {product.stock_status === "outofstock" && (
                <span className="badge badge-hot">{t("product.out_of_stock", lang)}</span>
              )}
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{name}</h1>

            {parseFloat(product.average_rating) > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={cn(
                        star <= Math.round(parseFloat(product.average_rating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.rating_count} {t("product.reviews", lang)})
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--color-primary)" }}>
                {formatPrice(bestPrice, "KD", 3)}
              </span>
              {originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(originalPrice, "KD", 3)}
                </span>
              )}
            </div>

            {shortDesc && (
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{shortDesc}</p>
            )}

            {product.attributes && product.attributes.length > 0 && (
              <div className="mb-4 space-y-3">
                {product.attributes.map((attr) => (
                  <div key={attr.id}>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      {attr.name}:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {attr.options.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedOptions((prev) => ({ ...prev, [attr.id]: opt.name }))}
                          className={cn(
                            "px-3 py-1.5 text-sm border rounded-lg transition-all",
                            selectedOptions[attr.id] === opt.name
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                              : "border-gray-300 hover:border-[var(--color-primary)]"
                          )}
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-[var(--color-border)] rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 text-sm font-semibold min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_status === "outofstock"}
                className={cn(
                  "flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all",
                  product.stock_status === "outofstock"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "text-white hover:opacity-90"
                )}
                style={product.stock_status !== "outofstock" ? { backgroundColor: "var(--color-primary)" } : {}}
              >
                <ShoppingCart size={18} />
                {product.stock_status === "outofstock"
                  ? t("product.out_of_stock", lang)
                  : t("product.add_to_cart", lang)}
              </button>
              <button
                onClick={handleWishlist}
                className={cn(
                  "w-12 h-12 rounded-lg border flex items-center justify-center transition-all",
                  wishlisted
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-[var(--color-border)] hover:border-red-300 text-gray-400 hover:text-red-500"
                )}
                aria-label="Wishlist"
              >
                <Heart size={20} className={wishlisted ? "fill-current" : ""} />
              </button>
            </div>

            <div className="border border-[var(--color-border)] rounded-xl p-4 space-y-2">
              {[
                { icon: Truck, text: t("announce.line2", lang) },
                { icon: ShieldCheck, text: t("badge.secure_payment", lang) },
                { icon: RotateCcw, text: t("badge.easy_returns", lang) },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <item.icon size={16} style={{ color: "var(--color-primary)" }} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-t border-[var(--color-border)] pt-6">
          <div className="flex gap-4 mb-4 border-b border-[var(--color-border)]">
            <button
              onClick={() => setActiveTab("description")}
              className={cn(
                "pb-3 text-sm font-semibold border-b-2 transition-colors",
                activeTab === "description"
                  ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              )}
            >
              {t("product.description", lang)}
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={cn(
                "pb-3 text-sm font-semibold border-b-2 transition-colors",
                activeTab === "details"
                  ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              )}
            >
              {t("product.details", lang)}
            </button>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700">
            {activeTab === "description" ? (
              description ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                <p className="text-gray-500">No description available.</p>
              )
            ) : (
              <div className="grid grid-cols-2 gap-3 text-sm">
                {product.categories?.map((c) => (
                  <div key={c.id}>
                    <span className="font-semibold text-gray-600">Category: </span>
                    <Link href={`/category/${c.slug}`} className="hover:underline" style={{ color: "var(--color-primary)" }}>
                      {c.name}
                    </Link>
                  </div>
                ))}
                <div>
                  <span className="font-semibold text-gray-600">SKU: </span>
                  <span>{product.id}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Stock: </span>
                  <span className={product.stock_status === "instock" ? "text-green-600" : "text-red-500"}>
                    {product.stock_status === "instock" ? t("product.in_stock", lang) : t("product.out_of_stock", lang)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-5">{t("product.related_products", lang)}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState("");

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        {slug ? <ProductInner slug={slug} /> : <div className="py-12 text-center text-gray-500">{t("general.loading", "en")}</div>}
      </main>
      <Footer />
    </div>
  );
}
