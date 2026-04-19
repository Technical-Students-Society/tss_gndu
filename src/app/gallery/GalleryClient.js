"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@/utils/supabase/client";

export default function GalleryClient() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase.storage
          .from("tss-bucket")
          .list("event-images", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "desc" },
          });

        if (error) throw error;

        const galleryImages = data
          .filter((file) => file.name !== ".emptyKeep" && (file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.webp') || file.name.endsWith('.jpeg')))
          .map((file) => {
            const { data: publicUrlData } = supabase.storage
              .from("tss-bucket")
              .getPublicUrl(`event-images/${file.name}`);

            return {
              id: file.id,
              src: publicUrlData.publicUrl,
              alt: file.name,
              name: file.name,
            };
          });

        setImages(galleryImages);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-8 h-8 border-4 border-neutral-200 dark:border-neutral-800 border-t-neutral-900 dark:border-t-neutral-50 rounded-full animate-spin"></div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">Archiving Memories...</p>
      </div>
    );
  }

  return (
    <>
      {/* Metrics (Optional, now shown after loading) */}
      <div className="mb-8 flex justify-end">
        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-100 dark:bg-neutral-900/50 px-4 py-2 rounded-full border dark:border-neutral-800 backdrop-blur-sm">
          {images.length} Captured Items
        </div>
      </div>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id || image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900/40 dark:border-none border border-gray-400 cursor-pointer shadow-lg"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover gallery-target transition-transform duration-700 group-hover:scale-110"
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-siteblack/95 backdrop-blur-md p-4 sm:p-10"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[110] cursor-pointer"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 sm:left-10 p-4 text-white/30 hover:text-white transition-colors z-[110] bg-white/5 rounded-full hover:bg-white/10 cursor-pointer"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-4 sm:right-10 p-4 text-white/30 hover:text-white transition-colors z-[110] bg-white/5 rounded-full hover:bg-white/10 cursor-pointer"
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
    </>
  );
}
