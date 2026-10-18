import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import { ContactConfig } from '../../types/config';

export interface SocialLinksProps {
  contactConfig: ContactConfig;
  variant?: 'grid' | 'showcase' | 'compact';
}

/* =========================================================================
   OFFICIAL BRAND SVG ICONS
   ========================================================================= */
export const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.031 2C6.516 2 2.02 6.496 2.02 12.012a10.015 10.015 0 0 0 1.554 5.344L2 22l4.808-1.536a9.98 9.98 0 0 0 5.223 1.488h.004c5.513 0 10.01-4.496 10.01-10.012A10.024 10.024 0 0 0 12.031 2zm5.836 14.188c-.244.686-1.42 1.312-1.956 1.396-.51.08-1.176.115-3.414-.81-2.863-1.183-4.707-4.103-4.85-4.294-.143-.19-1.155-1.536-1.155-2.93 0-1.393.73-2.079.99-2.366.26-.286.568-.358.758-.358.19 0 .38 0 .548.01.18.01.42.046.612.507.244.584.832 2.03.905 2.18.073.15.122.33.024.52-.097.19-.146.31-.292.48-.146.17-.308.38-.44.51-.146.145-.3.305-.13.595.17.29 1.134 1.865 2.434 3.02 1.674 1.488 3.084 1.948 3.522 2.168.438.22.696.183.954-.11.258-.293 1.112-1.295 1.41-1.74.298-.444.595-.37.994-.222.4.148 2.532 1.194 2.966 1.41.434.217.724.326.83.504.106.178.106 1.034-.138 1.72z" />
  </svg>
);

export const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.33 22a6.34 6.34 0 0 0 6.34-6.33V9.17a8.16 8.16 0 0 0 4.8 1.57v-3.5a4.86 4.86 0 0 1-.88-.55z" />
  </svg>
);

export const FacebookIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const SocialLinks: React.FC<SocialLinksProps> = ({ contactConfig, variant = 'grid' }) => {
  const { lang } = usePreferences();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const channels = [
    {
      id: 'instagram',
      name: 'Instagram',
      nameAr: 'إنستغرام',
      url: contactConfig.instagramUrl || 'https://www.instagram.com/caramel20261?rpxt=bmh0cmF5MmlpcWQ2',
      tooltipEn: 'Follow on Instagram',
      tooltipAr: 'تابعنا على إنستغرام',
      iconClass: 'instagram',
      icon: <InstagramIcon size={24} />,
      color: '#E1306C',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      nameAr: 'تيك توك',
      url: contactConfig.tiktokUrl || 'https://www.tiktok.com/@caramel2226?_r=1&_t=ZS-9AZcTM4qbsv',
      tooltipEn: 'Watch on TikTok',
      tooltipAr: 'شاهدنا على تيك توك',
      iconClass: 'tiktok',
      icon: <TikTokIcon size={22} />,
      color: '#25F4EE',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Channel',
      nameAr: 'قناة واتساب',
      url: contactConfig.whatsappChannelUrl || 'https://whatsapp.com/channel/0029VbBsrrB7oQhfGT7zsH0R',
      tooltipEn: 'Join our WhatsApp Channel',
      tooltipAr: 'انضم إلى قناة واتساب',
      iconClass: 'whatsapp',
      icon: <WhatsAppIcon size={24} />,
      color: '#25D366',
    },
  ];

  /* -------------------------------------------------------------------------
     VARIANT 1: REFERENCE BRAND SHOWCASE CARD (Exact Mood of Reference)
     ------------------------------------------------------------------------- */
  if (variant === 'showcase') {
    return (
      <div
        className="brand-showcase-reference-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          marginInline: 'auto',
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: '24px',
          border: '1px solid var(--color-border-accent)',
          padding: 'var(--space-2xl) var(--space-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 24px 50px -10px rgba(10, 6, 4, 0.85), 0 0 35px rgba(213, 176, 120, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* Subtle Inner Warm Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '140px',
            background: 'radial-gradient(ellipse at top, rgba(213, 176, 120, 0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* 1. Official Artwork Logo Badge from Reference */}
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '18px',
            backgroundColor: '#FFFFFF',
            padding: '10px',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
            marginBottom: 'var(--space-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(213, 176, 120, 0.3)',
          }}
        >
          <img
            src="/images/caramel-logo-badge.png"
            alt="Caramel Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* 2. Brand Name Title */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-wide)',
            color: 'var(--color-text-primary)',
            margin: 0,
            marginBottom: 'var(--space-xs)',
          }}
        >
          Caramel
        </h2>

        {/* 3. Luxury Pill Tag "BAGS & FASHION" */}
        <div
          style={{
            padding: '4px 14px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--color-bg-base)',
            border: '1px solid var(--color-border-accent)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-xs)',
          }}
        >
          {lang === 'ar' ? 'شنط وملابس حريمي' : 'BAGS & FASHION'}
        </div>

        {/* 4. Elegant Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-xl)',
          }}
        >
          {lang === 'ar'
            ? 'الأناقة المعاد صياغتها في عالم الجلود والأزياء'
            : 'Elegance Redefined in Leather & Couture'}
        </p>

        {/* 5. The 3 Signature Circular Social Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-md)',
          }}
        >
          {channels.map((chan) => (
            <a
              key={chan.id}
              href={chan.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-circle-btn ${chan.iconClass} touch-target`}
              aria-label={lang === 'ar' ? chan.tooltipAr : chan.tooltipEn}
              onMouseEnter={() => setActiveTooltip(lang === 'ar' ? chan.tooltipAr : chan.tooltipEn)}
              onMouseLeave={() => setActiveTooltip(null)}
              onFocus={() => setActiveTooltip(lang === 'ar' ? chan.tooltipAr : chan.tooltipEn)}
              onBlur={() => setActiveTooltip(null)}
            >
              {chan.icon}
            </a>
          ))}
        </div>

        {/* 6. Dynamic Interactive Tooltip Badge below buttons */}
        <div
          style={{
            minHeight: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(28, 16, 10, 0.9)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border-subtle)',
              opacity: activeTooltip ? 1 : 0.7,
              transform: activeTooltip ? 'translateY(0)' : 'translateY(2px)',
              transition: 'all var(--transition-fast)',
            }}
          >
            {activeTooltip || (lang === 'ar' ? 'تابعنا على قنواتنا الرسمية' : 'Connect with our Official Channels')}
          </span>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------
     VARIANT 2: GRID ROW OF ALL THREE SOCIAL CHANNELS
     ------------------------------------------------------------------------- */
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 'var(--space-md)',
        width: '100%',
      }}
    >
      {channels.map((dest) => (
        <a
          key={dest.id}
          href={dest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-md) var(--space-lg)',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            color: 'var(--color-text-primary)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast)',
            minHeight: '52px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <span
              className={`social-circle-btn ${dest.iconClass}`}
              style={{
                width: '40px',
                height: '40px',
                minWidth: '40px',
                minHeight: '40px',
              }}
            >
              {dest.icon}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {lang === 'ar' ? dest.nameAr : dest.name}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>
                {lang === 'ar' ? dest.tooltipAr : dest.tooltipEn}
              </span>
            </div>
          </div>
          <ExternalLink size={16} style={{ color: 'var(--color-text-tertiary)' }} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};
