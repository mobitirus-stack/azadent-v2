import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/useLocalContent";

interface PriceItem {
    name: string;
    price: string;
}

interface PriceCategory {
    title: string;
    items: PriceItem[];
}

const defaultPricing: PriceCategory[] = [
    { title: "Konsultacija", items: [{ name: "Konsultacija", price: "15–25 €" }] },
    { title: "Dantų plombavimas", items: [{ name: "Dantų plombavimas", price: "60–100 €" }] },
    { title: "Estetinis plombavimas", items: [{ name: "Estetinis plombavimas (1 danties)", price: "170–250 €" }] },
    {
        title: "Vaikų odontologija",
        items: [
            { name: "Pieninių dantų plombavimas", price: "25–50 €" },
            { name: "Pieninių dantų gydymas (pulpos amputacija)", price: "20–40 €" },
            { name: "Pieninio danties rovimas", price: "20–40 €" },
            { name: "Silantai (vieno danties padengimas)", price: "15 €" },
        ],
    },
    {
        title: "Endodontija (dantų šaknų kanalų gydymas)",
        items: [
            { name: "Kanalo platinimas–formavimas", price: "50–70 €" },
            { name: "Kanalo plombavimas", price: "50–70 €" },
            { name: "Vaistų pakeitimas", price: "20–30 €" },
            { name: "Pirmoji pagalba (skaudant)", price: "50 €" },
        ],
    },
    { title: "Danties rovimas", items: [{ name: "Danties rovimas", price: "40–80 €" }] },
    {
        title: "Dantų balinimas",
        items: [
            { name: "Vieno žandikaulio kapa", price: "70 €" },
            { name: "Balinimo medžiaga (1 švirkštas)", price: "30 €" },
        ],
    },
    {
        title: "Profesionali higiena ir priežiūra",
        items: [
            { name: "Burnos ertmės higiena", price: "70–75 €" },
            { name: "Estetiškai plombuotų dantų poliravimas", price: "20–50 €" },
            { name: "Bruksizmo kapa", price: "120 €" },
        ],
    },
    {
        title: "Kitos paslaugos",
        items: [
            { name: "Dentalinė rentgeno nuotrauka", price: "10 €" },
            { name: "Panoraminė rentgeno nuotrauka", price: "25 €" },
        ],
    },
];

const Pricing = () => {
    const { data: categories } = usePublicContent<PriceCategory[]>('admin.pricing', defaultPricing);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        },
    };

    return (
        <section id="kainos" className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />



            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                        <span className="w-8 h-px bg-primary" />
                        Kainos
                        <span className="w-8 h-px bg-primary" />
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Paslaugų{" "}
                        <span className="text-gradient">kainos</span>
                    </h2>
                    <div className="section-divider mb-6" />
                </motion.div>

                {/* Price Categories */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-3xl mx-auto space-y-4"
                >
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            variants={itemVariants}
                            className="card-premium rounded-2xl overflow-hidden"
                        >
                            {/* Category Header */}
                            <div className="w-full flex items-center justify-between p-5 md:p-6 text-left border-b border-border/30">
                                <h3 className="font-semibold text-foreground text-base md:text-lg">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Category Items */}
                            <div className="overflow-hidden">
                                <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3">
                                    {category.items.map((item, itemIndex) => (
                                        <motion.div
                                            key={itemIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: itemIndex * 0.05 }}
                                            className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                                        >
                                            <span className="text-muted-foreground text-sm md:text-base">{item.name}</span>
                                            <span className="font-semibold text-foreground text-sm md:text-base whitespace-nowrap ml-4 bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1 rounded-full">
                                                {item.price}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground text-sm italic">
                        * Kainos gali kisti priklausomai nuo sudėtingumo. Susisiekite dėl tikslesnės informacijos.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
