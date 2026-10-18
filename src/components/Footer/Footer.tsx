import React from 'react';
import { usePreferences } from '../../context/PreferencesContext';
import { contactConfig } from '../../config/contact';

export const Footer: React.FC = () => {
  const { lang, isRTL } = usePreferences();
  const currentYear = new Date().getFullYear();
  const developerUrl = contactConfig.developerFacebookUrl || 'https://www.facebook.com/share/1dBWectEMA/';

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border-subtle)',
        backgroundColor: 'var(--color-bg-primary)',
        paddingBlock: 'var(--space-2xl)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-secondary)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          textAlign: 'center',
        }}
      >
        {/* Line 1: Caramel © [year] — All rights reserved */}
        <p
          style={{
            margin: 0,
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            letterSpacing: lang === 'en' ? '0.04em' : 'normal',
          }}
        >
          {isRTL
            ? `Caramel © ${currentYear} — جميع الحقوق محفوظة`
            : `Caramel © ${currentYear} — All rights reserved`}
        </p>

        {/* Line 2: Developed by Waheed Ahmed */}
        <p
          className="developer-credit"
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{
            margin: 0,
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            justifyContent: 'center',
          }}
        >
          <span>{isRTL ? 'تم التطوير بواسطة' : 'Developed by'}</span>
          <a
            href={developerUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isRTL ? 'وحيد أحمد - الملف الشخصي على فيسبوك' : 'Waheed Ahmed - Facebook Profile'}
            style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
              textDecoration: 'none',
              borderBottom: '1px solid var(--color-accent)',
              paddingBottom: '1px',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-accent-hover)';
              e.currentTarget.style.borderBottomColor = 'var(--color-accent-hover)';
              e.currentTarget.style.textShadow = '0 0 10px rgba(213, 176, 120, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-accent)';
              e.currentTarget.style.borderBottomColor = 'var(--color-accent)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {isRTL ? 'وحيد أحمد' : 'Waheed Ahmed'}
          </a>
        </p>
      </div>
    </footer>
  );
};
