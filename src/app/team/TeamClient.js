"use client";

import { useState, useEffect, useMemo } from "react";
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
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Inline standalone social SVG icons
const LinkedinIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

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

function MemberAvatar({ member, isDarkCard }) {
  const [isHovered, setIsHovered] = useState(false);
  const isLead = /president|head|lead|founder|convener/i.test(member.role || "");

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar Circle */}

      <div
        className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:h-20 lg:w-20 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm ${
          isLead
            ? "ring-2 ring-blue-500 p-1 shadow-md"
            : isDarkCard
              ? "border-2 border-neutral-800 bg-neutral-900"
              : "border-2 border-white dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800"
        }`}
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          {member.avatar_url ? (
            <img
              src={member.avatar_url}
              alt={member.name}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-neutral-500">
              {member.name ? member.name.charAt(0) : "U"}
            </div>
          )}
        </div>
      </div>

      {/* Floating Hover Tooltip Card with Full-Width Larger Image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 sm:w-72 overflow-hidden rounded-[24px] bg-neutral-950/95 dark:bg-neutral-900/95 text-white backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60 pointer-events-auto"
          >
            {/* Full-width Image Area (Larger & Taller) */}
            <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-neutral-900">
              {member.avatar_url ? (
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                  <User className="w-14 h-14 text-neutral-500" />
                </div>
              )}

              {/* Subtle gradient shadow overlay at bottom of photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

              {/* Lead badge on image */}
              {isLead && (
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                    Lead
                  </span>
                </div>
              )}
            </div>

            {/* Single Compact Bottom Row: Details on Left, Socials on Right */}
            <div className="p-3.5 px-4 flex items-center justify-between gap-3 relative z-10 bg-neutral-950/95 dark:bg-neutral-900/95 border-t border-white/10">
              {/* Left: Name & Role */}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate leading-tight">
                  {member.name}
                </h4>
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400 truncate mt-0.5">
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
                    className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/15 transition-colors"
                  >
                    <LinkedinIcon size={12} />
                  </a>
                )}
                {member.github_url && (
                  <a
                    href={member.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s GitHub`}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/15 transition-colors"
                  >
                    <GithubIcon size={12} />
                  </a>
                )}
                {member.instagram_url && (
                  <a
                    href={member.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s Instagram`}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/15 transition-colors"
                  >
                    <InstagramIcon size={12} />
                  </a>
                )}
                {!member.linkedin_url && !member.github_url && !member.instagram_url && (
                  <span className="text-[9px] font-mono text-neutral-500">TSS</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TeamClient({ batch }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const groupOrder = ["Executives", "Technical", "Design", "Sponsorship", "Cultural", "Sports"];

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
        groupOrder.find((g) => g.toLowerCase() === rawGroup.toLowerCase()) ||
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

    // 3. Sort the group names according to groupOrder
    const sorted = Object.keys(grouped).sort((a, b) => {
      const indexA = groupOrder.indexOf(a);
      const indexB = groupOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    return { groupedTeam: grouped, sortedGroups: sorted };
  }, [members]);

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

  return (
    <div className="space-y-6">
      {/* Bento Category Blocks with Fixed Symmetry and Hover Member Details */}
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
              className={`rounded-[32px] border transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between min-h-[380px] md:min-h-[420px] ${isDarkCard
                ? "bg-neutral-950 text-white border-neutral-800 shadow-xl shadow-black/10 dark:bg-neutral-900/90 dark:border-neutral-800"
                : "bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 border-neutral-200/80 dark:border-neutral-800/80 shadow-sm hover:shadow-md"
                }`}
            >
              {/* Top Row: Icon Badge & Member Count Pill */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105 ${isDarkCard
                    ? "bg-neutral-900 text-white border border-neutral-800"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/60 dark:border-neutral-700/60"
                    }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide ${isDarkCard
                    ? "bg-neutral-900 text-neutral-300 border border-neutral-800"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60"
                    }`}
                >
                  {groupMembers.length} {groupMembers.length === 1 ? "Member" : "Members"}
                </span>
              </div>

              {/* Middle Row: Title & Subtitle */}
              <div className="my-6 space-y-2.5">
                <h3
                  className={`text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight ${isDarkCard ? "text-white" : "text-neutral-900 dark:text-neutral-50"
                    }`}
                >
                  {meta.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed max-w-md font-normal ${isDarkCard ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400"
                    }`}
                >
                  {meta.description}
                </p>
              </div>

              {/* Bottom Row: All Members Interactive Avatars with Hover Details */}
              <div className="pt-6 border-t border-dashed border-neutral-200/50 dark:border-neutral-800/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Member Avatars Row */}
                <div className="flex items-center flex-wrap gap-2.5">
                  {groupMembers.map((member) => (
                    <MemberAvatar
                      key={member.id || `${member.name}-${member.role}`}
                      member={member}
                      isDarkCard={isDarkCard}
                    />
                  ))}
                </div>

                {/* Micro Hint */}
                {/* <span
                  className={`text-[10px] font-mono uppercase tracking-widest hidden sm:inline-block shrink-0 ${isDarkCard ? "text-neutral-500" : "text-neutral-400"
                    }`}
                >
                  Hover for details
                </span> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



