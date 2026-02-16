import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://htgtprsryqfxswwbfzgd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Z3RwcnNyeXFmeHN3d2JmemdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTI1MzI0NCwiZXhwIjoyMDg2ODI5MjQ0fQ.XDEqf4HMYRWTEtWXCRQz-1WFBUXy2eW6WVP_7SPd46E'
);

const seedData = [
    {
        slug: 'home.hero',
        type: 'json',
        value: {
            title: "Mes padėsime Jums šypsotis",
            subtitle: "AZADENT – atidumas ir profesionalumas.",
            address: "Konstitucijos pr. 13, Vilnius",
            phone: "+370 677 77066",
            rating: "4.9"
        }
    },
    {
        slug: 'home.services',
        type: 'json',
        value: [
            {
                title: "Dantų plombavimas",
                description: "Profesionalus ėduonies gydymas ir dantų restauracija naudojant aukščiausios kokybės medžiagas.",
                image: "",
                slug: "dantu-plombavimas"
            },
            {
                title: "Estetinis plombavimas",
                description: "Natūraliai atrodantys sprendimai, atitinkantys Jūsų dantų spalvą ir formą.",
                image: "",
                slug: "estetinis-plombavimas"
            },
            {
                title: "Burnos higiena",
                description: "Profesionali burnos priežiūra ir akmens valymas sveikai šypsenai užtikrinti.",
                image: "",
                slug: "burnos-higiena"
            },
            {
                title: "Šaknų kanalų gydymas",
                description: "Efektyvus endodontinis gydymas išsaugant natūralų dantį neskausmingai.",
                image: "",
                slug: "saknu-kanalu-gydymas"
            },
            {
                title: "Dantų šalinimas",
                description: "Neskausmingas dantų pašalinimas esant būtinybei su profesionalia priežiūra.",
                image: "",
                slug: "dantu-salinimas"
            },
            {
                title: "Dantų implantacija",
                description: "Modernūs implantai prarastiems dantims atkurti – ilgalaikis ir patikimas sprendimas.",
                image: "",
                slug: "dantu-implantacija"
            }
        ]
    },
    {
        slug: 'home.doctors',
        type: 'json',
        value: [
            {
                name: "Ernestas Balsiukas",
                role: "Gydytojas odontologas",
                experience: "12+ metų patirtis",
                specialties: ["Implantologija", "Chirurgija", "Protezavimas"],
                description: "Ernestas yra patyręs odontologas chirurgas, specializuojantis dantų implantacijoje ir protezavime.",
                image: ""
            },
            {
                name: "Gema Jautakienė",
                role: "Burnos higienistė",
                experience: "Ilgametė patirtis",
                specialties: ["Burnos higiena", "Dantų balinimas", "Profilaktika"],
                description: "Profesionali burnos higienistė, kuri pasirūpins Jūsų dantų švara ir sveikata.",
                image: ""
            }
        ]
    }
];

async function run() {
    console.log('Seeding data...');

    for (const item of seedData) {
        const { data, error } = await supabase
            .from('content')
            .upsert(item, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`Error for ${item.slug}:`, error.message);
        } else {
            console.log(`OK: ${item.slug}`);
        }
    }

    console.log('Done!');
}

run();
