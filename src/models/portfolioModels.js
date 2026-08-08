/**
 * Domain models for the portfolio.
 *
 * Why classes instead of plain object literals:
 * every piece of derived presentation logic (slugs, date ranges, whether an
 * entry is current, how a tech stack renders) lives on the model that owns
 * the data. Components stay dumb — they read `entry.dateRange` instead of
 * recomputing a string, and there is exactly one place to change if the
 * format ever needs to.
 */

/**
 * Shared base. Anything rendered as a distinct block on the page gets a
 * stable, URL-safe id derived from its title, which the nav and the
 * IntersectionObserver both key off of.
 */
class PortfolioEntity {
  constructor({ title }) {
    this.title = title;
  }

  get slug() {
    return this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

/** One role in the professional history. */
export class ExperienceEntry extends PortfolioEntity {
  constructor({ title, organization, startDate, endDate, highlights = [], tags = [] }) {
    super({ title });
    this.organization = organization;
    this.startDate = startDate;
    this.endDate = endDate; // null means "still here"
    this.highlights = highlights;
    this.tags = tags;
  }

  get isCurrent() {
    return this.endDate === null;
  }

  get dateRange() {
    return `${this.startDate} — ${this.endDate ?? 'Present'}`;
  }
}

/** A technical project shown in the projects section. */
export class ProjectEntry extends PortfolioEntity {
  constructor({
    title,
    subtitle,
    summary,
    techStack = [],
    highlights = [],
    repoUrl = null,
    liveUrl = null,
    liveLabel = null,
    sourceNote = null,
    isFeatured = false
  }) {
    super({ title });
    this.subtitle = subtitle;
    this.summary = summary;
    this.techStack = techStack;
    this.highlights = highlights;
    this.repoUrl = repoUrl;
    this.liveUrl = liveUrl;
    this.liveLabel = liveLabel;
    // Shown when there is deliberately no public repo. Saying "available on
    // request" reads as a choice; an absent button reads as nothing to show.
    this.sourceNote = sourceNote;
    this.isFeatured = isFeatured;
  }

  get hasRepo() {
    return Boolean(this.repoUrl);
  }

  get hasLiveLink() {
    return Boolean(this.liveUrl);
  }

  /** Only surface the note when it's standing in for a missing repo link. */
  get showsSourceNote() {
    return !this.hasRepo && Boolean(this.sourceNote);
  }

  get primaryTech() {
    return this.techStack[0] ?? null;
  }
}

/** A labeled cluster of skills, e.g. "Data & BI". */
export class SkillGroup extends PortfolioEntity {
  constructor({ title, skills = [] }) {
    super({ title });
    this.skills = skills;
  }

  get skillCount() {
    return this.skills.length;
  }
}

/** A degree or certification. */
export class Credential extends PortfolioEntity {
  constructor({ title, issuer, year, detail = null, status = 'earned' }) {
    super({ title });
    this.issuer = issuer;
    this.year = year;
    this.detail = detail;
    this.status = status; // 'earned' | 'inProgress'
  }

  get isInProgress() {
    return this.status === 'inProgress';
  }

  get statusLabel() {
    return this.isInProgress ? 'In Progress' : 'Certified';
  }
}

/** Aggregate root — the whole portfolio hangs off one instance of this. */
export class PortfolioProfile {
  constructor({
    fullName,
    headline,
    disciplines = [],
    location,
    email,
    linkedInUrl,
    gitHubUrl,
    resumeFileName,
    summary,
    skillGroups = [],
    experiences = [],
    projects = [],
    education = [],
    certifications = []
  }) {
    this.fullName = fullName;
    this.headline = headline;
    this.disciplines = disciplines;
    this.location = location;
    this.email = email;
    this.linkedInUrl = linkedInUrl;
    this.gitHubUrl = gitHubUrl;
    this.resumeFileName = resumeFileName;
    this.summary = summary;
    this.skillGroups = skillGroups;
    this.experiences = experiences;
    this.projects = projects;
    this.education = education;
    this.certifications = certifications;
  }

  get initials() {
    return this.fullName
      .split(/\s+/)
      .map((namePart) => namePart.charAt(0))
      .join('')
      .toUpperCase();
  }

  get mailToLink() {
    return `mailto:${this.email}`;
  }

  /**
   * Vite rewrites BASE_URL per deploy target, so this stays correct everywhere.
   * The fallback lets plain Node import this module (the static preview
   * generator does), where `import.meta.env` doesn't exist.
   */
  get resumeUrl() {
    const basePath = import.meta.env?.BASE_URL ?? './';
    return `${basePath}${this.resumeFileName}`;
  }

  get currentRole() {
    return this.experiences.find((experience) => experience.isCurrent) ?? null;
  }

  get earnedCertifications() {
    return this.certifications.filter((credential) => !credential.isInProgress);
  }

  /** Flat list used by the skills marquee and for a quick keyword scan. */
  get allSkills() {
    return this.skillGroups.flatMap((group) => group.skills);
  }
}
