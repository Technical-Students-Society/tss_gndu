import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
    const [isvisible, setIsVisible] = useState(false);

    const ScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    useEffect(() => {
        const togglevisibilty = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", togglevisibilty);
        return () => {
            window.removeEventListener("scroll", togglevisibilty);
        };

    }, []);

    return (
        <button
            className={`scroll-btn whitespace-nowrap text-sm font-semibold bg-black dark:bg-white cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-11 w-11 fixed bottom-21 right-4 z-50 flex items-center justify-center rounded-full border dark:border-white bg-backdrop p-3 shadow backdrop-blur-md transition-all hover:bg-bg-700 active:scale-90 sm:bottom-4 ${isvisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={ScrollToTop}
            aria-label="Scroll to top"
        >
            <ArrowUp className="dark:text-black text-white" />
        </button>
        
    );
};

export default ScrollToTop;
