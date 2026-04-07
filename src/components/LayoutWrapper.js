"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // hide navbar/footer on auth pages
  const hideLayout = pathname.startsWith("/policies") || pathname.startsWith("/maintenance") || pathname.startsWith("/verify") || pathname === null;

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}