import { LocalizedString } from './product';

export type CatalogMode = 'demo' | 'production';

export interface BrandConfig {
  name: LocalizedString;
  tagline: LocalizedString;
  wordmark: string;
  subtitle?: LocalizedString;
}

export interface ContactConfig {
  /**
   * Active catalogue mode:
   * - 'demo': Displays demo items with visible bilingual sample preview notice.
   * - 'production': Strictly filters out all items marked `isDemo: true`.
   */
  catalogMode: CatalogMode;
  /**
   * Verified WhatsApp phone number (Digits only with country code, e.g. '201000000000').
   * Must remain undefined until verified by brand owner.
   */
  whatsappNumber?: string;
  /** Optional direct WhatsApp link override */
  whatsappDirectUrl?: string;
  /** Optional verified WhatsApp Channel URL */
  whatsappChannelUrl?: string;
  /** Optional verified Instagram showroom profile URL */
  instagramUrl?: string;
  /** Optional verified TikTok showroom profile URL */
  tiktokUrl?: string;
  /** Optional verified Facebook boutique page URL */
  facebookUrl?: string;
  /** Developer Facebook profile URL */
  developerFacebookUrl?: string;
}
