import { Helmet } from "react-helmet-async";
import { ArrowLeft, CheckCircle, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedPosts from "@/components/RelatedPosts";
import oralHygieneImage from "@/assets/blog/oral-hygiene.png";

const Article3 = () => {
    return (
        <>
            <Helmet>
                <title>Profesionali burnos higiena: kodėl tai svarbu? | Azadent</title>
                <meta
                    name="description"
                    content="Sužinokite, kodėl profesionali burnos higiena yra būtina procedūra. Kaip ji atliekama, kokia nauda ir kaip dažnai reikia lankytis pas higienistą."
                />
                <meta name="keywords" content="burnos higiena, dantų valymas, akmenų šalinimas, profesionali higiena, odontologija Vilnius" />
            </Helmet>

            <article className="pt-24 pb-20 lg:pt-32 lg:pb-32 bg-background min-h-screen">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary" asChild>
                            <a href="/#blogas">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Grįžti į straipsnius
                            </a>
                        </Button>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                2024 m. kovas
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                4 min skaitymas
                            </span>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                Higiena
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
                            Profesionali burnos higiena: kodėl tai svarbu?
                        </h1>

                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-card mb-12">
                            <img
                                src={oralHygieneImage}
                                alt="Profesionali burnos higiena"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                        <p className="lead text-xl text-muted-foreground mb-8">
                            Net ir kruopščiausiai valant dantis namuose, sunku visiškai pašalinti visas apnašas, ypač sunkiai pasiekiamose vietose. Laikui bėgant, mineralizuotos apnašos virsta dantų akmenimis, kurie tampa pagrindine dantenų ligų ir dantų gedimo priežastimi. Profesionali burnos higiena – tai ne prabanga, o būtinybė, norint išsaugoti sveikus dantis.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Kas yra profesionali burnos higiena?</h2>
                        <p>
                            Tai higienos procedūra, atliekama odontologo kabinete, kurios metu pašalinamos minkštosios ir kietosios apnašos (akmenys), nupoliruojami dantų paviršiai ir atliekamos profilaktinės aplikacijos. Tai vienas efektyviausių būdų užkirsti kelią periodonto ligoms.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Kodėl dantų šepetėlio nepakanka?</h2>
                        <p>
                            Dantų šepetėlis ir siūlas puikiai pašalina maisto likučius ir neseniai susiformavusias apnašas. Tačiau seilėse esantys mineralai reaguoja su apnašomis ir per 24-48 valandas pradeda formuotis dantų akmenys. Kartą susiformavusio akmens namų priemonėmis pašalinti neįmanoma – tam reikalingi specialūs instrumentai.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Procedūros eiga</h2>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Ultragarsinis skaleris</h3>
                        <p>
                            Naudojant ultragarsinį prietaisą, vibracijos ir vandens pagalba efektyviai ir neskausmingai atskiriami bei pašalinami dantų akmenys nuo dantų paviršiaus ir iš po dantenų.
                        </p>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. "Air-flow" (sodapūtė) metodas</h3>
                        <p>
                            Tai smulkių sodos, oro ir vandens srovė, kuri greitai ir efektyviai nuvalo pigmentines apnašas, atsiradusias nuo kavos, arbatos, tabako ar dažančio maisto. Po šio etapo dantys tampa pastebimai šviesesni ir lygesni.
                        </p>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Poliravimas</h3>
                        <p>
                            Dantys nupoliruojami specialia pasta ir šepetėliais. Lygus danties paviršius mažiau kaupia apnašas, todėl akmenys formuojasi lėčiau.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Procedūros nauda</h2>
                        <ul className="space-y-2 my-6 list-none pl-0">
                            {[
                                "Pašalinamos bakterijos ir toksinai, sukeliantys uždegimą",
                                "Sustabdomas dantenų kraujavimas ir blogas kvapas",
                                "Dantys tampa šviesesni ir estetiškesni",
                                "Ankstyva kitų problemų (pvz., karieso) diagnostika",
                                "Prailginamas dantų plombų ir protezų tarnavimo laikas"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Kaip dažnai reikia atlikti higieną?</h2>
                        <p>
                            Rekomenduojama standartinė dažnis – kas 6 mėnesius. Tačiau pacientams, turintiems periodonto ligų, nešiojantiems breketus, turintiems daug implantų ar protezų, higieną gali tekti atlikti dažniau – kas 3–4 mėnesius. Tikslų planą sudarys Jūsų burnos higienistas.
                        </p>

                        <div className="bg-muted p-6 rounded-2xl mt-12 mb-8 border border-border">
                            <h3 className="font-serif text-xl font-bold text-foreground mb-4">Kada paskutinį kartą atlikote burnos higieną?</h3>
                            <p className="mb-4">
                                Jei praėjo daugiau nei pusmetis, kviečiame užsiregistruoti vizitui pas mūsų specialistę Jolantą.
                            </p>
                            <Button asChild>
                                <a href="/#rezervacija">Registruotis vizitui</a>
                            </Button>
                        </div>
                    </div>

                    <RelatedPosts currentArticleId="burnos-higiena" />
                </div>
            </article>
        </>
    );
};

export default Article3;
