"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Download, CircleCheck } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import DarkVeil from "../Animations/DarkVeil";


export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false);

  const handleVerify = () => {
    if (certificateId === "CERT123") {
      setResult({
        name: "Kartikay Sharma",
        class: "MCA Final Year",
        event: "Tech Fest 2026",
        download: "#",
      })
      setLoading(true);;
    } else {
      setResult(null);
      setMessageVisible(true);
      setLoading(false);
      toast.error("Certificate not found!");
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center px-6 bg-siteblack overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none max-md:hidden">
        <DarkVeil
          hueShift={106}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">

        {/* LEFT SIDE - FORM */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur"
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-[#00ff40]" />
            <h2 className="text-xl font-semibold">Verify Certificate</h2>
          </div>

          <label className="text-sm text-neutral-500">
            Certificate ID
          </label>

          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full mt-2 mb-6 px-4 py-3 rounded-xl border border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[00ff40] uppercase"
          />

          <button
            onClick={handleVerify}
            className="w-full py-3 rounded-xl bg-[#06be34] text-white font-semibold hover:bg-[#00ff40cc] transition cursor-pointer"
          >
            Verify Certificate
          </button>
        </motion.div>

        {/* RIGHT SIDE - RESULT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl border border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur flex flex-col justify-center"
        >
          {!result ? (
            <p className="text-neutral-500 text-center">
              {/* Enter a Certificate ID to see details */}
              <br />
              This page is currently under development phase
            </p>
          ) : (
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-[#00ff40] animate-pulse">
                Verified <CircleCheck />
              </h3>

              <div>
                <p className="text-sm text-neutral-500">Participant Name</p>
                <p className="font-semibold">{result.name}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">Class</p>
                <p className="font-semibold">{result.class}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">Event</p>
                <p className="font-semibold">{result.event}</p>
              </div>

              <a
                href={result.download}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-xl bg-[#06be34] text-white hover:bg-[#00ff40cc] transition"
              >
                <Download size={18} />
                Download Certificate
              </a>
            </div>
          )}
        </motion.div>
      </div>
      {messageVisible && (
        <Toaster position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              borderRadius: "14px",
              background: "rgba(10, 10, 15, 0.88)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              fontFamily: "ClashDisplay, sans-serif",
              fontSize: "14px",
            },
            success: { style: { border: "1px solid rgba(34,197,94,0.8)", }, },
            error: { style: { border: "1px solid rgba(239,68,68,0.8)", }, },
          }} />
      )}
    </main>
  );
}