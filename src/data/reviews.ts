import type { CustomerReview, ReviewPlatform } from '../types/review';

/**
 * Central Repository of Customer-Review Conversation Screenshots.
 *
 * HOW TO REPLACE DEMO CONTENT WITH AUTHENTIC SCREENSHOTS:
 * 1. Place genuine customer conversation screenshots into `public/images/reviews/`
 *    (e.g., `public/images/reviews/wa-review-01.webp` or `insta-chat-01.png`).
 * 2. Replace the demo items below with your genuine records.
 * 3. Set `isDemo: false` and `verified: true`.
 * 4. Your authentic screenshots will immediately appear in the gallery and lightbox!
 */
export const customerReviews: CustomerReview[] = [
  {
    id: 'demo-conversation-01',
    platform: 'whatsapp',
    screenshotImage: '/images/demo-reviews/chat-whatsapp-01.svg',
    altText: {
      ar: 'معاينة تجريبية لمحادثة واتساب لتأكيد استلام حقيبة Caramel Leather Tote',
      en: 'Demo preview of a WhatsApp conversation confirming delivery of the Caramel Tote',
    },
    clientIdentifier: {
      ar: 'عميلة واتساب — (معاينة تجريبية)',
      en: 'WhatsApp Client — (Demo Preview)',
    },
    receivedDate: '2026',
    caption: {
      ar: 'تأكيد استلام حقيبة اليد — "الخامة والتقفيل راقي جداً والتغليف ممتاز"',
      en: 'Handbag delivery feedback — "Exceptional craftsmanship and pristine packaging"',
    },
    aspectRatio: '9/16',
    verified: true,
    isDemo: true,
  },
  {
    id: 'demo-conversation-02',
    platform: 'instagram',
    screenshotImage: '/images/demo-reviews/chat-instagram-01.svg',
    altText: {
      ar: 'معاينة تجريبية لرسالة انستقرام خاصة بتنسيق حقيبة Seline Crescent',
      en: 'Demo preview of an Instagram direct message on styling the Seline Crescent bag',
    },
    clientIdentifier: {
      ar: 'عميلة إنستغرام — (معاينة تجريبية)',
      en: 'Instagram Client — (Demo Preview)',
    },
    receivedDate: '2026',
    caption: {
      ar: 'رسالة خاصة عبر إنستغرام — "الشنطة على الطبيعة فخمة جداً وجودة الجلد مبهرة"',
      en: 'Direct Message — "The bag in person exceeded all expectations, the leather texture is divine"',
    },
    aspectRatio: '9/16',
    verified: true,
    isDemo: true,
  },
  {
    id: 'demo-conversation-03',
    platform: 'whatsapp',
    screenshotImage: '/images/demo-reviews/chat-whatsapp-02.svg',
    altText: {
      ar: 'معاينة تجريبية لمحادثة تنسيق مقاس بليزر الصوف والحرير العاجي Sovereign',
      en: 'Demo preview of a bespoke sizing consultation for the ivory wool-silk blazer',
    },
    clientIdentifier: {
      ar: 'عميلة استشارة مقاسات — (معاينة تجريبية)',
      en: 'Private Styling Client — (Demo Preview)',
    },
    receivedDate: '2026',
    caption: {
      ar: 'استشارة تنسيق مقاس أزياء — "المقاس مضبوط بالملي وخامة البليزر راقية جداً"',
      en: 'Apparel sizing consultation — "The tailored fit is immaculate and fabric is exquisite"',
    },
    aspectRatio: '9/16',
    verified: true,
    isDemo: true,
  },
  {
    id: 'demo-conversation-04',
    platform: 'facebook',
    screenshotImage: '/images/demo-reviews/chat-facebook-01.svg',
    altText: {
      ar: 'معاينة تجريبية لرسالة صفحة فيسبوك واستفسار عن فستان الساتان المطوي Elysian',
      en: 'Demo preview of a Facebook page inquiry for the pleated silk midi dress',
    },
    clientIdentifier: {
      ar: 'عميلة فيسبوك — (معاينة تجريبية)',
      en: 'Facebook Client — (Demo Preview)',
    },
    receivedDate: '2026',
    caption: {
      ar: 'استفسار مناسبة خاصة — "ذوقكم راقي وتعامل خدمة العملاء في غاية الاحترافية"',
      en: 'Special occasion inquiry — "Exquisite taste and remarkably professional customer service"',
    },
    aspectRatio: '9/16',
    verified: true,
    isDemo: true,
  },
];

/**
 * Filters the review collection by platform source.
 */
export function filterReviewsByPlatform(
  reviews: CustomerReview[],
  platform: ReviewPlatform
): CustomerReview[] {
  if (platform === 'all') {
    return reviews;
  }
  return reviews.filter((r) => r.platform === platform);
}

/**
 * Calculates live screenshot item counts per platform.
 */
export function getReviewPlatformCounts(
  reviews: CustomerReview[]
): Record<ReviewPlatform, number> {
  const counts: Record<ReviewPlatform, number> = {
    all: reviews.length,
    whatsapp: 0,
    facebook: 0,
    instagram: 0,
    tiktok: 0,
  };

  reviews.forEach((review) => {
    if (review.platform in counts) {
      counts[review.platform]++;
    }
  });

  return counts;
}
