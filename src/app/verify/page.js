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
    setLoading(true);
    setResult(null);
    setMessageVisible(true);

    setTimeout(() => {
      if (certificateId === "CERT123") {
        setResult({
          name: "Kartikay Sharma",
          course: "MCA Final Year",
          event: "Tech Fest 2026",
          role: "Winner",
          issuedBy: "Technical Students' Society",
          certificateId: "CERT123",
          issueDate: "15 March 2026",
          verificationDate: new Date().toLocaleDateString(),
          status: "Valid"
        });
      } else {
        setResult(null);
        toast.error("Certificate not found!");
      }

      setLoading(false);
    }, 1500);
  }

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
      <div className="grid lg:grid-cols-2 gap-10 w-full max-w-5xl">

        {/* LEFT SIDE - FORM */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur items-center"
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
            onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
            className="w-full mt-2 mb-6 px-4 py-3 rounded-xl border border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[00ff40] uppercase text-white"
          />
          <button
            type="submit"
            disabled={loading}
            onClick={handleVerify}
            className={`w-full py-3 rounded-xl bg-[#06be34] text-white font-semibold hover:bg-[#00ff40cc] transition flex justify-center items-center ${loading ? "cursor-not-allowed opacity-80" : "active:scale-[0.98] cursor-pointer"}`}
          >
            {loading ? (
              <>
                <span className="bg-[#06be34] text-white font-semibold gap-2 transition-all duration-300 shadow-md w-6 h-6 border-2 border-black/30 border-t-white rounded-full animate-spin"></span>

              </>
            ) : (
              "Verify Certificate"
            )}

          </button>
          {/* Divider */}
          <div className="flex items-center my-6 h-px bg-white/10" />

          {/* Footer */}
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-400">
            Powered by <span className='text-zinc-300'>TSS GNDU Development Team</span>
          </p>

        </motion.div>

        {/* RIGHT SIDE - RESULT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 max-sm:p-2 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur flex flex-col justify-center"
        >
          {!result ? (
            <p className="text-neutral-500 text-center">
              {/* Enter a Certificate ID to see details */}
              <br />
              This page is currently under development phase
            </p>
          ) : (
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-5">

              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-green-600 dark:text-green-400">
                  <CircleCheck className="w-5 h-5" />
                  Certificate Verified
                </h3>

                {/* Status Badge */}
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 animate-pulse">
                  Valid
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Participant</p>
                  <p className="font-medium text-base">{result.name}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Course</p>
                  <p className="font-medium text-base">{result.course}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Event</p>
                  <p className="font-medium text-base">{result.event}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Role</p>
                  <p className="font-medium text-base">{result.role}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Issued By</p>
                  <p className="font-medium text-base">{result.issuedBy}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Certificate ID</p>
                  <p className="font-mono text-sm bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded inline-block">
                    {result.certificateId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Issue Date</p>
                  <p className="font-medium text-base">{result.issueDate}</p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Verified On</p>
                  <p className="font-medium text-base">{result.verificationDate}</p>
                </div>

              </div>

              {/* Divider */}
              <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

              {/* Footer Note */}
              <p className="text-sm text-center text-neutral-500">
                If you lose your certificate, contact us at{" "} <br />
                <a
                  href="mailto:contact@tss-gndu.org"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  contact@tss-gndu.org
                </a>
              </p>

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