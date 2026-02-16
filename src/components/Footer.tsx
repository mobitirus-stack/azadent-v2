import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ArrowRight, Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/azadent-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const services = [
    { name: "Dantų plombavimas", href: "/paslaugos/dantu-plombavimas" },
    { name: "Estetinis plombavimas", href: "/paslaugos/estetinis-plombavimas" },
    { name: "Dantų balinimas", href: "/paslaugos/dantu-balinimas" },
    { name: "Šaknų kanalų gydymas", href: "/paslaugos/saknu-kanalu-gydymas" },
    { name: "Dantų šalinimas", href: "/paslaugos/dantu-salinimas" },
    { name: "Burnos higiena", href: "/paslaugos/burnos-higiena" },
    { name: "Pirminė konsultacija", href: "/#rezervacija" },
    { name: "Kita", href: "/#rezervacija" },
  ];

  const quickLinks = [
    { name: "Apie mus", href: "/#apie", isHash: true },
    { name: "Gydytojai", href: "/#gydytojai", isHash: true },
    { name: "Atsiliepimai", href: "/#atsiliepimai", isHash: true },
    { name: "Galerija", href: "/galerija", isHash: false },
    { name: "Kainos", href: "/#kainos", isHash: true },
    { name: "Svetainės informacija", href: "/svetaines-informacija", isHash: false },
  ];

  const handleHashClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const hash = href.replace("/#", "#");

    if (location.pathname === "/") {
      const element = document.querySelector(hash);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    } else {
      navigate("/" + hash);
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer */}
      <div className="bg-dental-gradient-dark text-white py-20">


        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          >
            {/* Brand */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Link to="/" className="inline-block mb-6 group">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={logo}
                  alt="Azadent odontologijos kabinetas"
                  className="h-32 md:h-44 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </Link>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                Čia pacientai vertina kruopštumą, atidumą, profesionalumą.
              </p>

              {/* Social Media */}
              <div className="flex gap-3">
                <motion.a
                  href="https://www.facebook.com/balsiukas.azadent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white/80 group-hover:text-white" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/azadent_odontologija/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white/80 group-hover:text-white" />
                </motion.a>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6 text-white">Paslaugos</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to={service.href}
                        className="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                        {service.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6 text-white">Nuorodos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <motion.div whileHover={{ x: 5 }}>
                      {link.isHash ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleHashClick(e, link.href)}
                          className="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group cursor-pointer"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6 text-white">Kontaktai</h3>
              <ul className="space-y-4">
                <li>
                  <motion.a
                    href="https://www.google.com/maps/place/Konstitucijos+pr.+13,+Vilnius"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/50 transition-colors">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white/70 text-sm leading-relaxed group-hover:text-white transition-colors">
                      Konstitucijos pr. 13<br />
                      Vilnius, 09319
                    </span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="tel:+37067777066"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/50 transition-colors">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                      +370 677 77066
                    </span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="tel:+37069967006"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/50 transition-colors">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                      +370 699 67006
                    </span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="mailto:balsiukas@gmail.com"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-dental-teal/50 transition-colors">
                      <Mail className="w-4 h-4 text-dental-teal" />
                    </div>
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                      balsiukas@gmail.com
                    </span>
                  </motion.a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-rose-400" />
                  </div>
                  <span className="text-white/70 text-sm leading-relaxed">
                    I-V: 09:00 - 19:00<br />
                    VI-VII: priimame susitarus iš anksto
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-dark rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h4 className="font-serif text-xl font-semibold text-white mb-2">
                Pasiruošę pradėti?
              </h4>
              <p className="text-white/70 text-sm">
                Rezervuokite vizitą dabar ir gaukite profesionalią konsultaciją
              </p>
            </div>
            <motion.a
              href="/#rezervacija"
              onClick={(e) => handleHashClick(e, "/#rezervacija")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-shine bg-gradient-to-r from-accent to-yellow-400 text-foreground px-8 py-4 rounded-xl font-semibold shadow-gold whitespace-nowrap flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              Rezervuoti vizitą
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-foreground/95 py-6">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
          >
            <div className="flex flex-wrap items-center gap-1 text-white/60">
              <p>© {currentYear} Azadent odontologijos kabinetas. Visos teisės saugomos.</p>
              <Link to="/admin" className="text-xs bg-white/10 px-2 py-1 rounded ml-2 hover:bg-primary hover:text-white transition-all">Admin Prisijungimas</Link>
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/privatumo-politika"
                className="text-white/60 hover:text-white transition-colors"
              >
                Privatumo politika
              </Link>
              <Link
                to="/naudojimo-salygos"
                className="text-white/60 hover:text-white transition-colors"
              >
                Naudojimo sąlygos
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
