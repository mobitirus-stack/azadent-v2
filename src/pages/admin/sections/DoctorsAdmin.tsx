import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Trash2, Edit2, Image as ImageIcon, X } from "lucide-react";
import { useLocalContent, fileToBase64 } from "@/hooks/useLocalContent";

interface DoctorItem {
    name: string;
    role: string;
    experience: string;
    specialties: string[];
    description: string;
    image: string;
}

const defaultDoctors: DoctorItem[] = [
    {
        name: "Ernestas Balsiukas",
        role: "Gydytojas odontologas",
        experience: "20+ metų patirtis",
        specialties: ["Estetinis dantų plombavimas", "Dantų šaknų kanalų gydymas", "Dantų kariesų plombavimas", "Dantų balinimas"],
        description: "Ernestas daugiau nei 20 metų specializuojasi estetinio plombavimo srityje, nudilusių dantų ar dantų spalvos atstatymo srityse.",
        image: "",
    },
    {
        name: "Gema Jautakienė",
        role: "Burnos higienistė",
        experience: "15+ metų patirtis",
        specialties: ["Burnos higiena", "Burnos ertmės priežiūra"],
        description: "Gema yra burnos higienistė, atliekanti profesionalią burnos ertmės higieną, akmenų, apnašų šalinimą, dantų poliravimą.",
        image: "",
    },
];

const emptyDoctor: DoctorItem = { name: "", role: "", experience: "", specialties: [], description: "", image: "" };

const DoctorsAdmin = () => {
    const { data: doctors, setData: setDoctors, save } = useLocalContent<DoctorItem[]>("admin.doctors", defaultDoctors);
    const [editItem, setEditItem] = useState<DoctorItem>(emptyDoctor);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);
    const [specialtyInput, setSpecialtyInput] = useState("");

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setEditItem({ ...editItem, image: base64 });
        }
    };

    const handleEdit = (index: number) => {
        setEditItem({ ...doctors[index] });
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        if (confirm("Ar tikrai norite ištrinti?")) {
            const newDoctors = doctors.filter((_, i) => i !== index);
            setDoctors(newDoctors);
            save(newDoctors);
        }
    };

    const addSpecialty = () => {
        if (specialtyInput.trim()) {
            setEditItem({ ...editItem, specialties: [...editItem.specialties, specialtyInput.trim()] });
            setSpecialtyInput("");
        }
    };

    const removeSpecialty = (index: number) => {
        setEditItem({ ...editItem, specialties: editItem.specialties.filter((_, i) => i !== index) });
    };

    const handleSave = () => {
        if (!editItem.name.trim()) return;
        setSaving(true);

        let newDoctors: DoctorItem[];
        if (editIndex !== null) {
            newDoctors = doctors.map((d, i) => (i === editIndex ? editItem : d));
        } else {
            newDoctors = [...doctors, editItem];
        }

        setDoctors(newDoctors);
        save(newDoctors);
        setEditItem(emptyDoctor);
        setEditIndex(null);
        setSaving(false);
    };

    const handleCancel = () => {
        setEditItem(emptyDoctor);
        setEditIndex(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">👨‍⚕️ Gydytojų Valdymas</h2>
                <p className="text-sm text-gray-500 mt-1">Pridėkite, redaguokite arba ištrinkite gydytojus</p>
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
                                <label className="text-sm font-medium text-gray-700">Vardas Pavardė</label>
                                <Input
                                    value={editItem.name}
                                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                    placeholder="Pvz.: Jonas Jonaitis"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Pareigos</label>
                                <Input
                                    value={editItem.role}
                                    onChange={(e) => setEditItem({ ...editItem, role: e.target.value })}
                                    placeholder="Pvz.: Gydytojas odontologas"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Patirtis</label>
                                <Input
                                    value={editItem.experience}
                                    onChange={(e) => setEditItem({ ...editItem, experience: e.target.value })}
                                    placeholder="Pvz.: 10+ metų patirtis"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Specializacijos</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={specialtyInput}
                                        onChange={(e) => setSpecialtyInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                                        placeholder="Pridėti specializaciją..."
                                    />
                                    <Button type="button" variant="outline" size="sm" onClick={addSpecialty}>
                                        +
                                    </Button>
                                </div>
                                {editItem.specialties.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {editItem.specialties.map((spec, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                                            >
                                                {spec}
                                                <button onClick={() => removeSpecialty(idx)} className="hover:text-red-500">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Aprašymas</label>
                                <Textarea
                                    value={editItem.description}
                                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                                    placeholder="Gydytojo aprašymas..."
                                    rows={4}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Nuotrauka
                                </label>
                                {editItem.image && (
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border bg-gray-100 mx-auto">
                                        <img src={editItem.image} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setEditItem({ ...editItem, image: "" })}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                            <div className="pt-3 border-t">
                                <Button
                                    onClick={handleSave}
                                    disabled={saving || !editItem.name.trim()}
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
                            <CardTitle className="text-base">👥 Gydytojų Sąrašas ({doctors.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {doctors.length === 0 ? (
                                <p className="text-sm text-gray-400 italic py-8 text-center">Nėra gydytojų. Pridėkite naują.</p>
                            ) : (
                                <div className="space-y-3">
                                    {doctors.map((doctor, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${editIndex === index ? "border-blue-400 bg-blue-50/50 ring-1 ring-blue-200" : "bg-white hover:bg-gray-50"}`}
                                        >
                                            {doctor.image ? (
                                                <img src={doctor.image} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-blue-600 font-bold text-sm">
                                                        {doctor.name.split(" ").map(n => n[0]).join("")}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-gray-800">{doctor.name}</p>
                                                <p className="text-xs text-gray-500">{doctor.role}</p>
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

export default DoctorsAdmin;
