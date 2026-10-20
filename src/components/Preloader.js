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
        <div ref={preloaderRef} className="fixed inset-0 z-[9999] flex flex-col items-center bg-white dark:bg-siteblack pointer-events-none min-h-screen font-openai">
            {/* Navbar spacer */}
            <div className="h-16 w-full shrink-0" />

            {/* Main content matching HeroSection */}
            <div className="relative z-20 flex flex-col items-center pt-36 text-center px-6 pointer-events-none">
                {/* Badge */}
                <div className="pointer-events-auto flex items-center gap-2 mb-6 text-[8px] md:text-xs font-medium text-neutral-600 dark:text-neutral-400 tracking-wide dark:bg-neutral-100/90 bg-zinc-900 backdrop-blur-md border border-neutral-300/80 dark:border-white/10 py-2 px-5 rounded-full shadow-sm dark:shadow-lg dark:shadow-emerald-950/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block absolute animate-ping" />
                    <span className="text-white dark:text-black md:-mb-1 font-bold uppercase">Technical Students' Society, GNDU</span>
                </div>

                {/* Headline */}
                <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-openai font-extrabold tracking-tight leading-[1.05] max-w-4xl mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                    <span className="relative z-10 bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-600 dark:from-white dark:via-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                        <TextType
                            text={["Real learning happens outside classroom"]}
                            typingSpeed={95}
                            pauseDuration={1500}
                            deletingSpeed={false}
                        />
                    </span>
                </h1>
            </div>
        </div>
    );
}
