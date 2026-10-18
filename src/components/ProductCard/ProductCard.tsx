import React, { useState, useMemo } from 'react';
import { Eye, Check } from 'lucide-react';
import { Product, ProductVariant } from '../../types/product';
import { usePreferences } from '../../context/PreferencesContext';
import {
  calculateDiscount,
  formatEGPPrice,
  getValidProductVariants,
  isDarkColor,
} from '../../utils/catalog';
import { ImageFrame, Badge } from '../common';

export interface ProductCardProps {
  product: Product;
  index?: number;
  onInspect?: (product: Product, initialVariantId?: string | null) => void;
  onInquire?: (product: Product, selectedVariant?: ProductVariant | null) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  onInspect,
  className = '',
}) => {
  const { lang, t, resolveText } = usePreferences();

  // 1. Filter explicitly configured variants with valid primaryImage
  const validVariants = useMemo(() => getValidProductVariants(product), [product]);
  const hasVariants = validVariants.length > 0;

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    hasVariants ? validVariants[0].id : null
  );

  const selectedVariant = hasVariants
    ? validVariants.find((v) => v.id === selectedVariantId) || validVariants[0]
    : null;

  // Active display image: selected variant primaryImage or product primaryImage
  const currentImage = selectedVariant ? selectedVariant.primaryImage : product.primaryImage;

  // Strict discount calculation (only when genuine originalPrice > price exists)
  const discount = calculateDiscount(product.price, product.originalPrice);

  const localizedName = resolveText(product.name);

  return (
    <article
      className={`product-card reveal-on-scroll reveal-stagger-${(index % 4) + 1} ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* 1. Image Container with 4:5 Portrait Ratio & Hover Zoom */}
      <div
        className="product-card-image-wrap editorial-image-hover"
        style={{
          position: 'relative',
          overflow: 'hidden',
          cursor: onInspect ? 'pointer' : 'default',
          backgroundColor: 'var(--color-product-surface)',
          borderBottom: '1px solid rgba(213, 176, 120, 0.1)',
        }}
        onClick={() => onInspect?.(product, selectedVariantId)}
      >
        <ImageFrame
          src={currentImage}
          alt={localizedName}
          aspectRatio="var(--aspect-product)"
          objectFit="contain"
          objectPosition={product.objectPosition || 'center center'}
          fallbackText={localizedName}
        />

        {/* Genuine Discount Badge (Only when authentic discount exists) */}
        {discount.hasDiscount && (
          <div
            style={{
              position: 'absolute',
              top: 'var(--space-xs)',
              insetInlineStart: 'var(--space-xs)',
              zIndex: 2,
            }}
          >
            <Badge variant="discount">
              -{discount.percentage}% {t.collection.off}
            </Badge>
          </div>
        )}

        {/* Quick Inspection Action on Card Overlay with Hover Reveal */}
        {onInspect && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspect(product, selectedVariantId);
            }}
            className="touch-target product-card-quick-btn"
            aria-label={`${t.collection.inspectPiece}: ${localizedName}`}
            style={{
              position: 'absolute',
              bottom: 'var(--space-xs)',
              insetInlineEnd: 'var(--space-xs)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(28, 16, 10, 0.92)',
              color: 'var(--color-accent)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(213, 176, 120, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              zIndex: 3,
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Eye size={14} />
            <span style={{ fontSize: '11px', letterSpacing: '0.04em' }}>
              {t.collection.inspectPiece}
            </span>
          </button>
        )}
      </div>

      {/* 2. Product Meta & Details */}
      <div
        style={{
          padding: 'var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: 'var(--space-xs)',
        }}
      >
        {/* Title */}
        <h3
          onClick={() => onInspect?.(product, selectedVariantId)}
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--leading-snug)',
            margin: 0,
            cursor: onInspect ? 'pointer' : 'default',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
        >
          {localizedName}
        </h3>

        {/* Color Variant Selector (Rendered only when genuine variants exist) */}
        {hasVariants && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2xs)',
              marginTop: '2px',
            }}
          >
            <div
              role="radiogroup"
              aria-label={t.collection.availableColors}
              style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
              }}
            >
              {validVariants.map((variant) => {
                const isSelected = variant.id === selectedVariantId;
                const variantColorName = resolveText(variant.colorName);
                const isDark = isDarkColor(variant.swatchColor);
                const checkColor = isDark ? '#FFFFFF' : '#1C100A';

                return (
                  <button
                    key={variant.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`${t.collection.selectedColor} ${variantColorName}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariantId(variant.id);
                    }}
                    style={{
                      width: '28px',
                      height: '28px',
                      minWidth: '28px',
                      minHeight: '28px',
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
                        width: '20px',
                        height: '20px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: variant.swatchColor || '#888888',
                        border: isSelected
                          ? '2px solid var(--color-accent)'
                          : '1px solid rgba(213, 176, 120, 0.25)',
                        outline: isSelected ? '1px solid var(--color-accent)' : 'none',
                        outlineOffset: '2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: checkColor,
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {isSelected && <Check size={10} strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing Container */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 'var(--space-2xs)',
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--space-xs)',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: '1.0625rem',
              fontWeight: 700,
              color: 'var(--color-accent)',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            {formatEGPPrice(product.price, lang)}
          </span>

          {discount.hasDiscount && product.originalPrice && (
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-tertiary)',
                textDecoration: 'line-through',
              }}
            >
              {formatEGPPrice(product.originalPrice, lang)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
