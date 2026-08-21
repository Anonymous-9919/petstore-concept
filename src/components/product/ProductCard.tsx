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
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const bestPrice = getBestPrice(product);
  const originalPrice = product.regular_price && parseFloat(product.regular_price) > parseFloat(bestPrice)
    ? product.regular_price
    : null;
  const discount = originalPrice ? calcDiscount(parseFloat(bestPrice), parseFloat(originalPrice)) : 0;

  const cartKey = `${product.id}-default`;
  const cartItem = items.find((i) => i.key === cartKey);
  const inCart = !!cartItem && product.stock_status !== "outofstock";

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    stop(e);
    addItem({
      key: cartKey,
      product_id: product.id,
      variation_id: 0,
      quantity: 1,
      name: lang === "ar" ? product.ar_name || product.name : product.name,
      price: bestPrice,
      image: getProductImage(product),
    });
  };

  const handleIncrease = (e: React.MouseEvent) => {
    stop(e);
    if (cartItem) updateQuantity(cartKey, cartItem.quantity + 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    stop(e);
    if (!cartItem) return;
    if (cartItem.quantity <= 1) {
      removeItem(cartKey);
    } else {
      updateQuantity(cartKey, cartItem.quantity - 1);
    }
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

  const name = lang === "ar" ? product.ar_name || product.name : product.name;

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="product-card relative">
        {/* Badges */}
        <div className="product-card-badges">
          {discount > 0 && (
            <span className="badge badge-sale">-{discount}%</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="product-card-wishlist"
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
        <div className="product-card-image">
          <img
            src={getProductImage(product)}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="product-card-content">
          {/* Category */}
          {product.categories && product.categories.length > 0 && (
            <p className="product-card-category">
              {product.categories[0].name}
            </p>
          )}

          {/* Name */}
          <h3 className="product-card-name group-hover:text-[var(--color-primary)] transition-colors">
            {name}
          </h3>

          {/* Rating */}
          {parseFloat(product.average_rating) > 0 && (
            <div className="product-card-rating">
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
          <div className="product-card-price">
            <span className="product-card-price-current">
              {formatPrice(bestPrice, "KD", 3)}
            </span>
            {originalPrice && (
              <span className="product-card-price-original">
                {formatPrice(originalPrice, "KD", 3)}
              </span>
            )}
          </div>

          {/* Add to Cart / Quantity selector - Orange, matching PetCentral */}
          {inCart ? (
            <div className="product-card-qty mt-auto" onClick={stop}>
              <button
                onClick={handleDecrease}
                aria-label="Decrease quantity"
                className="product-card-qty-btn"
              >
                −
              </button>
              <span className="product-card-qty-value">{cartItem!.quantity}</span>
              <button
                onClick={handleIncrease}
                aria-label="Increase quantity"
                className="product-card-qty-btn"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="product-card-cart-btn mt-auto"
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
          )}
        </div>
      </div>
    </Link>
  );
}
