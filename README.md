# Caramel Fashion Showroom (كاراميل)

An art-directed, bilingual (Arabic RTL / English LTR) luxury fashion showroom for **Caramel**, presenting high-end women's leather handbags, tailored apparel, and curated accessories.

The website delivers an editorial showroom experience with client-side localization, dark and light theme palettes, accurate 2D photographic inspection, explicit color variant synchronization, honest customer review screenshot galleries, and a direct WhatsApp VIP concierge inquiry workflow.

---

## 1. Project Purpose & Conversion Model

- **Boutique Showroom**: Built as a digital showroom for high-fashion clients to inspect collections, discover craftsmanship stories, view authentic colorways, and initiate orders.
- **Conversion Model**: **Contact-first via WhatsApp and direct VIP channels**. This is an art-directed showroom rather than an automated mass-market ecommerce store. There is **no automated cart, checkout, or payment gateway**.
- **Strict Architectural Boundaries**:
  - **Zero 3D/WebGL/GLTF**: Pure high-resolution 2D still photography only. No 3D viewers, wireframe models, rotatable canvases, mannequins, or virtual try-on tools.
  - **Zero Fake CSS Color Filters**: Each color variant is mapped explicitly to genuine photographic assets. CSS filters like `hue-rotate` are strictly forbidden.
  - **Zero Backend/Database**: 100% static client-side single-page application (SPA), ideal for zero-cost hosting on Vercel Hobby tier.
  - **Zero Fabricated Social Proof**: Customer reviews are authentic platform conversation screenshots (Facebook, Instagram, TikTok) presented in honest empty states until provided by the owner.

---

## 2. Prerequisites & Technology Stack

- **Node.js**: v18.0.0 or higher (v20+ / v22+ recommended)
- **Package Manager**: `npm` (bundled with Node.js)
- **Core Stack**:
  - React 19 (`react`, `react-dom`)
  - TypeScript 5.7
  - Vite 6.1
  - Lucide React (modern feather icons)
  - Pure CSS Design Tokens & CSS Logical Properties (zero Tailwind / zero CSS-in-JS runtime overhead)

---

## 3. Getting Started

### Installation
Clone the repository and install dependencies using `npm`:

```bash
npm install
```

### Local Development Server
Start the local Vite development server:

```bash
npm run dev
```

The showroom will be available at: **`http://localhost:5173/`**

### Type Checking
Verify all TypeScript types across the codebase:

```bash
npm run type-check
```

### Production Build
Compile and bundle the production-ready static assets into the `dist/` directory:

```bash
npm run build
```

### Local Preview of Production Build
Preview the compiled static bundle locally:

```bash
npm run preview
```

---

## 4. Automated Testing & Validation Scripts

The project includes automated regression and validation test suites executed with Node.js:

| Command | Purpose |
|---|---|
| `node scratch/test-phase13-qa.mjs` | Comprehensive 13-point QA suite (Breakpoints, WCAG focus rings, touch targets, reduced motion, single `<h1>`, image loading, prohibited features). |
| `node scratch/test-catalog-validation.mjs` | Schema validation, strict discount calculations (`originalPrice > price`), and mode isolation. |
| `node scratch/test-color-variants.mjs` | Color variant mapping, dynamic checkmark contrast, modal image isolation, and inquiry formatting. |
| `node scratch/test-product-gallery.mjs` | 2D inspection modal, lightbox zoom (1x/1.85x), image resilience, and thumbnail suppression. |
| `node scratch/test-data-driven-collection.mjs` | Reusable card rendering, live category filters, and temporary record add/remove invariant. |
| `node scratch/test-owner-import-validation.mjs` | Incoming asset intake, file presence, catalogue mode safety, and documentation integrity. |
| `node scratch/test-review-gallery.mjs` | Review model decoupling, platform tabs (FB/IG/TikTok), lightbox, and honest empty states. |
| `node scratch/test-contact-inquiry.mjs` | Contact configuration safety, WhatsApp URL unicode encoding, concierge card, and footer navigation. |
| `node scratch/test-translations-valid.mjs` | 100% dictionary key parity between Arabic (`src/i18n/ar.ts`) and English (`src/i18n/en.ts`). |

To run the complete automated test verification in sequence:
```bash
npm run type-check && npm run build && node scratch/test-phase13-qa.mjs
```

---

## 5. Repository Structure

```
Caramel-Website/
├── docs/                               # Authoritative documentation guides
│   ├── ADDING_PRODUCTS.md              # Beginner guide for adding & editing merchandise
│   ├── PRODUCT_IMAGES_AND_COLORS.md    # Photography guidelines & color variant rules
│   ├── PRODUCT_RECORD_TEMPLATE.md      # Copyable blank & annotated product templates
│   ├── DEPLOYMENT.md                   # Static Vercel deployment guide
│   ├── DEMO_ASSET_SOURCES.md           # Provenance of demonstration images
│   ├── PROJECT_STATUS.md               # Checkpoint tracker & test outcomes
│   ├── PROJECT_GUIDE.md                # Comprehensive architectural blueprint
│   ├── IMPLEMENTATION_LOG.md           # Complete chronological implementation history
│   ├── HANDOFF.md                      # AI session handoff document
│   └── REQUIREMENTS_TRACEABILITY_MATRIX.md # Master requirements verification matrix
├── incoming-assets/                    # Owner asset staging area (preserved originals)
│   ├── brand/                          # Staged brand logos & marks
│   ├── catalog/                        # Owner catalog manifests
│   ├── products/                       # Staged raw product photographs
│   └── reviews/                        # Staged customer conversation screenshots
├── public/                             # Public static web assets
│   ├── favicon.svg                     # Caramel brand icon
│   └── images/
│       ├── hero-campaign.jpg           # 16:9 hero campaign visual
│       ├── editorial-spotlight.jpg     # 4:3 craftsmanship story visual
│       ├── demo-products/              # 10 local demo fashion photographs
│       ├── products/                   # Owner deployment photos by <product-slug>
│       └── reviews/                    # Owner review screenshots by <platform>
├── src/                                # Application source code
│   ├── components/                     # Modular React UI components
│   │   ├── common/                     # Reusable primitives (Button, Badge, ImageFrame, etc.)
│   │   ├── Contact/                    # Contact section, VIP channels, floating WhatsApp
│   │   ├── EditorialStory/             # Tactile craftsmanship & story section
│   │   ├── Footer/                     # Luxury editorial footer & navigation shortcuts
│   │   ├── Header/                     # Sticky header, language/theme toggles, mobile menu
│   │   ├── HeroSection/                # High-impact campaign hero & primary CTA
│   │   ├── ProductCard/                # Reusable data-driven product card with swatches
│   │   ├── ProductCollection/          # Collection grid, category filters, empty states
│   │   ├── ProductDetails/             # 2D inspection modal, thumbnail strip, Lightbox
│   │   └── Reviews/                    # Review gallery tabs, cards, lightbox, empty states
│   ├── config/                         # Central configuration
│   │   ├── brand.ts                    # Brand wordmark, tagline, and identity
│   │   └── contact.ts                  # Safe contact channels & catalogMode switch
│   ├── context/                        # React Context providers
│   │   └── PreferencesContext.tsx      # Language, theme, and localized text resolver
│   ├── data/                           # Central data sources
│   │   ├── products.ts                 # Single source of truth for all products
│   │   └── reviews.ts                  # Customer conversation screenshot records
│   ├── i18n/                           # Internationalization dictionaries
│   │   ├── ar.ts                       # Arabic luxury translations (170 keys)
│   │   ├── en.ts                       # English editorial translations (170 keys)
│   │   └── index.ts                    # Translation keys & persistent storage helpers
│   ├── styles/                         # Centralized styling
│   │   ├── global.css                  # CSS reset, responsive utilities, WCAG focus, motion
│   │   └── tokens.css                  # Design tokens (surfaces, typography, spacing, layers)
│   ├── types/                          # TypeScript interfaces and contracts
│   │   ├── config.ts                   # Brand and contact configuration types
│   │   ├── product.ts                  # Product, variant, category, and validator types
│   │   └── review.ts                   # Review and platform types
│   ├── utils/                          # Pure business and catalog logic
│   │   ├── catalog.ts                  # Filtering, mode isolation, discount formulas, EGP format
│   │   ├── inquiry.ts                  # Pre-formatted WhatsApp messages & URL encoding
│   │   └── productValidation.ts        # Schema and invariant validation engine
│   ├── App.tsx                         # Main showroom shell & section assembly
│   └── main.tsx                        # Application mount & React strict mode root
├── index.html                          # Root HTML document with pre-hydration anti-flash script
├── package.json                        # Scripts and dependencies
├── tsconfig.json                       # TypeScript compiler configuration
└── vite.config.ts                      # Vite build configuration
```

---

## 6. Local Development Workflow

### Adding a New Product
1. Optimize your 4:5 fashion photograph (1200 $\times$ 1500 px, WebP or JPEG, 150–350 KB).
2. Place files in `public/images/products/<product-slug>/`.
3. Open `src/data/products.ts` and append a new product record using the template in [`docs/PRODUCT_RECORD_TEMPLATE.md`](file:///docs/PRODUCT_RECORD_TEMPLATE.md).
4. Run `npm run type-check` and `node scratch/test-catalog-validation.mjs` to verify schema validity.
5. Preview in the browser at `http://localhost:5173/`.
6. For full details, consult [`docs/ADDING_PRODUCTS.md`](file:///docs/ADDING_PRODUCTS.md).

### Switching from Demo Mode to Production Mode
1. In `src/config/contact.ts`, change `catalogMode: 'demo'` to `catalogMode: 'production'`.
2. In production mode, all records marked `isDemo: true` are automatically excluded, and the bilingual demo preview notice is hidden.
3. **Important**: Never switch to `'production'` until genuine owner products with verified photography are populated.

### Configuring Contact Channels
1. Open `src/config/contact.ts`.
2. Add the owner's international WhatsApp phone number (e.g. `'201000000000'`).
3. Add verified social media profile URLs (Instagram, TikTok, Facebook).
4. Any unconfigured destination left as `undefined` remains cleanly hidden or disabled in production.

---

## 7. Static Vercel Deployment

The application is completely static and deploys to Vercel in seconds:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Environment Variables**: None required.

For a comprehensive deployment guide, see [`docs/DEPLOYMENT.md`](file:///docs/DEPLOYMENT.md).

---

## 8. License & Attribution

- **Source Code**: Proprietary software developed for Caramel Fashion Showroom.
- **Demo Assets**: Temporary visual assets generated for interface demonstration purposes. Provenance and details are logged in [`docs/DEMO_ASSET_SOURCES.md`](file:///docs/DEMO_ASSET_SOURCES.md).
