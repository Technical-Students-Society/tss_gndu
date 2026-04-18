import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTrail from "@/components/CursorTrail";
import LayoutWrapper from "@/components/LayoutWrapper";
import Preloader from "@/components/Preloader";

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

  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },

  openGraph: {
    title: "TSS GNDU | Technical Students' Society",
    description:
      "Join Technical Students' Society at GNDU. Discover events, workshops, and innovation.",
    url: "https://tss-gndu.org/",
    siteName: "TSS GNDU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TSS GNDU",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TSS GNDU",
    description:
      "Official Technical Students' Society of Guru Nanak Dev University.",
    images: ["/og-image.png"],
  },

  metadataBase: new URL("https://tss-gndu.org/"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >

      <head>
        <script
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
      </head>
      <body className="flex flex-col antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800">
        <Preloader />
        <CursorTrail />
        <SmoothScroll>
          <main className="flex-1">
            <LayoutWrapper>{children}</LayoutWrapper>
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
