import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CodeEditor from "@/components/CodeEditor";
import ConsoleOutput from "@/components/ConsoleOutput";
import { runTests } from "@/lib/pyodide";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const DEFAULT_TEST = `def test_example():
    assert True, "This test should pass"`;

const Index = () => {
  const [solutionCode, setSolutionCode] = useState("");
  const [testCode] = useState(DEFAULT_TEST);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleTest = async () => {
    setIsRunning(true);
    try {
      const result = await runTests(solutionCode, testCode);
      setOutput(result);
      
      if (result.includes("passed")) {
        toast({
          title: "Tests Passed! 🎉",
          description: "All tests completed successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to run tests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between px-4 py-3 bg-secondary rounded-lg">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Pyzzles
        </h1>
        <Button
          onClick={handleTest}
          disabled={isRunning}
          className="w-24 bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {isRunning ? "Running..." : "Test"}
        </Button>
      </header>
      
      <main className="flex-1 min-h-0">
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[calc(100vh-12rem)]"
        >
          <ResizablePanel defaultSize={70}>
            <div className="grid h-full gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-foreground/90">Solution</h2>
                <CodeEditor
                  value={solutionCode}
                  onChange={(value) => setSolutionCode(value || "")}
                  className="flex-1"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-foreground/90">Test Cases</h2>
                <CodeEditor
                  value={testCode}
                  readOnly
                  className="flex-1 opacity-80"
                />
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={30}>
            <div className="h-full flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-foreground/90">Console Output</h2>
              <ConsoleOutput output={output} className="flex-1" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default Index;