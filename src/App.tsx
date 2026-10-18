import React, { useState } from 'react';
import { contactConfig } from './config/contact';
import { usePreferences } from './context/PreferencesContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EditorialStory } from './components/EditorialStory';
import { ProductCollection } from './components/ProductCollection';
import { ProductDetailsModal } from './components/ProductDetails';
import { ReviewGallery } from './components/Reviews';
import { ContactSection, FloatingWhatsApp, ActiveInquiryState } from './components/Contact';
import { Footer } from './components/Footer';
import { products } from './data/products';
import { customerReviews } from './data/reviews';
import { Product } from './types/product';
import { getProductInquiryUrl } from './utils/inquiry';
import { LivingFashionBackground } from './components/Background';
import { useScrollReveal } from './hooks/useScrollReveal';
import './styles/global.css';

export const App: React.FC = () => {
  useScrollReveal();
  const { t, lang } = usePreferences();
  const [activeCategory, setActiveCategory] = useState<'all' | 'handbags' | 'apparel' | 'accessories'>('all');
  const [selectedProductData, setSelectedProductData] = useState<{
    product: Product;
    initialVariantId?: string | null;
  } | null>(null);
  const [activeInquiry, setActiveInquiry] = useState<ActiveInquiryState | null>(null);

  const activeInquiryUrl = activeInquiry
    ? getProductInquiryUrl(
        {
          product: activeInquiry.product,
          selectedVariant: activeInquiry.selectedVariant,
          lang,
        },
        contactConfig.whatsappNumber,
        contactConfig.whatsappDirectUrl
      )
    : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* 0. Calm, Elegant Ambient Background */}
      <LivingFashionBackground />

      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only"
        style={{
          position: 'absolute',
          top: 'var(--space-xs)',
          insetInlineStart: 'var(--space-xs)',
          zIndex: 100,
          padding: 'var(--space-xs) var(--space-md)',
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-on-accent)',
          borderRadius: 'var(--radius-xs)',
          fontWeight: 600,
        }}
      >
        {t.nav.skipToContent}
      </a>

      {/* 1. Responsive Header Navigation with Sticky Glassmorphic Bar */}
      <Header onSelectCategory={(cat) => setActiveCategory(cat)} />

      {/* 2. Main Content Flow */}
      <main id="main-content" style={{ flex: 1 }}>
        {/* Campaign Hero */}
        <HeroSection />

        {/* Dynamic Data-Driven Product Collection & Synchronized Variants */}
        <ProductCollection
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onInspectProduct={(prod, initialVariantId) =>
            setSelectedProductData({ product: prod, initialVariantId })
          }
          onInquireProduct={(prod, selectedVariant) => {
            setActiveInquiry({ product: prod, selectedVariant });
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Editorial Craftsmanship Showcase & Brand Philosophy */}
        <EditorialStory onSelectCategory={(cat) => setActiveCategory(cat)} />

        {/* Customer Reviews Section (Data-Driven with Platform Filters & Lightbox) */}
        <div style={{ borderBottom: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-primary)', position: 'relative', zIndex: 1 }}>
          <ReviewGallery reviews={customerReviews} />
        </div>

        {/* 5. Contact & Concierge Inquiry Section */}
        <ContactSection
          contactConfig={contactConfig}
          activeInquiry={activeInquiry}
          onClearInquiry={() => setActiveInquiry(null)}
        />
      </main>

      {/* 6. Persistent Floating WhatsApp Button (Fixed Bottom-Left) */}
      <FloatingWhatsApp
        contactConfig={contactConfig}
        activeInquiryUrl={activeInquiryUrl}
      />

      {/* 7. Refined Luxury Footer */}
      <Footer />

      {/* 8. 2D Product Detail Inspection Modal & Synchronized Variants */}
      <ProductDetailsModal
        product={selectedProductData?.product || null}
        initialVariantId={selectedProductData?.initialVariantId || null}
        isOpen={selectedProductData !== null}
        onClose={() => setSelectedProductData(null)}
        onInquire={(prod, selectedVariant) => {
          setActiveInquiry({ product: prod, selectedVariant });
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
};
