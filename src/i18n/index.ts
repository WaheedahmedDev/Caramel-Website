import { ar, Translations } from './ar';
import { en } from './en';
import { LocalizedString } from '../types/product';

export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export const STORAGE_LANG_KEY = 'caramel_lang';
export const STORAGE_THEME_KEY = 'caramel_theme';

export const dictionaries: Record<Language, Translations> = {
  ar,
  en,
};

export function isValidLanguage(val: unknown): val is Language {
  return val === 'ar' || val === 'en';
}

export function isValidTheme(val: unknown): val is Theme {
  return val === 'dark' || val === 'light';
}

export function getTranslation(lang: Language): Translations {
  return dictionaries[lang] || dictionaries.ar;
}

export function resolveLocalized(localized: LocalizedString | undefined, lang: Language): string {
  if (!localized) return '';
  return localized[lang] || localized.ar || localized.en || '';
}

/**
 * Formats a numeric price into localized Egyptian Pounds format.
 * In Arabic: '٢,٤٥٠ ج.م'
 * In English: '2,450 EGP'
 */
export function formatPrice(amount: number, lang: Language): string {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return '';
  const formattedNumber = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-EG', {
    maximumFractionDigits: 0,
  }).format(amount);

  return lang === 'ar' ? `${formattedNumber} ج.م` : `${formattedNumber} EGP`;
}

/**
 * Calculates and formats a discount percentage.
 * Returns null if originalPrice is not strictly greater than currentPrice.
 */
export function calculateDiscount(originalPrice?: number, currentPrice?: number): number | null {
  if (
    typeof originalPrice !== 'number' ||
    typeof currentPrice !== 'number' ||
    isNaN(originalPrice) ||
    isNaN(currentPrice) ||
    originalPrice <= currentPrice ||
    originalPrice <= 0
  ) {
    return null;
  }
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
