"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const [theme, setTheme] = useState(null);

  // Initialize theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // Theme toggle logic
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (!isDark) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  // Scroll reveal logic
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Always show at the very top
    if (currentScrollY < 10) {
      setIsVisible(true);
    }
    // Hide when scrolling down, show when scrolling up
    else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`fixed z-50 transition-transform duration-500 ease-in-out transform-gpu will-change-transform
        /* Mobile: Sticky-like full width at top */
        top-0 left-0 w-full md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-[95%] lg:w-[85%] max-w-7xl
        /* Visibility toggle */
        ${isVisible ? "translate-y-0" : "-translate-y-full md:-translate-y-32"}
      `}
      style={{ transform: isVisible ? undefined : undefined }} // Keep transform layer active
    >
      <div className="mx-auto px-4 md:px-8 bg-zinc-50/80 dark:bg-siteblack/80 backdrop-blur-xl border-b md:border border-gray-400 dark:border-neutral-800 md:rounded-3xl shadow-xl shadow-black/5 dark:shadow-none relative overflow-hidden">
        {/* Grain/Noise Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay dark:mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        <div className="flex h-16 items-center justify-between relative z-10">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/images/logos/tss-logo.png"
                alt="Logo"
                className="h-10 md:h-14 invert dark:invert-0 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm md:text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  Technical Students' Society
                </span>
                <span className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400">
                  Guru Nanak Dev University, Asr.
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${pathname === link.href
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-500 dark:text-neutral-500"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 transform active:scale-95 cursor-pointer bg-white/50 dark:bg-transparent"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-orange-500" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-400" />
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 active:scale-95 transition-transform"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-orange-500" /> : <Moon className="h-4 w-4 text-indigo-400" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="mx-4 mt-2 border dark:border-neutral-800 bg-white/95 dark:bg-siteblack/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                ${pathname === link.href ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white" : "text-neutral-500 dark:text-neutral-400"}
              `}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span>{link.name}</span>
              <span className="opacity-50">→</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
