import { useLayoutEffect, useRef, useState } from "react";
import { tokenById } from "../../../tokens/lib";
import { prototypeName } from "../prototypes";

const breakpoint = (id: string) => parseFloat(tokenById.get(id)!.resolved);

// Preview frames: the prototype at its real width, scaled down to fit the page.
const frames = [
  { name: "Mobile", width: 375, height: 812 },
  { name: "Tablet", width: 768, height: 1024 },
  { name: "Desktop", width: 1280, height: 800 },
].map((frame) => {
  // Columns of the layout grid at that width (mobile first, like tokens/grid.css).
  const screen =
    frame.width >= breakpoint("breakpoint.desktop") ? "desktop" : frame.width >= breakpoint("breakpoint.tablet") ? "tablet" : "mobile";
  return { ...frame, screen, columns: Number(tokenById.get(`grid.columns.${screen}`)!.resolved) };
});

const totalWidth = frames.reduce((sum, frame) => sum + frame.width, 0);

/** Scale of the frames: side by side when they fit at a readable scale, one under the other otherwise. */
function useScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ scale: 0.4, stacked: false });
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      const available = element.clientWidth;
      const sideBySide = (available - gap * (frames.length - 1)) / totalWidth;
      // Below desktop the page is too narrow: each frame takes the full width.
      const stacked = window.innerWidth < breakpoint("breakpoint.desktop");
      setLayout({ scale: stacked ? available / Math.max(...frames.map((f) => f.width)) : sideBySide, stacked });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, ...layout };
}

export function PrototypePage({ name }: { name: string }) {
  const [showGrid, setShowGrid] = useState(false);
  const { ref, scale, stacked } = useScale();
  const url = `/prototypes/${name}/`;
  const title = prototypeName(name);

  return (
    <>
      <h1 title={title}>{title}</h1>
      <p className="lead">Live preview on mobile, tablet and desktop</p>
      <div className="prototype-preview-actions">
        <label>
          <input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} /> Show grid
        </label>
        <a href={url} target="_blank" rel="noreferrer">
          Open in a new tab
        </a>
      </div>

      <div ref={ref} className={`prototype-preview${stacked ? " stacked" : ""}`}>
        {frames.map((frame) => (
          <figure key={frame.name} className="prototype-frame">
            <figcaption>
              <strong>{frame.name}</strong> · {frame.width}px · {frame.columns} columns
            </figcaption>
            <div className="prototype-frame-box" style={{ width: frame.width * scale, height: frame.height * scale }}>
              <div
                className="prototype-frame-screen"
                style={{ width: frame.width, height: frame.height, transform: `scale(${scale})` }}
              >
                <iframe src={url} title={`${title} — ${frame.name}`} width={frame.width} height={frame.height} />
                {showGrid && (
                  <div className="prototype-grid-overlay" aria-hidden="true">
                    <div style={{ gridTemplateColumns: `repeat(${frame.columns}, minmax(0, 1fr))` }}>
                      {Array.from({ length: frame.columns }, (_, index) => (
                        <span key={index} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </figure>
        ))}
      </div>
    </>
  );
}
