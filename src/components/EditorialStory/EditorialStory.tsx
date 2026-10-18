import React from 'react';
import { Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';

export interface EditorialStoryProps {
  onSelectCategory?: (category: 'all' | 'handbags' | 'apparel' | 'accessories') => void;
}

export const EditorialStory: React.FC<EditorialStoryProps> = () => {
  const { isRTL, t } = usePreferences();

  return (
    <section
      id="editorial-story"
      aria-label={t.editorial.title}
      style={{
        paddingBlock: 'var(--space-4xl)',
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: 'var(--color-bg-subtle)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container">
        {/* Editorial Phase 2: Oversized Craftsmanship Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-2xl)',
            alignItems: 'center',
            marginBottom: 'var(--space-4xl)',
          }}
          className="editorial-grid"
        >
          {/* Detailed Still-Life Photograph */}
          <div
            className="editorial-image-hover reveal-on-scroll reveal-scale"
            style={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: 'var(--shadow-card)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-product-surface)',
              aspectRatio: '4 / 3',
              position: 'relative',
            }}
          >
            <img
              src="/images/editorial-spotlight.jpg"
              alt={t.editorial.title}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 'var(--space-md)',
                insetInlineStart: 'var(--space-md)',
                backgroundColor: 'var(--color-bg-glass)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: 'var(--space-2xs) var(--space-sm)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border-subtle)',
                fontSize: 'var(--text-2xs)',
                fontWeight: 600,
                color: 'var(--color-accent)',
                letterSpacing: 'var(--tracking-wide)',
              }}
            >
              {t.brand.wordmark} ATELIER
            </div>
          </div>

          {/* Philosophy Statement & Craftsmanship Pillars */}
          <div
            className="reveal-on-scroll reveal-stagger-1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: isRTL ? 'right' : 'left',
            }}
          >
            <span className="section-eyebrow" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t.editorial.eyebrow}
            </span>

            <h2
              style={{
                fontSize: 'var(--text-3xl)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--leading-tight)',
                marginBottom: 'var(--space-md)',
              }}
            >
              {t.editorial.title}
            </h2>

            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-xl)',
                maxWidth: '560px',
              }}
            >
              {t.editorial.description}
            </p>

            {/* Quality Attribute Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-xl)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  padding: 'var(--space-xs) var(--space-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
                <span>{t.editorial.pillLeather}</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  padding: 'var(--space-xs) var(--space-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                <ShieldCheck size={14} style={{ color: 'var(--color-accent)' }} />
                <span>{t.editorial.pillHardware}</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  padding: 'var(--space-xs) var(--space-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                <Layers size={14} style={{ color: 'var(--color-accent)' }} />
                <span>{t.editorial.pillSilhouette}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
