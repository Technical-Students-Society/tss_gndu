"use client";

import { useEffect, useRef, useState } from "react";

export default function FakeAdminPage() {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClick = () => {
    if (!started) {
      audioRef.current.play();
      setStarted(true);
      setShowError(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  return (
    <div
      onClick={handleClick}
      className="min-h-screen flex items-center justify-center bg-black text-white text-center px-6 cursor-pointer"
    >
      <audio ref={audioRef} src="/audio/fahhh.mp3" />

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

        <p className="text-xs mt-4 text-neutral-500">
          Click anywhere to continue
        </p>

        {/* Loading Bar */}
        <div className="w-full h-1 bg-neutral-800 overflow-hidden rounded-full">
          <div className="h-full w-full bg-white animate-[loading_2s_linear_infinite]" />
        </div>

        {showError && (
          <div className="pt-6">
            <p className="text-lg font-semibold text-red-500">
              🚫 Unauthorized Access Detected
            </p>

            <p className="text-neutral-400 mt-2 text-sm">
              Bro really thought he could enter admin panel 💀
            </p>
          </div>
        )}
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
  );
}