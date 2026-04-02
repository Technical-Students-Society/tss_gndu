import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-white dark:bg-black dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight uppercase">TSS GNDU</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
              Technical Student Society (TSS) at Guru Nanak Dev University. Bridging the gap between knowledge and career opportunities since its inception.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-75">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/team" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">Our Team</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-75">Connect With Us</h4>
            <ul className="space-y-2">
              <li><Link href="https://github.com/Technical-Students-Society" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">GitHub</Link></li>
              <li><Link href="https://www.linkedin.com/company/technical-students-societies/" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">LinkedIn</Link></li>
              <li><Link href="https://www.instagram.com/tss_gndu" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="mailto:tss.gndu@gmail.com" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">Gmail</Link></li>

            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center capitalize">
            &copy; {currentYear} Technical Students' Society GNDU. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-neutral-400 hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-neutral-400 hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
