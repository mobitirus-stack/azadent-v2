import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ChevronRight } from "lucide-react";
import placeholderFemale from "@/assets/doctors/placeholder-female.webp";
import placeholderMale from "@/assets/doctors/placeholder-male.webp";
import ernestasBalsiukas from "@/assets/doctors/ernestas.jpg";
import gemaJautakiene from "@/assets/doctors/gema.jpg";

interface Doctor {
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  description: string;
  image: string;
}

import { useContent } from "@/hooks/useContent";

// ... imports

const DoctorsSection = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const defaultDoctors: Doctor[] = [
    {
      name: "Ernestas Balsiukas",
      role: "Gydytojas odontologas",
      experience: "20+ metų patirtis",
      specialties: ["Estetinis dantų plombavimas", "Dantų šaknų kanalų gydymas", "Dantų kariesų plombavimas", "Dantų balinimas"],
      description: "Ernestas daugiau nei 20 metų specializuojasi estetinio plombavimo srityje, nudilusių dantų ar dantų spalvos atstatymo srityse. Taip pat konsultuoja ir gydo dėl dantų skausmo, karieso pažeistų dantų plombavimo, dantų šaknų kanalų gydymo. Jo tikslumas ir profesionalumas užtikrina aukščiausią gydymo kokybę.",
      image: ernestasBalsiukas,
    },
    {
      name: "Gema Jautakienė",
      role: "Burnos higienistė",
      experience: "15+ metų patirtis",
      specialties: ["Burnos higiena", "Burnos ertmės priežiūra"],
      description: "Gema yra burnos higienistė, atliekanti profesionalią burnos ertmės higieną, akmenų, apnašų šalinimą, dantų poliravimą. Taip pat konsultuoja pacientus individualios burnos priežiūros klausimais, parenka tinkamas higienos priemones, paaiškina taisyklingą dantų ir tarpdančių valymo techniką.",
      image: gemaJautakiene,
    },
  ];

  /* 
     CMS DATA INTEGRATION:
     We use the 'home.doctors' slug. The CMS should save this as a direct Array of Doctor objects.
  */
  const { data: doctorsList } = useContent<Doctor[]>('home.doctors', defaultDoctors);

  // MERGE LOGIC: Use local image if CMS image is missing
  const doctors = (Array.isArray(doctorsList) ? doctorsList : defaultDoctors).map(doctor => {
    // Try to find matching default doctor by name (since we don't have slugs here, checking name/role match is best effort)
    const defaultDoctor = defaultDoctors.find(d => d.name === doctor.name);
    return {
      ...doctor,
      image: (doctor.image && doctor.image.length > 10) ? doctor.image : defaultDoctor?.image || doctor.image
    };
  });

  const otherDoctors = selectedDoctor
    ? doctors.filter(d => d.name !== selectedDoctor.name)
    : [];

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setSelectedDoctor(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section id="gydytojai" className="py-24 lg:py-32 relative overflow-hidden">
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
            Mūsų komanda
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Patyrę{" "}
            <span className="text-gradient">specialistai</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ernestas Balsiukas – gydytojas odontologas ir Gema Jautakienė – burnos higienistė. Ilgametė abiejų specialistų patirtis.
          </p>
        </motion.div>

        {/* Selected Doctor Detail View */}
        <AnimatePresence mode="wait">
          {selectedDoctor && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-12 glass rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Photo */}
                <motion.div
                  className="relative aspect-[4/5] md:aspect-auto overflow-hidden"
                  layoutId={`doctor-image-${selectedDoctor.name}`}
                >
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className={`w-full h-full object-cover ${selectedDoctor.name.includes("Gema") ? "object-top" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
                </motion.div>

                {/* Info */}
                <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedDoctor(null)}
                    className="absolute top-6 right-6 p-3 rounded-full glass hover:bg-muted transition-all duration-300 group"
                    aria-label="Uždaryti"
                  >
                    <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-4">
                      <Award className="w-4 h-4" />
                      {selectedDoctor.experience}
                    </div>

                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-primary font-medium mb-6">{selectedDoctor.role}</p>

                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {selectedDoctor.description}
                    </p>

                    {/* Specialties */}
                    <div className="mb-8">
                      <p className="text-sm font-semibold text-foreground mb-3">Specializacijos:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDoctor.specialties.map((specialty, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm font-medium rounded-full border border-primary/20"
                          >
                            {specialty}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Book appointment CTA */}
                    <motion.a
                      href="#rezervacija"
                      onClick={(e) => handleScrollTo(e, "#rezervacija")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 btn-shine bg-dental-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-dental w-fit"
                    >
                      Užsisakyti vizitą
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>

              {/* Other Doctors - Small Cards */}
              {otherDoctors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="border-t border-border/50 p-6 bg-muted/20"
                >
                  <p className="text-sm text-muted-foreground mb-4 font-medium">Kiti gydytojai:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {otherDoctors.map((doctor, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDoctor(doctor)}
                        className="card-premium overflow-hidden text-left"
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${doctor.name.includes("Gema") ? "object-top" : ""}`}
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h4 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                            {doctor.name}
                          </h4>
                          <p className="text-primary/70 text-xs truncate">{doctor.role}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Doctors Grid - Only show when no doctor is selected */}
        <AnimatePresence mode="wait">
          {!selectedDoctor && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {doctors.map((doctor, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDoctor(doctor)}
                  className="group card-premium overflow-hidden text-left"
                >
                  {/* Photo */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${doctor.name.includes("Gema") ? "object-top scale-125 group-hover:scale-135" : "group-hover:scale-105"}`}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <p className="text-white/90 text-sm mb-4 line-clamp-3">
                        {doctor.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.specialties.slice(0, 2).map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experience badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 text-xs font-semibold text-white z-10"
                    >
                      {doctor.experience}
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-primary text-sm font-medium">{doctor.role}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground italic text-sm">
            * Paspauskite ant gydytojo kortelės, kad sužinotumėte daugiau
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorsSection;
