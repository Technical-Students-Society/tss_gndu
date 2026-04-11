"use client";

import { useEffect, useRef, useState } from "react";
import Lightning from "../Animations/Lightning";
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function FakeAdminPage() {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [Loginpage, setLoginpage] = useState(true);
  const [password, setPassword] = useState("")

  async function handleLogin(formData) {
    setLoading(true);

    // Show fake screen immediately
    setTimeout(() => {
      setLoginpage(false)
      setShowError(true);
      setLoading(false);
    }, 2500); // delay for realism
  }

  useEffect(() => {
    if (showError && audioRef.current) {
      audioRef.current.play();
    }
  }, [showError]);

  return (
    <>
      {Loginpage && (
        <div className="relative min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-neutral-950 overflow-hidden">

          {/* Background Lightning */}
          <div className="absolute inset-0 z-0 pointer-events-none max-md:hidden">
            <Lightning hue={190} speed={0.6} size={1.8} />
          </div>

          {/* Center Wrapper */}
          <div className="relative z-10 w-full max-w-md px-3">

            {/* Card */}
            <div className="rounded-3xl border dark:border-zinc-800/70 
                     dark:bg-neutral-900/80 
                    backdrop-blur-xl 
                    shadow-xl 
                    hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] 
                    p-8 max-md:px-5 space-y-8 transition-all bg-black/70 border-white/15 duration-300">

              {/* Logo */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl 
                        bg-zinc-100 dark:bg-zinc-800 shadow-inner">
                  <img src="/images/logos/tss-logo.png" alt="TSS GNDU Logo" className="h-14 w-14 object-contain" />
                </div>

                <h1 className="text-xl font-bold text-white text-center">
                  Hello TSS Admin
                </h1>

                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
                  Sign in to access the TSS Admin Panel
                </p>
              </div>

              {/* Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleLogin(formData);
              }} className="space-y-5">

                {/* Email */}
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full px-4 py-3 pr-10 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:outline-none transition pl-12"
                  />
                </div>

                {/* Password */}
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-10 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:outline-none transition pl-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Button */}
                <button
                  disabled={loading}
                  type="submit"
                  className={`w-full py-3 rounded-lg bg-white text-black font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md
              ${loading ? "cursor-not-allowed opacity-80" : "active:scale-[0.98] cursor-pointer"}`}
                >
                  {loading ? (
                    <>
                      <span className="bg-white text-black font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>

                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6 h-px bg-white/10" />

              {/* Footer */}
              <p className="text-center text-xs text-zinc-400 dark:text-zinc-400">
                Powered by <span className='text-zinc-300'>TSS GNDU Development Team</span>
              </p>
            </div>
          </div>
        </div>
      )}



      {showError && (
        <div
          className="min-h-screen flex items-center justify-center bg-siteblack text-white text-center px-6"
        >
          <audio ref={audioRef} src="/audio/fahhh.mp3" loop />

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight animate-pulse">
              🔐 Accessing Admin Panel
            </h1>

            <p className="text-xs text-red-400">
              Logging IP: 192.168.0.{Math.floor(Math.random() * 255)}
            </p>

            <p className="text-neutral-400 text-sm">
              Authenticating credentials...
            </p>

            <p className="text-xs mt-4 tracking-wide text-neutral-500">
              ( Sound playing... )
            </p>

            {/* Loading Bar */}
            <div className="w-full h-1 bg-neutral-800 overflow-hidden rounded-full">
              <div className="h-full w-full bg-white animate-[loading_2s_linear_infinite]" />
            </div>


            <div className="pt-6">
              <p className="text-lg font-semibold text-red-500">
                🚫 Unauthorized Access Detected
              </p>

              <p className="text-neutral-400 mt-2 text-sm">
                Bro really thought he could enter admin panel 💀
              </p>
            </div>
          </div>

          <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
              }
              }
              `}</style>
        </div>
      )}
    </>
  );
}
