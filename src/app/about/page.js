import { Sparkles, Target, Activity } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-15 max-w-5xl">

      {/* Header */}
      <div className="text-center space-y-6 mb-16">

        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border dark:border-neutral-600 bg-white dark:bg-black">
            <img
              src="/images/logos/about-logo.png"
              alt="TSS Logo"
              fill="true"
              className="object-contain pt-1"
              priority="true"
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wide">
          About TSS GNDU
        </h1>

        <p className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
          Empowering students with technical knowledge and real-world skills.
        </p>
        
      </div>

      {/* Subtle Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-75 h-37.5 bg-neutral-300/20 dark:bg-neutral-700/20 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="space-y-12">

        {/* Intro */}
        <div className="space-y-5 text-neutral-600 dark:text-neutral-400 leading-relaxed text-[15px]">
          <p className="flex gap-3">
            <Sparkles className="h-4 w-4 mt-1 text-neutral-400" />
            The Technical Students' Society (TSS) at Guru Nanak Dev University
            is more than just a society — it’s a bridge between academic learning
            and real-world industry demands.
          </p>

          <p className="flex gap-3">
            <Sparkles className="h-4 w-4 mt-1 text-neutral-400" />
            With a strong focus on innovation and collaboration, TSS has
            consistently delivered impactful workshops, hackathons, and
            tech-driven initiatives.
          </p>
        </div>

        {/* Mission */}
        <div className="p-6 rounded-2xl border dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 backdrop-blur-sm">
          <h2 className="flex items-center gap-2 text-xl font-bold uppercase tracking-tight mb-3">
            <Target className="h-5 w-5 text-neutral-500" />
            Our Mission
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-[15px] leading-relaxed">
            To foster a culture of innovation and provide a platform where
            students can explore, build, and showcase their technical skills.
            We aim to equip every member with the right tools, mentorship,
            and opportunities to excel in their careers.
          </p>
        </div>

        {/* What We Do */}
        <div className="p-6 rounded-2xl border dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 backdrop-blur-sm">
          <h2 className="flex items-center gap-2 text-xl font-bold uppercase tracking-tight mb-4">
            <Activity className="h-5 w-5 text-neutral-500" />
            What We Do
          </h2>

          <ul className="space-y-3 text-neutral-600 dark:text-neutral-400 text-[15px]">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Weekly workshops on trending technologies.
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Annual hackathons and coding competitions.
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Industrial visits and networking sessions.
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Collaborative projects and open-source contributions.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
