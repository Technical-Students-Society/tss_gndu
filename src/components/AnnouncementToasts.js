"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { Megaphone, X, ExternalLink, Bell, AlertTriangle, Info } from "lucide-react";

export default function AnnouncementToasts({ isReady }) {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissedIds, setDismissedIds] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);

  // Sync isReady with shouldShow with a slight delay for better UX
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setShouldShow(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [isReady]);

  useEffect(() => {
    // We no longer load from localStorage as per requirements.
    // Dismissed announcements will reset on full page reload.

    const fetchAnnouncements = async () => {
      const supabase = createClient();
      if (!supabase) return;

      // Fetch all active announcements
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching announcements:", error);
        return;
      }

      if (data) {
        // Double check expiry in JS for safety (though RLS/Query could handle it too)
        const now = new Date();
        const active = data.filter(a => !a.expires_at || new Date(a.expires_at) > now);
        setAnnouncements(active);
      }
    };

    fetchAnnouncements();

    // Optional: Refresh announcements every 5 minutes
    const interval = setInterval(fetchAnnouncements, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = (id) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
  };

  const visibleAnnouncements = announcements.filter(a => !dismissedIds.includes(a.id));

  if (!shouldShow || visibleAnnouncements.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-openai flex flex-col gap-5 max-w-[400px] w-full pointer-events-none">
      <AnimatePresence mode="popLayout">

        {visibleAnnouncements.map((a) => (
          <motion.div
            key={a.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, x: 20, filter: "blur(10px)", transition: { duration: 0.2 } }}
            className="pointer-events-auto group relative overflow-hidden rounded-[24px] border border-white/10 bg-neutral-900/70 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:bg-neutral-900/90"
          >
            {/* Visual Accents */}
            <div className={`absolute -left-12 -top-12 h-32 w-32 blur-[40px] opacity-20 transition-all group-hover:opacity-30 ${a.type === 'warning' ? 'bg-orange-500' :
                a.type === 'urgent' ? 'bg-red-500' :
                  'bg-[#00ff40]'
              }`} />

            <div className="relative flex gap-5">
              {/* Optional Thumbnail */}
              {a.thumbnail && (
                <div className="flex-shrink-0">
                  <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                    <img src={a.thumbnail} className="h-full w-full object-cover" alt="" />
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="flex-1 space-y-1.5 pr-4">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-bold text-white text-[15px] tracking-tight leading-tight">{a.title}</h4>
                  {a.type === 'urgent' && (
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </div>

                {a.content && (
                  <p className="text-[12px] text-neutral-400 leading-relaxed font-medium line-clamp-3">
                    {a.content}
                  </p>
                )}

                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 pt-1 text-[9px] font-black text-[#00ff40] hover:text-[#00ff40cc] uppercase tracking-[0.15em] transition-all"
                  >
                    Read More <ExternalLink size={10} />
                  </a>
                )}
              </div>


              {/* Dismiss Button */}
              <button
                onClick={() => dismiss(a.id)}
                className="absolute -right-2 -top-2 p-3 text-neutral-600 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ))}


      </AnimatePresence>
    </div>
  );
}
