import { cn } from "@/lib/utils";

interface ConsoleOutputProps {
  output: string;
  className?: string;
}

const ConsoleOutput = ({ output, className }: ConsoleOutputProps) => {
  const lines = output.split("\n");
  const hasError = output.includes("FAILED") || output.includes("Error") || output.includes("error");
  const hasSuccess = output.includes("passed") && !hasError;

  return (
    <div
      className={cn(
        "h-full w-full overflow-auto rounded-lg border border-secondary/20 bg-secondary/10 p-4 font-mono text-sm text-foreground/90 backdrop-blur-sm",
        className
      )}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          className={cn(
            "whitespace-pre-wrap",
            line.includes("FAILED") && "text-red-400",
            line.includes("passed") && "text-emerald-400"
          )}
        >
          {line}
        </div>
      ))}
      {!output && (
        <div className="text-muted-foreground">
          click test to run your code...
        </div>
      )}
    </div>
  );
};

export default ConsoleOutput;
