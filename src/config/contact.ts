import { ContactConfig } from '../types/config';

/**
 * Centralized Contact and Catalogue Mode Configuration
 *
 * NOTE: Unconfigured destinations must remain empty/undefined.
 * The application intentionally hides or disables buttons for unconfigured destinations
 * rather than routing visitors to fake placeholder URLs.
 */
export const contactConfig: ContactConfig = {
  catalogMode: 'demo', // 'demo' | 'production'
  whatsappNumber: '201095203967', // Verified phone digits for wa.me direct inquiries
  whatsappDirectUrl: undefined,
  whatsappChannelUrl: 'https://whatsapp.com/channel/0029VbBsrrB7oQhfGT7zsH0R',
  instagramUrl: 'https://www.instagram.com/caramel20261?rpxt=bmh0cmF5MmlpcWQ2',
  tiktokUrl: 'https://www.tiktok.com/@caramel2226?_r=1&_t=ZS-9AZcTM4qbsv',
  facebookUrl: undefined, // Boutique Facebook page (set when provided by brand)
  developerFacebookUrl: 'https://www.facebook.com/share/1dBWectEMA/',
};
