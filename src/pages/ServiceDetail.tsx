import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import toothFillingImg from "@/assets/services/tooth-filling.jpg";
import aestheticFillingImg from "@/assets/services/aesthetic-filling.jpg";
import oralHygieneImg from "@/assets/services/oral-hygiene.jpg";
import rootCanalImg from "@/assets/services/root-canal.jpg";
import toothExtractionImg from "@/assets/services/tooth-extraction.jpg";
import dentalImplantsImg from "@/assets/services/dental-implants.jpg";
import periodontologyImg from "@/assets/services/periodontology.jpg";
import dentalProstheticsImg from "@/assets/services/dental-prosthetics.jpg";
import alignersImg from "@/assets/services/aligners.jpg";
import teethWhiteningImg from "@/assets/services/teeth-whitening.jpg";

const servicesData: Record<string, {
  image: string;
  title: string;
  description: string;
  details: string[];
  benefits: string[];
}> = {
  "dantu-plombavimas": {
    image: toothFillingImg,
    title: "Dantų plombavimas",
    description: "Dantų plombavimas – viena dažniausių odontologijos procedūrų, skirta atkurti dantį, pažeistą ėduonies ar traumos. Mūsų klinikoje naudojame aukščiausios kokybės kompozitinius materijalus, kurie užtikrina ilgaamžiškumą ir natūralią išvaizdą.",
    details: [
      "Procedūra pradedama nuodugniu danties apžiūrėjimu ir rentgeno nuotrauka, kad būtų tiksliai nustatyta pažeidimo apimtis.",
      "Pašalinama pažeista danties dalis, o susidariusi ertmė kruopščiai išvaloma ir paruošiama plombavimui.",
      "Plomba formuojama sluoksniais, kiekvienas sluoksnis kietinamas specialia lempa.",
      "Procedūra baigiama plombos poliravimas ir kandžio koregavimu, užtikrinant komfortą ir natūralų jausmą."
    ],
    benefits: [
      "Ilgaamžiai kompozitiniai materialai",
      "Natūrali spalva, pritaikyta prie Jūsų dantų",
      "Neskausminga procedūra su vietine anestezija",
      "Greitas gijimas ir minimalus diskomfortas"
    ]
  },
  "estetinis-plombavimas": {
    image: aestheticFillingImg,
    title: "Estetinis dantų plombavimas",
    description: "Estetinis dantų plombavimas – tai aukščiausio lygio restauracijos procedūra, skirta ne tik atkurti danties funkciją, bet ir jo natūralią grožį. Ši paslauga ideali priekiniams dantims ir visiems, kurie nori nepriekaištingo rezultato.",
    details: [
      "Naudojame kelių atspalvių kompozitus, kad plomba būtų neatskiriama nuo natūralaus danties.",
      "Spalva parenkama pagal Jūsų dantų atspalvį, atsižvelgiant į šviesą ir skaidrumą.",
      "Danties forma ir tekstūra atkuriama rankiniu būdu, siekiant natūralumo.",
      "Galutinis rezultatas – tobula šypsena be matomų plombų."
    ],
    benefits: [
      "Nematoma plomba, susiliejanti su dantimi",
      "Idealu priekiniams dantims",
      "Aukščiausios kokybės estetiniai materialai",
      "Ilgalaikis ir patikimas rezultatas"
    ]
  },
  "burnos-higiena": {
    image: oralHygieneImg,
    title: "Profesionalioji burnos higiena",
    description: "Profesionalioji burnos higiena – būtina procedūra, padedanti išvengti dantenų ligų, ėduonies ir blogo burnos kvapo. Rekomenduojame ją atlikti kas 6 mėnesius, kad Jūsų dantys ir dantenos išliktų sveiki.",
    details: [
      "Apnašų ir akmenų šalinimas ultragarsu ir rankiniais instrumentais.",
      "Dantų poliravimas specialia pasta, suteikiančia švelnumą ir blizgesį.",
      "Dantenų būklės įvertinimas ir rekomendacijos namų priežiūrai.",
      "Fluoridavimas, stiprinantis dantų emalę ir apsaugantis nuo ėduonies."
    ],
    benefits: [
      "Švaresni ir baltesni dantys",
      "Sveikesnės dantenos",
      "Gaivesnis burnos kvapas",
      "Ėduonies ir dantenų ligų prevencija"
    ]
  },
  "saknu-kanalu-gydymas": {
    image: rootCanalImg,
    title: "Dantų šaknų kanalų gydymas",
    description: "Šaknų kanalų gydymas (endodontija) – procedūra, skirta išsaugoti dantį, kai infekcija pasiekia danties šerdį (pulpą). Ši procedūra leidžia išvengti danties šalinimo ir išsaugoti natūralų dantį.",
    details: [
      "Rentgeno nuotrauka padeda nustatyti kanalų skaičių ir formą.",
      "Pašalinama užkrėsta pulpa ir kanalai kruopščiai išvalomi.",
      "Kanalai dezinfekuojami ir užpildomi specialia medžiaga.",
      "Dantis atkuriamas plomba arba vainiku, apsaugančiu nuo lūžimo."
    ],
    benefits: [
      "Išsaugomas natūralus dantis",
      "Pašalinama infekcija ir skausmas",
      "Moderni, neskausminga procedūra",
      "Ilgalaikis rezultatas su tinkama priežiūra"
    ]
  },
  "dantu-salinimas": {
    image: toothExtractionImg,
    title: "Dantų šalinimas",
    description: "Dantų šalinimas atliekamas tada, kai danties neįmanoma išsaugoti kitais gydymo metodais. Mūsų klinikoje šią procedūrą atliekame kuo švelniau ir saugiau, užtikrinant minimalų diskomfortą.",
    details: [
      "Prieš procedūrą atliekama išsami diagnostika ir rentgenas.",
      "Taikoma efektyvi vietinė anestezija, kad procedūra būtų neskausminga.",
      "Dantis šalinamas naudojant modernias, atraumatines technikas.",
      "Pateikiamos išsamios gijimo ir priežiūros rekomendacijos."
    ],
    benefits: [
      "Saugi ir neskausminga procedūra",
      "Greitas gijimas",
      "Galimybė planuoti danties atkūrimą (implantą)",
      "Profesionali poprocedūrinė priežiūra"
    ]
  },
  "dantu-implantacija": {
    image: dentalImplantsImg,
    title: "Dantų implantacija",
    description: "Dantų implantai – moderniausias ir ilgalaikiškiausias sprendimas prarastiems dantims atkurti. Implantas yra titaninis varžtas, įsukamas į žandikaulio kaulą, ant kurio vėliau tvirtinamas dantis.",
    details: [
      "Atliekama išsami diagnostika su 3D rentgenu implanto vietos planavimui.",
      "Implantas įsodinamas į kaulą naudojant šiuolaikines chirurgines technikas.",
      "Po integracijos periodo (3-6 mėn.) ant implanto tvirtinamas vainikėlis.",
      "Galutinis rezultatas – natūraliai atrodantis ir pilnai funkcionalus dantis."
    ],
    benefits: [
      "Ilgalaikis sprendimas (dešimtmečiams)",
      "Natūralus jausmas ir išvaizda",
      "Nepažeidžia gretimų dantų",
      "Atkuria pilną kramtymo funkciją"
    ]
  },
  "periodontologija": {
    image: periodontologyImg,
    title: "Periodontologija",
    description: "Periodontologija – tai odontologijos sritis, užsiimanti dantenų ir kaulų, laikančių dantis, ligų gydymu. Dantenų ligos yra pagrindinė suaugusiųjų dantų praradimo priežastis, todėl svarbu jas laiku diagnozuoti ir gydyti.",
    details: [
      "Atliekamas išsamus dantenų ir kaulų būklės įvertinimas.",
      "Giluminis dantenų kišenių valymas (kiuretažas).",
      "Antibakterinis gydymas ir dantenų atstatymas.",
      "Reguliarus stebėjimas ir palaikomasis gydymas."
    ],
    benefits: [
      "Sustabdomas dantenų ligų progresavimas",
      "Išsaugomi dantys",
      "Sveikesnės dantenos ir kaulas",
      "Prevencija nuo pakartotinių problemų"
    ]
  },
  "dantu-protezavimas": {
    image: dentalProstheticsImg,
    title: "Dantų protezavimas",
    description: "Dantų protezavimas – tai dantų atkūrimo būdas naudojant nuimamus arba fiksuotus protezus. Ši paslauga skirta tiems, kurie prarado vieną ar kelis dantis ir nori atkurti šypsenos estetiką bei kramtymo funkciją.",
    details: [
      "Konsultacija ir individualus gydymo plano sudarymas.",
      "Dantų atspaudų paėmimas ir protezo gamyba laboratorijoje.",
      "Protezo pritaikymas ir koregavimas pagal Jūsų poreikius.",
      "Mokymas, kaip tinkamai prižiūrėti protezą."
    ],
    benefits: [
      "Atkuriama šypsenos estetika",
      "Pilna kramtymo funkcija",
      "Komfortiškas ir patikimas sprendimas",
      "Įvairūs protezų tipai pagal poreikius"
    ]
  },
  "dantu-tiesinimas-kapomis": {
    image: alignersImg,
    title: "Dantų tiesinimas kapomis",
    description: "Dantų tiesinimas nematomomis kapomis – moderni ortodontijos alternatyva tradiciniams breketams. Skaidrios kapos yra beveik nematomos ir leidžia ištiesinti dantis komfortiškai bei diskretiškai.",
    details: [
      "3D skenavimas ir individualus gydymo plano sudarymas.",
      "Pagaminamos individualios kapos, keičiamos kas 1-2 savaites.",
      "Kapas galima išsiimti valant dantis ir valgant.",
      "Reguliarūs vizitai stebėti gydymo eigą."
    ],
    benefits: [
      "Beveik nematomos kapos",
      "Komfortiškas nešiojimas",
      "Galima išsiimti bet kada",
      "Prognozuojamas rezultatas"
    ]
  },
  "dantu-balinimas": {
    image: teethWhiteningImg,
    title: "Dantų balinimas",
    description: "Profesionalus dantų balinimas – efektyvus būdas pašviesinti dantų spalvą keliomis toninėmis. Ši procedūra saugi ir atliekama prižiūrint odontologui, užtikrinant geriausią rezultatą.",
    details: [
      "Prieš balinimą atliekama profesionali burnos higiena.",
      "Ant dantų tepamas specialus balinimo gelis.",
      "Gelis aktyvuojamas specialia lempa.",
      "Per vieną seansą dantys pašviesėja iki 8 tonų."
    ],
    benefits: [
      "Ryškiai baltesni dantys",
      "Greitas rezultatas per vieną vizitą",
      "Saugi procedūra su specialisto priežiūra",
      "Ilgai išliekantis efektas"
    ]
  },
  "vaiku-odontologija": {
    image: alignersImg,
    title: "Vaikų odontologija",
    description: "Rūpinamės pačių mažiausių pacientų šypsenomis. Mūsų tikslas – užtikrinti, kad vizitas pas odontologą vaikui būtų maloni ir neskausminga patirtis, padedanti pamatus visą gyvenimą trunkančiai burnos sveikatai.",
    details: [
      "Pažintis su klinika ir gydytoju žaidimo forma, siekiant sukurti pasitikėjimą.",
      "Kruopšti pieninių ir nuolatinių dantų apžiūra bei diagnostika.",
      "Pieninių dantų gydymas ir plombavimas naudojant saugias medžiagas.",
      "Profilaktinės procedūros: dantų padengimas silantais ir fluoro lakais."
    ],
    benefits: [
      "Draugiška ir jauki aplinka vaikams",
      "Neskausmingas ir greitas gydymas",
      "Ankstyvoji ėduonies prevencija",
      "Edukacija apie burnos higieną nuo mažens"
    ]
  },
  "kitos-paslaugos": {
    image: aestheticFillingImg,
    title: "Kitos paslaugos",
    description: "Teikiame platų papildomų odontologinių paslaugų spektrą, užtikrinantį visapusišką Jūsų burnos sveikatos priežiūrą ir tikslią diagnostiką.",
    details: [
      "Dentalinės ir panoraminės rentgeno nuotraukos tiksliai diagnostikai.",
      "Išsamios specialistų konsultacijos ir gydymo plano sudarymas.",
      "Skubioji pagalba esant aštriam dantų skausmui.",
      "Profilaktiniai patikrinimai ir individualios rekomendacijos."
    ],
    benefits: [
      "Moderni diagnostinė įranga",
      "Visos paslaugos vienoje vietoje",
      "Greitas reagavimas į skubius atvejus",
      "Individualiai pritaikyti sprendimai"
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Paslauga nerasta
          </h1>
          <Button variant="dental" asChild>
            <Link to="/#paslaugos">Grįžti į paslaugas</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-28 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Link 
            to="/#paslaugos" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Grįžti į paslaugas
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-dental">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {service.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Benefits */}
              <div className="bg-primary/5 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">Privalumai:</h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="dental" size="xl" asChild>
                <a href="/#rezervacija">Užsisakyti vizitą</a>
              </Button>
            </div>
          </div>

          {/* Details section */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              Kaip vyksta procedūra?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.details.map((detail, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card flex gap-4"
                >
                  <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServiceDetail;
