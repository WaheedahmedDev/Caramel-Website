import { Product, ProductCategory } from '../types/product';
import { CatalogMode } from '../types/config';

/**
 * Filters the catalogue based on the active catalogue mode.
 * - In 'production' mode, products marked with `isDemo: true` are strictly excluded.
 * - In 'demo' mode, all products are included.
 */
export function getActiveProducts(products: Product[], mode: CatalogMode): Product[] {
  if (mode === 'production') {
    return products.filter((p) => !p.isDemo);
  }
  return products;
}

/**
 * Checks if any currently active product is a demo/sample record.
 * Used to determine if the bilingual demo preview notice must be displayed.
 */
export function hasActiveDemoProducts(products: Product[], mode: CatalogMode): boolean {
  const active = getActiveProducts(products, mode);
  return active.some((p) => p.isDemo === true);
}

/**
 * Filters an array of products by category slug.
 * 'all' returns all provided products without filtering.
 */
export function filterProductsByCategory(products: Product[], category: ProductCategory): Product[] {
  if (category === 'all') {
    return products;
  }
  return products.filter((p) => p.category === category);
}

/**
 * Finds a product by its stable unique ID slug.
 */
export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export interface DiscountInfo {
  hasDiscount: boolean;
  percentage: number;
  savings: number;
}

/**
 * Calculates a genuine price discount.
 * STRICT INVARIANT: A discount is ONLY valid if originalPrice is strictly greater than current price
 * and both values are positive, finite numbers.
 */
export function calculateDiscount(price: number, originalPrice?: number): DiscountInfo {
  if (
    originalPrice === undefined ||
    isNaN(originalPrice) ||
    !isFinite(originalPrice) ||
    isNaN(price) ||
    !isFinite(price) ||
    price <= 0 ||
    originalPrice <= price
  ) {
    return {
      hasDiscount: false,
      percentage: 0,
      savings: 0,
    };
  }

  const savings = originalPrice - price;
  const percentage = Math.round((savings / originalPrice) * 100);

  return {
    hasDiscount: true,
    percentage,
    savings,
  };
}

/**
 * Formats a numeric price into an authentic, localized Egyptian Pounds display string.
 */
export function formatEGPPrice(price: number, locale: 'ar' | 'en'): string {
  if (typeof price !== 'number' || isNaN(price) || !isFinite(price)) {
    return locale === 'ar' ? 'السعر عند الطلب' : 'Price on Request';
  }

  const formattedNum = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
    maximumFractionDigits: 0,
  }).format(price);

  if (locale === 'ar') {
    return `${formattedNum} ج.م`;
  }
  return `EGP ${formattedNum}`;
}

export {
  buildProductInquiryMessage,
  getProductInquiryUrl,
  getValidProductVariants,
  isDarkColor,
} from './inquiry';
export type { InquiryParams } from './inquiry';

