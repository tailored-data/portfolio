import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js';
import { SectionHeading } from './SectionHeading.jsx';

/**
 * Narrative summary paired with a stat stack.
 *
 * The stats are the only large numerals on the page, which makes them the
 * strongest focal point in this section — the eye lands there first, gets a
 * fast quantitative read, then falls back left into the prose.
 */
export function AboutSection({ profile, index }) {
  const sectionRef = useRevealOnScroll();

  const summaryStats = [
    { value: `${profile.allSkills.length}+`, label: 'Technologies worked in' },
    { value: `${profile.projects.length}`, label: 'Shipped technical projects' },
    { value: 'B.A.Sc.', label: 'Information Management' }
  ];

  return (
    <section className="pageSection" id="about" ref={sectionRef}>
      <div className="contentShell">
        <SectionHeading index={index} title="About" />

        <div className="aboutGrid">
          <div className="revealItem fromLeft">
            <p className="aboutLead">
              I work at the seam between data and software — where a report stops being
              a spreadsheet and starts being a system.
            </p>
            <p className="aboutBody">{profile.summary}</p>
          </div>

          <div className="statStack revealItem fromRight">
            {summaryStats.map((stat) => (
              <div className="statCard" key={stat.label}>
                <div className="statValue">{stat.value}</div>
                <div className="statLabel">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
