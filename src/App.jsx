import { useMemo } from 'react';
import { portfolioProfile, navigationSections } from './data/portfolioData.js';
import { useThemeController } from './hooks/useThemeController.js';
import { useActiveSection } from './hooks/useActiveSection.js';

import { SiteHeader } from './components/SiteHeader.jsx';
import { ProgressRail } from './components/ProgressRail.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { SkillsSection } from './components/SkillsSection.jsx';
import { ExperienceSection } from './components/ExperienceSection.jsx';
import { ProjectsSection } from './components/ProjectsSection.jsx';
import { ResearchSection } from './components/ResearchSection.jsx';
import { CredentialsSection } from './components/CredentialsSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { SiteFooter } from './components/SiteFooter.jsx';

/**
 * Composition root.
 *
 * Section order is derived from `navigationSections` rather than hardcoded
 * here, so the nav links, rail markers, and rendered order can never fall
 * out of sync — reorder the array and all three follow.
 */
const sectionComponentsById = {
  about: AboutSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  research: ResearchSection,
  credentials: CredentialsSection,
  contact: ContactSection
};

export default function App() {
  const { isDarkTheme, toggleTheme } = useThemeController();

  // Memoized so the observer inside useActiveSection isn't torn down and
  // rebuilt on every render.
  const sectionIds = useMemo(
    () => navigationSections.map((section) => section.id),
    []
  );
  const activeSectionId = useActiveSection(sectionIds);

  return (
    <>
      <a className="skipLink" href="#main">
        Skip to main content
      </a>

      <SiteHeader
        profile={portfolioProfile}
        sections={navigationSections}
        activeSectionId={activeSectionId}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />

      <ProgressRail sections={navigationSections} activeSectionId={activeSectionId} />

      <main id="main" tabIndex={-1}>
        <HeroSection profile={portfolioProfile} />

        {navigationSections.map((section, sectionIndex) => {
          const SectionComponent = sectionComponentsById[section.id];
          if (!SectionComponent) return null;

          return (
            <SectionComponent
              key={section.id}
              profile={portfolioProfile}
              index={sectionIndex + 1}
            />
          );
        })}
      </main>

      <SiteFooter profile={portfolioProfile} />
    </>
  );
}
