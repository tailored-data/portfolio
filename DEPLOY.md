# Deploying — start to finish

Work in **Command Prompt**, not PowerShell, unless you ran the `Set-ExecutionPolicy` fix. To open one in the right place: open your `portfolio` folder in File Explorer, click the address bar, type `cmd`, press Enter.

---

## Already done — no action needed

- GitHub username wired in (`tailored-data`)
- Formspree endpoint wired in (`https://formspree.io/f/meajeerp`)
- Node Pins added as the featured project, with repo and Steam Workshop links
- Deploy workflow committed at `.github/workflows/deploy.yml`
- `npm run verify` added — checks CSS coverage, WCAG contrast, and placeholders

---

# Part 1 — Replacing the résumé later

The current PDF is already in place. When you update it:

1. Save the new PDF into **`public/`** with a fresh random suffix, e.g. `TaylorBurks-Resume-<16 random hex chars>.pdf`
2. Update `resumeFileName` in `src/data/portfolioData.js` to match
3. Delete the old file
4. Run `npm run verify` — it checks the two agree, and that the file exists

Generate a suffix with:

```
node -e "console.log(require('crypto').randomBytes(8).toString('hex'))"
```

> **Why the random name.** Anything in `public/` is served at a predictable URL. Scrapers crawl common paths like `/resume.pdf`. An unguessable filename means the only route to the file is the link revealed after someone submits the contact form.

---

# Part 2 — Check everything locally

```
npm install
npm run verify
```

All checks should pass now. Then:

```
npm run dev
```

Open `http://localhost:5173/` and confirm:

- **Projects** — Node Pins is first, with a "Featured" badge, a "View source" button, and a "Steam Workshop" button
- **TDRemoteAssist and RuneLite** — each shows a dashed "Source available on request" tag instead of a button
- **Contact form** — submit button enabled, no grey hint text. Send yourself a test.

> **The first Formspree submission triggers a confirmation email.** You must click the link in it before the form starts delivering. If your test never arrives, look for that email — this catches almost everyone.

`Ctrl+C` to stop.

---

# Part 3 — Install Git

Version control, and how code reaches GitHub. Separate program from Node.

Download from **[git-scm.com/download/win](https://git-scm.com/download/win)**, run it, **accept every default.**

Open a **new** Command Prompt:

```
git --version
```

Then identify yourself — this gets stamped on every commit:

```
git config --global user.name "Taylor Burks"
git config --global user.email "taylorburks@me.com"
```

---

# Part 4 — Create the repository

Go to **[github.com/new](https://github.com/new)**:

- **Repository name:** `portfolio`
- **Visibility:** **Public** — required for Pages on the free tier
- **Do NOT check** "Add a README file"
- **Do NOT add** a .gitignore or license

> Those checkboxes create commits on GitHub's side that your local folder doesn't have. Git then refuses to push, complaining about unrelated histories. Starting genuinely empty avoids it.

Click **Create repository**, then ignore the setup page it shows you.

---

# Part 5 — Push

In your `portfolio` folder:

```
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/tailored-data/portfolio.git
git push -u origin main
```

What each does:

- `git init` — makes this folder a repository
- `git add .` — stages every file. `node_modules` and `dist` are skipped via `.gitignore`, since both rebuild from `package.json`
- `git commit` — saves a permanent snapshot with a label
- `git branch -M main` — names the branch `main`, matching GitHub's default
- `git remote add origin` — records where the remote copy lives
- `git push -u origin main` — uploads it. A browser opens to authorize; approve it. Credentials cache, so this is one-time.

Refresh your repo page — your files are there.

---

# Part 6 — Turn on Pages

1. Repo → **Settings**
2. **Pages** in the left sidebar
3. **Build and deployment → Source** → select **GitHub Actions**

No save button; that's the whole configuration.

Click the **Actions** tab. A run should be going. Green checkmark means live at:

```
https://tailored-data.github.io/portfolio/
```

> **Actions tab empty?** The workflow triggers on push, and your push happened before Pages was configured. Go to **Actions → Deploy to GitHub Pages → Run workflow**. Every future push is automatic.

---

# Part 7 — Updating later

```
npm run verify
git add .
git commit -m "Describe what changed"
git push
```

Wait ~60 seconds, refresh. Run `verify` first out of habit — it catches placeholder regressions before they're public.

If you changed content and want the standalone preview to match:

```
npm run static
```

---

# Troubleshooting

**`'git' is not recognized`** — not installed, or the terminal predates the install. Open a new one.

**`failed to push some refs` / `rejected`** — the remote has commits yours doesn't, almost always from checking "Add a README". Fix:

```
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**`src refspec main does not match any`** — nothing committed yet. Run `git add .` and `git commit -m "..."` first.

**Actions fails on `npm ci`** — `package-lock.json` wasn't committed. Check `git status` and confirm it isn't in `.gitignore`.

**Site loads unstyled** — `base: './'` in `vite.config.js` was changed. It must stay, or assets 404 from the `/portfolio/` subpath.

**Form silently does nothing live** — the Formspree confirmation email was never clicked.

---

# Custom domain — optional, and not required

**You do not need to buy a domain.** `https://tailored-data.github.io/portfolio/` is free, permanent, and HTTPS-secured. Plenty of working engineers use exactly that.

A custom domain (~$12/yr at Cloudflare or Namecheap) buys you a shorter, more memorable URL on a résumé — `taylorburks.dev` instead of a github.io subpath. It changes nothing technical.

If you want one later: **Settings → Pages → Custom domain**. GitHub tells you which DNS records to add at your registrar, and issues HTTPS automatically once DNS propagates, usually within the hour. Do it any time — switching later costs nothing.
