/**
 * Generates `preview.html` — the whole site as one self-contained file with
 * no build step and no server.
 *
 * Why this exists: the React app needs Vite to compile JSX, so you can't
 * just double-click a file and see it. This script reads the SAME data and
 * the SAME stylesheets, then emits static markup plus a little vanilla JS
 * for the scroll behavior. Because it imports portfolioData.js rather than
 * duplicating any content, the preview can never drift out of sync — edit
 * your data, re-run this, and the preview matches.
 *
 * Usage:  node scripts/buildStaticPreview.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  portfolioProfile,
  navigationSections,
  contactFormEndpoint
} from '../src/data/portfolioData.js';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');

/** Escapes text so content can never inject markup. */
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** theme.css is @imported by global.css; inline both, dropping the import. */
const readStylesheets = () => {
  const themeCss = fs.readFileSync(path.join(projectRoot, 'src/styles/theme.css'), 'utf8');
  const globalCss = fs
    .readFileSync(path.join(projectRoot, 'src/styles/global.css'), 'utf8')
    .replace(/@import\s+['"][^'"]+['"];\s*/g, '');
  return `${themeCss}\n${globalCss}`;
};

const renderPills = (items) =>
  items.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join('');

const renderBullets = (items) =>
  `<ul class="bulletList">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('')}</ul>`;

const renderSectionHeading = (index, title) => `
  <header class="sectionHeading revealItem">
    <span class="sectionIndex">${String(index).padStart(2, '0')}</span>
    <h2 class="sectionTitle">${escapeHtml(title)}</h2>
    <span class="sectionRule" aria-hidden="true"></span>
  </header>`;

/** Mirrors ZigZagBlock.jsx: even index = body left, odd = body right. */
const renderZigZag = (index, asideHtml, bodyHtml) => {
  const isRightAligned = index % 2 === 1;
  const alignmentClass = isRightAligned ? 'alignRight' : 'alignLeft';
  const bodyReveal = isRightAligned ? 'fromRight' : 'fromLeft';
  const asideReveal = isRightAligned ? 'fromLeft' : 'fromRight';

  return `
    <div class="zigZagBlock ${alignmentClass}">
      <div class="zigZagBody revealItem ${bodyReveal}">${bodyHtml}</div>
      <div class="zigZagAside revealItem ${asideReveal}">${asideHtml}</div>
      <span class="zigZagConnector" aria-hidden="true"></span>
    </div>`;
};

const iconMarkup = {
  sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  gitHub:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/></svg>',
  mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  phone:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  linkedIn:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.8A6 6 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  download:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/></svg>',
  arrowRight:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  location:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>'
};

// --- sections -------------------------------------------------------------

const [firstName, ...remainingNameParts] = portfolioProfile.fullName.split(' ');

const heroHtml = `
<section class="heroSection" id="top">
  <div class="contentShell">
    <p class="heroEyebrow revealItem"><span class="heroStatusDot" aria-hidden="true"></span>Available for engineering &amp; analytics roles</p>
    <h1 class="heroName revealItem">${escapeHtml(firstName)} <span class="heroNameAccent">${escapeHtml(remainingNameParts.join(' '))}</span></h1>
    <p class="heroHeadline revealItem">${escapeHtml(portfolioProfile.headline)}</p>
    <div class="heroDisciplines revealItem">${renderPills(portfolioProfile.disciplines)}</div>
    <div class="heroActions revealItem">
      <a class="buttonPrimary" href="#projects">View my work ${iconMarkup.arrowRight}</a>
      <a class="buttonGhost" href="#contact">${iconMarkup.download} Request résumé</a>
      <a class="buttonGhost" href="${escapeHtml(portfolioProfile.mailToLink)}">${iconMarkup.mail} Get in touch</a>
    </div>
    <div class="heroMeta revealItem">
      <span style="display:inline-flex;align-items:center;gap:.4rem">${iconMarkup.location}${escapeHtml(portfolioProfile.location)}</span>
      ${portfolioProfile.currentRole ? `<span>Currently — ${escapeHtml(portfolioProfile.currentRole.title)} @ ${escapeHtml(portfolioProfile.currentRole.organization)}</span>` : ''}
    </div>
  </div>
  <div class="scrollCue" aria-hidden="true"><span>Scroll</span><span class="scrollCueTrack"></span></div>
</section>`;

const summaryStats = [
  { value: `${portfolioProfile.allSkills.length}+`, label: 'Technologies worked in' },
  { value: `${portfolioProfile.projects.length}`, label: 'Shipped technical projects' },
  { value: 'B.A.Sc.', label: 'Information Management' }
];

const aboutHtml = (index) => `
<section class="pageSection" id="about">
  <div class="contentShell">
    ${renderSectionHeading(index, 'About')}
    <div class="aboutGrid">
      <div class="revealItem fromLeft">
        <p class="aboutLead">I work at the seam between data and software — where a report stops being a spreadsheet and starts being a system.</p>
        <p class="aboutBody">${escapeHtml(portfolioProfile.summary)}</p>
      </div>
      <div class="statStack revealItem fromRight">
        ${summaryStats
          .map(
            (stat) =>
              `<div class="statCard"><div class="statValue">${escapeHtml(stat.value)}</div><div class="statLabel">${escapeHtml(stat.label)}</div></div>`
          )
          .join('')}
      </div>
    </div>
  </div>
</section>`;

const skillsHtml = (index) => `
<section class="pageSection" id="skills">
  <div class="contentShell">
    ${renderSectionHeading(index, 'Technical Skills')}
    <div class="skillGrid">
      ${portfolioProfile.skillGroups
        .map(
          (group) => `
        <article class="card revealItem">
          <h3 class="skillGroupTitle">${escapeHtml(group.title)}</h3>
          <ul class="skillList">${group.skills.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
        </article>`
        )
        .join('')}
    </div>
  </div>
</section>`;

const experienceHtml = (index) => `
<section class="pageSection" id="experience">
  <div class="contentShell">
    ${renderSectionHeading(index, 'Experience')}
    ${portfolioProfile.experiences
      .map((experience, experienceIndex) =>
        renderZigZag(
          experienceIndex,
          `<div>
             <div class="cardMeta">${escapeHtml(experience.dateRange)}</div>
             <h3 class="cardTitle" style="margin-top:.35rem">${escapeHtml(experience.organization)}</h3>
             ${experience.isCurrent ? '<span class="credentialBadge" style="margin-top:.6rem">Current</span>' : ''}
           </div>`,
          `<article class="card">
             <h3 class="cardTitle">${escapeHtml(experience.title)}</h3>
             <p class="cardSubtitle">${escapeHtml(experience.organization)}</p>
             ${renderBullets(experience.highlights)}
             ${experience.tags.length ? `<div class="tagRow" style="margin-top:1.25rem">${renderPills(experience.tags)}</div>` : ''}
           </article>`
        )
      )
      .join('')}
  </div>
</section>`;

const projectsHtml = (index) => `
<section class="pageSection" id="projects">
  <div class="contentShell">
    ${renderSectionHeading(index, 'Technical Projects')}
    ${portfolioProfile.projects
      .map((project, projectIndex) =>
        renderZigZag(
          projectIndex + 1,
          `<div>
             <div class="cardMeta">${escapeHtml(project.subtitle)}</div>
             <div class="statValue" style="margin-top:.35rem">${String(projectIndex + 1).padStart(2, '0')}</div>
             ${project.isFeatured ? '<span class="credentialBadge" style="margin-top:.6rem">Featured</span>' : ''}
             <div class="tagRow" style="margin-top:.75rem">${renderPills(project.techStack)}</div>
           </div>`,
          `<article class="card">
             <h3 class="cardTitle">${escapeHtml(project.title)}</h3>
             <p class="cardSubtitle">${escapeHtml(project.subtitle)}</p>
             <p class="cardBody">${escapeHtml(project.summary)}</p>
             ${renderBullets(project.highlights)}
             ${
               project.hasRepo || project.hasLiveLink || project.showsSourceNote
                 ? `<div class="projectLinks">
                      ${project.hasRepo ? `<a class="buttonGhost" href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noreferrer noopener">${iconMarkup.gitHub} View source</a>` : ''}
                      ${project.hasLiveLink ? `<a class="buttonGhost" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(project.liveLabel)} ${iconMarkup.arrowRight}</a>` : ''}
                      ${project.showsSourceNote ? `<span class="sourceNote">${escapeHtml(project.sourceNote)}</span>` : ''}
                    </div>`
                 : ''
             }
           </article>`
        )
      )
      .join('')}
  </div>
</section>`;

const renderCredentialCard = (credential) => `
  <article class="card revealItem">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem">
      <h3 class="cardTitle">${escapeHtml(credential.title)}</h3>
      <span class="credentialBadge">${escapeHtml(credential.statusLabel)}</span>
    </div>
    <p class="cardSubtitle">${escapeHtml(credential.issuer)}</p>
    ${credential.detail ? `<p class="cardBody">${escapeHtml(credential.detail)}</p>` : ''}
    <p class="cardMeta" style="margin-top:1rem">${escapeHtml(credential.year)}</p>
  </article>`;

const credentialsHtml = (index) => `
<section class="pageSection" id="credentials">
  <div class="contentShell">
    ${renderSectionHeading(index, 'Education & Certifications')}
    <div class="credentialGrid">
      ${portfolioProfile.education.map(renderCredentialCard).join('')}
      ${portfolioProfile.certifications.map(renderCredentialCard).join('')}
    </div>
  </div>
</section>`;

const contactChannels = [
  { icon: iconMarkup.mail, label: portfolioProfile.email, href: portfolioProfile.mailToLink },
  {
    icon: iconMarkup.linkedIn,
    label: 'linkedin.com/in/taylor-burks',
    href: portfolioProfile.linkedInUrl
  }
];

const contactHtml = (index) => `
<section class="pageSection" id="contact">
  <div class="contentShell">
    ${renderSectionHeading(index, 'Get In Touch')}
    <div class="contactGrid">
      <div class="revealItem fromLeft">
        <p class="aboutLead">Open to roles in database engineering, data analytics, and .NET development — and always happy to talk shop.</p>
        <p class="aboutBody" style="margin-top:.75rem">Send a message and my full résumé becomes available to download right here.</p>
        <div class="contactChannels">
          ${contactChannels
            .map(
              (channel) =>
                `<a class="contactChannel" href="${escapeHtml(channel.href)}"${channel.href.startsWith('http') ? ' target="_blank" rel="noreferrer noopener"' : ''}>${channel.icon}<span>${escapeHtml(channel.label)}</span></a>`
            )
            .join('')}
        </div>
      </div>
      <form class="contactForm revealItem fromRight" id="contactForm"${contactFormEndpoint ? ` data-endpoint="${escapeHtml(contactFormEndpoint)}"` : ''}>
        <div class="formField"><label class="formLabel" for="contactName">Name</label><input class="formInput" id="contactName" name="name" type="text" required autocomplete="name" placeholder="Your name"></div>
        <div class="formField"><label class="formLabel" for="contactEmail">Email</label><input class="formInput" id="contactEmail" name="email" type="email" required autocomplete="email" placeholder="you@company.com"></div>
        <div class="formField"><label class="formLabel" for="contactMessage">Message</label><textarea class="formTextarea" id="contactMessage" name="message" required placeholder="What would you like to talk about?"></textarea></div>
        <div aria-live="polite" id="contactStatus"></div>
        <button class="buttonPrimary" type="submit"${contactFormEndpoint ? '' : ' disabled'} style="justify-self:start">Send message ${iconMarkup.arrowRight}</button>
        ${contactFormEndpoint ? '' : '<p class="formHint">Form delivery isn’t configured yet — use the email link.</p>'}
      </form>
    </div>
  </div>
</section>`;

const sectionRenderers = {
  about: aboutHtml,
  skills: skillsHtml,
  experience: experienceHtml,
  projects: projectsHtml,
  credentials: credentialsHtml,
  contact: contactHtml
};

const bodyHtml = `
<a class="skipLink" href="#about">Skip to main content</a>

<header class="siteHeader" id="siteHeader">
  <div class="contentShell siteHeaderInner">
    <a class="headerMark" href="#top">
      <span class="headerMarkInitials">${escapeHtml(portfolioProfile.initials)}</span>
      <span>${escapeHtml(portfolioProfile.fullName.toUpperCase())}</span>
    </a>
    <nav class="headerNav" aria-label="Section navigation">
      ${navigationSections
        .map((s) => `<a href="#${s.id}" class="headerNavLink" data-navFor="${s.id}">${escapeHtml(s.label)}</a>`)
        .join('')}
    </nav>
    <div class="headerActions">
      <a class="iconButton" href="${escapeHtml(portfolioProfile.gitHubUrl)}" target="_blank" rel="noreferrer noopener" aria-label="GitHub profile">${iconMarkup.gitHub}</a>
      <button class="iconButton" id="themeToggle" type="button" aria-label="Toggle theme">${iconMarkup.sun}</button>
    </div>
  </div>
</header>

<div class="progressRail" aria-hidden="true" id="progressRail">
  <div class="progressRailFill" id="progressRailFill"></div>
  ${navigationSections
    .map(
      (s, i) =>
        `<span class="progressRailMarker" data-markerFor="${s.id}" style="top:${(i / Math.max(1, navigationSections.length - 1)) * 100}%"></span>`
    )
    .join('')}
</div>

<main>
  ${heroHtml}
  ${navigationSections
    .map((section, sectionIndex) => sectionRenderers[section.id]?.(sectionIndex + 1) ?? '')
    .join('')}
</main>

<footer class="siteFooter">
  <div class="contentShell siteFooterInner">
    <span>© ${new Date().getFullYear()} ${escapeHtml(portfolioProfile.fullName)} · Built with React &amp; Vite</span>
    <nav class="footerLinks" aria-label="Footer links">
      <a href="${escapeHtml(portfolioProfile.linkedInUrl)}" target="_blank" rel="noreferrer noopener">LinkedIn</a>
      <a href="${escapeHtml(portfolioProfile.gitHubUrl)}" target="_blank" rel="noreferrer noopener">GitHub</a>
      <a href="${escapeHtml(portfolioProfile.mailToLink)}">Email</a>
      <a href="#top">Back to top</a>
    </nav>
  </div>
</footer>`;

/** Vanilla equivalents of the four React hooks. */
const runtimeScript = `
(function () {
  var sunIcon = ${JSON.stringify(iconMarkup.sun)};
  var moonIcon = ${JSON.stringify(iconMarkup.moon)};
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- reveal on scroll (useRevealOnScroll) ---
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll('.revealItem'));
  if (prefersReducedMotion) {
    revealTargets.forEach(function (el) { el.classList.add('isVisible'); });
  } else {
    document.querySelectorAll('.pageSection, .heroSection').forEach(function (section) {
      var items = Array.prototype.slice.call(section.querySelectorAll('.revealItem'));
      items.forEach(function (el, i) {
        el.style.setProperty('--revealDelay', Math.min(i, 6) * 80 + 'ms');
      });
    });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('isVisible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
    // Hero is already on screen; reveal it on a timer instead.
    setTimeout(function () {
      document.querySelectorAll('.heroSection .revealItem').forEach(function (el, i) {
        el.style.setProperty('--revealDelay', i * 90 + 'ms');
        el.classList.add('isVisible');
      });
    }, 90);
  }

  // --- scroll progress (useScrollProgress) + header state ---
  var railFill = document.getElementById('progressRailFill');
  var siteHeader = document.getElementById('siteHeader');
  var isTicking = false;
  function measureProgress() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollable <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));
    if (railFill) railFill.style.height = progress + '%';
    if (siteHeader) siteHeader.classList.toggle('isScrolled', window.scrollY > 40);
    isTicking = false;
  }
  function onScroll() {
    if (isTicking) return;
    isTicking = true;
    window.requestAnimationFrame(measureProgress);
  }
  measureProgress();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // --- active section (useActiveSection) ---
  var sectionIds = ${JSON.stringify(navigationSections.map((s) => s.id))};
  var sectionObserver = new IntersectionObserver(function (entries) {
    var visible = entries.filter(function (e) { return e.isIntersecting; })[0];
    if (!visible) return;
    var activeId = visible.target.id;
    document.querySelectorAll('[data-navFor]').forEach(function (link) {
      link.classList.toggle('isActive', link.getAttribute('data-navFor') === activeId);
    });
    document.querySelectorAll('[data-markerFor]').forEach(function (marker) {
      marker.classList.toggle('isActive', marker.getAttribute('data-markerFor') === activeId);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sectionIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  // --- contact form (mirrors ContactSection.jsx) ---
  var contactForm = document.getElementById('contactForm');
  var contactStatus = document.getElementById('contactStatus');
  if (contactForm && contactForm.dataset.endpoint) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      contactStatus.innerHTML = '';

      fetch(contactForm.dataset.endpoint, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Form submission failed');
          contactForm.reset();
          // Reveal the résumé link only on a successful submission.
          contactStatus.innerHTML =
            '<div class="resumeUnlock">' +
            '<p class="formStatus isSuccess">Thanks — your message is on its way.</p>' +
            '<a class="buttonPrimary" style="margin-top:.75rem" download href="' +
            ${JSON.stringify(portfolioProfile.resumeUrl)} +
            '">Download my résumé</a>' +
            '</div>';
        })
        .catch(function () {
          contactStatus.innerHTML =
            '<p class="formStatus isError">Something went wrong. Email me directly at ' +
            ${JSON.stringify(portfolioProfile.email)} +
            '.</p>';
        })
        .then(function () {
          submitButton.disabled = false;
        });
    });
  }

  // --- theme toggle (useThemeController) ---
  var themeToggle = document.getElementById('themeToggle');
  function syncToggleIcon() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (themeToggle) themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
  }
  syncToggleIcon();
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('portfolioTheme', next); } catch (e) {}
      syncToggleIcon();
    });
  }
})();`;

const documentHtml = `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="dark light">
<title>${escapeHtml(portfolioProfile.fullName)} — Database &amp; Software Engineering</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script>
(function(){try{var t=localStorage.getItem('portfolioTheme');var l=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.setAttribute('data-theme',t||(l?'light':'dark'));}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();
</script>
<style>
${readStylesheets()}
</style>
</head>
<body>
${bodyHtml}
<script>
${runtimeScript}
</script>
</body>
</html>`;

const outputPath = path.join(projectRoot, 'preview.html');
fs.writeFileSync(outputPath, documentHtml, 'utf8');
console.log(
  `Wrote ${path.relative(projectRoot, outputPath)} (${(documentHtml.length / 1024).toFixed(1)} kB)`
);
