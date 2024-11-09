import { type PyodideInterface } from "pyodide";

declare global {
  interface Window {
    loadPyodide: (config: any) => Promise<PyodideInterface>;
  }
}

let pyodide: PyodideInterface | null = null;

export async function initPyodide() {
  // Reset pyodide instance on each initialization
  pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
  });
  await pyodide.loadPackage("pytest");
  return pyodide;
}

export async function runTests(solutionCode: string, testCode: string): Promise<string> {
  const py = await initPyodide();
  
  try {
    // Clean up any existing files and Python modules
    await py.runPythonAsync(`
import os
import sys
import shutil

# Clean up any existing test directory
if os.path.exists('test'):
    shutil.rmtree('test')

# Clean up any cached modules
if 'solution' in sys.modules:
    del sys.modules['solution']
if 'test_solution' in sys.modules:
    del sys.modules['test_solution']

os.makedirs('test')
    
with open('test/solution.py', 'w') as f:
    f.write('''${solutionCode}''')
    
with open('test/test_solution.py', 'w') as f:
    f.write('''${testCode}''')
`);

    // Run pytest and capture output
    const result = await py.runPythonAsync(`
import pytest
import sys
from io import StringIO

def run_tests():
    output = StringIO()
    sys.stdout = output
    sys.stderr = output
    pytest.main(['test/test_solution.py', '-v'])
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__
    return output.getvalue()

run_tests()
`);

    return result as string;
  } catch (error) {
    return `Error: ${error}`;
  }
}