# Caramel Showroom — Product Addition & Catalogue Management Guide

This guide describes how the Caramel fashion showroom handles merchandise records and how to safely add, update, or replace products in the collection.

---

## 1. Architecture: The Single Source of Truth

The Caramel website is a static, data-driven fashion showroom. All showroom merchandise is centrally defined in:

```
src/data/products.ts
```

### The Extensibility Invariant
- **Zero JSX Markup Changes**: You never need to design a new card component, modify `ProductCard.tsx`, or edit `ProductCollection.tsx` to add a product.
- **Automatic Rendering**: When a valid product record is appended to the `products` array in `src/data/products.ts`, it automatically:
  1. Appears in the showroom grid.
  2. Participates in category filtering (`All`, `Handbags`, `Apparel`, `Accessories`) with updated live badge counts.
  3. Displays responsive 4:5 photographic frames with zoom overlay.
  4. Renders accessible color swatches (if variants are configured) with $\ge 44\text{px}$ touch targets.
  5. Opens the 2D inspection modal and full-resolution lightbox.
  6. Connects to the WhatsApp concierge inquiry generator with pre-formatted product details.

---

## 2. Directory Structure for Product Images

All product photographs deployed to the website must reside under the public assets directory:

```
public/
  images/
    products/
      <product-slug>/
        <color>-main.webp
        <color>-side.webp
        <color>-detail.webp
    demo-products/         # Preserved demonstration assets (do not delete)
```

- Store each product's assets in a dedicated subdirectory named after the product's unique slug (e.g. `public/images/products/heritage-leather-tote/`).
- Use WebP or high-quality JPEG format.
- Recommended resolution: **1200 × 1500 px** (standard 4:5 luxury fashion portrait ratio).

---

## 3. Step-by-Step: Adding a New Product Record

### Step 1: Copy Image Assets
Place your optimized photographs into `public/images/products/<product-slug>/`.

### Step 2: Open `src/data/products.ts`
Add a new typed `Product` object to the `products` array.

#### Example A: Product with Multiple Color Variants

```typescript
{
  id: 'heritage-leather-tote',
  name: {
    ar: 'حقيبة هيريتج الجلدية المجدولة',
    en: 'Heritage Woven Leather Tote',
  },
  description: {
    ar: 'حقيبة يد فاخرة مصنوعة يدوياً من الجلد الطبيعي المجدول مع لمسات معدنية مطلية بالذهب.',
    en: 'Handcrafted luxury tote in woven calfskin leather with polished gold-toned hardware.',
  },
  category: 'handbags',
  price: 3800,
  originalPrice: 4400, // Genuine discount: 14% OFF badge renders automatically
  primaryImage: '/images/products/heritage-leather-tote/noir-main.webp',
  alternateImages: [],
  variants: [
    {
      id: 'heritage-tote-noir',
      colorName: { ar: 'أسود فحمي', en: 'Noir Black' },
      swatchColor: '#1A1A1A',
      primaryImage: '/images/products/heritage-leather-tote/noir-main.webp',
      galleryImages: ['/images/products/heritage-leather-tote/noir-side.webp'],
    },
    {
      id: 'heritage-tote-cognac',
      colorName: { ar: 'بني كوجناك', en: 'Cognac Brown' },
      swatchColor: '#8B4513',
      primaryImage: '/images/products/heritage-leather-tote/cognac-main.webp',
      galleryImages: ['/images/products/heritage-leather-tote/cognac-side.webp'],
    },
  ],
  featured: true,
  isDemo: false, // Mark false for genuine showroom inventory
}
```

#### Example B: Single-Edition Piece (No Variants)

```typescript
{
  id: 'palatine-silk-blazer',
  name: {
    ar: 'سترة بالاتين من الحرير والكتان',
    en: 'Palatine Silk-Linen Tailored Blazer',
  },
  description: {
    ar: 'قصة كلاسيكية راقية منسوجة من مزيج الحرير والكتان الإيطالي الفاخر.',
    en: 'Double-breasted tailored blazer cut from Italian silk-linen blend.',
  },
  category: 'apparel',
  price: 4900,
  // No originalPrice = no fake discount displayed
  primaryImage: '/images/products/palatine-silk-blazer/cream-main.webp',
  alternateImages: ['/images/products/palatine-silk-blazer/cream-detail.webp'],
  variants: [], // Empty array = no fake color selectors rendered
  featured: false,
  isDemo: false,
}
```

---

## 4. Field Specification & Validation Rules

| Field | Type | Required | Invariant / Validation Rule |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique kebab-case slug (e.g. `'atelier-crossbody'`). Must not collide with any existing ID. |
| `name` | `{ ar: string; en: string }` | **Yes** | Both Arabic and English titles must be non-empty strings. |
| `description` | `{ ar?: string; en?: string }` | No | Optional editorial storytelling text. |
| `category` | `'handbags' \| 'apparel' \| 'accessories'` | **Yes** | Must match one of the three supported category slugs. |
| `price` | `number` | **Yes** | Positive numeric EGP price. Never hard-code currency symbols here (`Intl.NumberFormat` handles formatting). |
| `originalPrice` | `number` | No | **STRICT RULE:** Must be strictly greater than `price` (`originalPrice > price`). If equal to or lower than `price`, the discount calculation rejects it to prevent fake discounts. |
| `primaryImage` | `string` | **Yes** | Absolute public path starting with `/images/...`. The file must physically exist on disk. |
| `alternateImages` | `string[]` | No | Array of secondary lifestyle or angle images for single-edition pieces. |
| `variants` | `ProductVariant[]` | **Yes** | Explicit color variants. If the product has only 1 color, supply `[]`. Never fabricate synthetic variants. |
| `variants[].primaryImage` | `string` | **Yes** | Every variant MUST have its own genuine image file. Using CSS filters to recolor images is strictly prohibited. |
| `isDemo` | `boolean` | No | Set to `false` for genuine owner inventory. Set to `true` for demo/sample testing items. |

---

## 5. Transitioning from Demo to Production Mode

The website includes a catalogue mode switch in `src/config/contact.ts`:

```typescript
export const contactConfig = {
  catalogMode: 'demo', // 'demo' | 'production'
  ...
};
```

- **`'demo'` Mode (Default during initial setup)**:
  - Displays all products, including demo items marked with `isDemo: true`.
  - Displays the prominent bilingual demo preview notice banner at the top of the collection.
- **`'production'` Mode**:
  - Automatically excludes all records where `isDemo === true`.
  - Only genuine owner-supplied products (`isDemo: false`) are rendered.
  - Automatically hides the demo preview notice banner once the catalogue contains only real items.
  - **Prerequisite**: Only switch to `'production'` once real owner products and verified images are present.

---

## 6. Verification Checklist

Before deploying changes:
1. Run `npm run type-check` — confirms 0 TypeScript errors.
2. Run `node scratch/test-catalog-validation.mjs` — validates discount invariants, non-empty IDs, and category validity.
3. Run `npm run build` — confirms static compilation to `dist/`.
4. Preview on `http://localhost:5173/`:
   - Verify card displays in the correct category.
   - Verify clicking swatches switches photographs accurately with zero cross-color contamination.
   - Verify clicking "Inquire to Order" pre-fills the Concierge Inquiry Card with the correct name, color, and price.
