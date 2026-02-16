import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const SetupPage = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState(localStorage.getItem('sb_url') || "");
    const [key, setKey] = useState(localStorage.getItem('sb_key') || "");
    const [seeding, setSeeding] = useState(false);

    const handleSave = () => {
        if (!url || !key) {
            toast.error("Prašome įvesti abu laukus");
            return;
        }
        localStorage.setItem('sb_url', url);
        localStorage.setItem('sb_key', key);
        toast.success("Nustatymai išsaugoti! Perkraunama...");
        setTimeout(() => window.location.reload(), 1000);
    };

    const handleClear = () => {
        localStorage.removeItem('sb_url');
        localStorage.removeItem('sb_key');
        setUrl("");
        setKey("");
        toast.info("Nustatymai išvalyti");
        setTimeout(() => window.location.reload(), 1000);
    };

    const runSeed = async () => {
        if (!supabase) {
            toast.error("Pirmiausia išsaugokite nustatymus!");
            return;
        }

        setSeeding(true);
        try {
            // Define initial content here to avoid external dependency issues
            const initialContent = [
                // 1. HERO SECTION
                {
                    slug: 'home.hero',
                    value: {
                        title: "Mes padėsime Jums šypsotis",
                        subtitle: "AZADENT – atidumas ir profesionalumas.",
                        address: "Konstitucijos pr. 13, Vilnius",
                        phone: "+370 677 77066",
                        rating: "4.9"
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

            // 1. Check/Install Bucket if possible via simple insert attempt (likely fails due to permissions but worth a try if policy is open)
            // Skip storage bucket creation as it requires SQL usually.

            // 2. Insert Content
            for (const item of initialContent) {
                const { error } = await supabase
                    .from('content')
                    .upsert(item, { onConflict: 'slug' });
                if (error) throw error;
            }

            toast.success("Duomenys sėkmingai įrašyti!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast.error("Klaida įrašant duomenis: " + (error.message || "Unknown error"));
            toast.info("Įsitikinkite, kad paleidote 'supabase_setup.sql' savo Supabase Dashboard!");
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sistemos konfigūracija</CardTitle>
                    <CardDescription>
                        Įveskite Supabase prisijungimo duomenis, kad sujungtumėte svetainę su TVS.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project URL</label>
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://your-project.supabase.co"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Anon Public Key</label>
                        <Input
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            type="password"
                            placeholder="eyJh..."
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={handleSave} className="flex-1">
                            Išsaugoti ir Prisijungti
                        </Button>
                        {localStorage.getItem('sb_url') && (
                            <Button variant="outline" onClick={handleClear}>
                                Išvalyti
                            </Button>
                        )}
                    </div>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Veiksmai
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="secondary"
                        onClick={runSeed}
                        disabled={seeding || !supabase}
                        className="w-full"
                    >
                        {seeding ? "Vykdoma..." : "Užpildyti duomenų bazę (Seed)"}
                    </Button>

                    <Button variant="link" onClick={() => navigate("/admin/dashboard")} className="w-full">
                        Grįžti į Admin Panelę
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SetupPage;
