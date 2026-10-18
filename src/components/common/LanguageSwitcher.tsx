import React from 'react';
import { usePreferences } from '../../context/PreferencesContext';

export interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
}) => {
  const { lang, setLang, t } = usePreferences();

  return (
    <div
      role="group"
      aria-label={t.lang.toggleTooltip}
      className={`touch-target ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-pill)',
        padding: '3px 4px',
        gap: '2px',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      <button
        type="button"
        aria-pressed={lang === 'ar'}
        aria-label={t.lang.arLabel}
        onClick={() => setLang('ar')}
        style={{
          minHeight: '28px',
          paddingInline: '10px',
          borderRadius: 'var(--radius-pill)',
          fontSize: '11px',
          fontFamily: 'var(--font-arabic)',
          fontWeight: lang === 'ar' ? 700 : 500,
          backgroundColor: lang === 'ar' ? 'var(--color-accent)' : 'transparent',
          color: lang === 'ar' ? 'var(--color-on-accent)' : 'var(--color-text-secondary)',
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '0.02em',
          transition: 'all var(--transition-fast)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        عربي
      </button>

      <span
        aria-hidden="true"
        style={{
          width: '1px',
          height: '12px',
          backgroundColor: 'var(--color-border-strong)',
          opacity: 0.5,
        }}
      />

      <button
        type="button"
        aria-pressed={lang === 'en'}
        aria-label={t.lang.enLabel}
        onClick={() => setLang('en')}
        style={{
          minHeight: '28px',
          paddingInline: '10px',
          borderRadius: 'var(--radius-pill)',
          fontSize: '11px',
          fontFamily: 'var(--font-sans)',
          fontWeight: lang === 'en' ? 700 : 500,
          letterSpacing: '0.06em',
          backgroundColor: lang === 'en' ? 'var(--color-accent)' : 'transparent',
          color: lang === 'en' ? 'var(--color-on-accent)' : 'var(--color-text-secondary)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        EN
      </button>
    </div>
  );
};

