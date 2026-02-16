import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Save, Loader2, Plus, Trash2, Edit2, Image as ImageIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// Types for our content
interface ContentItem {
    id: string;
    slug: string;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

// Helper to check if a string is a URL
const isUrl = (s: string) => typeof s === 'string' && (s.startsWith('http') || s.startsWith('/'));

// Helper to check if value looks like an image field
const isImageField = (key: string, val: any) =>
    key.toLowerCase().includes('image') ||
    key.toLowerCase().includes('photo') ||
    key.toLowerCase().includes('avatar') ||
    (typeof val === 'string' && val.match(/\.(jpg|jpeg|png|webp|gif)$/i));

// --- Recursive Content Editor Component ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContentFieldEditor = ({ label, value, onChange, onUpload }: { label: string, value: any, onChange: (val: any) => void, onUpload: (file: File) => Promise<string> }) => {

    // 1. Array Handler (Lists of things)
    if (Array.isArray(value)) {
        return (
            <div className="space-y-4 border rounded-lg p-4 bg-gray-50/50">
                <div className="flex justify-between items-center">
                    <h4 className="font-medium capitalize">{label} (Sąrašas)</h4>
                    <Button size="sm" variant="outline" onClick={() => {
                        // Create new item based on structure of first item, or empty object
                        const template = value.length > 0 ? JSON.parse(JSON.stringify(value[0])) : {};
                        // Clear string values in template
                        Object.keys(template).forEach(k => {
                            if (typeof template[k] === 'string') template[k] = "";
                            if (typeof template[k] === 'number') template[k] = 0;
                        });
                        onChange([...value, template]);
                    }}>
                        <Plus className="w-4 h-4 mr-2" /> Pridėti naują
                    </Button>
                </div>

                <div className="grid gap-3">
                    {value.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded border shadow-sm">
                            <div className="flex-1 truncate font-medium">
                                {/* Try to find a display name/title */}
                                {item.title || item.name || item.header || `Elementas ${idx + 1}`}
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="ghost"><Edit2 className="w-4 h-4" /></Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Redaguoti elementą</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        {Object.entries(item).map(([k, v]) => (
                                            <ContentFieldEditor
                                                key={k}
                                                label={k}
                                                value={v}
                                                onChange={(newVal) => {
                                                    const newArr = [...value];
                                                    newArr[idx] = { ...newArr[idx], [k]: newVal };
                                                    onChange(newArr);
                                                }}
                                                onUpload={onUpload}
                                            />
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button
                                size="sm"
                                variant="destructive"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                    if (confirm("Ar tikrai norite ištrinti?")) {
                                        onChange(value.filter((_, i) => i !== idx));
                                    }
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {value.length === 0 && <p className="text-sm text-muted-foreground italic">Sąrašas tuščias</p>}
                </div>
            </div>
        );
    }

    // 2. Object Handler (Nested objects)
    if (typeof value === 'object' && value !== null) {
        return (
            <div className="space-y-4 border rounded-lg p-4">
                <h4 className="font-medium capitalize mb-2 border-b pb-2">{label}</h4>
                {Object.entries(value).map(([k, v]) => (
                    <ContentFieldEditor
                        key={k}
                        label={k}
                        value={v}
                        onChange={(newVal) => onChange({ ...value, [k]: newVal })}
                        onUpload={onUpload}
                    />
                ))}
            </div>
        );
    }

    // 3. Image Handler
    if (isImageField(label, value)) {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium capitalize flex items-center gap-2">
                    {label.replace(/_/g, ' ')} <ImageIcon className="w-4 h-4 text-muted-foreground" />
                </label>
                <div className="flex gap-4 items-start">
                    {value && isUrl(value) && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border bg-gray-100 flex-shrink-0">
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex-1 space-y-2">
                        <Input
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="https://..."
                        />
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    try {
                                        const url = await onUpload(file);
                                        onChange(url);
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // 4. Long Text Handler
    if (label === 'description' || (typeof value === 'string' && value.length > 50)) {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium capitalize">{label.replace(/_/g, ' ')}</label>
                <Textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                />
            </div>
        );
    }

    // 5. Default Input Handler
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium capitalize">{label.replace(/_/g, ' ')}</label>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};


const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<ContentItem[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        checkAuth();
        fetchContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkAuth = async () => {
        if (!supabase) return; // Allow viewing in dev mode without Supabase connected for UI checking
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate("/admin");
        }
    };

    const fetchContent = async () => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .order('slug');

        if (error) {
            toast.error("Nepavyko gauti duomenų");
        } else {
            setContent(data || []);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        if (supabase) await supabase.auth.signOut();
        navigate("/admin");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateContentValue = (id: string, newValue: any) => {
        setContent(content.map(item =>
            item.id === id ? { ...item, value: newValue } : item
        ));
    };

    const saveContent = async (item: ContentItem) => {
        if (!supabase) {
            toast.error("Supabase neprisijungta");
            return;
        }
        setSaving(true);
        const { error } = await supabase
            .from('content')
            .upsert({
                id: item.id,
                slug: item.slug,
                type: item.type,
                value: item.value,
                updated_at: new Date().toISOString()
            });

        if (error) {
            toast.error("Klaida saugant");
        } else {
            toast.success("Išsaugota!");
        }
        setSaving(false);
    };

    const handleFileUpload = async (file: File): Promise<string> => {
        if (!supabase) throw new Error("No supabase client");

        const toastId = toast.loading("Keliamas failas...");
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('website-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('website-assets')
                .getPublicUrl(filePath);

            toast.success("Failas įkeltas!", { id: toastId });
            return publicUrl;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error("Įkėlimas nepavyko", { description: error.message, id: toastId });
            throw error;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Group content by section (e.g., "home.hero" -> "home")
    const sections = Array.from(new Set(content.map(c => c.slug.split('.')[0])));

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Azadent TVS</h1>
                    <div className="flex items-center gap-4">
                        {!supabase && <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded">Supabase neprisijungta (Demo mode)</span>}
                        <Button variant="ghost" onClick={() => navigate("/admin/setup")}>
                            Nustatymai
                        </Button>
                        <Button variant="outline" onClick={handleLogout} className="gap-2">
                            <LogOut className="w-4 h-4" /> Atsijungti
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {content.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            <p>Nerasta jokio turinio. Įsitikinkite, kad Supabase konfigūracija teisinga.</p>
                            <p className="text-sm mt-2">Patikrinkite .env failą.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Tabs defaultValue={sections[0] || "all"} className="w-full">
                        <TabsList className="mb-8 flex-wrap h-auto">
                            {sections.map(section => (
                                <TabsTrigger key={section} value={section} className="capitalize">
                                    {section}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {sections.map(section => (
                            <TabsContent key={section} value={section}>
                                <div className="grid gap-6">
                                    {content
                                        .filter(c => c.slug.startsWith(section))
                                        .map((item) => (
                                            <Card key={item.id}>
                                                <CardHeader className="pb-3 border-b bg-gray-50/50">
                                                    <div className="flex justify-between items-center">
                                                        <CardTitle className="text-lg font-medium">
                                                            {item.slug.split('.').slice(1).join('.').toUpperCase()}
                                                        </CardTitle>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => saveContent(item)}
                                                            disabled={saving}
                                                            className="gap-2"
                                                        >
                                                            <Save className="w-4 h-4" /> Saugoti
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-6">
                                                    <div className="space-y-6">
                                                        {Object.entries(item.value).map(([key, val]) => (
                                                            <ContentFieldEditor
                                                                key={key}
                                                                label={key}
                                                                value={val}
                                                                onChange={(newVal) => updateContentValue(item.id, { ...item.value, [key]: newVal })}
                                                                onUpload={handleFileUpload}
                                                            />
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
