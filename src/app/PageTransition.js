"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
    const pathname = usePathname();

    return (
        <div className="relative overflow-hidden dark:bg-siteblack">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={pathname}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="relative z-10 min-h-screen dark:bg-siteblack"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}