"use client";

import { useEffect, useRef, useState } from "react";

const scheduleEvents = [
  {
    id: 1,
    date: "Mar 1 · 10:00 AM",
    sublabel: "Registrations Open",
    label: 'Their "normal" became my new baseline.',
    description: "Doors open for all aspiring innovators. Sign up and form your dream team before spots fill up.",
    size: "sm",
    image: "/hack36/hack36-rocket.png",
  },
  {
    id: 2,
    date: "Mar 15 · 9:00 AM",
    sublabel: "Inauguration Ceremony",
    label: "Their problems became my new targets.",
    description: "The journey begins. Opening keynotes, rule briefings, and the official hackathon kickoff.",
    size: "md",
    image: "/hack36/hack36-mascot.png",
  },
  {
    id: 3,
    date: "Mar 15 · 11:00 AM",
    sublabel: "Hacking Begins & Mentorship",
    label: "Their thinking became my new standard.",
    description: "48 hours of pure innovation. Industry mentors guide teams through roadblocks and sharpen ideas.",
    size: "lg",
    image: "/hack36/hack36-comp.png",
  },
  {
    id: 4,
    date: "Mar 17 · 10:00 AM",
    sublabel: "Final Submissions",
    label: "Final submissions & judging day.",
    description: "Time's up. Submit your project and pitch your solution to a panel of top judges.",
    size: "md",
    image: "/hack36/hack36-dino.png",
  },
  {
    id: 5,
    date: "Mar 17 · 6:00 PM",
    sublabel: "Results & Closing",
    label: "Results announced. Champions crowned.",
    description: "Winners revealed, prizes awarded, and an epic chapter comes to a close.",
    size: "sm",
    image: "/hack36/hack36-clock.png",
  },
];

const NODE_SIZES = { sm: 13, md: 20, lg: 30 };
// SVG is centered in the layout. Cards go left or right of it.
const SVG_W = 300;
const SVG_CX = SVG_W / 2;
const ROW_H = 320;
const TOTAL = scheduleEvents.length;
const SVG_H = 60 + (TOTAL - 1) * ROW_H + 60;

// Curved path - nodes weave left and right alternatingly on desktop, straight on mobile
function getNodeX(i, isMobile) {
  if (isMobile) return 30; // Centered straight path inside the 60px viewBox
  const amplitude = 140;
  return i % 2 === 0 ? SVG_CX - amplitude : SVG_CX + amplitude;
}
function getNodeY(i) { return 60 + i * ROW_H; }

function buildPath(isMobile) {
  if (isMobile) {
    return `M 30 60 L 30 ${60 + (TOTAL - 1) * ROW_H}`;
  }
  // Gentle S-curve along the vertical center
  const pts = scheduleEvents.map((_, i) => ({ x: getNodeX(i, false), y: getNodeY(i) }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    d += ` C ${p.x} ${p.y + ROW_H * 0.5}, ${c.x} ${c.y - ROW_H * 0.5}, ${c.x} ${c.y}`;
  }
  return d;
}

const DOT_COLORS = ["#6c5ce7", "#7b6ef0", "#8b7cf8", "#9d8ef8", "#b0a4f8"];

function TimelineCard({ ev }) {
  return (
    <div className="tl-card-inner">
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2" style={{ background: "rgba(139,124,248,0.12)", color: "#8b7cf8", fontFamily: "'DM Sans',sans-serif" }}>
        {ev.date}
      </span>
      <p className="font-bold text-white leading-snug mb-1" style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(0.88rem,1.5vw,1rem)", letterSpacing: "-0.01em" }}>
        {ev.label}
      </p>
      <p className="text-xs font-medium mb-2" style={{ color: "#8b7cf8", fontFamily: "'DM Sans',sans-serif" }}>
        {ev.sublabel}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: "#5a5a7a", fontFamily: "'DM Sans',sans-serif", fontStyle: "italic", fontWeight: 300 }}>
        {ev.description}
      </p>
      {ev.image && (
        <div className="mt-4 -mx-5 -mb-[18px] overflow-hidden">
          <img
            src={ev.image}
            alt={ev.sublabel}
            className="w-full h-22 object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default function ScheduleSection() {
  const pathRef = useRef(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;

    const totalLength = p.getTotalLength();
    p.style.strokeDasharray = totalLength;
    p.style.strokeDashoffset = totalLength;

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / Math.max(scrollable, 1), 1);
      p.style.strokeDashoffset = totalLength * (1 - progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useEffect(() => {
    const obs = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setVisible(p => new Set([...p, i])); },
        { threshold: 0.2 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden py-24"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .tl-card {
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        @media (max-width: 767px) {
          .tl-card.from-left, .tl-card.from-right {
            transform: translateY(20px);
          }
        }
        @media (min-width: 768px) {
          .tl-card.from-left  { transform: translateX(-36px); }
          .tl-card.from-right { transform: translateX(36px); }
        }
        .tl-card.visible    { opacity: 1; transform: translateX(0) translateY(0); }

        .tl-card-inner {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(139,124,248,0.15);
          border-radius: 16px;
          padding: 18px 20px;
          backdrop-filter: blur(8px);
          transition: border-color 0.3s, background 0.3s;
          overflow: hidden;
        }
        .tl-card-inner:hover {
          background: rgba(139,124,248,0.07);
          border-color: rgba(139,124,248,0.35);
        }

        .connector-line {
          position: absolute;
          top: 50%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(139,124,248,0.3), transparent);
          transform: translateY(-50%);
          width: 100%;
          pointer-events: none;
        }
      `}</style>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 500, height: 500, top: "-5%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle,rgba(108,92,231,0.09) 0%,transparent 65%)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "5%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle,rgba(90,70,200,0.06) 0%,transparent 65%)" }} />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-16 px-4 max-w-3xl mx-auto">
        <span className="block text-xs font-medium tracking-widest uppercase mb-4" style={{ color: "#8b7cf8", fontFamily: "'DM Sans',sans-serif" }}>
          Set your calendars up for the ultimate
        </span>
        {/* <h2 className="font-extrabold text-white leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
          When I joined my first mastermind<br />
          with Designers <span style={{ color: "#8b7cf8" }}>10x my level</span>,<br />
          everything changed.
        </h2> */}
        <h2 className="font-extrabold text-white leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
          Hack30
          <span style={{ color: "#8b7cf8" }}> Roadmap</span>,<br />

        </h2>
      </div>

      {/* Timeline */}
      <div className="relative z-10 mx-auto" style={{ maxWidth: 1000, padding: "0 16px" }}>

        {/* Absolute SVG Spine Container */}
        <div
          className="absolute top-0 bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 flex-shrink-0 w-[60px] md:w-[300px]"
          style={{ pointerEvents: "none" }}
        >
          <svg
            width="100%"
            height={SVG_H}
            viewBox={`0 0 ${isMobile ? 60 : 300} ${SVG_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible", display: "block" }}
          >
            <defs>
              <linearGradient id="pg" x1="0" y1="0" x2="0" y2={SVG_H} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="20%" stopColor="#a89cf8" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#7b68ee" stopOpacity="0.9" />
                <stop offset="80%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5b4fd4" stopOpacity="0.9" />
              </linearGradient>
              <filter id="dg" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Dim rail */}
            <path d={buildPath(isMobile)} stroke="#1e1e30" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Animated lit path */}
            <path
              ref={pathRef}
              id="timeline-path"
              d={buildPath(isMobile)}
              stroke="url(#pg)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="9999"
              strokeDashoffset="9999"
              style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
            />

            {/* Dots */}
            {scheduleEvents.map((ev, i) => {
              const x = getNodeX(i, isMobile);
              const y = getNodeY(i);
              const r = NODE_SIZES[ev.size] / 2;
              const fill = DOT_COLORS[i] || "#8b7cf8";
              const isTop = i === 0;
              return (
                <g key={ev.id}>
                  {isTop && <circle cx={x} cy={y} r={r + 9} fill="#6c5ce7" opacity="0.15" />}
                  <circle cx={x} cy={y} r={r} fill={fill} filter={isTop ? "url(#dg)" : undefined} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Rows wrapper */}
        <div className="flex flex-col gap-0 w-full relative">
          {scheduleEvents.map((ev, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={ev.id}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[1fr_300px_1fr] items-center w-full"
                style={{ height: ROW_H }}
              >
                <div
                  ref={el => { cardRefs.current[i] = el; }}
                  className={`tl-card ${isLeft ? "from-left" : "from-right"}${visible.has(i) ? " visible" : ""} col-start-2 ${
                    isLeft
                      ? "md:col-start-1 md:justify-self-end md:pr-6"
                      : "md:col-start-3 md:justify-self-start md:pl-6"
                  } justify-self-start w-full pr-4 md:pr-0 max-w-[300px] md:max-w-[360px]`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <TimelineCard ev={ev} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}