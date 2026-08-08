import { useEffect, useState } from 'react';

/**
 * Tracks how far the user has scrolled through the document, as 0–100.
 *
 * The scroll event fires far more often than the screen refreshes, so the
 * measurement is deferred into requestAnimationFrame and coalesced with a
 * ticking flag. That guarantees at most one layout read per painted frame
 * no matter how fast the wheel spins.
 */
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let isTicking = false;

    const measureProgress = () => {
      const scrollableDistance =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableDistance <= 0
          ? 0
          : Math.min(100, Math.max(0, (window.scrollY / scrollableDistance) * 100));

      setScrollProgress(nextProgress);
      isTicking = false;
    };

    const handleScroll = () => {
      if (isTicking) return;
      isTicking = true;
      window.requestAnimationFrame(measureProgress);
    };

    measureProgress();
    // `passive: true` promises we won't preventDefault, letting the browser
    // scroll without waiting on this handler.
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return scrollProgress;
}
