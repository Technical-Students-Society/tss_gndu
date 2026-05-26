"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function RegisterSection() {
  const boxRef = useRef(null);
  const dotBarRef = useRef(null);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const sectionRef = useRef(null);

  const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

  const stretchBox = () => {
    if (!isDesktop()) return;
    gsap.to(boxRef.current, { width: 170, duration: 0.25, ease: "power2.out" });
  };

  const hideBox = () => {
    if (!isDesktop()) return;
    gsap.to(boxRef.current, { width: 0, duration: 0.2, ease: "power2.in" });
  };

  const trackDots = (e) => {
    if (!dotBarRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const rawY = e.clientY - rect.top;
    const clamped = Math.max(60, Math.min(rawY, rect.height - 60));
    gsap.to(dotBarRef.current, {
      top: clamped,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const shakeDots = () => {
    gsap.to(dotBarRef.current, {
      paddingLeft: 80,
      paddingRight: 80,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to([dot1Ref.current, dot2Ref.current], {
      rotate: 405,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const resetDots = () => {
    if (!sectionRef.current) return;
    const centerY = sectionRef.current.getBoundingClientRect().height / 2;
    gsap.to(dotBarRef.current, {
      paddingLeft: 40,
      paddingRight: 40,
      top: centerY,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to([dot1Ref.current, dot2Ref.current], {
      rotate: 45,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    if (dotBarRef.current && sectionRef.current) {
      const h = sectionRef.current.getBoundingClientRect().height;
      gsap.set(dotBarRef.current, { top: h / 2 });
    }

    return () => {
      gsap.killTweensOf([
        boxRef.current,
        dotBarRef.current,
        dot1Ref.current,
        dot2Ref.current,
      ]);
    };
  }, []);

  return (
    <section
      id="register"
      ref={sectionRef}
      className="px-4 md:px-12 lg:px-20 xl:px-32 py-24 pt-32  border-t border-zinc-200 relative overflow-hidden bg-zinc-200"
    >
      {/* Background large text */}
      <div
        className="bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 leading-none pointer-events-none"
        style={{ fontSize: "clamp(160px,25vw,400px)", WebkitTextStroke: "1px #e4e4e7" }}
      >
        REG
      </div>

      {/* Dot bar — desktop only */}
      <div
        ref={dotBarRef}
        style={{ paddingLeft: 40, paddingRight: 40 }}
        className="hidden lg:flex absolute left-0 w-full items-center justify-between pointer-events-none z-0 -translate-y-1/2"
      >
        <div className="flex gap-4 items-center">
          <div ref={dot1Ref} className="rotate-45 w-4 h-4 bg-yellow-500" />
          <div className="bg-black  backdrop-blur-sm  text-yellow-300 border border-zinc-200 px-3 rounded-md uppercase py-1 text-lg tracking-wider font-mono-dm">
            BUILD
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="bg-black  backdrop-blur-sm text-yellow-300 px-3 border border-zinc-200 rounded-md uppercase py-1 text-lg tracking-wider font-mono-dm">
            ACHIEVE
          </div>
          <div ref={dot2Ref} className="rotate-45 w-4 h-4 bg-yellow-500" />
        </div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto text-center">
        {/* <p className="font-mono-dm text-xs tracking-widest text-zinc-500 mb-8">// 04 REGISTER</p> */}

        {/* Interactive Hover Zone (Heading + Paragraph) */}
        <div
          onMouseEnter={() => { stretchBox(); shakeDots(); }}
          onMouseLeave={() => { hideBox(); resetDots(); }}
          onMouseMove={trackDots}
          className="inline-block w-full py-4 cursor-pointer"
        >
          {/* Interactive Heading */}
          <h2
            className="font-lowres-pixel font-bold text-zinc-900 tracking-wider leading-[0.9] mb-12 flex flex-col items-center select-none"
            style={{ fontSize: "clamp(54px,9vw,140px)" }}
          >
            <span>READY TO</span>
            <span className="flex items-center gap-4 md:gap-6 text-purple-600">
              <span>BUILD?</span>
              <span
                ref={boxRef}
                className="w-0 h-16 md:h-30 hidden md:flex justify-center overflow-hidden bg-zinc-400 rounded-xl flex-shrink-0"
                style={{ transition: "width 0.1s ease-out" }}
              >
                <img
                  className="min-w-[14rem] h-auto object-cover"
                  // src="/hack36/hhack36-greek.png"
                  src="/hack36/stats-code.jpg"
                  alt="Team Coding"
                />
              </span>
            </span>
          </h2>

          {/* <p className="font-barlow text-zinc-600 font-normal tracking-wide mb-16 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            Problem statements drop in 1 day. Register your team, submit a proposal,
            <br className="hidden md:block" />get shortlisted — then build for 30 hours straight.
          </p> */}
        </div>

        <a
          href="#"
          className="clip-cta inline-flex items-center justify-center gap-4 px-14 md:px-20 py-6 md:py-8 bg-yellow-400 text-black font-anton text-2xl md:text-4xl tracking-wider no-underline hover:bg-yellow-300 transition-colors mb-16 w-full sm:w-auto shadow-2xl"
        >
          Register Your Team →
        </a>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
          {["🍕 Food Included", "⏱ 24H Coding Sprint", "💻 Creative Workspace", "🔥 Mentorship"].map((t) => (
            <span
              key={t}
              className="font-mono-dm text-xs md:text-sm tracking-widest text-zinc-600 bg-white px-6 py-3 rounded-full border border-zinc-200 shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
