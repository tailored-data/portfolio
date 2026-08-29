import { useEffect, useRef } from 'react';
import { ArrowRightIcon, DownloadIcon, LocationIcon, MailIcon } from './SiteIcons.jsx';

/**
 * First viewport.
 *
 * Reveals here are driven by a mount timer rather than the scroll observer,
 * because the hero is already on screen when the page loads — there is no
 * intersection to wait for. Content arrives top-to-bottom, finishing at the
 * scroll cue, which hands the eye off to the rest of the page.
 */
export function HeroSection({ profile }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return undefined;

    const revealTargets = Array.from(heroElement.querySelectorAll('.revealItem'));

    const revealTimer = window.setTimeout(() => {
      revealTargets.forEach((element, elementIndex) => {
        element.style.setProperty('--revealDelay', `${elementIndex * 90}ms`);
        element.classList.add('isVisible');
      });
    }, 90);

    return () => window.clearTimeout(revealTimer);
  }, []);

  const [firstName, ...remainingNameParts] = profile.fullName.split(' ');

  return (
    <section className="heroSection" id="top" tabIndex={-1} ref={heroRef}>
      <div className="contentShell">
        <p className="heroEyebrow revealItem">
          <span className="heroStatusDot" aria-hidden="true" />
          Available for engineering &amp; analytics roles
        </p>

        <h1 className="heroName revealItem">
          {firstName} <span className="heroNameAccent">{remainingNameParts.join(' ')}</span>
        </h1>

        <p className="heroHeadline revealItem">{profile.headline}</p>

        <div className="heroDisciplines revealItem">
          {profile.disciplines.map((discipline) => (
            <span className="pill" key={discipline}>
              {discipline}
            </span>
          ))}
        </div>

        <div className="heroActions revealItem">
          <a className="buttonPrimary" href="#projects">
            View my work
            <ArrowRightIcon />
          </a>
          {/* Points at the contact form rather than the file. The résumé
              link is revealed there after a successful submission. */}
          <a className="buttonGhost" href="#contact">
            <DownloadIcon />
            Request résumé
          </a>
          <a className="buttonGhost" href={profile.mailToLink}>
            <MailIcon />
            Get in touch
          </a>
        </div>

        <div className="heroMeta revealItem">
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <LocationIcon />
            {profile.location}
          </span>
          {profile.currentRole && (
            <span>
              Currently — {profile.currentRole.title} @ {profile.currentRole.organization}
            </span>
          )}
        </div>
      </div>

      <div className="scrollCue" aria-hidden="true">
        <span>Scroll</span>
        <span className="scrollCueTrack" />
      </div>
    </section>
  );
}
