"use client";

import { useState } from "react";
import { User, ArrowUpRight } from "lucide-react";

const LinkedinIcon = ({ size = 14, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 14, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = ({ size = 14, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function MemberCard({
  name = "Team Member",
  role = "Core Contributor",
  avatar_url = "",
  linkedin_url = "",
  github_url = "",
  instagram_url = "",
  team_group = "",
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasSocials = Boolean(linkedin_url || github_url || instagram_url);

  // Normalize role tag for special badges (President, Head, Co-Head, Lead)
  const isLeadership = /president|head|lead|founder|convener/i.test(role);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 shadow-sm hover:shadow-lg dark:hover:shadow-neutral-950/50 h-full">
      {/* Top Image Container */}
      <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800/60">
        {avatar_url && !imageError ? (
          <img
            src={avatar_url}
            alt={name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`h-full w-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-inner">
              <User className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
            </div>
          </div>
        )}

        {/* Subtle overlay gradient at the bottom edge of the image */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Leadership Badge */}
        {isLeadership && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-neutral-900/80 dark:bg-white/90 text-white dark:text-neutral-900 backdrop-blur-md shadow-sm">
              Lead
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 line-clamp-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors">
              {name}
            </h3>
          </div>

          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 line-clamp-1">
            {role}
          </p>

          {team_group && (
            <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
              {team_group}
            </p>
          )}
        </div>

        {/* Social Links Footer */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {linkedin_url && (
              <a
                href={linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}'s LinkedIn`}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <LinkedinIcon size={14} />
              </a>
            )}
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}'s GitHub`}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <GithubIcon size={14} />
              </a>
            )}
            {instagram_url && (
              <a
                href={instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}'s Instagram`}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <InstagramIcon size={14} />
              </a>
            )}
            {!hasSocials && (
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-600">
                TSS GNDU
              </span>
            )}
          </div>

          <div className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

