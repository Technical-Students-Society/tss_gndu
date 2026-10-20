"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
                className={`relative w-full h-full scale-80 rounded-xl bg-siteblack flex flex-col items-center font-openai transition-opacity duration-500 min-h-[100dvh] ${fontsLoaded ? "opacity-100" : "opacity-0"}`}
            >
                {/* Navbar spacer matching sticky navbar height */}
                <div className="h-16 w-full shrink-0" />

                {/* Main content matching HeroSection */}
                <div className="relative z-20 flex flex-col items-center pt-36 text-center px-6 pointer-events-none">
                    {/* Badge */}
                    <div className="pointer-events-auto flex items-center gap-2 mb-6 text-[8px] md:text-xs font-medium text-neutral-600 dark:text-neutral-400 tracking-wide dark:bg-neutral-100/90 bg-zinc-900 backdrop-blur-md border border-neutral-300/80 dark:border-white/10 py-2 px-5 rounded-full shadow-sm dark:shadow-lg dark:shadow-emerald-950/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block absolute animate-ping" />
                        <span className="text-white dark:text-black md:-mb-1 font-bold uppercase">Technical Students' Society, GNDU</span>
                    </div>

                    {/* Heading */}
                    <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-openai font-extrabold tracking-tight leading-[1.05] max-w-4xl mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                        <span className="relative z-10 bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-600 dark:from-white dark:via-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                            Real learning happens outside classroom
                        </span>
                    </h1>
                </div>

                {/* Counter */}
                <span className={`absolute bottom-8 right-8 text-7xl font-semibold tabular-nums transition-colors ${count === 100 ? "text-emerald-500" : "text-zinc-500"}`}>
                    {count}%
                </span>
            </div>
        </div>
    );
}
