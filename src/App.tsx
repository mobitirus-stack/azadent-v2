import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import Article1 from "./pages/blog/Article1";
import Article2 from "./pages/blog/Article2";
import Article3 from "./pages/blog/Article3";
import BlogPage from "./pages/BlogPage";
import GalleryPage from "./pages/GalleryPage";
import FAQPage from "./pages/FAQPage";
import WebsiteInfo from "./pages/WebsiteInfo";
import { BackToTop } from "./components/PageLayout";
import FloatingCallWidget from "./components/FloatingCallWidget";
import FloatingQuestionWidget from "./components/FloatingQuestionWidget";
import PageScroll from "./components/PageScroll";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";


import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Index />} />
      <Route path="/paslaugos/:serviceId" element={<ServiceDetail />} />
      <Route path="/galerija" element={<GalleryPage />} />
      <Route path="/duk" element={<FAQPage />} />
      <Route path="/svetaines-informacija" element={<WebsiteInfo />} />
      {/* Blog Routes */}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/kasdienine-prieziura" element={<Article1 />} />
      <Route path="/blog/dantu-implantai" element={<Article2 />} />
      <Route path="/blog/burnos-higiena" element={<Article3 />} />
      {/* Admin Routes */}
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageScroll />
          <AnimatedRoutes />
          <BackToTop />
          <FloatingCallWidget />
          <FloatingQuestionWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
