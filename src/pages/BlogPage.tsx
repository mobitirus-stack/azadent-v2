import { Helmet } from "react-helmet-async";
import { Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dailyCareImage from "@/assets/blog/daily-care.webp";
import dentalImplantsImage from "@/assets/blog/dental-implants.webp";
import oralHygieneImage from "@/assets/blog/oral-hygiene.webp";

const BlogPage = () => {
  const articles = [
    {
      title: "Kaip tinkamai prižiūrėti dantis kasdien?",
      excerpt:
        "Sužinokite pagrindinius patarimus, kaip palaikyti dantų sveikatą ir išvengti dažniausių burnos ligų.",
      date: "2024 m. sausis",
      category: "Prevencija",
      readTime: "5 min",
      image: dailyCareImage,
      link: "/blog/kasdienine-prieziura",
    },
    {
      title: "Dantų implantai: viskas, ką reikia žinoti",
      excerpt:
        "Išsami informacija apie dantų implantus – kas tai, kaip vyksta procedūra ir ko tikėtis po operacijos.",
      date: "2024 m. vasaris",
      category: "Implantologija",
      readTime: "8 min",
      image: dentalImplantsImage,
      link: "/blog/dantu-implantai",
    },
    {
      title: "Profesionali burnos higiena: kodėl tai svarbu?",
      excerpt:
        "Kodėl verta reguliariai atlikti profesionalią burnos higieną ir kaip ji skiriasi nuo kasdienio valymo.",
      date: "2024 m. kovas",
      category: "Higiena",
      readTime: "4 min",
      image: oralHygieneImage,
      link: "/blog/burnos-higiena",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Blogas | Paupio Odontologijos Klinika</title>
        <meta
          name="description"
          content="Naudingi straipsniai apie dantų priežiūrą, burnos higieną ir odontologines procedūras. Patarimai iš profesionalų."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-20 lg:pt-32 lg:pb-32 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Blogas
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Naudingi straipsniai
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Patarimai ir informacija apie dantų sveikatą, burnos higieną ir odontologines procedūras.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-dental transition-all duration-300 block cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {article.readTime} skaitymas
                    </span>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Skaityti
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
