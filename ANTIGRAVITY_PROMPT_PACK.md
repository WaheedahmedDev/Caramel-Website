# Antigravity Implementation Prompt Pack
## Premium Bilingual 2D Fashion Showroom — Demo Catalogue, Real Product Import, and Static Vercel Deployment

**Source of truth:** `Premium_Fashion_Website_Master_Prompt_2D_Demo_Catalog.md`  
**Purpose:** A sequential, copy-paste-ready set of prompts for Google Antigravity to inspect, implement, test, document, and prepare the actual project workspace.

---

# Part A — Brief Project Understanding

## Project objective

Build a premium, editorial-style women’s fashion product showroom that presents handbags, bags, clothing, accessories, and future owner-supplied categories through strong 2D product photography. It should feel like a considered fashion campaign rather than a generic ecommerce template. The primary customer journey is to discover the brand, browse a curated collection, inspect product photographs and approved real color variants, view genuine review screenshots, and contact the business about a product.

## Target customer experience

The site should offer:

- A high-impact campaign hero and restrained editorial/scroll storytelling.
- A responsive, data-driven collection with real category filters and reusable product cards.
- Product inspection through a 2D gallery, optional alternate views, accessible zoom/lightbox, and variant-specific images.
- Arabic and English interfaces, immediate language switching, Arabic RTL and English LTR layout, and persistent language preference.
- Dark mode by default, a deliberately designed light mode, and persistent theme preference that does not reset the selected language.
- A genuine customer-review screenshot gallery categorized by Facebook, Instagram, and TikTok, with honest empty states until authentic screenshots are supplied.
- Centralized, owner-configurable contact/social settings and a floating WhatsApp conversation action that never points to an invented destination.
- Responsive behavior, keyboard accessibility, reduced-motion support, image failure fallbacks, and clear owner documentation.

## Technical constraints

- Prefer the framework, dependencies, scripts, and architecture already present in the workspace if they are sound. For a new project, React + TypeScript + Vite is a reasonable default; CSS variables/design tokens and an established localization approach are preferred.
- Use ordinary 2D image files only. Each shown variant must explicitly map to its own correct primary photo and optional matching alternate views. Never rely on CSS filters to imply a real different product color.
- Keep the public website static and suitable for Vercel deployment. Core catalogue, gallery, filtering, language, themes, and variant behavior must not require a backend, database, paid AI API, or media-generation server.
- Do not build checkout, payment, cart, customer accounts, an order backend, an inventory backend, or a fake permanent browser uploader.
- The first preview must be visually populated by approximately 8–12 clearly labelled demo products, with at least four bags/handbags and four women’s clothing items. Use local demo images generated with available tools or legitimately usable images whose provenance/usage notes are documented. No fragile remote hotlinks.
- Demo product facts and prices are illustrative only and must be visibly labelled as such in Arabic and English. Do not invent the business’s actual inventory, prices, discounts, availability, logo, testimonials, phone number, or social links.
- Reviews remain empty until genuine supplied screenshots exist. Unconfigured social/contact destinations stay hidden or disabled.
- The collection must be data-driven: one valid record in the centralized catalogue creates one regular card in the same grid and automatically participates in filtering. Adding an image file alone does not register a product in a static site; a data record or a real, tested build-time importer is required.

## Explicitly out of scope

No 3D viewers, GLB/GLTF, WebGL, Three.js product rendering, AI image-to-3D, mannequin viewers, virtual try-on, AR/360-degree controls, browser-only uploads presented as permanent publishing, checkout/payments, accounts, database, mandatory backend, paid AI service, fabricated reviews, or fabricated brand/contact information.

## Assets and information the owner will eventually provide

- Brand name, logo, and any approved brand assets.
- Product photos and optional side/back/interior/detail/lifestyle views.
- A separate, owner-approved photo set for each genuine color variant that should be selectable.
- Actual bilingual product names/descriptions, categories, EGP prices, and original prices only for real discounts.
- Color names in Arabic and English, exact filenames for each color, and availability only if it should be shown and is known.
- Genuine review screenshots separated by source/category.
- Actual WhatsApp number/conversation destination, WhatsApp Channel URL, Instagram URL, and TikTok URL, if these should appear.

Antigravity should make the first preview useful without waiting for these real assets, then provide a careful, reversible route to replace all demo content.

---

# Part B — Global Context Prompt for Antigravity

**When to use:** Paste this at the start of the Antigravity project conversation, with the master Markdown specification attached or already accessible in the workspace. Reuse the same project conversation for the numbered phases.

## Copy-paste prompt

```text
You are the senior implementation team for this project: frontend architect, React/TypeScript engineer, fashion-focused UI/UX designer, Arabic RTL/LTR specialist, product-image workflow specialist, accessibility engineer, performance engineer, QA engineer, and technical writer.

PRIMARY SPECIFICATION AND WORKSPACE
1. Read the entire file `Premium_Fashion_Website_Master_Prompt_2D_Demo_Catalog.md` from beginning to end before changing code. Treat it as the primary source of truth, including Section 31, “Demo Catalogue, Starter Product Images, and Future Product Additions.” Do not rely on its opening summary alone. If the file has a suffix in its actual filename, locate and read the actual file rather than assuming the unsuffixed path exists.
2. Inspect the real workspace/repository before modifying anything: file tree, current framework, package manager, dependencies, scripts, existing routes/pages, CSS system, components, assets, configuration, and any existing tests/build checks. Preserve useful, working code and dependencies. Do not replace the project with an unrelated starter template.
3. Build a real, runnable website by editing actual project files. Do not stop at a plan, mockup, screenshot, design-only prototype, or instructions when implementation is possible. Work in manageable phases, run the checks available in the workspace, fix issues where practical, and report exactly what was changed and verified.
4. Never claim that a file, asset, image, test, link, feature, import, build, deployment, or license verification exists or works unless you actually inspected or tested it. Separate completed work, failed checks, unrun checks, assumptions, and owner actions.
5. Do not ask questions for minor unknowns. Make low-complexity implementation choices consistent with the specification and document them. Ask only when a genuine blocker or ambiguous product/variant mapping cannot be resolved from supplied data.

PRODUCT AND DEPLOYMENT BOUNDARIES
6. This is a premium, bilingual women’s fashion product showroom, not a conventional checkout store. The main conversion is a contact/inquiry action. Keep the public application static and Vercel-compatible. Core features must not require a backend, database, paid AI service, media-generation server, or persistent online storage.
7. Use ordinary 2D product photographs only. Do not introduce 3D viewers, GLB/GLTF, WebGL, Three.js product rendering, AI image-to-3D, mannequins, AR, virtual try-on, fake 360-degree controls, shopping carts, checkout, payment, customer accounts, order management, or inventory backend.
8. Never create an in-browser upload flow that implies a photo is permanently published to the deployed static catalogue. New public product content must be added to project assets and the central product data, then built/redeployed, unless a separately designed and genuinely implemented build-time importer is provided.
9. Color variants must be mapped explicitly in data. Selecting a color must update the selected swatch state, bilingual label, primary image, matching gallery thumbnails, and any configured product inquiry. Do not use whole-image CSS filters or overlays as a substitute for a real, owner-approved color-specific image. Do not invent variants.

FIRST-RUN DEMO REQUIREMENTS
10. Make the first local preview visually populated even before real products arrive. Create a clearly labelled `demo` catalogue mode with approximately 8–12 products, including at least four bags/handbags and four women’s clothing products. Render them through the same real reusable ProductCard and responsive collection used by normal catalogue records; do not make a separate fake showcase that bypasses the actual components.
11. Use locally stored demo images wherever feasible. Prefer original demo product images generated by an image-generation tool that is actually available in the working environment. Otherwise, use suitable assets whose usage terms can be checked and document provenance/uncertainty in `docs/DEMO_ASSET_SOURCES.md` or an equivalent file. Do not assume an image tool or license exists. Do not use fragile remote image hotlinks as the permanent strategy. If you cannot generate or safely obtain an image, record that limitation honestly and use the best functional local fallback available.
12. Clearly mark demo products and illustrative demo prices in both Arabic and English with a visible, tasteful, localized preview notice. Set explicit flags/configuration such as `catalogMode: "demo" | "production"` and `isDemo: true` where appropriate. Demo entries and illustrative prices must be easy to remove or replace. Production mode must not silently include demo products, sample prices, or sample variants. Keep the preview notice active while any demo product or illustrative price remains in the public catalogue.
13. Never seed fake customer reviews, customer names, ratings, actual availability, actual business inventory, actual brand claims, or made-up contact/social destinations. Leave review categories honestly empty until genuine screenshots are supplied. Keep unconfigured WhatsApp, WhatsApp Channel, Instagram, and TikTok destinations hidden or disabled.
14. Every demo swatch that is shown must map to its own correct local demo image set. If a second distinct image is unavailable, do not show a second color swatch merely to decorate the card.

CATALOGUE ARCHITECTURE AND HONEST DATA FLOW
15. Keep the product collection fully data-driven. One centralized local catalogue/manifest is the source of truth. Each valid unique record must automatically render a standard reusable product card in the same responsive grid, participate in applicable category filtering/order rules, and use the record’s own details/images/variants. Do not hard-code cards one by one. Validate duplicate IDs, missing primary images, malformed variant data, and invalid prices/discounts where practical.
16. Explain in the docs that copying image files alone does not register a product in a regular static catalogue. The owner must add a catalogue record too, unless a real build-time asset importer has been implemented and tested. If you implement such a script, test it on a temporary record and document its actual behavior; do not claim auto-detection otherwise.

REQUIRED EXPERIENCE
17. Implement Arabic and English as first-class languages with centralized translations, instant switching, correct `lang` and `dir` attributes, RTL/LTR behavior, natural localized UI copy, appropriate font fallbacks, and local language persistence. Default to Arabic when no valid preference exists.
18. Start in dark mode. Provide an intentionally designed light mode. Persist theme selection locally, avoid a visible theme flash where practical, and ensure switching themes does not reset language. Theme changes must not alter the actual colors in product photos.
19. Build a premium editorial composition: campaign hero, collection navigation, restrained motion, responsive product cards and filters, 2D product gallery with actual thumbnails and optional accessible lightbox, genuine review screenshot categories (Facebook/Instagram/TikTok), contact section, footer, and floating WhatsApp conversation action fixed at bottom-left only when a real direct destination is configured.
20. The hero CTA must navigate to the actual collection section and work without motion. Never delay essential actions with animations. Respect `prefers-reduced-motion`, keyboard navigation, visible focus, sufficient contrast, descriptive localized alt text, touch target size, and accessible dialog/lightbox focus/close behavior.
21. Use numeric EGP prices in data and localize formatting at render time. Show an original price and discount only when real/valid input values exist and the current price is lower than the original. Demo prices must be explicitly illustrative. Do not fabricate product descriptions, materials, dimensions, stock, or discounts.
22. Optimize images responsibly (local files, suitable WebP/AVIF where practical, stable aspect ratios, dimensions, lazy loading for noncritical images, hero priority, no unnecessary huge downloads). Missing primary/secondary assets must fail gracefully without breaking product details or inquiry actions. Use deployment-safe public paths.

IMPLEMENTATION DISCIPLINE
23. Follow the ordered phase prompts provided later in this same conversation. Before each phase, inspect the relevant files and current implementation instead of blindly forcing a suggested file structure. Adapt names to the actual repository while preserving the intent.
24. After meaningful changes, run the appropriate available commands: dependency installation only if required, type-check, lint, tests, production build, and browser/runtime checks where available. Do not invent package scripts. If browser automation or a capability is unavailable, state that clearly and perform the closest available verification.
25. Keep configuration centralized (brand, contact links, catalogue mode, tokens/themes) and implementation maintainable with reusable components and typed product, variant, gallery, review, and configuration data.
26. Required documentation, adapted to the real project, includes `README.md`, `docs/ADDING_PRODUCTS.md`, `docs/PRODUCT_IMAGES_AND_COLORS.md`, `docs/DEPLOYMENT.md`, plus demo-image source notes if external demo assets are used. Documentation must contain real commands and must not describe fictional features.
27. Before declaring completion, perform a requirement-by-requirement acceptance review based on the source spec. Verify the temporary catalogue-record test: add one temporary valid record, check that it appears in the same normal responsive grid and filters without editing ProductCard or grid markup, and remove it afterward. Confirm no test record remains.
28. At the end of each phase, report: (a) files inspected and changed, (b) features implemented, (c) exact commands/checks run and their outcomes, (d) checks not run and why, (e) missing/uncertain assets, (f) remaining owner actions, and (g) the next sensible phase. Never claim a deployment occurred unless it actually did.

Start by acknowledging the specification and performing the workspace audit requested by Phase 1. Do not start by replacing or scaffolding the project before inspecting it.
```

---

# Part C — Ordered, Copy-Paste-Ready Antigravity Prompts

## Prompt 1 of 14 — Workspace Inspection, Requirements Traceability, and Audit

**When to use:** First implementation prompt, immediately after the Global Project Context Prompt.

**Main objective:** Understand the real repository and translate the master specification into a practical implementation plan without premature rewrites.

**Inspect/update:** Entire repository tree, package/config files, existing application entry points, assets, routing, component/CSS structure, scripts, tests, and the attached master Markdown file. This phase should generally produce an audit and plan rather than large code changes.

### Exact prompt text

```text
PHASE 1 — WORKSPACE INSPECTION AND REQUIREMENTS AUDIT

Read `Premium_Fashion_Website_Master_Prompt_2D_Demo_Catalog.md` completely, including its final demo catalogue and future product additions section. Then inspect the entire current workspace before editing code.

Tasks:
1. Identify the framework, runtime, package manager/lockfile, build tool, styling method, routes/pages, dependencies, public/static asset conventions, localization support, theme implementation, existing components, tests, lint/type-check scripts, and deployment configuration.
2. Identify existing code and assets that can be preserved. Record broken or incomplete areas without replacing working features.
3. Convert the source specification into a requirements traceability matrix covering at least: editorial design, Arabic/English, RTL/LTR, persistent language preference, dark-first and light themes, header/hero/scroll scenes, data-driven catalogue, numeric EGP price/discount logic, real category filters, demo mode and local demo images, data-driven record-add test, 2D gallery/lightbox, exact color-to-image mapping, asset import workflow, genuine review screenshot categories and empty states, contact/social configuration, floating WhatsApp behavior, responsiveness at 360/390–430/768/1366/1920 px, accessibility, reduced motion, performance, static Vercel deployment, documentation, privacy/licensing, and final QA.
4. Classify findings as already working, partly implemented, missing, or unable to verify. Cite actual file paths and evidence from scripts or code rather than guessing.
5. Propose a phased implementation plan using the remaining prompts. Note dependencies and any risky migrations. Prefer the smallest reasonable set of changes.
6. List asset gaps, including brand assets, real product images/catalogue, review screenshots, and contact/social URLs. Do not ask for them yet; the first preview must use labelled demo content.
7. Do not implement 3D, GLB/GLTF, WebGL, Three.js product rendering, AI image-to-3D, mannequins, virtual try-on, checkout, payment, database, accounts, backend, or a fake permanent browser uploader.

Deliver:
- A concise repository audit.
- A requirements matrix mapping every major source requirement to current status and intended phase.
- The proposed file/component changes adapted to the actual repo.
- Exact commands available for build/type/lint/test/browser verification.
- Explicit blockers and assumptions.

Do not claim any runtime behavior was tested unless you ran it. Do not replace the project with a new template in this phase.
```

**Acceptance criteria:** The audit references actual files and scripts; every major source requirement is mapped to a phase; current working code and assets are identified; proposed setup is conditional on what exists.

**Verification:** Inspect repository and package scripts; no build is required unless the audit needs a baseline check. Run only commands confirmed to exist.

**Expected report:** Findings, requirements matrix, exact available commands, prioritized changes, and known blockers. No claim of implementation completion.

---

## Prompt 2 of 14 — Minimal Project Setup and Architecture

**When to use:** After Phase 1; run only the setup tasks that are necessary based on the audit.

**Main objective:** Make the existing project a reliable foundation without unnecessary rewrites or dependencies.

**Inspect/update:** `package.json` or equivalent manifest, lockfile, app entry point, build configuration, static asset settings, existing routes, TypeScript settings, and deployment configuration.

### Exact prompt text

```text
PHASE 2 — MINIMAL SETUP AND ARCHITECTURE

Reinspect the files identified by Phase 1 and implement only the setup changes required to support the specified website. Preserve the current stack and working architecture if they are sound. Do not perform a wholesale rewrite just to match an example folder tree.

Tasks:
1. Confirm the app runs locally and has a production build path. Use the existing framework if practical. For a genuinely new/empty project, use a lightweight React + TypeScript + Vite structure unless the workspace provides a stronger reason not to.
2. Keep the public app static and Vercel-compatible. Do not add a server, database, CMS, checkout, payment, accounts, image upload backend, paid AI API, or runtime image-generation service.
3. Create or refine reusable project areas for components, types, centralized data, localization, configuration, styles, static images, and documentation, adapting paths to the real repository.
4. Keep global brand/contact/catalogue configuration separate from component markup. Keep product records out of individual card components.
5. Avoid adding dependencies for capabilities the project does not need. Use CSS transitions for simple motion; add GSAP/ScrollTrigger only if the actual design requires it and the dependency is justified.
6. Confirm the asset path strategy works under a static Vercel build. Public assets should use deployment-safe paths, not development-only local filesystem paths.
7. Do not fabricate scripts. If a script is added, implement it and verify it runs.

Acceptance checks:
- The existing project remains recognizable and useful code is preserved.
- Dependency and lockfile changes are intentional.
- Local development and static production build commands are clear and valid.
- No backend or prohibited ecommerce/3D feature has been added.

Run the available baseline and post-change checks. Report actual commands and results, including any checks that could not run.
```

**Acceptance criteria:** The app has a valid local/build path; architecture decisions fit the real workspace; no unrelated rewrite or prohibited dependency is introduced.

**Verification:** Run the repository’s actual install/build/type/lint scripts as needed; do not assume script names.

**Expected report:** Files changed, setup decisions, commands/results, dependency changes, and unresolved setup issues.

---

## Prompt 3 of 14 — Premium Design Tokens, Typography, and Responsive Foundations

**When to use:** After the project foundation is stable.

**Main objective:** Establish a coherent premium fashion-art direction and reusable layout primitives before building every section.

**Inspect/update:** Existing global CSS, font configuration, theme files, component styles, responsive breakpoints, shared layout components, and brand configuration.

### Exact prompt text

```text
PHASE 3 — DESIGN SYSTEM AND RESPONSIVE FOUNDATIONS

Inspect the existing styles, typography, component conventions, and assets. Create or refine a centralized design system that supports the master specification’s premium, youthful, chic, editorial fashion-showroom direction without looking like a generic ecommerce template.

Tasks:
1. Centralize design tokens for dark and light surfaces, text levels, accent color, borders, shadows, spacing, type scale, content widths, gallery ratios, focus outlines, and motion timings. Do not permanently invent the brand’s actual logo or identity. Use a restrained replaceable wordmark/placeholder if no brand assets exist.
2. Dark mode is the default visual environment: layered charcoal/near-black rather than pure black everywhere, readable text, muted supporting text, restrained accents, careful borders, and clear product display surfaces.
3. Define a genuinely designed light theme with refined light neutrals, adequate contrast, and the same brand logic. Do not implement light mode as a blind filter/inversion.
4. Use editorial typography, generous but purposeful negative space, strong composition, clear hierarchy, distinct surfaces, controlled depth, and intentional image presentation. Avoid excessive gradients, rounded corners on every element, and random decoration.
5. Define sensible responsive breakpoints and shared page-width/gutter utilities. Plan and test the layout at 360 px, 390–430 px, 768 px, 1366 px, and 1920 px.
6. Use a suitable Arabic font stack and English fallback. Prefer CSS logical properties so layouts can support RTL and LTR without duplicating all styles.
7. Establish reusable button, icon-button, section-heading, image-frame, link, chip/filter, loading, empty-state, and focus-state patterns where these fit the existing codebase.
8. Ensure styling the site shell never applies filters/blend modes that alter the real colors of product photographs.

Acceptance checks:
- Theme/design tokens are centralized rather than scattered hard-coded values.
- The foundation works in both narrow and wide layouts and allows RTL/LTR.
- Product photos can sit on an appropriate surface in either theme without merchandise colors being changed.
- Keyboard focus is visible and contrast is deliberate.

Run the available build/type/lint checks and report any design assumptions that need the owner’s later brand assets.
```

**Acceptance criteria:** Shared tokens and foundations exist; dark and light environments are intentional; layout and typography are ready for both languages and planned breakpoints.

**Verification:** Build and type/lint checks; inspect responsive layout in a browser if available.

**Expected report:** Token/style files, reusable primitives, responsive checks performed, and unresolved branding assets.

---

## Prompt 4 of 14 — Arabic/English Localization, RTL/LTR, and Persistent Themes

**When to use:** Once the design foundation exists, before adding substantial localized page content.

**Main objective:** Implement complete bilingual UI behavior and independent language/theme persistence.

**Inspect/update:** Localization dictionaries, root app/shell, document metadata, CSS logical properties, storage/persistence helpers, language and theme controls.

### Exact prompt text

```text
PHASE 4 — BILINGUAL LOCALIZATION AND THEME BEHAVIOR

Inspect the current app shell, existing translation utilities, styles, and persistence approach. Implement Arabic and English as complete first-class interface languages using a centralized translation layer, adapting naming to the existing repository.

Tasks:
1. Provide a clear accessible language control in the header/shell with `العربية / EN` or an equally clear format. Switching language must update the UI immediately without a page reload.
2. Centralize interface strings. Localize navigation, hero content, CTAs, categories, filters, product controls, price/discount labels, variant/color names, gallery/lightbox labels, image-loading/errors, review tabs/empty states, contact/footer labels, and accessibility labels. Avoid scattered hard-coded language ternaries.
3. Arabic mode must set document `lang="ar"` and `dir="rtl"`, use an appropriate Arabic font stack, align text and spacing appropriately, and handle mixed Arabic/English product names and numbers. English mode must restore `lang="en"` and `dir="ltr"`.
4. Use CSS logical properties where practical. Do not blindly mirror product photography, image composition, or icons that should not be mirrored.
5. Persist a valid selected language locally and default to Arabic if no valid preference exists. Corrupt/unknown stored values must fall back safely.
6. Implement dark mode as the default with an accessible theme toggle and a deliberately styled light mode. Persist it independently. Theme changes must not reset language; language changes must not reset theme. Avoid a visible theme flash during initialization where practical.
7. Add focus states and accessible names/status for both controls. Test both languages at mobile and desktop sizes, with long headings and mixed-script product names/prices.

Acceptance checks:
- All currently implemented interface strings switch languages, not just the header.
- `lang` and `dir` are correct after each change.
- Arabic starts as the default when no valid preference is stored.
- Theme defaults to dark; theme and language persistence do not interfere with each other.
- Product images are not recolored or needlessly mirrored by language/theme CSS.

Run available automated checks and manually inspect the implemented states if browser access exists. Report untested conditions honestly.
```

**Acceptance criteria:** Complete centralized translations, correct document direction/language, and independent persistence for language/theme.

**Verification:** Available build/type/lint checks plus browser checks for all language/theme combinations if possible.

**Expected report:** Translation/configuration files, controls and persistence behavior, exact tests, and any untranslated strings remaining.

---

## Prompt 5 of 14 — Header, Navigation, Hero, Editorial Sections, and Restrained Motion

**When to use:** After localization and themes are available.

**Main objective:** Implement the opening brand experience and page navigation so the site feels like a premium fashion campaign.

**Inspect/update:** App/page composition, header/navigation, hero, section anchors, motion styles, and assets already in the workspace.

### Exact prompt text

```text
PHASE 5 — HEADER, HERO, EDITORIAL FLOW, AND MOTION

Inspect existing page sections, navigation, visual assets, localization strings, and design tokens before changing them. Build or refine the customer journey as an editorial fashion showroom, not a generic store banner.

Tasks:
1. Build a responsive header containing a replaceable brand/logo, collection link, available category links (such as bags/handbags and clothing), reviews link, contact link, language switcher, and theme toggle. Keep controls discoverable on mobile and avoid an overloaded header. A sticky header is optional; if used, section anchors must not be hidden behind it.
2. Build a campaign hero with one dominant visual, oversized editorial typography, a natural Arabic and English headline/subheading, negative space, controlled layering/depth, and a clear primary CTA to the actual product collection section. Do not invent brand claims, awards, product attributes, or real product inventory.
3. If real hero imagery has not been supplied, use an approved demo asset/local placeholder that is visibly demo-oriented when appropriate. Do not fabricate a logo or use a random remote image as a permanent dependency.
4. Add up to three broad editorial phases where helpful: campaign opening, oversized product showcase, and transition into practical collection browsing. Keep the page usable without completing or waiting for a scroll animation.
5. Use restrained CSS transforms/opacity transitions and only justified scroll effects. GSAP/ScrollTrigger should be added only if needed and not already excessive. Avoid heavy pinning, forced scrolling, or animations that delay buttons.
6. Respect `prefers-reduced-motion` and simplify/remove nonessential motion on mobile/low-powered devices. The collection CTA and navigation anchors must still work when animations are disabled.
7. Ensure all headings, navigation, and CTAs are localized and aligned correctly under RTL/LTR and dark/light themes.

Acceptance checks:
- Every navigation item points to an existing section or a legitimate configured destination.
- The hero CTA reaches the real collection without relying on motion.
- Layout re-composes on mobile rather than shrinking desktop composition.
- No animation blocks an essential action and reduced-motion mode remains usable.
- No fake product, brand, testimonial, or social content is introduced.

Run the actual build and check navigation/anchor behavior in available browser tooling. Report any placeholder visuals used.
```

**Acceptance criteria:** Working header/anchors, strong responsive hero, restrained editorial flow, localized UI, and a non-motion fallback.

**Verification:** Build and browser/keyboard checks for navigation, CTA, themes, languages, and reduced-motion setting when available.

**Expected report:** Components/styles changed, actual image assets used, anchor tests, and any placeholder content still present.

---

## Prompt 6 of 14 — Typed Product Model, Central Catalogue, and Demo/Production Configuration

**When to use:** Before building product card rendering; establishes the source of truth for product data.

**Main objective:** Define a maintainable data model, validation rules, centralized configuration, and a safe demo-to-production switch.

**Inspect/update:** Existing types, product data, brand/contact config, localization helpers, app state, and any current product catalogue source.

### Exact prompt text

```text
PHASE 6 — CENTRAL PRODUCT DATA MODEL AND CATALOGUE CONFIGURATION

Inspect the current product/catalogue code and data before editing. Create or refine a strongly typed central data source appropriate to the actual repository. Do not hard-code per-product facts inside UI components.

Tasks:
1. Define suitable product, category, gallery-image, color-variant, review, brand, contact, and catalogue-mode types. Adapt field names to the existing stack while preserving the following semantics.
2. A product record should support a stable unique ID/slug, Arabic and English names, optional bilingual description, category, numeric current price in EGP, optional numeric original price only for a real discount, primary image, optional alternate images, explicit variants, optional featured flag, owner-supplied availability only, optional object-position/presentation settings, and an explicit demo indicator where relevant.
3. A variant must support stable ID, bilingual color name, optional swatch color/image, its exact primary image path, optional gallery paths belonging to that same variant, and optional owner-supplied availability. No UI-level product-specific color arrays.
4. Keep price values numeric. Localize EGP formatting at render time. Calculate a discount only when original and current prices are valid and current price is lower than original price. Do not create discounts from missing data.
5. Add one centralized configuration to choose `demo` or `production` catalogue mode (or an equivalent safe pattern). In demo mode, render demo records and show a bilingual, visible notice that products/prices are samples. In production mode, do not render records marked `isDemo` and do not mix sample prices/variants with owner data. Keep the notice active while any demo product or illustrative price remains publicly displayed.
6. Put real business/contact values in a separate configuration. Unknown brand details and social/contact URLs must remain empty/unconfigured, not guessed.
7. Add pragmatic validation for duplicate IDs/slugs, absent/invalid primary image paths, variants with missing primary images, malformed prices, invalid discounts, and invalid gallery paths. Prefer build-time/dev warnings or testable validators rather than silently repairing facts.
8. Provide one clearly documented catalogue record/template suitable for a beginner to copy. If the repository supports runtime/build-time schema validation, use it only if proportionate and maintainable.
9. Establish a distinct storage location for demo images (for example `public/images/demo-products/`) and avoid mixing those with production assets unless the existing repository has an equivalent documented convention.

Acceptance checks:
- Product data comes from one central catalogue source.
- Data structures represent bilingual text, categories, EGP prices, optional valid discounts, images, and variant-specific galleries.
- Demo/production switching cannot silently represent demo records as real records.
- Contact URLs remain unconfigured until the owner supplies actual destinations.
- No 3D/viewer, backend, database, checkout, or permanent browser upload functionality is introduced.

Run type/build/tests available and add focused validation tests if a test framework already exists or can be added without undue overhead. Report what is actually validated.
```

**Acceptance criteria:** Central typed product model, no per-card hard-coded data, safe mode separation, and validation of important catalogue invariants.

**Verification:** Type-check/build and validation tests or a small reproducible test harness.

**Expected report:** Type/data/config files, validation rules, current catalogue mode, and unresolved data/asset gaps.

---

## Prompt 7 of 14 — Reusable Product Cards, Real Filters, and a Populated Local Demo Catalogue

**When to use:** After Phase 6; this phase should make the first preview visually useful before real product assets are supplied.

**Main objective:** Build the real data-driven collection using approximately 8–12 local-image demo products and prove that adding one record needs no card/grid markup change.

**Inspect/update:** Central product data, ProductCard, collection/grid, filters, categories, demo asset folders, price formatter, image fallback, and demo/production configuration.

### Exact prompt text

```text
PHASE 7 — DATA-DRIVEN COLLECTION, FILTERS, AND LOCAL DEMO SEED

Inspect the current product schema, catalogue source, collection/grid, reusable card, styling, available image tools, and existing local assets. Implement the real collection experience using the central data source from Phase 6.

Tasks:
1. Render products by iterating through the catalogue and a reusable ProductCard. Do not hand-code one card per product. The grid must naturally wrap into additional rows as the data grows; do not use fixed item counts that clip or hide later records.
2. Implement functional category filters that update the displayed records. Only show categories supported by the active catalogue. Add an honest localized empty state when a filter matches no items. Every newly added record must enter the ordinary grid and participate in filters automatically.
3. Show each product’s own image, bilingual name, numeric/localized EGP price, optional valid original price/discount, and only its explicitly configured variants. Make card interactions usable by touch and keyboard; hover cannot be the only way to access functionality.
4. Seed the actual demo catalogue with approximately 8–12 items, preferably eight as the minimum practical set: at least four handbag/bag products and at least four women’s clothing products (such as dresses, tops, shirts, or outerwear). Add accessories only if useful. All demo records must be explicitly marked as demo and use obviously illustrative pricing when shown. A bilingual preview notice must be visible.
5. Produce or obtain suitable demo product images using an image-generation capability that is actually available in this workspace. Prefer original generated demo images. If unavailable, use legally suitable local imagery and document the source/usage notes. Do not assume availability, do not claim generation/download if not done, and do not depend on fragile remote hotlinks. Place local demo assets in a clearly grouped area such as `public/images/demo-products/`.
6. Use attractive 2D product photography/visuals suited to bags and women’s clothing. Make demo products visually plausible without making claims that they are real inventory, specific materials, real stock, or owner products. Include `docs/DEMO_ASSET_SOURCES.md` if non-generated external assets are used, noting license/source verification honestly.
7. Demo variants are optional; only display a swatch when there is a separate, matching image explicitly mapped to that variant. Never fake another color with CSS filters. Hide the swatch selector for products without configured variants.
8. Test the data-driven requirement: add a temporary valid record to the central catalogue and verify it appears in the same collection/grid and correct category filter without editing ProductCard or grid component markup. Then remove the temporary record and verify it no longer appears. Do not leave the test record or its test price in the final catalogue.
9. Test a newly added product does not overflow, disappear, or require a one-off component. If practical, test duplicate/malformed record handling too.

Acceptance checks:
- At least four bags and four women’s clothing demo records are present, unless an environment limitation is explicitly documented.
- The initial preview is visually populated with working local image paths wherever feasible.
- Demo labels and illustrative prices are unmistakable in both languages.
- Filter clicks change the actual rendered collection.
- Adding/removing a temporary record proves the catalogue is data-driven without editing reusable card/grid markup.
- No fake reviews or fake business links are introduced.

Run build/type/lint/tests available. Inspect every local demo image path. Report exact image provenance, any images you could not create/obtain, the temporary-record test, and the remaining limitations.
```

**Acceptance criteria:** Visually populated demo collection, 4+ bags and 4+ clothing items, local working image paths where feasible, functioning filters, demo notice/prices, and a passing temporary-record test.

**Verification:** Build/type/lint/tests; open all demo image paths; run the add/remove record test; inspect collection at a narrow and wide viewport if browser access exists.

**Expected report:** Demo record count/category breakdown, local image list and source notes, filter results, temporary-record test outcome, and all missing assets/limitations.

---

## Prompt 8 of 14 — 2D Product Detail Gallery, Thumbnails, Lightbox, and Image Resilience

**When to use:** After product cards and data structures work.

**Main objective:** Deliver a polished image-only product inspection experience with real gallery controls and robust image failure behavior.

**Inspect/update:** Product detail/modal/page interaction, gallery and lightbox components, image path utilities, image presentation settings, lazy loading, and product/variant data.

### Exact prompt text

```text
PHASE 8 — 2D PRODUCT INSPECTION AND IMAGE GALLERY

Inspect the actual ProductCard flow, product schema, available image assets, and existing dialog/gallery components. Implement the product inspection experience entirely with ordinary 2D images.

Tasks:
1. Build or refine a product detail view/modal that shows the selected product’s large primary image, name, available price data, optional supplied description, currently selected color if configured, genuine alternate views when present, and a contact/inquiry action. Never invent missing product claims.
2. Thumbnail selection must display the exact corresponding supplied image. Only render thumbnails for valid paths. If the product/variant has one image, the gallery should still work without fake thumbnails.
3. Add an accessible zoom/lightbox when appropriate. It must show the selected real image, close visibly, support Escape, manage focus, prevent unintended background interaction while open, work on touch/narrow screens, and have useful localized alternative text. Do not stretch/crop away important product details.
4. Choose presentation per source image: prefer `contain` for isolated product photography; use `cover` for editorial/lifestyle photography only when cropping is intentional. Support per-product/per-image `object-position` when useful. Keep aspect ratios stable to reduce layout shift.
5. Provide graceful loading and broken-image behavior. A failed optional image/thumbnail should be hidden or replaced with a designed fallback. A failed primary image should show a polished placeholder while keeping product name, price, variant text, and contact action usable.
6. Optimize local images where feasible: use suitably sized WebP/AVIF when practical, retain source originals outside the public set when helpful, lazy-load noncritical images, prioritize the main hero image, and do not download every full-resolution gallery image for every card on initial load. Do not claim a conversion occurred unless the generated file exists and references are updated.
7. Supply descriptive localized alt text where data permits. Avoid color-changing filters and overlays on merchandise photographs.
8. Ensure the gallery is visibly and functionally a gallery of still photographs, not a 3D/360-degree viewer. Do not add rotate, wireframe, AR, mannequin, or virtual try-on controls.

Acceptance checks:
- Main image updates when a valid thumbnail is selected.
- Lightbox (if shown) opens the correct image, can close by button and Escape, and works with keyboard/touch.
- A one-image product remains fully usable.
- Missing optional/primary images do not crash the view or remove contact controls.
- The visible photo is a real supplied/local image and is not represented as rotatable/3D.

Run project checks and perform interactive checks with available browser tooling. State if focus behavior or image loading could not be tested automatically.
```

**Acceptance criteria:** Working image switching and lightbox, appropriate crop/contain behavior, stable layout, robust fallback states, and no fake gallery controls.

**Verification:** Build/type/lint/tests plus manual checks for one-image and multi-image demo products, broken primary/secondary image paths, keyboard close, and touch layout where possible.

**Expected report:** Gallery components, optimization performed, tested failure states, and any asset/alt-text gaps.

---

## Prompt 9 of 14 — Accurate Color Variants and Synchronized Product Inquiry

**When to use:** After the 2D gallery works, before importing real product variants.

**Main objective:** Make color swatches real data-driven controls whose labels, selected state, main images, thumbnails, and inquiry text always agree.

**Inspect/update:** Variant type/data, card swatches, product detail state, image gallery, locale dictionaries, contact URL/message utilities, and test fixtures.

### Exact prompt text

```text
PHASE 9 — EXPLICIT COLOR-TO-IMAGE MAPPING

Inspect the existing variant schema, product data, swatches, detail view, gallery state, and inquiry action before editing. Implement and verify an exact image mapping for every configured color.

Tasks:
1. Each variant record must have a stable ID, Arabic/English color label, optional representative swatch value/image, exact primary image path, optional alternate-image paths for that same color, and availability only if the owner supplied it.
2. Display only explicitly configured variants whose required primary image exists. If a variant lacks an image, hide it until supplied or use a clearly disclosed owner-approved text-only fallback; never show a different color’s image as though it matches.
3. Selecting a swatch must atomically update: selected swatch styling (not color alone), bilingual color label, primary image, gallery thumbnail set, current gallery image state, and any configured inquiry message. Keep product identity, category, description, and valid price unchanged.
4. Never use a full-image CSS filter/blend mode as a substitute for a distinct product-color photo. Never invent additional colors. A pre-prepared recolored image, if owner-approved, is a separate asset and may only be mapped after review; do not claim it proves physical stock/availability.
5. Make swatches accessible by keyboard, mouse, and touch. Give each a clear bilingual accessible name, visible selected state, and comfortable mobile target size. Do not rely on color alone to announce selection.
6. Ensure gallery thumbnails are rebuilt from the selected variant’s image set only. A missing optional alternate image must not leave a broken thumbnail or mix in another variant’s images.
7. If a real contact destination is configured, URL-encode the product inquiry and include selected color in the visitor’s current language where appropriate. If contact is not configured, never send to a placeholder number or claim an order was placed.
8. Add tests or repeatable checks that assert variant selection changes all relevant state. At minimum, use a demo product that has two separate local variant image sets and verify each set. Products without variants must not show fake default swatches.

Acceptance checks:
- No beige image is shown while black is selected, and no gallery thumbnails cross product/color boundaries.
- Selected state, color label, main image, and thumbnails agree after repeated switching.
- Missing variant image cannot be presented as a selectable matching color.
- Inquiry text includes the currently selected color only when applicable and destination is genuinely configured.

Run build and available tests. Report which variant/product cases were tested and any variant assets still missing.
```

**Acceptance criteria:** Variant state is centralized in data and fully synchronized; no color filters; no fabricated variants; correct gallery set per selected color.

**Verification:** Build/type/tests plus manual switching between at least two real separate demo image sets. Check inaccessible or missing assets explicitly.

**Expected report:** Variant model/state changes, products/colors tested, inquiry URL behavior, and any variant mappings still needed.

---

## Prompt 10 of 14 — Safe Import of My Actual Product Assets and Catalogue

**When to use:** Only after real product images and a product catalogue/manifest have been copied into Antigravity’s accessible workspace. If the assets are not ready, defer this phase; keep demo mode on and do not pretend production is ready. Part D below provides a fuller standalone version of this import prompt.

**Main objective:** Safely import real owner-provided product data and images, replacing demo entries by default while preserving originals and preventing false mappings.

**Inspect/update:** Incoming asset folders, provided catalogue/template, existing central catalogue, image mapping, catalogue mode, and product docs.

### Exact prompt text

```text
PHASE 10 — IMPORT OWNER-SUPPLIED REAL PRODUCTS AND IMAGES

This phase may run only after real product assets and a product catalogue/manifest are present in the accessible workspace. First inspect the actual files, filenames, directory structure, file formats, catalogue contents, current central product data, and image paths. Do not assume the owner’s preferred structure matches the example in the documentation.

Tasks:
1. Before modifying data, produce an inventory of discovered product candidates, images, alternate views, colors/variants, review images, and brand assets. Map filenames to products using explicit catalogue fields and clear filename evidence.
2. Identify ambiguous product/color/view mappings and genuinely missing data. Do not guess. Ask the owner only about ambiguities that cannot be resolved from the catalogue or filenames; continue other unambiguous imports.
3. Preserve all original files. Do not overwrite or delete originals. Copy selected images into the project’s correct deployment-safe product asset directories, preferably grouped by stable product slug, and use consistent filenames. Optimize copies only when safe and verify output files exist before referencing them.
4. Use only facts supplied by the owner/catalogue: bilingual names and descriptions, category, numeric current EGP price, original price only when a real discount exists, configured color names, image paths, and availability only when supplied. Never import demo/sample prices, details, or variants into real records.
5. Update the site’s centralized product data, not individual card markup. Every valid real product record must automatically render as a normal card in the existing collection and use the shared card component. Real products replace demo records by default unless the owner explicitly requests that selected demo items remain.
6. Do not switch to production mode while demo products, illustrative prices, or sample variants remain in the public catalogue. Keep the bilingual demo notice visible until the public catalogue is genuinely free of demo content. Preserve demo assets until the import is verified unless the owner explicitly authorizes removal.
7. Verify every primary image path and every configured variant image path. A color swatch must use its exact color’s primary image and matching gallery paths. Never create a mapping solely because two filenames look vaguely similar. Hide or flag incomplete variants rather than presenting mismatched images.
8. Review `docs/ADDING_PRODUCTS.md` and `docs/PRODUCT_IMAGES_AND_COLORS.md` and update them to match the real import workflow and filenames.
9. Add a temporary test record if useful to prove a new catalogue entry becomes a card in the same responsive grid without editing ProductCard or grid markup. Remove it afterward and verify it is absent.
10. Run relevant type/build/tests and inspect all imported image references. Report: records added/replaced, demo entries removed/retained, exact image connections, missing/mismatched assets, unresolved questions, copies/optimization performed, checks run, and remaining owner action.

Never claim successful import until file existence, catalogue records, and image references are verified. Do not build an admin upload dashboard or any persistent browser uploader.
```

**Acceptance criteria:** Real entries are based only on owner facts; originals preserved; image references verified; variants mapped explicitly; demos replaced by default but not destructively deleted; demo notice and mode are truthful; cards appear through the existing data-driven grid.

**Verification:** Check all imported files/paths, build/type/lint/tests, product/category filter behavior, and at least one selected-color gallery per product with variants. Use the temporary-record test only if it is removed afterward.

**Expected report:** Import inventory, exact mapping decisions, products/records imported, variants/images linked, original/copy handling, unresolved ambiguity, demos retained/replaced, build results, and production-mode recommendation.

---

## Prompt 11 of 14 — Genuine Customer-Review Screenshot Gallery

**When to use:** After the gallery/data foundations exist; it can be implemented before real screenshots are supplied.

**Main objective:** Create review-source tabs with real filtering and honest empty states, never fabricated testimonials.

**Inspect/update:** Review data schema, review asset folders, localization, image/lightbox components, and section navigation.

### Exact prompt text

```text
PHASE 11 — REVIEW SCREENSHOT GALLERY AND SOURCE FILTERS

Inspect existing review data, local assets, localization, and image/lightbox components. Build a dedicated review screenshot gallery for Facebook, Instagram, and TikTok.

Tasks:
1. Store review images and platform/category metadata in a centralized review data source separate from product records and visual components.
2. Selecting Facebook, Instagram, or TikTok must display only supplied screenshots assigned to that category. Show an accessible active state that is clear without color alone.
3. Preserve screenshot proportions and legibility; do not rewrite, crop away, or alter text from genuine reviews. Provide an accessible lightbox only if it adds value, with keyboard/touch controls and a clear close path.
4. Localize the section heading, category names, controls, image alternative text where possible, and empty states in Arabic and English.
5. Since no genuine review screenshots may yet exist, keep all categories honestly empty with tasteful localized empty-state content until the owner supplies screenshots. Do not seed fake reviews, names, quotes, counts, ratings, or testimonials. Do not use demo product visuals as pretend reviews.
6. Lazy-load noncritical review imagery, reserve image dimensions where possible, and handle missing paths gracefully.
7. Keep source/category assignments data-driven so future screenshots can be added without rewriting the gallery component.

Acceptance checks:
- Each filter only displays records assigned to its platform.
- Empty categories display an honest localized state and no invented content.
- Screenshot images are not stretched and missing images do not break the section.
- Lightbox controls, if present, are accessible and work.

Run available checks and test with supplied screenshots if available. If none are present, verify the empty states and document that real-image behavior awaits owner assets.
```

**Acceptance criteria:** Three working category filters and source-correct images; empty states when assets are absent; no false social proof.

**Verification:** Build/type/tests and category/empty-state checks. Test lightbox if implemented.

**Expected report:** Review files/components, screenshots found by category, empty states checked, and missing authentic assets.

---

## Prompt 12 of 14 — Contact Configuration, Product Inquiry Actions, Footer, and Floating WhatsApp

**When to use:** After the data, localization, and page sections exist; configure destinations only when the owner has provided real links.

**Main objective:** Make the primary contact journey functional without fake URLs, phone numbers, or order claims.

**Inspect/update:** Central contact configuration, product CTA code, URL/message builder, contact section, social icon links, footer, floating WhatsApp button, and translations.

### Exact prompt text

```text
PHASE 12 — CONTACT AND SOCIAL DESTINATIONS

Inspect the current product CTA behavior, contact configuration, footer, and available social icon components. Implement a contact-first conversion flow using only real configured destinations.

Tasks:
1. Centralize these optional settings in one configuration location: WhatsApp international phone digits/direct conversation URL, WhatsApp Channel URL, Instagram URL, and TikTok URL. Default all unknown destinations to empty/unconfigured. Never invent a phone number, channel, profile, or test destination that looks real.
2. Product CTAs such as “Contact to Order” / “مهتمة بالمنتج” should scroll to the actual contact section, or use a product-specific WhatsApp inquiry only when a direct destination is configured. Never link to a nonexistent cart or checkout.
3. If a real direct WhatsApp destination is configured, build an encoded product inquiry message from available product name and selected color, localized to the current language. Verify URL encoding for spaces, Arabic text, ampersands, and other non-ASCII characters. Do not claim an order was placed or stock reserved.
4. Implement the required floating WhatsApp conversation button fixed to the bottom-left of the viewport. It should have a recognizable icon, localized accessible label, visible keyboard focus, subtle feedback, and appropriate z-index/spacing. It must not cover gallery controls, contact details, or important mobile content and must remain usable near the footer.
5. If WhatsApp is unconfigured, do not point the floating button to a fake URL. In development, a clearly labelled disabled/debug affordance is acceptable; in production, hide or disable it until configured. Keep the setting in one place.
6. Display social/contact links only when each actual URL is configured and valid. Use meaningful accessible labels and a safe external-link policy appropriate to the framework. Hide unavailable destinations instead of rendering dead icons.
7. Localize the contact section/footer in Arabic and English. Ensure RTL/LTR and dark/light mode remain consistent.

Acceptance checks:
- No destination contains a guessed phone number or fabricated social URL.
- Unconfigured links do not navigate to fake destinations.
- Product inquiry includes the currently selected color where configured and properly encodes Arabic.
- The floating WhatsApp action is fixed bottom-left only when configured and does not block key mobile controls.
- No cart, checkout, payment, or order-confirmation claim exists.

Run available checks and validate configured/unconfigured states. If no real destinations are supplied, test and document the unconfigured behavior rather than inventing credentials.
```

**Acceptance criteria:** Centralized real-only destinations, functional contact scroll/inquiry flow, safe unconfigured state, and responsive floating action.

**Verification:** Build and test with empty configuration; if owner URLs are present, validate them without sending messages or placing orders.

**Expected report:** Config files, destinations left unconfigured/configured, inquiry tests, and mobile overlap/accessibility findings.

---

## Prompt 13 of 14 — Responsive, Accessibility, Performance, Reduced Motion, and Browser QA

**When to use:** After core catalogue, gallery, reviews, and contact interactions are in place; repeat after the real catalogue import if it happens later.

**Main objective:** Exercise the real UI against the source specification and resolve measurable issues.

**Inspect/update:** Whole interface, shared CSS/tokens, navigation, grid, modal/lightboxes, swatches, image loading, motion, and current test setup.

### Exact prompt text

```text
PHASE 13 — RESPONSIVE, ACCESSIBILITY, PERFORMANCE, AND INTERACTION QA

Reinspect the actual implementation and run a structured QA pass against the master specification. Do not assume the UI is responsive or accessible merely because it builds.

Tasks:
1. Check/recompose layouts at 360 px, 390–430 px, 768 px, 1366 px, and 1920 px. Verify no accidental horizontal overflow, truncated product records, hidden grid rows, overlapped controls, or broken RTL/LTR layout.
2. Test Arabic/English, RTL/LTR, dark/light, and mixed-script names/prices. Verify language/theme persistence does not interfere across toggles.
3. Test navigation and hero CTA, actual category filters, price/original-price/discount display rules, add/remove product record flow, opening/closing product details, thumbnail changes, zoom/lightbox, color variant mapping, review filters and empty states, contact actions, and the floating WhatsApp state.
4. Verify keyboard navigation, visible focus, meaningful button/link labels, semantic HTML and heading order, descriptive/localized alt text, swatch names and non-color selected indicators, dialog/lightbox Escape handling and focus management, adequate contrast, and touch target sizes.
5. Verify `prefers-reduced-motion`: nonessential effects simplify or stop, while all essential controls and anchors still work. Ensure animations do not lock the user into pinned/forced scrolling.
6. Check image behavior: primary and optional gallery path failures, stable aspect ratios, no stretching, correct `contain`/intentional `cover`, lazy-loading of noncritical images, prioritized hero image, and no unnecessary download of all large image variants on first load.
7. Check that product images are not recolored by theme/language, that no swatch uses CSS filters as a fake variant, and that there are no 3D/AR/mannequin/virtual-try-on/fake 360 controls.
8. Check for console errors, broken links, missing local assets, and static build errors using available browser/test tooling. If browser automation is unavailable, run all feasible static checks and make that limitation explicit.
9. Review loading, empty, failure, and unconfigured-contact states for both languages and themes. Confirm unknown destinations remain hidden/disabled.
10. Fix discovered issues where practical, then rerun affected tests and the production build.

Acceptance checks:
- No obvious horizontal overflow or inaccessible controls at required target widths.
- Core functionality works without animation and with keyboard/touch input.
- Missing images and empty review/contact states are honest and nonfatal.
- No fabricated content or prohibited product display technology appears.
- Build/test claims match actual command output.

Return a QA matrix with each test, result (pass/fail/not run), evidence/notes, fixes made, and known residual limitations.
```

**Acceptance criteria:** QA covers the required widths, bilingual/theme combinations, core interactions, accessible states, image failures, reduced motion, and console/build issues; unrun checks are explicitly identified.

**Verification:** Available tests, type-check/lint/build, browser console and responsive inspection if supported. Do not report an unperformed manual check as passed.

**Expected report:** Pass/fail/not-run QA matrix, fixes, remaining issues, exact commands, and limitations of the test environment.

---

## Prompt 14 of 14 — Owner Documentation, Vercel Guidance, Final Acceptance, and Handover

**When to use:** Last phase after the current intended catalogue state is established and QA issues are addressed. If real assets are not ready, document that production import remains pending and keep demo mode on.

**Main objective:** Deliver accurate, beginner-friendly documentation and a verified final build report.

**Inspect/update:** Existing README/docs, package scripts, build/deploy configuration, central product template/data, image folders, demo mode, and QA results.

### Exact prompt text

```text
PHASE 14 — DOCUMENTATION, DEPLOYMENT PREPARATION, AND FINAL ACCEPTANCE

Inspect the actual project scripts, final data/configuration, public asset paths, and QA results. Write or update documentation that describes the implementation that truly exists, not an imagined future feature.

Required documents:
1. `README.md`: project purpose, prerequisites, actual package manager, install/local-run/build commands, available type/lint/test commands, repository overview, and local development workflow.
2. `docs/ADDING_PRODUCTS.md`: beginner-friendly steps for a stable product ID, image placement, one central catalogue record, bilingual names, category, numeric actual EGP price, real discount fields only when applicable, optional real availability, variant configuration, local preview, verification, and redeploy.
3. `docs/PRODUCT_IMAGES_AND_COLORS.md`: source-photo advice, file naming, optional alternate angles/details, safe optimization, original-image preservation, explicit color-specific mapping, approved recolored assets treated as separate reviewed files, gallery setup, troubleshooting broken/mismatched images, and theme/language checks.
4. `docs/DEPLOYMENT.md`: static Vercel deployment steps based on the actual framework/build output and real project settings; build command/output folder; environment variables only if actually required; image-size considerations; and a clear explanation that ordinary browser uploads do not permanently alter deployed static files. If current Vercel limits/settings cannot be checked from this environment, state that instead of claiming fresh verification.
5. `docs/DEMO_ASSET_SOURCES.md` if external demo assets were used, listing assets/source URLs and known usage/license conditions and explicitly distinguishing verified from uncertain terms. For generated images, record that they are demo assets only and note how they were created where known.
6. A copyable product-catalogue template/example with unmistakable demo/placeholder values and explicit image/variant fields. Do not present example prices or products as real.

Documentation rules:
- Use exact commands from actual scripts. Do not invent npm scripts or build output paths.
- Explain the catalog mode switch, removal/replacement of demo records, and the rule that production mode must not be enabled while demo products/illustrative prices remain public.
- Explain that adding an image file alone does not add a product. The owner must add one valid catalogue record, unless a working build-time importer was actually implemented and tested.
- Explain a normal ongoing workflow: place optimized files under the correct public asset directory, add a record to the central data source, confirm every variant’s correct image mapping, test both languages/themes and mobile, build, and redeploy.
- State that the static site has no persistent browser uploader, checkout, backend, database, paid AI dependency, or 3D/virtual try-on feature.

Final acceptance:
1. Run the actual production build and available type-check/lint/test scripts. Fix errors where practical and rerun them.
2. Verify the demo/production configuration and whether any demo items, illustrative prices, or sample variants remain. Do not switch to production or remove the notice if any demo content remains.
3. Verify local image paths, product records, unique IDs, valid pricing/discount logic, and variant-to-image references.
4. Confirm a temporary catalogue record can be added and appears in the normal responsive collection and category filter without editing the reusable card/grid markup; remove the temporary record and verify it is absent.
5. Review the entire source specification against the finished site, including the final demo catalogue section. Create a final requirements acceptance matrix.
6. Distinguish tests run from tests not run, and locally built from actually deployed. Do not state that the project is deployed unless a real deployment occurred and was verified.

Deliver a truthful handover report with changed files, actual commands and results, known limitations, asset/license uncertainties, remaining owner inputs, current catalogue mode, production-readiness status, and the next action required from the owner.
```

**Acceptance criteria:** Required docs exist and match real scripts/assets; final build/tests are run and reported; requirements matrix is complete; demo-vs-production state is honest; no temporary test record remains.

**Verification:** Actual install/build/type/lint/test commands, image-path inspection, record validation, and the requirements checklist. Deployment is only “verified” if actually performed.

**Expected report:** Documentation paths, commands/results, requirements matrix, catalogue mode, demo state, imported/missing asset status, deployment status, and remaining owner actions.

---

# Part D — Product Asset Handoff Prompt

**Purpose:** A reusable, thorough intake prompt for the moment your real product images and product catalogue are present in Antigravity’s accessible workspace. It is a standalone, expanded version of Phase 10. **Use this prompt instead of repeating Phase 10 immediately afterward; do not run both back-to-back for the same asset batch.** Keep demo mode on until the import has been checked and the catalogue is genuinely ready.

## Copy-paste prompt

```text
PRODUCT ASSET HANDOFF — INVENTORY, MAP, IMPORT, VALIDATE, AND REPORT

You are importing the owner’s real fashion-product assets into the existing bilingual, static 2D showroom. First inspect the project and actual supplied assets. Do not replace the application architecture or create an upload dashboard.

STAGE 1 — DISCOVERY BEFORE CHANGES
1. Locate and read the current central product data/schema, product catalogue template or manifest supplied by the owner, relevant product documentation, current catalogue mode, and demo records.
2. Scan the accessible incoming-asset directories and catalogue files. Inventory images and related files by path, filename, format, dimensions if inspectable, likely product slug, color, view (main/side/back/interior/detail/lifestyle), review category, and brand-asset type.
3. Before modifying the catalogue, present a clear mapping inventory: candidate product, supplied facts, candidate primary images, alternate views, color variants, missing files/fields, review screenshots, and brand assets. Base mappings on the catalog and explicit filename evidence.
4. Do not guess when a black/beige color, product identity, alternate angle, or gallery grouping is ambiguous. Ask me only about genuine blockers that cannot be resolved from the provided catalogue or filenames. Continue safe, unambiguous imports while marking unclear mappings as pending.

STAGE 2 — SAFE ASSET HANDLING
5. Preserve originals. Do not rename, edit, compress destructively, overwrite, or delete source files. If the project needs copied/optimized assets, create new files in the appropriate public image folders using a stable, consistent, deployment-safe filename convention. Keep a traceable mapping between source and generated/copied files.
6. Use local public paths valid in the actual build, such as `/images/products/<product-slug>/<color>-main.webp`, adapting to the real repository structure. Avoid absolute computer paths and fragile remote hotlinks.
7. Optimize a copy only when it is safe and the necessary tool exists. After optimization, verify the output exists, opens correctly, remains visually faithful, and is the path referenced in data. Do not claim conversion or optimization merely because a command was attempted.
8. Do not upload product/review imagery to external tools/services unless the owner authorized it. Do not place private credentials in frontend files.

STAGE 3 — REAL PRODUCT DATA
9. Import only owner-supplied facts: stable ID/slug, Arabic/English product names, optional bilingual descriptions, category, numeric actual EGP price, original price only for a real discount, explicit variant color names in Arabic/English, image mappings, and availability only when supplied and intended to be displayed.
10. Do not invent stock, material, dimensions, origin, promotional discount, color options, brand claims, reviews, price, phone number, or social URL. If data is missing, flag it and either omit the optional UI field or leave the record pending where required.
11. Replace demo entries with the real records by default unless I explicitly request particular demo entries remain. Do not merge demo/sample prices, descriptions, or color variants into real records. Preserve the demo files until import and build validation succeed unless I explicitly authorize their deletion.
12. Do not switch catalogue mode to production while any demo item, illustrative price, or sample variant remains in the public catalogue. Keep the Arabic/English preview notice active until the public catalogue no longer contains demo content. Report exactly why it remains enabled if it does.

STAGE 4 — VARIANT AND GALLERY VALIDATION
13. For each color, connect its exact owner-supplied primary photo and only alternate views belonging to that same product/color. Selecting the swatch must update the selected state, bilingual color label, main image, gallery thumbnails, and configured inquiry message together.
14. Never map an image to a variant just because the filename appears somewhat similar. If the file cannot be positively mapped, flag it and hide the incomplete swatch until resolved. Never simulate a real color with a CSS filter.
15. Verify every referenced file exists, every primary image loads, optional missing thumbnails are handled gracefully, and no thumbnail from another color/product can enter the selected gallery.
16. Keep review screenshot assets separate from product photos, retain their source/category metadata, and never create testimonial text or counts. If no authentic review screenshots were supplied, keep category empty states intact.

STAGE 5 — DATA-DRIVEN COLLECTION PROOF
17. Update only the central product data/catalogue and the necessary asset references, not one-off product card markup. Confirm every valid imported record automatically appears through the existing reusable ProductCard in the normal responsive grid and participates in category filtering.
18. To prove extensibility, add a temporary valid record using an existing local test/demo image if useful, verify that it appears in the ordinary grid and filter without editing the card/grid component, then remove it and verify that it is absent. Do not leave the test record or test price behind.
19. Validate unique slugs/IDs, price and discount rules, required primary images, variant image paths, and category values as supported by the project.

STAGE 6 — VERIFY AND REPORT
20. Run the real available type-check, lint, test, and production build scripts. Inspect the imported image paths and any catalogue validation output. Fix issues where possible; report failures honestly. Do not claim the import succeeded until file existence, data references, gallery/variant behavior, and build results have been checked.
21. Update the product-adding/image-color docs and record any needed asset-source information. Do not invent scripts or claim that copied files alone are automatically detected by a static site.
22. Return a report with:
   - Files and directories scanned.
   - Product candidates discovered and final products imported.
   - Image source-to-public-path mapping, grouped by product/color/view.
   - Real records added and demo entries removed/retained.
   - Missing/mismatched images, unresolved catalogue facts, and ambiguous mappings requiring my decision.
   - Original files preserved and copy/optimization actions actually completed.
   - Variant/gallery tests, temporary-record test, and filter behavior.
   - Exact commands run and their results; failed/not-run checks.
   - Current demo/production mode and whether illustrative prices or demo variants remain.
   - Remaining owner actions before launch.

REGULAR FUTURE WORKFLOW
Document this exact practical workflow for later products: put the optimized images in that product’s asset folder, add one valid record to the central catalogue using the project’s template, assign every variant to its correct image set, run the site and verify the new card/filter/gallery in Arabic and English and both themes, run the build, and redeploy. Explain that an ordinary static site cannot detect arbitrary files merely because they were copied into a directory. Do not promise auto-import unless a real build-time importer has been implemented and tested.
```

**Main objective:** A controlled, reversible import that never guesses product identity or color mappings and leaves the live site honest about demo content.

**Expected output:** An inventory before changes, verified data/image mappings after changes, unresolved decisions, build/test evidence, and a clear launch-readiness statement.

---

# Part E — My Preflight Checklist

You do **not** need to prepare real products before the first preview. Antigravity should first build the site with locally stored, clearly labelled demo products and illustrative demo prices. Real assets are needed later to turn the catalogue into your genuine business catalogue.

## 1. Prepare the owner-supplied information

- [ ] **Brand:** final brand name and logo file if available. Do not delay the first preview if the logo is not ready.
- [ ] **Products:** product photos with a main view and any optional side, back, interior, detail, or lifestyle views.
- [ ] **Actual color variants:** a separate real/owner-approved image set for each color that should be selectable. Do not rely on a CSS filter to produce another apparent color.
- [ ] **Names/descriptions:** Arabic and English product name; descriptions in either or both languages if you have them.
- [ ] **Category:** for example handbag, shoulder bag, crossbody bag, dress, top, shirt, or another category actually present in your inventory.
- [ ] **Price:** real current EGP price. Include an original price only when a genuine discount exists. Availability is optional and should be supplied only if you want it displayed and you know it is accurate.
- [ ] **Variant mapping:** Arabic and English color names and exact image filenames for each color, including which images belong to that variant.
- [ ] **Customer reviews:** genuine screenshots only, separated into Facebook, Instagram, and TikTok. Avoid including customer personal information that is not necessary to show.
- [ ] **Contact/social:** actual WhatsApp number or direct conversation URL, WhatsApp Channel URL, Instagram URL, and TikTok URL, only if you want those destinations displayed.
- [ ] **Asset rights:** confirm that you own the photos or are allowed to use them commercially. Keep any relevant source/licensing notes.

**Do not provide:** made-up product facts, fake reviews, private API credentials, passwords, personal account tokens, or unnecessary customer personal information.

## 2. Suggested incoming folder structure

This structure is a convenient place to assemble files **before** Antigravity imports them. Antigravity must inspect the real repository and adapt the destination to its existing conventions. It should normally preserve these incoming originals and copy verified/optimized production assets to `public/images/products/` or the equivalent actual public folder.

```text
incoming-assets/
  brand/
    logo.svg
    logo.png
  products/
    everyday-bag/
      black-main.jpg
      black-side.jpg
      black-interior.jpg
      beige-main.jpg
      beige-side.jpg
    evening-dress/
      navy-main.jpg
      navy-detail.jpg
      navy-back.jpg
  reviews/
    facebook/
      review-001.png
    instagram/
      review-001.png
    tiktok/
      review-001.png
  catalog/
    product-catalog.md
```

These names are examples, not facts about your inventory. Use clear names that indicate product, color, and view. Avoid spaces and inconsistent spelling. For example: `<product-slug>-<color>-main.webp`, `<product-slug>-<color>-side.webp`, and `<product-slug>-<color>-detail.webp`.

The actual runtime/public assets may be organized like this after import:

```text
public/
  images/
    products/
      everyday-bag/
        black-main.webp
        black-side.webp
        black-interior.webp
        beige-main.webp
        beige-side.webp
    reviews/
      facebook-review-001.webp
      instagram-review-001.webp
```

The application’s central catalogue file may be something like `src/data/products.ts`, or another equivalent file already present in your actual repository. The supplied `incoming-assets/catalog/product-catalog.md` is an intake sheet; Antigravity should translate its verified facts into the central catalogue rather than accidentally making two competing runtime sources of truth.

## 3. Simple product catalogue intake template

Make one entry per real product. Include exact filenames so Antigravity does not have to guess.

```text
Product ID / slug:
Name (Arabic):
Name (English):
Description (Arabic, optional):
Description (English, optional):
Category:
Current price (EGP):
Original price (EGP, only for a genuine discount; otherwise leave blank):
Availability (optional; actual information only):

Variant 1 ID:
Color name (Arabic):
Color name (English):
Exact primary image filename:
Alternate image filenames for this same color (optional):
Availability (optional):

Variant 2 ID (if any):
Color name (Arabic):
Color name (English):
Exact primary image filename:
Alternate image filenames for this same color (optional):
Availability (optional):

Notes / unresolved details:
```

Repeat the variant block only for genuine, owner-approved options. If a product has no configured colors, do not invent swatches; the catalogue should omit the selector.

## 4. The ongoing product-addition rule

To add a real product later, copy its prepared photos to the appropriate product-image directory and add **one valid record** to the central catalogue using the documented template. The existing reusable product-card component should render that product automatically in the same responsive grid, and it should participate in the appropriate category filter without any new one-off component or card markup. Then verify its image/color mappings, languages, themes, mobile layout, and contact action, run the production build, and redeploy.

An ordinary static site does **not** detect arbitrary new files just because they were copied into a folder. Copying the photos is not enough by itself: a data record must reference them, unless Antigravity has implemented and tested a real build-time importer that explicitly does this.

---

# Part F — How I Should Run the Prompt Pack

1. **Open the correct workspace in Antigravity.** Attach or place `Premium_Fashion_Website_Master_Prompt_2D_Demo_Catalog.md` where the agent can access the complete file. If the actual filename contains a suffix, use the real filename. The full specification should remain available in the project conversation.
2. **Paste Part B first.** The Global Context Prompt establishes the rules: inspect the actual repository, preserve working code, use 2D images only, start with a labelled local demo catalogue, avoid invented contact details/reviews, and report real test outcomes.
3. **Run Prompts 1–9 in order.** Paste one phase at a time in the same Antigravity project conversation. Read its report, check that acceptance criteria were verified, and address any genuine failures before proceeding. The agent should make edits in the workspace rather than returning only advice.
4. **Keep demo mode active during the first preview.** You can evaluate the design before real products are ready. The demo collection should have at least four bags and four women’s clothing entries, local images where feasible, and a bilingual notice marking demo products/prices. Reviews and social/contact destinations must stay honestly empty/unconfigured.
5. **Prepare real product files.** Use Part E to assemble the incoming-assets folders and catalogue intake sheet. Ensure color-to-image filenames are explicit. Preserve original images and avoid including information you do not want published.
6. **Once the real images and catalogue are available to Antigravity, import them.** Use Part D as the full Product Asset Handoff Prompt, or use Prompt 10 in Part C. They cover the same import phase; do not run both consecutively for the same batch. Run the import only after the files actually exist in the accessible workspace. If assets are not ready, defer this phase and keep demo mode on.
7. **Run Prompts 11–14.** Add the genuine-review gallery, contact/footer behavior, comprehensive responsive/accessibility/performance QA, and complete documentation/final acceptance. Repeat the import/QA checks after future asset batches as appropriate.
8. **Review the final report, not just the visual preview.** Confirm the production build completed, identify tests that were not run, inspect the current demo/production mode, verify no temporary test product remains, and review any missing/mismatched image mappings. Do not publish while the catalogue still presents sample products/prices as real.
9. **Deploy only after the project is ready.** Follow the project’s actual `docs/DEPLOYMENT.md` and actual build output/settings. After deployment, open the deployed site and check navigation, languages, both themes, real product images/variants, review empty/populated states, configured contact links, and mobile behavior. Antigravity must not claim it deployed anything unless that deployment actually happened and was verified.

---

## Final guardrail

The first preview should be visually populated, but it must be honest about being a demo. The final business catalogue should be based only on owner-supplied product data and verified image mappings. Every visible color must use its assigned image set; every genuine review must come from a supplied source; every contact link must be configured; and every implementation/test/deployment claim must match what was actually inspected or run.
