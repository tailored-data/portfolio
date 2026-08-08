import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js';
import { SectionHeading } from './SectionHeading.jsx';
import { ZigZagBlock } from './ZigZagBlock.jsx';

/**
 * Work history laid out as alternating zig-zag blocks.
 *
 * The date and org sit in the aside, opposite the detail card. Because the
 * two halves swap sides each row, the eye crosses the page on every entry
 * instead of running straight down a single column — that lateral travel is
 * what keeps a long list from being skimmed past.
 */
export function ExperienceSection({ profile, index }) {
  const sectionRef = useRevealOnScroll({ staggerMs: 60 });

  return (
    <section className="pageSection" id="experience" ref={sectionRef}>
      <div className="contentShell">
        <SectionHeading index={index} title="Experience" />

        {profile.experiences.map((experience, experienceIndex) => (
          <ZigZagBlock
            key={experience.slug}
            index={experienceIndex}
            aside={
              <div>
                <div className="cardMeta">{experience.dateRange}</div>
                <h3 className="cardTitle" style={{ marginTop: '0.35rem' }}>
                  {experience.organization}
                </h3>
                {experience.isCurrent && (
                  <span className="credentialBadge" style={{ marginTop: '0.6rem' }}>
                    Current
                  </span>
                )}
              </div>
            }
          >
            <article className="card">
              <h3 className="cardTitle">{experience.title}</h3>
              <p className="cardSubtitle">{experience.organization}</p>

              <ul className="bulletList">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              {experience.tags.length > 0 && (
                <div className="tagRow" style={{ marginTop: '1.25rem' }}>
                  {experience.tags.map((tagLabel) => (
                    <span className="pill" key={tagLabel}>
                      {tagLabel}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </ZigZagBlock>
        ))}
      </div>
    </section>
  );
}
