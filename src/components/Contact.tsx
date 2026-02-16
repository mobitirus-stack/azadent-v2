import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresas",
      content: "Konstitucijos pr. 13",
      subContent: "Vilnius, 09319",
      link: "https://www.google.com/maps/place/Azadent+odontologijos+kabinetas",
      linkText: "Atidaryti žemėlapyje",
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
    },
    {
      icon: Phone,
      title: "Telefonas",
      content: "+370 677 77066",
      subContent: "+370 699 67006",
      link: "tel:+37067777066",
      linkText: "Skambinti dabar",
      color: "from-accent/20 to-accent/5",
      iconColor: "text-accent",
    },
    {
      icon: Mail,
      title: "El. paštas",
      content: "balsiukas@gmail.com",
      subContent: "",
      link: "mailto:balsiukas@gmail.com",
      linkText: "Rašyti laišką",
      color: "from-dental-teal/20 to-dental-teal/5",
      iconColor: "text-dental-teal",
    },
    {
      icon: Clock,
      title: "Lankstus grafikas",
      content: "I–V: 09:00 – 19:00",
      subContent: "VI–VII: priimame susitarus iš anksto",
      link: null,
      linkText: null,
      color: "from-rose-500/20 to-rose-500/5",
      iconColor: "text-rose-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="kontaktai" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dental-gradient-light" />



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
            Kontaktai
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Turite klausimų?{" "}
            <span className="text-gradient">Susisiekite su mumis</span>
          </h2>
          <div className="section-divider mb-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group card-premium p-6 hover:shadow-dental cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 transition-transform duration-300`}
                >
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </motion.div>

                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground font-medium">{item.content}</p>
                <p className="text-muted-foreground text-sm mb-4">{item.subContent}</p>

                {item.link && (
                  <motion.a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-1 text-primary text-sm font-medium transition-all duration-300"
                  >
                    {item.linkText}
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Map container */}
              <div className="aspect-[4/3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2305.715173367494!2d25.2716638!3d54.6970397!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd95364c1719c1%3A0x6ded7114a1cf77b4!2sAzadent%20odontologijos%20kabinetas!5e0!3m2!1sen!2slt!4v1770300351669!5m2!1sen!2slt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
              </div>

              {/* Map info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">Azadent odontologijos kabinetas</p>
                  <p className="text-muted-foreground text-sm">Konstitucijos pr. 13, Vilnius</p>
                </div>
                <motion.a
                  href="https://www.google.com/maps/dir//Konstitucijos+pr.+13,+Vilnius"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-dental-gradient flex items-center justify-center shadow-dental hover:opacity-90 transition-opacity"
                  aria-label="Gauti nuorodas"
                >
                  <Navigation className="w-5 h-5 text-white" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Quick contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="text-foreground font-medium mb-4">
                Turite klausimų? Susisiekite su mumis
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="btn-shine bg-dental-gradient hover:opacity-90 text-white shadow-dental"
                    asChild
                  >
                    <a href="tel:+37067777066" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Skambinti
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-2 border-primary/20 hover:border-primary"
                    asChild
                  >
                    <a href="mailto:balsiukas@gmail.com" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Rašyti el. laišką
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
