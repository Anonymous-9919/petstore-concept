# Pet Store 2 Redesign Plan

## Overview
Redesign frontend to match PetCentral.ae's design and UX patterns exactly, while using petstorekuwait.vercel.app's logo and actual products. Fully WordPress/WooCommerce backend compatible.

---

## 1. Data Structure (WordPress Compatibility)

### New/Updated Data Files:
```
src/data/
├── products.json         # WooCommerce-compatible (existing, keep as-is)
├── categories.json       # Updated with full PetCentral structure
├── store.json            # Updated with Kuwait-specific values
├── banners.json    ← NEW # All homepage banners (hero, sections, mobile)
├── brands.json     ← NEW # Popular brand logos for homepage
├── nav-data.json   ← NEW # Mega menu structure (editable via WP backend)
├── whatsapp.json   ← NEW # Floating button config
└── site-config.json← NEW # Homepage section order/toggles
```

---

## 2. Top Bar (AnnouncementBar.tsx) - UPDATE NEEDED

**Current:** UAE-focused (phone +971, AED 99, "Dubai Online Pet Store")
**Target:** Kuwait-focused but PetCentral design
- Keep PetCentral's thin single-line design
- Replace all UAE content with:
  - **Phone**: +965 98805010
  - **Delivery**: "Free delivery on orders over KD 10"
  - **Trust badges**: Keep icons (Truck, Shield, Headset)
  - **Rotating text**: "Kuwait's #1 Online Pet Store" / "Free delivery over KD 10" / "Exclusive deals on top pet brands!"
- **Colors**: Use `--color-primary` (orange #f97316) for background

---

## 3. Header Redesign - COMPLETE OVERHAUL

### Changes Required:
1. **Remove blue theme dropdown** completely (user wants orange only)
   - Remove `useThemeStore` import and usage
   - Remove `<select>` for theme switcher
   - Set default theme to `"orange"` in store.ts
   - Remove theme selector from mobile menu
   - Remove `theme.blue` / `theme.orange` from i18n.ts

2. **Use actual logo** from petstorekuwait.vercel.app
   - Logo from data file (configurable via WP backend)

3. **Layout**: Logo left + search middle + icons right

4. **Mega Menu**: Complete rewrite (see Phase 4)

---

## 4. Mega Menu Overhaul - COMPLETE REWRITE

**Target:** PetCentral-style mega menu with 5 top-level items

| Top-Level Item | Slug | Megamenu Images |
|---|---|---|
| **Dog** | `dog` | `dog1_310x.png` |
| **Cat** | `cat` | `cat1_310x.png` |
| **Aquatics** | `aquatics` | `fish1_310x.png` |
| **Bird** | `bird` | `bird1_310x.png` |
| **Small Pet** | `small-pet` | `small-pet_1080x.jpg` |

### Mega Menu UX:
- Width: 640px full-width dropdown
- Hover: Smooth expand with underline beneath active nav item
- Layout: Left sidebar (subcategories) + Right image
- Images: Real pet images (NOT emojis), 310x310px
- All links to `/collections/<slug>` (empty pages OK for now)
- Mobile: Slide-out panel with nested accordion

---

## 5. Category Restructuring

**New Category Structure:**
1. **Hero Slider** - Full-width carousel (4 slides)
2. **Shop by Popular Brands** - Brand logos carousel (8 brands)
3. **Main Promotional Banner** - Single hero promo image
4. **Explore Pet Food Categories** - 6 category cards (Dog Food, Dog Treats, Cat Food, Cat Treats, Cat Litter, Offers)
5. **Two Promotional Banners** - Side-by-side promos
6. **Top Selling Dog Food** - Product carousel (8+ products)
7. **Age-Stage Banners** - Puppy, Adult, Senior dog food banners
8. **Top Selling Cat Food** - Product carousel (8+ products)
9. **Age-Stage Banners** - Kitten, Adult, Senior cat food banners
10. **Accessory Banners** - Dog Beds, Dog Supplies banners

---

## 6. Hero Slider / Carousel

- Size: Full-width, 280px height desktop, 200px mobile
- Source: Images from petstorekuwell.vercel.app mobile site
- Slides: 4 slides
- Navigation: Arrows + dots
- Auto-rotate: 6s interval
- **No emoji icons** - Clean image-only approach
- Text overlay on images (white text, CTA button)

---

## 7. Homepage Layout

```
<AnnouncementBar />
<Header />
<main>
  <HeroSlider />
  <ShopByBrands />
  <MainBanner />
  <CategoryGrid />
  <TwoBannerRow />
  <ProductCarousel title="Top Selling Dog Food" />
  <AgeBannerRow />
  <ProductCarousel title="Top Selling Cat Food" />
  <AgeBannerRow />
  <AccessoryBanners />
</main>
<Footer />
<WhatsAppButton />
```

---

## 8. Floating WhatsApp Button

**File:** `src/components/ui/WhatsAppButton.tsx`
- Position: Fixed, bottom-6, right-6
- Z-index: 9999
- Link: `https://wa.me/96598805010`
- Uses WhatsApp SVG icon with orange background
- Pulse animation

---

## 9. Color Theme Update - REMOVE BLUE THEME

1. `src/lib/store.ts`: Set `theme: "orange"`
2. `src/lib/i18n.ts`: Remove theme translations
3. `src/components/layout/Header.tsx`: Remove theme dropdown
4. `src/components/layout/ThemeProvider.tsx`: Orange only, no toggle
5. `src/app/layout.tsx`: Default to orange theme

---

## 10. Image Color Adjustment (Purple → Orange)

- Hero slider banners: Replace purple accents with orange
- Category images: Apply orange tint where purple exists
- Promotional banners: Change purple to orange
- Green banners: Keep as-is
- Save adjusted images to `/assets/banners/`
