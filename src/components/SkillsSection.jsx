import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js';
import { SectionHeading } from './SectionHeading.jsx';

/**
 * Skill groups as an auto-fitting card grid.
 *
 * `auto-fit` + `minmax` lets the browser choose the column count from the
 * available width, so this reflows from four columns to one with no media
 * query and no breakpoint to maintain.
 */
export function SkillsSection({ profile, index }) {
  const sectionRef = useRevealOnScroll({ staggerMs: 70 });

  return (
    <section className="pageSection" id="skills" ref={sectionRef}>
      <div className="contentShell">
        <SectionHeading index={index} title="Technical Skills" />

        <div className="skillGrid">
          {profile.skillGroups.map((skillGroup) => (
            <article className="card revealItem" key={skillGroup.slug}>
              <h3 className="skillGroupTitle">{skillGroup.title}</h3>
              <ul className="skillList">
                {skillGroup.skills.map((skillName) => (
                  <li key={skillName}>{skillName}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
