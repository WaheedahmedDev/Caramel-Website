import { Product, ProductVariant } from '../types/product';
import { formatEGPPrice } from './catalog';

export interface InquiryParams {
  product: Product;
  selectedVariant?: ProductVariant | null;
  lang: 'ar' | 'en';
}

/**
 * Filters and returns only explicitly configured variants that have a valid, non-empty primaryImage.
 * Prevents broken or incomplete variant records from appearing as selectable colors.
 */
export function getValidProductVariants(product: Product): ProductVariant[] {
  if (!product.variants || !Array.isArray(product.variants)) {
    return [];
  }
  return product.variants.filter(
    (v): v is ProductVariant =>
      Boolean(v && v.id && typeof v.primaryImage === 'string' && v.primaryImage.trim() !== '')
  );
}

/**
 * Determines if a hex color is perceptually dark, used to calculate high-contrast swatch indicators.
 */
export function isDarkColor(hex?: string): boolean {
  if (!hex || !hex.startsWith('#')) return true;
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6 && cleanHex.length !== 3) return true;
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map((char) => char + char).join('')
    : cleanHex;
  const rgb = parseInt(fullHex, 16);
  if (isNaN(rgb)) return true;
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  // Standard perceived brightness formula
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma < 150;
}

/**
 * Builds an authentic, natural, localized product inquiry message.
 * STRICT INVARIANT: The selected color is included only when a genuine variant is active.
 */
export function buildProductInquiryMessage({
  product,
  selectedVariant,
  lang,
}: InquiryParams): string {
  const productName = lang === 'ar' ? product.name.ar : product.name.en;
  const priceFormatted = formatEGPPrice(product.price, lang);

  if (lang === 'ar') {
    let msg = `مرحباً كاراميل، أود الاستفسار عن توفر القطعة التالية من المعرض:\n• القطعة: ${productName}`;
    if (selectedVariant) {
      msg += `\n• اللون المختار: ${selectedVariant.colorName.ar}`;
    }
    msg += `\n• السعر: ${priceFormatted}`;
    if (product.isDemo) {
      msg += `\n(نموذج تجريبي للمعاينة)`;
    }
    return msg;
  }

  let msg = `Hello Caramel, I would like to inquire about the following piece from the showroom:\n• Piece: ${productName}`;
  if (selectedVariant) {
    msg += `\n• Selected Color: ${selectedVariant.colorName.en}`;
  }
  msg += `\n• Price: ${priceFormatted}`;
  if (product.isDemo) {
    msg += `\n(Sample preview piece)`;
  }
  return msg;
}

/**
 * Generates an inquiry destination URL for a specific product.
 * - If directUrlOverride is provided: returns `${directUrlOverride}?text=${encodeURIComponent(msg)}`
 * - If whatsappNumber is configured: returns `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`
 * - If neither is configured: returns null.
 *
 * STRICT INVARIANT: If contact is not configured, NEVER return a fake/placeholder number!
 */
export function getProductInquiryUrl(
  params: InquiryParams,
  whatsappNumber?: string,
  directUrlOverride?: string
): string | null {
  const message = buildProductInquiryMessage(params);

  if (directUrlOverride && typeof directUrlOverride === 'string' && directUrlOverride.trim() !== '') {
    const separator = directUrlOverride.includes('?') ? '&' : '?';
    return `${directUrlOverride.trim()}${separator}text=${encodeURIComponent(message)}`;
  }

  if (!whatsappNumber || typeof whatsappNumber !== 'string' || whatsappNumber.trim() === '') {
    return null;
  }
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  if (!cleanNumber) {
    return null;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a polite, general inquiry greeting message when no specific product is active.
 */
export function buildGeneralInquiryMessage(lang: 'ar' | 'en'): string {
  if (lang === 'ar') {
    return 'مرحباً كاراميل، أود الاستفسار عن المجموعات المتاحة وخدمة الطلب المباشر من المعرض.';
  }
  return 'Hello Caramel, I would like to inquire about your current collections and direct showroom concierge service.';
}

/**
 * Generates a general WhatsApp conversation destination URL.
 * - If neither directUrlOverride nor whatsappNumber is configured: returns null.
 */
export function getGeneralWhatsAppUrl(
  whatsappNumber?: string,
  directUrlOverride?: string,
  lang: 'ar' | 'en' = 'ar'
): string | null {
  const message = buildGeneralInquiryMessage(lang);

  if (directUrlOverride && typeof directUrlOverride === 'string' && directUrlOverride.trim() !== '') {
    const separator = directUrlOverride.includes('?') ? '&' : '?';
    return `${directUrlOverride.trim()}${separator}text=${encodeURIComponent(message)}`;
  }

  if (!whatsappNumber || typeof whatsappNumber !== 'string' || whatsappNumber.trim() === '') {
    return null;
  }
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  if (!cleanNumber) {
    return null;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

