"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BrickButton from "./BrickButton";

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
    const yMoves = [-60, -90, -40, -100, -70];

    images.forEach((img, i) => {
      const baseScale = i === 2 ? 1.1 : 1;
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
    <section id="overview" className="bg-purple-100 relative min-h-screen flex flex-col justify-center overflow-hidden pt-0 pb-20">

      {/* Top Corner Action Items */}
      <div className="absolute top-18 left-1/2 -translate-x-1/2 w-full max-w-[90rem] px-4 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3 z-20">
        {/* Countdown */}
        <div className="flex items-center gap-3 text-zinc-700 font-mono-dm text-[10px] md:text-xs tracking-widest uppercase bg-white/70 backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-zinc-200 shadow-sm select-none">
          <span className="text-zinc-400">Starts in</span>
          <span className="font-semibold text-zinc-900 flex gap-1.5 md:gap-2">
            <span>{pad(time.d)}d</span>
            <span className="text-zinc-300">:</span>
            <span>{pad(time.h)}h</span>
            <span className="text-zinc-300">:</span>
            <span>{pad(time.m)}m</span>
            <span className="text-zinc-300">:</span>
            <span>{pad(time.s)}s</span>
          </span>
        </div>

        {/* CTA */}
        <BrickButton
          href="#register"
          size="sm"
          className="select-none"
        >
          Register Now
        </BrickButton>
      </div>

      {/* Hero Title */}
      <h1 className="font-mono-dm font-medium tracking-[0.25em] text-center -mt-20 mb-3 text-[10px] sm:text-xs md:text-sm leading-none text-nowrap text-zinc-700">
        TSS-GNDU PRESENTS
      </h1>
      <div className="w-full flex justify-center">
        <h1 className="font-lowres-pixel text-[23vw] leading-none text-nowrap text-zinc-900">HACK 30</h1>
      </div>

      {/* Decorative Overlapping Bottom Images */}
      <div
        ref={containerRef}
        className="absolute -bottom-10 md:-bottom-34 left-[16px] md:left-1/2 md:-translate-x-1/2 w-full flex justify-center items-end pointer-events-none z-0"
      >
        <img
          src="/hack36/hhack36-greek.png"
          alt="greek statue"
          className="levitate-img pointer-events-auto cursor-pointer w-[65vw] md:w-[26vw] max-w-[500px] shrink-0 object-contain -mx-[26%] md:-mx-[8%] z-50 -mb-4 md:mb-0"
        />
        <img
          src="/hack36/hack36-rocket.png"
          alt="rocket"
          className=" md:-mb-15 -mb-36 levitate-img pointer-events-auto cursor-pointer w-[90vw] md:w-[35vw] max-w-[500px] shrink-0 object-contain -mx-[30%] md:-mx-[8%] z-20"
        />
        <img
          src="/hack36/hack30-comp.png"
          alt="computer"
          className="levitate-img pointer-events-auto cursor-pointer w-[68vw] md:w-[26vw] max-w-[500px] shrink-0 object-contain -ml-[42%] -mx-[38%] md:-mx-[6%] z-20 mb-12 md:mb-0"
        />
        <img
          src="/hack36/hack36-clock.png"
          alt="clock"
          className="-mb-12 md:-mb-15 levitate-img pointer-events-auto cursor-pointer w-[65vw] md:w-[30vw] max-w-[500px] shrink-0 object-contain -mx-[15%] -mr-[28%] md:-mx-[6%] z-40"
        />
        <img
          src="/hack36/hack36-mascot.png"
          alt="mascot"
          className="levitate-img pointer-events-auto cursor-pointer w-[72vw] md:w-[30vw] max-w-[500px] shrink-0 object-contain -mx-[16%] -mr-[28%] md:-mx-[12%] z-30 scale-110 mb-14 md:mb-8"
        />
        <img
          src="/hack36/hack36-dino.png"
          alt="dino"
          className="-mb-10 md:mb-0 levitate-img pointer-events-auto cursor-pointer w-[65vw] md:w-[28vw] max-w-[500px] shrink-0 object-contain -mx-[28%] md:-mx-[7%] z-10"
        />
      </div>
    </section>
  );
}