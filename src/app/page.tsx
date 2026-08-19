"use client";

import { useState, useEffect } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ShopByBrands } from "@/components/home/ShopByBrands";
import { MainBanner } from "@/components/home/MainBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { TwoBannerRow } from "@/components/home/TwoBannerRow";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { AgeBannerRow } from "@/components/home/AgeBannerRow";
import { AccessoryBanners } from "@/components/home/AccessoryBanners";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Shop by Popular Brands */}
        <ShopByBrands />

        {/* Main Promotional Banner */}
        <MainBanner />

        {/* Explore Pet Food Categories */}
        <CategoryGrid />

        {/* Two Promotional Banners */}
        <TwoBannerRow />

        {/* Top Selling Dog Food */}
        <ProductCarousel
          titleKey="home.dog_food"
          collectionSlug="dog-dry-food"
          productCount={8}
        />

        {/* Age Stage Banners - Dog */}
        <AgeBannerRow type="dog" />

        {/* Top Selling Cat Food */}
        <ProductCarousel
          titleKey="home.cat_food"
          collectionSlug="cat-dry-food"
          productCount={8}
        />

        {/* Age Stage Banners - Cat */}
        <AgeBannerRow type="cat" />

        {/* Accessory Banners */}
        <AccessoryBanners />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
