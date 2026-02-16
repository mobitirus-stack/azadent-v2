import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Phone, Mail, MessageSquare, Clock, CheckCircle, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    preferredTime: "",
    message: "",
  });

  const services = [
    "Dantų plombavimas",
    "Estetinis plombavimas",
    "Dantų balinimas",
    "Dantų šaknų kanalų gydymas",
    "Dantų kariesų plombavimas",
    "Dantų šalinimas",
    "Burnos higiena",
    "Pirminė konsultacija",
    "Kita",
  ];

  const timeSlots = [
    "Ryte (09:00-12:00)",
    "Po pietų (12:00-15:00)",
    "Vakare (15:00-19:00)",
    "Bet kuriuo metu",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);
    toast({
      title: "Užklausa išsiųsta!",
      description: "Susisieksime su Jumis artimiausiu metu.",
    });

    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  if (isSuccess) {
    return (
      <section id="rezervacija" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass rounded-3xl p-12 shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4"
              >
                Dėkojame, kad kreipėtės į mus.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-lg mb-8"
              >
                Dėkojame, kad kreipėtės į mus. Mes susisieksime su Jumis artimiausiu metu,
                kad patvirtintume vizito laiką.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="border-2"
                  >
                    Siųsti dar vieną užklausą
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="btn-shine bg-dental-gradient hover:opacity-90 text-white shadow-dental"
                    asChild
                  >
                    <a href="tel:+37067777066">
                      <Phone className="w-4 h-4 mr-2" />
                      Skambinti dabar
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rezervacija" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />



      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4"
            >
              <span className="w-8 h-px bg-primary" />
              Rezervacija
              <span className="w-8 h-px bg-primary" />
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              Rezervuokite{" "}
              <span className="text-gradient">vizitą</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="section-divider mb-6 mx-0" />

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              Užpildykite formą ir mes susisieksime su Jumis, kad patvirtintume
              patogų vizito laiką. Arba skambinkite mums tiesiogiai.
            </motion.p>

            {/* Benefits */}
            <motion.div variants={containerVariants} className="space-y-4">
              {[
                { icon: Clock, title: "Greitas atsakymas", text: "", color: "from-primary/20 to-primary/5" },
                { icon: Calendar, title: "Lankstus grafikas", text: "", color: "from-accent/20 to-accent/5" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Label htmlFor="name" className="text-foreground font-medium">
                  Vardas ir pavardė *
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jūsų vardas"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-12 h-14 rounded-xl border-border/50 focus:border-primary transition-colors"
                  />
                </div>
              </motion.div>

              {/* Phone & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Telefonas *
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+370..."
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-12 h-14 rounded-xl border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-foreground font-medium">
                    El. paštas
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jusu@email.lt"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-12 h-14 rounded-xl border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Service & Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label className="text-foreground font-medium">Paslauga *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleInputChange("service", value)}
                    required
                  >
                    <SelectTrigger className="h-14 rounded-xl border-border/50">
                      <SelectValue placeholder="Pasirinkite paslaugą" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label className="text-foreground font-medium">Pageidaujamas laikas</Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => handleInputChange("preferredTime", value)}
                  >
                    <SelectTrigger className="h-14 rounded-xl border-border/50">
                      <SelectValue placeholder="Pasirinkite laiką" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <Label htmlFor="message" className="text-foreground font-medium">
                  Papildoma informacija
                </Label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Textarea
                    id="message"
                    placeholder="Apibūdinkite savo situaciją ar užduokite klausimą..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="pl-12 pt-3 rounded-xl border-border/50 focus:border-primary resize-none transition-colors"
                  />
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-shine bg-dental-gradient hover:opacity-90 text-white h-14 rounded-xl text-base font-semibold shadow-dental disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Siunčiama...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Rezervuoti vizitą
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-center text-muted-foreground text-xs"
              >
                Pateikdami formą sutinkate su mūsų privatumo politika
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
