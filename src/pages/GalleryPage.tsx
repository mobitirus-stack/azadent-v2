import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import service images for gallery
import toothFillingImg from "@/assets/services/tooth-filling.jpg";
import aestheticFillingImg from "@/assets/services/aesthetic-filling.jpg";
import oralHygieneImg from "@/assets/services/oral-hygiene.jpg";
import rootCanalImg from "@/assets/services/root-canal-new.jpg";
import toothExtractionImg from "@/assets/services/tooth-extraction.jpg";
import dentalImplantsImg from "@/assets/services/dental-implants.jpg";
import teethWhiteningImg from "@/assets/services/teeth-whitening.jpg";

// Import client gallery photos
import klinika1Img from "@/assets/gallery/klinika-1.jpg";
import klinika2Img from "@/assets/gallery/klinika-2.jpg";
import rezultataiEstetinisImg from "@/assets/gallery/rezultatai-estetinis.jpg";
import rentgenasImg from "@/assets/gallery/rentgenas.jpg";

interface GalleryImage {
    src: string;
    alt: string;
    category: string;
}

const pageVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: "Visos" },
        { id: "results", name: "Rezultatai" },
        { id: "clinic", name: "Klinika" },
    ];

    const images: GalleryImage[] = [
        { src: toothFillingImg, alt: "Dantų plombavimas", category: "results" },
        { src: aestheticFillingImg, alt: "Estetinis plombavimas", category: "results" },
        { src: oralHygieneImg, alt: "Burnos higiena", category: "results" },
        { src: rootCanalImg, alt: "Šaknų kanalų gydymas", category: "results" },
        { src: toothExtractionImg, alt: "Dantų šalinimas", category: "results" },
        { src: dentalImplantsImg, alt: "Dantų implantacija", category: "results" },
        { src: teethWhiteningImg, alt: "Dantų balinimas", category: "results" },
        { src: klinika1Img, alt: "Klinika", category: "clinic" },
        { src: klinika2Img, alt: "Klinika", category: "clinic" },
        { src: rezultataiEstetinisImg, alt: "Estetinio plombavimo rezultatai", category: "results" },
        { src: rentgenasImg, alt: "Rentgeno nuotrauka", category: "clinic" },
    ];

    const filteredImages = activeCategory === "all"
        ? images
        : images.filter(img => img.category === activeCategory);

    const openLightbox = (index: number) => {
        setSelectedImage(index);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = "auto";
    };

    const goToPrev = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
        }
    };

    const goToNext = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % filteredImages.length);
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage, filteredImages.length]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            },
        },
    };

    return (
        <motion.main
            className="min-h-screen"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
        >
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-dental-gradient-hero" />
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-20 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-0 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4"
                    >
                        <span className="w-8 h-px bg-primary" />
                        Galerija
                        <span className="w-8 h-px bg-primary" />
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                    >
                        Mūsų veiklos{" "}
                        <span className="text-gradient">galerija</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="section-divider mb-6 origin-center"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Peržiūrėkite mūsų atliktų darbų ir klinikos nuotraukas.
                        Kiekviena šypsena – mūsų pasididžiavimas.
                    </motion.p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    {/* Category Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category, index) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${activeCategory === category.id
                                    ? "bg-dental-gradient text-white shadow-dental"
                                    : "bg-card text-foreground hover:bg-primary/10 border border-border"
                                    }`}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Gallery Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        >
                            {filteredImages.map((image, index) => (
                                <motion.button
                                    key={`${activeCategory}-${index}`}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => openLightbox(index)}
                                    className="group relative aspect-square overflow-hidden rounded-2xl card-premium"
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                        <div className="text-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1 }}
                                                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3"
                                            >
                                                <ZoomIn className="w-5 h-5 text-white" />
                                            </motion.div>
                                            <p className="text-white font-medium text-sm">{image.alt}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty state */}
                    {filteredImages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Grid3X3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-muted-foreground">Šioje kategorijoje nuotraukų nerasta</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                            aria-label="Uždaryti"
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.button>

                        {/* Navigation buttons */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Ankstesnė nuotrauka"
                        >
                            <ChevronLeft className="w-7 h-7 text-white" />
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Kita nuotrauka"
                        >
                            <ChevronRight className="w-7 h-7 text-white" />
                        </motion.button>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-5xl max-h-[85vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    src={filteredImages[selectedImage].src}
                                    alt={filteredImages[selectedImage].alt}
                                    className="max-w-full max-h-[85vh] object-contain rounded-lg"
                                />
                            </AnimatePresence>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white text-center mt-4 font-medium"
                            >
                                {filteredImages[selectedImage].alt}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white/60 text-center text-sm mt-1"
                            >
                                {selectedImage + 1} / {filteredImages.length}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </motion.main>
    );
};

export default GalleryPage;
