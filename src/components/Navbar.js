"use client";

import { useState, useEffect } from "react";
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
  const pathname = usePathname();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    console.log("Current theme before toggle:", theme);
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (!isDark) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    console.log("New theme after toggle:", newTheme);
  };


  return (
    <nav className="sticky top-0 z-50 w-full border-gray-400 bg-zinc-50 dark:bg-siteblack dark:border-neutral-800">
      <div className="mx-auto px-1 md:px-12 lg:px-16 xl:px-30 border-b border-gray-400 dark:border-neutral-800">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">

              {/* Logo */}
              <img
                src="/images/logos/tss-logo.png"
                alt="Logo"
                className="h-12 invert dark:invert-0 lg:h-16 w-auto object-contain"
              />

              {/* Text Content */}
              <div className="flex flex-col leading-tight ">
                <span className="text-sm sm:text-lg lg:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  Technical Students' Society
                </span>

                <span className="text-xs text-neutral-600 dark:text-neutral-400">
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
                  className={`navlink-target text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${pathname === link.href
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
              className="group p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 transform active:scale-95 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-orange-500 transition-transform duration-500 group-hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-400 transition-transform duration-500 group-hover:-rotate-12" />
              )}
            </button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 active:scale-95 transition-transform"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-orange-500" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-400" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 focus:outline-none"
            >

              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t dark:border-neutral-800 bg-white/90 dark:bg-siteblack/90 backdrop-blur-lg px-3 py-4 space-y-2">

          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`group flex items-center justify-between rounded-lg px-4 py-2.5 text-base font-medium transition-all duration-200
          ${pathname === link.href
                  ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              style={{
                transitionDelay: `${index * 50}ms`, // stagger animation
              }}>
              <span>{link.name}</span>

              {/* Arrow */}
              <span className="transform -rotate-45 opacity-60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                →
              </span>
            </Link>
          ))}

        </div>
      </div>
    </nav>
  );
}
