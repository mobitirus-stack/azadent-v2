import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Trash2, Image as ImageIcon, X, Plus } from "lucide-react";
import { useLocalContent, fileToBase64 } from "@/hooks/useLocalContent";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface GalleryItem {
    src: string;
    alt: string;
    category: string;
}

const defaultGallery: GalleryItem[] = [];

const CATEGORIES = [
    { id: "results", name: "Rezultatai" },
    { id: "clinic", name: "Klinika" },
];

const GalleryAdmin = () => {
    const { data: images, setData: setImages, save } = useLocalContent<GalleryItem[]>("admin.gallery", defaultGallery);
    const [newItem, setNewItem] = useState<GalleryItem>({ src: "", alt: "", category: "results" });
    const [saving, setSaving] = useState(false);

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
        const newImages = [...images, newItem];
        setImages(newImages);
        save(newImages);
        setNewItem({ src: "", alt: "", category: "results" });
        setSaving(false);
    };

    const handleDelete = (index: number) => {
        if (confirm("Ar tikrai norite ištrinti šią nuotrauką?")) {
            const newImages = images.filter((_, i) => i !== index);
            setImages(newImages);
            save(newImages);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">🖼️ Galerijos Valdymas</h2>
                <p className="text-sm text-gray-500 mt-1">Pridėkite arba ištrinkite galerijos nuotraukas</p>
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
                            <CardTitle className="text-base">🖼️ Galerija ({images.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {images.length === 0 ? (
                                <p className="text-sm text-gray-400 italic py-8 text-center">
                                    Nėra nuotraukų. Pridėkite naują.<br />
                                    <span className="text-xs">Pastaba: lokalios nuotraukos iš kodo rodys ir be admin pridėjimo.</span>
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative group rounded-lg overflow-hidden border bg-gray-100 aspect-square">
                                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(index)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                                                <p className="text-white text-xs truncate">{image.alt}</p>
                                                <p className="text-white/60 text-[10px]">{CATEGORIES.find(c => c.id === image.category)?.name}</p>
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
