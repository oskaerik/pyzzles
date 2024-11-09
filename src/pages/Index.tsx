import { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import ConsoleOutput from "@/components/ConsoleOutput";
import { runTests } from "@/lib/pyodide";

const DEFAULT_TEST = `def test_example():
    assert True, "This test should pass"`;

const Index = () => {
  const [solutionCode, setSolutionCode] = useState("");
  const [testCode] = useState(DEFAULT_TEST);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleTest = async () => {
    setIsRunning(true);
    try {
      const result = await runTests(solutionCode, testCode);
      setOutput(result);
    } catch (error) {
      console.error("Failed to run tests:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col gap-6">
      <header className="flex items-center justify-between px-6 py-4 bg-secondary/30 rounded-xl backdrop-blur-sm border border-secondary/20">
        <h1 className="text-2xl font-bold text-emerald-400">
          Pyzzles
        </h1>
        <Button
          onClick={handleTest}
          disabled={isRunning}
          className="w-24 bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          {isRunning ? "Running..." : "Test"}
        </Button>
      </header>
      
      <div className="flex-1 flex flex-col gap-6 min-h-0">
        <div className="h-[200px]">
          <h2 className="text-lg font-medium text-foreground/90 mb-2">Console Output</h2>
          <ConsoleOutput output={output} />
        </div>
        
        <div className="flex-1 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-foreground/90">Solution</h2>
            <div className="flex-1 overflow-hidden rounded-lg border border-secondary/20">
              <CodeEditor
                value={solutionCode}
                onChange={(value) => setSolutionCode(value || "")}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-foreground/90">Test Cases</h2>
            <div className="flex-1 overflow-hidden rounded-lg border border-secondary/20">
              <CodeEditor
                value={testCode}
                readOnly
                className="opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;