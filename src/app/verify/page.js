"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ShieldCheck, Download, CircleCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import DarkVeil from "../Animations/DarkVeil";
import { createClient } from "@/utils/supabase/client";

function VerifyContent() {
  const searchParams = useSearchParams();
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageVisible, setMessageVisible] = useState(true); // Always true for toasts

  useEffect(() => {
    const idFromQuery = searchParams.get("id") || searchParams.get("cert");
    if (idFromQuery) {
      setCertificateId(idFromQuery);
      handleVerify(idFromQuery);
    }
  }, [searchParams]);

  const handleVerify = async (idToVerify = certificateId) => {
    const targetId = typeof idToVerify === 'string' ? idToVerify.trim() : certificateId.trim();
    if (!targetId) {
      toast.error("Please enter a Certificate ID");
      return;
    }

    setLoading(true);
    setResult(null);

    const supabase = createClient();
    if (!supabase) {
      toast.error("Database connection failed");
      setLoading(false);
      return;
    }

    try {
      // Check if it's a UUID or a Certificate Number
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetId);

      let query = supabase
        .from('certificates')
        .select('*, events(title)');

      if (isUUID) {
        query = query.eq('id', targetId);
      } else {
        query = query.eq('cert_number', targetId);
      }

      const { data, error } = await query.single();

      if (error || !data) {
        toast.error("Certificate not found!");
        setResult(null);
      } else if (data.is_revoked) {
        toast.error("This certificate has been revoked.");
        setResult(null);
      } else {
        setResult({
          name: data.recipient_name,
          type: data.certificate_type,
          event: data.events?.title || "Special Event",
          date: new Date(data.issue_date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          number: data.cert_number,
          id: data.id,
          metadata: data.metadata
        });
        toast.success("Certificate Verified!");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center px-6 bg-siteblack overflow-hidden py-10">
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

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl z-10">
        {/* LEFT SIDE - FORM */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur self-start w-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-zinc-950 p-[2px] rounded-xl ">
                <img
                  src="/images/logos/tss-logo.png"
                  alt="TSS Logo"
                  className="h-12 w-auto"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-white leading-none">Verify Certificate</h2>
                <span className="text-[9px] text-neutral-300 uppercase tracking-widest font-bold mt-1">Technical Students Society</span>
              </div>
            </div>

            <label className="text-sm text-neutral-300">
              Enter the Certificate ID
            </label>

            <input
              type="text"
              placeholder="e.g. TSS-2024-EV-001"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              className="w-full mt-2 mb-6 px-4 py-3 rounded-xl border border-neutral-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00ff40] uppercase text-white transition-all"
            />

            <button
              onClick={() => handleVerify()}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#06be34] text-white font-semibold hover:bg-[#00ff40cc] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify Certificate"}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-neutral-500 text-center"
          >
            Can't find your certificate? <Link href="/contact" className="text-[#00ff40] hover:underline font-medium transition-all">Contact for certificate support</Link>
          </motion.p>
        </div>


        {/* RIGHT SIDE - RESULT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur min-h-[300px] flex flex-col justify-center"
        >
          {!result ? (
            <div className="text-center space-y-4">
              <p className="text-neutral-500">
                {loading ? "Verifying authenticity..." : "Enter a Certificate ID to see verification details."}
              </p>
              {!loading && (
                <div className="h-20 w-20 mx-auto border-2 border-dashed border-neutral-800 rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={32} className="text-neutral-800" />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-[#00ff40]">
                Verified <CircleCheck />
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                <div className="col-span-2">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Recipient Name</p>
                  <p className="text-xl font-semibold text-white">{result.name}</p>
                </div>

                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Type</p>
                  <p className="font-medium text-neutral-200">{result.type}</p>
                </div>

                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Issue Date</p>
                  <p className="font-medium text-neutral-200">{result.date}</p>
                </div>

                <div className="col-span-2">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Event</p>
                  <p className="font-medium text-neutral-200">{result.event}</p>
                </div>

                {/* DYNAMIC METADATA RENDER - INTEGRATED */}
                {result.metadata && Object.entries(result.metadata).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{key.replace(/_/g, ' ')}</p>
                    <p className="font-medium text-neutral-200">{String(value)}</p>
                  </div>
                ))}

                <div className="col-span-2 pt-2 border-t border-neutral-800/50">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Official ID</p>
                  <p className="text-[10px] font-mono text-neutral-500 break-all">{result.number}</p>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <div className="w-full px-5 py-4 rounded-2xl border border-neutral-800/50 bg-neutral-950/20 text-xs text-neutral-400 flex items-center justify-center gap-3 uppercase tracking-widest font-bold">
                  <ShieldCheck size={16} className="text-[#00ff40]" />
                  Official Verified Record
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Toaster position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "14px",
            background: "rgba(10, 10, 15, 0.88)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            fontFamily: "inherit",
            fontSize: "14px",
          },
          success: { style: { border: "1px solid rgba(34,197,94,0.8)", }, },
          error: { style: { border: "1px solid rgba(239,68,68,0.8)", }, },
        }}
      />
    </main>
  );
}


export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-siteblack flex items-center justify-center">
        <Loader2 className="animate-spin text-white h-8 w-8" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
