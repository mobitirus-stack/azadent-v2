import { Helmet } from "react-helmet-async";
import { ArrowLeft, CheckCircle, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedPosts from "@/components/RelatedPosts";
import dailyCareImage from "@/assets/blog/daily-care.png";

const Article1 = () => {
    return (
        <>
            <Helmet>
                <title>Kaip tinkamai prižiūrėti dantis kasdien? | Azadent</title>
                <meta
                    name="description"
                    content="Sužinokite pagrindinius patarimus, kaip palaikyti dantų sveikatą ir išvengti dažniausių burnos ligų. Ekspertų rekomendacijos kasdienei priežiūrai."
                />
                <meta name="keywords" content="dantų priežiūra, burnos higiena, dantų valymas, sveiki dantys, odontologija Vilnius" />
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
                                2024 m. sausis
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                5 min skaitymas
                            </span>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                Prevencija
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
                            Kaip tinkamai prižiūrėti dantis kasdien? Išsamus gidas
                        </h1>

                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-card mb-12">
                            <img
                                src={dailyCareImage}
                                alt="Dantų priežiūra"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                        <p className="lead text-xl text-muted-foreground mb-8">
                            Graži ir sveika šypsena – tai ne tik estetikos klausimas, bet ir bendros organizmo sveikatos atspindys. Nors dauguma žmonių dantis valosi kasdien, neretai daromos klaidos, kurios ilgainiui gali sukelti rimtų problemų. Šiame straipsnyje aptarsime pagrindines taisykles, kaip taisyklingai rūpintis burnos higiena namuose.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Kodėl kasdienė priežiūra yra tokia svarbi?</h2>
                        <p>
                            Burnos ertmė yra vartai į mūsų organizmą. Čia nuolat kaupiasi bakterijos, kurios, jei nėra pašalinamos, formuoja apnašas. Ilgainiui šios apnašos sukietėja ir virsta dantų akmenimis, kurių namų sąlygomis pašalinti neįmanoma. Netinkama burnos higiena gali sukelti:
                        </p>
                        <ul className="space-y-2 my-6 list-none pl-0">
                            {[
                                "Dantų ėduonį (kariesą)",
                                "Dantenų uždegimą (gingivitą)",
                                "Blogą burnos kvapą",
                                "Periodontitą (rimtą dantenų ligą)",
                                "Dantų netekimą"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Pagrindinės dantų valymo taisyklės</h2>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Valykite dantis bent du kartus per dieną</h3>
                        <p>
                            Dantis būtina valyti ryte (po pusryčių) ir vakare (prieš miegą). Vakarinis valymas yra pats svarbiausias, nes miego metu sumažėja seilių išsiskyrimas, todėl ant dantų likęs maistas ir bakterijos daro didžiausią žalą.
                        </p>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Taisyklinga valymo technika</h3>
                        <p>
                            Svarbu ne tik valyti, bet ir daryti tai teisingai. Laikykite dantų šepetėlį 45 laipsnių kampu dantenų atžvilgiu. Valykite švelniais sukamaisiais judesiais, masažuodami dantenas, bet jų netraumuodami. Nepamirškite nuvalyti ir liežuvio – ant jo kaupiasi daugybė bakterijų, sukeliančių blogą kvapą.
                        </p>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Naudokite dantų siūlą</h3>
                        <p>
                            Dantų šepetėlis pasiekia tik apie 60% dantų paviršiaus. Tarpdančiai yra ta vieta, kur dažniausiai prasideda ėduonis. Dantų siūlą naudokite bent kartą per dieną, geriausia – vakare prieš valant dantis šepetėliu.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Tinkamų priemonių pasirinkimas</h2>
                        <p>
                            **Dantų šepetėlis:** Rekomenduojame rinktis minkštą (soft) arba labai minkštą (extra soft) šepetėlį. Kieti šereliai gali pažeisti dantenas ir emalį. Elektriniai šepetėliai dažnai yra efektyvesni, nes padeda išlaikyti teisingą valymo laiką ir techniką.
                        </p>
                        <p className="mt-4">
                            **Dantų pasta:** Rinkitės pastą su fluoru, kuris stiprina emalį ir padeda apsisaugoti nuo ėduonies. Jei turite jautrius dantis ar kitų problemų, pasitarkite su savo odontologu dėl specializuotos pastos.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Mitybos įtaka dantų sveikatai</h2>
                        <p>
                            Tai, ką valgote, tiesiogiai veikia jūsų dantis. Stenkitės riboti cukraus turinčius produktus ir gazuotus gėrimus. Užkandžiavimas tarp valgymų taip pat didina rūgščių atakas, todėl po kiekvieno valgio rekomenduojama praskalauti burną vandeniu.
                        </p>

                        <div className="bg-muted p-6 rounded-2xl mt-12 mb-8 border border-border">
                            <h3 className="font-serif text-xl font-bold text-foreground mb-4">Profesionali pagalba</h3>
                            <p className="mb-4">
                                Net ir idealiai prižiūrint dantis namuose, būtina reguliariai lankytis pas odontologą. Rekomenduojame atlikti profesionalią burnos higieną kas 6 mėnesius.
                            </p>
                            <Button asChild>
                                <a href="/#rezervacija">Registruotis vizitui</a>
                            </Button>
                        </div>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Apibendrinimas</h2>
                        <p>
                            Dantų priežiūra yra kasdienis įprotis, reikalaujantis disciplinos, tačiau rezultatas – sveika šypsena ir gera savijauta – to vertas. Prisiminkite: prevencija visada yra pigesnė ir malonesnė už gydymą.
                        </p>
                    </div>

                    <RelatedPosts currentArticleId="kasdienine-prieziura" />
                </div>
            </article>
        </>
    );
};

export default Article1;
