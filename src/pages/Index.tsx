import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
    <div className="flex h-screen flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pyzzles</h1>
        <Button
          onClick={handleTest}
          disabled={isRunning}
          className="w-24"
        >
          {isRunning ? "Running..." : "Test"}
        </Button>
      </div>
      
      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Solution</h2>
          <CodeEditor
            value={solutionCode}
            onChange={(value) => setSolutionCode(value || "")}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Test Cases</h2>
          <CodeEditor
            value={testCode}
            readOnly
            className="opacity-80"
          />
        </div>
      </div>
      
      <div className="h-48">
        <h2 className="mb-2 text-lg font-semibold">Console Output</h2>
        <ConsoleOutput output={output} />
      </div>
    </div>
  );
};

export default Index;