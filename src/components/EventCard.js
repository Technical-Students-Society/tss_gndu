"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EventCard({ event, onSelect }) {
  const now = new Date();
  const isPast = new Date(event.start_at) < now;
  const category = isPast ? "Past Event" : "New";

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      : "Date TBA";

  const handleInteraction = () => {
    if (isPast) {
      onSelect(event);
    } else if (event.reg_link) {
      window.open(event.reg_link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="group flex flex-col h-full">
      <div
        className={`relative w-full aspect-video   mb-3 cursor-pointer ${isPast ? 'event-target-2' : 'event-target-1'}`}
        onClick={handleInteraction}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 shadow-lg">
          {event.thumbnail ? (
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs font-semibold uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
              No Preview
            </div>
          )}
        </div>

        {!isPast && (
          <div className="absolute top-0 left-0 z-20 -translate-x-2 -translate-y-1/2">
            <span className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] backdrop-blur-xl rounded-xl border bg-purple-600 text-white border-purple-700 shadow-xl">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col grow">
        <h3
          className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 leading-snug mb-1 line-clamp-2 cursor-pointer "
          onClick={handleInteraction}
        >
          {event.title}
        </h3>

        <p className="text-sm text-neutral-500 dark:text-neutral-600 mb-1">
          {event.location || "Location TBA"} ({formatDate(event.start_at)})
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
          {event.description}
        </p>

        <div className="mt-auto">
          {!isPast ? (
            event.reg_link ? (
              <a
                href={event.reg_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:opacity-80 transition-opacity"
              >
                Register Now <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-400 cursor-not-allowed">
                Registration Closed
              </span>
            )
          ) : (
            <button
              onClick={() => onSelect(event)}
              className="inline-flex items-center self-start gap-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:opacity-60 transition-opacity cursor-pointer"
            >
              View More <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
