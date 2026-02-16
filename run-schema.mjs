import pg from 'pg';
const { Client } = pg;

// Get password from command line argument
const dbPassword = process.argv[2];
if (!dbPassword) {
    console.error('Usage: node run-schema.mjs <database_password>');
    process.exit(1);
}

const client = new Client({
    connectionString: `postgresql://postgres:${dbPassword}@db.htgtprsryqfxswwbfzgd.supabase.co:5432/postgres`,
    ssl: { rejectUnauthorized: false }
});
const schema = `
create table if not exists content (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  type text not null default 'text',
  value jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table content enable row level security;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Content Access' AND tablename = 'content') THEN
    CREATE POLICY "Public Content Access" ON content FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin Content Access' AND tablename = 'content') THEN
    CREATE POLICY "Admin Content Access" ON content FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;
`;

async function run() {
    console.log('Connecting to database...');
    try {
        await client.connect();
        console.log('Connected! Running schema...');
        await client.query(schema);
        console.log('Schema created successfully!');

        // Now seed data
        console.log('Seeding data...');
        const seedData = [
            {
                slug: 'home.hero',
                type: 'json',
                value: JSON.stringify({
                    title: "Mes padėsime Jums šypsotis",
                    subtitle: "AZADENT – atidumas ir profesionalumas.",
                    address: "Konstitucijos pr. 13, Vilnius",
                    phone: "+370 677 77066",
                    rating: "4.9"
                })
            },
            {
                slug: 'home.services',
                type: 'json',
                value: JSON.stringify([
                    { title: "Dantų plombavimas", description: "Profesionalus ėduonies gydymas ir dantų restauracija naudojant aukščiausios kokybės medžiagas.", image: "", slug: "dantu-plombavimas" },
                    { title: "Estetinis plombavimas", description: "Natūraliai atrodantys sprendimai, atitinkantys Jūsų dantų spalvą ir formą.", image: "", slug: "estetinis-plombavimas" },
                    { title: "Burnos higiena", description: "Profesionali burnos priežiūra ir akmens valymas sveikai šypsenai užtikrinti.", image: "", slug: "burnos-higiena" },
                    { title: "Šaknų kanalų gydymas", description: "Efektyvus endodontinis gydymas išsaugant natūralų dantį neskausmingai.", image: "", slug: "saknu-kanalu-gydymas" },
                    { title: "Dantų šalinimas", description: "Neskausmingas dantų pašalinimas esant būtinybei su profesionalia priežiūra.", image: "", slug: "dantu-salinimas" },
                    { title: "Dantų implantacija", description: "Modernūs implantai prarastiems dantims atkurti – ilgalaikis ir patikimas sprendimas.", image: "", slug: "dantu-implantacija" }
                ])
            },
            {
                slug: 'home.doctors',
                type: 'json',
                value: JSON.stringify([
                    { name: "Ernestas Balsiukas", role: "Gydytojas odontologas", experience: "12+ metų patirtis", specialties: ["Implantologija", "Chirurgija", "Protezavimas"], description: "Ernestas yra patyręs odontologas chirurgas, specializuojantis dantų implantacijoje ir protezavime.", image: "" },
                    { name: "Gema Jautakienė", role: "Burnos higienistė", experience: "Ilgametė patirtis", specialties: ["Burnos higiena", "Dantų balinimas", "Profilaktika"], description: "Profesionali burnos higienistė, kuri pasirūpins Jūsų dantų švara ir sveikata.", image: "" }
                ])
            }
        ];

        for (const item of seedData) {
            await client.query(
                'INSERT INTO content (slug, type, value) VALUES ($1, $2, $3) ON CONFLICT (slug) DO UPDATE SET value = $3, updated_at = now()',
                [item.slug, item.type, item.value]
            );
            console.log('Seeded: ' + item.slug);
        }

        console.log('All done! Database is ready.');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

run();
