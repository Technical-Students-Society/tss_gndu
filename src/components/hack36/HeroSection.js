"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const target = new Date("2026-06-12T09:00:00");
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    const images = gsap.utils.toArray('.levitate-img', containerRef.current);
    const yMoves = [-60, -90, -40, -100, -70]; // Different speeds for each image

    images.forEach((img, i) => {
      // Preserve Tailwind scale-110 for the mascot (index 2)
      const baseScale = i === 2 ? 1.1 : 1;

      // GSAP overwrites Tailwind's transform, so we must set rotation via GSAP
      const baseRotation = img.classList.contains('-rotate-20') ? -20 : 0;

      gsap.set(img, { scale: baseScale, rotation: baseRotation });

      gsap.to(img, {
        y: yMoves[i] || -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    });
  }, { scope: containerRef });

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section id="overview" className=" bg-zinc-100 relative min-h-screen flex flex-col justify-center overflow-hidden   pt-0 pb-20">
      {/* Top Corner Side Action Items */}
      <div className="absolute top-18 left-1/2 -translate-x-1/2 w-full max-w-[90rem] px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 z-20">
        {/* Minimal Classy Countdown on the Left */}
        <div className="flex items-center gap-4 text-zinc-700 font-mono-dm text-xs tracking-widest uppercase bg-white/70 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-200 shadow-sm select-none">
          <span className="text-zinc-400">Starts in</span>
          <span className="font-semibold text-zinc-900 flex gap-2">
            <span>{pad(time.d)}d</span>
            <span className="text-zinc-300">:</span>
            <span>{pad(time.h)}h</span>
            <span className="text-zinc-300">:</span>
            <span>{pad(time.m)}m</span>
            <span className="text-zinc-300">:</span>
            <span>{pad(time.s)}s</span>
          </span>
        </div>

        {/* CTA Button on the Right */}
        <a
          href="#register"
          className="clip-cta bg-purple-600 hover:bg-purple-700 text-black font-gellix font-semibold tracking-wider py-2 px-8 transition-colors shadow-md select-none no-underline"
        >
          Register Now →
        </a>
      </div>

      <h1 className="font-openai font-bold tracking-wider  text-center -mt-20 mb-2 text-[14px] leading-none text-nowrap text-zinc-400">TSS@GNDU PRESENTS</h1>
      <div className="w-full flex justify-center">
        <h1 className="font-lowres-pixel text-[23vw] leading-none text-nowrap text-zinc-900">HACK 30</h1>
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* <div className="relative  flex justify-center lg:justify-center animate-fadeUp animate-delay-2 mt-16 lg:mt-0">
          <img
            src="/hero/hero-hack36.png"
            alt="Hack30 Hero"
            className="w-full max-w-lg lg:max-w-2xl xl:max-w-3xl object-contain drop-shadow-[0_0_60px_rgba(245,197,24,0.25)] hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div> */}
      </div>

      {/* Decorative Overlapping Bottom Images */}
      <div ref={containerRef} className="absolute -bottom-16 md:-bottom-34 left-1/2 -translate-x-1/2 w-full flex justify-center items-end pointer-events-none z-0 ">
        <img src="/hack36/hhack36-greek.png" alt="greek statue" className="levitate-img  pointer-events-auto cursor-pointer w-[35vw] md:w-[26vw] max-w-[500px] shrink-0 object-contain -mx-[16%] md:-mx-[8%] z-50" />
        <img src="/hack36/hack36-rocket.png" alt="rocket" className="-mb-15  levitate-img pointer-events-auto cursor-pointer w-[35vw] md:w-[35vw] max-w-[500px] shrink-0 object-contain -mx-[16%] md:-mx-[8%] z-20" />
        <img src="/hack36/hack30-comp.png" alt="computer" className="levitate-img pointer-events-auto cursor-pointer w-[35vw] md:w-[26vw] max-w-[500px] shrink-0 object-contain -mx-[16%] md:-mx-[6%] z-40" />
        <img src="/hack36/hack36-clock.png" alt="clock" className="-mb-15 levitate-img pointer-events-auto cursor-pointer w-[35vw] md:w-[30vw] max-w-[500px] shrink-0 object-contain -mx-[16%] md:-mx-[6%] z-20" />
        <img src="/hack36/hack36-mascot.png" alt="mascot" className="levitate-img pointer-events-auto cursor-pointer w-[35vw] md:w-[30vw] max-w-[500px] shrink-0 object-contain -mx-[16%] md:-mx-[12%] z-30 scale-110 mb-4 md:mb-8" />
        <img src="/hack36/hack36-dino.png" alt="dino" className="levitate-img pointer-events-auto cursor-pointer w-[35vw] md:w-[28vw] max-w-[500px] shrink-0 object-contain -mx-[16%] md:-mx-[7%] z-10" />
      </div>
    </section>
  );
}
