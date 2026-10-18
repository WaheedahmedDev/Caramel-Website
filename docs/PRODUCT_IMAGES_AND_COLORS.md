# Caramel Showroom — Product Photography & Color Variant Guidelines

This document defines the photographic standards, asset specifications, and color variant rules for the Caramel luxury fashion showroom.

---

## 1. Photographic Art Direction & The Pure 2D Invariant

Caramel is designed as an art-directed luxury fashion editorial showroom. To maintain elegance and respect brand boundaries:

- **Strict 2D Photography**: All merchandise inspection is rendered strictly using high-resolution 2D still photography.
- **Prohibited Workflows**: The website strictly forbids 3D viewers, WebGL rendering, GLTF/GLB models, interactive wireframes, rotating 360-degree canvases, mannequins, AR, and virtual try-on tools.
- **Editorial Focus**: Use large, carefully framed photographs with crisp lighting, neutral backgrounds, and intentional negative space.

---

## 2. Aspect Ratios & Framing Standards

| Asset Role | CSS Token | Aspect Ratio | Dimensions (Recommended) | Object-Fit |
|---|---|---|---|---|
| **Product Showcase & Detail** | `--aspect-product` | **4:5** (0.8) | **1200 × 1500 px** | `contain` (cutout studio shots) or `cover` (editorial lifestyle) |
| **Editorial Spotlight** | `--aspect-portrait` | **3:4** (0.75) | **1200 × 1600 px** | `cover` |
| **Hero Campaign Banner** | `--aspect-hero` | **16:9** (1.77) | **1920 × 1080 px** | `cover` |

### Neutral Display Canvas
Products sit on a dedicated design token surface:
```css
--color-product-surface: #141210; /* Dark Mode */
--color-product-surface: #F5F5F4; /* Light Mode */
```
This surface provides subtle, neutral framing that preserves genuine leather and fabric undertones without tinting or color distortion.

---

## 3. Recommended Formats, Sizing & Performance

- **Formats**: **WebP** is strongly recommended for its superior compression and visual fidelity. High-quality JPEG is also fully supported.
- **File Size Target**: Aim for **150 KB – 350 KB** per photograph. Do not upload raw uncompressed camera files (4000px+ / 10MB+) as they cause layout lag and degrade mobile performance.
- **Responsive Scaling**: All images use `max-width: 100%; height: auto;` or fluid aspect-ratio boxes via the shared [`ImageFrame`](file:///src/components/common/ImageFrame.tsx) component.

---

## 4. Standardized File Naming Convention

Organize incoming photographs under `public/images/products/<product-slug>/` using a consistent, hyphen-separated naming scheme:

```
public/images/products/<product-slug>/
  ├── <color-slug>-main.webp       (Primary hero view for this color)
  ├── <color-slug>-side.webp       (Profile / silhouette view)
  ├── <color-slug>-detail.webp     (Hardware, texture, or stitching close-up)
  └── <color-slug>-interior.webp   (Lining or compartments view)
```

### Example: Heritage Tote with Noir and Caramel Cognac
```
public/images/products/heritage-leather-tote/
  ├── noir-main.webp
  ├── noir-side.webp
  ├── noir-detail.webp
  ├── cognac-main.webp
  └── cognac-side.webp
```

---

## 5. Explicit Color Variant Mapping Rules

### Rule 1: Every Variant Must Have Its Own Genuine Image
Selecting a color swatch must display an authentic photograph of the product manufactured in that specific color.

### Rule 2: Absolute Prohibition of CSS Color Filters
Using CSS filters (such as `filter: hue-rotate(...)`, `saturate(...)`, or color blending modes) as a substitute for real product photography is **strictly forbidden**. CSS filters distort leather textures, misrepresent hardware metal finishes, and mislead clients.

### Rule 3: Zero Cross-Variant Contamination
A product's gallery must never mix photographs from different color variants:
- When **Noir** is selected, the primary frame and gallery thumbnail strip must show **only** Noir assets (`noir-main.webp`, `noir-side.webp`).
- When **Cognac** is selected, the gallery must immediately switch to show **only** Cognac assets (`cognac-main.webp`, `cognac-side.webp`).
- Cross-color thumbnails are prohibited.

### Rule 4: Single-Edition Products Have Zero Fake Swatches
If a piece is only produced in one color, its `variants` array in `src/data/products.ts` must be empty (`variants: []`). The component will automatically suppress the swatch selector, presenting the piece as an exclusive edition without synthetic options.

---

## 6. WCAG 2.2 Accessible Swatch Standards

Every color swatch rendered in the showroom adheres to strict accessibility standards:

1. **Touch Target Size**: Guaranteed minimum size of **44 × 44 px** (`width: 44px`, `height: 44px`, `minWidth: 44px`, `minHeight: 44px`) ensuring easy operation on mobile devices.
2. **Non-Color Visual Indicator**: Selection is indicated by a visible checkmark icon (`<Check size={12} />`), not color alone, assisting color-blind users.
3. **Dynamic Contrast Calculation**: The checkmark color is calculated via relative luminance:
   ```typescript
   // Uses ITU-R BT.601 relative luminance formula
   const isDark = (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
   const checkmarkColor = isDark ? '#FFFFFF' : '#1C1917';
   ```
4. **ARIA Semantics**: The swatch container uses `role="radiogroup"` with a localized accessible label, and each swatch button uses `role="radio"` with `aria-checked={isSelected}`.

---

## 7. Graceful Image Error Handling

Merchandise photographs are rendered through [`ImageFrame`](file:///src/components/common/ImageFrame.tsx):

- If a photo fails to load (e.g. temporary network drop or missing file), `ImageFrame` renders an elegant designed fallback state (`ImageOff` icon with localized error text).
- The fallback never breaks surrounding layouts, throws uncaught React errors, or conceals product titles, prices, or inquiry CTA buttons.
- When the user switches swatches, `ImageFrame` automatically resets its error state to give the newly chosen image a fresh attempt.
