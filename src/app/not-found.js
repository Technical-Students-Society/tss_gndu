"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-siteblack flex items-center justify-center px-6 overflow-hidden">

      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/20 blur-[180px]" />
      </div>

      {/* 🔥 Content */}
      <div className="relative z-10 text-center max-w-xl">

        {/* 404 Number */}
        <h1 className="text-7xl sm:text-8xl font-extrabold text-white tracking-tight">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-neutral-200">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-neutral-400">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
