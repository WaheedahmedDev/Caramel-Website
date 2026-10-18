import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { brandConfig } from '../../config/brand';
import { usePreferences } from '../../context/PreferencesContext';
import { LanguageSwitcher, ThemeToggle } from '../common';

export interface HeaderProps {
  onSelectCategory?: (category: 'all' | 'handbags' | 'apparel' | 'accessories') => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory }) => {
  const { t, lang } = usePreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (category?: 'all' | 'handbags' | 'apparel' | 'accessories') => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    setMobileMenuOpen(false);
  };

  // Strictly four primary navigation sections
  const navItems = [
    { id: 'home', href: '#home', label: t.nav.home, onClick: () => handleLinkClick() },
    { id: 'collection', href: '#collection', label: t.nav.ourProducts, onClick: () => handleLinkClick('all') },
    { id: 'reviews', href: '#reviews', label: t.nav.reviews, onClick: () => handleLinkClick() },
    { id: 'contact', href: '#contact', label: t.nav.contact, onClick: () => handleLinkClick() },
  ];

  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: 'var(--color-bg-glass)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-header, 50)' as any,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
          gap: 'var(--space-xl)',
        }}
      >
        {/* Brand Wordmark & Seal Logo */}
        <a
          href="#home"
          className="brand-logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--color-text-primary)',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
        >
          <img
            src="/images/caramel-logo-badge.png"
            alt="Caramel Seal"
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'contain',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(213, 176, 120, 0.25)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.65rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {brandConfig.wordmark}
          </span>
        </a>

        {/* Desktop Editorial Navigation — Strictly 4 Primary Sections */}
        <nav
          aria-label={t.nav.menu}
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-2xl)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: lang === 'en' ? '0.08em' : 'normal',
            textTransform: 'uppercase',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={item.onClick}
              className="editorial-nav-link"
              style={{
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                position: 'relative',
                paddingBlock: '6px',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls: Compact Luxury Language Switcher + Accessible Theme Toggle + Mobile Menu Trigger */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            flexShrink: 0,
          }}
        >
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="btn-icon touch-target mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.menu}
            style={{
              display: 'inline-flex',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="mobile-drawer-animate"
          style={{
            position: 'absolute',
            top: '76px',
            insetInline: 0,
            backgroundColor: 'var(--color-bg-surface)',
            borderBottom: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--shadow-elevated)',
            padding: 'var(--space-xl) var(--space-md)',
            zIndex: 45,
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
            }}
          >
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={item.onClick}
                  style={{
                    paddingBlock: 'var(--space-sm)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: 'var(--color-accent)', fontSize: '13px' }}>↗</span>
                </a>
              ))}
            </nav>

            {/* Mobile Utility Controls Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 'var(--space-sm)',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                {t.theme.toggle} / {lang === 'ar' ? 'اللغة' : 'Language'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
