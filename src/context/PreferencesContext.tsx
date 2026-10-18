import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Language,
  Theme,
  getTranslation,
  formatPrice as formatPriceUtil,
  calculateDiscount as calculateDiscountUtil,
  resolveLocalized,
  isValidLanguage,
  isValidTheme,
  STORAGE_LANG_KEY,
  STORAGE_THEME_KEY,
} from '../i18n';
import { Translations } from '../i18n/ar';
import { LocalizedString } from '../types/product';

export interface PreferencesContextType {
  lang: Language;
  theme: Theme;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  formatPrice: (amount: number) => string;
  calculateDiscount: (originalPrice?: number, currentPrice?: number) => number | null;
  resolveText: (localized?: LocalizedString) => string;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state: defaults safely to Arabic ('ar')
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_LANG_KEY);
      return isValidLanguage(stored) ? stored : 'ar';
    } catch {
      return 'ar';
    }
  });

  // 2. Dual Theme state: defaults to 'dark', restores user selection ('dark' | 'light')
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_THEME_KEY);
      return isValidTheme(stored) ? stored : 'dark';
    } catch {
      return 'dark';
    }
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const isRTL = lang === 'ar';
  const t = getTranslation(lang);

  // Synchronize document direction, language attribute, theme attribute, and document title
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.setAttribute('data-theme', theme);
    document.title = `${t.brand.name} | ${t.hero.eyebrow}`;

    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
      localStorage.setItem(STORAGE_THEME_KEY, theme);
    } catch (e) {
      console.warn('Unable to persist preferences', e);
    }
  }, [lang, theme, dir, t]);

  const setLang = useCallback((newLang: Language) => {
    if (isValidLanguage(newLang)) {
      setLangState(newLang);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    if (isValidTheme(newTheme)) {
      setThemeState(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem(STORAGE_THEME_KEY, newTheme);
      } catch (e) {
        console.warn('Unable to persist theme', e);
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem(STORAGE_THEME_KEY, next);
      } catch (e) {
        console.warn('Unable to persist theme', e);
      }
      return next;
    });
  }, []);

  const formatPrice = useCallback((amount: number) => formatPriceUtil(amount, lang), [lang]);

  const calculateDiscount = useCallback(
    (orig?: number, curr?: number) => calculateDiscountUtil(orig, curr),
    []
  );

  const resolveText = useCallback((loc?: LocalizedString) => resolveLocalized(loc, lang), [lang]);

  const value: PreferencesContextType = {
    lang,
    theme,
    dir,
    isRTL,
    t,
    setLang,
    toggleLang,
    setTheme,
    toggleTheme,
    formatPrice,
    calculateDiscount,
    resolveText,
  };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export function usePreferences(): PreferencesContextType {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
