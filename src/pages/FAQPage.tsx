import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Send, Loader2, CheckCircle, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const pageVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

const FAQPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        question: "",
    });

    const categories = [
        { id: "all", name: "Visi klausimai" },
        { id: "general", name: "Bendri" },
        { id: "procedures", name: "Procedūros" },
        { id: "prices", name: "Kainos" },
        { id: "booking", name: "Rezervacija" },
    ];

    const faqs: FAQItem[] = [
        {
            question: "Kaip užsiregistruoti vizitui?",
            answer: "Galite užsiregistruoti keliais būdais: paskambinti telefonu +370 677 77066, parašyti WhatsApp žinute, užpildyti rezervacijos formą mūsų svetainėje arba atvykti į kliniką asmeniškai. Rekomenduojame registruotis iš anksto.",
            category: "booking",
        },
        {
            question: "Koks yra darbo laikas?",
            answer: "Dirbame pirmadienį–penktadienį nuo 09:00 iki 19:00. Savaitgaliais ir švenčių dienomis klinika nedirba. Kritiniais atvejais galite susisiekti telefonu.",
            category: "general",
        },
        {
            question: "Ar priimate su draudimu?",
            answer: "Taip, bendradarbiaujame su pagrindinėmis draudimo bendrovėmis. Prieš vizitą rekomenduojame pasitikrinti savo draudimo sąlygas ir informuoti mus apie draudimą registracijos metu.",
            category: "prices",
        },
        {
            question: "Kiek kainuoja pirminis vizitas?",
            answer: "Pirminė konsultacija su gydytoju odontologu kainuoja nuo 20€. Konsultacijos metu įvertinsime jūsų burnos būklę ir pasiūlysime gydymo planą su tiksliais kainų įverčiais.",
            category: "prices",
        },
        {
            question: "Ar skausmingi dantų gydymo procedūros?",
            answer: "Naudojame modernias vietinės anestezijos priemones, užtikrinančias, kad procedūros būtų neskausmingos. Jei turite baimių ar nerimo, prašome informuoti gydytoją – skirsime papildomo dėmesio jūsų komfortui.",
            category: "procedures",
        },
        {
            question: "Kiek laiko trunka dantų implantacija?",
            answer: "Implanto įsriegimas trunka apie 30-60 minučių. Tačiau visas procesas, įskaitant gijimą ir karūnėlės uždėjimą, gali užtrukti 3-6 mėnesius, priklausomai nuo individualios situacijos.",
            category: "procedures",
        },
        {
            question: "Ar galima atšaukti vizitą?",
            answer: "Taip, vizitą galite atšaukti ar perkelti. Prašome informuoti mus bent 24 valandos iki vizito. Galite tai padaryti telefonu arba WhatsApp.",
            category: "booking",
        },
        {
            question: "Ar gydote vaikus?",
            answer: "Taip, priimame įvairaus amžiaus pacientus, įskaitant vaikus. Turime patirties dirbti su mažaisiais pacientais ir stengiamės, kad vizitas būtų kuo malonesnis.",
            category: "general",
        },
        {
            question: "Kokius mokėjimo būdus priimate?",
            answer: "Priimame mokėjimus grynaisiais pinigais ir banko kortele. Taip pat galimas mokėjimas dalimis – pasiteiraukite registratūroje apie galimas išsimokėjimo sąlygas.",
            category: "prices",
        },
        {
            question: "Kiek laiko trunka dantų balinimas?",
            answer: "Profesionalus dantų balinimas klinikoje trunka apie 1-1,5 valandos. Rezultatai matomi iš karto. Taip pat siūlome namų balinimo sistemas, kurias naudojate 10-14 dienų.",
            category: "procedures",
        },
    ];

    // Filter FAQs
    const filteredFaqs = faqs.filter((faq) => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.question) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.main
            className="min-h-screen"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
        >
            <Helmet>
                <title>DUK - Dažniausiai Užduodami Klausimai | Azadent</title>
                <meta name="description" content="Raskite atsakymus į dažniausiai užduodamus klausimus apie odontologijos paslaugas, kainas ir rezervaciją Azadent klinikoje." />
            </Helmet>

            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-dental-gradient-hero" />
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-20 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
                    >
                        <HelpCircle className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">Dažniausiai užduodami klausimai</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                    >
                        Kaip galime{" "}
                        <span className="text-gradient">padėti?</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
                    >
                        Čia rasite atsakymus į dažniausiai užduodamus klausimus apie mūsų paslaugas,
                        kainas ir vizitų rezervaciją.
                    </motion.p>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-xl mx-auto relative"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Ieškokite klausimo..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 rounded-2xl border-border/50 focus:border-primary shadow-lg"
                        />
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    {/* Category filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${activeCategory === category.id
                                        ? "bg-dental-gradient text-white shadow-dental"
                                        : "bg-card text-foreground hover:bg-primary/10 border border-border"
                                    }`}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* FAQ Accordion */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl mx-auto space-y-4"
                    >
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="card-premium overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                                        className="w-full p-5 flex items-center justify-between text-left"
                                    >
                                        <span className="font-medium text-foreground pr-4">{faq.question}</span>
                                        <motion.div
                                            animate={{ rotate: openQuestion === index ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-shrink-0"
                                        >
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {openQuestion === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <HelpCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground">Nerasta klausimų pagal jūsų paiešką</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-dental-gradient" />
                <div className="absolute inset-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-4">
                                <MessageCircle className="w-5 h-5 text-accent" />
                                <span className="text-white/80 text-sm font-medium">Neradote atsakymo?</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                                Užduokite klausimą
                            </h2>
                            <p className="text-white/70">
                                Parašykite mums ir atsakysime per 24 valandas
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-dark rounded-2xl p-6 md:p-8"
                        >
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", duration: 0.5 }}
                                            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                                        >
                                            <CheckCircle className="w-10 h-10 text-green-400" />
                                        </motion.div>
                                        <h3 className="font-semibold text-white text-xl mb-2">Ačiū!</h3>
                                        <p className="text-white/70">
                                            Gavome jūsų klausimą. Atsakysime el. paštu artimiausiu metu.
                                        </p>
                                        <Button
                                            onClick={() => {
                                                setIsSuccess(false);
                                                setFormData({ email: "", question: "" });
                                            }}
                                            className="mt-6 bg-white/10 hover:bg-white/20 text-white"
                                        >
                                            Užduoti dar vieną klausimą
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <Input
                                                type="email"
                                                placeholder="Jūsų el. paštas"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent"
                                            />
                                        </div>
                                        <div>
                                            <Textarea
                                                placeholder="Jūsų klausimas..."
                                                required
                                                rows={4}
                                                value={formData.question}
                                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                                className="rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent resize-none"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-accent to-yellow-400 hover:opacity-90 text-foreground h-12 rounded-xl font-semibold"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Siunčiama...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <Send className="w-5 h-5" />
                                                    Siųsti klausimą
                                                </span>
                                            )}
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </motion.main>
    );
};

export default FAQPage;
