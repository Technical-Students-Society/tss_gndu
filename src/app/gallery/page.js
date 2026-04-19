import GalleryClient from "./GalleryClient";
import { Image as ImageIcon } from "lucide-react";
import ShinyText from "../Animations/ShinyText";
import SplitText from "../Animations/SplitText";

export const metadata = {
  title: "Gallery | Events & Campus Highlights",
  description: "Browse the TSS GNDU gallery featuring highlights from workshops, hackathons, competitions, and campus events at Guru Nanak Dev University."
}

export const revalidate = 0;

export default function GalleryPage() {
  // Navigation is now instant. Data loading is handled by the GalleryClient.
  return (
    <div className="relative py-20 mx-auto font-openai dark:bg-siteblack px-4 md:px-12 lg:px-18 xl:px-30 max-sm:pb-3 min-h-screen">
      
      {/* ── Visual Shell (Instant) ── */}
      <div className="absolute inset-0 dark:bg-[url('/images/backgrounds/galaxy.jpg')] bg-repeat-y bg-center opacity-15 pointer-events-none"
        style={{ backgroundSize: '100% 24rem' }} 
      />

      {/* Header Section */}
      <div className="relative border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-14 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <p className="flex items-center justify-start gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              <ImageIcon size={20} />
              <ShinyText text="Visual Archive" speed={2.8}
                color="#b5b5b5"
                shineColor="#ffffff" />
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-[1.1]">
              <SplitText
                text={<>
                  Moments that{" "}
                  <span className="text-neutral-400">define us</span>
                </>}
                delay={45}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="start"
                showCallback={false}
              />
            </h1>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
              A curated collection of memories from our workshops, hackathons, and community gatherings.
            </p>
          </div>
        </div>

        {/* Subtle Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-neutral-300/20 dark:bg-neutral-700/20 blur-3xl pointer-events-none" />
      </div>

      {/* ── Dynamic Content ── */}
      <GalleryClient />
    </div>
  );
}
