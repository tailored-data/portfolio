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
      title: 'RuneLite Plugin',
      subtitle: 'Open-Source Contribution',
      summary:
        'Authored and published a game-client plugin through the open-source RuneLite ecosystem, taking it from local build to public release.',
      techStack: ['Java', 'Gradle', 'Open Source'],
      highlights: [
        'Diagnosed and resolved Gradle build and resource-packaging issues blocking the release.',
        'Navigated an external maintainer review process to ship to production users.'
      ],
      repoUrl: null,
      sourceNote: 'Source available on request'
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

/**
 * Research posts — newest first.
 *
 * Ground rule for this section: every post traces back to something Taylor
 * actually read, built, or lived. `isPersonalObservation: true` marks the
 * ones drawn from first-hand experience rather than outside reporting, so
 * the absence of citations is stated rather than glossed over.
 */
export const researchPosts = [
  new ResearchPost({
    title: 'Anyone Can Download a Frontier Model. It Took Me About Four Minutes.',
    publishedOn: '2026-08-18',
    summary:
      'Open-weight model hubs quietly became real infrastructure. Quantization is what made them usable on hardware people actually own — and the governance conversation has not caught up with either fact.',
    tags: ['Open Weights', 'Quantization', 'Local Inference', 'Governance'],
    isPersonalObservation: true,
    body: [
      {
        type: 'p',
        text: 'I built a self-hosted inference stack this year — Ollama on Windows, Docker under WSL2, GPU passed through to the container. The part I expected to be hard was the passthrough. The part that actually stopped me was how little friction there was in getting the models.'
      },
      {
        type: 'p',
        text: 'No account. No key. No terms-of-use checkbox. One pull command and a few gigabytes later I had a capable model running entirely on my own machine, disconnected from any vendor, answering to nobody. That is not a loophole — that is the design working exactly as intended.'
      },
      {
        type: 'aside',
        text: 'Sat there for a second after the first response came back. Not because it was impressive. Because of how ordinary it felt.'
      },
      {
        type: 'p',
        text: 'The thing that made this possible is not the hub itself. It is quantization. A model published at full precision is essentially unusable outside a datacenter — you are looking at multiple high-end accelerators before you can load the weights, never mind run them. Quantization reduces the numeric precision of those weights, and a community of people who mostly are not paid to do this converts and republishes them at 8-bit, 5-bit, 4-bit, and lower.'
      },
      {
        type: 'p',
        text: 'The practical effect is enormous. A model that needed something like 140 GB of VRAM at full precision fits in roughly 40 GB at 4-bit. That is the difference between "cloud only" and "runs on the GPU already in my desk." You lose some quality, and the loss is not linear — the drop from 8-bit to 5-bit is often barely perceptible for ordinary tasks, while the drop below 4-bit degrades quickly and unpredictably. Tuning the quantization level against available VRAM turned out to be the single most consequential decision in my whole setup.'
      },
      {
        type: 'p',
        text: 'So that is the infrastructure story: a distribution layer plus a volunteer conversion pipeline turned frontier research into something a person can run in a spare room. As infrastructure, it is genuinely impressive. It is also the reason independent research, reproducibility work, and safety auditing by anyone outside a handful of labs is possible at all. If the only people who can examine these systems are the people who build them, you do not really have oversight — you have press releases.'
      },
      {
        type: 'p',
        text: 'And here is where I have to be honest rather than tidy. The same absence of a gate that makes independent scrutiny possible also means no one is checking anything at the door. Weights that have had their safety training stripped out sit alongside the originals, labelled plainly, downloadable by anyone. Model cards are self-reported and inconsistently filled in. Provenance is frequently unclear — you are often trusting that an anonymous uploader converted the weights faithfully and did not alter anything else along the way.'
      },
      {
        type: 'aside',
        text: 'I keep trying to land somewhere clean on this and I cannot. Every time I argue myself toward "this should be gated," I run straight into the fact that gating it hands the entire audit function back to the people being audited.'
      },
      {
        type: 'p',
        text: 'The framing I have settled on, at least for now: openness is not the ethical problem, and it is not the ethical solution either. It is a structural choice with real costs on both sides of the ledger. Closing distribution concentrates power and eliminates outside verification. Leaving it open accepts that some fraction of downloads are people deliberately removing guardrails. Anyone claiming this trade is obvious in either direction is not looking at it very hard.'
      },
      {
        type: 'p',
        text: 'What I do think is unambiguous: the verification layer is missing. Signed provenance, reproducible conversion, some way to confirm that a quantized artifact derives from the weights it claims to derive from — none of that requires closing anything, and all of it would meaningfully reduce the risk surface. That gap seems like the actual unsolved problem, and it is a boring infrastructure problem rather than a philosophical one.'
      },
      {
        type: 'aside',
        text: 'Writing that down mostly so I can check in a year whether I still believe it.'
      }
    ]
  }),

  new ResearchPost({
    title: 'What the Job Search Is Actually Telling Me',
    publishedOn: '2026-08-20',
    summary:
      'Treating my own application data as evidence rather than as a verdict. A hypothesis about where AI pressure is landing in technical hiring, and what I am changing in response.',
    tags: ['Hiring', 'AI & Work', 'Career'],
    isPersonalObservation: true,
    body: [
      {
        type: 'p',
        text: 'I have submitted a lot of applications this year. Across Florida, into neighboring states, and a wide net of remote roles. The response rate has been poor enough that at some point it stopped feeling like noise and started feeling like signal.'
      },
      {
        type: 'aside',
        text: 'Writing this publicly is a slightly odd decision and I know it. But pretending the search is going great would be a worse one, and I would rather be the person who examined it than the person who performed confidence.'
      },
      {
        type: 'p',
        text: 'So let me treat it as data instead of as a verdict.'
      },
      {
        type: 'p',
        text: 'The hypothesis: the roles absorbing the most pressure right now are exactly the ones I have been applying to. Junior-to-mid technical work where the deliverable is well-specified and the value is in execution rather than in deciding what to execute. Write this report. Clean this dataset. Wire this endpoint. That work has not disappeared, but the number of people needed to do it has compressed, and the roles that remain are drawing applicants who used to be a tier above them.'
      },
      {
        type: 'p',
        text: 'What has not compressed, as far as I can tell, is the work of deciding what should be built, owning something end to end, and being accountable when it breaks at 2am. That is not because those things are magic. It is because they require carrying context that nobody has written down anywhere.'
      },
      {
        type: 'p',
        text: 'I am aware of how convenient this hypothesis is. It explains my results without requiring me to conclude I am the problem, which is exactly the kind of explanation a person reaches for when they are frustrated. So I am holding it loosely, and I am checking it against the alternative — that my materials were not making a strong enough case and the market was reading them correctly.'
      },
      {
        type: 'aside',
        text: 'Uncomfortable to type. Probably at least partly true. Both things can be.'
      },
      {
        type: 'p',
        text: 'Either way the response is the same, which is what makes me think it is the right one: build things that exist, and make them impossible to overlook. A remote desktop application written from scratch over raw TCP, where I had to design my own message framing because the stream kept desynchronizing. A game mod shipped to a public workshop with real users filing real bug reports. Power BI reporting at work that surfaced bottlenecks nobody had asked me to go looking for.'
      },
      {
        type: 'p',
        text: 'None of that is work anyone assigned me. That is the entire point. A résumé bullet asserts that I can do something; a thing running on someone else\'s machine demonstrates it. In a market where the assertions have gotten cheap and abundant, demonstration is most of what is left.'
      },
      {
        type: 'p',
        text: 'This site is part of that argument, incidentally. It is not a template. Someone can open the repository and read exactly how it is put together.'
      },
      {
        type: 'aside',
        text: 'Revisiting this post in six months. Either the hypothesis holds up, or I was rationalizing, and I would genuinely like to know which.'
      }
    ]
  })
];

/**
 * Nav model. Order here defines both the header links and the vertical
 * order of sections on the page, so the two can never drift apart.
 */
export const navigationSections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' }
];

/**
 * Contact form endpoint (Formspree).
 *
 * Safe to commit publicly — it's a submission address, not a credential.
 * Left null, the contact form degrades gracefully to the mailto: link.
 */
export const contactFormEndpoint = 'https://formspree.io/f/meajeerp';
