"use client";

import { Play, CirclePile } from "lucide-react";
import CountUp from "../Animations/CountUp";
import ShinyText from "../Animations/ShinyText";
import { X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function AboutSection() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const openLightbox = () => setSelectedVideoIndex(0);
  const closeLightbox = () => setSelectedVideoIndex(null);

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
              <span className="text-neutral-400">Leads Dominate.</span>
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
            <div className="flex items-center pt-4">

              <button onClick={() => openLightbox()} className="flex items-center gap-2 text-sm dark:text-neutral-300 dark:hover:text-white transition cursor-pointer ">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-600 hover:bg-white hover:text-black transition">
                  <Play className="w-4 h-4" />
                </span>
                Watch Intro
              </button>
            </div>

           <div className="">
             <AnimatePresence>
              {selectedVideoIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-100 flex justify-center items-center bg-siteblack/95 backdrop-blur-lg"
                  onClick={closeLightbox}
                >
                  <button
                    className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[110] cursor-pointer"
                    onClick={closeLightbox}
                  >
                    <X size={32} />
                  </button>

                  {/* Image Container */}
                  <motion.div
                    key={selectedVideoIndex}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative max-w-full max-h-full aspect-auto shadow-2xl rounded-lg overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <video
                      src="/videos/intro.mp4" autoPlay
                      controls
                      playsInline
                      controlsList="nodownload noplaybackrate noremoteplayback"
                      disablePictureInPicture
                      alt="Intro"
                      className="max-w-full max-h-[85vh] object-contain relative"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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