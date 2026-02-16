import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const PageScroll = () => {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        // If there is a hash, scroll to the element
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            // Force scroll to top instantly on route change
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};

export default PageScroll;
