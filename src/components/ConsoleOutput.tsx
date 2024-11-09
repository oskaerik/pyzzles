import { cn } from "@/lib/utils";

interface ConsoleOutputProps {
  output: string;
  className?: string;
}

const ConsoleOutput = ({ output, className }: ConsoleOutputProps) => {
  const lines = output.split("\n");
  const hasError = output.includes("FAILED") || output.includes("Error");
  const hasSuccess = output.includes("passed");

  return (
    <div
      className={cn(
        "h-full w-full overflow-auto rounded-md border bg-console-bg p-4 font-mono text-sm text-console-text",
        className
      )}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          className={cn(
            "whitespace-pre-wrap",
            line.includes("FAILED") && "text-console-error",
            line.includes("passed") && "text-console-success"
          )}
        >
          {line}
        </div>
      ))}
      {!output && (
        <div className="text-gray-400">
          Click the "Test" button to run your code...
        </div>
      )}
    </div>
  );
};

export default ConsoleOutput;