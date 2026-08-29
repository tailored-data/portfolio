import {
  PortfolioProfile,
  ExperienceEntry,
  ProjectEntry,
  SkillGroup,
  Credential,
  ResearchPost
} from '../models/portfolioModels.js';

/**
 * Single source of truth for every word on the site.
 * Edit here — never in the components.
 */
export const portfolioProfile = new PortfolioProfile({
  fullName: 'Taylor Burks',
  headline: 'I build the systems that turn data into decisions.',
  disciplines: ['Database Engineering', 'Data Analytics', 'Software Engineering'],
  location: 'Crystal River, FL',
  email: 'taylorburks@me.com',
  // Phone is deliberately NOT stored here. Anything in this file is compiled
  // into the public JS bundle and committed to the repo, so "not rendered"
  // would not mean "not published". It lives only inside the résumé PDF.
  linkedInUrl: 'https://www.linkedin.com/in/taylor-burks/',

  gitHubUrl: 'https://github.com/tailored-data',

  // Random suffix, not decoration: scrapers probe predictable paths such as
  // /resume.pdf or /cv.pdf. An unguessable name means the file is only
  // reachable via the link revealed after a successful form submission.
  resumeFileName: 'TaylorBurks-Resume-f6eb4c7aebd92a8b.pdf',

  summary:
    'Information Management professional with a foundation in database administration and data analytics. I pair hands-on SQL and Power BI reporting with self-directed software engineering in C#/.NET — designing and shipping reliable systems end to end, from data pipelines and reporting through to networked desktop applications and containerized infrastructure.',

  skillGroups: [
    new SkillGroup({
      title: 'Languages',
      skills: ['C#', 'SQL (T-SQL)', 'Python', 'Java', 'GDScript', 'JavaScript']
    }),
    new SkillGroup({
      title: 'Data & BI',
      skills: [
        'Power BI',
        'SQL Server',
        'Relational database design',
        'Data analytics & reporting'
      ]
    }),
    new SkillGroup({
      title: 'Platforms',
      skills: ['.NET 8', 'Docker', 'WSL2', 'Microsoft Azure', 'Godot 4']
    }),
    new SkillGroup({
      title: 'Engineering',
      skills: [
        'TCP/IP socket programming',
        'REST APIs',
        'Git',
        'Gradle',
        'Audit logging',
        'Network hardening'
      ]
    })
  ],

  experiences: [
    new ExperienceEntry({
      title: 'Student Finance Advisor',
      organization: 'Ultimate Medical Academy',
      startDate: 'Sep 2023',
      endDate: null,
      tags: ['Power BI', 'Reporting', 'Process Analysis'],
      highlights: [
        'Build and maintain Power BI reports tracking student financial aid status, surfacing process bottlenecks and prioritizing follow-up across a high-volume caseload.',
        'Manage financial aid completion workflows, advancing student files through quality-assurance review to verified completion.',
        'Translate complex regulatory requirements into clear, actionable next steps for students.'
      ]
    }),
    new ExperienceEntry({
      title: 'Technical Support Analyst — Tier 2',
      organization: 'Jonas Software',
      startDate: 'Aug 2021',
      endDate: 'Jul 2022',
      tags: ['Cloud CRM', 'Networking', 'Cybersecurity'],
      highlights: [
        'Delivered Tier 2 support for on-premises devices and a cloud-based property-management CRM, resolving escalated issues across phone, web, email, and live chat.',
        'Applied cybersecurity patches and configured networking on newly provisioned client devices.',
        'Configured and troubleshot point-of-sale credit-card terminal hardware at the terminal level.'
      ]
    }),
    new ExperienceEntry({
      title: 'Inventory Controller',
      organization: 'Microsoft Corporation',
      startDate: 'Jun 2016',
      endDate: 'Jul 2019',
      tags: ['Asset Tracking', 'Hardware Deployment'],
      highlights: [
        'Managed inventory and shipping/receiving of electronic equipment, reducing shrinkage through tighter tracking and process controls.',
        'Provided technical support for demo devices and assisted in the deployment of new hardware.'
      ]
    })
  ],

  projects: [
    // Listed first deliberately: it's the only project a stranger can install
    // and use today, and the only one with a public release. For a portfolio,
    // "you can go try this right now" outranks everything else.
    new ProjectEntry({
      title: 'Upload Labs — Node Pins',
      subtitle: 'Published Game Mod',
      summary:
        'A gameplay mod for the Steam title Upload Labs, built on the Godot Mod Loader and shipped to the Steam Workshop. Adds pinnable, fully interactive live views of off-screen nodes, unlocked through the game’s own upgrade economy.',
      techStack: ['GDScript', 'Godot 4', 'Godot Mod Loader', 'Steam Workshop'],
      highlights: [
        'Renders live views of distant nodes through SubViewports that share the game world, remapping every click and connection-drag back through each pin’s camera into world space so the pinned node stays genuinely interactive.',
        'Extends the game’s scripts rather than patching scene files, so installing and uninstalling never touches game data and saves stay loadable in both directions.',
        'Diagnosed a packaging failure where PowerShell’s Compress-Archive writes backslash paths that Godot’s ZIP reader cannot resolve; wrote a build script emitting forward-slash entries to produce loader-compatible archives.',
        'Published to the Steam Workshop and as versioned GitHub releases, with player-facing installation and configuration docs.'
      ],
      repoUrl: 'https://github.com/tailored-data/upload-labs-node-pins',
      liveUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3760233672',
      liveLabel: 'Steam Workshop',
      isFeatured: true
    }),
    new ProjectEntry({
      title: 'TDRemoteAssist',
      subtitle: 'Remote Desktop Application',
      summary:
        'A commercial-grade remote desktop control application built from scratch on a networked Agent/Client architecture over raw TCP.',
      techStack: ['C#', '.NET 8', 'TCP/IP', 'WinForms'],
      highlights: [
        'Designed a custom magic-number message framing protocol to eliminate stream-deserialization failures across the socket boundary.',
        'Separated agent and client responsibilities so the same transport layer serves both ends of the connection.'
      ],
      repoUrl: null,
      sourceNote: 'Source available on request'
    }),
    new ProjectEntry({
      title: 'Local AI Inference Platform',
      subtitle: 'Self-Hosted LLM Infrastructure',
      summary:
        'A self-hosted large language model stack running on Windows, with GPU acceleration passed through to a Linux container runtime.',
      techStack: ['Ollama', 'Docker', 'WSL2', 'GPU Passthrough'],
      highlights: [
        'Hardened the deployment with LAN isolation and loopback-only firewall binding so no inference endpoint is externally reachable.',
        'Tuned quantized model selection against GPU VRAM constraints to maximize throughput on available hardware.'
      ],
      repoUrl: null
    }),
    new ProjectEntry({
      title: 'Character Stats',
      subtitle: 'Open-Source Contribution',
      summary:
        'Authored and published a game-client plugin through the open-source RuneLite ecosystem, taking it from local build to public release.',
      techStack: ['Java', 'Gradle', 'Open Source'],
      highlights: [
        'Diagnosed and resolved Gradle build and resource-packaging issues blocking the release.',
        'Navigated an external maintainer review process to ship to production users.'
      ],
      repoUrl: 'https://github.com/tailored-data/OSRSCharacterStatsDisplays',
      liveUrl: 'https://runelite.net/plugin-hub/show/character-stats',
      liveLabel: 'Plugin Hub'
    })
  ],

  education: [
    new Credential({
      title: 'B.A.Sc., Information Management',
      issuer: 'Palm Beach State College',
      year: '2023',
      detail: 'Database Administration & Data Analytics — CIP Code 11.1005'
    })
  ],

  certifications: [
    new Credential({
      title: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft',
      year: 'AZ-900',
      detail: 'Cloud concepts, Azure services, security, and governance.',
      status: 'earned'
    })
  ]
});
