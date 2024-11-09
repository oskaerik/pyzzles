export interface Puzzle {
  id: string;
  test: string;
}

// Import all test files using Vite's import.meta.glob
const testFiles = import.meta.glob('/src/puzzles/*/test_solution.py', { as: 'raw' });

export async function loadPuzzles(): Promise<Record<string, Puzzle>> {
  const puzzles: Record<string, Puzzle> = {};
  
  // Convert paths to puzzle IDs and load test contents
  for (const path of Object.keys(testFiles)) {
    const id = path.split('/')[3]; // Extract puzzle name from path
    const test = await testFiles[path]();
    puzzles[id] = { id, test };
  }

  // Sort puzzles alphabetically
  return Object.fromEntries(
    Object.entries(puzzles).sort(([a], [b]) => a.localeCompare(b))
  );
}