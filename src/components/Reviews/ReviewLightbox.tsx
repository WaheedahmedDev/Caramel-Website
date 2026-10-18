import React, { useEffect, useRef } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { CustomerReview } from '../../types/review';
import { usePreferences } from '../../context/PreferencesContext';
import { Badge } from '../common';
import { assetUrl } from '../../utils/asset';

export interface ReviewLightboxProps {
  review: CustomerReview | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewLightbox: React.FC<ReviewLightboxProps> = ({
  review,
  isOpen,
  onClose,
}) => {
  const { t, resolveText } = usePreferences();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocus.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !review) {
    return null;
  }

  const alt = review.altText ? resolveText(review.altText) : t.reviews.inspectScreenshot;
  const clientName = review.clientIdentifier ? resolveText(review.clientIdentifier) : t.reviews.verifiedConversation;
  const platformName = t.reviews[review.platform] || review.platform;

  return (
    <div
      className="modal-backdrop animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${t.reviews.inspectScreenshot} — ${platformName}`}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 5, 0.94)',
        zIndex: 'var(--z-lightbox)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-md)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-sm)',
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t.reviews.closeLightbox}
          title={t.reviews.closeLightbox}
          style={{
            position: 'absolute',
            top: '-48px',
            insetInlineEnd: 0,
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--color-bg-elevated)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </button>

        {/* Screenshot View Container (Natural Aspect Ratio Preservation) */}
        <div
          style={{
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--shadow-modal)',
            maxHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={assetUrl(review.screenshotImage)}
            alt={alt}
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Meta Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Badge variant="neutral">
            {platformName}
          </Badge>
          <Badge variant="neutral" icon={<CheckCircle size={12} color="#25D366" />}>
            {clientName}
          </Badge>
          {review.receivedDate && (
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
              {review.receivedDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
