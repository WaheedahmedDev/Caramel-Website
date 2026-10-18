import React, { useState, useMemo } from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { CustomerReview, ReviewPlatform } from '../../types/review';
import {
  filterReviewsByPlatform,
  getReviewPlatformCounts,
  customerReviews as defaultReviews,
} from '../../data/reviews';
import { usePreferences } from '../../context/PreferencesContext';
import { SectionHeader, EmptyState } from '../common';
import { ReviewCard } from './ReviewCard';
import { ReviewLightbox } from './ReviewLightbox';

export interface ReviewGalleryProps {
  reviews?: CustomerReview[];
  className?: string;
}

export const ReviewGallery: React.FC<ReviewGalleryProps> = ({
  reviews = defaultReviews,
  className = '',
}) => {
  const { t } = usePreferences();
  const [activePlatform, setActivePlatform] = useState<ReviewPlatform>('all');
  const [selectedReview, setSelectedReview] = useState<CustomerReview | null>(null);

  const platformCounts = useMemo(() => getReviewPlatformCounts(reviews), [reviews]);
  const filteredReviews = useMemo(
    () => filterReviewsByPlatform(reviews, activePlatform),
    [reviews, activePlatform]
  );

  const platforms: { id: ReviewPlatform; label: string }[] = [
    { id: 'all', label: t.reviews.allPlatforms },
    { id: 'whatsapp', label: t.reviews.whatsapp },
    { id: 'instagram', label: t.reviews.instagram },
    { id: 'facebook', label: t.reviews.facebook },
    { id: 'tiktok', label: t.reviews.tiktok },
  ];

  return (
    <section id="reviews" className={`reviews-section ${className}`} style={{ paddingBlock: 'var(--space-4xl)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="reveal-on-scroll">
          <SectionHeader
            eyebrow={t.reviews.eyebrow}
            title={t.reviews.title}
            subtitle={t.reviews.subtitle}
          />
        </div>

        {/* Platform Filter Tabs (Accessible role="tablist") */}
        <div
          role="tablist"
          aria-label={t.reviews.filterByPlatform}
          className="reveal-on-scroll reveal-stagger-1"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-xs)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          {platforms.map((p) => {
            const isActive = activePlatform === p.id;
            const count = platformCounts[p.id];

            return (
              <button
                key={p.id}
                role="tab"
                id={`review-tab-${p.id}`}
                aria-selected={isActive}
                aria-controls="review-tabpanel"
                type="button"
                onClick={() => setActivePlatform(p.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2xs)',
                  padding: 'var(--space-xs) var(--space-md)',
                  minHeight: '44px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-bg-surface)',
                  color: isActive ? 'var(--color-on-accent)' : 'var(--color-text-secondary)',
                  border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border-subtle)'}`,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{p.label}</span>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : 'var(--color-bg-subtle)',
                    color: isActive ? 'inherit' : 'var(--color-text-tertiary)',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tabpanel Content */}
        <div
          id="review-tabpanel"
          role="tabpanel"
          aria-labelledby={`review-tab-${activePlatform}`}
        >
          {filteredReviews.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--space-lg)',
              }}
            >
              {filteredReviews.map((review, idx) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  className={`reveal-on-scroll reveal-stagger-${(idx % 4) + 1}`}
                  onInspect={(r) => setSelectedReview(r)}
                />
              ))}
            </div>
          ) : (
            /* Tasteful, Honest Localized Empty State (Never fabricated testimonials!) */
            <EmptyState
              icon={<MessageSquareQuote size={36} />}
              title={t.reviews.emptyTitle}
              description={
                activePlatform === 'all'
                  ? t.reviews.emptyDescription
                  : t.reviews.noReviewsForPlatform
              }
            />
          )}
        </div>
      </div>

      {/* Full-Resolution Screenshot Lightbox */}
      <ReviewLightbox
        review={selectedReview}
        isOpen={selectedReview !== null}
        onClose={() => setSelectedReview(null)}
      />
    </section>
  );
};
