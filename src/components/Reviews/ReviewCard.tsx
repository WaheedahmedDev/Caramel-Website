import React from 'react';
import { Eye, CheckCircle } from 'lucide-react';
import { CustomerReview } from '../../types/review';
import { usePreferences } from '../../context/PreferencesContext';
import { Badge, ImageFrame } from '../common';

export interface ReviewCardProps {
  review: CustomerReview;
  onInspect: (review: CustomerReview) => void;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onInspect,
  className = '',
}) => {
  const { t, resolveText } = usePreferences();
  const alt = review.altText ? resolveText(review.altText) : t.reviews.inspectScreenshot;
  const platformName = t.reviews[review.platform] || review.platform;
  const clientName = review.clientIdentifier ? resolveText(review.clientIdentifier) : t.reviews.verifiedConversation;

  return (
    <article
      className={`review-card ${className}`}
      data-platform={review.platform}
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
      }}
      onClick={() => onInspect(review)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect(review);
        }
      }}
      aria-label={`${t.reviews.inspectScreenshot}: ${platformName} - ${clientName}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--color-accent)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <ImageFrame
          src={review.screenshotImage}
          alt={alt}
          aspectRatio={review.aspectRatio || '9/16'}
          objectFit="contain"
          fallbackText={t.gallery.imageError}
        />

        {/* Quick Inspect Hover Overlay Button */}
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--space-sm)',
            insetInlineEnd: 'var(--space-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3xs)',
            backgroundColor: 'var(--color-bg-elevated)',
            color: 'var(--color-accent)',
            border: '1px solid var(--color-border-accent)',
            padding: 'var(--space-2xs) var(--space-sm)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 'var(--text-xs)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Eye size={14} />
          <span>{t.gallery.zoom}</span>
        </div>
      </div>

      <div
        style={{
          padding: 'var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xs)',
          backgroundColor: 'var(--color-bg-subtle)',
          borderTop: '1px solid var(--color-border-subtle)',
        }}
      >
        {/* Platform Badge Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3xs)',
            flexWrap: 'wrap',
          }}
        >
          <Badge variant="neutral">
            {platformName}
          </Badge>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3xs)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          <CheckCircle size={14} color="#25D366" />
          <span>{clientName}</span>
        </div>

        {review.caption && (
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {resolveText(review.caption)}
          </p>
        )}
      </div>
    </article>
  );
};
