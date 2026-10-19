"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : null;

export default function EventCard({ event, onSelect, thumbnailHeight = "aspect-[3/2]" }) {
  const now = new Date();
  const isPast =
    !event.is_coming_soon && event.start_at && new Date(event.start_at) < now;
  const isUpcoming = !isPast && !event.is_coming_soon;

  const handleCardClick = () => {
    if (isPast || event.is_coming_soon) {
      onSelect(event);
    } else {
      onSelect(event);
    }
  };

  return (
    <article className="group cursor-pointer" onClick={handleCardClick}>
      {/* Thumbnail */}
      <div className={`relative w-full ${thumbnailHeight} overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 mb-5`}>
        {event.thumbnail ? (
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-300 dark:text-neutral-700">
              No preview
            </span>
          </div>
        )}

        {/* "New" label for upcoming events */}
        {isUpcoming && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-neutral-950/80 text-white backdrop-blur-sm border border-white/10">
              New
            </span>
          </div>
        )}

        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-50 leading-snug mb-1.5 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
        {event.title}
      </h3>

      {/* Caption */}
      {event.caption && (
        <p className="text-[15px] font-semibold text-neutral-500 dark:text-neutral-400 mb-2 leading-snug truncate">
          {event.caption}
        </p>
      )}

      {/* Date */}
      <p className="text-[12px] font-semibold text-neutral-400 dark:text-neutral-600 tracking-wide mb-4">
        {event.is_coming_soon
          ? "Coming Soon"
          : event.start_at
            ? formatDate(event.start_at)
            : "Date TBA"}
      </p>

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Register — upcoming with reg_link */}
        {isUpcoming && event.reg_link && (
          <a
            href={event.reg_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors duration-200"
          >
            Register Now
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}

        {/* View Details — always */}
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(event); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
