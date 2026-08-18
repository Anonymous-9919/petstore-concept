"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useLanguageStore, useCartStore, useWishlistStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { formatPrice, cn, getProductImage, getBestPrice, calcDiscount, stripHtml, truncate } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const lang = useLanguageStore((s) => s.lang);
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const bestPrice = getBestPrice(product);
  const originalPrice = product.regular_price && parseFloat(product.regular_price) > parseFloat(bestPrice)
    ? product.regular_price
    : null;
  const discount = originalPrice ? calcDiscount(parseFloat(bestPrice), parseFloat(originalPrice)) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const key = `${product.id}-default`;
    addItem({
      key,
      product_id: product.id,
      variation_id: 0,
      quantity: 1,
      name: lang === "ar" ? (product as unknown as { ar_name?: string }).ar_name || product.name : product.name,
      price: bestPrice,
      image: getProductImage(product),
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product.id);
    }
  };

  const name = lang === "ar" ? (product as unknown as { ar_name?: string }).ar_name || product.name : product.name;
  const shortDesc = lang === "ar"
    ? (product as unknown as { ar_short_description?: string }).ar_short_description || product.short_description
    : product.short_description;

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="card relative">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {discount > 0 && (
            <span className="badge badge-sale">-{discount}%</span>
          )}
          {product.on_sale && discount === 0 && (
            <span className="badge badge-sale">{t("sort.featured", lang)}</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors",
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
            )}
          />
        </button>

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-50 p-3">
          <img
            src={getProductImage(product)}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Category */}
          {product.categories && product.categories.length > 0 && (
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--color-text-muted)" }}>
              {product.categories[0].name}
            </p>
          )}

          {/* Name */}
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-[var(--color-primary)] transition-colors">
            {name}
          </h3>

          {/* Short description */}
          {shortDesc && (
            <p className="text-xs text-gray-500 line-clamp-1 mb-2">{truncate(stripHtml(shortDesc), 50)}</p>
          )}

          {/* Rating */}
          {parseFloat(product.average_rating) > 0 && (
            <div className="flex items-center gap-1 mb-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className={cn(
                      star <= Math.round(parseFloat(product.average_rating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-500">({product.rating_count})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold" style={{ color: "var(--color-primary)" }}>
              {formatPrice(bestPrice, "KD", 3)}
            </span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice, "KD", 3)}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full mt-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
            }}
          >
            <ShoppingCart size={14} />
            {product.stock_status === "outofstock"
              ? t("product.out_of_stock", lang)
              : t("product.add_to_cart", lang)}
          </button>
        </div>
      </div>
    </Link>
  );
}
