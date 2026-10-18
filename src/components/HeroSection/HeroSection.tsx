import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';

export const HeroSection: React.FC = () => {
  const { lang, isRTL, t } = usePreferences();

  return (
    <section
      id="home"
      aria-label={t.hero.headline}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-base)',
        overflow: 'hidden',
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-4xl)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      {/* 1. Large Top Center Editorial Brand Title (as seen in target reference) */}
      <div
        className="reveal-on-scroll reveal-fade"
        style={{
          textAlign: 'center',
          marginBottom: 'var(--space-xl)',
          paddingInline: 'var(--space-md)',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.75rem, 7.5vw, 6.25rem)',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--color-text-primary)',
            fontWeight: 500,
            lineHeight: 1,
            display: 'inline-block',
            textShadow: 'var(--hero-title-shadow)',
          }}
        >
          CARAMEL
        </span>
      </div>

      {/* 2. Main Hero Editorial Composition Canvas */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1380px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            alignItems: 'center',
            gap: 'var(--space-3xl)',
            minHeight: '480px',
          }}
          className="hero-main-layout"
        >
          {/* Left Column: Eyebrow, Headline, Supporting Description, Pill CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: isRTL ? 'right' : 'left',
              zIndex: 3,
            }}
            className="hero-text-content reveal-on-scroll"
          >
            {/* Editorial Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2xs)',
                marginBottom: 'var(--space-md)',
              }}
            >
              <Sparkles size={14} color="var(--color-accent)" />
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: lang === 'en' ? '0.16em' : '0.06em',
                  color: 'var(--color-accent)',
                }}
              >
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Dramatic Editorial Headline */}
            <h1
              style={{
                fontFamily: lang === 'en' ? 'var(--font-serif)' : 'var(--font-arabic)',
                fontSize: 'clamp(2.25rem, 4.2vw, 4rem)',
                lineHeight: lang === 'ar' ? 1.3 : 1.12,
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                margin: '0 0 var(--space-lg) 0',
                letterSpacing: lang === 'en' ? '-0.01em' : 'normal',
                maxWidth: '620px',
              }}
            >
              {t.hero.headline}
            </h1>

            {/* Concise Supporting Description */}
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--color-text-secondary)',
                lineHeight: lang === 'ar' ? 1.85 : 1.7,
                maxWidth: '520px',
                margin: '0 0 var(--space-2xl) 0',
                fontWeight: 300,
              }}
            >
              {t.hero.subheadline}
            </p>

            {/* Pill CTAs (matching target reference) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                flexWrap: 'wrap',
              }}
            >
              {/* Primary Pill Button */}
              <a
                href="#collection"
                className="touch-target"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-bg-primary)',
                  fontWeight: 600,
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.04em',
                  padding: '14px 34px',
                  borderRadius: 'var(--radius-pill)',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(213, 176, 120, 0.25)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(213, 176, 120, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(213, 176, 120, 0.25)';
                }}
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight size={17} style={{ transform: isRTL ? 'rotate(-90deg)' : 'none' }} />
              </a>

              {/* Secondary Pill Button */}
              <a
                href="#contact"
                className="touch-target"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.04em',
                  padding: '14px 30px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(213, 176, 120, 0.35)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.backgroundColor = 'rgba(213, 176, 120, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(213, 176, 120, 0.35)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dominant Hero Caramel Handbag with Grounding Shadow */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 3,
            }}
            className="hero-bag-showcase reveal-on-scroll reveal-scale"
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src="/images/fashion-cutouts/handbag-caramel.webp"
                alt="Caramel Signature Luxury Leather Handbag"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.45))',
                  userSelect: 'none',
                  transition: 'transform 0.4s ease',
                }}
                className="hero-featured-bag"
              />

              {/* Realistic Grounding Shadow beneath bag (matches reference image) */}
              <div
                aria-hidden="true"
                style={{
                  width: '75%',
                  height: '24px',
                  marginTop: '-14px',
                  borderRadius: '50%',
                  background: 'var(--hero-bag-grounding-shadow)',
                  filter: 'blur(10px)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Outer Edge Flanking Fashion Accents (Subtle, Restrained, as in Reference Image) */}
      {/* Outer Left: Boucle Jacket Frame */}
      <div
        aria-hidden="true"
        className="hero-flank-left"
        style={{
          position: 'absolute',
          top: '38%',
          insetInlineStart: '-40px',
          transform: 'translateY(-50%)',
          width: 'clamp(140px, 15vw, 220px)',
          opacity: 0.55,
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))',
        }}
      >
        <img
          src="/images/fashion-cutouts/jacket-boucle.webp"
          alt=""
          loading="lazy"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Outer Right: Champagne Satin Dress Frame */}
      <div
        aria-hidden="true"
        className="hero-flank-right"
        style={{
          position: 'absolute',
          top: '30%',
          insetInlineEnd: '-30px',
          width: 'clamp(160px, 18vw, 260px)',
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.45))',
        }}
      >
        <img
          src="/images/fashion-cutouts/dress-elegant.webp"
          alt=""
          loading="lazy"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </section>
  );
};
