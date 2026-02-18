import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Plus, Trash2, Edit2, Image as ImageIcon, X } from "lucide-react";
import { useLocalContent, fileToBase64 } from "@/hooks/useLocalContent";

interface ServiceItem {
    title: string;
    description: string;
    image: string;
    slug: string;
}

const defaultServices: ServiceItem[] = [
    {
        title: "Dantų plombavimas",
        description: "Dantų plombavimas – viena dažniausiu odontologijos procedūrų, skirta atkurti dantį.",
        image: "",
        slug: "dantu-plombavimas",
    },
    {
        title: "Estetinis plombavimas",
        description: "Estetinis dantų plombavimas – tai procesas, kai atkuriamos nudilusiu dantų struktūros.",
        image: "",
        slug: "estetinis-plombavimas",
    },
    {
        title: "Burnos higiena",
        description: "Svarbi profilaktinė procedūra, padedanti išvengti dantenų uždegimo ir ėduonies.",
        image: "",
        slug: "burnos-higiena",
    },
    {
        title: "Šaknų kanalų gydymas",
        description: "Dantų šaknų kanalų gydymas – odontologinė procedūra, taikoma tuomet, kai infekcija pasiekia pulpą.",
        image: "",
        slug: "saknu-kanalu-gydymas",
    },
    {
        title: "Dantų šalinimas",
        description: "Dantų šalinimas atliekamas tuomet, kai danties nebeįmanoma išsaugoti kitais gydymo metodais.",
        image: "",
        slug: "dantu-salinimas",
    },
    {
        title: "Dantų balinimas",
        description: "Profesionalus dantų balinimas – efektyvus būdas pašviesinti dantų spalvą.",
        image: "",
        slug: "dantu-balinimas",
    },
    {
        title: "Vaikų odontologija",
        description: "Rūpinamės mažųjų pacientų dantų sveikata – nuo profilaktikos iki pieninių dantų gydymo.",
        image: "",
        slug: "vaiku-odontologija",
    },
    {
        title: "Kitos paslaugos",
        description: "Dentalinės ir panoraminės rentgeno nuotraukos, konsultacijos ir kitos paslaugos.",
        image: "",
        slug: "kitos-paslaugos",
    },
];

const emptyService: ServiceItem = { title: "", description: "", image: "", slug: "" };

const ServicesAdmin = () => {
    const { data: services, setData: setServices, save } = useLocalContent<ServiceItem[]>("admin.services", defaultServices);
    const [editItem, setEditItem] = useState<ServiceItem>(emptyService);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setEditItem({ ...editItem, image: base64 });
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[ąčęėįšųūž]/g, (c) => {
                const map: Record<string, string> = { ą: "a", č: "c", ę: "e", ė: "e", į: "i", š: "s", ų: "u", ū: "u", ž: "z" };
                return map[c] || c;
            })
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    };

    const handleEdit = (index: number) => {
        setEditItem({ ...services[index] });
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        if (confirm("Ar tikrai norite ištrinti?")) {
            const newServices = services.filter((_, i) => i !== index);
            setServices(newServices);
            save(newServices);
        }
    };

    const handleSave = () => {
        if (!editItem.title.trim()) return;

        setSaving(true);
        const item = {
            ...editItem,
            slug: editItem.slug || generateSlug(editItem.title),
        };

        let newServices: ServiceItem[];
        if (editIndex !== null) {
            newServices = services.map((s, i) => (i === editIndex ? item : s));
        } else {
            newServices = [...services, item];
        }

        setServices(newServices);
        save(newServices);
        setEditItem(emptyService);
        setEditIndex(null);
        setSaving(false);
    };

    const handleCancel = () => {
        setEditItem(emptyService);
        setEditIndex(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">🦷 Paslaugų Valdymas</h2>
                <p className="text-sm text-gray-500 mt-1">Pridėkite, redaguokite arba ištrinkite paslaugas</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="border-b bg-gray-50/80">
                            <CardTitle className="text-base flex items-center justify-between">
                                <span>{editIndex !== null ? "✏️ Redaguoti" : "➕ Pridėti naują"}</span>
                                {editIndex !== null && (
                                    <Button variant="ghost" size="sm" onClick={handleCancel}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Pavadinimas</label>
                                <Input
                                    value={editItem.title}
                                    onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                                    placeholder="Pvz.: Dantų plombavimas"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Aprašymas</label>
                                <Textarea
                                    value={editItem.description}
                                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                                    placeholder="Paslaugos aprašymas..."
                                    rows={4}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Slug (URL)</label>
                                <Input
                                    value={editItem.slug}
                                    onChange={(e) => setEditItem({ ...editItem, slug: e.target.value })}
                                    placeholder="Automatiškai generuojamas"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Nuotrauka
                                </label>
                                {editItem.image && (
                                    <div className="relative w-full h-32 rounded-lg overflow-hidden border bg-gray-100">
                                        <img src={editItem.image} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setEditItem({ ...editItem, image: "" })}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                                <p className="text-xs text-gray-400">Arba įveskite URL:</p>
                                <Input
                                    value={editItem.image}
                                    onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="pt-3 border-t">
                                <Button
                                    onClick={handleSave}
                                    disabled={saving || !editItem.title.trim()}
                                    className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {editIndex !== null ? "Atnaujinti" : "Pridėti"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: List */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader className="border-b bg-gray-50/80">
                            <CardTitle className="text-base">📋 Esamos paslaugos ({services.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {services.length === 0 ? (
                                <p className="text-sm text-gray-400 italic py-8 text-center">Nėra paslaugų. Pridėkite naują.</p>
                            ) : (
                                <div className="space-y-3">
                                    {services.map((service, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${editIndex === index ? "border-blue-400 bg-blue-50/50 ring-1 ring-blue-200" : "bg-white hover:bg-gray-50"}`}
                                        >
                                            {service.image ? (
                                                <img src={service.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-gray-800 truncate">{service.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{service.description}</p>
                                            </div>
                                            <div className="flex gap-1 flex-shrink-0">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleEdit(index)}
                                                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(index)}
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ServicesAdmin;
