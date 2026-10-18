import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, ZoomIn, MessageCircle, ShieldCheck, Tag, Check } from 'lucide-react';
import { Product, ProductVariant } from '../../types/product';
import { contactConfig } from '../../config/contact';
import { usePreferences } from '../../context/PreferencesContext';
import {
  calculateDiscount,
  formatEGPPrice,
  getValidProductVariants,
  getProductInquiryUrl,
  isDarkColor,
} from '../../utils/catalog';
import { ImageFrame, Badge, Button } from '../common';
import { Lightbox } from './Lightbox';

export interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  initialVariantId?: string | null;
  onInquire?: (product: Product, selectedVariant?: ProductVariant | null) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  initialVariantId = null,
  onInquire,
}) => {
  const { lang, t, resolveText } = usePreferences();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // 1. Explicitly configured valid variants
  const validVariants = useMemo(() => {
    if (!product) return [];
    return getValidProductVariants(product);
  }, [product]);

  const hasVariants = validVariants.length > 0;
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  // Initialize or reset selectedVariantId whenever product or initialVariantId changes
  useEffect(() => {
    if (product && hasVariants) {
      const match = initialVariantId
        ? validVariants.find((v) => v.id === initialVariantId)
        : null;
      setSelectedVariantId(match ? match.id : validVariants[0].id);
    } else {
      setSelectedVariantId(null);
    }
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
  }, [product, hasVariants, validVariants, initialVariantId]);

  const selectedVariant = useMemo(() => {
    if (!product || !hasVariants) return null;
    return validVariants.find((v) => v.id === selectedVariantId) || validVariants[0];
  }, [product, hasVariants, validVariants, selectedVariantId]);

  // 2. Active Image Set (Pure 2D Still Photography, strictly isolated by variant)
  const imageList = useMemo(() => {
    if (!product) return [];

    // When variants exist, rebuild image list strictly from the active variant's assets
    if (hasVariants && selectedVariant) {
      const list: string[] = [];
      if (selectedVariant.primaryImage) {
        list.push(selectedVariant.primaryImage);
      }
      if (selectedVariant.galleryImages && Array.isArray(selectedVariant.galleryImages)) {
        selectedVariant.galleryImages.forEach((img) => {
          if (img && !list.includes(img)) {
            list.push(img);
          }
        });
      }
      return list.filter(Boolean);
    }

    // For single-edition products without variants
    const list: string[] = [];
    if (product.primaryImage) {
      list.push(product.primaryImage);
    }
    if (product.alternateImages && Array.isArray(product.alternateImages)) {
      product.alternateImages.forEach((img) => {
        if (img && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    return list.filter(Boolean);
  }, [product, hasVariants, selectedVariant]);

  // 3. Active Image Index & Lightbox
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const safeImageIndex = Math.max(0, Math.min(activeImageIndex, imageList.length - 1));
  const currentPhoto = imageList[safeImageIndex] || selectedVariant?.primaryImage || product?.primaryImage || '';

  // 4. Keyboard Navigation & Focus Management
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus on close
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      // If lightbox is open, it handles its own Escape
      if (isLightboxOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        // Trap focus inside modal
        if (!modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousActiveElement.current?.focus();
    };
  }, [isOpen, isLightboxOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  const localizedName = resolveText(product.name);
  const localizedDescription = product.description ? resolveText(product.description) : null;
  const localizedColorName = selectedVariant ? resolveText(selectedVariant.colorName) : null;
  const discount = calculateDiscount(product.price, product.originalPrice);

  // Destination WhatsApp URL (if configured)
  const inquiryUrl = getProductInquiryUrl(
    { product, selectedVariant, lang },
    contactConfig.whatsappNumber
  );

  const handleInquireAction = () => {
    if (onInquire) {
      onInquire(product, selectedVariant);
    }
    onClose();
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        className="modal-backdrop animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div ref={modalRef} className="modal-container">
          {/* Visible Close Button */}
          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close-btn touch-target"
            onClick={onClose}
            aria-label={t.gallery.close}
            title={t.gallery.close}
          >
            <X size={20} />
          </button>

          <div className="product-detail-layout">
            {/* LEFT COLUMN: 2D Image Showcase & Thumbnails */}
            <div className="gallery-showcase-container">
              {/* Main Image Frame (Clicking opens Lightbox) */}
              <div
                className="gallery-main-frame"
                onClick={() => setIsLightboxOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsLightboxOpen(true);
                  }
                }}
                aria-label={`${t.gallery.zoom}: ${localizedName}`}
              >
                <ImageFrame
                  src={currentPhoto}
                  alt={localizedName}
                  aspectRatio="var(--aspect-product)"
                  objectFit="contain"
                  objectPosition={product.objectPosition || 'center center'}
                  priority
                  fallbackText={t.gallery.imageError}
                />

                {/* Badges on Main Image */}
                <div
                  style={{
                    position: 'absolute',
                    top: 'var(--space-sm)',
                    insetInlineStart: 'var(--space-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2xs)',
                    zIndex: 2,
                  }}
                >
                  {discount.hasDiscount && (
                    <Badge variant="discount">
                      -{discount.percentage}% {t.collection.off}
                    </Badge>
                  )}
                </div>

                {/* Zoom Trigger Badge */}
                <div className="gallery-zoom-badge">
                  <ZoomIn size={14} />
                  <span>{t.gallery.zoom}</span>
                  {imageList.length > 1 && (
                    <span style={{ opacity: 0.7 }}>
                      • {safeImageIndex + 1}/{imageList.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails Row (ONLY rendered when multiple real photos exist for this variant) */}
              {imageList.length > 1 && (
                <div
                  role="tablist"
                  aria-label={t.gallery.title}
                  className="gallery-thumbnail-strip"
                >
                  {imageList.map((imgSrc, idx) => {
                    const isSelected = idx === safeImageIndex;
                    const label = t.gallery.imageCounter
                      .replace('{current}', String(idx + 1))
                      .replace('{total}', String(imageList.length));

                    return (
                      <button
                        key={`${imgSrc}-${idx}`}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={label}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`gallery-thumbnail-btn touch-target ${
                          isSelected ? 'active' : ''
                        }`}
                      >
                        <img
                          src={imgSrc}
                          alt={`${localizedName} — ${label}`}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Editorial Story, Pricing, Variants & Inquiry CTA */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-md)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {/* Category & Featured Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--tracking-widest)',
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {t.collection[product.category] || product.category}
                  </span>

                  {product.featured && (
                    <Badge variant="neutral" icon={<Tag size={10} />}>
                      {t.collection.featured}
                    </Badge>
                  )}
                </div>

                {/* Product Title */}
                <h2
                  id="product-modal-title"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    lineHeight: 'var(--leading-tight)',
                    margin: 0,
                  }}
                >
                  {localizedName}
                </h2>

                {/* Pricing & Savings */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-sm)',
                    flexWrap: 'wrap',
                    paddingBlock: 'var(--space-xs)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {formatEGPPrice(product.price, lang)}
                  </span>

                  {discount.hasDiscount && product.originalPrice && (
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-tertiary)',
                        textDecoration: 'line-through',
                      }}
                    >
                      {formatEGPPrice(product.originalPrice, lang)}
                    </span>
                  )}
                </div>

                {/* Explicit Color Variant Selector (If configured) */}
                {hasVariants && (
                  <div
                    style={{
                      paddingBlock: 'var(--space-xs)',
                      borderTop: '1px solid var(--color-border-subtle)',
                      borderBottom: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-xs)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3xs)',
                      }}
                    >
                      <span>{t.collection.availableColors}:</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>
                        {localizedColorName}
                      </span>
                    </div>

                    <div
                      role="radiogroup"
                      aria-label={`${t.collection.availableColors} - ${localizedName}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexWrap: 'wrap',
                        marginInline: '-8px',
                      }}
                    >
                      {validVariants.map((variant) => {
                        const isSelected = variant.id === selectedVariantId;
                        const variantColorName = resolveText(variant.colorName);
                        const checkColor = isDarkColor(variant.swatchColor) ? '#FFFFFF' : '#1C1917';

                        return (
                          <button
                            key={variant.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            aria-label={`${variantColorName} - ${
                              isSelected ? t.collection.selectedColor : t.collection.selectColor
                            }`}
                            onClick={() => {
                              setSelectedVariantId(variant.id);
                              setActiveImageIndex(0); // Atomically reset gallery to the new variant's primary image
                            }}
                            style={{
                              width: '44px',
                              height: '44px',
                              minWidth: '44px',
                              minHeight: '44px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: 0,
                            }}
                            title={variantColorName}
                          >
                            <span
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: 'var(--radius-pill)',
                                backgroundColor: variant.swatchColor || '#888888',
                                border: isSelected
                                  ? '2px solid var(--color-accent)'
                                  : '1px solid var(--color-border-strong)',
                                outline: isSelected ? '2px solid var(--color-accent)' : 'none',
                                outlineOffset: '2px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: checkColor,
                                transition: 'all var(--transition-fast)',
                              }}
                            >
                              {isSelected && <Check size={14} strokeWidth={3} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Editorial Description (Never invented) */}
                {localizedDescription && (
                  <div style={{ marginTop: 'var(--space-xs)' }}>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                        margin: 0,
                      }}
                    >
                      {localizedDescription}
                    </p>
                  </div>
                )}

                {/* Craftsmanship & Authenticity Assurance */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                    padding: 'var(--space-xs) var(--space-sm)',
                    backgroundColor: 'var(--color-bg-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--space-xs)',
                  }}
                >
                  <ShieldCheck size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <span>
                    {lang === 'ar'
                      ? 'تصميم راقٍ ومطابق للمواصفات الحقيقية — استفسري مباشرة للحجز أو التحقق من التوافر.'
                      : 'Authentic 2D fashion inspection — inquire directly with concierge for availability & private reservation.'}
                  </span>
                </div>
              </div>

              {/* Inquiry Action Button */}
              <div
                style={{
                  paddingTop: 'var(--space-md)',
                  borderTop: '1px solid var(--color-border-subtle)',
                }}
              >
                {inquiryUrl ? (
                  <Button
                    variant="primary"
                    size="md"
                    as="a"
                    href={inquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onClose()}
                    style={{ width: '100%' }}
                    icon={<MessageCircle size={18} />}
                  >
                    {t.collection.contactToOrder}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleInquireAction}
                    style={{ width: '100%' }}
                    icon={<MessageCircle size={18} />}
                  >
                    {t.collection.contactToOrder}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Full-Resolution 2D Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={imageList}
        currentIndex={safeImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(idx) => setActiveImageIndex(idx)}
        productName={localizedName}
      />
    </>
  );
};
