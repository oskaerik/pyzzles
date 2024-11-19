import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import ConsoleOutput from "@/components/ConsoleOutput";
import { runTests } from "@/lib/pyodide";
import { loadPuzzles, type Puzzle } from "@/lib/puzzles";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [solutionCode, setSolutionCode] = useState("");
  const [puzzles, setPuzzles] = useState<Record<string, Puzzle>>({});
  const [selectedPuzzle, setSelectedPuzzle] = useState<string>("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testStatus, setTestStatus] = useState<"passed" | "failed" | null>(null);
  const navigate = useNavigate();
  const { puzzleId } = useParams();

  useEffect(() => {
    const initPuzzles = async () => {
      try {
        const loadedPuzzles = await loadPuzzles();
        setPuzzles(loadedPuzzles);
        const validPuzzleId = puzzleId && loadedPuzzles[puzzleId] ? puzzleId : Object.keys(loadedPuzzles)[0];
        setSelectedPuzzle(validPuzzleId);
      } finally {
        setIsLoading(false);
      }
    };
    initPuzzles();
  }, [puzzleId]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const handlePuzzleChange = (puzzleId: string) => {
    setSelectedPuzzle(puzzleId);
    setSolutionCode("");
    setOutput("");
    setTestStatus(null);
    navigate(`/puzzles/${puzzleId}`);
  };

  const handleTest = async () => {
    setIsRunning(true);
    setTestStatus(null);
    try {
      const result = await runTests(solutionCode, puzzles[selectedPuzzle]?.test || "");
      setOutput(result);
      setTestStatus(
        result.includes("error") || result.includes("Error") || result.includes("FAILED")
          ? "failed"
          : result.includes("passed")
          ? "passed"
          : null
      );
    } catch (error) {
      console.error("Failed to run tests:", error);
      setTestStatus("failed");
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => {
    setOutput("");
    setTestStatus(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col gap-6">
      <a 
        href="https://github.com/oskaerik/pyzzles"
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        https://github.com/oskaerik/pyzzles
      </a>

      <header className="flex flex-col px-4 sm:px-6 py-4 bg-secondary rounded-xl border border-secondary/20">
        <span className="text-sm text-muted-foreground mb-2">Select puzzle:</span>
        <div className="flex items-center justify-between">
          <Select
            value={selectedPuzzle}
            onValueChange={handlePuzzleChange}
          >
            <SelectTrigger className="w-[200px] sm:w-[300px] border-0 bg-transparent text-lg sm:text-2xl font-bold text-emerald-400 focus:ring-0">
              <SelectValue className="text-left truncate" />
            </SelectTrigger>
            <SelectContent className="w-[200px] sm:w-[300px]">
              {Object.keys(puzzles).map(puzzleId => (
                <SelectItem 
                  key={puzzleId} 
                  value={puzzleId} 
                  className="text-left"
                >
                  {puzzleId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleTest}
            disabled={isRunning}
            className="w-24 bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            {isRunning ? "Running..." : "Test"}
          </Button>
        </div>
      </header>

      {testStatus === "passed" && (
        <div className="text-muted-foreground text-lg font-semibold flex items-center gap-2 px-4">
          Add your solution to the{" "}
          <a 
            href="https://docs.google.com/spreadsheets/d/1oRWRQPjZeR5JE-Mc503nZ2EVZ8bgaEb6iCnwZNigrv0/edit?usp=drivesdk"
            target="_blank"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            showcase
          </a>
        </div>
      )}

      <div className="bg-background rounded-lg border border-secondary/20 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-foreground font-mono">output</h2>
            {testStatus === "passed" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            )}
            {testStatus === "failed" && (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <Button
            onClick={handleClear}
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>
        <ConsoleOutput output={output} />
      </div>
      
      <div className="flex-1 grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium text-foreground font-mono">solution.py</h2>
          <div className="flex-1 overflow-hidden rounded-lg border border-secondary/20">
            <CodeEditor
              value={solutionCode}
              onChange={(value) => setSolutionCode(value || "")}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium text-foreground font-mono">test_solution.py</h2>
          <div className="flex-1 overflow-hidden rounded-lg border border-secondary/20">
            <CodeEditor
              value={puzzles[selectedPuzzle]?.test || ""}
              readOnly
              className="opacity-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;