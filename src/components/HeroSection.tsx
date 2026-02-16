import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, MapPin, Clock, Star, Shield, Award, Sparkles, Edit } from "lucide-react";
import heroImage from "@/assets/hero-collage.jpg";
import { useContent } from "@/hooks/useContent";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  // CMS Integration
  const { data: content, loading, isEditable } = useContent("home.hero", {
    title: "Mes padėsime Jums šypsotis",
    subtitle: "AZADENT – atidumas ir profesionalumas.",
    rating: "5.0",
    phone: "+370 677 77066",
    address: "Konstitucijos pr. 13"
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
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
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dental-gradient-hero" />

      {/* Edit Button for Admin */}
      {isEditable && (
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="absolute top-24 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Redaguoti turinį"
        >
          <Edit className="w-5 h-5" />
        </button>
      )}

      {/* Clean background without animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >


            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6"
            >
              {content.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              {content.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="btn-shine bg-dental-gradient hover:opacity-90 text-white shadow-dental h-14 px-8 text-base rounded-xl font-semibold"
                  asChild
                >
                  <a
                    href="#rezervacija"
                    onClick={(e) => handleScrollTo(e, "#rezervacija")}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Rezervuoti vizitą
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="h-14 px-8 text-base rounded-xl font-semibold border-2 border-primary/20 hover:border-primary hover:bg-primary/5 group"
                  asChild
                >
                  <a href={`tel:${content.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    Skambinti dabar
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4">
              <motion.a
                href="https://www.google.com/maps/place/Azadent+odontologijos+kabinetas"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Adresas</p>
                    <p className="text-muted-foreground text-sm">{content.address}</p>
                  </div>
                </div>
              </motion.a>
              <motion.a
                href={`tel:${content.phone.replace(/\s/g, '')}`}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Telefonas</p>
                    <p className="text-muted-foreground text-sm">{content.phone}</p>
                  </div>
                </div>
              </motion.a>
              <motion.a
                href="#rezervacija"
                onClick={(e) => handleScrollTo(e, "#rezervacija")}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dental-teal/20 to-dental-teal/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Darbo laikas</p>
                    <p className="text-muted-foreground text-sm">I-V 09:00-19:00</p>
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative">
              {/* Main image container */}
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">

                {/* Image */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative rounded-[2rem] overflow-hidden shadow-2xl"
                >
                  <img
                    src={heroImage}
                    alt="Azadent odontologijos kabinetas - laiminga pacientė su graži šypsena"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-navy/30 via-transparent to-transparent" />
                </motion.div>
              </div>


            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
