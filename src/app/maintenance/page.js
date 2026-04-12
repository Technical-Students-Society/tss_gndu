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
        <section className="min-h-screen bg-siteblack text-white flex items-center justify-center px-6 relative overflow-hidden font-openai">

            {/* ⚪ Soft Glow Background */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[120px]" />

            {/* ✨ Noise Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)] pointer-events-none" />

            {/* 📦 Main Layout */}
            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* 🖼 LEFT - IMAGE */}
                <div className="relative flex justify-center max-lg:hidden">
                    <img
                        src="/images/illustrations/maintenance.png"
                        alt="Maintenance Illustration"
                        className="w-full max-w-lg drop-shadow-[0_0_40px_rgba(255,255,255,0.08)]" />
                </div>

                {/* 📄 RIGHT - CONTENT */}
                <div className="space-y-8 text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-neutral-300">
                        <Wrench className="w-4 h-4 text-white/70" />
                        Maintenance Mode
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                        Under <span className="text-white/60">Maintenance</span><br />
                        We’ll Be Back Soon
                    </h1>

                    {/* Description */}
                    <p className="text-neutral-400">
                        We’re currently improving the experience. The site will be available again very soon.
                    </p>


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
        </section>

    );
}
