"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ShinyText from "../Animations/ShinyText";

export default function GalleryClient({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      {/* Header Section */}
      <div className="relative border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-14 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <p className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              <ImageIcon size={14} />
              <ShinyText text="Visual Archive" speed={3} />
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-[1.1]">
              Moments that <span className="text-neutral-400">define us</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
              A curated collection of memories from our workshops, hackathons, and community gatherings.
            </p>
          </div>

          <div className="hidden sm:block">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-4 py-2 rounded-full border dark:border-neutral-800">
              {images.length} Captured Items
            </div>
          </div>
        </div>

        {/* Subtle Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-neutral-300/20 dark:bg-neutral-700/20 blur-3xl pointer-events-none" />
      </div>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id || image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
          <ImageIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400 font-medium">No captures found in the archives yet.</p>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest font-bold">Check back soon for updates</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-10"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 sm:left-10 p-4 text-white/30 hover:text-white transition-colors z-[110] bg-white/5 rounded-full hover:bg-white/10"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-4 sm:right-10 p-4 text-white/30 hover:text-white transition-colors z-[110] bg-white/5 rounded-full hover:bg-white/10"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedImageIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full aspect-auto shadow-2xl rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
