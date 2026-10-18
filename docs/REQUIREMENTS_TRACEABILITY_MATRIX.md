# Requirements Traceability Matrix — Caramel Fashion Showroom

This matrix maps every major specification requirement from `MASTER_PROJECT_SPEC.md` and `ANTIGRAVITY_PROMPT_PACK.md` to its current implementation status, verification method, and targeted implementation phase.

## Status Legend
- **Working / Verified**: Implemented, verified with concrete test output.
- **In Progress**: Currently under active implementation in the current phase.
- **Pending**: Planned for an upcoming numbered implementation phase.
- **Blocked / External**: Depends on owner-supplied assets (genuine brand logo, real product inventory, genuine review screenshots, verified WhatsApp phone number). Handled honestly via demo mode or honest empty states.

---

| ID | Requirement Category | Detailed Specification | Current Status | Targeted Phase | Verification Evidence & Strategy |
|---|---|---|---|---|---|
| **REQ-01** | Visual Art Direction | Contemporary, youthful, chic, premium fashion editorial showroom. Layered near-black/charcoal dark mode default, intentional light mode, large product framing, no generic ecommerce card grids, no excessive gradients. | Verified | Phase 3, Phase 5, Phase 13 | Visual review across breakpoints, `ui-ux-pro-max` design tokens, neutral product backdrop. |
| **REQ-02** | Prohibited Features | No 3D viewers (Three.js/WebGL/GLTF/GLB), no mannequins/virtual try-on, no checkout/cart/payment, no customer accounts/db/backend, no fake browser-upload persistence. | Verified (Architecture constraint) | All Phases | Static architecture audit, dependency check, no backend modules. |
| **REQ-03** | Bilingual Support (AR & EN) | Arabic and English first-class support, immediate client-side switching, centralized dictionary, natural Arabic copy and idiomatic English. | Verified | Phase 4 | Full interface string switch check, zero hard-coded inline strings, 121 translated keys with 100% parity. |
| **REQ-04** | RTL / LTR Direction | Arabic sets `lang="ar"` & `dir="rtl"`; English sets `lang="en"` & `dir="ltr"`. CSS logical properties. No blind mirroring of product photos or directional logos. | Verified | Phase 4 | DOM attribute inspection, dynamic document title, media direction protection rule. |
| **REQ-05** | Language & Theme Persistence | LocalStorage persistence for language (default Arabic) and theme (default dark). Switching theme must not reset language; switching language must not reset theme. No flash of wrong theme. | Verified | Phase 4 | Pre-hydration anti-flash script in index.html, independent localStorage keys, validator tests. |
| **REQ-06** | Design System & Tokens | Centralized CSS tokens for surfaces, text, borders, shadows, spacing, typography (Cormorant / Montserrat / Cairo fallbacks). | Verified | Phase 3 | CSS token inspection, contrast ratio checks (WCAG 4.5:1 minimum). |
| **REQ-07** | Header & Navigation | Replaceable brand wordmark/logo, collection link, category links, reviews link, contact link, AR/EN switcher, theme toggle. Mobile responsive menu. | Verified | Phase 5 | Header component, keyboard Escape handling, mobile drawer, scroll-margin-top offset. |
| **REQ-08** | Hero & Editorial Flow | Dominant visual, editorial typography, natural Arabic/English copy, primary CTA scrolling directly to collection without mandatory animation. Respect `prefers-reduced-motion`. | Verified | Phase 5 | HeroSection & EditorialStory components, non-motion primary CTA, reduced motion rules. |
| **REQ-09** | Central Data-Driven Catalogue | Single source of truth (`src/data/products.ts`), strong TypeScript types, numeric EGP prices. Adding a valid record renders automatically into the grid without editing card/grid markup. | Verified | Phase 6, Phase 7 | `src/types/product.ts`, `src/utils/productValidation.ts`, and temporary record add/remove invariant test verified in `scratch/test-data-driven-collection.mjs`. |
| **REQ-10** | Numeric Pricing & Discounts | Numeric EGP price values formatted at render time using `Intl.NumberFormat`. Original price + discount percentage displayed only when valid and current < original. | Verified | Phase 6 | `calculateDiscount` strict discount validation and `formatEGPPrice` verified with 18 unit tests in `scratch/test-catalog-validation.mjs`. |
| **REQ-11** | Category Filtering | Real functional filtering by category (e.g., Handbags, Apparel, Accessories). Empty state when filter matches no records. Dynamically populated from active catalogue. | Verified | Phase 7 | Filter chips with live counts, instant grid update, and honest EmptyState verified in `ProductCollection.tsx`. |
| **REQ-12** | Demo Catalogue & Notice | Demo mode with 8–12 local sample items (at least 4 handbags/bags and 4 apparel items). Prominent bilingual notice that items and prices are illustrative samples. Central toggle `catalogMode`. | Verified | Phase 6, Phase 7 | 9 typed demo products in `src/data/products.ts`, 10 local images in `public/images/demo-products/`, bilingual notice banner rendered. |
| **REQ-13** | 2D Product Gallery & Sizing | High-resolution 2D image gallery. Stable aspect ratios (`contain` for product cutouts, intentional `cover` for lifestyle). Graceful fallback for missing primary or alternate images. | Verified | Phase 8 | `ProductDetailsModal.tsx` stable 4:5 frame, `ImageFrame.tsx` error reset effect, and thumbnail suppression verified in `scratch/test-product-gallery.mjs`. |
| **REQ-14** | Accessible Zoom / Lightbox | Optional image zoom/lightbox with keyboard focus trap, Escape to close, accessible ARIA labels, responsive touch sizing. No 3D/360-degree controls. | Verified | Phase 8 | `Lightbox.tsx` with focus trap, Escape listener, ArrowLeft/ArrowRight navigation, and 1x/1.85x zoom toggle verified in `scratch/test-product-gallery.mjs`. |
| **REQ-15** | Explicit Color Variant Mapping | Each color variant maps explicitly to its genuine image set. Selecting a color swatch updates: selected state, color label, main image, thumbnail set, and inquiry text atomically. NO CSS color filters. | Verified | Phase 9 | Swatches with >=44px touch targets, dynamic contrast checkmarks, image isolation, WhatsApp link, and concierge card verified in `scratch/test-color-variants.mjs`. |
| **REQ-16** | Owner Asset Import Workflow | Safe ingestion for real product photos and catalogue. Clear grouping under `public/images/products/<slug>/`. Preservation of originals in `incoming-assets/`. Verification of mappings. | Verified | Phase 10 | Staging folders, intake manifest, operational docs (`docs/ADDING_PRODUCTS.md`, `docs/PRODUCT_IMAGES_AND_COLORS.md`), and temporary record invariant verified in `scratch/test-owner-import-validation.mjs`. |
| **REQ-17** | Customer Review Screenshots | Dedicated review section with Facebook, Instagram, and TikTok platform tabs. Honest empty states until real screenshots are supplied. No fake reviews/ratings. | Verified | Phase 11 | Decoupled typed reviews model, platform tabs with 44px touch targets, full-res lightbox with focus trap, and honest empty states verified in `scratch/test-review-gallery.mjs`. |
| **REQ-18** | Contact & Floating WhatsApp | Centralized contact configuration (`src/config/contact.ts`). Unconfigured destinations remain disabled/hidden. Floating WhatsApp action fixed bottom-left with URL-encoded bilingual inquiry. | Verified | Phase 12 | Centralized safe config, bottom-left floating WhatsApp button, social links filtering, active inquiry concierge card, and footer verified in `scratch/test-contact-inquiry.mjs`. |
| **REQ-19** | Responsive Design | Explicitly verified at 360px, 390–430px, 768px, 1366px, and 1920px. No horizontal overflow, touch target sizes >=44px, legible typography. | Verified | Phase 13 | Breakpoint reference tokens defined, fluid containers, zero horizontal overflow (`overflow-x: hidden`), verified in `scratch/test-phase13-qa.mjs`. |
| **REQ-20** | Accessibility & QA | Semantic HTML5, visible focus rings, ARIA roles/labels, WCAG AA color contrast, reduced motion fallback, zero console errors. | Verified | Phase 13 | Single `<h1>` verified, 2px focus outline/offset, `.touch-target` >=44px, reduced-motion reset, verified in `scratch/test-phase13-qa.mjs`. |
| **REQ-21** | Performance & Static Build | Static build compatible with Vercel Hobby tier. Lazy loading noncritical images, prioritized hero image, clean static export. | Verified | Phase 2, Phase 13 | Production static bundle built (`dist/`, 6.19s), hero visual with eager loading and `fetchPriority="high"`, below-fold lazy loading. |
| **REQ-22** | Technical Documentation | `README.md`, `docs/ADDING_PRODUCTS.md`, `docs/PRODUCT_IMAGES_AND_COLORS.md`, `docs/DEPLOYMENT.md`, `docs/DEMO_ASSET_SOURCES.md`, plus ongoing maintenance docs. | Verified | Phase 1, Phase 14 | Complete documentation suite verified against implementation: README.md, DEPLOYMENT.md, ADDING_PRODUCTS.md, PRODUCT_IMAGES_AND_COLORS.md, DEMO_ASSET_SOURCES.md, and PRODUCT_RECORD_TEMPLATE.md. |

---

## Traceability to Implementation Phases

- **Phase 1 (Current)**: REQ-02 (boundaries audit), REQ-22 (documentation initialization & requirements matrix).
- **Phase 2**: REQ-21 (Vite + React + TS setup, static build path, directory structure).
- **Phase 3**: REQ-01, REQ-06, REQ-19 (Design tokens, typography, dark/light foundations).
- **Phase 4**: REQ-03, REQ-04, REQ-05 (Bilingual localization, RTL/LTR, persistence).
- **Phase 5**: REQ-07, REQ-08 (Header, hero, editorial scroll, restrained motion).
- **Phase 6**: REQ-09, REQ-10, REQ-12 (Typed product schema, demo/production config, price logic).
- **Phase 7**: REQ-09, REQ-11, REQ-12 (Reusable ProductCard, collection grid, filters, 8-12 local demo products).
- **Phase 8**: REQ-13, REQ-14 (2D image gallery, thumbnails, lightbox, image resilience).
- **Phase 9**: REQ-15 (Explicit color variant mapping, atomic state sync, inquiry builder).
- **Phase 10**: REQ-16 (Owner asset import workflow & catalogue replacement procedures).
- **Phase 11**: REQ-17 (Review screenshot tabs, honest empty states).
- **Phase 12**: REQ-18 (Contact section, footer, floating WhatsApp button).
- **Phase 13**: REQ-19, REQ-20 (Cross-breakpoint responsive QA, accessibility, reduced motion).
- **Phase 14**: REQ-21, REQ-22 (Owner documentation, Vercel deployment guide, final acceptance).
