"use client";

import { useState, useEffect } from "react";
import { Wrench, Clock, Heart, Shield } from "lucide-react";
import ShinyText from "../Animations/ShinyText";

export default function MaintenancePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by not rendering dynamic animated parts until mounted
    if (!mounted) {
        return <div className="min-h-screen bg-[#070707]" />;
    }

    return (
        <section className="min-h-screen bg-black text-white flex items-center justify-between font-openai px-6 cursor-default">
            <img src="/images/illustrations/technical.png" alt="Robot" className="pointer-events-none absolute left-0 top-0 h-[32rem] md:h-[35rem] opacity-80 max-lg:hidden" />

            {/* Background Accent */}
            <div className="max-sm:hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-neutral-600/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutral-600/20 blur-[120px]" />
            </div>

            <div className="flex flex-col gap-5 right-10 max-lg:right-0 relative text-center">

                {/* Animated Icon Container */}
                <div className="flex justify-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl group-hover:bg-white/10 transition-all duration-700"/>
                        <div className="relative p-6 rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl ring-1 ring-white/5">
                            <Wrench className="h-10 w-10 text-white animate-[spin_4s_linear_infinite]" />
                        </div>
                    </div>
                </div>


                <h1 className="text-5xl font-semibold max-sm:text-3xl">Under <span className="text-neutral-500">Maintenance</span></h1>
                <p className="text-neutral-400 text-balance max-sm:text-xs">Sorry for the inconvenience, but performing some maintenance at the moment. <br className="max-sm:hidden" /> If you need to reach us, you can always contact us at {" "}<a href="mailto:tss.gndu@gmail.com" className=" hover:text-neutral-500 transition duration-300">tss.gndu@gmail.com</a> </p>

                <div className="pt-4 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-neutral-600">
                        <Heart className="h-3 w-3 fill-current" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Built with precision</span>
                    </div>
                    <ShinyText
                        text="Technical Students' Society • GNDU"
                        speed={2.8}
                        color="#404040"
                        shineColor="#ffffff"
                    />
                </div>

            </div>
        </section>

    );
}
