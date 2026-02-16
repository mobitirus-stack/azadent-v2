import { createClient } from '@supabase/supabase-js';

// SETUP: Replace these with your actual URL and Key
const SUPABASE_URL = 'REPLACE_WITH_YOUR_URL';
const SUPABASE_KEY = 'REPLACE_WITH_YOUR_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const initialContent = [
    // 1. HERO SECTION
    {
        slug: 'home.hero',
        value: {
            title: "Mes padėsime Jums šypsotis",
            subtitle: "AZADENT – atidumas ir profesionalumas.",
            address: "Konstitucijos pr. 13, Vilnius",
            phone: "+370 677 77066",
            rating: "4.9",
            // experience removed as per request
        }
    },
    // 2. SERVICES SECTION
    {
        slug: 'home.services',
        value: [
            {
                title: "Dantų plombavimas",
                description: "Profesionalus ėduonies gydymas ir dantų restauracija naudojant aukščiausios kokybės medžiagas.",
                image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
                slug: "dantu-plombavimas"
            },
            {
                title: "Estetinis plombavimas",
                description: "Natūraliai atrodantys sprendimai, atitinkantys Jūsų dantų spalvą ir formą.",
                image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop",
                slug: "estetinis-plombavimas"
            },
            {
                title: "Burnos higiena",
                description: "Profesionali burnos priežiūra ir akmens valymas sveikai šypsenai užtikrinti.",
                image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop",
                slug: "burnos-higiena"
            },
            {
                title: "Šaknų kanalų gydymas",
                description: "Efektyvus endodontinis gydymas išsaugant natūralų dantį neskausmingai.",
                image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=800&auto=format&fit=crop",
                slug: "saknu-kanalu-gydymas"
            },
            {
                title: "Dantų šalinimas",
                description: "Neskausmingas dantų pašalinimas esant būtinybei su profesionalia priežiūra.",
                image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
                slug: "dantu-salinimas"
            },
            {
                title: "Dantų implantacija",
                description: "Modernūs implantai prarastiems dantims atkurti – ilgalaikis ir patikimas sprendimas.",
                image: "https://plus.unsplash.com/premium_photo-1661766569022-1b7f918ac3f3?q=80&w=800&auto=format&fit=crop",
                slug: "dantu-implantacija"
            }
        ]
    },
    // 3. DOCTORS SECTION
    {
        slug: 'home.doctors',
        value: [
            {
                name: "Ernestas Balsiukas",
                role: "Gydytojas odontologas",
                experience: "12+ metų patirtis",
                specialties: ["Implantologija", "Chirurgija", "Protezavimas"],
                description: "Ernestas yra patyręs odontologas chirurgas, specializuojantis dantų implantacijoje ir protezavime. Jo tikslumas ir profesionalumas užtikrina aukščiausią gydymo kokybę.",
                // Using placeholder or hosted image required
                image: ""
            },
            {
                name: "Gema Jautakienė",
                role: "Burnos higienistė",
                experience: "Ilgametė patirtis",
                specialties: ["Burnos higiena", "Dantų balinimas", "Profilaktika"],
                description: "Profesionali burnos higienistė, kuri pasirūpins Jūsų dantų švara ir sveikata. Kruopštumas ir dėmesingumas – jos darbo pagrindas.",
                image: ""
            }
        ]
    }
];

async function seed() {
    console.log("Seeding data...");
    for (const item of initialContent) {
        const { error } = await supabase
            .from('content')
            .upsert(item, { onConflict: 'slug' });

        if (error) console.error("Error inserting " + item.slug, error);
        else console.log("Success: " + item.slug);
    }
}

seed();
