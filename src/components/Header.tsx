import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, Calendar, Facebook } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/azadent-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/#apie", label: "Apie mus", isHash: true },
    { href: "/#paslaugos", label: "Paslaugos", isHash: true },
    { href: "/#gydytojai", label: "Gydytojai", isHash: true },
    { href: "/galerija", label: "Galerija", isHash: false },
    { href: "/#atsiliepimai", label: "Atsiliepimai", isHash: true },
    { href: "/#kainos", label: "Kainos", isHash: true },
    { href: "/#kontaktai", label: "Kontaktai", isHash: true },
  ];

  // Handle navigation with smooth scroll
  const handleNavClick = (href: string, isHash: boolean, e: React.MouseEvent) => {
    if (isHash) {
      e.preventDefault();
      const hash = href.replace("/#", "#");

      if (location.pathname === "/") {
        // Already on home page, just scroll
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      } else {
        // Navigate to home page with hash
        navigate("/" + hash);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === href.slice(1);
    }
    return location.pathname === href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "glass-strong py-2 shadow-lg"
          : "bg-transparent py-4"
          }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-dental-gradient origin-left"
          style={{ scaleX }}
        />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={logo}
                  alt="Azadent odontologijos kabinetas"
                  className={`w-auto object-contain transition-all duration-500 ${isScrolled ? "h-12 md:h-14" : "h-24 md:h-32"
                    }`}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  {link.isHash ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(link.href, link.isHash, e)}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${isActive(link.href)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                        }`}
                    >
                      {link.label}
                      <motion.span
                        className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0, x: "-50%" }}
                        whileHover={{ width: 24 }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${isActive(link.href)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                        }`}
                    >
                      {link.label}
                      <motion.span
                        className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0, x: "-50%" }}
                        whileHover={{ width: 24 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Social Media Icons */}
              <div className="flex items-center gap-2">
                <motion.a
                  href="https://www.facebook.com/balsiukas.azadent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-primary" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/azadent_odontologija/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </motion.a>
              </div>
              <motion.a
                href="tel:+37067777066"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Skambinkite</span>
                  <span className="font-semibold text-foreground">+370 677 77066</span>
                </div>
              </motion.a>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="btn-shine bg-dental-gradient hover:opacity-90 text-white shadow-dental px-6 h-12 rounded-xl font-semibold"
                  asChild
                >
                  <a
                    href="/#rezervacija"
                    onClick={(e) => handleNavClick("/#rezervacija", true, e)}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Rezervuoti vizitą
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${isMobileMenuOpen
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <img
                  src={logo}
                  alt="Azadent"
                  className="h-10 w-auto object-contain"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.isHash ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, link.isHash, e)}
                          className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${isActive(link.href)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                            }`}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${isActive(link.href)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                            }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border-t border-border space-y-4 bg-muted/30"
              >
                <a
                  href="tel:+37067777066"
                  className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-card"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Skambinkite dabar</p>
                    <p className="font-semibold text-foreground">+370 677 77066</p>
                  </div>
                </a>

                <Button
                  className="w-full btn-shine bg-dental-gradient hover:opacity-90 text-white h-14 rounded-xl text-base font-semibold shadow-dental"
                  asChild
                >
                  <a
                    href="/#rezervacija"
                    onClick={(e) => handleNavClick("/#rezervacija", true, e)}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Rezervuoti vizitą
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
