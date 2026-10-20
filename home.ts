// Landing page animation: the avatar types on its laptop (CSS, docs.css) while the
// work-time clock counts up to the time spent building the site, once, on load.
interface WorkTimeData {
  seconds: number;
  lastActivity: number | null;
  pauseMs: number;
}

const COUNT_UP_MS = 2400; // Same length as the typing animation: 12 × --duration-200.
const clock = document.querySelector<HTMLElement>(".home-work-time")!;
const display = clock.querySelector<HTMLTimeElement>("time")!;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const pad = (value: number) => String(value).padStart(2, "0");
function show(total: number) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  display.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  display.dateTime = `PT${h}H${m}M${s}S`;
}

// Total so far; keeps growing while a session is active (last activity within the pause limit).
function current(data: WorkTimeData) {
  const sinceLast = data.lastActivity === null ? Infinity : Date.now() - data.lastActivity;
  return data.seconds + (sinceLast <= data.pauseMs ? Math.floor(sinceLast / 1000) : 0);
}

fetch("/api/work-time")
  .then((response) => (response.ok ? (response.json() as Promise<WorkTimeData>) : Promise.reject()))
  .then((data) => {
    clock.hidden = false;
    const live = () => setInterval(() => show(current(data)), 1000);
    if (reducedMotion) {
      show(current(data));
      live();
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / COUNT_UP_MS, 1);
      const eased = 1 - (1 - progress) ** 3; // ease-out
      show(Math.floor(current(data) * eased));
      if (progress < 1) requestAnimationFrame(step);
      else live();
    };
    requestAnimationFrame(step);
  })
  .catch(() => {
    // No dev server API (e.g. a static build): the clock stays hidden.
  });
