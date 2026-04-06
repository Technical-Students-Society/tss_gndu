"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function VerifyPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
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
          className="text-lg text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed"
        >
          This feature will be available soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >


          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 font-bold hover:opacity-90 transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </main>
  );
}
