import React from 'react';

/**
 * Clean, Cohesive Ambient Background for Caramel
 *
 * Provides a rich, calm dark-brown atmosphere with subtle warm gold radial glows
 * without competing with product cards or cluttering content sections.
 */
export const LivingFashionBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="living-fashion-bg-container"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-base)',
      }}
    >
      {/* 1. Subtle warm ambient gold radial light at top */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120vw',
          height: '70vh',
          maxWidth: '1400px',
          borderRadius: '50%',
          background: 'var(--ambient-glow-top)',
          filter: 'blur(80px)',
        }}
      />

      {/* 2. Soft subtle warm vignette for the lower sections */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '110vw',
          height: '60vh',
          maxWidth: '1200px',
          borderRadius: '50%',
          background: 'var(--ambient-glow-bottom)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  );
};
