import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme, t } = usePreferences();
  const isDark = theme === 'dark';

  const label = isDark ? t.theme.switchToLight : t.theme.switchToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`touch-target theme-toggle-btn ${className}`}
      style={{
        width: '36px',
        height: '36px',
        minWidth: '36px',
        minHeight: '36px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-subtle)',
        color: 'var(--color-accent)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color var(--transition-fast), transform var(--transition-fast), background-color var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
        e.currentTarget.style.transform = 'scale(1.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {isDark ? (
        <Sun size={17} strokeWidth={2.2} style={{ transition: 'transform 0.3s ease' }} />
      ) : (
        <Moon size={16} strokeWidth={2.2} style={{ transition: 'transform 0.3s ease' }} />
      )}
    </button>
  );
};
