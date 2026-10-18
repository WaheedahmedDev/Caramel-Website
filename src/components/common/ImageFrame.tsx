import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

export interface ImageFrameProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
  priority?: boolean;
  className?: string;
  fallbackText?: string;
}

export const ImageFrame: React.FC<ImageFrameProps> = ({
  src,
  alt,
  aspectRatio = 'var(--aspect-product)',
  objectFit = 'contain',
  objectPosition = 'center',
  priority = false,
  className = '',
  fallbackText = 'Image not available',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div
      className={`image-frame ${className}`}
      style={{
        aspectRatio,
      }}
    >
      {hasError || !src ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-xs)',
            padding: 'var(--space-md)',
            color: 'var(--color-text-tertiary)',
            textAlign: 'center',
            fontSize: 'var(--text-xs)',
          }}
          role="img"
          aria-label={alt || fallbackText}
        >
          <ImageOff size={28} strokeWidth={1.5} />
          <span>{fallbackText}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setHasError(true)}
          style={{
            objectFit,
            objectPosition,
          }}
        />
      )}
    </div>
  );
};
