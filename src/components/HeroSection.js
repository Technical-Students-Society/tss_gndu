"use client";

import Link from "next/link";
import ShinyText from "@/app/Animations/ShinyText";
import HeroPlanet from "@/components/HeroPlanet";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100dvh] font-openai overflow-hidden bg-[#06080e] dark:bg-siteblack text-white selection:bg-emerald-400 selection:text-black">
      {/* ── Interactive Pixel Art Planet with Emitting Aura Background ── */}
      <HeroPlanet />

      {/* ── Main content ── */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[100dvh] text-center px-6 pt-16 pb-28 pointer-events-none">
        {/* Badge */}
        <div className="pointer-events-auto flex items-center gap-2 mb-6 text-xs font-medium text-neutral-300 dark:text-neutral-400 tracking-wide bg-zinc-950/80 backdrop-blur-md border border-white/10 dark:border-zinc-800/80 py-2 px-5 rounded-full shadow-lg shadow-emerald-950/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block absolute animate-ping" />
          <ShinyText
            text="Technical Students' Society"
            speed={2.8}
            color="#b5b5b5"
            shineColor="#ffffff"
          />
        </div>

        {/* Heading */}
        <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-openai font-extrabold tracking-tight leading-[1.05] max-w-4xl mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          <span className="relative z-10 bg-gradient-to-b from-white via-zinc-100 to-zinc-400 dark:from-[#ffffff] dark:via-[#d4d4d4] dark:to-[#8a8a8a] bg-clip-text text-transparent">
            Curiosity Is Our Common Language
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-sm md:text-base text-zinc-300/90 dark:text-neutral-400 leading-relaxed mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Official Technical Student Society of Guru Nanak Dev University. We
          empower students through workshops, hackathons, and technical
          excellence.
        </p>

        {/* CTAs */}
        <div className="pointer-events-auto flex flex-wrap justify-center gap-4 relative z-30">
          {/* Primary Button */}
          <Link
            href="/events"
            className="hero-btns group relative overflow-hidden shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              View Events
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>

            {/* Glow effect */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 blur-md transition duration-300 pointer-events-none" />
          </Link>

          {/* Secondary Button */}
          <Link
            href="/about"
            className="hero-btns group hover:border-zinc-500 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Learn More
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── Seamless Bottom Anchor Fade ── */}
      <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none bg-gradient-to-t from-[#06080e] dark:from-siteblack via-transparent to-transparent" />
    </section>
  );
}
