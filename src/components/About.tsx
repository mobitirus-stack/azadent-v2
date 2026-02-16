import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Shield, Users, Heart, Award, Clock, BadgeCheck, Sparkles, Zap } from "lucide-react";

// Animated Counter Component with framer-motion
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Aukščiausia kokybė",
      description: "",
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: Users,
      title: "Patyrę specialistai",
      description: "",
      color: "from-accent/30 to-accent/10",
    },
    {
      icon: Heart,
      title: "Individualus požiūris",
      description: "",
      color: "from-dental-teal/20 to-dental-teal/5",
    },
  ];

  const stats = [
    { value: 5, suffix: ".0", label: "Google įvertinimas" },
  ];

  const trustBadges = [
    { icon: Zap, text: "Greitas aptarnavimas" },
    { icon: BadgeCheck, text: "Kokybė" },
    { icon: BadgeCheck, text: "Profesionalumas" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="apie" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dental-gradient-light" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4"
            >
              <span className="w-8 h-px bg-primary" />
              Apie mus
              <span className="w-8 h-px bg-primary" />
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              Profesionalūs sprendimai{" "}
              <span className="text-gradient">Jūsų šypsenai</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="section-divider mb-6 mx-0" />

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              AZADENT odontologijos kabinetas. Čia pacientai vertina kruopštumą, atidumą, profesionalumą.
            </motion.p>

            {/* Features */}
            <motion.div variants={containerVariants} className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-card to-transparent hover:from-primary/5 transition-all duration-300 cursor-default"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    {feature.description && <p className="text-muted-foreground text-sm">{feature.description}</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 glass rounded-full px-4 py-2"
                >
                  <badge.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <motion.div
              className="flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center w-full aspect-square max-w-[280px] flex flex-col items-center justify-center rounded-3xl glass shadow-lg bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 transition-colors duration-300 p-8"
                >
                  <p className="font-serif text-5xl md:text-6xl font-bold text-gradient mb-3">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2500}
                    />
                  </p>
                  <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Director Quote */}
            <motion.div
              className="relative rounded-3xl p-8 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {/* Dark gradient background */}
              <div className="absolute inset-0 bg-dental-gradient-dark" />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.5, delay: 0.4 }}
                >
                  <Sparkles className="w-10 h-10 text-accent mb-4" />
                </motion.div>
                <blockquote className="text-lg text-white/90 font-light italic mb-6 leading-relaxed">
                  "AZADENT – pavadinimas simbolizuoja dvi mano gyvenimo aistras: odontologiją, veiklą, kuriai paskyriau savo didžiąją gyvenimo dalį ir nuostabia elegancija spinduliuojančius šunis, azavakus. Su džiaugsmu lauksiu Jūsų konsultacijai ir šypsenos tobulinimui."
                </blockquote>
                <footer className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center text-lg font-bold text-foreground">
                    EB
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-white">Ernestas Balsiukas</cite>
                    <p className="text-white/60 text-sm">AZADENT įkūrėjas, gydytojas odontologas</p>
                  </div>
                </footer>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
