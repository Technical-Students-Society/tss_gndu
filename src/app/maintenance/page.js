"use client";

import { Wrench, Clock } from "lucide-react";
import ShinyText from "../Animations/ShinyText";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-6">

            {/* Container */}
            <div className="max-w-2xl w-full text-center space-y-10">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="p-5 rounded-2xl border dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                        <Wrench className="h-8 w-8 text-neutral-600 dark:text-neutral-300" />
                    </div>
                </div>

                {/* Heading */}
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white">
                        Under Maintenance
                    </h1>

                    <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto">
                        We’re currently upgrading the experience to serve you better.
                        Please check back shortly.
                    </p>
                </div>

                {/* Status Card */}
                <div className="p-6 rounded-2xl border dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 space-y-4">

                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <Clock className="h-4 w-4" />
                        Expected downtime: <span className="font-medium text-neutral-700 dark:text-neutral-200">Few hours</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-neutral-900 dark:bg-white animate-pulse" />
                    </div>

                </div>

                {/* Footer */}
                <p className="text-xs text-neutral-400">
                    <ShinyText
                        text="Technical Students' Society • GNDU"
                        speed={2.8}
                        color="#b5b5b5"
                        shineColor="#ffffff"
                    />
                </p>

            </div>
        </div>
    );
}