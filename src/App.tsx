import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import ActionDetail from "./pages/ActionDetail";
import Team from "./pages/Team";
import Embed from "./pages/Embed";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";
import { FavoritesFloatingButton } from "./components/FavoritesFloatingButton";
import { OfflineIndicator } from "./components/OfflineIndicator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FavoritesProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <OfflineIndicator />
          <FavoritesFloatingButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/action/:slug" element={<ActionDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/embed" element={<Embed />} />
            <Route path="/install" element={<Install />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
