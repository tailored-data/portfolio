import { useScrollProgress } from '../hooks/useScrollProgress.js';

/**
 * Fixed left-edge rail. Two jobs:
 *  1. The cyan fill height mirrors scroll position — continuous, peripheral
 *     feedback on how much page is left.
 *  2. Markers sit at each section's relative position and light up when
 *     that section is active, so "where am I" is answered without reading.
 */
export function ProgressRail({ sections, activeSectionId }) {
  const scrollProgress = useScrollProgress();

  return (
    <div
      className="progressRail"
      aria-hidden="true"
      style={{ '--scrollProgress': `${scrollProgress}%` }}
    >
      <div className="progressRailFill" />
      {sections.map((section, sectionIndex) => (
        <span
          key={section.id}
          className={`progressRailMarker${
            section.id === activeSectionId ? ' isActive' : ''
          }`}
          style={{
            top: `${(sectionIndex / Math.max(1, sections.length - 1)) * 100}%`
          }}
        />
      ))}
    </div>
  );
}
