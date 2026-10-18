# MASTER PROJECT PROMPT — PREMIUM WOMEN’S FASHION WEBSITE
## Cinematic Bilingual 2D Fashion Showroom • Premium Product Photography • Real Color Variants • Static Vercel Deployment

---

# 1. YOUR ROLE AND DELIVERY EXPECTATION

Act as a senior multidisciplinary team consisting of:

- A senior React/TypeScript frontend engineer.
- A creative director and fashion-focused digital art director.
- A senior UI/UX designer experienced in Arabic RTL and English LTR interfaces.
- A product-photography presentation and image-asset workflow specialist.
- A motion designer familiar with CSS animation, GSAP, and ScrollTrigger.
- A frontend performance engineer.
- An accessibility and quality-assurance engineer.
- A technical writer who documents repeatable, beginner-friendly workflows.

Do not deliver only a plan, concept, mockup, screenshot, or nonfunctional prototype when you have access to the project files and a coding environment. Inspect the actual repository, implement the website in its existing structure, run the available checks, fix errors where possible, and deliver a runnable project.

Be technically honest. Never claim that a feature works unless it is implemented and verified. If an asset, API, storage service, credential, license, or deployment capability is unavailable, document the limitation and provide the best working fallback.

When modifying an existing project:

1. Inspect its current framework, dependencies, file structure, and scripts first.
2. Preserve working architecture and dependencies when practical.
3. Avoid replacing the project with an unrelated template.
4. Make changes in maintainable, reusable components.
5. Do not delete existing working features without a clear reason.
6. Do not stop after writing instructions if implementation is possible.
7. If an important step cannot be completed, state exactly what is missing and still complete the remaining work.

The target user may not be an experienced developer. Make product updates, image preparation, local setup, and publishing clear, copyable, and well documented.

---

# 2. PROJECT PURPOSE AND BUSINESS MODEL

Build a premium website for a women’s fashion brand selling or showcasing products such as:

- Women’s handbags and everyday bags.
- Dresses, tops, shirts, and other women’s clothing.
- Fashion accessories and future categories supported by the real inventory.

The website should feel like a fashion editorial and cinematic product showroom, not a generic ecommerce template.

The main customer journey is:

1. Discover the brand through a high-impact visual hero.
2. Explore a curated product collection.
3. Inspect high-quality product photography, explore genuine alternate views, and select the product’s actually available colors.
4. Review genuine customer-review screenshots.
5. Contact the business through its configured social or messaging channels to ask about a product or arrange an order.

This is a frontend-focused product catalogue. It is **not** a conventional checkout website.

Do not add any of the following unless explicitly requested later:

- Shopping cart.
- Online payment.
- Checkout workflow.
- Customer accounts or authentication.
- Order-management backend.
- Inventory-management backend.
- Database.
- Paid subscriptions or paid AI services.
- A server that generates or recolors product images on demand.

The primary conversion action is contact, not checkout.

The application must run locally and deploy as a static frontend on Vercel’s free/Hobby tier, subject to Vercel’s current limits. The public website must not depend on a photo-generation server, paid image API, or backend for its core catalogue, gallery, and color-selection functions.

---

# 3. NON-NEGOTIABLE PRODUCT AND DEPLOYMENT DECISIONS

## 3.1 A 2D-first product showroom

The public website uses ordinary product photographs as its standard and complete product-display system. Do not implement or depend on 3D product viewers, WebGL product rendering, GLB/GLTF assets, AI image-to-3D generation, mannequin viewers, or virtual try-on features.

Every product must be presented beautifully using normal image files. The core experience must include:

- A prominent primary product photograph.
- Optional real alternate-angle and detail photographs.
- A gallery or lightbox where appropriate.
- Functional color swatches linked to the correct image assets for each available variant.
- Responsive cropping and sizing that preserve the product’s appearance.
- Graceful behavior when optional images are absent or fail to load.

The website must not require a paid AI service, private AI key, backend, database, or generation server for these features.

## 3.2 Real image variants are the source of truth

Whenever possible, provide an actual product photograph for each real color variant. Each color swatch must select the corresponding image set, color label, and selected-state styling.

If only one source photograph exists, the owner may prepare additional color versions with an image editor or a suitable recoloring tool before adding them to the website. Those variants must be reviewed against the physical product before publication. Recoloring can affect texture, highlights, shadows, stitching, logos, metal hardware, printed patterns, and background edges; do not present an unverified recolor as an exact real product color.

Do not simply apply a CSS color filter to an entire photograph when that would recolor its background or alter areas that should retain their original color. Do not automatically invent extra color options. Only display variants explicitly configured by the owner.

## 3.3 No fake file-upload persistence

A static website cannot permanently save a photo uploaded through an ordinary browser file input into its deployed source files or make that image visible to all visitors without a supported storage service, CMS, backend, or a new build/deployment.

Do not build a fake admin uploader that implies a browser upload permanently updates the public catalogue when it does not.

Use a transparent static-asset workflow:

1. Copy optimized product photos to `public/images/products/`.
2. Store optional alternate-angle and approved color-variant images in the same product asset area, using clear filenames.
3. Add or edit the product record in the central local product-data file.
4. Connect each configured color variant to the correct image paths.
5. Run and inspect the site locally, including the selected color and all images.
6. Commit/push or redeploy the changed static project to Vercel.

If a local preview/import utility is added, label it as a local draft or preview unless it actually writes project files through a supported local development tool. Never confuse an in-browser preview with permanent publishing. If the owner later needs an online admin dashboard with persistent uploads, explain the separate need for a real CMS or media-storage service before implementing it.

## 3.4 Honest image and color behavior

- A photograph is a 2D image. Do not claim that it can be rotated in 3D.
- A group of separate photographs is a product gallery, not a true 360-degree viewer.
- A recolored image is a prepared visual asset, not proof that the physical product is sold in that color.
- Only show actual or owner-approved configured variants.
- If a variant has no real image, do not silently display a different color’s image as though it matches. Either hide that variant until its image is supplied or clearly communicate the limitation.
- Never add controls that appear interactive but do not perform a real action.

---

# 4. CREATIVE DIRECTION AND BRAND IDENTITY

## 4.1 Visual direction

Create a contemporary, youthful, chic, premium, fashion-focused visual experience with cinematic restraint.

Use:

- Large product imagery.
- Editorial typography.
- Strong composition and visual hierarchy.
- Intentional negative space.
- Distinct surface layers.
- Tasteful highlights, controlled shadows, and depth.
- Subtle perspective and restrained parallax.
- Elegant product-first layouts.
- Smooth transitions that support discovery.
- Considered dark and light visual environments.

Avoid:

- Generic ecommerce-template appearance.
- Repetitive card grids without editorial variety.
- Excessive gradients.
- Excessive round corners on every element.
- Random decorative effects unrelated to fashion.
- Motion that blocks shopping or contact actions.
- Unsupported marketing claims or fabricated product content.

## 4.2 Brand assets and configuration

The final brand name, logo, color palette, and brand assets may be supplied later.

- Make brand name and logo replaceable through a single configuration or asset location.
- Use a restrained temporary text/logo placeholder only where necessary.
- Do not invent a permanent brand identity or unrelated logo.
- Keep typography, colors, spacing, border treatments, and theme tokens centralized.

## 4.3 Product truthfulness

Use real product photography and real business-supplied product information wherever available.

- Do not fabricate inventory, product prices, material claims, color variants, discounts, availability, reviews, customer names, or social accounts.
- Clearly mark sample/demo data as demo data.
- Keep all placeholders obvious and easy to replace.
- Never present demo reviews as genuine testimonials.

---

# 5. BILINGUAL EXPERIENCE: ARABIC AND ENGLISH

Arabic and English are mandatory first-class interface languages.

## 5.1 Language switcher

Provide a clear, accessible Arabic/English toggle in the header. Suitable formats include `العربية / EN` or `AR / EN`.

Switch languages immediately without a page reload. Translate/localize all interface text, including:

- Navigation and section headings.
- Hero headline and supporting copy.
- Buttons and calls to action.
- Product labels, category filters, prices, and discount labels.
- Product-gallery controls, loading messages, and errors.
- Color selection and product details.
- Review tabs, empty states, and lightbox labels.
- Contact section, footer, social links, and accessibility labels.
- Image-gallery controls, color-variant labels, image-loading messages, and accessible labels.

Use a centralized translation dictionary or localization layer. Do not scatter hard-coded language conditionals throughout components.

Use natural Arabic copy, not stiff literal translations. English should feel fully authored rather than partially translated.

## 5.2 RTL/LTR behavior

When Arabic is selected:

- Set document language to `ar` and direction to `rtl`.
- Use an appropriate Arabic font stack.
- Apply correct text alignment and spacing.
- Use CSS logical properties where possible.
- Check mixed Arabic/English product names and prices.

When English is selected:

- Set document language to `en` and direction to `ltr`.
- Restore appropriate English layout and alignment.

Do not blindly mirror product photographs, image compositions, or decorative icons when switching between RTL and LTR. Test both languages at desktop and mobile widths.

## 5.3 Language persistence

Remember a valid selected language using local storage where practical. Default to Arabic if there is no stored valid preference. Switching themes must not reset the language.

---

# 6. DARK MODE BY DEFAULT AND LIGHT MODE

Dark Mode is the initial experience. Light Mode is also mandatory and must be intentionally designed.

## 6.1 Dark Mode

Use layered near-black/deep charcoal surfaces, readable text, muted supporting text, tasteful accents, clear product display areas, restrained borders, and controlled highlights. Avoid pure black everywhere and keep product colors faithful.

## 6.2 Light Mode

Use sophisticated neutral/light surfaces, strong contrast, refined borders and shadows, balanced spacing, and the same brand identity. Do not implement it as a simple global inversion.

## 6.3 Theme control

Provide a clear, keyboard-accessible sun/moon or equivalent control in the header.

- Default to dark when there is no saved preference.
- Toggle the whole site between dark and light.
- Persist the selected theme locally.
- Avoid an obvious theme flash during initialization where practical.
- Keep the current language selected.
- Provide focus states and useful accessible labels.
- Use smooth, restrained transitions.

Use shared CSS variables/design tokens. Do not alter the actual colors of product photographs just because the surrounding UI theme changes.

---

# 7. INFORMATION ARCHITECTURE AND PAGE SECTIONS

The single-page customer journey should contain:

1. Header and navigation.
2. Premium fashion-campaign hero.
3. Cinematic scroll scenes or editorial transitions.
4. Product collection with working category filters.
5. Product detail/inspection experience with a premium 2D image gallery and functional color variants.
6. Optional image zoom/lightbox for genuine product photos.
7. Customer-review screenshot gallery with Facebook, Instagram, and TikTok categories.
8. Contact section and footer.
9. Persistent floating WhatsApp conversation button fixed at the bottom-left of the viewport.

Keep navigation obvious and essential content accessible without waiting for animations. Avoid too many pinned/scroll-locked sections.

---

# 8. HEADER AND NAVIGATION

Build a clean, responsive header with:

- Replaceable brand/logo.
- Collection link.
- Relevant product-category links such as handbags and clothing.
- Customer reviews link.
- Contact link.
- Arabic/English switcher.
- Dark/light theme control.

A sticky header is optional. If used, ensure section anchors are not covered by it. Controls must remain discoverable on mobile. Do not overload the header.

---

# 9. HERO AND CINEMATIC STORYTELLING

## 9.1 Hero composition

Create a high-impact fashion campaign opening, not a generic store banner.

Use one dominant genuine product visual when provided, oversized editorial typography, strong contrast, thoughtful layering, negative space, subtle depth, short supporting copy, and a clear primary action.

Example copy direction (replaceable, not required verbatim): “Discover the style that feels like you.” Create a natural Arabic equivalent.

The primary CTA should smoothly scroll to the actual collection section, work in both languages and themes, and remain available even if animation is disabled.

## 9.2 Motion

Use purposeful staggered reveals, subtle image scaling, gentle parallax, masked transitions, or opacity/transform transitions where they support the story. Do not delay key controls.

## 9.3 Scroll scenes

When appropriate, create up to three broad editorial phases:

- **Campaign Opening:** introduce the brand through a dominant composition.
- **Oversized Product Showcase:** reveal a large product visual and editorial copy with layered movement.
- **Collection Transition:** transition into practical product browsing.

Use CSS transforms, sticky sections, GSAP/ScrollTrigger only when justified, layered transparent images, and responsive scene composition. Do not overuse pinned scrolling or force the visitor to complete an animation before using the site.

Respect `prefers-reduced-motion` and simplify or remove nonessential motion on low-powered/mobile devices. The site must remain usable without animation.

---

# 10. PRODUCT COLLECTION AND LOCAL DATA

## 10.1 Central product data

Product cards must be driven by a well-typed local data source such as `src/data/products.ts` or an equivalent structure in the existing project.

Each product may include:

- Stable unique ID/slug.
- Arabic and English names.
- Optional Arabic and English descriptions.
- Category.
- Current price in numeric Egyptian pounds.
- Optional original price when a real discount is supplied.
- Explicit, owner-configured color variants.
- Primary image and optional alternate images.
- Featured state.
- Availability only when provided by the owner.
- Optional configurable image presentation settings, such as `objectPosition`, when a particular photo needs careful framing.

Do not store prices as formatted strings in data. Store numeric EGP amounts and localize formatting at display time using an appropriate number/Intl formatter.

## 10.2 Price and discount behavior

Support:

- Regular price.
- Original plus discounted price.
- Accurate calculated discount percentage only when both source values are valid and the current price is lower than the original price.
- Localized Egyptian pound labels and numbers.

Never fabricate prices, discount rates, or availability. If pricing is not supplied, show an obvious replaceable placeholder only in demo content, or omit the price in real content.

## 10.3 Product cards

Each card should include:

- Clear image with consistent art-directed crop/object positioning.
- Product name and current price.
- Original price/discount badge only when valid.
- Color swatches only for configured variants.
- Product-inspection action.
- Contact action that can take the customer to the contact section or launch an explicitly configured product inquiry.

Hover feedback is optional and must not be required for essential actions. Cards must also work by touch.

## 10.4 Category filters

Where implemented, category filters must update the real displayed products. Include useful empty states and do not show categories unsupported by current data.

## 10.5 Variant behavior

Store each configured variant explicitly, including:

- Variant ID.
- Arabic/English color name.
- Swatch color where meaningful.
- Correct primary image path.
- Optional alternate images for that same color.
- Availability when supplied.

Selecting a variant updates the selected state, color name, primary image, and gallery thumbnails. Do not simply tint an unrelated product image and imply that it matches a real variant. Keep all displayed image views consistent with the selected color. If a specific variant lacks imagery, hide it from selection until the owner provides a suitable image, or clearly disclose that its image is unavailable. Do not show unconfigured colors.

---

# 11. 2D PRODUCT IMAGES AND GALLERY MUST ALWAYS WORK

This is the foundation of the entire product experience. No product needs a 3D asset or external service to display correctly.

## 11.1 Default product experience

Every product must work with ordinary 2D photography alone. Present it beautifully using:

- A large, high-quality primary image.
- A neutral or intentionally art-directed display surface that does not distort the product’s real color.
- Correct `object-fit` and configurable `object-position` settings appropriate to the source photo.
- Responsive image sizing and a stable aspect ratio to prevent layout shift.
- Optional accessible image enlargement/lightbox.
- Optional thumbnails to switch among actual alternate views.
- Smooth, restrained transitions between supplied images.
- Clear product name, price, currently selected color, configured options, and contact CTA.
- A graceful gallery empty state if an optional secondary image is missing.

For isolated product photography, prefer `object-fit: contain` so the complete product remains visible. For editorial or lifestyle photography, use `cover` only when the crop is intentional and does not cut off important product details. Make image presentation settings configurable per product when necessary instead of forcing one global crop onto every photo.

Use the supplied source photo rather than inventing inaccurate visual details. Do not claim the photo is rotatable or 3D.

## 11.2 Image processing and quality

- Use optimized WebP/AVIF assets where practical and retain a sensible original source copy outside the deployed asset set when helpful.
- Provide descriptive alt text, localized where appropriate.
- Lazy-load noncritical product and review images; prioritize the hero image.
- Reserve image dimensions/aspect ratios to prevent layout shifts.
- Avoid downloading full-resolution versions when a smaller responsive image is sufficient.
- For transparent PNG/WebP images, use a suitable display surface so the product remains readable in dark and light themes.
- Preserve the true visual color of the product; UI theme changes must not recolor the merchandise.
- Do not use decorative overlays or CSS filters that unintentionally change the product’s color.

## 11.3 Real product-color variants

The preferred and most reliable color-selection method is one approved image set per actual product color.

When the owner supplies a black, beige, and brown version of a bag, selecting each swatch must display the exact corresponding image set. The selected swatch, text label, main image, and thumbnails must always agree.

If the owner has only one photograph and prepares alternate colors in an image editor, treat each recolored result as a separate asset. Review it before publishing and retain product details such as texture, seams, stitching, logos, straps, chains, metal hardware, shadows, and highlights. If the result changes important details or is not faithful to the actual product, do not publish it as a real variant.

Never rely on an unqualified CSS `filter`, blend mode, or color overlay to simulate every color option. Such effects can recolor the background and other parts of the image and usually cannot preserve the original materials faithfully. No automatic customer-side image recoloring is required for the core site.

## 11.4 Photo-gallery controls

Only display controls that actually work. When multiple images are available, visitors may choose the supplied photo angles from thumbnails. A zoom or lightbox must open the corresponding real image, offer a clear close action, be keyboard accessible, and work on touch devices.

Do not show 3D rotation, wireframe, AR, mannequin, virtual try-on, or fake 360-degree controls. A series of still photos must be labelled and presented as a gallery, not as continuous 3D rotation.

## 11.5 Image-loading and missing-asset behavior

- Handle broken or missing image paths gracefully.
- Use a designed placeholder or hide an unavailable thumbnail instead of displaying a broken-image icon.
- Keep the product name, price, variant information, and contact controls usable if a secondary image fails.
- Do not show a color variant as available if its required primary image is missing, unless the owner explicitly chooses a disclosed text-only fallback.
- Avoid layout jumps while images load.

---

# 12. PRODUCT IMAGE PREPARATION WORKFLOW

Create a simple, repeatable workflow that lets the owner prepare product photos without needing 3D software or a complicated production pipeline.

## 12.1 Recommended source photographs

For the cleanest website presentation, recommend source images with:

- One clearly visible product, fully inside the frame.
- Sharp details and sensible exposure.
- Neutral or uncluttered backgrounds when possible.
- Consistent lighting across the same product’s color variants.
- Enough resolution for desktop and mobile use.
- Minimal obstruction of straps, handles, stitching, closures, labels, and other important details.
- A useful primary angle plus optional real side, back, interior, close-up, and lifestyle photographs.

Do not require a transparent background. If the owner has a transparent PNG/WebP cutout, display it on a suitable background. If the original background is part of a lifestyle photo, preserve it and configure its crop intentionally.

## 12.2 Image editing and recoloring are asset-preparation steps

Image cropping, background cleanup, compression, and optional recoloring happen before the photo is added to the static site. The public website does not need to generate or recolor images at runtime.

The owner may use a suitable image editor or recoloring tool to prepare a variant from an existing photograph, but must inspect the result carefully. Recoloring is especially error-prone around reflective metal, leather texture, fabric patterns, black materials, translucent details, shadows, logos, stitching, and background edges.

Do not promise that any particular editing tool, AI service, or automatic method will always produce accurate product colors. Do not require paid AI subscriptions or send photos to external providers as part of the core site. If an external tool is considered separately, the owner should review its pricing, privacy, terms, and commercial-use conditions.

## 12.3 Suggested asset naming and storage

Use clear, stable filenames, for example:

```text
public/
  images/
    products/
      caramel-bag-black-main.webp
      caramel-bag-black-side.webp
      caramel-bag-beige-main.webp
      caramel-bag-beige-side.webp
      caramel-dress-cream-main.webp
      caramel-dress-cream-detail.webp
    reviews/
      facebook-review-001.webp
      instagram-review-001.webp
```

Use file names that identify the product, color, and view. Avoid spaces and inconsistent names. Keep each variant’s image set clearly grouped by a consistent naming convention.

## 12.4 Optimization recommendations

- Export product photos as WebP or AVIF where supported and sensible.
- Keep dimensions appropriate to the actual display size; do not ship unnecessarily huge images.
- Avoid over-compression that damages fabric, stitching, edges, or text.
- Preserve a source/original copy when useful for future edits, but do not publish duplicate originals unnecessarily.
- Confirm the optimized image still represents the real product color and detail.
- Test the result on a mobile-sized viewport and a desktop viewport before publishing.

## 12.5 Beginner-friendly owner checklist

For every product, the owner should be able to:

1. Choose the product’s stable ID.
2. Prepare one primary image for every real color variant that should be selectable.
3. Add optional alternate-angle and detail photos for each variant.
4. Optimize and copy the images into `public/images/products/`.
5. Add the image paths and variant details to the central product data file.
6. Preview the product in Arabic and English, in dark and light themes.
7. Verify every swatch, primary image, thumbnail, price, and contact action.
8. Redeploy the updated static site.

---

# 13. FUNCTIONAL COLOR-VARIANT SYSTEM

Implement a dependable product color selector. Color selection is a real product interaction, not a decorative row of circles.

## 13.1 Swatch design and accessibility

- Show only color variants that are explicitly configured for that product.
- Use a swatch color that approximates the actual color, or an owner-supplied swatch image when a solid color is misleading.
- Provide each swatch with an accessible name in Arabic and English, such as “Black / أسود”.
- Clearly communicate which swatch is selected using more than color alone, such as an outline, checkmark, or selected-state label.
- Support mouse, touch, and keyboard interaction.
- Ensure swatches are large enough to use comfortably on mobile.
- Avoid inventing names, availability, or colors.

## 13.2 Required selection behavior

When a visitor selects a variant:

1. Update the active/selected swatch.
2. Update the displayed color name in the current interface language.
3. Update the main product image to the correct image for that exact variant.
4. Update gallery thumbnails so they only represent the selected variant.
5. Update any product inquiry action or WhatsApp message to include the selected color when configured.
6. Preserve unrelated product data, such as its name, category, description, and valid price.
7. Keep the selection visually stable while the image loads, and show a graceful loading or fallback state if needed.

Never show a beige image while the black swatch is selected. Never mix thumbnails from different variants. If the selected variant has an optional alternate image missing, hide that unavailable thumbnail without breaking the rest of the gallery.

## 13.3 Data model requirements

Each variant should have a stable ID, bilingual color name, optional swatch value/image, primary image path, optional gallery image paths, and optional availability only when provided by the owner.

The product data should be the single source of truth. Do not hard-code a separate list of colors into the visual component for individual products.

If no explicit color variants exist for a product, omit the swatch selector instead of presenting nonfunctional default swatches.

## 13.4 Optional pre-prepared recolored assets

A product may use prepared color-variant files created from one original photograph, but those files must be treated as separate, reviewed image assets. The website should not assume that an arbitrary CSS filter can accurately simulate a product’s material or physical color.

If approved recolored files are used, map each file explicitly to its corresponding variant. Make no claim about physical availability beyond the information supplied by the owner. If an image is only a visualization and not a photograph of an actual available option, it must be clearly disclosed and must not mislead the customer.

## 13.5 Product inquiry synchronization

When the visitor chooses “Contact to Order” or a similar product inquiry action, use the currently selected color in the inquiry text if a real contact destination is configured. URL-encode message contents correctly. The website must never claim that an order has been placed or that stock is reserved.

---

# 14. PRODUCT DETAILS AND IMAGE-INSPECTION EXPERIENCE

Create a polished product-inspection experience built entirely around genuine 2D images.

## 14.1 Product detail composition

Where a product detail view or modal is used, include:

- A large primary image with a stable aspect ratio.
- The product name and real price information.
- Color selector only when actual variants are configured.
- Optional thumbnails for genuine alternate images.
- Concise product description only when supplied by the owner.
- Product contact/inquiry action.
- Clear close/back behavior if displayed in a dialog or modal.

Keep the layout editorial and product-first. Avoid dense controls, generic admin-dashboard styling, and excessive badges or rounded cards.

## 14.2 Lightbox and zoom

A lightbox or zoom interaction may be implemented when it improves inspection. It must:

- Display the actual selected image, not an unrelated or fabricated image.
- Offer an obvious close control.
- Support keyboard dismissal with Escape when applicable.
- Manage focus appropriately while open.
- Prevent background content from becoming unintentionally interactive.
- Support touch devices and narrow screens.
- Provide useful image alternative text.
- Avoid stretching or cropping the image in a way that hides important details.

## 14.3 Gallery state and error handling

- Switching image thumbnails changes the main displayed image.
- Switching colors selects the corresponding primary image and matching gallery set.
- A missing optional image must not break the product view.
- If a primary image fails, show a polished fallback and keep product text/contact options usable.
- Do not display fake zoom, rotation, 360-degree, AR, mannequin, or virtual try-on controls.
- Do not claim a product image can show hidden details that are not present in the supplied photo.

## 14.4 Honest presentation

Keep the merchandise’s apparent color and details as faithful to the approved asset as possible. Do not add fabricated fabric texture, logos, hardware, pockets, straps, seams, dimensions, or material claims. When an asset is an illustrative color preview rather than a photo of the actual variant, disclose that clearly.

---

# 15. CONTACT, PRODUCT INQUIRY, AND CONVERSION

The site does not implement checkout or payment.

## 15.1 Product CTAs

Buttons such as “Contact to Order”, “Interested in This Item”, or “اطلبي المنتج” must:

- Scroll smoothly to the real contact section as the primary behavior; or
- Offer a clearly separate, configured product-specific WhatsApp link if the business number is actually set.

A product-specific WhatsApp message may include the product name and selected color, localized to the current language. Encode URL text correctly. Do not send to a placeholder phone number.

Do not redirect to a nonexistent cart or checkout page.

## 15.2 Contact configuration

Create a single central configuration for:

- WhatsApp phone number (international digits, configured by owner).
- Direct WhatsApp conversation URL.
- WhatsApp Channel URL.
- Instagram profile URL.
- TikTok profile URL.

No real phone number, channel, profile, or social URL was supplied in the requirements. Use empty/unconfigured values and hide/disable those destinations until real ones are supplied. Never invent accounts or present placeholders as real links.

## 15.3 Floating WhatsApp action

The floating WhatsApp button is mandatory.

- Fixed to the bottom-left of the viewport regardless of scroll position.
- Uses a recognizable icon and accessible label.
- Opens the configured direct conversation.
- Has proper focus visibility and subtle hover/tap feedback.
- Is responsive and has correct stacking order.
- Does not obstruct product-image-gallery controls or mobile content.
- Remains visible near the footer.
- Continues working with both languages and themes.

If the number is unconfigured, do not point it to a fake destination. In development, show a clear placeholder/debug affordance; in production, disable or hide the button until configured. The owner can configure it in one place.

---

# 16. CUSTOMER REVIEWS AND SOCIAL PROOF

Create a dedicated review gallery with categories:

- Facebook.
- Instagram.
- TikTok.

The site owner will supply genuine review screenshots later. Store review image assets and source/category metadata separately from the visual components.

Required behavior:

- Selecting a category displays only its matching review screenshots.
- Responsive gallery/grid with appropriate image ratios.
- Attractive framing without distorting screenshots.
- Optional accessible lightbox/enlargement.
- Keyboard and touch-friendly controls.
- Clear active category state.
- Smooth restrained transitions.
- Localized titles, controls, and empty states.
- Lazy loading for noncritical assets.

Do not invent customer reviews, edit the words in genuine screenshots, misattribute testimonials, or make up review counts/ratings. If a category has no supplied assets, show a tasteful localized empty state instead of fake content.

---

# 17. FOOTER AND CLOSING SECTION

Create a polished contact-oriented closing section that invites visitors to ask about products, colors, availability, and ordering.

Include only properly configured links for:

- Direct WhatsApp.
- WhatsApp Channel.
- Instagram.
- TikTok.

Use recognizable icons, consistent styling, meaningful accessible labels, and a centralized configuration file. The footer must work in dark/light mode and RTL/LTR layouts.

---

# 18. MOTION DESIGN

Establish one coherent motion language across the site. Useful motion may include:

- Hero entrance.
- Subtle scroll-driven product transitions.
- Parallax on selected layers.
- Image reveals.
- Product-card hover/tap feedback.
- Theme transitions.
- Review category switching.
- Product image-gallery transitions and color-variant switching.
- Accessible dialog/lightbox transitions.

Use CSS transitions for simple interactions. Use GSAP/ScrollTrigger only if the existing application and design justify them. Avoid layering several heavy animation libraries unnecessarily.

Requirements:

- Never block key actions behind an animation.
- Honor `prefers-reduced-motion`.
- Keep essential content usable without animations.
- Avoid forced scrolling and excessive pinning.
- Prefer transforms/opacity to repeated layout calculations.
- Simplify animation on mobile/low-powered devices.

---

# 19. TECHNICAL STACK AND ARCHITECTURE

Prefer the existing stack if it works. For a new project, a practical default is:

- React.
- TypeScript.
- Vite.
- Tailwind CSS or a carefully organized CSS architecture.
- Centralized localization dictionaries.
- CSS variables/design tokens for themes.
- GSAP/ScrollTrigger only for justified complex motion.
- A consistent icon library such as Lucide.

Avoid unnecessary dependencies. Keep the public build static, client-focused, and compatible with Vercel. No database or backend is required.

Organize code into meaningful reusable units, for example:

- Header, LanguageSwitcher, ThemeSwitcher.
- HeroSection, CinematicScene.
- ProductCollection, CategoryFilters, ProductCard.
- ProductDetails, ColorSelector, ProductImageGallery, ProductImageLightbox.
- CustomerReviews, ReviewGallery, ReviewLightbox.
- ContactSection, Footer, FloatingWhatsAppButton.

Use clear TypeScript types for products, image galleries, color variants, review assets, and contact configuration. Avoid monolithic components and duplicated markup.

---

# 20. RECOMMENDED FILE ORGANIZATION

Adapt this to the actual repository rather than forcing a restructure unnecessarily:

```text
src/
  components/
    Header/
    HeroSection/
    CinematicScene/
    ProductCollection/
    ProductCard/
    ProductImageGallery/
    ProductImageLightbox/
    CustomerReviews/
    ContactSection/
    Footer/
    FloatingWhatsAppButton/
  data/
    products.ts
    reviews.ts
  i18n/
    ar.ts
    en.ts
    index.ts
  config/
    brand.ts
    contact.ts
  styles/
    tokens.css
    global.css
  types/
    product.ts
public/
  images/
    products/
    reviews/
docs/
  ADDING_PRODUCTS.md
  PRODUCT_IMAGES_AND_COLORS.md
  DEPLOYMENT.md
```

Keep public assets in static directories and reference them with deployment-safe paths such as `/images/products/caramel-bag-black-main.webp`. Keep every color variant and its alternate views explicitly mapped in the product data.

Do not add image-generation model weights, external image-processing credentials, or unnecessary large source files to the public website repository.

---

# 21. EASY PRODUCT-ADDING WORKFLOW

The owner should be able to add products and maintain their images and color options without rewriting visual components.

Create `docs/ADDING_PRODUCTS.md` and `docs/PRODUCT_IMAGES_AND_COLORS.md` with simple, copyable walkthroughs explaining:

1. Choose a stable product ID.
2. Copy the optimized primary photograph to `public/images/products/`.
3. Add optional alternate-angle and detail photographs.
4. For each color the owner wants to offer, add the correct primary image and optional gallery images for that variant.
5. Prepare any recolored image variants separately, review them against the real product, and save them as distinct assets before adding them to the data file.
6. Add a product record to the central data file with Arabic/English names, actual prices, category, image paths, explicit variants, and real availability only when supplied.
7. Leave the variants array empty or omit the selector when no real/configured color variants exist.
8. Check the product locally in both languages and themes.
9. Verify image-only display, thumbnail switching, color-to-image matching, mobile layout, image loading, and contact actions.
10. Rebuild and deploy the changed static site.

Include a clearly labelled example record, but do not imply example price/product data is real. Explain that a simple static Vercel deployment does not persist images uploaded into the browser; actual public changes require an asset/data update and deployment unless the owner later chooses a real CMS or backend.

A browser-based local preview/import utility may be added only if it is clearly labelled and does not falsely claim to publish or permanently store images. Do not create a fake one-click publish feature.

---

# 22. PERFORMANCE AND STATIC DEPLOYMENT

## 22.1 Image performance

- Use suitable dimensions and WebP/AVIF when practical.
- Keep a sensible source copy for editing and use optimized files for the public website.
- Lazy-load noncritical collection and review images.
- Prioritize the hero’s main visual.
- Reserve aspect ratios/dimensions to avoid layout shifts.
- Use responsive image sizing where appropriate.
- Avoid loading every gallery image at full resolution before it is needed.
- Avoid unnecessarily large image files and duplicate assets.
- Use descriptive filenames and useful alternative text.

## 22.2 Color-variant performance and correctness

- Preload only the main image for the currently displayed product when practical.
- Avoid loading every high-resolution alternate image for every product during the initial page load.
- Update gallery assets from the selected variant’s explicit data.
- Avoid layout changes when variant images have different source dimensions.
- Do not use expensive runtime filters or canvas processing to recolor product images for the core experience.
- Keep UI theme changes independent from the merchandise’s actual image colors.
- Provide a graceful loading/failure state if an image cannot be fetched.

## 22.3 Vercel static deployment

- Keep the project deployable as a static frontend with no required database, image-generation backend, or paid AI API.
- Do not claim that a browser upload permanently updates the deployed catalogue.
- Check current hosting/static asset limits before publishing a large quantity of very high-resolution images.
- Do not assume arbitrary media storage is available on the free tier.
- If permanent online product uploads or an admin dashboard are requested in the future, explain the additional CMS/storage/backend requirements before implementing them.
- Provide clear build/deploy documentation based on the project’s actual scripts.

The desired result is visually compelling without compromising page responsiveness, image fidelity, or the basic 2D browsing experience.

---

# 23. RESPONSIVE DESIGN

Explicitly design and test:

- 360 px mobile.
- 390–430 px mobile.
- 768 px tablet.
- 1366 px laptop/desktop.
- 1920 px large display.

Do not simply shrink a desktop layout. Recompose the hero, adapt navigation, product columns, review gallery, cinematic scenes, image-gallery and lightbox controls, and footer at each breakpoint.

Ensure:

- No accidental horizontal overflow.
- Arabic and English both work on narrow screens.
- Gallery thumbnails, color swatches, and image zoom controls are practical on touch screens.
- Fixed WhatsApp button does not cover key actions.
- Dialog/lightbox controls fit on mobile.
- Reduced motion works.

---

# 24. ACCESSIBILITY

Implement:

- Semantic HTML and logical heading hierarchy.
- Keyboard accessible navigation and controls.
- Visible focus indicators.
- Descriptive image alt text localized where appropriate.
- Accessible language/theme switchers.
- Meaningful color-swatch labels and selected states.
- Accessible modal/lightbox behavior, including escape/close and focus handling.
- Sufficient color contrast in both themes.
- Touch-friendly control sizes.
- `prefers-reduced-motion` support.
- Correct language and direction attributes.
- Graceful behavior when animations are disabled or images fail to load.

Never communicate selection by color alone and never rely exclusively on hover for a primary action.

---

# 25. PRIVACY, SECURITY, LICENSING, AND EXTERNAL DEPENDENCIES

- Do not expose API keys, secret credentials, or private tokens in frontend source.
- Do not transmit product photographs to an external AI-processing provider as part of the core website.
- Do not add external AI services for core product display, color selection, or gallery behavior.
- If an optional external image-editing, recoloring, CMS, or storage provider is considered later, document its cost, credential handling, data flow, privacy terms, and limitations before implementation.
- Do not fabricate API endpoints, upload progress, image-processing output, or successful publishing results.
- Use only supplied, appropriately licensed, or otherwise legitimately usable product and review assets. Document attribution requirements where applicable.
- Avoid uploading customer-review screenshots or business/product imagery to third-party services without the owner’s authorization.
- Do not claim a prepared or recolored image is a faithful photograph of a real variant unless it has been checked.

The public catalogue must continue working without any external AI service, online image editor, or optional image-hosting integration.

---

# 26. TESTING AND QUALITY ASSURANCE

Do not assume the project passes. Run available commands and report real outcomes.

At minimum:

1. Install dependencies using the documented package manager.
2. Run the production build.
3. Run type-checking and linting when configured.
4. Resolve critical build/runtime errors where possible.
5. Test language switching both ways and verify the whole interface updates.
6. Verify correct RTL/LTR direction and mixed-language text.
7. Test default dark mode, light mode, persistence, and switching while preserving language.
8. Test product collection, filters, prices, discounts, and configured color variants.
9. Verify that selecting each color updates the swatch state, color label, main image, and matching thumbnails together.
10. Test a product with multiple genuine alternate images and a product with only one primary image.
11. Test missing/broken primary and secondary image paths and confirm the page remains usable.
12. Verify there are no fake 3D, AR, mannequin, virtual try-on, or nonfunctional image controls.
13. Test review categories, supplied review images, empty states, and lightbox where implemented.
14. Test configured and unconfigured social links; ensure no fake destinations are used.
15. Test that product CTAs include the selected color when appropriate, scroll to contact or open a configured inquiry destination, and do not claim to place an order.
16. Test mobile widths and check for horizontal overflow.
17. Check browser console for critical errors where testing tools are available.
18. Verify reduced-motion behavior.
19. Confirm the build does not depend on external image-generation services or a required backend.

Do not claim a test passed if it was not run. Clearly distinguish tests run, tests not possible in the environment, and known limitations.

---

# 27. REQUIRED DELIVERABLES

Deliver the actual runnable website project and ensure the following documents exist and are accurate:

- `README.md`: project overview, prerequisites, install/run commands, build command, and local development workflow.
- `docs/ADDING_PRODUCTS.md`: how to add a product, real images, variants, prices, and reviews.
- `docs/PRODUCT_IMAGES_AND_COLORS.md`: beginner-friendly image preparation, optimization, file naming, product-gallery setup, authentic color-variant mapping, optional pre-prepared recoloring guidance, and troubleshooting.
- `docs/DEPLOYMENT.md`: static Vercel deployment steps, build settings, image-size considerations, and clear limitations of static uploads.

Use real commands corresponding to the actual project scripts. Do not document fictional scripts or features.

The product-image and color workflow must explain how the owner adds files to the project, edits the central product data, tests each variant, and redeploys. It must not imply that an ordinary browser upload permanently changes the static website.

---

# 28. ACCEPTANCE CRITERIA

The implementation is accepted only when the following is true or any limitation is explicitly disclosed:

## Visual experience
- Premium fashion editorial direction.
- Compelling hero and coherent section flow.
- Cinematic motion used with restraint.
- Strong product presentation in both themes.

## Languages and themes
- Full Arabic and English interfaces.
- Correct RTL/LTR behavior.
- Dark mode default.
- Functional persistent light/dark toggle.
- Language/theme choices do not reset one another.

## Product catalogue
- Local data drives product cards.
- Real price and discount calculations.
- Working category filters and explicitly configured variants.
- Missing data and empty states handled gracefully.

## 2D product images and colors
- Every product works with ordinary 2D photographs alone.
- Product photographs display attractively and responsively without stretching.
- Image zoom/lightbox and thumbnail gallery work if presented.
- Selecting a configured color switches to the correct primary image and matching gallery assets.
- No unconfigured or fabricated color options are shown.
- No blanket CSS filter is used as a misleading substitute for real color-variant assets.
- Missing/broken optional images do not break the product page.
- No 3D, wireframe, AR, mannequin, virtual try-on, or fake 360-degree controls are present.
- No paid AI API or image-generation model is required for the public website.

## Reviews and contact
- Review categories show the correct supplied assets.
- Empty categories do not show fake testimonials.
- Primary product actions navigate to contact or use a real configured inquiry link.
- Product inquiries reflect the currently selected color when appropriate.
- Floating WhatsApp button remains bottom-left when a real number is configured.
- Social destinations are configurable and not invented.

## Engineering
- Responsive layout with no obvious horizontal overflow.
- No critical build error left unreported.
- No paid AI API, backend, or database required by the core website.
- Accurate local setup, product-image, product-addition, and deployment documentation.
- Testing claims match what was actually tested.

---

# 29. IMPLEMENTATION ORDER

Follow this order to reduce rework:

1. Inspect the current repository and identify framework, assets, existing pages, and scripts.
2. Establish/refine design tokens, project structure, language system, RTL/LTR, and dark-first theme.
3. Implement header, hero, and section navigation.
4. Implement the data-driven product collection and working category filters.
5. Build the universal 2D product-image presentation, including stable aspect ratios, responsive sizing, and image-loading fallbacks.
6. Implement the functional color-variant data model and make the selected swatch, color label, primary image, and gallery assets update together.
7. Add product details, image thumbnails, zoom/lightbox, prices, inquiry flows, genuine reviews, contact section, footer, and floating WhatsApp control.
8. Implement/refine cinematic motion and responsive behavior while respecting reduced-motion preferences.
9. Write the product image/color workflow, product-addition guide, and Vercel deployment documentation.
10. Run build/type/lint/tests that are available, fix issues, and report exact results.

Do not spend time integrating 3D viewers, image-to-3D generators, mannequin viewers, or virtual try-on. The agreed approach is a polished 2D image gallery and explicit, owner-approved color-variant assets.

---

# 30. FINAL INSTRUCTION

Build the best maintainable, polished, and honest version of this premium bilingual fashion website within the existing project and static-hosting constraints.

The site must remain fully useful with ordinary 2D product images alone. Every configured color swatch must select the correct owner-approved image set, and product photography must be presented with professional framing, accessible gallery controls, responsive behavior, and faithful colors. Optional pre-prepared recolored assets may be used only when reviewed and explicitly mapped to a variant; do not pretend arbitrary CSS filters or automatic image transformations are accurate.

Do not implement 3D product viewers, GLB/GLTF workflows, image-to-3D generation, WebGL product displays, mannequins, or virtual try-on features. Do not add a paid AI API or backend to the core website.

The main business objective is to present products beautifully, let customers inspect their real photos and available colors, showcase genuine reviews, and make it easy to contact the brand via properly configured social links.

Inspect the real project, implement and test the changes where the environment permits, document the repeatable product-image workflow, and deliver the working project. Never substitute unsupported claims for real functionality.

---

# 31. DEMO CATALOGUE, STARTER PRODUCT IMAGES, AND FUTURE PRODUCT ADDITIONS

This section supplements the product catalogue, asset-management, acceptance, and implementation requirements above. It clarifies that the first working version must be visually populated for preview while remaining easy to replace with the owner’s real inventory.

## 31.1 First-Run Preview Must Not Look Empty

The first runnable version must include a clearly labelled demo catalogue so the owner can evaluate the website's real visual appearance before preparing all real products.

- Include approximately 8–12 demo products, with at least four handbag/bag examples and at least four women’s clothing examples such as dresses, tops, shirts, or outerwear. Additional accessories are optional.
- Populate the normal product collection and product-detail/gallery experience with these demo records. The cards must look like real cards in the intended production layout, not blank wireframes.
- Create or obtain suitable demo product photographs using image-generation capabilities available in the working environment, or use images that are legally suitable for this purpose and can be stored locally in the project. Prefer original generated demo images when generation is actually available.
- Do not assume a tool or image-generation capability exists if it is not available. If the environment cannot generate or safely retrieve images, make the best available fallback, document the limitation, and never pretend remote or missing images were successfully added.
- Prefer local image files saved within the project's public asset folders. Do not rely on fragile hotlinked image URLs as the permanent demo asset strategy.
- Where externally sourced images are used, verify the applicable usage terms as far as the available tools allow and document source/licensing notes in a file such as `docs/DEMO_ASSET_SOURCES.md`. Do not present an uncertain license as verified.
- Do not fabricate actual business inventory, genuine product claims, authentic stock status, real customer reviews, real customer names, brand social accounts, or contact details.

## 31.2 Make Demo Mode Explicit and Easy to Replace

The sample products, their images, and any example prices are for visual demonstration only. They must never be represented as the owner's real inventory.

- Add a simple, centralized demo/production configuration, such as `catalogMode: "demo" | "production"`, or an equivalent maintainable approach that fits the existing codebase.
- In demo mode, display a tasteful, visible, localized notice in Arabic and English that the website is showing sample products and illustrative prices for preview only. Mark demo product data explicitly, for example with `isDemo: true`.
- Demo prices, if included to demonstrate price layout, must be visibly identified as illustrative/demo prices. Do not imply they are real selling prices.
- Demo color options may be used to demonstrate the interface, but every visible demo swatch must still map to its own correct demo image. Do not simulate separate variants by recoloring the entire image with a CSS filter.
- Never create fake customer reviews to fill space. Keep the review gallery in its honest empty state until genuine review screenshots are supplied.
- Never invent WhatsApp, Instagram, TikTok, or other business links. Keep unconfigured contact destinations hidden or disabled according to the existing specification.
- Provide a simple documented method for replacing/removing all demo records and switching to the real catalogue when the owner supplies actual product data. The demo notice must disappear only when production mode is explicitly selected and demo products are no longer presented as real items.
- Keep demo assets clearly grouped or named, for example under `public/images/demo-products/`, unless the existing architecture offers a better clearly documented arrangement.

## 31.3 Product Cards Must Be Data-Driven and Automatically Expand

The product collection must use one central product-data source or catalog manifest. Do not hard-code each product card separately in the UI.

- Render product cards by iterating through the configured product records using the reusable product-card component.
- When a new valid product record is added to the central catalogue, its card must automatically appear in the same responsive collection/grid as the existing cards, with no edits to the collection component or one-off markup.
- The new record must participate in applicable category filters, sorting/order rules, and responsive layout automatically.
- Each card must use that record’s own name, price, category, image, and configured variants. Do not duplicate data separately inside components.
- Use stable unique IDs/slugs and validate duplicate IDs, missing primary images, malformed variants, and invalid price/discount data where practical.
- If the collection contains more items than fit on one row or screen, the layout should naturally wrap into additional rows or use the chosen documented responsive collection behavior. Never truncate or hide newly added products just because the original demo catalogue was small.

## 31.4 Simple, Repeatable Workflow for Adding a Real Product

Document a beginner-friendly workflow suitable for the static Vercel architecture:

1. Create a product folder under the project's chosen product-image directory, using a stable product slug where practical.
2. Copy that product’s optimized primary image and any alternate-angle/detail images into the folder.
3. Add separate, owner-approved image files for each real color variant that should be selectable.
4. Add one product record to the central catalogue using the documented template, referencing the exact image paths.
5. Run the site locally and verify that the new card appears automatically in the normal collection, the correct category filter works, and each color selects the matching image set.
6. Verify the product in Arabic and English and in both themes.
7. Rebuild and redeploy the static website so visitors see the new record and assets.

The static browser cannot reliably discover arbitrary files merely because they were copied into a folder. Do not tell the owner that copying image files alone automatically publishes a product. The card must be represented in the catalogue manifest/data source unless a real, tested build-time import script is implemented. An optional helper script or copyable product template may simplify adding a product, but it must genuinely work and be documented. Do not invent an admin dashboard or permanent browser uploader.

## 31.5 Demo-to-Real Product Import

When the owner later supplies real product assets and a product catalog:

- Inspect the real catalog and files before importing.
- Replace demo entries with real entries by default, unless the owner explicitly asks to keep selected demo items.
- Do not merge demo sample prices or color variants into real product records.
- Preserve demo files until replacement has been verified, unless deletion is explicitly requested; avoid destructive asset changes.
- Report which demo entries were removed, retained, or replaced, and which real products need more information.
- Keep the demo notice enabled if any demo items or illustrative prices remain in the public catalogue. Switch to production mode only when the displayed catalogue is genuinely ready.

## 31.6 Required Acceptance Checks

Before delivery:

- Confirm the first local preview displays a visually populated, responsive demo collection using working local images wherever feasible.
- Confirm the collection includes bags and women’s clothing, not just generic placeholders.
- Confirm demo content is clearly labelled and is not confused with the owner’s real inventory.
- Confirm every displayed demo color swatch switches to its explicitly mapped image.
- Add a temporary test product record and verify that a new card appears in the normal collection without modifying the reusable card/grid component; then remove the test record.
- Confirm newly added products are not clipped or hidden by a fixed-size grid.
- Confirm the real-product import workflow can replace demo records without leaving illustrative prices or sample variants mixed into production data.
- Confirm there are no fake reviews, fabricated social links, or false claims about permanent browser uploads.
- Report which demo images were actually generated/downloaded and saved, their source/license notes when applicable, and any assets that could not be obtained.

These demo requirements do not override the truthfulness rules in the rest of the specification. Demo data is allowed only when transparently labelled as demo data and easy to remove before real business launch.

