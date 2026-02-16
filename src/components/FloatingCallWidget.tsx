import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

// WhatsApp icon component
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const FloatingCallWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        {/* Phone Call Button */}
                        <motion.a
                            href="tel:+37067777066"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3"
                        >
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                            >
                                Skambinti
                            </motion.span>
                            <div className="w-14 h-14 rounded-full bg-dental-gradient shadow-dental flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                                <Phone className="w-6 h-6" />
                            </div>
                        </motion.a>

                        {/* WhatsApp Button */}
                        <motion.a
                            href="https://wa.me/37067777066"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3"
                        >
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                            >
                                WhatsApp
                            </motion.span>
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                                <WhatsAppIcon />
                            </div>
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={toggleOpen}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen
                        ? "bg-foreground text-white rotate-0"
                        : "bg-dental-gradient text-white"
                    }`}
                aria-label={isOpen ? "Uždaryti kontaktų meniu" : "Atidaryti kontaktų meniu"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-7 h-7" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="phone"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <Phone className="w-7 h-7" />
                            {/* Pulse ring animation */}
                            <motion.span
                                className="absolute inset-0 rounded-full bg-white/30"
                                animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Tooltip for closed state */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 2, duration: 0.3 }}
                        className="absolute -top-2 left-20 bg-white/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap"
                    >
                        Susisiekite su mumis! 👋
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingCallWidget;
