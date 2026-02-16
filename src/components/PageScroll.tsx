import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageScroll = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there is a hash, scroll to the element
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            // Otherwise scroll to top on route change
            // Using 'auto' instead of 'instant' for better compatibility
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [pathname, hash]);

    return null;
};

export default PageScroll;
