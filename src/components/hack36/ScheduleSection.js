const SCHEDULE = [
  { n: "01", time: "Day 1 · 09:00", label: "Doors Open", sub: "Check-in & team registration at GNDU Campus" },
  { n: "02", time: "Day 1 · 10:00", label: "Problem Statements Drop", sub: "Opening ceremony. Problems revealed. Clock starts soon." },
  { n: "03", time: "Day 1 · 11:00", label: "24H Coding Begins", sub: "All 30 teams start simultaneously. Food served all night." },
  { n: "04", time: "Day 2 · 11:00", label: "Submit & Freeze", sub: "Code commits locked. Presentations begin." },
  { n: "05", time: "Day 2 · 12:00", label: "Team Demos", sub: "Each team presents to the judging panel." },
  { n: "06", time: "Day 2 · 15:00", label: "Results & Prize Ceremony", sub: "Winners announced. ₹50,000 distributed on stage." },
];

const STEP_ICONS = [
  <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
  <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r=".6" fill="#1a1000" /></>,
  <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
  <><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>,
  <><path d="M6 9H2v2a4 4 0 004 4" /><path d="M18 9h4v2a4 4 0 01-4 4" /><path d="M8 21h8" /><path d="M12 17v4" /><path d="M6 3v6a6 6 0 0012 0V3" /></>,
];

// ─── SVG coordinate space ───────────────────────────────────────────────────
// Wide canvas so the S-curves have room to breathe
const VW = 1200;
const VH = 1400;
const ROAD_W = 80;   // asphalt band width

// The six milestone nodes — far left & far right so the curve spans wide
const NODE_R = 30;
const RX = VW * 0.72;   // right column  (72% across)
const LX = VW * 0.28;   // left  column  (28% across)
const NODE_Y = [160, 370, 570, 770, 970, 1160];

// ─── Road path: hand-crafted cubic beziers ──────────────────────────────────
// Each segment is a C (cubic) command giving perfectly smooth wide turns.
// Strategy: the road enters each node vertically, so control points are
// directly above/below the nodes.  The horizontal travel happens in the
// middle of each segment where the cp's fan out to the opposite side.
const TENSION = 220; // vertical length of the tangent arms

function buildRoadPath() {
  const pts = NODE_Y.map((y, i) => ({ x: i % 2 === 0 ? RX : LX, y }));

  // entry point: above first node, same X
  let d = `M ${pts[0].x} ${NODE_Y[0] - 120}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i];
    const p2 = pts[i + 1];

    // control points: pull straight down/up from each node
    // then the horizontal leap is encoded in the bezier's middle
    const cp1x = p1.x;
    const cp1y = p1.y + TENSION;
    const cp2x = p2.x;
    const cp2y = p2.y - TENSION;

    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }

  // exit below last node
  const last = pts[pts.length - 1];
  d += ` C ${last.x} ${last.y + TENSION} ${last.x} ${last.y + 120} ${last.x} ${last.y + 120}`;

  return d;
}

const ROAD_PATH = buildRoadPath();

// ─── Component ──────────────────────────────────────────────────────────────
export default function RoadTimeline() {
  return (
    <section
      id="schedule"
      style={{
        background: "#060606",
        borderTop: "1px solid #131313",
        padding: "80px 0 120px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div className="px-20">
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: ".18em", color: "#3a3a3a", marginBottom: 16 }}>
          // 02 SCHEDULE
        </p>
        <h2 style={{ fontFamily: "'Anton',sans-serif", lineHeight: .92, color: "#fff", fontSize: "clamp(48px,6.5vw,110px)", margin: 0 }}>
          HOW IT<br /><span style={{ color: "#facc15" }}>UNFOLDS.</span>
        </h2>
      </div>

      {/* Road diagram */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          width="100%"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          {/* ── Road layers ── */}
          {/* kerb / outer glow */}
          <path d={ROAD_PATH} fill="none" stroke="#252525" strokeWidth={ROAD_W + 14} strokeLinecap="round" strokeLinejoin="round" />
          {/* asphalt */}
          <path d={ROAD_PATH} fill="none" stroke="#181818" strokeWidth={ROAD_W} strokeLinecap="round" strokeLinejoin="round" />
          {/* subtle inner sheen */}
          <path d={ROAD_PATH} fill="none" stroke="#202020" strokeWidth={ROAD_W - 24} strokeLinecap="round" strokeLinejoin="round" />
          {/* centre dashes */}
          <path d={ROAD_PATH} fill="none" stroke="#facc15" strokeWidth={3} strokeLinecap="round" strokeDasharray="22 16" opacity={0.3} />

          {/* ── START label ── */}
          <g transform={`translate(${RX - 14}, ${NODE_Y[0] - 148})`}>
            {/* runner */}
            <g fill="none" stroke="#aaa" strokeWidth={1.5} strokeLinecap="round">
              <circle cx="10" cy="6" r="4" />
              <path d="M7 13l-3 8h5l1 6 5-6h-4l2-8z" />
            </g>
            <text x="30" y="14" fill="#888" fontSize="15" fontFamily="Anton,sans-serif" letterSpacing="4">START</text>
          </g>

          {/* ── GOAL label ── */}
          <g transform={`translate(${LX - 70}, ${NODE_Y[5] + 96})`}>
            <text x="0" y="0" fill="#888" fontSize="15" fontFamily="Anton,sans-serif" letterSpacing="4">GOAL</text>
            <g fill="none" stroke="#facc15" strokeWidth={1.8} strokeLinecap="round" transform="translate(80,-14)">
              <line x1="4" y1="0" x2="4" y2="34" />
              <path d="M4 2 L24 10 L4 18z" fill="#facc1530" />
            </g>
          </g>

          {/* ── Connector ticks from node to card ── */}
          {NODE_Y.map((y, i) => {
            const isRight = i % 2 === 0;
            const nx = isRight ? RX : LX;
            const x1 = isRight ? nx + NODE_R + 4 : nx - NODE_R - 4;
            const x2 = isRight ? nx + NODE_R + 80 : nx - NODE_R - 80;
            return <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke="#282828" strokeWidth={1.5} />;
          })}

          {/* ── Milestone nodes ── */}
          {NODE_Y.map((y, i) => {
            const x = i % 2 === 0 ? RX : LX;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={NODE_R + 10} fill="#facc1510" />
                <circle cx={x} cy={y} r={NODE_R + 4} fill="none" stroke="#facc1530" strokeWidth={1.5} />
                <circle cx={x} cy={y} r={NODE_R} fill="#facc15" />
                <g transform={`translate(${x - 11},${y - 11})`} fill="none" stroke="#1a1000" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <svg width="22" height="22" viewBox="0 0 24 24">{STEP_ICONS[i]}</svg>
                </g>
              </g>
            );
          })}
        </svg>

        {/* ── HTML cards overlaid ── */}
        {SCHEDULE.map((item, i) => {
          const isRight = i % 2 === 0;
          const yPct = (NODE_Y[i] / VH) * 100;
          const xFrac = (isRight ? RX : LX) / VW;

          return (
            <div
              key={item.n}
              style={{
                position: "absolute",
                top: `${yPct}%`,
                transform: "translateY(-50%)",
                ...(isRight
                  ? { left: `calc(${xFrac * 100}% + ${NODE_R + 26}px)` }
                  : { right: `calc(${(1 - xFrac) * 100}% + ${NODE_R + 26}px)` }
                ),
                width: "clamp(200px, 22%, 280px)",
                zIndex: 2,
              }}
            >
              <div
                style={{ background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 12, padding: "16px 20px", transition: "border-color .2s,background .2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "#0d0d0d"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.background = "#0a0a0a"; }}
              >
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: ".14em", color: "#facc15", opacity: .7, margin: "0 0 5px" }}>{item.time}</p>
                <p style={{ fontFamily: "'Anton',sans-serif", fontSize: "clamp(15px,1.6vw,21px)", color: "#fff", letterSpacing: ".04em", lineHeight: 1.1, margin: "0 0 8px" }}>{item.label}</p>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: "#4a4a4a", lineHeight: 1.55, margin: 0 }}>{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}