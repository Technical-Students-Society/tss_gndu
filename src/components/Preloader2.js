"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Preloader({ loading, onFinish }) {
    const preloaderRef = useRef();
    const innerRef = useRef();
    const hasExited = useRef(false);
    const [count, setCount] = useState(0);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        // Wait for all fonts to be ready before showing content
        if (typeof document !== 'undefined' && document.fonts) {
            document.fonts.ready.then(() => {
                // Short timeout to ensure the browser has finished layout
                setTimeout(() => setFontsLoaded(true), 50);
            });
        } else {
            // Fallback for older browsers
            setFontsLoaded(true);
        }

        let current = 0;
        const interval = setInterval(() => {
            current++;
            setCount(current);
            if (current >= 100) clearInterval(interval);
        }, 28);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!loading && count >= 100) triggerExit();
    }, [loading, count]);

    const triggerExit = () => {
        if (hasExited.current) return;
        hasExited.current = true;

        gsap.to(innerRef.current, {
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            onComplete: () => {
                gsap.to(preloaderRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: onFinish,
                });
            },
        });
    };

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-900 pointer-events-none min-h-[100dvh]"
        >
            <div
                ref={innerRef}
                className={`relative w-full h-full md:scale-80 rounded-xl pt-32 bg-siteblack flex flex-col items-center justify-center text-center px-6 pb-24 font-openai transition-opacity duration-500 min-h-[100dvh] ${fontsLoaded ? "opacity-100" : "opacity-0"}`}
            >
                {/* Badge */}
                <div className="flex items-center gap-2 mb-6 text-xs font-medium text-neutral-500 dark:text-neutral-400 tracking-wide bg-[#0C0C0E] p-2 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-orange-400 inline-block absolute animate-ping" />
                    Technical Students' Society
                </div>

                <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-openai font-extrabold tracking-tight leading-[1.05]  max-w-3xl mb-5 pointer-events-none">

                    <span className="relative z-10 bg-gradient-to-b from-[#ffffff] via-[#d4d4d4] to-[#737373] bg-clip-text text-transparent">
                        Bridging Tech & Innovation
                    </span>

                    {/* 3D Depth Layers */}
                    <span className="absolute inset-0 dark:text-neutral-400 blur-[1px] translate-x-[2px] translate-y-[2px] opacity-70">
                        Bridging Tech & Innovation
                    </span>

                    <span className="absolute inset-0 dark:text-neutral-600 translate-x-[4px] translate-y-[4px] opacity-50">
                        Bridging Tech & Innovation
                    </span>
                </h1>

                {/* Sub */}
                <p className="max-w-xl text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-9">
                    Official Technical Student Society of Guru Nanak Dev University. We
                    empower students through workshops, hackathons, and technical
                    excellence.
                </p>

                {/* CTAs - Perfectly synced with HeroSection classes to ensure identical height/wrapping */}
                <div className="flex flex-wrap opacity-0 pointer-events-none justify-center gap-4">
                    <div
                        className="group inline-flex items-center gap-2 h-11 px-6 rounded-full border border-neutral-300 dark:border-zinc-700 bg-siteblack dark:bg-zinc-800/70 backdrop-blur-sm text-neutral-400 dark:text-neutral-300 text-sm font-semibold transition-colors"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View Events
                            <span>→</span>
                        </span>
                    </div>
                    <div
                        className="group inline-flex items-center gap-2 h-11 px-6 rounded-full border border-neutral-300 dark:border-zinc-700 bg-siteblack dark:bg-zinc-800/70 backdrop-blur-sm text-neutral-400 dark:text-neutral-300 text-sm font-semibold transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            Learn More
                            <span>→</span>
                        </span>
                    </div>
                </div>

                {/* Counter */}
                <span className={`absolute bottom-8 right-8 text-7xl font-semibold tabular-nums transition-colors ${count === 100 ? "text-orange-400" : "text-zinc-500"}`}>
                    {count}%
                </span>
            </div>
        </div>
    );
}
