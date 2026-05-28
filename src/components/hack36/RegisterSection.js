"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import BrickButton from "./BrickButton";
import sticker1 from "./stickers/sticker1.png";
import sticker2 from "./stickers/sticker2.png";
import sticker3 from "./stickers/sticker3.png";
import sticker4 from "./stickers/sticker4.png";

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
      className="px-4 md:px-12 lg:px-20 xl:px-32 py-16 md:py-24 md:pt-32  relative overflow-hidden bg-purple-100"
    >
      {/* Background large text */}
      <div
        className=" absolute top-1/2 left-1/2 -translate-x-1/2 font-lowres-pixel text-purple-300/50 -translate-y-1/2 opacity-35 leading-none pointer-events-none select-none"

        style={{ fontSize: "clamp(100px,25vw,400px)", }}
      >
        REGISTER
      </div>

      {/* Background Stickers */}

      <img
        src={sticker3.src}
        alt=""
        className="absolute bottom-6 md:bottom-10 right-8 md:right-10 w-18 md:w-36 h-auto object-contain pointer-events-none select-none  rotate-12 z-0"
      />


      {/* Dot bar — desktop only */}
      <div
        ref={dotBarRef}
        style={{ paddingLeft: 40, paddingRight: 40 }}
        className="hidden lg:flex absolute left-0 w-full items-center justify-between pointer-events-none z-0 -translate-y-1/2"
      >
        <div className="flex gap-4 items-center relative">
          <img
            src="/hack36/cat-2.png"
            alt="Cat Left"
            className="absolute -top-18 left-6 w-18 h-18 object-contain pointer-events-none"
          />
          <div ref={dot1Ref} className="rotate-45 w-4 h-4 bg-purple-500" />
          <div
            style={{ transform: "none" }}
            className="bg-white/80 backdrop-blur-sm text-zinc-700 border border-zinc-200 px-3 rounded-md uppercase py-1 text-lg tracking-wider font-mono-dm"
          >
            BUILD
          </div>
        </div>

        <div className="flex gap-4 items-center relative">
          <img
            src="/hack36/cat-1.png"
            alt="Cat Right"
            className="absolute -top-18 right-6 w-18 h-18 object-contain pointer-events-none"
          />
          <div
            style={{ transform: "none" }}
            className="bg-white/80 backdrop-blur-sm text-zinc-700 px-3 border border-zinc-200 rounded-md uppercase py-1 text-lg tracking-wider font-mono-dm"
          >
            ACHIEVE
          </div>
          <div ref={dot2Ref} className="rotate-45 w-4 h-4 bg-purple-500" />
        </div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto text-center">

        {/* Interactive Hover Zone */}
        <div
          onMouseEnter={() => { stretchBox(); shakeDots(); }}
          onMouseLeave={() => { hideBox(); resetDots(); }}
          onMouseMove={trackDots}
          className="inline-block w-full py-4 cursor-pointer"
        >
          <h2
            className="font-lowres-pixel font-bold text-zinc-900 tracking-wider leading-[0.9] mb-8 md:mb-12 flex flex-col items-center select-none"
            style={{ fontSize: "clamp(52px, 9vw, 140px)" }}
          >
            <span>READY TO</span>
            <span className="flex items-center gap-3 md:gap-6 text-purple-600">
              <span>BUILD?</span>
              <span
                ref={boxRef}
                className="w-0 h-16 md:h-30 hidden md:flex justify-center overflow-hidden bg-zinc-500 rounded-xl flex-shrink-0"
                style={{ transition: "width 0.1s ease-out" }}
              >
                <img
                  className="min-w-[12rem] h-auto object-cover"
                  src="/hack36/hhack36-greek.png"
                  alt="Team Coding"
                />
              </span>
            </span>
          </h2>
        </div>

        <BrickButton
          href="#"
          size="responsive"
          className="mb-10 md:mb-16 py-3 px-4  sm:w-auto"
        >
          Register Now
        </BrickButton>

        {/* Badges */}
        {/* <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-6 md:mt-8">
          {["🍕 Food Included", "⏱ 24H Coding Sprint", "💻 Creative Workspace", "🔥 Mentorship"].map((t) => (
            <span
              key={t}
              className="font-mono-dm text-[11px] md:text-sm tracking-widest text-zinc-600 bg-white px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-zinc-200 shadow-sm"
            >
              {t}
            </span>
          ))}
        </div> */}
      </div>
    </section>
  );
}