"use client";

import { Play, CirclePile } from "lucide-react";
import CountUp from "../Animations/CountUp";
import ShinyText from "../Animations/ShinyText";

export default function AboutSection() {
  return (
    <section className="font-openai relative isolate overflow-hidden dark:bg-siteblack">

      {/* <div className="absolute inset-0 bg-[url('/images/backgrounds/textured-surface.png')] bg-repeat-y bg-center opacity-25" /> */}


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
              Your Vision Our Expertise Your Success Get Noticed Generate{" "}
              <span className="text-red-500">Leads Dominate.</span>
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

            {/* Watch Intro */}
            <div className="flex items-center gap-4 pt-4">

              <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition cursor-pointer  ">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-600 hover:bg-white hover:text-black transition">
                  <Play className="w-4 h-4" />
                </span>
                Watch Intro
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}