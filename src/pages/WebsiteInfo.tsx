import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const WebsiteInfo = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-dental-gradient text-white py-12 md:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-10" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-3xl md:text-4xl font-bold mb-4"
                    >
                        Svetainės informacija
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button
                            variant="link"
                            className="text-white/80 hover:text-white"
                            asChild
                        >
                            <Link to="/" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Grįžti į pagrindinį
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-lg mx-auto text-muted-foreground"
                >
                    <p className="leading-relaxed mb-8">
                        Ši internetinė svetainė suprojektuota ir sukurta odontologijos klinikai „Azadent“,
                        siekiant užtikrinti maksimalų informacijos aiškumą, patogią vartotojo patirtį bei
                        aukštą pasiekiamumą paieškos sistemose. Kuriant projektą buvo vadovaujamasi
                        naujausiais web standartais ir techninio optimizavimo praktikomis.
                    </p>

                    <p className="leading-relaxed mb-8">
                        Svetainė yra visiškai pritaikyta mobiliems įrenginiams, planšetėms bei kompiuteriams,
                        garantuojant sklandų veikimą visose platformose. Ypatingas dėmesys skirtas paslaugų
                        architektūrai, turinio suprantamumui ir puslapio užkrovimo greičiui.
                    </p>

                    <div className="p-6 bg-muted/30 rounded-2xl border border-border">
                        <p className="leading-relaxed m-0 text-foreground font-medium">
                            Svetainės kūrimo, vystymo bei techninio SEO optimizavimo sprendimus įgyvendino{" "}
                            <a
                                href="https://lamalocal.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-accent transition-colors inline-flex items-center gap-1 font-bold decoration-2 underline-offset-4 hover:underline"
                            >
                                LamaLocal
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            {" "}– profesionali svetainių kūrimo ir vietinio SEO komanda Lietuvoje.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WebsiteInfo;
