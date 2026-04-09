"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Trophy, Users, HeartHandshake, Cross } from "lucide-react";
import { formatEventDateTime } from "@/utils/dateFormatter";
import gsap from "gsap";

export default function EventModal({ event, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Initialize data arrays safely
  const images = event.image_set || [];
  const winners = Array.isArray(event.winners) ? event.winners : [];
  const organizers = Array.isArray(event.organizers) ? event.organizers : [];
  const volunteers = Array.isArray(event.volunteers) ? event.volunteers : [];

  useEffect(() => {
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = "hidden";

    // Animate in
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      modalRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)", delay: 0.1 }
    );

    // Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    // Animate out
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(modalRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };


  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 pr-8">
              {event.title}
            </h2>
            <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-widest">
              {formatEventDateTime(event.start_at, event.end_at)}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 cursor-pointer"
            aria-label="Close modal"
          >
            <Cross className="rotate-45" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div data-lenis-prevent="true" className="overflow-y-auto overscroll-none flex-1 p-6 space-y-8">
          
          {/* Main Content Grid: Description & Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                About the Event
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>
              {event.location && (
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 wrap-break-word">
                    Location: <span className="text-neutral-900 dark:text-neutral-50">{event.location}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Right: Image Slider */}
            {images.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Images from the event
                </h3>
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${event.title} image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex justify-center gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "bg-neutral-900 dark:bg-neutral-100 w-6"
                            : "bg-neutral-300 dark:bg-neutral-700"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            {images.length === 0 && event.thumbnail && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Images from the event
                </h3>
                 <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={event.thumbnail}
                    alt={`${event.title} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <hr className="border-neutral-200 dark:border-neutral-800" />

          {/* Details Grid: Winners, Organizers, Volunteers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Winners */}
            {winners.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                  <Trophy size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-50">
                    Winners
                  </h3>
                </div>
                <div className="space-y-3">
                  {winners.map((winner, idx) => (
                    <div key={idx} className="bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
                      <p className="font-bold text-neutral-900 dark:text-neutral-50">{winner.name}</p>
                      <div className="flex justify-between items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        <span>{winner.position} Position</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizers */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
                <Users size={20} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-50">
                  Organizers
                </h3>
              </div>
              <ul className="space-y-2">
                {organizers.length > 0 ? (
                  organizers.map((org, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm border-b border-neutral-100 dark:border-neutral-800 pb-2 last:border-0">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{org.name}</span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">{org.role}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-neutral-400 dark:text-neutral-500 italic">No data available.</p>
                )}
              </ul>
            </div>

            {/* Volunteers */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-500">
                <HeartHandshake size={20} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-50">
                  Volunteers
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {volunteers.length > 0 ? (
                  volunteers.map((vol, idx) => (
                    <span key={idx} className="text-xs font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full">
                      {vol.name} {vol.role && <span className="opacity-50 ml-1">({vol.role})</span>}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-neutral-400 dark:text-neutral-500 italic">No data available.</p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
