import { useEffect, useState } from 'react';
import { GitHubIcon, MoonIcon, SunIcon } from './SiteIcons.jsx';

/**
 * Fixed header. Transparent over the hero, then fades to a frosted bar once
 * the user scrolls — so it stays out of the way during the first
 * impression, and becomes a navigational anchor only after the user has
 * committed to reading.
 */
export function SiteHeader({
  profile,
  sections,
  activeSectionId,
  isDarkTheme,
  onToggleTheme
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`siteHeader${isScrolled ? ' isScrolled' : ''}`}>
      <div className="contentShell siteHeaderInner">
        <a className="headerMark" href="#top" aria-label={`${profile.fullName} — back to top`}>
          <span className="headerMarkInitials">{profile.initials}</span>
          <span>{profile.fullName.toUpperCase()}</span>
        </a>

        <nav className="headerNav" aria-label="Section navigation">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`headerNavLink${
                section.id === activeSectionId ? ' isActive' : ''
              }`}
              aria-current={section.id === activeSectionId ? 'true' : undefined}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="headerActions">
          <a
            className="iconButton"
            href={profile.gitHubUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile (opens in a new tab)"
          >
            <GitHubIcon />
          </a>
          <button
            type="button"
            className="iconButton"
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            {isDarkTheme ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
