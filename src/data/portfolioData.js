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
    title: 'The Bottleneck Was Never the GPU',
    publishedOn: '2026-08-25',
    summary:
      'Still tracking unlocked model releases. This month I tried wiring a local Ollama model into Claude Code through LiteLLM, and got stuck — not on the tooling, but on my own reluctance to touch a config that already works.',
    tags: ['Local Inference', 'LiteLLM', 'Ollama', 'Open Weights'],
    sources: [
      {
        label: 'OBLITERATUS/Qwen3.8-27B-OBLITERATED · Hugging Face',
        url: 'https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED'
      },
      { label: 'Getting Started | liteLLM', url: 'https://docs.litellm.ai/docs/' }
    ],
    body: [
      {
        type: 'p',
        text: 'Same thread as last time, different upload: OBLITERATUS/Qwen3.8-27B-OBLITERATED on Hugging Face. I didn’t run it, just read the model card. Someone stripped the safety training out of a Qwen model and posted it, plainly labeled, for anyone with the hardware to pull. I’m past being surprised by any single one of these. What’s interesting now is how routine it’s become.'
      },
      {
        type: 'p',
        text: 'The actual project this month was trying to get LiteLLM working as a bridge between a local Ollama model and Claude Code. The idea is simple: point Claude Code’s API endpoint at LiteLLM, have LiteLLM proxy that over to Ollama, and run requests through my own hardware instead of a subscription.'
      },
      {
        type: 'p',
        text: 'I got stuck. Not on the LiteLLM docs — they’re clear enough. I got stuck on myself.'
      },
      {
        type: 'aside',
        text: 'I open the config, read it twice, and close the laptop. That’s not a technical problem.'
      },
      {
        type: 'p',
        text: 'Claude Code already works. It’s the thing I use every day, and it works well. Touching the endpoint config means touching something that doesn’t currently need touching, and the part of my brain that remembers past mistakes keeps asking what happens if I set something globally instead of locally, or forget an endpoint is pointed somewhere strange six months from now. The fix is probably to test it in an isolated profile and stop overthinking it. Knowing that and doing it are two different muscles.'
      },
      {
        type: 'p',
        text: 'While I was stuck there, I went down a separate hole researching whether I should upgrade my hardware to make local inference smoother. Spent a while on it before landing on the obvious answer: I don’t need to. What I already have covers anything I’d realistically throw at it.'
      },
      {
        type: 'aside',
        text: 'The bottleneck was never the GPU. Kind of an uncomfortable sentence to write out.'
      }
    ]
  }),
  new ResearchPost({
    title: 'Anyone Can Download a Frontier Model. It Took Me About Four Minutes.',
    publishedOn: '2026-08-18',
    summary:
      'Open-weight model hubs turned into real infrastructure without much fanfare. Quantization is what made them usable on hardware regular people own, and the conversation about governing any of this has not caught up.',
    tags: ['Open Weights', 'Quantization', 'Local Inference', 'Governance'],
    isPersonalObservation: true,
    body: [
      {
        type: 'p',
        text: 'I built a self-hosted inference stack this year — Ollama on Windows, Docker running under WSL2, GPU passed through to the container. I figured the GPU passthrough would be the hard part. It wasn’t. What actually stopped me was how easy it was to get the models themselves.'
      },
      {
        type: 'p',
        text: 'No account, no key, no terms-of-use box to check. I ran one pull command, waited on a few gigabytes, and had a capable model running on my own machine — not talking to any vendor, not answering to anyone. That’s just how it’s built to work.'
      },
      {
        type: 'aside',
        text: 'Sat there for a second after the first response came back. Not because it impressed me. Because of how normal it felt.'
      },
      {
        type: 'p',
        text: 'The hub isn’t really what made this possible — quantization is. A model at full precision is basically unusable outside a datacenter; you’d need multiple high-end accelerators just to load the weights, let alone run them. Quantization cuts down the numeric precision of those weights, and there’s a whole community of mostly unpaid people converting and reposting them at 8-bit, 5-bit, 4-bit, sometimes lower.'
      },
      {
        type: 'p',
        text: 'The effect is huge. A model that needs around 140 GB of VRAM at full precision fits into roughly 40 GB at 4-bit. That’s the gap between "only runs in the cloud" and "runs on the GPU already sitting on my desk." You lose some quality doing this, and it’s not a straight line down — going from 8-bit to 5-bit you can barely tell, but push below 4-bit and it falls apart fast. Picking the right quantization level for my VRAM ended up mattering more than anything else in the setup.'
      },
      {
        type: 'p',
        text: 'A distribution layer plus a bunch of volunteers converting models — that’s what turned frontier research into something you can run in a spare room. It’s genuinely impressive as infrastructure. It’s also the reason independent research, reproducibility checks, and safety auditing outside a handful of labs are possible at all. If the only people who can look under the hood are the people who built it, that’s not oversight. That’s a press release.'
      },
      {
        type: 'p',
        text: 'But the same lack of a gate that makes outside scrutiny possible also means nothing gets checked on the way in. Models with the safety training stripped out sit right next to the originals, labeled plainly, downloadable by anyone. Model cards are self-reported and half-filled-out more often than not. And you often don’t really know where the weights came from — you’re trusting that whoever uploaded them converted things correctly and didn’t quietly change anything else along the way.'
      },
      {
        type: 'aside',
        text: 'I keep trying to land on a clean answer here and I can’t. Every time I push myself toward "this should be locked down," I run into the fact that locking it down just hands the whole audit job back to the people being audited.'
      },
      {
        type: 'p',
        text: 'Where I land, for now: openness isn’t the problem, and it isn’t the solution either — it’s a trade-off, and both sides cost something real. Lock down distribution and you hand power to a few labs and lose outside verification. Leave it open and you accept that some share of downloads are people ripping the guardrails out on purpose. Anyone who says this trade-off is obviously one way or the other hasn’t actually looked at it.'
      },
      {
        type: 'p',
        text: 'One thing I am sure of: there’s no real verification layer here. Signed provenance, reproducible conversions, some way to confirm a quantized model actually comes from the weights it claims to — none of that requires locking anything down, and it would make the whole thing safer. That gap is the real unsolved problem, and it’s a boring infrastructure problem, not a philosophical one.'
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
      'Treating my own job application results as data instead of a verdict. A theory about where AI pressure is actually landing in technical hiring, and what I’m doing about it.',
    tags: ['Hiring', 'AI & Work', 'Career'],
    isPersonalObservation: true,
    body: [
      {
        type: 'p',
        text: 'I’ve sent out a lot of applications this year — across Florida, into a few neighboring states, and a wide net of remote roles. The response rate has been bad enough that at some point it stopped feeling like noise and started feeling like a signal.'
      },
      {
        type: 'aside',
        text: 'Putting this out publicly is a little strange, I know. But pretending the search is going great would be worse. I’d rather actually look at what’s happening than pretend everything’s fine.'
      },
      {
        type: 'p',
        text: 'So I’m going to treat it as data, not a verdict on me.'
      },
      {
        type: 'p',
        text: 'My guess: the roles under the most pressure right now are exactly the ones I’ve been applying for. Junior-to-mid technical work, where the job is already defined and the value is just doing it, not figuring out what needs doing. Write the report. Clean the dataset. Wire up the endpoint. That work hasn’t gone away, but it takes fewer people to do it now, and the jobs left are pulling in applicants who used to be a level above them.'
      },
      {
        type: 'p',
        text: 'What hasn’t gone away, as far as I can tell, is deciding what to build, owning it end to end, and being the one accountable when it breaks at 2am. That’s not because that work is special or magic. It’s because it depends on context nobody ever writes down.'
      },
      {
        type: 'p',
        text: 'I know how convenient this theory is. It explains the results without me having to consider that I’m the problem, which is exactly the kind of explanation people reach for when they’re frustrated. So I’m not fully trusting it — I’m weighing it against the other option, that my materials just weren’t making a strong enough case and the market was reading them correctly.'
      },
      {
        type: 'aside',
        text: 'Uncomfortable to type. Probably at least partly true. Both things can be.'
      },
      {
        type: 'p',
        text: 'Either way, my response is the same, which tells me it’s probably the right one: build real things and make them hard to ignore. A remote desktop app built from scratch over raw TCP, where I had to design my own message framing because the stream kept breaking. A game mod shipped to a public workshop with actual users filing actual bug reports. Power BI reports at work that surfaced problems nobody asked me to go find.'
      },
      {
        type: 'p',
        text: 'None of that was assigned to me. That’s the point. Anyone can put a skill on a resume. Something running on someone else\'s machine actually proves it. When claims are cheap and everywhere, proof is most of what’s left.'
      },
      {
        type: 'p',
        text: 'This site is part of that too, honestly. It’s not a template — you can open the repo and see exactly how it’s built.'
      },
      {
        type: 'aside',
        text: 'Revisiting this post in six months. Either the theory holds up, or I was rationalizing, and I’d genuinely like to know which.'
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
