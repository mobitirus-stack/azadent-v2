import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Import service images
import toothFillingImg from "@/assets/services/tooth-filling.jpg";
import aestheticFillingImg from "@/assets/services/aesthetic-filling.jpg";
import oralHygieneImg from "@/assets/services/oral-hygiene.jpg";
import rootCanalImg from "@/assets/services/root-canal-new.jpg";
import toothExtractionImg from "@/assets/services/tooth-extraction.jpg";

import teethWhiteningImg from "@/assets/services/teeth-whitening.jpg";
import alignersImg from "@/assets/services/aligners.jpg";

interface Service {
  title: string;
  description: string;
  image: string;
  slug: string;
}

import { usePublicContent } from "@/hooks/useLocalContent";

// ... imports

const Services = () => {
  const defaultServices: Service[] = [
    {
      title: "Dantų plombavimas",
      description: "Dantų plombavimas – viena dažniausiu odontologijos procedūrų, skirta atkurti dantį, pažistą ėduonies ar traumos, atstatyti jo formą, funkciją ir estetinę išvaizdą, taip pat apsaugoti dantį nuo tolimesnio pažeidimo bei užtikrinti ilgalaikę burnos sveikatą.",
      image: toothFillingImg,
      slug: "dantu-plombavimas",
    },
    {
      title: "Estetinis plombavimas",
      description: "Estetinis dantų plombavimas – tai procesas, kai atkuriamos nudilusiu dantų arba suteikiamos prarastos dantų anatominės struktūros. Taip pat suteikiama taisyklinga dantų forma, skaidrumas ir spalva, o tai tiesiog – gražesnė šypsena.",
      image: aestheticFillingImg,
      slug: "estetinis-plombavimas",
    },
    {
      title: "Burnos higiena",
      description: "Svarbi profilaktinė procedūra, padedanti išvengti dantenų uždegimo, ėduonies, apnašų ir akmenų kaupimosi bei nemalonaus burnos kvapo. Rekomenduojama atlikti kas 6 mėnesius.",
      image: oralHygieneImg,
      slug: "burnos-higiena",
    },
    {
      title: "Šaknų kanalų gydymas",
      description: "Dantų šaknų kanalų gydymas (endodontinis gydymas) – tai odontologinė procedūra, taikoma tuomet, kai infekcija ar uždegimas pasiekia danties vidų – pulpą. Taip sustabdomas uždegimas ir išsaugomas natūralus dantis.",
      image: rootCanalImg,
      slug: "saknu-kanalu-gydymas",
    },
    {
      title: "Dantų šalinimas",
      description: "Dantų šalinimas atliekamas tuomet, kai danties nebeįmanoma išsaugoti kitais gydymo metodais. Procedūra atliekama taikant efektyvų nuskausminimą, todėl ji yra saugi ir komfortiška.",
      image: toothExtractionImg,
      slug: "dantu-salinimas",
    },
    {
      title: "Dantų balinimas",
      description: "Profesionalus dantų balinimas – efektyvus būdas pašviesinti dantų spalvą keliomis toninėmis. Ši procedūra saugi ir atliekama prižiūrint odontologui, užtikrinant geriausią rezultatą.",
      image: teethWhiteningImg,
      slug: "dantu-balinimas",
    },
    {
      title: "Vaikų odontologija",
      description: "Rūpinamės mažųjų pacientų dantų sveikata – nuo profilaktikos iki pieninių dantų gydymo jaukioje aplinkoje.",
      image: alignersImg,
      slug: "vaiku-odontologija",
    },
    {
      title: "Kitos paslaugos",
      description: "Dentalinės ir panoraminės rentgeno nuotraukos, konsultacijos ir kitos odontologinės paslaugos.",
      image: aestheticFillingImg,
      slug: "kitos-paslaugos",
    },
  ];

  /* 
     CMS DATA INTEGRATION:
     We use the 'home.services' slug. The CMS should save this as a direct Array of Service objects.
     If CMS data is missing, we fall back to 'defaultServices'.
  */
  const { data: servicesList } = usePublicContent<Service[]>('admin.services', defaultServices);

  // MERGE LOGIC: If CMS data lacks image, use the local default image
  // Note: 'servicesList' is now the array itself, not { list: ... }
  const services = (Array.isArray(servicesList) ? servicesList : defaultServices).map(service => {
    const defaultService = defaultServices.find(s => s.slug === service.slug);
    return {
      ...service,
      // Use CMS image if it's a valid URL (longer than 10 chars), otherwise fallback to local image
      image: (service.image && service.image.length > 10) ? service.image : defaultService?.image || service.image
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="paslaugos" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />



      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4"
          >
            <span className="w-8 h-px bg-primary" />
            Mūsų paslaugos
            <span className="w-8 h-px bg-primary" />
          </motion.span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Odontologijos{" "}
            <span className="text-gradient">paslaugos</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Kiekvienam pacientui skiriame individualų dėmesį.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={service.slug} variants={itemVariants}>
              <Link
                to={`/paslaugos/${service.slug}`}
                className="group card-premium overflow-hidden block h-full"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover Content */}
                  <motion.div
                    className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      <span>Sužinoti daugiau</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 inline-block">
            <p className="text-foreground font-medium mb-4">
              Neradote ieškomos paslaugos? Susisiekite su mumis!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="btn-shine bg-dental-gradient hover:opacity-90 text-white shadow-dental"
                  asChild
                >
                  <a
                    href="#kontaktai"
                    onClick={(e) => handleScrollTo(e, "#kontaktai")}
                    className="flex items-center gap-2"
                  >
                    Susisiekti
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-2" asChild>
                  <Link to="/galerija">
                    Peržiūrėti galeriją
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
