import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js';
import { SectionHeading } from './SectionHeading.jsx';
import { researchPosts } from '../data/portfolioData.js';
import { ArrowRightIcon } from './SiteIcons.jsx';

/**
 * Reading notes on databases and AI in the workplace.
 *
 * Posts collapse to a summary and expand on click, using native
 * <details>/<summary> rather than React state. That choice buys keyboard
 * support, screen-reader semantics, and in-page find (browsers expand a
 * closed <details> when Ctrl+F matches inside it) for free — and it means
 * the static preview generator renders identical, fully working markup
 * with no JavaScript at all.
 *
 * Display order is by publishedOn, newest first, so the array in
 * portfolioData.js cannot silently drift.
 */
export function ResearchSection({ index }) {
  const sectionRef = useRevealOnScroll({ staggerMs: 70 });
  const postsByDate = [...researchPosts].sort((a, b) =>
    b.publishedOn.localeCompare(a.publishedOn)
  );

  return (
    <section className="pageSection" id="research" ref={sectionRef}>
      <div className="contentShell">
        <SectionHeading index={index} title="Research" />

        <p className="researchIntro revealItem">
          Notes on what I&apos;ve been reading and running — mostly databases,
          local model infrastructure, and what AI is doing to technical work.
          Updated monthly, and written the way I actually think about this
          stuff rather than the way a blog post is supposed to sound.
        </p>

        <div className="researchList">
          {postsByDate.map((post) => (
            <details className="researchPost revealItem" key={post.slug}>
              <summary className="researchSummary">
                <div className="researchMeta">
                  <span className="researchDate">{post.formattedMonth}</span>
                  <span className="researchDot" aria-hidden="true" />
                  <span>{post.readingMinutes} min read</span>
                </div>

                <h3 className="researchTitle">{post.title}</h3>
                <p className="researchDek">{post.summary}</p>

                <div className="researchFooter">
                  <div className="tagRow">
                    {post.tags.map((tagLabel) => (
                      <span className="pill" key={tagLabel}>
                        {tagLabel}
                      </span>
                    ))}
                  </div>
                  <span className="researchToggle">
                    Read <ArrowRightIcon />
                  </span>
                </div>
              </summary>

              <div className="researchBody">
                {post.body.map((block, blockIndex) =>
                  block.type === 'aside' ? (
                    <p className="researchAside" key={blockIndex}>
                      {block.text}
                    </p>
                  ) : (
                    <p key={blockIndex}>{block.text}</p>
                  )
                )}

                {post.hasSources ? (
                  <div className="researchSources">
                    <h4 className="researchSourcesTitle">Sources</h4>
                    <ul>
                      {post.sources.map((source) => (
                        <li key={source.url}>
                          <a href={source.url} target="_blank" rel="noreferrer noopener">
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  post.isPersonalObservation && (
                    <p className="researchProvenance">
                      Written from first-hand experience rather than outside
                      reporting — no citations because there aren&apos;t any.
                    </p>
                  )
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
