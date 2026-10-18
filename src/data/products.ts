import { Product } from '../types/product';

/**
 * Central Product Catalogue — Single Source of Truth
 *
 * All showroom products are rendered dynamically from this dataset.
 * Adding a valid record here automatically renders a card in the collection grid,
 * includes it in the corresponding category filter, and connects its color variants.
 *
 * Note: Demonstration records (`isDemo: true`) are displayed only when `catalogMode === 'demo'`.
 * When `catalogMode === 'production'`, all demo records are strictly filtered out.
 */
export const products: Product[] = [
  // ================= HANDBAGS (4 models, 5 genuine variant visuals) =================
  {
    id: 'caramel-signature-tote',
    name: {
      ar: 'حقيبة كراميل سيغنتشر الجلدية الهيكلية',
      en: 'Caramel Signature Structured Tote',
    },
    description: {
      ar: 'حقيبة أيقونية مصممة بحرفية عالية من الجلد الطبيعي المصقول، مزودة بمشبك قفل ذهبي مميز ومساحة داخلية فسيحة تلائم الإطلالات اليومية والمسائية الراقية.',
      en: 'An iconic structured tote handcrafted in fine calfskin with an exclusive gold-tone turnlock closure and a spacious architectural silhouette.',
    },
    category: 'handbags',
    price: 3850,
    originalPrice: 4500, // Valid discount (14% savings)
    primaryImage: '/images/demo-products/bag-signature-noir.jpg',
    alternateImages: [],
    variants: [
      {
        id: 'signature-tote-noir',
        colorName: {
          ar: 'أسود أوبسيديان',
          en: 'Obsidian Noir',
        },
        swatchColor: '#1A1817',
        primaryImage: '/images/demo-products/bag-signature-noir.jpg',
      },
      {
        id: 'signature-tote-caramel',
        colorName: {
          ar: 'كراميل كونياك',
          en: 'Caramel Cognac',
        },
        swatchColor: '#A76135',
        primaryImage: '/images/demo-products/bag-signature-caramel.jpg',
      },
    ],
    featured: true,
    objectPosition: 'center center',
    isDemo: true,
  },
  {
    id: 'caramel-crescent-shoulder',
    name: {
      ar: 'حقيبة سيلين الجلدية الهلالية بسلسلة ذهبية',
      en: 'Seline Crescent Shoulder Bag',
    },
    description: {
      ar: 'تصميم هلالي انسيابي باللون العاجي الناعم مع سلسلة كتف مجدولة ببريق الذهب العتيق، تمنح حضورًا عصريًا فائق الجاذبية.',
      en: 'Sculptural crescent silhouette in buttery cream leather paired with a chunky antique gold link shoulder chain.',
    },
    category: 'handbags',
    price: 3200,
    primaryImage: '/images/demo-products/bag-crescent-cream.jpg',
    variants: [],
    featured: true,
    objectPosition: 'center center',
    isDemo: true,
  },
  {
    id: 'caramel-atelier-crossbody',
    name: {
      ar: 'حقيبة كروس بودي ميني أتيلييه بلون العنابي',
      en: 'Atelier Mini Box Crossbody',
    },
    description: {
      ar: 'حقيبة ميني صندوقية أنيقة بلون العنابي الفاخر مع حزام جلدي قابل للتعديل وقفل معدني مصقول بتشطيب يدوي.',
      en: 'Refined structured mini box bag in deep burgundy wine leather featuring a hand-finished gold lock and adjustable crossbody strap.',
    },
    category: 'handbags',
    price: 2750,
    originalPrice: 3100, // Valid discount (11% savings)
    primaryImage: '/images/demo-products/bag-crossbody-burgundy.jpg',
    variants: [],
    featured: false,
    objectPosition: 'center center',
    isDemo: true,
  },
  {
    id: 'caramel-woven-clutch',
    name: {
      ar: 'كلاتش سولستيس الجلدي المنسوج يدويًا',
      en: 'Solstice Woven Leather Envelope Clutch',
    },
    description: {
      ar: 'كلاتش مغلف مصنوع بتقنية الضفائر الجلدية الإيطالية الدقيقة بلون الجمل الدافئ، يجمع بين البساطة والرقي المطلق.',
      en: 'Supple envelope clutch intricately handcrafted in rich camel tan intrecciato woven leather with a magnetic foldover flap.',
    },
    category: 'handbags',
    price: 2400,
    primaryImage: '/images/demo-products/bag-clutch-camel.jpg',
    variants: [],
    featured: false,
    objectPosition: 'center center',
    isDemo: true,
  },

  // ================= APPAREL (5 distinct women's fashion items) =================
  {
    id: 'caramel-tailored-blazer',
    name: {
      ar: 'بليزر سوفرين الصوف والحرير بقصة مفصلة',
      en: 'Sovereign Tailored Wool-Silk Blazer',
    },
    description: {
      ar: 'بليزر راقٍ بلون العاج الفاتح منسوج من مزيج الصوف الفاخر والحرير الطبيعي مع ياقة مدببة كلاسيكية وأزرار عاجية معتقة.',
      en: 'Impeccably tailored single-breasted blazer in ivory wool-silk crepe with structured peak lapels and sculpted horn buttons.',
    },
    category: 'apparel',
    price: 5600,
    originalPrice: 6400, // Valid discount (13% savings)
    primaryImage: '/images/demo-products/apparel-blazer-ivory.jpg',
    variants: [],
    featured: true,
    objectPosition: 'center top',
    isDemo: true,
  },
  {
    id: 'caramel-pleated-midi-dress',
    name: {
      ar: 'فستان ميدي إليسيان الحريري بكسرات دقيقة',
      en: 'Elysian Pleated Silk Midi Dress',
    },
    description: {
      ar: 'فستان ميدي أنثوي بلون البرونز الشامبانيا المضيء، يتميز بكسرات بليسيه متقنة وحزام خصر محدد يبرز الرشاقة.',
      en: 'Fluid pleated silk chiffon midi dress in shimmering champagne bronze, featuring micro-accordion pleating and a tailored waist belt.',
    },
    category: 'apparel',
    price: 4800,
    primaryImage: '/images/demo-products/apparel-dress-bronze.jpg',
    variants: [],
    featured: true,
    objectPosition: 'center top',
    isDemo: true,
  },
  {
    id: 'caramel-cashmere-knit-sweater',
    name: {
      ar: 'كنزة أورا المريحة من الكشمير الخالص',
      en: 'Aura Relaxed Pure Cashmere Knit',
    },
    description: {
      ar: 'كنزة كشمير فائقة النعومة باللون البيج الهادئ بقبة مستديرة وأكمام مريحة، تجسد فخامة الراحة اليومية المسترخية.',
      en: 'Luxuriously soft crewneck sweater spun from pure Grade-A Mongolian cashmere in serene oatmeal beige.',
    },
    category: 'apparel',
    price: 3600,
    primaryImage: '/images/demo-products/apparel-knit-oatmeal.jpg',
    variants: [],
    featured: false,
    objectPosition: 'center center',
    isDemo: true,
  },
  {
    id: 'caramel-satin-trench-coat',
    name: {
      ar: 'معطف ترنش ميراج الساتان الانسيابي الطويل',
      en: 'Mirage Draped Satin Long Trench Coat',
    },
    description: {
      ar: 'معطف ترنش درامي طويل من الساتان الحريري الثقيل بلون الإسبريسو البني الداكن مع طيات صدر عريضة وحزام خصر كلاسيكي.',
      en: 'Dramatic full-length trench coat rendered in heavyweight espresso bronze silk-satin with storm flaps and a statement horn buckle belt.',
    },
    category: 'apparel',
    price: 6200,
    originalPrice: 7500, // Valid discount (17% savings)
    primaryImage: '/images/demo-products/apparel-trench-espresso.jpg',
    variants: [],
    featured: true,
    objectPosition: 'center top',
    isDemo: true,
  },

  {
    id: 'caramel-wide-leg-trousers',
    name: {
      ar: 'بنطال بالاتين بقصة أرجل واسعة وخصر عالي',
      en: 'Palatine High-Waisted Wide-Leg Trousers',
    },
    description: {
      ar: 'بنطال نسائي كلاسيكي بلون الرمل العاجي بقصة أرجل واسعة مستقيمة وطيات أمامية حادة تمنح قوامًا ممشوقًا.',
      en: 'High-waisted tailored trousers in crisp sand wool crepe featuring razor-sharp front creases and a relaxed fluid leg.',
    },
    category: 'apparel',
    price: 2900,
    primaryImage: '/images/demo-products/apparel-trousers-sand.jpg',
    variants: [],
    featured: false,
    objectPosition: 'center center',
    isDemo: true,
  },
];