"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextType from "@/app/Animations/TextType";

export default function Preloader({ loading, onFinish }) {
    const preloaderRef = useRef();
    const hasExited = useRef(false);

    useEffect(() => {
        if (!loading) {
            triggerExit();
        }
    }, [loading]);

    const triggerExit = () => {
        if (hasExited.current) return;
        hasExited.current = true;

        gsap.to(preloaderRef.current, {
            duration: 1.2,
            delay: 3,
            opacity: 0,
            onComplete: onFinish,
        });
    };

    return (
        <div ref={preloaderRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-siteblack pt-9 max-lg:pt-10 max-md:pt-8 pointer-events-none flex-col min-h-screen text-center px-6">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6 text-xs text-neutral-500 dark:text-neutral-400 tracking-wide bg-[#0C0C0E] p-2 rounded-full opacity-0">
                <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-orange-400 inline-block absolute animate-ping" />
                Technical Students' Society
            </div>

            {/* Headline */}
            <h1 className="text-5xl pointer-events-none sm:text-6xl md:text-7xl lg:text-[5.5rem] font-openai font-extrabold tracking-tight leading-[1.05] text-neutral-900 dark:text-white max-w-3xl mb-5 text-center">
                <TextType
                    text={["Bridging Tech & Innovation"]}
                    typingSpeed={95}
                    pauseDuration={1500}
                    showCursor
                    deletingSpeed={false}
                    cursorBlinkDuration={0.5}
                />
            </h1>

            {/* Sub */}
            <p className="max-w-xl text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-9 opacity-0">
                Official Technical Student Society of Guru Nanak Dev University. We
                empower students through workshops, hackathons, and technical
                excellence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-3 opacity-0">
                <div
                    className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900 inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900 inline-block absolute animate-ping" />
                    View Events
                </div>
                <div
                    className="inline-flex items-center gap-2 h-11 px-7 rounded-full border border-neutral-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 inline-block absolute animate-ping" />
                    Learn More
                </div>
            </div>
        </div>
    );
}
