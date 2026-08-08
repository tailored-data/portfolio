/**
 * Consistent section header: monospace index, title, then a hairline rule
 * that trails off to the right.
 *
 * The numbering matters more than it looks — it tells the reader the page
 * is a finite, ordered sequence, which removes the "how much more is there"
 * anxiety that makes people bail on long scrolling pages.
 */
export function SectionHeading({ index, title }) {
  return (
    <header className="sectionHeading revealItem">
      <span className="sectionIndex">{String(index).padStart(2, '0')}</span>
      <h2 className="sectionTitle">{title}</h2>
      <span className="sectionRule" aria-hidden="true" />
    </header>
  );
}
