# Caramel Fashion Website — Project Guide

This guide provides technical instructions for developers and owners on how the Caramel website is structured, developed, maintained, and deployed.

---

## 1. Technologies & Architecture

- **Runtime & Build:** Node.js (>=18), npm, Vite.
- **Frontend Framework:** React 19, TypeScript.
- **Styling Architecture:** Pure CSS with centralized CSS Custom Properties (Design Tokens), responsive logical properties for RTL/LTR.
- **Typography:** Cormorant Garamond (Editorial Serif headlines) & Montserrat (Clean Sans-Serif body/controls), paired with Cairo for Arabic typography.
- **Icons:** Lucide React (feather-style clean SVG icons).
- **Deployment Target:** Static frontend on Vercel Hobby tier (zero backend dependencies).
- **Strict Out-of-Scope Constraints:** No WebGL/Three.js/3D models, no virtual try-on, no checkout/cart/payment processing, no databases or customer accounts.

---

## 2. Directory Structure

```text
Caramel-Website/
├── .agents/                    # Specialized AI skills (e.g. ui-ux-pro-max)
├── docs/                       # Project documentation & audit trail
│   ├── PROJECT_STATUS.md       # Authoritative progress checkpoint
│   ├── IMPLEMENTATION_LOG.md   # Chronological development log
│   ├── PROJECT_GUIDE.md        # Technical architecture guide (this file)
│   ├── HANDOFF.md              # AI-to-AI handoff checkpoint
│   └── REQUIREMENTS_TRACEABILITY_MATRIX.md # Master spec traceability
├── public/                     # Static assets served at root
│   ├── favicon.svg             # Monogram brand favicon
│   ├── images/
│   │   ├── demo-products/      # Local sample product imagery (Phase 7)
│   │   ├── products/           # Genuine owner product imagery (Phase 10)
│   │   └── reviews/            # Authentic review screenshots (Phase 11)
├── src/                        # Application source code
│   ├── components/             # Reusable modular UI components
│   │   ├── common/             # Reusable UI primitives (Created in Phase 3)
│   │   │   ├── Button.tsx      # Polymorphic button/anchor with variants
│   │   │   ├── Badge.tsx       # Demo notices and discount chips
│   │   │   ├── SectionHeader.tsx # Editorial title/subtitle pairing
│   │   │   ├── EmptyState.tsx  # Honest empty state fallback container
│   │   │   ├── ImageFrame.tsx  # 4:5 fashion aspect ratio image wrapper
│   │   │   └── index.ts        # Barrel export
│   │   ├── Header/             # Minimal navigation, logo seal & compact language switcher
│   │   ├── HeroSection/        # Reference-calibrated hero with dominant bag & grounding shadow
│   │   ├── Background/         # Calm luxury dark-brown ambient background
│   │   ├── ProductCollection/  # Responsive product grid (4-col desktop, 2-col mobile)
│   │   ├── ProductCard/        # Reusable product card with 4:5 ratio & swatches
│   │   ├── ProductDetails/     # 2D inspection modal & accessible zoom lightbox
│   │   ├── EditorialStory/     # Brand philosophy & artisanal craftsmanship
│   │   ├── Reviews/            # Customer conversation screenshot gallery & lightbox
│   │   ├── Contact/            # Single social links group & persistent bottom-left WhatsApp
│   │   └── Footer/             # Minimal two-line footer with developer Facebook credit
│   ├── config/                 # Brand and contact configuration
│   │   ├── brand.ts            # Brand naming, wordmark, meta info
│   │   └── contact.ts          # WhatsApp digits, social URLs, catalogue mode
│   ├── data/                   # Central data sources
│   │   ├── products.ts         # Single source of truth for catalogue
│   │   └── reviews.ts          # Review metadata by platform
│   ├── i18n/                   # Bilingual dictionary & localization
│   │   ├── ar.ts               # Arabic translations
│   │   ├── en.ts               # English translations
│   │   └── index.ts            # Localization context & helpers
│   ├── styles/                 # CSS tokens and global rules
│   │   ├── tokens.css          # Design tokens (colors, fluid typography, spacing)
│   │   └── global.css          # Reset, layout utilities, animations
│   ├── types/                  # TypeScript interface definitions
│   │   ├── product.ts          # Product, Variant, Category types
│   │   ├── config.ts           # Brand and contact configuration types
│   │   └── review.ts           # Review screenshot types
│   ├── App.tsx                 # Root application layout
│   └── main.tsx                # Entry point
├── index.html                  # HTML entry template
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

---

## 3. Development Workflow & Commands

### Prerequisites
- Node.js version 18.x or 20.x or higher
- npm 9.x or higher

### Installation & Execution
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npm run type-check

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 4. How Key Subsystems Work

### 4.1 Localization & RTL/LTR Layout
- Driven by centralized bilingual dictionaries (`src/i18n/ar.ts` and `src/i18n/en.ts`) providing 121 translated keys with 100% parity.
- Managed by `PreferencesProvider` and the `usePreferences()` hook (`src/context/PreferencesContext.tsx`).
- Pre-hydration script in `<head>` (`index.html`) reads `caramel_lang` and sets `lang` and `dir` prior to paint, completely preventing layout direction flashing.
- The root document receives `lang="ar"` and `dir="rtl"` when Arabic is active, and `lang="en"` and `dir="ltr"` when English is active.
- Document `<title>` updates dynamically to localized brand titles.
- CSS uses logical properties (`padding-inline-start`, `margin-inline-end`, `inset-inline-start`) so layouts flip automatically without duplicate CSS.
- Media elements (images, SVGs, canvas, and brand wordmarks) are protected with `direction: ltr` to prevent accidental mirroring.
- Selected language is persisted in `localStorage` under `caramel_lang` and defaults safely to Arabic (`'ar'`). Corrupted values are rejected via `isValidLanguage`.
- Number and currency formatting is handled via `formatPrice(amount, lang)` producing Egyptian Pounds (`٢٬٤٥٠ ج.م` in Arabic and `2,450 EGP` in English).

### 4.2 Dual Luxury Theme System
- **Dark Brown Mode (Default):** Retains Caramel's signature dark-brown palette (`#1C100A` deep espresso canvas, `#27170F` mocha surface, `#341D12` cocoa elevated card, `#FAF7F2` ivory text, `#D5B078` champagne gold accent).
- **Cream Light Mode:** Sophisticated warm off-white and soft ivory palette (`#FBF7F2` velvety ivory off-white canvas, `#F4EDE3` warm almond cream surface, `#FFFFFF` crisp warm neutral cards, `#26160F` deep espresso primary typography with >11:1 contrast ratio, `#5E4436` warm cocoa secondary text, `#9E6938` rich amber caramel accents, soft beige borders).
- Dedicated product display surface (`--color-product-surface`) ensures merchandise colors are displayed cleanly without tinting or distortion.
- Pre-hydration script in `<head>` (`index.html`) sets `data-theme` prior to paint based on `localStorage.getItem('caramel_theme')`, preventing any theme flash (FOUC).
- Theme toggle component (`src/components/common/ThemeToggle.tsx`): 36x36px accessible pill button with Sun/Moon icons in the top navigation bar.

### 4.3 Simplified 4-Section Navigation, Scroll Animations & Social Interactions
- **Simplified 4-Link Top Navigation (`src/components/Header/Header.tsx`):**
  - Exactly 4 primary destinations:
    1. **Home** (`#home`): Returns to top hero section ("الرئيسية" / "Home").
    2. **Our Products** (`#collection`): Scrolls to catalogue collection ("منتجاتنا" / "Our Products").
    3. **Reviews** (`#reviews`): Scrolls to verified customer conversation gallery ("آراء العملاء" / "Reviews").
    4. **Contact** (`#contact`): Scrolls to concierge inquiry and social links ("تواصل معنا" / "Contact").
  - Mobile drawer cleanly presents all 4 links, the language switcher, and the theme toggle with zero clipping.
- **Repeating Scroll-Triggered Animations (`src/hooks/useScrollReveal.ts`, `src/styles/global.css`):**
  - `useScrollReveal` hook combining `IntersectionObserver` with viewport exit reset and `MutationObserver`.
  - Elements animate into view when entering the viewport, and reset when scrolled out of view so scrolling back repeats the reveal.
  - Staggered delays (`reveal-stagger-1` through `6`) for catalog cards and review cards.
  - Respects `prefers-reduced-motion: reduce`.
- **Social Brand Interactions (`src/components/Contact/ContactSection.tsx`):**
  - Single social group featuring official brand-color hover/focus/tap animations:
    - Instagram (`.is-instagram`): 5-stop gradient badge (`#f09433` -> `#bc1888`) with rose glow and 1.06x icon scale.
    - WhatsApp Channel (`.is-whatsapp`): Emerald green badge (`#25D366`) with green ambient glow.
    - TikTok (`.is-tiktok`): High-contrast deep black badge (`#050505`) with dual neon cyan (`#00F2FE`) and magenta (`#FE2C55`) drop shadows.
  - Persistent bottom-left floating WhatsApp button (`wa.me/201095203967`) with theme-adaptive styling.
- **Anchor Offset & Motion Hardening:** All sections use `scroll-margin-top: 88px` ensuring headers never obscure section headings. Subtle animations are disabled under `prefers-reduced-motion: reduce`.

### 4.4 Centralized Product Catalogue, Modes & Validation
- **Catalogue Source:** Located at `src/data/products.ts`.
- **Catalogue Mode Control (`src/config/contact.ts`):**
  - `'demo'`: Displays demo products along with a prominent, localized sample preview notice.
  - `'production'`: Strictly filters out any item marked `isDemo: true` via `getActiveProducts(products, mode)`.
- **Every product record supports:**
  - `id`: Unique stable kebab-case slug identifier (e.g., `caramel-leather-tote`).
  - `name`: Required bilingual object `{ ar: "...", en: "..." }`.
  - `description`: Optional bilingual editorial description `{ ar: "...", en: "..." }`.
  - `category`: Category slug (`handbags`, `apparel`, `accessories`).
  - `price`: Numeric value in Egyptian Pounds (EGP).
  - `originalPrice`: Optional numeric price representing a genuine discount.
  - `primaryImage`: Path to primary photograph (e.g., `/images/products/tote-black-main.webp`).
  - `alternateImages`: Optional array of lifestyle or detail images.
  - `variants`: Array of explicit color variants (`ProductVariant`), each mapping to its own primary and gallery images.
  - `isDemo`: Boolean flag separating sample data from real inventory.
  - `featured`: Optional editorial showcase highlight.
  - `objectPosition`: Optional CSS object-position for photo framing (e.g. `'center 40%'`).
- **Catalogue Validation Engine (`src/utils/productValidation.ts`):**
  - Run `validateProduct(product)` or `validateCatalog(products)` to assert data integrity.
  - Strict Discount Rule: `originalPrice` must be strictly greater than current price (`originalPrice > price > 0`). Equal or smaller prices are rejected as deceptive discounts.
  - Uniqueness: Global uniqueness of product IDs and internal uniqueness of variant IDs are enforced.
- **Catalogue Utilities (`src/utils/catalog.ts`):**
  - `getActiveProducts(products, mode)`: filters catalogue based on mode.
  - `hasActiveDemoProducts(products, mode)`: detects if demo notice should be displayed.
  - `filterProductsByCategory(products, category)`: filters collection by category.
  - `calculateDiscount(price, originalPrice)`: calculates exact savings and percentage.
  - `formatEGPPrice(price, locale)`: localized Egyptian Pounds currency display (`١٬٢٥٠ ج.م` in Arabic, `EGP 1,250` in English).
- **Component Integration (`src/components/ProductCard/`, `src/components/ProductCollection/`):**
  - `ProductCollection`: Renders products dynamically in `.showroom-grid` with live category counts, responsive wrapping, and honest empty states when filtered.
  - `ProductCard`: Renders individual product items with `ImageFrame`, bilingual titles, `-X%` discount badges, localized EGP prices, and accessible interactive color swatches.
- **Extensibility Guarantee:** Adding a new valid record to `products.ts` automatically renders a card in the collection grid and hooks into category filters without modifying component code. Complete copyable templates are documented in `docs/PRODUCT_RECORD_TEMPLATE.md`.

### 4.5 2D Product Detail Inspection Modal, Thumbnails & Lightbox
- **Master Inspection Modal (`src/components/ProductDetails/ProductDetailsModal.tsx`):**
  - Renders when a visitor clicks any product card image, title, or quick-inspect eye button.
  - Displays large primary 2D photograph with stable `var(--aspect-product)` ratio on neutral `--color-product-surface`.
  - Displays localized product title, category tag, EGP price, discount percentage badge, and uninvented editorial descriptions.
  - Interactive variant selector: switching swatches immediately updates color label and active image set without CSS filters.
  - Direct inquiry CTA: primary action button linking to `#contact` with automatic modal dismissal.
  - Keyboard accessibility: closes on `Escape`, traps `Tab` focus within modal, locks body scroll (`document.body.style.overflow = 'hidden'`), and restores focus to the trigger element on close.
- **Genuine Thumbnail Gallery:**
  - Thumbnails are dynamically generated only when multiple real images exist (`imageList.length > 1`).
  - For single-image pieces, thumbnail rows are suppressed to eliminate fake or empty thumbnail boxes.
  - Clicking any thumbnail immediately updates the main display photo.
- **Accessible Full-Resolution 2D Lightbox (`src/components/ProductDetails/Lightbox.tsx`):**
  - Full-screen high-contrast canvas (`rgba(5, 5, 5, 0.96)`) displaying the piece in maximum resolution.
  - 1x / 1.85x click-to-zoom toggle with custom zoom-in / zoom-out cursors.
  - Chevron navigation controls and keyboard `ArrowLeft` / `ArrowRight` navigation with RTL awareness.
  - Localized counter (`Image X of Y`), visible close button, and focus trap.
  - Layered `Escape` handling: pressing `Escape` while Lightbox is open closes Lightbox first; a second `Escape` closes the modal.
- **Image Resilience (`src/components/common/ImageFrame.tsx`):**
  - `hasError` is reset on `src` changes via `useEffect`, preventing stale error states when switching variants or thumbnails.
  - Failed images render a designed fallback state (`ImageOff` icon with localized text) while keeping product metadata and inquiry actions fully functional.
- **Strict 2D Invariant:**
  - Zero 3D viewers, zero WebGL/GLTF rendering, zero rotate/wireframe controls, zero AR/virtual try-on. Pure 2D still photography only.

### 4.6 Color Variants & Image Synchronization
- Selecting a color swatch atomically updates:
  1. Active swatch indicator: visible high-contrast `Check` icon (calculated dynamically via relative luminance `isDarkColor()`) and focused border ring.
  2. Localized color label name via `resolveText(variant.colorName)`.
  3. Main card/modal photograph to the variant's exact primary image (`variant.primaryImage`).
  4. Gallery thumbnail strip strictly to that variant's specific assets (`variant.primaryImage` + `variant.galleryImages`), eliminating cross-color thumbnail contamination.
  5. Pre-formatted concierge inquiry message via `buildProductInquiryMessage()`.
- **WCAG 2.2 Accessible Touch Targets:** Every color swatch button has `width: 44px`, `height: 44px`, `minWidth: 44px`, `minHeight: 44px`, `role="radio"`, and `aria-checked`.
- **Single-Edition Pieces:** Products without explicitly configured variants show zero fake swatches or default selectors.
- **Direct Inquiry & Fallback Concierge Card:**
  - When WhatsApp is configured in `src/config/contact.ts`, `getProductInquiryUrl()` generates a pre-filled `https://wa.me/<number>?text=...` link.
  - When WhatsApp is unconfigured, clicking an inquiry action smoothly scrolls down to `#contact`, populating the Active Inquiry Card with piece thumbnail, selected color, price, pre-drafted inquiry text, and 1-click clipboard copy with visual feedback.
- CSS filters (such as `hue-rotate` or `saturate`) are **strictly forbidden** for recoloring products. Each variant MUST map to an authentic local image file.

### 4.7 Customer-Review Conversation Screenshot Gallery & Demo Suite
- **Data Source (`src/types/review.ts`, `src/data/reviews.ts`):**
  - Strongly typed `CustomerReview` model containing `id`, `platform` ('whatsapp' | 'facebook' | 'instagram' | 'tiktok'), `screenshotImage`, bilingual `altText`, bilingual `clientIdentifier`, `receivedDate`, `isDemo`, and optional bilingual `caption`.
  - Stored independently from product records in `src/data/reviews.ts`.
- **Demo Preview Suite (`public/images/demo-reviews/`):**
  - 4 luxury dark-chocolate SVG chat mockups simulating actual client conversations across platforms:
    - `chat-whatsapp-01.svg` (WhatsApp order confirmation for Signature Caramel Leather Tote)
    - `chat-instagram-01.svg` (Instagram DM feedback for Seline Crescent Shoulder Bag)
    - `chat-whatsapp-02.svg` (WhatsApp VIP consultation for Tailored Wool-Silk Blazer)
    - `chat-facebook-01.svg` (Facebook Messenger review for Pleated Satin Midi Dress)
  - Clearly marked with bilingual demo transparency banner (`t.reviews.demoNotice`) and `badge-demo` labels ("نموذج تجريبي / DEMO PREVIEW").
- **How the Owner Replaces Demo Content with Authentic Screenshots:**
  1. Save genuine customer conversation screenshots into `public/images/reviews/` (e.g., `public/images/reviews/wa-review-01.webp` or `insta-chat-01.png`).
  2. Open `src/data/reviews.ts` and replace the demo objects with your genuine entries:
     ```typescript
     {
       id: 'authentic-review-01',
       platform: 'whatsapp',
       screenshotImage: '/images/reviews/wa-review-01.webp',
       altText: { ar: 'محادثة تأكيد استلام حقيبة كراميل', en: 'Conversation confirming delivery of Caramel bag' },
       clientIdentifier: { ar: 'عميلة واتساب — القاهرة', en: 'WhatsApp Client — Cairo' },
       receivedDate: '2026',
       isDemo: false,
       caption: { ar: 'رأي العميل في الجودة والتوصيل', en: 'Client feedback on quality and delivery' },
     }
     ```
  3. Set `isDemo: false`. The demo banner and badge will automatically disappear for verified records!
- **Platform Tabs & Filtering (`src/components/Reviews/ReviewGallery.tsx`):**
  - Accessible tab group supporting: All Platforms (4), WhatsApp (2), Instagram (1), Facebook (1), TikTok (0).
  - Meets WAI-ARIA standards (`role="tablist"`, `role="tab"`) and WCAG touch targets ($\ge 44\text{px}$).
- **Accessible Full-Resolution Lightbox (`src/components/Reviews/ReviewLightbox.tsx`):**
  - Deep dark canvas modal (`rgba(5, 5, 5, 0.96)`) displaying the screenshot at its natural aspect ratio (`maxHeight: 80vh`, `objectFit: contain`).
  - Full keyboard accessibility with focus trap, `Escape` key dismissal, and body scroll lock.

### 4.8 Contact Configuration, Product Inquiries, Footer & Floating WhatsApp
- **Centralized Contact Configuration (`src/config/contact.ts`, `src/types/config.ts`):**
  - Settings: `catalogMode`, `whatsappNumber`, `whatsappDirectUrl`, `whatsappChannelUrl`, `instagramUrl`, `tiktokUrl`, `facebookUrl`.
  - All unknown/unsupplied destinations default to `undefined`. Zero fake URLs or numbers.
- **Inquiry URL Builder (`src/utils/inquiry.ts`):**
  - `buildProductInquiryMessage()`: produces bilingual drafts with item name, selected variant color, and EGP price.
  - `getProductInquiryUrl()`: builds `wa.me/<number>?text=...` properly encoding Arabic unicode glyphs, ampersands, newlines, and bullets.
  - `getGeneralWhatsAppUrl()`: builds general showroom greeting URL.
  - Returns `null` when destinations are unconfigured.
- **Floating WhatsApp Action (`src/components/Contact/FloatingWhatsApp.tsx`):**
  - Fixed bottom-left with `--z-floating-action: 45` and minimum 48px touch target.
  - Hides completely in production when unconfigured.
  - Displays clearly labeled demo affordance in demo mode with tooltip.
- **Official Social Links (`src/components/Contact/SocialLinks.tsx`):**
  - Renders only verified, configured destinations (WhatsApp Channel, Instagram, TikTok, Facebook).
  - Uses secure `target="_blank"` and `rel="noopener noreferrer"`.
  - Hides unconfigured destinations in production.
- **Concierge Section (`src/components/Contact/ContactSection.tsx`):**
  - Active inquiry card with piece thumbnail, selected color, price, message box, and 1-click clipboard copy.
  - Direct WhatsApp action and boutique hours.
- **Luxury Editorial Footer (`src/components/Footer/Footer.tsx`):**
  - Displays brand wordmark in serif typography, localized tagline, navigation shortcuts to `#home`, `#story`, `#collection`, `#reviews`, `#contact`, back-to-top action, and showroom disclosure note.

### 4.9 Responsive Architecture, Accessibility, Performance & Reduced Motion
- **Responsive Viewport Spectrum:**
  - Fluid grid layouts calibrated across 360px, 390–430px, 768px, 1366px, and 1920px.
  - Zero accidental horizontal scroll (`overflow-x: hidden` enforced on body).
  - Explicit breakpoint design tokens defined in `src/styles/tokens.css` (`--breakpoint-xs: 360px` through `--breakpoint-2xl: 1920px`).
- **WCAG 2.2 AA Accessibility Compliance:**
  - Single `<h1>` document hierarchy anchored in `HeroSection.tsx`.
  - Visible focus indicators: 2px solid `var(--color-focus)` with 2px offset on all interactive `:focus-visible` elements.
  - Minimum touch target bounding areas of 44px $\times$ 44px (`.touch-target`).
  - Swatches include localized `aria-label` and visual/accessible checkmark indicators computed dynamically via luminance (`isDarkColor()`).
  - Dialog & lightbox focus management: `role="dialog"`, `aria-modal="true"`, focus trapping, and keyboard `Escape` listeners.
- **Image Performance & Prioritization:**
  - Hero campaign visual marked with `loading="eager"` and `fetchPriority="high"` for immediate Largest Contentful Paint (LCP) resource fetching.
  - Below-the-fold catalog cards utilize `ImageFrame` enforcing `loading="lazy"` and graceful `onError` fallback handling.
- **Prefers Reduced Motion:**
  - Global `@media (prefers-reduced-motion: reduce)` block in `src/styles/global.css` resets non-essential animation durations and transitions to 0.01ms while forcing `scroll-behavior: auto` to prevent forced scroll locks.
- **Stacking Context Invariant:**
  - Strict centralized z-index hierarchy: Floating WhatsApp (`45`) < Header (`50`) < Modal Backdrop (`100`) < Modal (`110`) < Lightbox Backdrop (`200`) < Lightbox (`210`).

---

## 5. Adding or Updating Products & Asset Ingestion

To add, update, or replace products in the showroom:
1. **Authoritative Guides**: Review [`docs/ADDING_PRODUCTS.md`](file:///docs/ADDING_PRODUCTS.md) for complete record specifications and [`docs/PRODUCT_IMAGES_AND_COLORS.md`](file:///docs/PRODUCT_IMAGES_AND_COLORS.md) for photography specifications and color variant rules.
2. **Asset Staging**: Place unedited incoming assets into `incoming-assets/products/<product-slug>/` and fill out the intake manifest template at `incoming-assets/catalog/product-catalog.md`.
3. **Deployment Assets**: Copy optimized WebP/JPEG images (4:5 aspect ratio, 1200×1500px, 150–350KB) to `public/images/products/<product-slug>/`.
4. **Catalogue Entry**: Add a typed `Product` record into `src/data/products.ts`. Set `isDemo: false` for genuine business inventory.
5. **Validation**: Run `npm run type-check` and `node scratch/test-catalog-validation.mjs` to assert non-empty IDs, physical image existence, and strict discount rules (`originalPrice > price > 0`).
6. **Local Preview**: Verify on `http://localhost:5173/` that the new card automatically participates in the responsive grid and category filters with zero component markup edits.
7. **Production Mode Transition**: Once genuine inventory replaces demo items, update `contactConfig.catalogMode = 'production'` in `src/config/contact.ts` to automatically hide demo preview notices.

---

## 6. Deployment to Vercel

The application is a standard static Vite React bundle fully compatible with Vercel Hobby tier.

1. **Build Command:** `npm run build` (`tsc -b && vite build`)
2. **Output Directory:** `dist`
3. **Environment Variables:** None required for core functionality.
4. **Step-by-Step Guide:** Follow [`docs/DEPLOYMENT.md`](file:///docs/DEPLOYMENT.md) for detailed Git integration and Vercel CLI instructions, custom domain setup, and caching rules.

