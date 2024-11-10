import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import { loadPuzzles } from "@/lib/puzzles";

const queryClient = new QueryClient();

const App = () => {
  // Load first puzzle ID for redirect
  const getFirstPuzzleId = async () => {
    const puzzles = await loadPuzzles();
    return Object.keys(puzzles)[0];
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Navigate 
                  to={`/puzzles/${getFirstPuzzleId()}`} 
                  replace 
                />
              } 
            />
            <Route path="/puzzles/:puzzleId" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;