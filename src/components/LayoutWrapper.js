"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Preloader from "./Preloader2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "@/app/PageTransition";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  // hide navbar/footer on auth pages
  const hideLayout = pathname.startsWith("/policies") || pathname.startsWith("/maintenance") || pathname.startsWith("/verify") || pathname.startsWith("/admin") || pathname === null;

  useEffect(() => {
    // Force scroll to top on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

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

    </>
  );
}
