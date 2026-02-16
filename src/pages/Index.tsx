import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/HeroSection";
import About from "@/components/About";
import Services from "@/components/Services";
import Doctors from "@/components/DoctorsSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import BookingForm from "@/components/BookingForm";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Index = () => {
  const location = useLocation();

  // Handle smooth scroll to hash
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <motion.main
      className="min-h-screen overflow-hidden"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      <Header />
      <Hero />
      <About />
      <Services />
      <Doctors />
      <Testimonials />
      <Pricing />
      <Contact />
      <BookingForm />
      <Footer />
    </motion.main>
  );
};

export default Index;
