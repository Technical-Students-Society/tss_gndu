"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

// ── Individual Progressive Image Card ──
function GalleryImageItem({ image, index, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-300/80 dark:border-neutral-800 cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 select-none"
      onClick={onClick}
    >
      {/* Visual Shimmer & Skeleton while image is loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-200/70 via-neutral-100/90 to-neutral-200/70 dark:from-neutral-900/90 dark:via-neutral-800/50 dark:to-neutral-900/90 animate-pulse z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-500">
            <ImageIcon className="w-8 h-8 opacity-40 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-widest uppercase opacity-60">
              Loading...
            </span>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-500 p-4 text-center">
          <ImageIcon className="w-8 h-8 mb-2 opacity-40" />
          <p className="text-xs font-medium">Failed to load preview</p>
        </div>
      ) : (
        /* Optimized Lazy Progressive Image */
        <img
          src={image.src}
          alt={image.alt || "Gallery memory"}
          loading="lazy"
          decoding="async"
          fetchPriority={index < 3 ? "high" : "low"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${
            isLoaded
              ? "opacity-100 scale-100 blur-0 group-hover:scale-105"
              : "opacity-0 scale-105 blur-sm"
          }`}
        />
      )}

      {/* Subtle hover vignette overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}

// ── Lightbox Modal Component ──
function LightboxModal({ images, selectedIndex, onClose, onPrev, onNext }) {
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  useEffect(() => {
    setModalImageLoaded(false);
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const currentImage = images[selectedIndex];
  if (!currentImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-siteblack/95 backdrop-blur-md p-4 sm:p-10 select-none"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[110] cursor-pointer rounded-full bg-white/5 hover:bg-white/10"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={28} />
      </button>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 sm:left-10 p-3.5 text-white/60 hover:text-white transition-colors z-[110] bg-white/10 hover:bg-white/20 rounded-full cursor-pointer backdrop-blur-sm"
        onClick={onPrev}
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 sm:right-10 p-3.5 text-white/60 hover:text-white transition-colors z-[110] bg-white/10 hover:bg-white/20 rounded-full cursor-pointer backdrop-blur-sm"
        onClick={onNext}
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Image Container */}
      <motion.div
        key={selectedIndex}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-full max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {!modalImageLoaded && (
          <div className="flex flex-col items-center justify-center min-w-[280px] min-h-[200px] text-white/60 gap-3">
            <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-[11px] uppercase tracking-widest font-semibold">Loading High-Res...</span>
          </div>
        )}
        <img
          src={currentImage.src}
          alt={currentImage.alt || "Full capture"}
          decoding="async"
          onLoad={() => setModalImageLoaded(true)}
          className={`max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
            modalImageLoaded ? "opacity-100" : "hidden"
          }`}
        />
      </motion.div>
    </motion.div>
  );
}

export default function GalleryClient() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(6);
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

        const galleryImages = (data || [])
          .filter(
            (file) =>
              file.name !== ".emptyKeep" &&
              (file.name.endsWith(".jpg") ||
                file.name.endsWith(".png") ||
                file.name.endsWith(".webp") ||
                file.name.endsWith(".jpeg"))
          )
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

  const loadMoreImages = () => {
    setExpanded((prev) => prev + 6);
  };

  const collapseImages = () => {
    setExpanded(6);
  };

  // ── Skeleton Loader (Instant Grid Layout while fetching image manifests) ──
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end">
          <div className="w-28 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200/60 dark:bg-neutral-900/60 border border-neutral-300/60 dark:border-neutral-800/60 animate-pulse flex flex-col items-center justify-center gap-2 text-neutral-400 dark:text-neutral-600"
            >
              <ImageIcon className="w-8 h-8 opacity-30" />
              <span className="text-[10px] uppercase tracking-widest font-semibold opacity-50">
                Loading archive...
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Metrics Badge */}
      <div className="mb-8 flex justify-end">
        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-100 dark:bg-neutral-900/50 px-4 py-2 rounded-full border dark:border-neutral-800 backdrop-blur-sm">
          {images.length} Captured Items
        </div>
      </div>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.slice(0, expanded).map((image, index) => (
            <GalleryImageItem
              key={image.id || image.src}
              image={image}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
          <ImageIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
            No captures found in the archives yet.
          </p>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest font-bold">
            Check back soon for updates
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {images.length > 6 && (
        <div className="pt-8 flex justify-center gap-4">
          {expanded < images.length && (
            <button onClick={loadMoreImages} className="gallery-btns">
              Load more
            </button>
          )}
          {expanded > 6 && (
            <button onClick={collapseImages} className="gallery-btns">
              Show Less
            </button>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <LightboxModal
            images={images}
            selectedIndex={selectedImageIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}