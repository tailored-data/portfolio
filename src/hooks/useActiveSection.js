import { useEffect, useState } from 'react';

/**
 * Reports which section id is currently dominant in the viewport, so the
 * header nav and the rail markers can highlight in sync.
 *
 * rootMargin '-45% 0px -50% 0px' collapses the observation area to a thin
 * band across the middle of the screen. A section counts as "active" only
 * once it crosses that band, which matches where a reader's attention
 * actually sits — far more stable than using the top edge.
 *
 * @param {string[]} sectionIds
 */
export function useActiveSection(sectionIds) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const sectionElements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (sectionElements.length === 0) return undefined;

    const sectionObserver = new IntersectionObserver(
      (observerEntries) => {
        const intersectingEntry = observerEntries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveSectionId(intersectingEntry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sectionElements.forEach((element) => sectionObserver.observe(element));

    return () => sectionObserver.disconnect();
  }, [sectionIds]);

  return activeSectionId;
}
