import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Kaip dažnai reikia lankytis pas odontologą?",
      answer:
        "Rekomenduojama lankytis pas odontologą bent du kartus per metus profilaktiniam patikrinimui ir profesionaliai burnos higienai. Tai padeda anksti nustatyti galimas problemas ir išvengti sudėtingesnio gydymo.",
    },
    {
      question: "Ar dantų gydymas skausmingas?",
      answer:
        "Šiuolaikinė odontologija naudoja efektyvias nuskausminimo priemones, todėl dauguma procedūrų yra neskausmingos. Mūsų klinikoje taikome modernius metodus, kad pacientai jaustųsi kuo patogiau.",
    },
    {
      question: "Kiek kainuoja konsultacija?",
      answer:
        "Pirminės konsultacijos kaina priklauso nuo jos apimties. Rekomenduojame susisiekti telefonu +370 607 87778 arba užpildyti užklausos formą – suteikime tikslią informaciją apie kainas.",
    },
    {
      question: "Ar galima atsiskaityti kortele?",
      answer:
        "Taip, priimame mokėjimus banko kortelėmis ir grynaisiais. Taip pat galimas mokėjimas dalimis arba per sveikatos draudimo fondą (jei taikoma).",
    },
    {
      question: "Kaip pasiruošti vizitui pas odontologą?",
      answer:
        "Prieš vizitą rekomenduojame išsivalyti dantis. Jei turite ankstesnių tyrimų rezultatus ar rentgeno nuotraukas – atsineškite su savimi. Taip pat informuokite gydytoją apie visas vartojamas vaistas ir alergijas.",
    },
    {
      question: "Ar dirbate savaitgaliais?",
      answer:
        "Šiuo metu dirbame darbo dienomis: pirmadienis-penktadienis 09:00-18:00. Savaitgaliais ir švenčių dienomis klinika nedirba.",
    },
  ];

  return (
    <section id="duk" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            DUK
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-6">
            Dažniausiai užduodami klausimai
          </h2>
          <p className="text-muted-foreground text-lg">
            Čia rasite atsakymus į dažniausiai pacientų užduodamus klausimus. Jei neradote atsakymo – susisiekite su mumis.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl px-6 shadow-card border-none"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
