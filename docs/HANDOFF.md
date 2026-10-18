# Caramel Website — AI Handoff Document

This document is the persistent handover context between AI sessions and agents working on the Caramel fashion showroom.

---

## 1. Project Objective & Boundaries

- **Objective:** Build a luxury bilingual (Arabic RTL / English LTR) 2D fashion showroom for Caramel featuring handbags, clothing, and accessories.
- **Conversion Goal:** Inquiries via WhatsApp and direct social channels (NOT an ecommerce store).
- **Hard Boundaries (Non-negotiable):**
  - **NO** 3D viewers (Three.js, WebGL, GLB/GLTF).
  - **NO** mannequins, AR, or virtual try-on.
  - **NO** checkout, cart, payments, customer accounts, or database.
  - **NO** fake browser-upload persistence or admin backend.
  - **NO** CSS color filters to simulate product colors — each variant MUST have genuine image assets.
  - **NO** fabricated reviews or fake contact links.
  - **Static Vercel Deployment:** The public build must be static (`dist/`).

---

## 2. Mandatory Reading Order for Any New AI Session

Before modifying code, you MUST inspect:
1. `AGENTS.md`
2. `MASTER_PROJECT_SPEC.md`
3. `ANTIGRAVITY_PROMPT_PACK.md`
4. `docs/PROJECT_STATUS.md`
5. `docs/REQUIREMENTS_TRACEABILITY_MATRIX.md`
6. `docs/IMPLEMENTATION_LOG.md`
7. `.agents/skills/ui-ux-pro-max/SKILL.md`

---

## 3. Completed Phases & Verification Evidence

### Phase 1: Workspace Inspection, Requirements Traceability, and Audit (COMPLETED)
- **Status:** Complete (2026-10-17).
- **Evidence:** Environmental audit, requirements matrix, and documentation suite created.

### Phase 2: Minimal Project Setup and Architecture (COMPLETED)
- **Status:** Complete (2026-10-17).
- **Evidence:** React 19 + TypeScript + Vite project scaffolded, type-check passed, build completed in 5.08s, dev server running on `http://localhost:5173/`.

### Phase 3: Premium Design Tokens, Typography, and Responsive Foundations (COMPLETED)
- **Status:** Complete (2026-10-17).
- **Evidence:** Expanded `src/styles/tokens.css` with fluid typography, surface elevations, `--color-product-surface`, and responsive gutters. Created reusable primitives in `src/components/common/` (`Button`, `Badge`, `SectionHeader`, `EmptyState`, `ImageFrame`).

### Phase 4: Arabic/English Localization, RTL/LTR, and Persistent Themes (COMPLETED)
- **Status:** Complete (2026-10-17).
- **Evidence:** Pre-hydration anti-flash script in `index.html`; 121 translated keys in `ar.ts` and `en.ts` with 100% parity; `PreferencesProvider` and `usePreferences()` hook; accessible segmented `LanguageSwitcher` and `ThemeToggle`.

### Phase 5: Header, Navigation, Hero, Editorial Sections, and Restrained Motion (COMPLETED)
- **Status:** Complete (2026-10-17).
- **Evidence:** Modular `Header`, `HeroSection`, and `EditorialStory` components; generated 16:9 campaign visual (`/images/hero-campaign.jpg`) and craftsmanship visual (`/images/editorial-spotlight.jpg`); `scroll-margin-top: 88px` on all section targets; build passed in 5.75s; translation parity passed.

### Phase 6: Typed Product Model, Central Catalogue, and Demo/Production Configuration (COMPLETED)
- **Status:** Complete (2026-10-17).
- **Evidence:** Enhanced `Product` and `ProductVariant` interfaces in `src/types/product.ts`; added `CatalogMode` ('demo' | 'production'); implemented comprehensive validator in `src/utils/productValidation.ts` asserting strict discounts (`originalPrice > price > 0`), non-negative prices, and duplicate ID prevention; implemented helper utilities in `src/utils/catalog.ts`; created copyable template in `docs/PRODUCT_RECORD_TEMPLATE.md`; 18/18 unit tests passed.

### Phase 7: Reusable Product Cards, Real Filters, and a Populated Local Demo Catalogue (COMPLETED)
- **Status:** Complete (2026-10-18).
- **Evidence:**
  - Seeded 9 typed demo products in `src/data/products.ts` across Handbags (4 models, 5 genuine variant visuals) and Apparel (5 models).
  - Generated 10 high-resolution local demo photographs in `public/images/demo-products/` with provenance logged in `docs/DEMO_ASSET_SOURCES.md`.
  - Built reusable `ProductCard` component (`src/components/ProductCard/`) with dynamic color variant switching (no CSS filters), strict `-X%` discount badges, localized EGP pricing, and accessible touch/keyboard controls.
  - Built reusable `ProductCollection` component (`src/components/ProductCollection/`) with live category count chips (All, Handbags, Apparel, Accessories), honest localized empty states, and prominent bilingual demo notice banner.
  - Replaced inline sample cards in `src/App.tsx` with dynamic `ProductCollection`.
  - Automated test suite `scratch/test-data-driven-collection.mjs` passed 19/19 tests (including temporary product add/remove invariant with zero leftover test artifacts).
  - `npm run type-check` (0 errors) and `npm run build` (5.70s, 0 errors) passed.

### Phase 8: 2D Product Detail Gallery, Thumbnails, Lightbox, and Image Resilience (COMPLETED)
- **Status:** Complete (2026-10-18).
- **Evidence:** Built 2D inspection modal (`ProductDetailsModal.tsx`) and full-resolution accessible lightbox (`Lightbox.tsx`); implemented thumbnail suppression for single-image products; image resilience and focus traps verified; 11/11 unit tests in `scratch/test-product-gallery.mjs` passed.

### Phase 9: Accurate Color Variants and Synchronized Product Inquiry (COMPLETED)
- **Status:** Complete (2026-10-18).
- **Evidence:** Built `inquiry.ts` module with 44px accessible swatches, relative luminance checkmark contrast, modal thumbnail isolation, pre-formatted inquiry generator, and `#contact` concierge card; 11/11 tests in `scratch/test-color-variants.mjs` passed.

### Phase 10: Safe Import of Owner Product Assets and Catalogue (COMPLETED)
- **Status:** Complete (2026-10-18).
- **Evidence:**
  - Established incoming asset staging directories in `incoming-assets/` (`brand/`, `products/`, `reviews/`, `catalog/`) preserving originals.
  - Authored owner intake manifest template at `incoming-assets/catalog/product-catalog.md`.
  - Authored authoritative operational manuals: [`docs/ADDING_PRODUCTS.md`](file:///docs/ADDING_PRODUCTS.md) (comprehensive catalogue management) and [`docs/PRODUCT_IMAGES_AND_COLORS.md`](file:///docs/PRODUCT_IMAGES_AND_COLORS.md) (photography specifications, 4:5 aspect ratio, and variant isolation).
  - Initialized deployment asset directory at `public/images/products/<slug>/`.
  - Verified catalogue extensibility invariant: adding a typed record to `src/data/products.ts` renders automatically into the grid, category filters, and modal without editing card/grid components; tested temporary record addition and clean removal with zero leftover artifacts.
  - Truthful catalogue mode safety: verified `catalogMode: 'demo'` remains active while demo items remain; bilingual preview notice remains visible.
  - Automated test suite `scratch/test-owner-import-validation.mjs` passed 7/7 assertions; regression test suites passed 11/11, 11/11, 19/19, and 18/18 tests; `npm run type-check` (0 errors) and `npm run build` (8.79s, 0 errors) passed.

### Phase 11: Genuine Customer-Review Screenshot Gallery (COMPLETED)
- **Status:** Complete (2026-10-18).
- **Evidence:**
  - Built typed review model (`src/types/review.ts`) and central decoupled data source (`src/data/reviews.ts`) with zero fabricated data.
  - Built reusable `ReviewCard` component with natural screenshot aspect ratios (9:16) without text cropping.
  - Built accessible `ReviewLightbox` modal with focus trap, `Escape` key handling, and natural image containment (`maxHeight: 80vh`, `objectFit: contain`).
  - Built master `ReviewGallery` component (`src/components/Reviews/ReviewGallery.tsx`) with WAI-ARIA tablist (All Platforms, Facebook, Instagram, TikTok), live item count badges, WCAG 44px min touch targets, honest localized empty states, and upfront transparency pledge banner (`t.reviews.honestNotice`).
  - Integrated `<ReviewGallery />` into `App.tsx` replacing inline mock markup.
  - Expanded bilingual dictionaries (`src/i18n/ar.ts`, `src/i18n/en.ts`) to 155 translated keys with 100% parity.
  - Automated test suite `scratch/test-review-gallery.mjs` passed 9/9 tests; all regression test suites passed; `npm run type-check` (0 errors) and `npm run build` (5.38s, 0 errors) passed.

---

### Phase 12: Contact Configuration, Product Inquiry Actions, Footer, and Floating WhatsApp (COMPLETED)
- **Status:** Complete (2026-10-18).
- **Evidence:**
  - Consolidated centralized contact settings in `src/config/contact.ts` defaulting to `undefined`.
  - Built `FloatingWhatsApp` button fixed to bottom-left with `--z-floating-action: 45` and minimum 48px touch target.
  - Built `SocialLinks` displaying only verified configured destinations (WhatsApp Channel, Instagram, TikTok, Facebook).
  - Built `ContactSection` with Active Inquiry Concierge Card, piece thumbnail/color/price summary, copyable message box, 1-click clipboard copy, and boutique hours.
  - Built luxury `Footer` with brand wordmark, localized tagline, navigation shortcuts, back-to-top action, and showroom disclosure note.
  - Expanded bilingual dictionaries (`src/i18n/ar.ts`, `src/i18n/en.ts`) to 170 keys with 100% parity.
  - Automated test suite `scratch/test-contact-inquiry.mjs` passed 9/9 tests; all 8 regression suites passed; `npm run type-check` (0 errors) and `npm run build` (5.29s, 0 errors) passed.

---

### Phase 13: Responsive, Accessibility, Performance, Reduced Motion, and Browser QA (COMPLETED)
- **Status:** Complete (2026-10-18).
- **Evidence:**
  - Verified responsive design across 360px, 390–430px, 768px, 1366px, 1920px viewports with zero horizontal overflow (`overflow-x: hidden`).
  - Added responsive reference breakpoint tokens to `src/styles/tokens.css` (`--breakpoint-xs` through `--breakpoint-2xl`).
  - Audited and asserted single `<h1>` document hierarchy in `src/components/HeroSection/HeroSection.tsx`.
  - Reinforced visible focus rings with explicit 2px solid outline and 2px offset on all `:focus-visible` interactive elements (`button`, `a`, `[role="tab"]`, `[role="radio"]`).
  - Verified touch target utility `.touch-target` with `min-width: 44px` and `min-height: 44px`.
  - Fixed sticky header stacking context to `var(--z-header, 50)` to ensure proper elevation over Floating WhatsApp (`--z-floating-action: 45`).
  - Aligned footer navigation shortcut anchor to `#editorial-story`.
  - Optimized hero image Largest Contentful Paint (LCP) with `fetchPriority="high"` and `loading="eager"`.
  - Verified global `@media (prefers-reduced-motion: reduce)` block in `src/styles/global.css` resetting animation durations to 0.01ms and forcing `scroll-behavior: auto`.
  - Verified strict absence of 3D/WebGL/GLTF, mannequins, virtual try-on, cart/checkout/payment, and CSS `hue-rotate` filters.
  - Comprehensive automated test suite `scratch/test-phase13-qa.mjs` passed 13/13 assertions; all 8 previous regression test suites passed; `npm run type-check` (0 errors) and `npm run build` (6.19s, 0 errors) passed.

---

## 4. Current Working State

- Development server is running as a daemon on **`http://localhost:5173/`**.
- Sticky glassmorphic header renders smoothly at `var(--z-header, 50)` with full bilingual and theme controls, desktop links, and accessible mobile drawer.
- Campaign hero presents an art-directed fashion campaign with dominant imagery, prioritized LCP (`fetchPriority="high"`), single `<h1>`, and clear call to action.
- Editorial craftsmanship story introduces the brand's tactile leather artistry and offers direct category jump shortcuts.
- Collection section renders 9 luxury fashion product cards with live category filters and synchronized color swatches.
- Selecting swatches dynamically and atomically updates the displayed image, active color label, and radio checked state.
- Clicking any product card (image, title, or eye button) opens the 2D Product Details inspection modal, with variant-specific image sets isolated from other colors.
- Multi-image products display an interactive thumbnail gallery; single-image products display cleanly without fake thumbnails.
- Clicking main photo or zoom badge opens the full-resolution 2D Lightbox with zoom toggle and arrow navigation.
- Customer review section renders authentic platform tabs (All Platforms, Facebook, Instagram, TikTok) with honest localized empty states and a transparency pledge banner.
- Contact section features the Active Inquiry Card with piece thumbnail, selected color, price, pre-formatted message box, and 1-click clipboard copy, plus official showroom channels and concierge hours.
- Persistent Floating WhatsApp button is fixed to bottom-left, meets 48px touch targets, uses `--z-floating-action: 45`, and clearly indicates demo status without navigating to fake URLs.
- Luxury editorial footer renders brand wordmark, tagline, navigation shortcuts, back-to-top button, and honest showroom disclosure note.
- Incoming assets staging structure (`incoming-assets/`) and intake template are ready for owner files.
- Authoritative documentation guides (`docs/ADDING_PRODUCTS.md`, `docs/PRODUCT_IMAGES_AND_COLORS.md`) are complete.
- Strongly typed catalogue model and validation engine are active and tested.
- `catalogMode: 'demo'` safely controls demo display versus production isolation.
- Dark mode is default; Light mode is warm porcelain; merchandise photos sit on neutral `--color-product-surface`.
- Accessibility and responsive QA hardened with 2px `:focus-visible` rings, reduced-motion resets, and zero prohibited features.

---

### Phase 14: Owner Documentation, Vercel Guidance, Final Acceptance, and Handover (COMPLETED)
- **Status:** Complete (2026-10-18).
- **Evidence:**
  - Authored comprehensive root `README.md` detailing project purpose, conversion model, architecture constraints, prerequisites, npm scripts, automated testing commands, and repository structure.
  - Authored `docs/DEPLOYMENT.md` providing static Vercel deployment instructions (GitHub integration & CLI), custom domain DNS setup, asset optimization, and immutable CDN caching rules.
  - Confirmed all operational guides (`docs/ADDING_PRODUCTS.md`, `docs/PRODUCT_IMAGES_AND_COLORS.md`, `docs/PRODUCT_RECORD_TEMPLATE.md`, `docs/DEMO_ASSET_SOURCES.md`) are complete and aligned with actual code.
  - Updated `docs/REQUIREMENTS_TRACEABILITY_MATRIX.md` with 100% of requirements (REQ-01 through REQ-22) marked as Verified.
  - Final static production build compiled cleanly in 4.98s (`dist/` generated, 0 TypeScript errors).

---

### Premium Visual Redesign & Interaction Upgrade (COMPLETED)
- **Status:** Complete & Browser-Verified (2026-10-18).
- **Evidence:**
  - Reference analysis completed for `Reference/reference-image.png` and `reference-video.mp4`.
  - Re-anchored design system around exact reference chocolate mocha palette (`#1C100A`, `#27170F`, `#341D12`, `#D5B078`, `#FAF7F2`, `#E9D8C3`).
  - Implemented continuous Living Fashion Background (`LivingFashionBackground.tsx`) using 5 transparent fashion cutouts (jacket, sunglasses, caramel bag, quilted dark bag, gown) with multi-layer depth and scroll parallax.
  - Upgraded Product Cards with smooth hover elevation, image zoom, glowing swatches, and staggered entrance delays.
  - Integrated 3 official social destinations (WhatsApp Channel, Instagram, TikTok) with authentic icons + signature Brand Showcase Card from reference image.
  - Anchored floating WhatsApp direct contact button strictly to bottom-left corner (`wa.me/201095203967`).
  - Added exact footer credit: `Developed by Waheed Ahmed` where `Waheed Ahmed` is rendered in bold gold and opens the verified Facebook profile.
  - Headless Chrome CDP tests verified desktop, mobile (390x844), light mode, English LTR, and 0 runtime exceptions.

### Phase 14: Design Refinement, Visual Consistency & Single Dark Brown Theme Upgrade (COMPLETED)
- **Status:** Complete & Browser-Verified (2026-10-18).
- **Evidence:**
  - Strictly Single Dark Brown Theme: Completely removed all light-mode token rules, light-mode CSS overrides, and UI theme toggles. Theme permanently locked to `'dark'` in pre-hydration script (`index.html`) and `PreferencesContext.tsx`.
  - Header & Navigation: Expanded link spacing (`gap: var(--space-2xl)`), animated gold underline hover effects (`.editorial-nav-link`), 80px balanced height.
  - Compact Language Switcher: Sleek luxury pill (`عربي | EN`) taking minimal header space (28px height), gold active indicator, seamless AR RTL / EN LTR switching.
  - Hero Hierarchy: Spacious breathing room, relaxed line heights, 48px CTAs, framed campaign visual with warm gold border and ambient glow.
  - Living Fashion Background: Preserved and polished with 5 transparent cutouts, multi-layer depth, scroll parallax, and pointer-events disabled on decorative layers.
  - Curated Collection & Product Cards: Portrait 4:5 image ratio, dark chocolate `#20120B` product surface, gold mocha borders, accessible swatches.
  - Demo Client Conversations Suite: 4 dark luxury SVG conversation mockups under `public/images/demo-reviews/` (WhatsApp Direct, Instagram DM, WhatsApp VIP Styling, Facebook Messenger); clearly marked with bilingual demo banner and badges; 1-step replacement via `src/data/reviews.ts`.
  - Floating WhatsApp & Footer Credit: Fixed bottom-left button (`wa.me/201095203967`); exact footer credit `Developed by Waheed Ahmed` linking to Facebook profile (`https://www.facebook.com/share/1dBWectEMA/`).
  - Automated Browser Audit: 100% passed across desktop and mobile (390x844), 0 console errors, 0 runtime exceptions.

### Phase 16: Dual Theme System, Repeating Scroll Animations, Social Interactions & Mobile Polish (COMPLETED)
- **Status:** Complete & Verified (2026-10-18).
- **Evidence:**
  - Dual Luxury Color Themes: Dark Brown Mode (`#1C100A` deep espresso canvas, `#27170F` mocha surface, `#D5B078` champagne gold accent) and Cream Light Mode (`#FBF7F2` soft ivory off-white canvas, `#F4EDE3` almond cream surface, `#26160F` espresso typography with >11:1 contrast ratio, `#9E6938` amber caramel accents).
  - Theme Switcher: Accessible 36x36px Sun/Moon pill button in top navigation; zero startup flash via `index.html` pre-hydration script; persistence in `localStorage` (`caramel_theme`).
  - Simplified 4-Section Navigation: Exactly four primary destinations: **Home** (`#home`), **Our Products** (`#collection`), **Reviews** (`#reviews`), **Contact** (`#contact`) in Arabic and English with smooth scroll and category preservation.
  - Repeating Scroll-Triggered Animations: `useScrollReveal` hook combining `IntersectionObserver` with viewport exit reset and `MutationObserver`; elements animate on entry, reset on exit, and repeat upon return; full `prefers-reduced-motion` support.
  - Social Brand Interactions: Single group of 3 cards with official hover/focus/tap animations: Instagram (`.is-instagram` gradient/rose glow), WhatsApp Channel (`.is-whatsapp` emerald green glow), TikTok (`.is-tiktok` high-contrast dark badge with neon cyan/magenta drop shadows).
  - Persistent Floating WhatsApp: Direct contact button (`wa.me/201095203967`) at bottom-left corner with theme-adaptive styling.
  - Mobile Polish: Full website preserved on mobile; balanced 2-column product collection grid; accessible drawer menu exposing all 4 links, language switcher, and theme toggle; zero horizontal overflow.
  - Verification: `npm run type-check` (0 errors), `npm run build` (10.74s, 0 errors, static bundle generated), live Vite dev server at `http://localhost:5174/`.

---

## 4. Current Working State

- Development server is running as a daemon on **`http://localhost:5174/`**.
- Dual luxury themes active: Dark Brown Mode (default) and Cream Light Mode, toggled via header pill button and persisted in `localStorage`.
- Simplified 4-section top navigation: Home (`#home`), Our Products (`#collection`), Reviews (`#reviews`), Contact (`#contact`).
- Repeating scroll-triggered entrance animations active across the entire page via `useScrollReveal`.
- Calm ambient background: soft gold/chocolate ambient gradients in dark mode and warm ivory glows in light mode.
- Single social links group: Instagram, TikTok, WhatsApp Channel with official brand-color hover interactions.
- Persistent Floating WhatsApp button is anchored to the bottom-left corner (`wa.me/201095203967`).
- Minimal two-line footer with clickable developer credit to Facebook profile (`https://www.facebook.com/share/1dBWectEMA/`).
- Zero runtime errors, zero TypeScript errors (`tsc --noEmit`), and production build compiles cleanly (`npm run build`).

---

## 5. Next Steps for Visual Review & Owner

1. **User Visual Review**: Review the live preview at `http://localhost:5174/` across desktop and mobile, testing theme switching, repeating scroll animations, and social interactions.
2. **Owner Inventory Ingestion**: When ready, supply real product photography in `public/images/products/<slug>/` and update `src/data/products.ts`.
3. **Owner Customer Screenshots Ingestion**: When authentic chat screenshots are ready, place them in `public/images/reviews/`, update `src/data/reviews.ts`, and set `isDemo: false, verified: true`.
4. **Switch to Production Mode**: Once real inventory is in place, set `catalogMode: 'production'` in `src/config/contact.ts`.

---

## 6. Immutable Architectural Directives

1. **Dual Luxury Color Themes:** The website supports Dark Brown Mode (default) and Cream Light Mode. Both themes must retain brand elegance (no harsh stark white or generic black-and-gold).
2. **True 2D Product Photography:** Under no circumstances should 3D viewers (Three.js, WebGL, GLTF), virtual try-on, or CSS color-filter hue rotation be introduced.
3. **Data-Driven Collection:** Cards must never be hard-coded into page markup. `src/data/products.ts` is the single source of truth.
4. **Four Primary Navigation Links:** The top navigation must contain strictly Home, Our Products, Reviews, and Contact.
5. **Repeating Scroll Animations:** Scroll reveals must reset upon leaving the viewport so animations can repeat when returning. Respect `prefers-reduced-motion`.
6. **Preferences Architecture:** Always consume `usePreferences()` from `src/context/PreferencesContext.tsx` for language and theme switching.
7. **Arabic RTL as Default:** Default document language is Arabic (`dir="rtl"`, `lang="ar"`), with full English LTR toggle.
8. **No CSS Color Filter Shortcuts:** Every product variant must point to a legitimate photo file.
9. **Pure Static Architecture:** The website is 100% static with no runtime backend, database, or cart/checkout.

