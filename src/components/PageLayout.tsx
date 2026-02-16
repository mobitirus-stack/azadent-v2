import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
}

// Smooth scroll to hash on page load
const useScrollToHash = () => {
    const location = useLocation();

    useEffect(() => {
        // If there's a hash in the URL, scroll to that element
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        } else {
            // Scroll to top on route change
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location]);
};

// Page variants for animations
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.99,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
};

export const PageLayout = ({ children }: PageLayoutProps) => {
    const location = useLocation();
    useScrollToHash();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                className="min-h-screen"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

// Scroll progress indicator
export const ScrollProgress = () => {
    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
        };

        window.addEventListener("scroll", updateScrollProgress);
        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent">
            <motion.div
                className="h-full bg-dental-gradient origin-left"
                style={{ scaleX: "var(--scroll-progress, 0%)" }}
                initial={{ scaleX: 0 }}
            />
        </div>
    );
};

// Back to top button
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-dental-gradient text-white shadow-dental flex items-center justify-center hover:shadow-xl transition-shadow"
                    aria-label="Grįžti į viršų"
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default PageLayout;
