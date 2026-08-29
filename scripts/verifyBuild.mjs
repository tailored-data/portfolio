/**
 * Pre-deploy checks. Run with `npm run verify`.
 *
 * Catches the two failure modes that a passing build will not:
 *   1. A className in JSX that has no matching CSS rule — the build succeeds,
 *      the element just renders unstyled.
 *   2. A color pair that fails WCAG AA — invisible until someone can't read it.
 *
 * Also flags leftover placeholder values before they reach production.
 * Exits non-zero on failure so CI can gate on it.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failureCount = 0;

const report = (didPass, label, detail = '') => {
  if (!didPass) failureCount += 1;
  console.log(`  ${didPass ? 'PASS' : 'FAIL'}  ${label}${detail ? `  ${detail}` : ''}`);
};

// --- 1. Every className used in JSX must exist in the stylesheets ----------

const stylesheetText =
  fs.readFileSync(path.join(projectRoot, 'src/styles/global.css'), 'utf8') +
  fs.readFileSync(path.join(projectRoot, 'src/styles/theme.css'), 'utf8');

const definedClasses = new Set(
  [...stylesheetText.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((match) => match[1])
);

const walkDirectory = (directory) =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walkDirectory(path.join(directory, entry.name))
        : [path.join(directory, entry.name)]
    );

const usedClasses = new Map();
for (const filePath of walkDirectory(path.join(projectRoot, 'src')).filter((f) =>
  f.endsWith('.jsx')
)) {
  const source = fs.readFileSync(filePath, 'utf8');
  for (const match of source.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
    const rawValue = (match[1] || match[2] || '').replace(/\$\{[^}]*\}/g, ' ');
    for (const className of rawValue.split(/\s+/).filter(Boolean)) {
      if (!usedClasses.has(className)) {
        usedClasses.set(className, path.relative(projectRoot, filePath));
      }
    }
  }
}

// Toggled from JS rather than written in JSX, so add them manually.
for (const runtimeClass of [
  'isVisible',
  'isActive',
  'isScrolled',
  'revealItem',
  'fromLeft',
  'fromRight',
  'isSuccess',
  'isError',
  'isMenuOpen'
]) {
  usedClasses.set(runtimeClass, 'runtime');
}

console.log('\nCSS CLASS COVERAGE');
const undefinedClasses = [...usedClasses.entries()].filter(
  ([className]) => !definedClasses.has(className)
);
report(
  undefinedClasses.length === 0,
  `${usedClasses.size} classes referenced`,
  undefinedClasses.length ? `missing: ${undefinedClasses.map(([c, f]) => `${c} (${f})`).join(', ')}` : ''
);

// --- 2. WCAG AA contrast --------------------------------------------------

const parseHex = (hex) => {
  const clean = hex.replace('#', '');
  return [0, 2, 4].map((offset) => parseInt(clean.slice(offset, offset + 2), 16));
};

const relativeLuminance = (rgb) => {
  const linear = rgb.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const contrastRatio = (foreground, background) => {
  const [lighter, darker] = [
    relativeLuminance(parseHex(foreground)),
    relativeLuminance(parseHex(background))
  ].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

/** Reads a token's value straight from theme.css so this can't go stale. */
const readToken = (themeName, tokenName) => {
  const themeBlock = stylesheetText.match(
    new RegExp(`\\[data-theme='${themeName}'\\]\\s*\\{([\\s\\S]*?)\\n\\}`)
  );
  if (!themeBlock) throw new Error(`Theme block not found: ${themeName}`);
  const tokenMatch = themeBlock[1].match(
    new RegExp(`--${tokenName}:\\s*(#[0-9a-fA-F]{6})`)
  );
  if (!tokenMatch) throw new Error(`Token not found: ${tokenName} in ${themeName}`);
  return tokenMatch[1];
};

// minimumRatio 3.0 applies only where the text is large; body copy needs 4.5.
const contrastPairs = [
  ['dark', 'colorTextPrimary', 'colorBackground', 4.5],
  ['dark', 'colorTextSecondary', 'colorBackground', 4.5],
  ['dark', 'colorTextMuted', 'colorBackground', 4.5],
  ['dark', 'colorTextMuted', 'colorSurface', 4.5],
  ['dark', 'colorAccent', 'colorBackground', 4.5],
  ['dark', 'colorAccent', 'colorSurface', 4.5],
  ['light', 'colorTextPrimary', 'colorBackground', 4.5],
  ['light', 'colorTextSecondary', 'colorBackground', 4.5],
  ['light', 'colorTextMuted', 'colorBackground', 4.5],
  ['light', 'colorTextMuted', 'colorSurface', 4.5],
  ['light', 'colorAccent', 'colorBackground', 4.5],
  ['light', 'colorAccent', 'colorSurface', 4.5]
];

console.log('\nWCAG AA CONTRAST');
for (const [themeName, foregroundToken, backgroundToken, minimumRatio] of contrastPairs) {
  const ratio = contrastRatio(
    readToken(themeName, foregroundToken),
    readToken(themeName, backgroundToken)
  );
  report(
    ratio >= minimumRatio,
    `${themeName.padEnd(5)} ${foregroundToken} on ${backgroundToken}`,
    `${ratio.toFixed(2)}:1 (min ${minimumRatio})`
  );
}

// --- 3. Placeholders that must not ship -----------------------------------

console.log('\nPLACEHOLDER SCAN');
const dataFileText = fs.readFileSync(
  path.join(projectRoot, 'src/data/portfolioData.js'),
  'utf8'
);
report(!dataFileText.includes('your-username'), 'no placeholder GitHub username');
report(!/contactFormEndpoint\s*=\s*null/.test(dataFileText), 'contact form endpoint set');

// The filename is random, so match on the pattern rather than a literal.
const publicFiles = fs.existsSync(path.join(projectRoot, 'public'))
  ? fs.readdirSync(path.join(projectRoot, 'public'))
  : [];
const resumeFile = publicFiles.find((name) => /^TaylorBurks-Resume-.*\.pdf$/.test(name));
report(Boolean(resumeFile), 'résumé PDF present in public/', resumeFile ?? '');

// The data file must reference the file that actually exists, or the
// download 404s only for people who earned it — the worst failure mode.
report(
  Boolean(resumeFile) && dataFileText.includes(resumeFile),
  'portfolioData.js references the real PDF filename'
);

// --- 4. Personal data leak scan ------------------------------------------
//
// The phone number lives only inside the PDF. If it ever reappears in
// source or in a build artifact, it has been published — the whole point of
// removing it. This check fails the build rather than letting that ship.

console.log('\nPERSONAL DATA SCAN');

// Deliberately generic, not the actual number. This file is committed to a
// public repo — hardcoding the number here would republish the very thing
// the check exists to keep private.
// No literal examples in the comments either — an example phone number
// would match these patterns and fail this very check.
const phonePatterns = [
  /\(\d{3}\)\s*\d{3}[-.\s]\d{4}/, // parenthesised area code, then 3 and 4 digits
  /\b\d{3}[-.]\d{3}[-.]\d{4}\b/, // 3-3-4 digits split by hyphens or dots
  /tel:\+?\d[\d\s().-]{7,}/i // any tel: link
];

const scanTargets = [
  ...walkDirectory(path.join(projectRoot, 'src')),
  ...walkDirectory(path.join(projectRoot, 'scripts')),
  ...(fs.existsSync(path.join(projectRoot, 'preview.html'))
    ? [path.join(projectRoot, 'preview.html')]
    : []),
  ...(fs.existsSync(path.join(projectRoot, 'dist'))
    ? walkDirectory(path.join(projectRoot, 'dist')).filter((f) => !f.endsWith('.pdf'))
    : [])
];

const leakingFiles = scanTargets.filter((filePath) => {
  const contents = fs.readFileSync(filePath, 'utf8');
  return phonePatterns.some((pattern) => pattern.test(contents));
});

report(
  leakingFiles.length === 0,
  `phone number absent from ${scanTargets.length} source and build files`,
  leakingFiles.length ? `LEAKED IN: ${leakingFiles.map((f) => path.relative(projectRoot, f)).join(', ')}` : ''
);

// --- Result ---------------------------------------------------------------

console.log(
  failureCount === 0
    ? '\nAll checks passed.\n'
    : `\n${failureCount} check(s) failed.\n`
);
process.exit(failureCount === 0 ? 0 : 1);
