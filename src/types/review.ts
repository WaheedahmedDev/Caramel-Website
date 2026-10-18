import { LocalizedString } from './product';

export type ReviewPlatform = 'all' | 'whatsapp' | 'instagram' | 'tiktok' | 'facebook';

export interface CustomerReview {
  /** Stable unique identifier (e.g. 'demo-chat-001') */
  id: string;
  /** Platform source of the screenshot or conversation */
  platform: 'whatsapp' | 'facebook' | 'instagram' | 'tiktok';
  /** Path to the authentic screenshot image or placeholder */
  screenshotImage: string;
  /** Optional accessible description of the screenshot contents */
  altText?: LocalizedString;
  /** Optional non-sensitive client identifier (e.g. 'Client via DM' or 'عميلة عبر الرسائل الخاصة') */
  clientIdentifier?: LocalizedString;
  /** Optional review or conversation date */
  receivedDate?: string;
  /** Optional customer review highlight / snippet in original wording */
  caption?: LocalizedString;
  /** Aspect ratio hint (e.g. '9/16' or '4/5' or '1/1') */
  aspectRatio?: string;
  /** Verified genuine badge flag */
  verified: boolean;
  /** Distinct demo indicator for illustrative preview cards */
  isDemo?: boolean;
}
