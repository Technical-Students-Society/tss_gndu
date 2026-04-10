import React from 'react';
import { Users } from "lucide-react";
import ShinyText from '@/app/Animations/ShinyText';

// Visuals
const TerminalVisual = () => (
  <div className="w-full rounded-lg bg-neutral-100 dark:bg-neutral-900 px-3 py-2.5 font-mono text-[11px] space-y-1.5">
    <div className="flex gap-2"><span className="text-emerald-500">›</span><span className="text-neutral-500">npm run build</span></div>
    <div className="flex gap-2"><span className="text-neutral-400">✓</span><span className="text-emerald-500">compiled in 1.2s</span></div>
    <div className="flex gap-2"><span className="text-emerald-500">›</span><span className="text-neutral-400 animate-pulse">▌</span></div>
  </div>
);

const RingVisual = () => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="5" />
    <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="5"
      strokeDasharray="150.8" strokeDashoffset="37.7" strokeLinecap="round"
      transform="rotate(-90 32 32)" className="text-neutral-900 dark:text-neutral-50" />
    <text x="32" y="30" textAnchor="middle" className="fill-neutral-900 dark:fill-neutral-50" fontSize="13" fontWeight="600">75%</text>
    <text x="32" y="42" textAnchor="middle" className="fill-neutral-400" fontSize="8">participation</text>
  </svg>
);

const BarsVisual = () => (
  <div className="w-full">
    <div className="flex items-end gap-1.5 h-14">
      {[30, 55, 40, 75, 90, 100].map((h, i) => (
        <div key={i} className={`flex-1 rounded-t ${i >= 3 ? 'bg-neutral-900 dark:bg-neutral-50' : 'bg-neutral-200 dark:bg-neutral-700'}`} style={{ height: `${h}%` }} />
      ))}
    </div>
    <div className="flex justify-between mt-1 border-t border-neutral-200 dark:border-neutral-800 pt-1">
      <span className="text-[10px] text-neutral-400">2022</span>
      <span className="text-[10px] text-neutral-400">2025</span>
    </div>
  </div>
);

const DotsVisual = () => {
  const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#818cf8', '#fb923c', '#4ade80', '#e879f9', '#38bdf8', '#f87171'];
  return (
    <div className="flex flex-wrap gap-1.5 w-25">
      {colors.map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
    </div>
  );
};

const AlumniVisual = () => (
  <svg width="130" height="60" viewBox="0 0 130 60">
    {[{ cx: 20, cy: 30, label: 'A' }, { cx: 65, cy: 14, label: 'B' }, { cx: 110, cy: 30, label: 'C' }].map(({ cx, cy, label }) => (
      <g key={label}>
        <circle cx={cx} cy={cy} r="13" className="fill-neutral-100 dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" className="fill-neutral-500">A</text>
      </g>
    ))}
    <circle cx="65" cy="46" r="13" className="fill-white dark:fill-black stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1" />
    <text x="65" y="50" textAnchor="middle" fontSize="9" fontWeight="600" className="fill-neutral-900 dark:fill-neutral-50">TSS</text>
    <line x1="32" y1="30" x2="52" y2="40" className="stroke-neutral-200 dark:stroke-neutral-700" strokeWidth="1" />
    <line x1="65" y1="27" x2="65" y2="33" className="stroke-neutral-200 dark:stroke-neutral-700" strokeWidth="1" />
    <line x1="98" y1="30" x2="78" y2="40" className="stroke-neutral-200 dark:stroke-neutral-700" strokeWidth="1" />
  </svg>
);

const SponsorVisual = () => (
  <div className="space-y-2 w-full">
    {[{ color: '#fde047', w: 'w-12', label: 'Gold Partner' }, { color: '#d1d5db', w: 'w-9', label: 'Associate' }].map(({ color, w, label }, i) => (
      <div key={i} className="inline-flex items-center gap-2 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 bg-neutral-50 dark:bg-neutral-900">
        <div className={`${w} h-3 rounded`} style={{ background: color }} />
        <span className="text-[10.5px] text-neutral-400">{label}</span>
        {i === 0 && <span className="text-[9px] border border-neutral-200 dark:border-neutral-800 rounded px-1 text-neutral-400">AD</span>}
      </div>
    ))}
  </div>
);

const MediaVisual = () => (
  <div className="flex items-center gap-3">
    <svg width="38" height="36" viewBox="0 0 38 36" fill="none">
      <rect x="1" y="6" width="26" height="22" rx="4" className="fill-neutral-100 dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.2" />
      <polygon points="12,13 22,19 12,25" className="fill-neutral-500" />
      <path d="M27 12 L33 10 L33 26 L27 24" className="fill-neutral-100 dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.2" />
    </svg>
    <div className="flex items-center gap-0.5 h-9">
      {[12, 24, 18, 32, 20, 14, 28, 16, 22].map((h, i) => (
        <div key={i} className="w-0.75 rounded-full bg-neutral-300 dark:bg-neutral-700" style={{ height: `${h}px` }} />
      ))}
    </div>
  </div>
);

const DesignVisual = () => (
  <div className="space-y-2.5">
    <div className="flex gap-1.5">
      {['#0f172a', '#6366f1', '#e2e8f0', '#f8fafc'].map(c => (
        <div key={c} className="w-7 h-7 rounded-md border border-neutral-200 dark:border-neutral-800" style={{ background: c }} />
      ))}
    </div>
    <div className="flex gap-1.5 items-center">
      <div className="h-2 w-12 rounded-full bg-neutral-900 dark:bg-neutral-50" />
      <div className="h-1.5 w-8 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      <div className="h-1.5 w-5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
    </div>
  </div>
);

const teamCategories = [
  { title: 'Technical', description: 'Hackathons, dev workshops, and the infrastructure behind every TSS event.', Visual: TerminalVisual },
  { title: 'Sports', description: 'Organizes inter-college sports events and builds a culture of athletic excellence.', Visual: RingVisual },
  { title: 'Placement', description: 'Connects students with recruiters and prepares them for the professional world.', Visual: BarsVisual },
  { title: 'Cultural', description: 'Fests, performances, and everything that makes campus life vibrant and memorable.', Visual: DotsVisual },
  { title: 'Alumni', description: 'Bridges graduating batches with current students through mentorship and networks.', Visual: AlumniVisual },
  { title: 'Sponsorship', description: 'Secures partnerships and funds that keep TSS events running at full scale.', Visual: SponsorVisual },
  { title: 'Content & Media', description: 'Documents, shoots, and tells the story of TSS across every channel.', Visual: MediaVisual },
  { title: 'Design', description: 'Crafts the visual identity of TSS — from event creatives to the digital experience.', Visual: DesignVisual },
];

export default function HomeTeamSection() {
  return (
    <section className="w-full py-20 dark:bg-siteblack">
      <div className="container mx-auto px-4 md:px-12 lg:px-20 xl:px-32">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <p className="text-xs flex gap-2 items-center font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
              <Users />
              <ShinyText
                text="Our Teams"
                speed={2.8}
                color="#b5b5b5"
                shineColor="#ffffff"
              />

            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 max-w-md leading-tight">
              Our Core Team Divisions
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed md:text-right">
            Specialized teams working in sync — each driving a different dimension of student life at GNDU.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamCategories.map((category) => (
            <div
              key={category.title}
              className="group flex flex-col justify-between rounded-2xl border bg-white shadow-sm border-neutral-200 dark:border-neutral-800  dark:bg-neutral-950 p-6 hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all duration-200 min-h-50"
            >
              {/* Visual artifact area */}
              <div className="h-18 flex items-center mb-5">
                <category.Visual />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg  font-bold mt-5 uppercase tracking-widest text-neutral-900 dark:text-neutral-50 mb-1.5">
                  {category.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <hr className="top-20 relative mx-15 max-sm:mx-5 dark:border-neutral-800" /> */}

    </section>
  );
}
