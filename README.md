# Taylor Burks — Portfolio

Personal portfolio site. React 18 + Vite, plain CSS, no UI framework, no backend, no runtime dependencies beyond React.

**Live:** https://tailored-data.github.io/portfolio/

---

## Running locally

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production bundle into `dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm run verify` | Pre-deploy checks — run before pushing |
| `npm run static` | Regenerate `preview.html` |

---

## Architecture

```
.github/workflows/deploy.yml   builds and publishes to Pages on push to main
public/                        static passthrough
scripts/
  buildStaticPreview.mjs       generates preview.html from the same data
  verifyBuild.mjs              CSS coverage, contrast, personal-data scan
src/
  models/portfolioModels.js    ES6 classes — the shape of the content
  data/portfolioData.js        all content, as class instances
  hooks/                       useRevealOnScroll, useScrollProgress,
                               useActiveSection, useThemeController
  components/                  one file per visual piece
  styles/theme.css             design tokens, both themes
  styles/global.css            layout and component styles
```

**Content and presentation are fully separated.** `portfolioData.js` holds every word on the site; components hold none. Adding a job or project is one entry in that file — no markup, no CSS.

**Derived values live on the model that owns them.** `ExperienceEntry` formats its own date range and knows whether it's current; `ProjectEntry` knows whether it has a repo worth linking. Components read those getters rather than recomputing, so there's exactly one place to change any of it.

**`navigationSections` drives three things at once** — the header links, the progress-rail markers, and the on-page section order. They can't drift apart because they read from the same array.

`preview.html` is generated, not hand-written. It's a fully self-contained single-file build of the same site for viewing without a toolchain. Regenerate with `npm run static` after content changes.

---

## Design notes

**Palette.** Deep navy base for stability and competence — the conventional read for data and infrastructure work. Then exactly one saturated color, cyan, across the entire page. Because nothing else competes for attention, anything cyan registers as "the next thing" without the reader consciously deciding it is.

**Guiding the eye.** Content blocks alternate left and right, so each block's endpoint lands near the next one's entry point and the eye is already traveling in the right direction when the next block arrives. Faint connector arcs bridge the gaps, section numbers signal a finite sequence, and a fixed left rail gives constant peripheral feedback on progress.

**Motion.** Reveals animate `transform` and `opacity` only — both GPU-composited, so they never trigger layout. Everything is disabled under `prefers-reduced-motion`, with content forced to its visible state rather than hidden.

**Themes.** Light and dark are the same token names with different values; no component knows which is active. The light theme uses a darker cyan (`#0e7490`) because the bright one carries 12:1 contrast on navy but under 2:1 on white.

**Accessibility.** Skip link, semantic landmarks, `:focus-visible` rings, `aria-current` on the active nav item, live-region form status, and every text/background pair verified at 4.5:1 or better in both themes. `npm run verify` enforces the contrast floor.

---

## Privacy design

The site is public; some of the content behind it isn't meant to be harvested.

- **No phone number anywhere in source or build output.** It exists only inside the résumé PDF. `npm run verify` scans every source file and build artifact for phone-shaped strings and fails the build if one appears — including in the verify script itself.
- **The résumé is gated behind the contact form.** The hero links to the contact section rather than the file; the download link is rendered only after a successful submission.
- **The PDF has a random filename.** Scrapers probe predictable paths like `/resume.pdf`. An unguessable name means the file isn't discoverable by crawling.

Client-side gating stops automated scraping, not determined people — the file is still served over HTTP and this repo is public. It's a deliberate trade, not an oversight.

---

## Common edits

**Add a job** — append an `ExperienceEntry` to `experiences`. It slots into the alternating layout automatically based on position.

**Add a project** — append a `ProjectEntry` to `projects`. Set `repoUrl` for a source button, `liveUrl` + `liveLabel` for a second link, `sourceNote` for a "source on request" tag when there's deliberately no public repo, `isFeatured` for the badge.

**Add a certification** — append a `Credential` to `certifications`. `status: 'inProgress'` renders the "In Progress" badge.

**Change the accent** — edit `--colorAccent` in `src/styles/theme.css`, once per theme block. Run `npm run verify` afterward; it will fail if the new color drops below 4.5:1.

**Replace the résumé** — drop the new PDF in `public/` with a fresh random suffix, update `resumeFileName` in `portfolioData.js`, and delete the old file. `npm run verify` checks the two agree.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci`, builds, and publishes to GitHub Pages. Roughly 60 seconds end to end.

`vite.config.js` sets `base: './'` so asset paths are relative — that's what lets the site work from the `/portfolio/` subpath rather than a domain root, and it's why the same build would deploy unchanged to Netlify, Vercel, or Cloudflare Pages.

Full walkthrough in [DEPLOY.md](DEPLOY.md).
