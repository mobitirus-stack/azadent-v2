import { Helmet } from "react-helmet-async";
import { ArrowLeft, CheckCircle, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedPosts from "@/components/RelatedPosts";
import dentalImplantsImage from "@/assets/blog/dental-implants.png";

const Article2 = () => {
    return (
        <>
            <Helmet>
                <title>Dantų implantai: viskas, ką reikia žinoti | Azadent</title>
                <meta
                    name="description"
                    content="Išsami informacija apie dantų implantus. Sužinokite, kas yra dantų implantacija, kaip ji atliekama ir kokie yra privalumai. Ekspertų atsakymai."
                />
                <meta name="keywords" content="dantų implantai, implantacija, dantų atkūrimas, protezavimas, odontologija Vilnius" />
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
                                2024 m. vasaris
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                8 min skaitymas
                            </span>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                Implantologija
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
                            Dantų implantai: viskas, ką reikia žinoti
                        </h1>

                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-card mb-12">
                            <img
                                src={dentalImplantsImage}
                                alt="Dantų implantai"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                        <p className="lead text-xl text-muted-foreground mb-8">
                            Prarasti dantys – tai ne tik estetinė, bet ir funkcinė problema, kurianti diskomfortą valgant, kalbant bei neigiamai veikianti pasitikėjimą savimi. Šiuolaikinė odontologija siūlo patikimiausią dantų atkūrimo būdą – dantų implantaciją. Šiame straipsnyje atsakysime į dažniausiai užduodamus klausimus apie šią procedūrą.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Kas yra dantų implantas?</h2>
                        <p>
                            Dantų implantas – tai nedidelis, dažniausiai iš titano pagamintas varžtelis, kuris chirurginiu būdu įsodinamas į žandikaulio kaulą ir pakeičia prarasto danties šaknį. Titanas yra biologiškai suderinama medžiaga, kurią žmogaus organizmas puikiai toleruoja, todėl implantas suauga su kaulu (vyksta osteointegracija) ir tampa tvirta atrama būsimam vainikėliui (danties karūnėlei).
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Dantų implantų privalumai</h2>
                        <ul className="space-y-2 my-6 list-none pl-0">
                            {[
                                "Atkuria kramtymo funkciją 100% (palyginimui, protezai – tik apie 30-40%)",
                                "Apsaugo žandikaulio kaulą nuo tirpimo",
                                "Nereikia šlifuoti gretimų sveikų dantų (kaip daroma tiltinių protezų atveju)",
                                "Ilgaamžiškumas (tinkamai prižiūrint, gali tarnauti visą gyvenimą)",
                                "Estetika – atrodo ir jaučiasi kaip natūralūs dantys"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Kaip vyksta implantacijos procedūra?</h2>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Konsultacija ir diagnostika</h3>
                        <p>
                            Pirmiausia atliekama paciento burnos būklės apžiūra, daroma 3D kompiuterinė tomografija, įvertinamas žandikaulio kaulo kiekis ir kokybė. Sudaromas tikslus gydymo planas.
                        </p>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Chirurginė dalis (implanto sriegimas)</h3>
                        <p>
                            Taikant vietinę nejautrą, implantas įsriegiamas į žandikaulį. Procedūra yra neskausminga ir trunka apie 30-60 minučių. Po operacijos paskiriami vaistai ir nurodymai priežiūrai.
                        </p>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Gijimo periodas</h3>
                        <p>
                            Implantas turi prigyti kaule. Tai trunka nuo 3 iki 6 mėnesių. Šiuo laikotarpiu, jei implantas yra estetinėje zonoje, gali būti uždedamas laikinas dantis, kad pacientas nejaustų diskomforto.
                        </p>

                        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">4. Protezavimas</h3>
                        <p>
                            Kai implantas prigyja, pradedamas protezavimas. Nuimami antspaudai (arba atliekamas skaitmeninis skenavimas) ir laboratorijoje pagaminamas individualus danties vainikėlis, kuris pritvirtinamas prie implanto.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Ar implantacija skausminga?</h2>
                        <p>
                            Dauguma pacientų nustemba, kad pati implantacijos procedūra yra visiškai neskausminga dėl efektyvaus vietinio nuskausminimo. Po operacijos kelias dienas gali būti juntamas nedidelis maudimas ar patinimas, kuris lengvai kontroliuojamas įprastais vaistais nuo skausmo.
                        </p>

                        <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6">Kiek tarnauja dantų implantai?</h2>
                        <p>
                            Moksliniai tyrimai rodo, kad apie 95-98% implantų sėkmingai prigyja. Tinkamai prižiūrimi – reguliariai valant, naudojant tarpdančių siūlą ir lankantis pas odontologą profilaktikai – implantai gali tarnauti visą likusį gyvenimą.
                        </p>

                        <div className="bg-muted p-6 rounded-2xl mt-12 mb-8 border border-border">
                            <h3 className="font-serif text-xl font-bold text-foreground mb-4">Domina dantų implantacija?</h3>
                            <p className="mb-4">
                                Kviečiame į konsultaciją, kurios metu įvertinsime Jūsų situaciją ir pasiūlysime geriausią sprendimą.
                            </p>
                            <Button asChild>
                                <a href="/#rezervacija">Registruotis konsultacijai</a>
                            </Button>
                        </div>
                    </div>

                    <RelatedPosts currentArticleId="dantu-implantai" />
                </div>
            </article>
        </>
    );
};

export default Article2;
