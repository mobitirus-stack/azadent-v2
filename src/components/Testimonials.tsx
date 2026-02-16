import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      name: "Aistė M.",
      rating: 5,
      text: "Puikus aptarnavimas ir profesionalūs gydytojai. Labai rekomenduoju! Jaučiausi labai patogiai ir saugiai per visą vizitą.",
      service: "Dantų balinimas",
      date: "2024 m. sausis",
    },
    {
      name: "Tomas K.",
      rating: 5,
      text: "Geriausias odontologijos kabinetas, kuriame esu buvęs. Moderni įranga ir malonus personalas. Gydytojas Ernestas tikras profesionalas!",
      service: "Dantų implantacija",
      date: "2024 m. vasaris",
    },
    {
      name: "Laura S.",
      rating: 5,
      text: "Ačiū už nuostabų rezultatą! Mano šypsena niekada neatrodė geriau. Rekomenduoju visiems, kas ieško kokybiškų paslaugų.",
      service: "Estetinis plombavimas",
      date: "2024 m. kovas",
    },
    {
      name: "Justas R.",
      rating: 5,
      text: "Profesionalus ir skausmingas gydymas. Po ilgų metų baimės pagaliau radau odontologiją, kur jaučiuosi ramiai.",
      service: "Šaknų kanalų gydymas",
      date: "2024 m. balandis",
    },
    {
      name: "Monika V.",
      rating: 5,
      text: "Nuostabus personalas ir švarios patalpos. Gydytoja Giedrė labai švelni ir atidi. Mano vaikai nebijo eiti pas odontologą!",
      service: "Burnos higiena",
      date: "2024 m. gegužė",
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setDirection(-1);
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setDirection(1);
    goToSlide((activeIndex + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="atsiliepimai" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dental-gradient" />



      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-white/50" />
            Atsiliepimai
            <span className="w-8 h-px bg-white/50" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ką sako mūsų pacientai
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-accent to-yellow-400 mb-6 origin-left"
          />

          {/* Google Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 glass-dark rounded-full px-6 py-3"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-white font-semibold">5.0</span>
            <span className="text-white/70 text-sm">Google įvertinimas</span>
          </motion.div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className="glass-dark rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[320px]">
            {/* Quote icon */}
            <Quote className="absolute top-8 right-8 w-20 h-20 text-white/10" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="relative z-10"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-6 h-6 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light">
                  "{testimonials[activeIndex].text}"
                </blockquote>

                {/* Author info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-white/60 text-sm">
                      {testimonials[activeIndex].service} • {testimonials[activeIndex].date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPrev}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                  ? "w-8 bg-accent"
                  : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://www.google.com/maps/place/Azadent+odontologijos+kabinetas"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors"
          >
            Skaityti visus atsiliepimus Google
            <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
