"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  ArrowUpRight,
  Info,
  Trophy,
  Users,
  HeartHandshake,
} from "lucide-react";
import { formatEventDateTime } from "@/utils/dateFormatter";
import gsap from "gsap";

const getWinnerBadgeStyle = (position, idx) => {
  const pos = String(position || "").toLowerCase();
  if (pos.includes("1") || pos.includes("first") || idx === 0) {
    return "bg-amber-100 text-amber-900  dark:bg-amber-300 dark:text-amber-900 ";
  }
  if (pos.includes("2") || pos.includes("second") || idx === 1) {
    return "bg-sky-100 text-sky-900 dark:bg-sky-300 dark:text-sky-900 ";
  }
  if (pos.includes("3") || pos.includes("third") || idx === 2) {
    return "bg-rose-100 text-rose-900 dark:bg-rose-300 dark:text-rose-900 ";
  }
  return "bg-emerald-100 text-emerald-900 dark:bg-emerald-300 dark:text-emerald-900 ";
};

export default function EventModal({ event, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Contained image list: only use image_set if provided, or fallback to thumbnail
  const images =
    event.image_set && event.image_set.length > 0
      ? event.image_set
      : event.thumbnail
        ? [event.thumbnail]
        : [];

  const winners = Array.isArray(event.winners) ? event.winners : [];
  const organizers = Array.isArray(event.organizers) ? event.organizers : [];
  const volunteers = Array.isArray(event.volunteers) ? event.volunteers : [];
  const hasCredits =
    winners.length > 0 || organizers.length > 0 || volunteers.length > 0;

  const now = new Date();
  const isPast =
    !event.is_coming_soon && event.start_at && new Date(event.start_at) < now;
  const isUpcoming = !isPast && !event.is_coming_soon;

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    // Smooth subtle entry
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "power2.out" }
    );
    gsap.fromTo(
      modalRef.current,
      { y: 16, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" }
    );

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight" && images.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length]);

  // Auto slide images every 4 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, currentImageIndex]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.18,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      y: 12,
      opacity: 0,
      scale: 0.98,
      duration: 0.18,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex font-openai items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${isUpcoming
                ? "bg-emerald-500"
                : event.is_coming_soon
                  ? "bg-amber-500"
                  : "bg-neutral-400"
                }`}
            />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {isUpcoming
                ? "Upcoming Event"
                : event.is_coming_soon
                  ? "Coming Soon"
                  : "Past Event"}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div
          data-lenis-prevent="true"
          className="overflow-y-auto overscroll-none flex-1 p-6 sm:p-8 space-y-8"
        >
          {/* Primary Layout: Side-by-side on desktop, stacked on mobile */}
          <div
            className={`grid grid-cols-1 ${images.length > 0 ? "lg:grid-cols-12 gap-8 items-start" : ""
              }`}
          >
            {/* Left Column: Key Details & About (7 cols) */}
            <div
              className={`space-y-6 ${images.length > 0 ? "lg:col-span-7" : "max-w-2xl"
                }`}
            >
              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 leading-snug">
                  {event.title}
                </h2>
                {event.caption && (
                  <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-2 font-normal leading-relaxed">
                    {event.caption}
                  </p>
                )}
              </div>

              {/* Quick Specs: Date, Time, Venue — Big & Clear */}
              <div className="space-y-3 py-3 border-y border-neutral-100 dark:border-neutral-800/80">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                      Schedule
                    </span>
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {event.is_coming_soon
                        ? "Dates to be announced"
                        : formatEventDateTime(event.start_at, event.end_at)}
                    </span>
                  </div>
                </div>

                {/* Location */}
                {event.location && !event.is_coming_soon && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                        Venue
                      </span>
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {event.location}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button: Register if upcoming */}
              {isUpcoming && event.reg_link && (
                <div>
                  <a
                    href={event.reg_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
                  >
                    Register for Event
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Right Column: Contained Image Box (5 cols, not full width) */}
            {images.length > 0 && (
              <div className="lg:col-span-5 space-y-3">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 group">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${event.title} preview`}
                    className="w-full h-full object-cover transition-opacity duration-200"
                  />

                  {/* Multiple image arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 hover:scale-105 active:scale-95"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 hover:scale-105 active:scale-95"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                      </button>

                      {/* Pill index counter */}
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Optional mini thumbnails or dot bar if more than 1 image */}
                {images.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === currentImageIndex
                          ? "w-5 bg-neutral-900 dark:bg-neutral-100"
                          : "w-1.5 bg-neutral-300 dark:bg-neutral-700"
                          }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Full-width About Section */}
          {event.description && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                  About
                </h3>
              </div>
              <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 font-normal">
                {event.description}
              </p>
            </div>
          )}

          {/* Bottom Highlights & Credits (Winners, Organizers, Volunteers) */}
          {hasCredits && (
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-7">
              {/* Winners Podium / Showcase */}
              {winners.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                      Winners
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {winners.map((winner, idx) => (
                      <div
                        key={idx}
                        className="relative p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 hover:bg-neutral-100/60 dark:hover:bg-neutral-900/80 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider  ${getWinnerBadgeStyle(
                              winner.position,
                              idx
                            )}`}
                          >
                            {winner.position || `#${idx + 1}`}
                          </span>

                        </div>
                        <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate">
                          {winner.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Credits (Organizers & Volunteers) */}
              {(organizers.length > 0 || volunteers.length > 0) && (
                <div
                  className={`grid grid-cols-1 ${organizers.length > 0 && volunteers.length > 0
                    ? "md:grid-cols-2 gap-8"
                    : "max-w-xl"
                    } items-start ${winners.length > 0 ? "pt-6 border-t border-neutral-100 dark:border-neutral-800/80" : ""
                    }`}
                >
                  {/* Organizers List */}
                  {organizers.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                        <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                          Organizers
                        </h3>
                      </div>
                      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80 border-y border-neutral-100 dark:border-neutral-800/80">
                        {organizers.map((org, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2 text-xs"
                          >
                            <span className="font-medium text-neutral-800 dark:text-neutral-200">
                              {org.name}
                            </span>
                            {org.role && (
                              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[11px]">
                                {org.role}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Volunteers Tags */}
                  {volunteers.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <HeartHandshake className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                        <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                          Volunteers
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {volunteers.map((vol, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 px-3 py-1 rounded-full border border-neutral-200/50 dark:border-neutral-800"
                          >
                            {vol.name}
                            {vol.role && (
                              <span className="text-neutral-400 dark:text-neutral-500 ml-1.5 text-[11px]">
                                · {vol.role}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

