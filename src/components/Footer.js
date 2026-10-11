import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "About us", link: "/about" },
    { name: "Events", link: "/events" },
    { name: "Our Team", link: "/team" },
  ];

  const exploreLinks = [
    { name: "Gallery", link: "/gallery" },
    { name: "Contact us", link: "/contact" },
  ];

  const connectLinks = [
    {
      name: "GitHub",
      link: "https://github.com/Technical-Students-Society",
      external: true,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/technical-students-societies/",
      external: true,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/tss_gndu",
      external: true,
    },
    {
      name: "Gmail",
      link: "mailto:contact@tss-gndu.org",
      external: true,
    },
  ];

  return (
    <footer className="mt-auto  border-neutral-800/80 bg-siteblack text-neutral-100 font-openai transition-colors duration-200">
      <div className="mx-auto px-20 max-sm:px-6 pt-20 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-14">
          {/* Brand Info & Identity (Left) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start space-y-5">
            {/* Logo and Title */}
            <Link href="/" className="flink-target flex items-center gap-2.5 group">
              <img
                src="/images/logos/tss-logo.png"
                alt="TSS Logo"
                className="h-8 lg:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-base font-semibold tracking-tight text-neutral-100">
                Technical Students' Society
              </span>
            </Link>

            {/* Tagline & Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-200">
                Think. Build. Innovate.
              </h3>
              <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
                Bridging the gap between knowledge and career opportunities since its inception.
              </p>
            </div>

            {/* Certificate Verification CTA */}
            <div>
              <Link
                href="/verify"
                className="flink-target group inline-flex items-center gap-2 text-xs font-medium text-neutral-100 border border-neutral-700/80 bg-neutral-900/60 hover:bg-neutral-800 rounded-full px-4.5 py-2 transition-all duration-200 shadow-2xs"
              >
                <span>Verify Issued Certificate</span>
                <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Nav Links Columns (Right) */}
          <div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 md:pl-4 lg:pl-10">
            {/* Quick Links Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-4 opacity-90">
                Quick Links
              </h4>
              <ul className="list-none flex flex-col space-y-2 p-0 m-0">
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="flink-target group inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors duration-200 font-medium py-0.5"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 -rotate-45 opacity-60 text-neutral-500 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Continued Column (No Explore label) */}
            <div className="pt-8">
              <ul className="list-none flex flex-col space-y-2 p-0 m-0">
                {exploreLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="flink-target group inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors duration-200 font-medium py-0.5"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 -rotate-45 opacity-60 text-neutral-500 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-4 opacity-90">
                Connect With Us
              </h4>
              <ul className="list-none flex flex-col space-y-2 p-0 m-0">
                {connectLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="flink-target group inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors duration-200 font-medium py-0.5"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 -rotate-45 opacity-60 text-neutral-500 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row justify-between items-start gap-4 text-xs text-neutral-400">
          {/* Copyright & Built by */}
          <div className="flex flex-col items-center sm:items-start gap-1.5 sm:gap-3 text-center sm:text-left">
            <p>
              &copy; {currentYear} Technical Students' Society, GNDU. All rights reserved.
            </p>
            {/* <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span> */}
            <p className="text-neutral-400">
              Built &amp; Maintained by{" "}
              <a
                href="https://www.linkedin.com/in/kartikay-sharma2004/"
                target="_blank"
                rel="noopener noreferrer"
                className="flink-target font-medium text-neutral-200 hover:text-white underline-offset-2 hover:underline transition-colors"
              >
                Kartikay Sharma
              </a>{" "}
              &amp;{" "}
              <a
                href="https://www.linkedin.com/in/sahil-singh-0421b7275"
                target="_blank"
                rel="noopener noreferrer"
                className="flink-target font-medium text-neutral-200 hover:text-white underline-offset-2 hover:underline transition-colors"
              >
                Sahildeep Singh
              </a>
            </p>
          </div>

          {/* Bottom Legal Links */}
          <div className="flex items-center gap-4 text-neutral-400">
            <Link
              href="/policies/privacy-policy"
              className="flink-target hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-neutral-700">|</span>
            <Link
              href="/policies/terms-and-conditions"
              className="flink-target hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
