import { Calendar, ArrowRight } from "lucide-react";
import dailyCareImage from "@/assets/blog/daily-care.webp";
import dentalImplantsImage from "@/assets/blog/dental-implants.webp";
import oralHygieneImage from "@/assets/blog/oral-hygiene.webp";

const allArticles = [
  {
    id: "kasdienine-prieziura",
    title: "Kaip tinkamai prižiūrėti dantis kasdien?",
    date: "2024 m. sausis",
    category: "Prevencija",
    image: dailyCareImage,
    link: "/blog/kasdienine-prieziura",
  },
  {
    id: "dantu-implantai",
    title: "Dantų implantai: viskas, ką reikia žinoti",
    date: "2024 m. vasaris",
    category: "Implantologija",
    image: dentalImplantsImage,
    link: "/blog/dantu-implantai",
  },
  {
    id: "burnos-higiena",
    title: "Profesionali burnos higiena: kodėl tai svarbu?",
    date: "2024 m. kovas",
    category: "Higiena",
    image: oralHygieneImage,
    link: "/blog/burnos-higiena",
  },
];

interface RelatedPostsProps {
  currentArticleId: string;
}

const RelatedPosts = ({ currentArticleId }: RelatedPostsProps) => {
  const relatedArticles = allArticles.filter(
    (article) => article.id !== currentArticleId
  );

  return (
    <section className="border-t border-border pt-12 mt-16">
      <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
        Kiti straipsniai
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {relatedArticles.map((article) => (
          <a
            key={article.id}
            href={article.link}
            className="group flex gap-4 bg-card rounded-xl overflow-hidden shadow-card hover:shadow-dental transition-all duration-300"
          >
            <div className="w-32 h-24 flex-shrink-0 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="py-3 pr-4 flex flex-col justify-center">
              <span className="text-xs text-primary font-medium mb-1">
                {article.category}
              </span>
              <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <span className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
