import { Editor } from "@monaco-editor/react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  className?: string;
}

const CodeEditor = ({ value, onChange, readOnly = false, className }: CodeEditorProps) => {
  return (
    <div className={cn("h-full w-full overflow-hidden rounded-md border", className)}>
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          lineNumbersMinChars: 2,
          readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
	  quickSuggestions: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
