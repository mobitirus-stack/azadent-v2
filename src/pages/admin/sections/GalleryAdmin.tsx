import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Trash2, Image as ImageIcon, X, Plus, EyeOff } from "lucide-react";
import { useLocalContent, fileToBase64 } from "@/hooks/useLocalContent";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Import same images as GalleryPage
import toothFillingImg from "@/assets/services/tooth-filling.jpg";
import aestheticFillingImg from "@/assets/services/aesthetic-filling.jpg";
import oralHygieneImg from "@/assets/services/oral-hygiene.jpg";
import rootCanalImg from "@/assets/services/root-canal-new.jpg";
import toothExtractionImg from "@/assets/services/tooth-extraction.jpg";
import dentalImplantsImg from "@/assets/services/dental-implants.jpg";
import teethWhiteningImg from "@/assets/services/teeth-whitening.jpg";
import klinika1Img from "@/assets/gallery/klinika-1.jpg";
import klinika2Img from "@/assets/gallery/klinika-2.jpg";
import rezultataiEstetinisImg from "@/assets/gallery/rezultatai-estetinis.jpg";
import rentgenasImg from "@/assets/gallery/rentgenas.jpg";

interface GalleryItem {
    src: string;
    alt: string;
    category: string;
}

const LOCAL_IMAGES: GalleryItem[] = [
    { src: toothFillingImg, alt: "Dantų plombavimas", category: "results" },
    { src: aestheticFillingImg, alt: "Estetinis plombavimas", category: "results" },
    { src: oralHygieneImg, alt: "Burnos higiena", category: "results" },
    { src: rootCanalImg, alt: "Šaknų kanalų gydymas", category: "results" },
    { src: toothExtractionImg, alt: "Dantų šalinimas", category: "results" },
    { src: dentalImplantsImg, alt: "Dantų implantacija", category: "results" },
    { src: teethWhiteningImg, alt: "Dantų balinimas", category: "results" },
    { src: klinika1Img, alt: "Klinika", category: "clinic" },
    { src: klinika2Img, alt: "Klinika", category: "clinic" },
    { src: rezultataiEstetinisImg, alt: "Estetinio plombavimo rezultatai", category: "results" },
    { src: rentgenasImg, alt: "Rentgeno nuotrauka", category: "clinic" },
];

const CATEGORIES = [
    { id: "results", name: "Rezultatai" },
    { id: "clinic", name: "Klinika" },
];

const GalleryAdmin = () => {
    const { data: adminImages, setData: setAdminImages, save: saveAdmin } = useLocalContent<GalleryItem[]>("admin.gallery", []);
    const { data: hiddenAlts, setData: setHiddenAlts, save: saveHidden } = useLocalContent<string[]>("admin.gallery.hidden", []);
    const [newItem, setNewItem] = useState<GalleryItem>({ src: "", alt: "", category: "results" });
    const [saving, setSaving] = useState(false);

    // Visible local images (not hidden)
    const visibleLocalImages = useMemo(
        () => LOCAL_IMAGES.filter(img => !hiddenAlts.includes(img.alt)),
        [hiddenAlts]
    );

    // All visible images: local + admin
    const allImages = useMemo(
        () => [...visibleLocalImages, ...adminImages],
        [visibleLocalImages, adminImages]
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setNewItem({ ...newItem, src: base64 });
        }
    };

    const handleAdd = () => {
        if (!newItem.src.trim() || !newItem.alt.trim()) return;
        setSaving(true);
        const updated = [...adminImages, newItem];
        setAdminImages(updated);
        saveAdmin(updated);
        setNewItem({ src: "", alt: "", category: "results" });
        setSaving(false);
    };

    const handleDeleteLocal = (alt: string) => {
        if (confirm(`Ar tikrai norite paslėpti nuotrauką "${alt}"?`)) {
            const updated = [...hiddenAlts, alt];
            setHiddenAlts(updated);
            saveHidden(updated);
        }
    };

    const handleDeleteAdmin = (index: number) => {
        if (confirm("Ar tikrai norite ištrinti šią nuotrauką?")) {
            const updated = adminImages.filter((_, i) => i !== index);
            setAdminImages(updated);
            saveAdmin(updated);
        }
    };

    const handleRestoreAll = () => {
        setHiddenAlts([]);
        saveHidden([]);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">🖼️ Galerijos Valdymas</h2>
                    <p className="text-sm text-gray-500 mt-1">Pridėkite, slėpkite arba ištrinkite galerijos nuotraukas</p>
                </div>
                {hiddenAlts.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleRestoreAll} className="gap-2">
                        <EyeOff className="w-4 h-4" />
                        Atstatyti paslėptas ({hiddenAlts.length})
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: Add Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="border-b bg-gray-50/80">
                            <CardTitle className="text-base">➕ Pridėti nuotrauką</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Nuotrauka
                                </label>
                                {newItem.src && (
                                    <div className="relative w-full h-40 rounded-lg overflow-hidden border bg-gray-100">
                                        <img src={newItem.src} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setNewItem({ ...newItem, src: "" })}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                                <p className="text-xs text-gray-400">Arba įveskite URL:</p>
                                <Input
                                    value={newItem.src}
                                    onChange={(e) => setNewItem({ ...newItem, src: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Aprašymas (alt)</label>
                                <Input
                                    value={newItem.alt}
                                    onChange={(e) => setNewItem({ ...newItem, alt: e.target.value })}
                                    placeholder="Pvz.: Estetinio plombavimo rezultatai"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Kategorija</label>
                                <Select
                                    value={newItem.category}
                                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Kategorija" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="pt-3 border-t">
                                <Button
                                    onClick={handleAdd}
                                    disabled={saving || !newItem.src.trim() || !newItem.alt.trim()}
                                    className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    Pridėti nuotrauką
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Gallery Grid */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader className="border-b bg-gray-50/80">
                            <CardTitle className="text-base">
                                🖼️ Visos nuotraukos ({allImages.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {allImages.length === 0 ? (
                                <p className="text-sm text-gray-400 italic py-8 text-center">
                                    Nėra nuotraukų. Pridėkite naują arba atstatykite paslėptas.
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {/* Local images */}
                                    {visibleLocalImages.map((image, index) => (
                                        <div key={`local-${index}`} className="relative group rounded-lg overflow-hidden border bg-gray-100 aspect-square">
                                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteLocal(image.alt)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                                    title="Paslėpti nuotrauką"
                                                >
                                                    <EyeOff className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                                                <p className="text-white text-xs truncate">{image.alt}</p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-white/60 text-[10px]">{CATEGORIES.find(c => c.id === image.category)?.name}</p>
                                                    <p className="text-blue-300 text-[10px]">📦 Esama</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Admin-added images */}
                                    {adminImages.map((image, index) => (
                                        <div key={`admin-${index}`} className="relative group rounded-lg overflow-hidden border bg-gray-100 aspect-square">
                                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteAdmin(index)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                                    title="Ištrinti nuotrauką"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                                                <p className="text-white text-xs truncate">{image.alt}</p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-white/60 text-[10px]">{CATEGORIES.find(c => c.id === image.category)?.name}</p>
                                                    <p className="text-green-300 text-[10px]">✨ Pridėta</p>
                                                </div>
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

export default GalleryAdmin;
