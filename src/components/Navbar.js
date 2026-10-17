"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, ArrowUpRight } from "lucide-react";

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
  const pathname = usePathname();
  const [theme, setTheme] = useState(null);

  // Sync theme with document class on mount (scheduled asynchronously to avoid cascading renders)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const frame = requestAnimationFrame(() => {
      setTheme(isDark ? "dark" : "light");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (!isDark) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-zinc-100 dark:bg-siteblack">
      <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Image Logo (Visible on all screen sizes) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/tss-logo.png"
                alt="TSS Logo"
                className="h-10 sm:h-12 lg:h-13 w-auto object-contain invert dark:invert-0 transition-transform duration-300 group-hover:scale-105"
              />

              {/* Full Title Text Logo (Hidden on mobile < 640px as requested, shown on tablet/desktop) */}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  Technical Students&apos; Society
                </span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Guru Nanak Dev University, Asr.
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`navlink-target text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
                      isActive
                        ? "text-neutral-900 dark:text-neutral-100 font-semibold"
                        : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="group p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 active:scale-95 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-orange-500 transition-transform duration-500 group-hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-400 transition-transform duration-500 group-hover:-rotate-12" />
              )}
            </button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 active:scale-90 transition-transform"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-orange-500" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-400" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-90 transition-transform focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Menu (Floats Over Content, Zero Layout Shift) ── */}
      {isMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-x-0 bottom-0 top-16 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Floating Menu Panel */}
          <div className="absolute top-full left-0 w-full z-50 lg:hidden bg-zinc-100 dark:bg-siteblack border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl">
            <div className="px-4 py-3.5 space-y-1.5 max-w-lg mx-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 shadow-sm font-semibold"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 active:scale-[0.99]"
                    }`}
                  >
                    <span className="tracking-wide">{link.name}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
