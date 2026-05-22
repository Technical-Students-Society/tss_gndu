import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTrail from "@/components/CursorTrail";
import LayoutWrapper from "@/components/LayoutWrapper";
import ScrollToTop from "./ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Technical Students' Society GNDU | TSS GNDU Official",

  description:
    "Official website of the Technical Students' Society (TSS) at Guru Nanak Dev University, Amritsar. Explore events, tech fests, workshops, and student initiatives.",

  keywords: [
    "TSS GNDU",
    "Technical Students Society GNDU",
    "Guru Nanak Dev University technical society",
    "GNDU events",
    "GNDU tech fest",
    "student societies in GNDU",
    "TSS Amritsar",
  ],

  authors: [{ name: "Technical Students' Society GNDU" }],
  creator: "TSS GNDU",

  openGraph: {
    title: "TSS GNDU | Technical Students' Society",
    description:
      "Join Technical Students' Society at GNDU. Discover events, workshops, and innovation.",
    url: "https://tss-gndu.org/",
    siteName: "TSS GNDU",
    type: "website",
  },

  twitter: {
    title: "TSS GNDU",
    description:
      "Official Technical Students' Society of Guru Nanak Dev University.",
  },

  metadataBase: new URL("https://tss-gndu.org/"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>

      <head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme || theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    if (!theme) localStorage.setItem('theme', 'dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();


            `,
          }}
        />
        <link
          rel="preload"
          href="/fonts/OpenAISans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/OpenAISans-Semibold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800">
        <CursorTrail />
        <SmoothScroll>
          <main className="flex-1">
            <ScrollToTop/>
            <LayoutWrapper>{children}</LayoutWrapper>
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
