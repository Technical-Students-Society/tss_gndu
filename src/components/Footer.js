import Link from "next/link";
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto dark:bg-siteblack dark:border-neutral-800">
      <div className="mx-auto  px-4 md:px-12 lg:px-16 xl:px-30 pt-18 pb-8 max-sm:pb-3">
        <div className="grid grid-cols-1 mb-18 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight">Think. Build. Innovate.</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs mb-10">
              Technical Student Society (TSS) at Guru Nanak Dev University. Bridging the gap between knowledge and career opportunities since its inception.
            </p>
            <Link href='/verify'
              className="flink-target group inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-neutral-50 border border-neutral-300 dark:border-neutral-700 rounded-full px-5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              Verify Certificate
              <span className="transform transition duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="md:ml-16">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4  opacity-75">Quick Links</h4>
            <ul className="list-none flex flex-col items-start gap-0">
              {[
                { name: "Home", link: "/" },
                { name: "About", link: "/about" },
                { name: "Events", link: "/events" },
                { name: "Our Team", link: "/team" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="flink-target py-1 group flex items-center gap-1 text-sm text-neutral-600 font-semibold dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="h-4 w-4 -rotate-45 opacity-70 group-hover:translate-x-1 transition-all duration-200 dark:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-75">Connect With Us</h4>
            <ul className="list-none flex flex-col items-start gap-0">
              {[
                { name: "GitHub", link: "https://github.com/Technical-Students-Society" },
                { name: "LinkedIn", link: "https://www.linkedin.com/company/technical-students-societies/" },
                { name: "Instagram", link: "https://www.instagram.com/tss_gndu" },
                { name: "Gmail", link: "mailto:contact@tss-gndu.org" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    target="_blank"
                    className="flink-target group py-1 flex items-center gap-1 text-sm text-neutral-600 font-semibold dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="h-4 w-4 -rotate-45 opacity-70 group-hover:translate-x-1 transition-all duration-200 dark:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-400 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Left Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-sm:gap-2">
            <p className="text-sm max-sm:text-xs text-neutral-700 dark:text-neutral-400 capitalize">
              &copy; {currentYear} Technical Students' Society, GNDU. <span className="max-sm:hidden">All rights reserved.</span>
            </p>

            <p className="text-xs text-neutral-700 dark:text-neutral-500 mt-1">
              Built & Maintained by <a href="https://www.linkedin.com/in/kartikay-sharma2004/" className="dark:text-white text-neutral-900">Kartikay Sharma</a> & <a href="https://www.linkedin.com/in/sahil-singh-0421b7275" className="dark:text-white text-neutral-900">Sahildeep Singh</a>
            </p>
          </div>

          {/* Right Section */}
          <div className="flex gap-3 items-center">
            <Link
              href="/policies/privacy-policy"
              className="flink-target text-xs text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <span className="text-neutral-500">|</span>

            <Link
              href="/policies/terms-and-conditions"
              className="flink-target text-xs text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
