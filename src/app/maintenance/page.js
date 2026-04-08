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
        <div className="min-h-screen flex items-center justify-center bg-[#070707] px-6 relative overflow-hidden">

            {/* Background Grain/Noise or Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent opacity-50" />

            {/* Container */}
            <div className="max-w-3xl w-full text-center space-y-12 relative z-10">

                {/* Animated Icon Container */}
                <div className="flex justify-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl group-hover:bg-white/10 transition-all duration-700" />
                        <div className="relative p-6 rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl ring-1 ring-white/5">
                            <Wrench className="h-10 w-10 text-white animate-[spin_4s_linear_infinite]" />
                        </div>
                    </div>
                </div>

                {/* Heading & Text */}
                <div className="space-y-6">
                    <h1 className="text-5xl sm:text-7xl font-bold text-white">
                        We are under <br />
                        <span className="text-neutral-500">a bit of Maintenance.</span>
                    </h1>

                    <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
                        We’re refining the technical core to bring you a smoother experience.
                    </p>
                </div>

                {/* Status Dashboard */}


                {/* Branding Footer */}
                <div className="pt-4 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-neutral-600">
                        <Heart className="h-3 w-3 fill-current" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Built with precision</span>
                    </div>
                    <ShinyText
                        text="Technical Students' Society • GNDU"
                        speed={3}
                        color="#404040"
                        shineColor="#ffffff"
                    />
                </div>

            </div>

        </div>
    );
}
