import React, { useState } from 'react';
import { usePreferences } from '../../context/PreferencesContext';
import { ContactConfig } from '../../types/config';
import { getGeneralWhatsAppUrl } from '../../utils/inquiry';
import { WhatsAppIcon } from './SocialLinks';

export interface FloatingWhatsAppProps {
  contactConfig: ContactConfig;
  activeInquiryUrl?: string | null;
  onUnconfiguredClick?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  contactConfig,
  activeInquiryUrl,
  onUnconfiguredClick,
}) => {
  const { lang, t } = usePreferences();
  const [isHovered, setIsHovered] = useState(false);

  const cleanPhone = (contactConfig.whatsappNumber || '201095203967').replace(/[^0-9]/g, '');
  const isConfigured = Boolean(cleanPhone && cleanPhone.trim() !== '');

  const destinationUrl =
    activeInquiryUrl ||
    getGeneralWhatsAppUrl(cleanPhone, contactConfig.whatsappDirectUrl, lang);

  const handleClick = (e: React.MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault();
      if (onUnconfiguredClick) {
        onUnconfiguredClick();
      } else {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    if (destinationUrl) {
      window.open(destinationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const tooltipText = lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Direct WhatsApp Concierge';

  return (
    <aside
      aria-label={t.contact.floatingWhatsAppLabel}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px', // Strictly anchored to bottom-left corner
        zIndex: 'var(--z-floating-action, 45)' as any,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        direction: 'ltr', // LTR alignment for corner button and tooltip
        pointerEvents: 'none',
      }}
    >
      <button
        type="button"
        id="floating-whatsapp-chat-btn"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={tooltipText}
        className="touch-target"
        style={{
          pointerEvents: 'auto',
          width: '56px',
          height: '56px',
          minWidth: '56px',
          minHeight: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-bg-elevated)',
          color: '#25D366',
          border: '1.5px solid var(--color-border-accent)',
          boxShadow: isHovered
            ? '0 10px 28px rgba(0, 0, 0, 0.4), 0 0 20px rgba(37, 211, 102, 0.35)'
            : '0 8px 24px rgba(0, 0, 0, 0.3), 0 0 12px var(--color-accent-subtle)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transform: isHovered ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease',
        }}
      >
        <WhatsAppIcon size={26} />
      </button>

      {/* Floating Animated Tooltip Pill */}
      <span
        role="tooltip"
        style={{
          pointerEvents: 'none',
          backgroundColor: 'var(--color-bg-elevated)',
          color: 'var(--color-text-primary)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-pill)',
          fontSize: '12px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-elevated)',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          letterSpacing: '0.02em',
        }}
      >
        {tooltipText}
      </span>
    </aside>
  );
};
