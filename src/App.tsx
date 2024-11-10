import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import { loadPuzzles } from "@/lib/puzzles";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [firstPuzzleId, setFirstPuzzleId] = useState<string | null>(null);

  useEffect(() => {
    const initFirstPuzzle = async () => {
      const puzzles = await loadPuzzles();
      setFirstPuzzleId(Object.keys(puzzles)[0]);
    };
    initFirstPuzzle();
  }, []);

  if (!firstPuzzleId) {
    return null; // or a loading spinner if you prefer
  }

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
                  to={`/puzzles/${firstPuzzleId}`} 
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