# Caramel Product Record Template & Guide

This document provides a clean, copy-paste template for adding products to the Caramel central product catalogue (`src/data/products.ts`).

---

## 1. Quick Copy-Paste Blank Template

Copy the block below and paste it inside the `products` array in [`src/data/products.ts`](file:///src/data/products.ts).

```typescript
  {
    id: 'product-slug-identifier', // Required: Unique kebab-case slug (e.g. 'caramel-signature-tote')
    name: {
      ar: 'اسم المنتج بالعربية', // Required: Arabic title
      en: 'Product Name in English', // Required: English title
    },
    description: {
      ar: 'وصف المنتج باللغة العربية بأسلوب راقٍ...', // Optional: Arabic description
      en: 'Editorial description in English...', // Optional: English description
    },
    category: 'handbags', // Required: 'handbags' | 'apparel' | 'accessories'
    price: 3200, // Required: Numeric price in Egyptian Pounds (EGP)
    // originalPrice: 3800, // Optional: Must be STRICTLY GREATER than price if specified
    primaryImage: '/images/products/product-slug/main.webp', // Required: Primary showcase photograph
    alternateImages: [
      // Optional: Alternate lifestyle or detail views
      '/images/products/product-slug/detail-1.webp',
      '/images/products/product-slug/lifestyle.webp',
    ],
    variants: [
      // Explicit color variants. If the product has multiple colors, configure each below:
      {
        id: 'product-slug-color-1', // Stable unique variant ID
        colorName: {
          ar: 'أسود فحمي', // Arabic color name
          en: 'Obsidian Noir', // English color name
        },
        swatchColor: '#1A1817', // Optional: CSS hex color for swatch preview
        primaryImage: '/images/products/product-slug/color-noir.webp', // Required: Exact photo of this color
        galleryImages: [
          // Optional: Additional photos for this specific color variant
          '/images/products/product-slug/color-noir-side.webp',
        ],
      },
    ],
    featured: false, // Optional: Set to true to highlight in editorial showcases
    objectPosition: 'center center', // Optional: CSS object-position for fine-tuned photo framing
    isDemo: false, // Set to true ONLY if this is a sample/placeholder record
  },
```

---

## 2. Realistic Complete Example: Handbag with 2 Color Variants

```typescript
  {
    id: 'caramel-savoy-leather-tote',
    name: {
      ar: 'حقيبة سافوي الجلدية الفاخرة',
      en: 'Savoy Fine Leather Tote',
    },
    description: {
      ar: 'حقيبة كلاسيكية مصنوعة يدويًا من أجود أنواع الجلود الطبيعية، تتميز بمساحة رحبة وتشطيبات معدنية ذهبية معتقة.',
      en: 'Handcrafted from supple full-grain leather, featuring a spacious interior and brushed vintage gold hardware.',
    },
    category: 'handbags',
    price: 4500,
    originalPrice: 5200, // Valid: 5200 > 4500 (13% savings)
    primaryImage: '/images/products/savoy-tote/noir-main.webp',
    alternateImages: [
      '/images/products/savoy-tote/editorial-lifestyle.webp',
    ],
    variants: [
      {
        id: 'savoy-noir',
        colorName: {
          ar: 'أسود كلاسيكي',
          en: 'Classic Noir',
        },
        swatchColor: '#1B1B1B',
        primaryImage: '/images/products/savoy-tote/noir-main.webp',
        galleryImages: [
          '/images/products/savoy-tote/noir-side.webp',
          '/images/products/savoy-tote/noir-interior.webp',
        ],
      },
      {
        id: 'savoy-caramel',
        colorName: {
          ar: 'كراميل دافئ',
          en: 'Warm Caramel',
        },
        swatchColor: '#C68B59',
        primaryImage: '/images/products/savoy-tote/caramel-main.webp',
        galleryImages: [
          '/images/products/savoy-tote/caramel-side.webp',
        ],
      },
    ],
    featured: true,
    objectPosition: 'center 40%',
    isDemo: false,
  },
```

---

## 3. Realistic Complete Example: Apparel (No Variants)

```typescript
  {
    id: 'caramel-atelier-silk-blazer',
    name: {
      ar: 'بليزر حريري بتطريز مشغل كراميل',
      en: 'Atelier Tailored Silk Blazer',
    },
    description: {
      ar: 'بليزر مصمم بقصة انسيابية من خيوط الحرير الإيطالي الفاخر مع بطانة ناعمة وياقة درامية أنيقة.',
      en: 'Impeccably tailored in pure Italian silk twill, with a structured shoulder and fluid silhouette.',
    },
    category: 'apparel',
    price: 5800,
    primaryImage: '/images/products/silk-blazer/main.webp',
    alternateImages: [
      '/images/products/silk-blazer/back-detail.webp',
      '/images/products/silk-blazer/cuff-detail.webp',
    ],
    variants: [], // Empty array when no separate color variants exist
    featured: true,
    objectPosition: 'center top',
    isDemo: false,
  },
```

---

## 4. Crucial Business Rules and Invariants

1. **Unique IDs (`id`)**: Every product ID must be globally unique across the catalogue. Every variant ID must be unique within its product.
2. **Strict Discount Rule**: `originalPrice` may ONLY be supplied if it is strictly greater than `price` (`originalPrice > price > 0`). If a product is not discounted, omit `originalPrice` entirely. The system rejects equal or smaller original prices to prevent deceptive discount badges.
3. **Genuine Color-to-Image Mapping**: Each variant MUST have its own legitimate `primaryImage`. Never use CSS filters or blend modes to fake color variants. If an image is not available for a color, do not add that color variant until photos exist.
4. **Asset Locations**:
   - Production images: Store in `public/images/products/<product-slug>/`.
   - Demo images: Store in `public/images/demo-products/`.
5. **Catalogue Mode (`catalogMode`)**:
   - When `contactConfig.catalogMode = 'production'`, any product with `isDemo: true` is strictly filtered out of the live website.
   - When `contactConfig.catalogMode = 'demo'`, demo products are shown alongside a visible bilingual sample preview notice.
