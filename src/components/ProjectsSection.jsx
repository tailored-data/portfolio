import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js';
import { SectionHeading } from './SectionHeading.jsx';
import { ZigZagBlock } from './ZigZagBlock.jsx';
import { ArrowRightIcon, GitHubIcon } from './SiteIcons.jsx';

/**
 * Technical projects, same zig-zag rhythm as Experience — but offset by one
 * so the alternation continues unbroken across the section boundary. The
 * page reads as a single continuous path rather than two stacked lists.
 */
export function ProjectsSection({ profile, index }) {
  const sectionRef = useRevealOnScroll({ staggerMs: 60 });

  return (
    <section className="pageSection" id="projects" ref={sectionRef}>
      <div className="contentShell">
        <SectionHeading index={index} title="Technical Projects" />

        {profile.projects.map((project, projectIndex) => (
          <ZigZagBlock
            key={project.slug}
            index={projectIndex + 1}
            aside={
              <div>
                <div className="cardMeta">{project.subtitle}</div>
                <div className="statValue" style={{ marginTop: '0.35rem' }}>
                  {String(projectIndex + 1).padStart(2, '0')}
                </div>
                {project.isFeatured && (
                  <span className="credentialBadge" style={{ marginTop: '0.6rem' }}>
                    Featured
                  </span>
                )}
                <div className="tagRow" style={{ marginTop: '0.75rem' }}>
                  {project.techStack.map((techName) => (
                    <span className="pill" key={techName}>
                      {techName}
                    </span>
                  ))}
                </div>
              </div>
            }
          >
            <article className="card">
              <h3 className="cardTitle">{project.title}</h3>
              <p className="cardSubtitle">{project.subtitle}</p>
              <p className="cardBody">{project.summary}</p>

              <ul className="bulletList">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              {(project.hasRepo || project.hasLiveLink || project.showsSourceNote) && (
                <div className="projectLinks">
                  {project.hasRepo && (
                    <a
                      className="buttonGhost"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <GitHubIcon />
                      View source
                    </a>
                  )}

                  {project.hasLiveLink && (
                    <a
                      className="buttonGhost"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {project.liveLabel}
                      <ArrowRightIcon />
                    </a>
                  )}

                  {project.showsSourceNote && (
                    <span className="sourceNote">{project.sourceNote}</span>
                  )}
                </div>
              )}
            </article>
          </ZigZagBlock>
        ))}
      </div>
    </section>
  );
}
