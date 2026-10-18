export type LocalizedString = {
  ar: string;
  en: string;
};

export type ProductCategory = 'all' | 'handbags' | 'apparel' | 'accessories';

export interface ProductVariant {
  /** Stable unique identifier within the product (e.g. 'caramel-tote-noir') */
  id: string;
  /** Bilingual color name displayed to customer */
  colorName: LocalizedString;
  /** Optional visual hex/css swatch preview (e.g. '#1A1817' or '#D4AF37') */
  swatchColor?: string;
  /** Optional swatch image asset path */
  swatchImage?: string;
  /** Exact primary photograph path displaying this specific color variant */
  primaryImage: string;
  /** Optional alternate view photographs for this specific variant */
  galleryImages?: string[];
  /** Optional owner-supplied availability note */
  availability?: LocalizedString;
}

export interface Product {
  /** Stable unique slug identifier (e.g. 'caramel-signature-tote') */
  id: string;
  /** Bilingual product title */
  name: LocalizedString;
  /** Optional bilingual editorial description */
  description?: LocalizedString;
  /** Product category slug */
  category: 'handbags' | 'apparel' | 'accessories';
  /** Numeric price in Egyptian Pounds (EGP). Must be non-negative. */
  price: number;
  /**
   * Optional original price in EGP.
   * STRICT REQUIREMENT: Must be strictly greater than `price` to represent a genuine discount.
   */
  originalPrice?: number;
  /** Main primary showcase image path */
  primaryImage: string;
  /** Optional alternate lifestyle or detail angles */
  alternateImages?: string[];
  /** Explicit color variants. Each variant must map to its genuine image set. */
  variants: ProductVariant[];
  /** Optional editorial featured badge flag */
  featured?: boolean;
  /** Optional owner-supplied availability status */
  availability?: LocalizedString;
  /** Optional CSS object-position for fine-tuned crop framing (e.g. 'center top') */
  objectPosition?: string;
  /**
   * Explicit demonstration record flag.
   * Demo items are excluded when catalogMode is 'production'.
   */
  isDemo?: boolean;
  /** Optional publication ISO timestamp for sorting */
  createdAt?: string;
}

export interface CatalogValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
