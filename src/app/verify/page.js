"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-white dark:bg-siteblack">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-8"
        >
          <ShieldCheck size={40} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-neutral-50 mb-6 tracking-tight"
        >
          Certificate <span className="text-purple-600">Verification</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed"
        >
          This feature will be available soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >


          <Link href='/'
            className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-50 border border-neutral-300 dark:border-neutral-700 rounded-full px-5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Back to Home
            <span className="transform transition duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </main>
  );
}
