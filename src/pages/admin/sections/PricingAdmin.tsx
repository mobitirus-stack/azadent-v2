import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Trash2, Edit2, Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { useLocalContent } from "@/hooks/useLocalContent";

interface PriceItem {
    name: string;
    price: string;
}

interface PriceCategory {
    title: string;
    items: PriceItem[];
}

const defaultPricing: PriceCategory[] = [
    { title: "Konsultacija", items: [{ name: "Konsultacija", price: "15–25 €" }] },
    { title: "Dantų plombavimas", items: [{ name: "Dantų plombavimas", price: "60–100 €" }] },
    { title: "Estetinis plombavimas", items: [{ name: "Estetinis plombavimas (1 danties)", price: "170–250 €" }] },
    {
        title: "Vaikų odontologija",
        items: [
            { name: "Pieninių dantų plombavimas", price: "25–50 €" },
            { name: "Pieninių dantų gydymas (pulpos amputacija)", price: "20–40 €" },
            { name: "Pieninio danties rovimas", price: "20–40 €" },
            { name: "Silantai (vieno danties padengimas)", price: "15 €" },
        ],
    },
    {
        title: "Endodontija (dantų šaknų kanalų gydymas)",
        items: [
            { name: "Kanalo platinimas–formavimas", price: "50–70 €" },
            { name: "Kanalo plombavimas", price: "50–70 €" },
            { name: "Vaistų pakeitimas", price: "20–30 €" },
            { name: "Pirmoji pagalba (skaudant)", price: "50 €" },
        ],
    },
    { title: "Danties rovimas", items: [{ name: "Danties rovimas", price: "40–80 €" }] },
    {
        title: "Dantų balinimas",
        items: [
            { name: "Vieno žandikaulio kapa", price: "70 €" },
            { name: "Balinimo medžiaga (1 švirkštas)", price: "30 €" },
        ],
    },
    {
        title: "Profesionali higiena ir priežiūra",
        items: [
            { name: "Burnos ertmės higiena", price: "70–75 €" },
            { name: "Estetiškai plombuotų dantų poliravimas", price: "20–50 €" },
            { name: "Bruksizmo kapa", price: "120 €" },
        ],
    },
    {
        title: "Kitos paslaugos",
        items: [
            { name: "Dentalinė rentgeno nuotrauka", price: "10 €" },
            { name: "Panoraminė rentgeno nuotrauka", price: "25 €" },
        ],
    },
];

const PricingAdmin = () => {
    const { data: categories, setData: setCategories, save } = useLocalContent<PriceCategory[]>("admin.pricing", defaultPricing);
    const [editCatIndex, setEditCatIndex] = useState<number | null>(null);
    const [newCatTitle, setNewCatTitle] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");
    const [expandedCat, setExpandedCat] = useState<number | null>(0);
    const [saving, setSaving] = useState(false);

    // Category CRUD
    const addCategory = () => {
        if (!newCatTitle.trim()) return;
        const newCats = [...categories, { title: newCatTitle.trim(), items: [] }];
        setCategories(newCats);
        save(newCats);
        setNewCatTitle("");
    };

    const updateCategoryTitle = (index: number, title: string) => {
        const newCats = categories.map((c, i) => (i === index ? { ...c, title } : c));
        setCategories(newCats);
    };

    const deleteCategory = (index: number) => {
        if (confirm("Ar tikrai norite ištrinti šią kategoriją ir visus jos elementus?")) {
            const newCats = categories.filter((_, i) => i !== index);
            setCategories(newCats);
            save(newCats);
        }
    };

    // Item CRUD
    const addItem = (catIndex: number) => {
        if (!newItemName.trim() || !newItemPrice.trim()) return;
        const newCats = categories.map((cat, i) => {
            if (i === catIndex) {
                return { ...cat, items: [...cat.items, { name: newItemName.trim(), price: newItemPrice.trim() }] };
            }
            return cat;
        });
        setCategories(newCats);
        save(newCats);
        setNewItemName("");
        setNewItemPrice("");
    };

    const updateItem = (catIndex: number, itemIndex: number, field: "name" | "price", value: string) => {
        const newCats = categories.map((cat, ci) => {
            if (ci === catIndex) {
                return {
                    ...cat,
                    items: cat.items.map((item, ii) => (ii === itemIndex ? { ...item, [field]: value } : item)),
                };
            }
            return cat;
        });
        setCategories(newCats);
    };

    const deleteItem = (catIndex: number, itemIndex: number) => {
        const newCats = categories.map((cat, ci) => {
            if (ci === catIndex) {
                return { ...cat, items: cat.items.filter((_, ii) => ii !== itemIndex) };
            }
            return cat;
        });
        setCategories(newCats);
        save(newCats);
    };

    const handleSaveAll = () => {
        setSaving(true);
        save();
        setTimeout(() => setSaving(false), 300);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">💰 Kainų Valdymas</h2>
                    <p className="text-sm text-gray-500 mt-1">Pridėkite kategorijas ir paslaugų kainas</p>
                </div>
                <Button
                    onClick={handleSaveAll}
                    disabled={saving}
                    className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Išsaugoti viską
                </Button>
            </div>

            {/* Add new category */}
            <Card>
                <CardContent className="pt-5">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1 space-y-1">
                            <label className="text-sm font-medium text-gray-700">Naujos kategorijos pavadinimas</label>
                            <Input
                                value={newCatTitle}
                                onChange={(e) => setNewCatTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                                placeholder="Pvz.: Protezavimas"
                            />
                        </div>
                        <Button onClick={addCategory} disabled={!newCatTitle.trim()} className="gap-2">
                            <Plus className="w-4 h-4" /> Pridėti
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Categories list */}
            <div className="space-y-4">
                {categories.map((category, catIndex) => (
                    <Card key={catIndex} className="overflow-hidden">
                        <CardHeader
                            className="border-b bg-gray-50/80 cursor-pointer"
                            onClick={() => setExpandedCat(expandedCat === catIndex ? null : catIndex)}
                        >
                            <CardTitle className="text-base flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {expandedCat === catIndex ? (
                                        <ChevronUp className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    )}
                                    {editCatIndex === catIndex ? (
                                        <Input
                                            value={category.title}
                                            onChange={(e) => updateCategoryTitle(catIndex, e.target.value)}
                                            onBlur={() => setEditCatIndex(null)}
                                            onKeyDown={(e) => e.key === "Enter" && setEditCatIndex(null)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-8 w-64"
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{category.title}</span>
                                    )}
                                    <span className="text-xs text-gray-400 font-normal">({category.items.length})</span>
                                </div>
                                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditCatIndex(catIndex)}
                                        className="h-7 w-7 p-0 text-blue-600"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => deleteCategory(catIndex)}
                                        className="h-7 w-7 p-0 text-red-500"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>

                        {expandedCat === catIndex && (
                            <CardContent className="pt-4 space-y-3">
                                {/* Existing items */}
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                        <Input
                                            value={item.name}
                                            onChange={(e) => updateItem(catIndex, itemIndex, "name", e.target.value)}
                                            className="flex-1 h-8 text-sm"
                                        />
                                        <Input
                                            value={item.price}
                                            onChange={(e) => updateItem(catIndex, itemIndex, "price", e.target.value)}
                                            className="w-28 h-8 text-sm"
                                        />
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => deleteItem(catIndex, itemIndex)}
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                ))}

                                {/* Add new item */}
                                <div className="flex items-center gap-2 pt-3 border-t">
                                    <Input
                                        value={newItemName}
                                        onChange={(e) => setNewItemName(e.target.value)}
                                        placeholder="Paslaugos pavadinimas"
                                        className="flex-1 h-8 text-sm"
                                    />
                                    <Input
                                        value={newItemPrice}
                                        onChange={(e) => setNewItemPrice(e.target.value)}
                                        placeholder="Kaina"
                                        className="w-28 h-8 text-sm"
                                    />
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => addItem(catIndex)}
                                        disabled={!newItemName.trim() || !newItemPrice.trim()}
                                        className="h-8"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>

            {categories.length === 0 && (
                <p className="text-center text-gray-400 italic py-8">Nėra kainų kategorijų. Pridėkite naują aukščiau.</p>
            )}
        </div>
    );
};

export default PricingAdmin;
