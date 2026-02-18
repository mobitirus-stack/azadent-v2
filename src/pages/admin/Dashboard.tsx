import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home, Stethoscope, Users, DollarSign, ImageIcon, ArrowLeft } from "lucide-react";
import { isAdminLoggedIn, adminLogout } from "@/hooks/useLocalContent";

import HeroAdmin from "./sections/HeroAdmin";
import ServicesAdmin from "./sections/ServicesAdmin";
import DoctorsAdmin from "./sections/DoctorsAdmin";
import PricingAdmin from "./sections/PricingAdmin";
import GalleryAdmin from "./sections/GalleryAdmin";

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("hero");

    useEffect(() => {
        if (!isAdminLoggedIn()) {
            navigate("/admin");
        }
    }, [navigate]);

    const handleLogout = () => {
        adminLogout();
        navigate("/admin");
    };

    const tabs = [
        { id: "hero", label: "Hero", icon: Home },
        { id: "services", label: "Paslaugos", icon: Stethoscope },
        { id: "doctors", label: "Gydytojai", icon: Users },
        { id: "pricing", label: "Kainos", icon: DollarSign },
        { id: "gallery", label: "Galerija", icon: ImageIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-800">
                            ⚙️ Azadent <span className="text-primary">TVS</span>
                        </h1>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            Admin
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/")}
                            className="gap-2 text-gray-600"
                        >
                            <ArrowLeft className="w-4 h-4" /> Svetainė
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" /> Atsijungti
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-6 flex flex-wrap h-auto bg-white border shadow-sm p-1 rounded-xl gap-1">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="hero">
                        <HeroAdmin />
                    </TabsContent>
                    <TabsContent value="services">
                        <ServicesAdmin />
                    </TabsContent>
                    <TabsContent value="doctors">
                        <DoctorsAdmin />
                    </TabsContent>
                    <TabsContent value="pricing">
                        <PricingAdmin />
                    </TabsContent>
                    <TabsContent value="gallery">
                        <GalleryAdmin />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default Dashboard;
