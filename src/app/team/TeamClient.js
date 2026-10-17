"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import api from "@/utils/api";
import {
  ShieldCheck,
  Code2,
  Palette,
  Handshake,
  Sparkles,
  Trophy,
  Users,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Inline standalone social SVG icons
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

// Lightweight URL optimizer: requests lightweight compressed dimensions for Unsplash & cloud images
function getOptimizedImageUrl(url, width = 200, quality = 75) {
  if (!url) return "";
  if (typeof url === "string" && url.includes("images.unsplash.com")) {
    const baseUrl = url.split("?")[0];
    return `${baseUrl}?w=${width}&auto=format&fit=crop&q=${quality}`;
  }
  return url;
}

// Ultra-fast lazy avatar image with instant skeleton placeholder and smooth fade-in
function FastImage({ src, alt = "", width = 200, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const optimizedSrc = useMemo(() => getOptimizedImageUrl(src, width), [src, width]);

  if (!src || error) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-bold ${className}`}>
        {alt ? (
          <span className="text-xs sm:text-sm font-semibold">{alt.charAt(0).toUpperCase()}</span>
        ) : (
          <User className="w-5 h-5 text-neutral-400" />
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-300/80 dark:bg-neutral-700/80 animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={optimizedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

// Category Metadata mapping for visual icons and descriptions
const CATEGORY_META = {
  executives: {
    title: "Executive Board",
    description: "Leading student vision, organization governance, and university initiatives.",
    icon: ShieldCheck,
  },
  technical: {
    title: "Technical Core",
    description: "Engineering platforms, hackathons, cloud systems, and dev workshops.",
    icon: Code2,
  },
  design: {
    title: "UI/UX & Design",
    description: "Crafting visually stunning, user-centric branding, creatives, and interfaces.",
    icon: Palette,
  },
  sponsorship: {
    title: "Sponsorship & PR",
    description: "Securing industry partnerships, sponsor relations, and event funding.",
    icon: Handshake,
  },
  cultural: {
    title: "Cultural & Media",
    description: "Curating flagship fests, digital storytelling, visual media, and community gatherings.",
    icon: Sparkles,
  },
  sports: {
    title: "Sports & Athletics",
    description: "Organizing athletic tournaments, e-sports, and promoting teamwork.",
    icon: Trophy,
  },
};

// Fallback preview data in case database is empty or env vars are not set yet
const DEMO_MEMBERS = [
  {
    id: "1",
    name: "Gursewak Singh",
    role: "President",
    team_group: "Executives",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
    instagram_url: "https://instagram.com",
  },
  {
    id: "2",
    name: "Arjun Sharma",
    role: "Vice President",
    team_group: "Executives",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
  },
  {
    id: "3",
    name: "Sukhman Kaur",
    role: "Technical Head",
    team_group: "Technical",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
  },
  {
    id: "4",
    name: "Navjot Singh",
    role: "Full Stack Lead",
    team_group: "Technical",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
  },
  {
    id: "5",
    name: "Priya Verma",
    role: "UI/UX Lead",
    team_group: "Design",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
    instagram_url: "https://instagram.com",
  },
  {
    id: "6",
    name: "Rohan Kapoor",
    role: "Visual Designer",
    team_group: "Design",
    avatar_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
    instagram_url: "https://instagram.com",
  },
  {
    id: "7",
    name: "Simranjit Singh",
    role: "Head of Sponsorship",
    team_group: "Sponsorship",
    avatar_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
  },
  {
    id: "8",
    name: "Mehak Preet",
    role: "Cultural Lead",
    team_group: "Cultural",
    avatar_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
    instagram_url: "https://instagram.com",
  },
  {
    id: "9",
    name: "Manpreet Singh",
    role: "Sports Coordinator",
    team_group: "Sports",
    avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    linkedin_url: "https://linkedin.com",
  },
];

function MemberAvatar({ member, isDarkCard, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const isLead = /president|head|lead|founder|convener/i.test(member.role || "");

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(member)}
    >
      {/* Avatar Circle with tactile active touch response */}
      <div
        className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:h-20 lg:w-20 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-sm touch-manipulation ${
          isLead
            ? "ring-2 ring-blue-500 p-0.5 sm:p-1 shadow-md"
            : isDarkCard
            ? "border-2 border-neutral-800 bg-neutral-900"
            : "border-2 border-white dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800"
        }`}
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          <FastImage
            src={member.avatar_url}
            alt={member.name}
            width={180}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Desktop-Only Hover Tooltip Card (Hidden on Mobile to completely eliminate viewport overflow/glitches) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 sm:w-72 overflow-hidden rounded-[20px] bg-neutral-950/95 dark:bg-neutral-900/95 text-white backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 shadow-2xl shadow-black/60 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full-width Image Area */}
            <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-neutral-900">
              <FastImage
                src={member.avatar_url}
                alt={member.name}
                width={500}
                className="w-full h-full"
              />

              {/* Lead badge on image */}
              {isLead && (
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                    Lead
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Row: Details on Left, Socials on Right */}
            <div className="p-3.5 px-4 flex items-center justify-between gap-3 relative z-10 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
              {/* Left: Name & Role */}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-tight truncate capitalize leading-tight">
                  {member.name}
                </h4>
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                  {member.role}
                </p>
              </div>

              {/* Right: Social Icons */}
              <div className="flex items-center gap-1 shrink-0">
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s LinkedIn`}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <LinkedinIcon size={13} />
                  </a>
                )}
                {member.github_url && (
                  <a
                    href={member.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s GitHub`}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <GithubIcon size={13} />
                  </a>
                )}
                {member.instagram_url && (
                  <a
                    href={member.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s Instagram`}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <InstagramIcon size={13} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const GROUP_ORDER = ["Executives", "Technical", "Design", "Sponsorship", "Cultural", "Sports"];

export default function TeamClient({ batch }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMobileMember, setSelectedMobileMember] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      try {
        const [start_year, end_year] = batch.split("-");
        const response = await api.get("/team_members", {
          params: {
            select: "*",
            start_year: `eq.${start_year}`,
            end_year: `eq.${end_year}`,
            order: "created_at.desc",
          },
        });
        if (response.data && response.data.length > 0) {
          setMembers(response.data);
        } else {
          setMembers(DEMO_MEMBERS);
        }
      } catch (error) {
        console.warn("Using sample team directory preview (Supabase offline or unconfigured):", error?.message);
        setMembers(DEMO_MEMBERS);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, [batch]);

  // Grouping and Sorting Logic
  const { groupedTeam, sortedGroups } = useMemo(() => {
    if (!members.length) return { groupedTeam: {}, sortedGroups: [] };

    // 1. Group members by normalized team_group
    const grouped = members.reduce((acc, member) => {
      let rawGroup = (member.team_group || "Other").trim();
      const matchingKey =
        GROUP_ORDER.find((g) => g.toLowerCase() === rawGroup.toLowerCase()) ||
        rawGroup.charAt(0).toUpperCase() + rawGroup.slice(1).toLowerCase();

      if (!acc[matchingKey]) acc[matchingKey] = [];
      acc[matchingKey].push(member);
      return acc;
    }, {});

    // 2. Sort members inside each group (President/Head first)
    Object.keys(grouped).forEach((groupName) => {
      grouped[groupName].sort((a, b) => {
        const roleA = (a.role || "").trim().toLowerCase();
        const roleB = (b.role || "").trim().toLowerCase();

        const getPriority = (role, group) => {
          const lowerGroup = group.toLowerCase();
          if (lowerGroup === "executives") {
            if (role.includes("president") && !role.includes("vice")) return 1;
            if (role.includes("vice-president") || role.includes("vice president")) return 2;
            return 3;
          } else {
            if (role.includes("head") && !role.includes("co-head") && !role.includes("co head")) return 1;
            if (role.includes("co-head") || role.includes("co head") || role.includes("lead")) return 2;
            return 3;
          }
        };

        const priorityA = getPriority(roleA, groupName);
        const priorityB = getPriority(roleB, groupName);
        if (priorityA !== priorityB) return priorityA - priorityB;
        return 0;
      });
    });

    // 3. Sort the group names according to GROUP_ORDER
    const sorted = Object.keys(grouped).sort((a, b) => {
      const indexA = GROUP_ORDER.indexOf(a);
      const indexB = GROUP_ORDER.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    return { groupedTeam: grouped, sortedGroups: sorted };
  }, [members]);

  // Lock background scroll when mobile modal is open
  useEffect(() => {
    if (selectedMobileMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMobileMember]);

  const handleSelectMember = useCallback((member) => {
    // On mobile devices (or smaller viewports), open the dedicated mobile card
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSelectedMobileMember(member);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-8 h-8 border-2 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-neutral-100 rounded-full animate-spin"></div>
        <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
          Loading Community Directory...
        </p>
      </div>
    );
  }

  const isSelectedLead = selectedMobileMember
    ? /president|head|lead|founder|convener/i.test(selectedMobileMember.role || "")
    : false;

  return (
    <div className="space-y-6">
      {/* Bento Category Blocks with Fixed Symmetry and Responsive Avatars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {sortedGroups.map((groupKey, idx) => {
          const meta = CATEGORY_META[groupKey.toLowerCase()] || {
            title: groupKey,
            description: `Dedicated ${groupKey} team members driving impactful initiatives.`,
            icon: Users,
          };
          const groupMembers = groupedTeam[groupKey] || [];
          const Icon = meta.icon;
          const isDarkCard = idx === 1; // Contrast style for 2nd card like in reference

          return (
            <div
              key={groupKey}
              className={`rounded-[28px] border transition-all duration-300 p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[450px] ${
                isDarkCard
                  ? "bg-neutral-900 text-white border-neutral-800 shadow-xl shadow-black/10 dark:bg-neutral-900/90 dark:border-neutral-800"
                  : "bg-neutral-200/60 dark:bg-neutral-900/50 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 border-neutral-200/80 dark:border-neutral-800/80 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Top Row: Icon Badge & Member Count Pill */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105 ${
                      isDarkCard
                        ? "bg-neutral-100 text-black border border-neutral-800"
                        : "bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/60 dark:border-neutral-700/60"
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wide ${
                      isDarkCard
                        ? "bg-neutral-900 text-neutral-300 border border-neutral-800"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60"
                    }`}
                  >
                    {groupMembers.length} {groupMembers.length === 1 ? "Member" : "Members"}
                  </span>
                </div>

                {/* Middle Row: Title & Subtitle */}
                <div className="my-5 sm:my-6 space-y-2">
                  <h3
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight ${
                      isDarkCard ? "text-white" : "text-neutral-900 dark:text-neutral-50"
                    }`}
                  >
                    {meta.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed max-w-md font-normal ${
                      isDarkCard ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {meta.description}
                  </p>
                </div>
              </div>

              {/* Bottom Row: All Members Interactive Avatars */}
              <div className="pt-5 sm:pt-6 border-dashed border-neutral-400/40 dark:border-neutral-800/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
                  {groupMembers.map((member) => (
                    <MemberAvatar
                      key={member.id || `${member.name}-${member.role}`}
                      member={member}
                      isDarkCard={isDarkCard}
                      onSelect={handleSelectMember}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile Dedicated Member Detail Card (Centered & Compact) ── */}
      <AnimatePresence>
        {selectedMobileMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
            {/* Backdrop with tap-outside dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedMobileMember(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Sheet Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", damping: 25, stiffness: 340 }}
              className="relative w-full max-w-[280px] sm:max-w-[300px] rounded-[22px] overflow-hidden bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700/80 shadow-2xl z-10 mx-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMobileMember(null)}
                aria-label="Close"
                className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 active:scale-90 transition-transform"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Portrait image */}
              <div className="relative w-full h-48 sm:h-52 bg-neutral-950 overflow-hidden">
                <FastImage
                  src={selectedMobileMember.avatar_url}
                  alt={selectedMobileMember.name}
                  width={400}
                  className="w-full h-full"
                />

                {isSelectedLead && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      Lead
                    </span>
                  </div>
                )}
              </div>

              {/* Details & Touch-friendly Social Buttons */}
              <div className="p-3.5 sm:p-4 space-y-3 bg-white dark:bg-neutral-900">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white capitalize leading-snug">
                    {selectedMobileMember.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {selectedMobileMember.role}
                  </p>
                </div>

                {/* Social Links Row */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  {selectedMobileMember.linkedin_url && (
                    <a
                      href={selectedMobileMember.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium active:scale-95 transition-all"
                    >
                      <LinkedinIcon size={12} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {selectedMobileMember.github_url && (
                    <a
                      href={selectedMobileMember.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium active:scale-95 transition-all"
                    >
                      <GithubIcon size={12} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {selectedMobileMember.instagram_url && (
                    <a
                      href={selectedMobileMember.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium active:scale-95 transition-all"
                    >
                      <InstagramIcon size={12} />
                      <span>Instagram</span>
                    </a>
                  )}
                  {!selectedMobileMember.linkedin_url &&
                    !selectedMobileMember.github_url &&
                    !selectedMobileMember.instagram_url && (
                      <span className="text-[11px] font-mono text-neutral-400 py-1">
                        TSS Member
                      </span>
                    )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
