"use client";

import Link from "next/link";
import ShinyText from "@/app/Animations/ShinyText";
import HeroPlanet from "@/components/HeroPlanet";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[130vh]  font-openai overflow-hidden bg-zinc-100 dark:bg-siteblack text-neutral-900 dark:text-white selection:bg-emerald-400 selection:text-black">
      {/* ── Interactive Pixel Art Planet with Emitting Aura Background ── */}
      <HeroPlanet />

      {/* ── Main content ── */}
      <div className="relative z-20 flex flex-col items-center pt-36  min-h-[90vh] text-center px-6 pointer-events-none">
        {/* Badge */}
        <div className="pointer-events-auto  flex items-center gap-2 mb-6 text-xs font-medium text-neutral-600 dark:text-neutral-400 tracking-wide dark:bg-neutral-100/90 bg-zinc-950/80 backdrop-blur-md border border-neutral-300/80 dark:border-white/10 py-2 px-5 rounded-full shadow-sm dark:shadow-lg dark:shadow-emerald-950/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block absolute animate-ping" />
          <span className="text-black -mb-1/2">Technical Students' Society</span>
        </div>

        {/* Heading */}
        <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-openai font-extrabold tracking-tight leading-[1.05] max-w-4xl mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          <span className="relative z-10 bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-600 dark:from-white dark:via-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
            {/* <i>"Curiosity"</i> Is Our Common Language */}
            "Curiosity" Is Our Common Language
          </span>
        </h1>

        {/* Subtitle */}
        {/* <p className="max-w-xl text-sm md:text-base text-zinc-600 dark:text-neutral-400 leading-relaxed mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Official Technical Student Society of Guru Nanak Dev University. We
          empower students through workshops, hackathons, and technical
          excellence.
        </p> */}

        {/* CTAs */}
        <div className="pointer-events-auto flex flex-wrap justify-center gap-4 relative z-30">
          {/* Primary Button */}
          <Link
            href="/events"
            className="hero-btns group relative overflow-hidden bg-neutral-950 text-white dark:bg-zinc-800/80 dark:text-white border-neutral-900 dark:border-zinc-700 shadow-md hover:shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              Explore Events
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>

            {/* Glow effect */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 blur-md transition duration-300 pointer-events-none" />
          </Link>

          {/* Secondary Button */}
          {/* <Link
            href="/about"
            className="hero-btns group bg-white/90 dark:bg-zinc-800/80 text-neutral-800 dark:text-neutral-300 border-neutral-300 dark:border-zinc-700 hover:bg-neutral-100 dark:hover:bg-zinc-700 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Learn More
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link> */}
        </div>
      </div>

    </section>
  );
}
