import { useEffect } from 'react';

/**
 * useScrollReveal — Repeating Scroll-Triggered Animation System
 *
 * Observes all elements with the `.reveal-on-scroll` class:
 * - When an element enters the viewport, adds `.is-revealed` to trigger its entrance animation.
 * - When an element exits the viewport, removes `.is-revealed` so that revisiting the section
 *   repeats the animation cleanly.
 * - Watches DOM mutations so newly filtered product cards or loaded sections are automatically observed.
 * - Fully respects `prefers-reduced-motion`.
 */
export function useScrollReveal() {
  useEffect(() => {
    // 1. Accessibility: Check for reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // 2. IntersectionObserver with visible and hidden reset states
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When entering view, activate reveal
            entry.target.classList.add('is-revealed');
          } else {
            // When exiting view, reset state so it re-triggers upon return
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    // Initial observation pass
    const attachObservers = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
    };

    attachObservers();

    // 3. MutationObserver to handle dynamic catalogue category switching
    const mutationObserver = new MutationObserver(() => {
      attachObservers();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
