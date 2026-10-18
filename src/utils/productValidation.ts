import { Product, ProductVariant, CatalogValidationResult } from '../types/product';

const VALID_CATEGORIES = ['handbags', 'apparel', 'accessories'] as const;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validates a single product record against the Caramel catalogue schema and business rules.
 */
export function validateProduct(product: unknown): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!product || typeof product !== 'object') {
    return { valid: false, errors: ['Product record must be a non-null object'], warnings: [] };
  }

  const p = product as Partial<Product>;

  // 1. Stable Unique ID / Slug validation
  if (!p.id || typeof p.id !== 'string' || p.id.trim() === '') {
    errors.push('Product missing required string property "id"');
  } else if (!SLUG_REGEX.test(p.id)) {
    warnings.push(`Product ID "${p.id}" should ideally be lowercase kebab-case (e.g., "caramel-leather-tote")`);
  }

  const productId = p.id || 'unknown';

  // 2. Bilingual Name validation
  if (!p.name || typeof p.name !== 'object') {
    errors.push(`Product "${productId}" missing required bilingual object "name"`);
  } else {
    if (!p.name.ar || typeof p.name.ar !== 'string' || p.name.ar.trim() === '') {
      errors.push(`Product "${productId}" missing Arabic name ("name.ar")`);
    }
    if (!p.name.en || typeof p.name.en !== 'string' || p.name.en.trim() === '') {
      errors.push(`Product "${productId}" missing English name ("name.en")`);
    }
  }

  // 3. Category validation
  if (!p.category || !VALID_CATEGORIES.includes(p.category as any)) {
    errors.push(`Product "${productId}" has invalid category "${p.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  // 4. Numeric Price validation
  if (typeof p.price !== 'number' || isNaN(p.price) || !isFinite(p.price) || p.price < 0) {
    errors.push(`Product "${productId}" has invalid price. Price must be a non-negative number.`);
  }

  // 5. Strict Discount / Original Price validation
  if (p.originalPrice !== undefined) {
    if (typeof p.originalPrice !== 'number' || isNaN(p.originalPrice) || !isFinite(p.originalPrice)) {
      errors.push(`Product "${productId}" has invalid originalPrice: must be a finite number`);
    } else if (p.price !== undefined && p.originalPrice <= p.price) {
      errors.push(
        `Product "${productId}" has invalid discount: originalPrice (${p.originalPrice}) must be strictly greater than current price (${p.price})`
      );
    }
  }

  // 6. Primary Image validation
  if (!p.primaryImage || typeof p.primaryImage !== 'string' || p.primaryImage.trim() === '') {
    errors.push(`Product "${productId}" missing required primaryImage path`);
  }

  // 7. Alternate Images validation
  if (p.alternateImages !== undefined) {
    if (!Array.isArray(p.alternateImages)) {
      errors.push(`Product "${productId}" alternateImages must be an array of image paths`);
    } else {
      p.alternateImages.forEach((img, idx) => {
        if (typeof img !== 'string' || img.trim() === '') {
          errors.push(`Product "${productId}" alternateImages[${idx}] is not a valid path string`);
        }
      });
    }
  }

  // 8. Variants validation
  if (!p.variants || !Array.isArray(p.variants)) {
    errors.push(`Product "${productId}" missing required array "variants"`);
  } else {
    const variantIds = new Set<string>();

    p.variants.forEach((v: Partial<ProductVariant>, vIdx: number) => {
      const vId = v.id || `variant-${vIdx}`;

      if (!v.id || typeof v.id !== 'string' || v.id.trim() === '') {
        errors.push(`Product "${productId}" variant at index ${vIdx} missing required string "id"`);
      } else if (variantIds.has(v.id)) {
        errors.push(`Product "${productId}" has duplicate variant id "${v.id}"`);
      } else {
        variantIds.add(v.id);
      }

      if (!v.colorName || typeof v.colorName !== 'object' || !v.colorName.ar || !v.colorName.en) {
        errors.push(`Product "${productId}" variant "${vId}" missing bilingual "colorName" with both ar and en`);
      }

      if (!v.primaryImage || typeof v.primaryImage !== 'string' || v.primaryImage.trim() === '') {
        errors.push(`Product "${productId}" variant "${vId}" missing required "primaryImage" path`);
      }

      if (v.galleryImages !== undefined && !Array.isArray(v.galleryImages)) {
        errors.push(`Product "${productId}" variant "${vId}" galleryImages must be an array of paths`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates an entire catalogue array, checking individual items as well as global uniqueness.
 */
export function validateCatalog(products: unknown): CatalogValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!Array.isArray(products)) {
    return {
      valid: false,
      errors: ['Catalogue must be an array of Product objects'],
      warnings: [],
    };
  }

  const seenIds = new Set<string>();

  products.forEach((prod, index) => {
    const res = validateProduct(prod);
    errors.push(...res.errors);
    warnings.push(...res.warnings);

    if (prod && typeof prod === 'object' && 'id' in prod && typeof (prod as any).id === 'string') {
      const id = (prod as any).id;
      if (seenIds.has(id)) {
        errors.push(`Duplicate product ID found in catalogue: "${id}" at index ${index}`);
      } else {
        seenIds.add(id);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
