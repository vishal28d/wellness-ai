import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import TipsScreen from "./screens/TipsScreen";
import TipDetailScreen from "./screens/TipDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tips" element={<TipsScreen />} />
            <Route path="/tip-detail" element={<TipDetailScreen />} />
            <Route path="/favorites" element={<FavoritesScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Navigation />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
