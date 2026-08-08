import { useEffect, useRef } from 'react';

/**
 * Reveals every element carrying `.revealItem` inside the returned ref
 * as it scrolls into view.
 *
 * Why IntersectionObserver rather than a scroll listener: a scroll handler
 * fires on every frame and forces a layout read to measure positions.
 * IntersectionObserver is evaluated off the main thread by the browser and
 * only calls back at threshold crossings — effectively free by comparison.
 *
 * @param {object} options
 * @param {number} options.staggerMs  Delay added per element, in DOM order.
 * @param {number} options.threshold  Fraction visible before revealing.
 * @param {string} options.rootMargin Shrinks the viewport so reveals fire
 *                                    slightly before the true edge.
 */
export function useRevealOnScroll({
  staggerMs = 80,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px'
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return undefined;

    const revealTargets = Array.from(containerElement.querySelectorAll('.revealItem'));
    if (revealTargets.length === 0) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // No observer at all if motion is off — just show everything.
    if (prefersReducedMotion) {
      revealTargets.forEach((element) => element.classList.add('isVisible'));
      return undefined;
    }

    // Stagger is per-container, so elements arrive in reading order rather
    // than all snapping in at once. Capped so late items don't feel laggy.
    revealTargets.forEach((element, elementIndex) => {
      element.style.setProperty('--revealDelay', `${Math.min(elementIndex, 6) * staggerMs}ms`);
    });

    const revealObserver = new IntersectionObserver(
      (observerEntries) => {
        observerEntries.forEach((observerEntry) => {
          if (!observerEntry.isIntersecting) return;
          observerEntry.target.classList.add('isVisible');
          // Reveal once, then stop watching. Re-animating on every pass
          // reads as jittery when a user scrolls back up.
          revealObserver.unobserve(observerEntry.target);
        });
      },
      { threshold, rootMargin }
    );

    revealTargets.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, [staggerMs, threshold, rootMargin]);

  return containerRef;
}
