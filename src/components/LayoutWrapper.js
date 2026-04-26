"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import Preloader from "./Preloader2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "@/app/PageTransition";
import AnnouncementToasts from "./AnnouncementToasts";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  // hide navbar/footer on auth pages
  const hideLayout = pathname.startsWith("/policies") || pathname.startsWith("/maintenance") || pathname.startsWith("/admin") || pathname === null;

  const lenis = useLenis();

  useEffect(() => {
    // Force scroll to top on refresh and navigation
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Reset native scroll
    window.scrollTo(0, 0);

    // Reset Lenis scroll if available
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return (
    <>
      {isHomePage && !preloaderFinished && (
        <Preloader onFinish={() => setPreloaderFinished(true)} />
      )}
      {!hideLayout && <Navbar />}
      {/* <PageTransition> */}
      {children}
      {/* </PageTransition> */}
      {!hideLayout && <Footer />}
      <AnnouncementToasts isReady={preloaderFinished} />
    </>

  );
}
