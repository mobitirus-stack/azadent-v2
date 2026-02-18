import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, RotateCcw } from "lucide-react";
import { useLocalContent } from "@/hooks/useLocalContent";

interface HeroData {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    rating: string;
}

const defaultHeroData: HeroData = {
    title: "Mes padėsime Jums šypsotis",
    subtitle: "AZADENT – atidumas ir profesionalumas.",
    address: "Konstitucijos pr. 13, Vilnius",
    phone: "+370 677 77066",
    rating: "5.0",
};

const HeroAdmin = () => {
    const { data, setData, save, reset } = useLocalContent<HeroData>("admin.hero", defaultHeroData);
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            save();
            setSaving(false);
        }, 300);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">🏠 Hero Sekcija</h2>
                    <p className="text-sm text-gray-500 mt-1">Pagrindinio puslapio viršutinė dalis</p>
                </div>
                <Button variant="outline" size="sm" onClick={reset} className="gap-2 text-gray-500">
                    <RotateCcw className="w-4 h-4" /> Atstatyti
                </Button>
            </div>

            <Card>
                <CardHeader className="border-b bg-gray-50/80">
                    <CardTitle className="text-base">✏️ Redaguoti tekstą</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Pavadinimas</label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            placeholder="Mes padėsime Jums šypsotis"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Paantraštė</label>
                        <Input
                            value={data.subtitle}
                            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                            placeholder="AZADENT – atidumas ir profesionalumas."
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Adresas</label>
                            <Input
                                value={data.address}
                                onChange={(e) => setData({ ...data, address: e.target.value })}
                                placeholder="Konstitucijos pr. 13, Vilnius"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Telefonas</label>
                            <Input
                                value={data.phone}
                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                                placeholder="+370 677 77066"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Reitingas</label>
                        <Input
                            value={data.rating}
                            onChange={(e) => setData({ ...data, rating: e.target.value })}
                            placeholder="5.0"
                        />
                    </div>
                    <div className="pt-4 border-t">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Išsaugoti
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HeroAdmin;
