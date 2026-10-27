// Landing page background (B088, composition and style approved by the Design System Lead): a sea
// of clouds drawn as an engraving, seen from above. Zones: a hazy far sea at the top, a great dark
// column on the left with a darker dome in front of it, cumulus getting smaller toward the top
// right, light cumulus on the right, and a winding footbridge with a small walker in the valley.
// Light from the top right. Landscape screens get a wider layout of the same zones.
// Colors are tokens (var(--color-…)); drawn for the window size, and drawn again when it changes.

type Tone = { fill: string; ink: string; lit: string; sw: number; lines: number };
type Edge = (k: number) => [number, number];
interface Zone {
  y: [number, number];
  x: Edge;
  h: [number, number];
}
interface Layout {
  far: [number, number, number][]; // x %, base y %, width in u
  bridge: [number, number][]; // path points, %
  bw: [number, number]; // bridge width at the bottom / far away, % of the width
  walker: number; // position on the bridge, 0 → 1
  rightTop: Zone;
  right: Zone;
  column: Zone & { shade: number };
  dome: Zone;
}

// Zones, in % of the frame (x from the left, y from the top); sizes in u.
const LAYOUTS: Record<"portrait" | "landscape", Layout> = {
  portrait: {
    far: [[93, 15, 7], [86, 19.5, 11], [76, 26, 16], [62, 33, 22], [46, 41, 30], [72, 46, 26]],
    bridge: [[67, 103], [58, 86], [55, 75], [64, 67], [77, 62], [90, 53], [104, 47]],
    bw: [10, 2],
    walker: 0.5,
    rightTop: { y: [44, 56], x: (k) => [88 - k * 6, 106], h: [5, 7] },
    right: { y: [60, 88], x: (k) => [90 - k * 20, 108], h: [7, 13] },
    column: { y: [-6, 102], x: (k) => [-14, 25 + k * 30], h: [9, 24], shade: 55 },
    dome: { y: [44, 66], x: (k) => [30 - k * 10, 48 + k * 7], h: [10, 15] },
  },
  landscape: {
    far: [[96, 14, 8], [89, 17.5, 12], [79, 22, 16], [67, 28, 21], [54, 34, 26], [86, 38, 20], [41, 42, 28], [64, 50, 30], [42, 57, 24]],
    bridge: [[58, 104], [50, 88], [48, 78], [57, 68], [70, 62], [85, 54], [103, 48]],
    bw: [7, 1.5],
    walker: 0.48,
    rightTop: { y: [42, 54], x: (k) => [90 - k * 5, 104], h: [5, 7] },
    right: { y: [58, 92], x: (k) => [88 - k * 16, 106], h: [7, 13] },
    column: { y: [-8, 104], x: (k) => [-8, 18 + k * 20], h: [9, 24], shade: 38 },
    dome: { y: [44, 72], x: (k) => [17 - k * 4, 33 + k * 5], h: [10, 15] },
  },
};

const P = (step: number) => `var(--color-primary-${step})`;
const S = (step: number) => `var(--color-secondary-${step})`;
const DEG = Math.PI / 180;
const f = (n: number) => n.toFixed(1);

let W = 0;
let H = 0;
let u = 0; // cloud size unit: keeps about the same number of shapes on any screen
let seed = 9;
let uid = 0;
let defs = "";
const X = (p: number) => (W * p) / 100;
const Y = (p: number) => (H * p) / 100;
const U = (n: number) => n * u;
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// Arc of a circle between two angles (degrees, SVG frame: 0 = right, 90 = down, -90 = up).
function arc(cx: number, cy: number, R: number, a0: number, a1: number) {
  const p = (a: number) => [cx + R * Math.cos(a * DEG), cy + R * Math.sin(a * DEG)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${f(x0)} ${f(y0)} A${f(R)} ${f(R)} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 1 ${f(x1)} ${f(y1)}`;
}

// One cloud piece: flat bottom, top made of round bumps; each bump filled with concentric engraved
// lines (thicker toward the shadow), a contour on the shadow side, a lit stroke on the top right,
// hatching at the base.
function piece(x0: number, x1: number, base: number, h: number, n: number, c: Tone) {
  const w = x1 - x0;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const inner = i > 0 && i < n;
    pts.push([
      x0 + w * t + (inner ? ((random() - 0.5) * w * 0.35) / n : 0),
      base - h * 0.78 * Math.sin(Math.PI * t) - (inner ? h * (0.05 + random() * 0.12) : 0),
    ]);
  }
  const foot = h * 0.16;
  pts[0][1] = base - foot;
  pts[n][1] = base - foot;
  let d = `M${f(pts[0][0] + foot)} ${f(base)} A${f(foot)} ${f(foot)} 0 0 1 ${f(pts[0][0])} ${f(base - foot)} `;
  const bumps: { x: number; y: number; R: number }[] = [];
  for (let i = 1; i <= n; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const ch = Math.hypot(bx - ax, by - ay);
    const R = ch * 0.56;
    const k = Math.sqrt(R * R - (ch * ch) / 4);
    bumps.push({ x: (ax + bx) / 2 + ((by - ay) / ch) * k, y: (ay + by) / 2 - ((bx - ax) / ch) * k, R });
    d += `A${f(R)} ${f(R)} 0 1 1 ${f(bx)} ${f(by)} `;
  }
  d += `A${f(foot)} ${f(foot)} 0 0 1 ${f(pts[n][0] - foot)} ${f(base)} Z`;
  const id = `home-cloud-${uid++}`;
  const sw = c.sw;
  const line = (color: string, width: number, extra = "") =>
    `style="fill:none;stroke:${color}" stroke-width="${f(width)}" stroke-linecap="round"${extra}`;
  defs += `<clipPath id="${id}"><path d="${d}"/></clipPath>`;
  let s = `<path d="${d}" style="fill:${c.fill}"/><g clip-path="url(#${id})">`;
  for (const b of bumps) {
    s += `<circle cx="${f(b.x)}" cy="${f(b.y)}" r="${f(b.R)}" style="fill:${c.fill}"/>`;
    for (let k = 0.92; k > 0.3; k -= c.lines)
      s += `<path d="${arc(b.x, b.y, b.R * k, 110, 250 - (1 - k) * 60)}" ${line(c.ink, sw * (0.4 + (1 - k) * 0.4), ' opacity=".7"')}/>`;
    s += `<path d="${arc(b.x, b.y, b.R, 150, 290)}" ${line(c.ink, sw)}/>`;
    s += `<path d="${arc(b.x, b.y, b.R * 0.94, 285, 340)}" ${line(c.lit, sw * 1.3)}/>`;
  }
  let hd = "";
  const hh = h * 0.25;
  for (let k = -hh; k < w; k += sw * 3) hd += `M${f(x0 + k)} ${f(base)} l${f(hh)} ${f(-hh)} `;
  s += `<path d="${hd}" ${line(c.ink, sw * 0.5, ' opacity=".55"')}/>`;
  s += `</g><path d="${d}" style="fill:none;stroke:${c.ink}" stroke-width="${f(sw * 0.9)}" stroke-linejoin="round"/>`;
  return s;
}

// A stack of pieces from its top (far, drawn first) to its base (near, drawn last).
// edge(k) gives [left, right] in px at each step (k: 0 top → 1 base); pieces grow toward the base.
function stack(y0: number, y1: number, edge: (k: number) => [number, number], h0: number, h1: number, tone: Tone | ((k: number) => Tone)) {
  let s = "";
  for (let y = y0; y < y1; ) {
    const k = (y - y0) / Math.max(1, y1 - y0);
    const h = h0 + (h1 - h0) * k;
    const [a, b] = edge(k);
    s += piece(a, b, y + h * 0.9, h, Math.max(3, Math.round((b - a) / (h * 0.9))), typeof tone === "function" ? tone(k) : tone);
    y += h * 0.55;
  }
  return s;
}

function draw(L: Layout) {
  seed = 9;
  uid = 0;
  defs = "";
  // Far sea at the top and the valley behind everything: hazy at the top, darker toward the bottom.
  defs +=
    `<linearGradient id="home-clouds-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:${P(200)}"/>` +
    `<stop offset=".12" style="stop-color:${P(300)}"/><stop offset=".4" style="stop-color:${P(500)}"/>` +
    `<stop offset=".75" style="stop-color:${P(800)}"/><stop offset="1" style="stop-color:${P(900)}"/></linearGradient>` +
    `<filter id="home-clouds-haze"><feGaussianBlur stdDeviation="1.4"/></filter>`;
  let s = `<rect width="${W}" height="${H}" style="fill:url(#home-clouds-bg)"/>`;
  let sea = "";
  for (let y = 8; y < Y(13); ) {
    const k = y / Y(13);
    let d = "";
    for (let x = -random() * 120; x < W; x += 60 + random() * 120) d += `M${f(x)} ${f(y)} q${f(25 + k * 30)} ${f(-2 - k * 5)} ${f(50 + k * 60)} 0 `;
    sea += `<path d="${d}" style="fill:none;stroke:${k > 0.7 ? P(400) : P(300)}" stroke-width="${f(0.8 + k)}" opacity=".8"/>`;
    y += 6 + k * 12;
  }
  s += `<g filter="url(#home-clouds-haze)">${sea}<path d="M0 ${f(Y(12))} H${W}" style="stroke:${P(400)}" stroke-width="2" opacity=".6"/></g>`;

  // Cumulus getting smaller toward the top right, lighter with the haze.
  L.far.forEach(([cx, cy, wu], i) => {
    const t = Math.min(1, i / (L.far.length - 2)); // 0 farthest → 1 nearest
    const tone: Tone = {
      fill: t < 0.3 ? P(200) : t < 0.7 ? P(300) : P(400),
      ink: t < 0.3 ? P(400) : t < 0.7 ? P(500) : P(700),
      lit: t > 0.5 ? P(200) : P(100),
      sw: 0.6 + t * 1.1,
      lines: t > 0.5 ? 0.13 : 0.2,
    };
    const hw = U(wu) / 2;
    s += stack(Y(cy) - U(wu) * 0.55, Y(cy), (k) => [X(cx) - hw * (0.6 + k * 0.4), X(cx) + hw * (0.6 + k * 0.4) + (random() - 0.5) * hw * 0.2], U(wu) * 0.2, U(wu) * 0.32, tone);
  });

  // The footbridge: from the bottom edge, left, right, then up to the right edge, where it passes
  // behind clouds; narrowing with distance.
  const pts = L.bridge.map(([x, y]) => [X(x), Y(y)]);
  const curve = (t: number): [number, number] => {
    const n = pts.length - 1;
    const i = Math.min(n - 1, Math.floor(t * n));
    const v = t * n - i;
    const [p0, p1, p2, p3] = [pts[Math.max(0, i - 1)], pts[i], pts[i + 1], pts[Math.min(n, i + 2)]];
    const c = (a: number, b: number, c2: number, d: number) =>
      0.5 * (2 * b + (-a + c2) * v + (2 * a - 5 * b + 4 * c2 - d) * v * v + (-a + 3 * b - 3 * c2 + d) * v * v * v);
    return [c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])];
  };
  const left: [number, number][] = [];
  const right: [number, number][] = [];
  const N = 140;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const [x, y] = curve(t);
    const [xa, ya] = curve(Math.max(0, t - 0.004));
    const [xb, yb] = curve(Math.min(1, t + 0.004));
    const dx = xb - xa;
    const dy = yb - ya;
    const d = Math.hypot(dx, dy) || 1;
    const hw = (X(L.bw[0]) * (1 - t) + X(L.bw[1]) * t) / 2;
    left.push([x - (dy / d) * hw, y + (dx / d) * hw]);
    right.push([x + (dy / d) * hw, y - (dx / d) * hw]);
  }
  const poly = (a: [number, number][]) => a.map(([x, y]) => `${f(x)},${f(y)}`).join(" ");
  const ribbon = poly([...left, ...right.slice().reverse()]);
  s += `<polygon points="${ribbon}" style="fill:${P(950)}" opacity=".5" transform="translate(-12 9)"/><polygon points="${ribbon}" style="fill:${S(800)}"/>`;
  for (let i = 0; i <= N; i += 2)
    s += `<line x1="${f(left[i][0])}" y1="${f(left[i][1])}" x2="${f(right[i][0])}" y2="${f(right[i][1])}" style="stroke:${S(900)}" stroke-width="${f(0.6 + 1.6 * (1 - i / N))}"/>`;
  s += `<polyline points="${poly(left)}" style="fill:none;stroke:${P(800)}" stroke-width="2"/><polyline points="${poly(right)}" style="fill:none;stroke:${P(800)}" stroke-width="2"/>`;

  // Light cumulus right of the bridge, cream on the lit tops; the top ones hide its far end.
  const zone = (Z: Zone, tone: Tone | ((k: number) => Tone), jitter = 3) =>
    stack(Y(Z.y[0]), Y(Z.y[1]), (k) => { const [a, b] = Z.x(k); return [X(a) + (random() - 0.5) * X(jitter), X(b)]; }, U(Z.h[0]), U(Z.h[1]), tone);
  s += zone(L.rightTop, { fill: P(400), ink: P(700), lit: P(200), sw: 1.2, lines: 0.15 });
  s += zone(L.right, { fill: P(300), ink: P(800), lit: S(600), sw: 1.8, lines: 0.11 });

  // The great column on the left, out of the frame at the top left, wider at the bottom, its right
  // edge cut into lit bumps, darker on the left.
  defs +=
    `<linearGradient id="home-clouds-column" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${f(X(L.column.shade))}" y2="0">` +
    `<stop offset="0" style="stop-color:${P(800)}"/><stop offset=".55" style="stop-color:${P(600)}"/><stop offset="1" style="stop-color:${P(500)}"/></linearGradient>`;
  s += stack(Y(L.column.y[0]), Y(L.column.y[1]), (k) => { const [a, b] = L.column.x(k); return [X(a), X(b) + (random() - 0.3) * X(4)]; }, U(L.column.h[0]), U(L.column.h[1]),
    (k) => ({ fill: "url(#home-clouds-column)", ink: P(950), lit: k < 0.3 ? P(300) : P(400), sw: 1 + k * 1.4, lines: 0.11 }));

  // The dark dome in front of the column: the darkest point, a thin light rim on its top right.
  s += zone(L.dome, (k) => ({ fill: k < 0.5 ? P(700) : P(800), ink: P(950), lit: P(400), sw: 1.6 + k * 0.8, lines: 0.1 }), 0);

  // The walker on the bridge (about 2 % of the height), shadow to the bottom left.
  const [wx, wy] = curve(L.walker);
  const m = Y(2) / 26;
  s +=
    `<ellipse cx="${f(wx - 10 * m)}" cy="${f(wy + 4 * m)}" rx="${f(11 * m)}" ry="${f(3 * m)}" style="fill:${P(950)}" opacity=".45" transform="rotate(-25 ${f(wx - 10 * m)} ${f(wy + 4 * m)})"/>` +
    `<path d="M${f(wx - 5 * m)} ${f(wy)} L${f(wx - 3 * m)} ${f(wy - 21 * m)} Q${f(wx)} ${f(wy - 25 * m)} ${f(wx + 3 * m)} ${f(wy - 21 * m)} L${f(wx + 5 * m)} ${f(wy)} Z" style="fill:${P(950)}"/>` +
    `<circle cx="${f(wx)}" cy="${f(wy - 26 * m)}" r="${f(4 * m)}" style="fill:${P(950)}"/>`;
  return `<defs>${defs}</defs>${s}`;
}

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.classList.add("home-clouds");
svg.setAttribute("aria-hidden", "true");
svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
document.body.prepend(svg);

let size = "";
function render() {
  if (`${window.innerWidth}x${window.innerHeight}` === size) return;
  size = `${window.innerWidth}x${window.innerHeight}`;
  W = window.innerWidth;
  H = window.innerHeight;
  u = Math.sqrt(W * H) / 133.3;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.innerHTML = draw(W > H ? LAYOUTS.landscape : LAYOUTS.portrait);
}

let frame = 0;
render();
window.addEventListener("resize", () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(render);
});
