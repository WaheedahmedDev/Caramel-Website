import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ImageOff } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import { assetUrl } from '../../utils/asset';

export interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  productName: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
  productName,
}) => {
  const { t, lang } = usePreferences();
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasError, setHasError] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Clamp index within valid bounds
  const safeIndex = Math.max(0, Math.min(currentIndex, images.length - 1));
  const currentImage = images[safeIndex] || '';
  const hasMultiple = images.length > 1;

  // Reset zoom & error when image changes
  useEffect(() => {
    setIsZoomed(false);
    setHasError(false);
  }, [safeIndex, currentImage]);

  // Focus management & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (hasMultiple) {
          e.preventDefault();
          const nextIdx = lang === 'ar'
            ? (safeIndex > 0 ? safeIndex - 1 : images.length - 1)
            : (safeIndex < images.length - 1 ? safeIndex + 1 : 0);
          onNavigate(nextIdx);
        }
      } else if (e.key === 'ArrowLeft') {
        if (hasMultiple) {
          e.preventDefault();
          const prevIdx = lang === 'ar'
            ? (safeIndex < images.length - 1 ? safeIndex + 1 : 0)
            : (safeIndex > 0 ? safeIndex - 1 : images.length - 1);
          onNavigate(prevIdx);
        }
      } else if (e.key === 'Tab') {
        // Focus trap inside lightbox
        if (!lightboxRef.current) return;
        const focusables = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, hasMultiple, safeIndex, images.length, lang, onClose, onNavigate]);

  const handlePrev = useCallback(() => {
    if (!hasMultiple) return;
    const prevIdx = safeIndex > 0 ? safeIndex - 1 : images.length - 1;
    onNavigate(prevIdx);
  }, [hasMultiple, safeIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (!hasMultiple) return;
    const nextIdx = safeIndex < images.length - 1 ? safeIndex + 1 : 0;
    onNavigate(nextIdx);
  }, [hasMultiple, safeIndex, images.length, onNavigate]);

  if (!isOpen || images.length === 0) {
    return null;
  }

  const counterText = t.gallery.imageCounter
    .replace('{current}', String(safeIndex + 1))
    .replace('{total}', String(images.length));

  return (
    <div
      ref={lightboxRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.gallery.lightboxTitle}: ${productName}`}
      className="lightbox-backdrop animate-fade-in"
      onClick={(e) => {
        // Close if clicked directly on backdrop (outside image content)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* 1. Header Controls Bar */}
      <div className="lightbox-header">
        {/* Localized Image Counter */}
        <div
          style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.85)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          {hasMultiple ? counterText : productName}
        </div>

        {/* Action Controls: Zoom Toggle & Visible Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
          <button
            type="button"
            className="touch-target btn-icon"
            onClick={() => setIsZoomed((prev) => !prev)}
            aria-label={isZoomed ? t.gallery.zoomOut : t.gallery.zoomIn}
            title={isZoomed ? t.gallery.clickToReset : t.gallery.clickToZoom}
            style={{
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '40px',
              height: '40px',
            }}
          >
            {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>

          <button
            ref={closeBtnRef}
            type="button"
            className="touch-target btn-icon"
            onClick={onClose}
            aria-label={t.gallery.close}
            title={t.gallery.close}
            style={{
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '40px',
              height: '40px',
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* 2. Main High-Resolution Photo Canvas */}
      <div
        className="lightbox-content"
        onClick={() => setIsZoomed((prev) => !prev)}
        style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
      >
        {hasError || !currentImage ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-sm)',
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
            }}
            role="img"
            aria-label={t.gallery.imageError}
          >
            <ImageOff size={48} strokeWidth={1.5} />
            <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>
              {t.gallery.imageError}
            </p>
          </div>
        ) : (
          <img
            src={assetUrl(currentImage)}
            alt={`${productName} — ${counterText}`}
            className={`lightbox-image ${isZoomed ? 'zoomed' : ''}`}
            onError={() => setHasError(true)}
            loading="eager"
            decoding="async"
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
            }}
          />
        )}
      </div>

      {/* 3. Navigation Controls (Only shown when multiple photos exist) */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="lightbox-nav-btn prev touch-target"
            aria-label={t.gallery.prev}
            title={t.gallery.prev}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="lightbox-nav-btn next touch-target"
            aria-label={t.gallery.next}
            title={t.gallery.next}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* 4. Bottom Hint */}
      <div
        style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 'var(--text-xs)',
          paddingBottom: 'var(--space-xs)',
          userSelect: 'none',
        }}
      >
        {isZoomed ? t.gallery.clickToReset : t.gallery.clickToZoom}
      </div>
    </div>
  );
};
