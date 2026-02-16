import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, Send, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FloatingQuestionWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        question: "",
    });

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (isSuccess) {
            setIsSuccess(false);
            setFormData({ email: "", question: "" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.question) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Form Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-80 glass rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-dental-gradient p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    <h3 className="font-semibold">Turite klausimą?</h3>
                                </div>
                                <button
                                    onClick={toggleOpen}
                                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-white/80 text-sm mt-1">
                                Atsakysime per 24 val.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center py-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", duration: 0.5 }}
                                            className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                                        >
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </motion.div>
                                        <h4 className="font-semibold text-foreground mb-2">Ačiū!</h4>
                                        <p className="text-muted-foreground text-sm">
                                            Gavome Jūsų klausimą. Atsakysime el. paštu.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-3"
                                    >
                                        <div>
                                            <Input
                                                type="email"
                                                placeholder="Jūsų el. paštas"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="h-11 rounded-xl border-border/50 focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <Textarea
                                                placeholder="Jūsų klausimas..."
                                                required
                                                rows={3}
                                                value={formData.question}
                                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                                className="rounded-xl border-border/50 focus:border-primary resize-none"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-dental-gradient hover:opacity-90 text-white h-11 rounded-xl font-medium"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Siunčiama...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <Send className="w-4 h-4" />
                                                    Siųsti klausimą
                                                </span>
                                            )}
                                        </Button>
                                        <p className="text-xs text-muted-foreground text-center">
                                            💡 Greičiau atsakome per WhatsApp
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
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
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen
                        ? "bg-foreground text-white"
                        : "bg-gradient-to-br from-dental-teal to-teal-600 text-white"
                    }`}
                aria-label={isOpen ? "Uždaryti klausimų formą" : "Užduoti klausimą"}
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
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="help"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <HelpCircle className="w-6 h-6" />
                            {/* Notification dot */}
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: 3, duration: 0.3 }}
                        className="absolute -top-2 right-16 bg-white/95 backdrop-blur-sm text-foreground px-3 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap"
                    >
                        Klauskite mūsų! 💬
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingQuestionWidget;
