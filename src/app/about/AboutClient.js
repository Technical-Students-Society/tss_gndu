"use client";

import CountUp from "../Animations/CountUp";
import ShinyText from "../Animations/ShinyText";
import { Sparkles, CirclePile } from "lucide-react";
import SplitText from "../Animations/SplitText";

export default function AboutSection() {
  return (
    <section className="font-openai relative isolate overflow-hidden dark:bg-siteblack">

      <div className="max-lg:hidden absolute inset-0 dark:bg-[url('/images/backgrounds/textured-surface.png')] bg-repeat-y bg-center opacity-25" />

      <div className="mx-auto px-6 py-20 max-w-6xl container relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Label */}
            <div className="flex items-center gap-3 ">
              <CirclePile />
              <ShinyText
                text="About TSS GNDU"
                speed={2.8}
                color="#b5b5b5"
                shineColor="#ffffff"
              />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              <SplitText
                text={<>
                  Your Vision Our Expertise Your Success Get Noticed Generate{" "}
                  <span className="text-neutral-400">Leads Dominate.</span>
                </>}
                delay={20}
                duration={1.25}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="start"
                showCallback={false}
              />
            </h2>

            {/* Paragraph */}
            <p className="text-sm dark:text-neutral-400 leading-relaxed max-w-md">
              The Technical Students' Society bridges academic learning with
              real-world innovation through workshops, hackathons, and impactful
              collaborations.
            </p>

            {/* Big Image */}
            <div className="rounded-xl overflow-hidden group">
              <img
                src="/images/photos/photo.jpg"
                className="w-full max-sm:h-56 h-70 object-cover transition-transform duration-500 group-hover:scale-105"
                alt=""
              />
            </div>
            <p className="font-medium text-neutral-700 dark:text-neutral-300">
              Diverse teams, one shared horizon — exploring the frontiers of what's possible.
            </p>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Top Images */}
            <div className="flex max-sm:flex-col gap-4 max-sm:hidden">
              <img
                src="/images/photos/group-image.jfif"
                className="w-full h-40 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                alt=""
              />
              <img
                src="/images/photos/noor-mela.jfif"
                className="w-1/2 h-40 max-sm:w-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                alt=""
              />
            </div>

            {/* Description */}
            <p className="text-sm dark:text-neutral-400 leading-relaxed">
              TSS empowers students with technical expertise and real-world
              exposure, helping them build strong foundations and excel in their
              careers.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 max-sm:gap-7 pt-2">

              <div>
                <h3 className="text-2xl font-bold">
                  <CountUp from={0} to={10} duration={1.8} />+
                </h3>
                <p className="text-xs text-neutral-500">Projects</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  <CountUp from={0} to={50} duration={1} />+
                </h3>
                <p className="text-xs text-neutral-500">Students</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  <CountUp from={0} to={10} duration={1.7} />+
                </h3>
                <p className="text-xs text-neutral-500">Experience</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  <CountUp from={0} to={5} duration={2} />+
                </h3>
                <p className="text-xs text-neutral-500">Workshops</p>
              </div>

            </div>


            {/* Description */}
            <div className="space-y-5 text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">

              <p className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 mt-1 text-neutral-400 shrink-0" />
                Rooted in the MCA Department of Computer Science at Guru Nanak Dev University, TSS is the official student body dedicated to bridging academic curiosities with industry-leading innovation.
              </p>

              <p className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 mt-1 text-neutral-400 shrink-0" />
                Though our legacy spans decades, our registration in 2026 marked a new era of official recognition and scaled impact across the university.
              </p>

            </div>

            <div className="p-5 rounded-2xl border dark:border-white/10 dark:bg-white/5 border-gray-400 backdrop-blur-md shadow-sm hover:shadow-lg transition ease-in-out duration-300">
              <p className="text-xs text-neutral-400 mb-2">Since 2007</p>
              <h3 className="text-lg font-semibold">Building Future Developers</h3>
              <p className="text-xs text-neutral-500 mt-2">
                Empowering students through innovation, collaboration, and real-world exposure.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}