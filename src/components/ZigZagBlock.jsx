/**
 * One alternating row of the zig-zag layout.
 *
 * Even-indexed blocks put their body on the left with the aside on the
 * right; odd-indexed blocks mirror it. The result is a Z-shaped reading
 * path down the page, and the reveal direction is matched to the side each
 * half occupies so content slides in *from* its own edge — reinforcing the
 * diagonal rather than fighting it.
 */
export function ZigZagBlock({ index, aside, children }) {
  const isRightAligned = index % 2 === 1;
  const alignmentClass = isRightAligned ? 'alignRight' : 'alignLeft';
  const bodyRevealClass = isRightAligned ? 'fromRight' : 'fromLeft';
  const asideRevealClass = isRightAligned ? 'fromLeft' : 'fromRight';

  return (
    <div className={`zigZagBlock ${alignmentClass}`}>
      <div className={`zigZagBody revealItem ${bodyRevealClass}`}>{children}</div>
      <div className={`zigZagAside revealItem ${asideRevealClass}`}>{aside}</div>
      <span className="zigZagConnector" aria-hidden="true" />
    </div>
  );
}
