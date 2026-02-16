import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

// Page transition wrapper - wraps entire pages
export const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

// Fade in on scroll - for sections
interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: FadeInProps) => {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Stagger children animations
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Scale on hover
interface ScaleOnHoverProps {
    children: ReactNode;
    scale?: number;
    className?: string;
}

export const ScaleOnHover = ({ children, scale = 1.05, className = "" }: ScaleOnHoverProps) => {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Parallax scroll effect
interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = "" }: ParallaxProps) => {
    return (
        <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: speed * -50 }}
            viewport={{ once: false }}
            transition={{ duration: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Text reveal animation
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TextReveal = ({ text, className = "", delay = 0 }: TextRevealProps) => {
    const words = text.split(" ");

    return (
        <motion.span className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Counter animation
interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export const AnimatedCounter = ({ end, duration = 2, suffix = "", className = "" }: AnimatedCounterProps) => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={className}
        >
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                {end}{suffix}
            </motion.span>
        </motion.span>
    );
};

// Magnetic button effect
interface MagneticProps {
    children: ReactNode;
    className?: string;
}

export const Magnetic = ({ children, className = "" }: MagneticProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Blur fade in
interface BlurFadeProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export const BlurFade = ({ children, delay = 0, className = "" }: BlurFadeProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Slide reveal (content slides from behind a cover)
interface SlideRevealProps {
    children: ReactNode;
    className?: string;
}

export const SlideReveal = ({ children, className = "" }: SlideRevealProps) => {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
