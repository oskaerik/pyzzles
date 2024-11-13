export interface Puzzle {
  id: string;
  test: string;
}

// Import all test files at build time
const puzzlesData: Record<string, Puzzle> = Object.fromEntries(
  Object.entries(import.meta.glob('/src/puzzles/*/test_solution.py', { eager: true, as: 'raw' }))
    .map(([path, test]) => {
      const id = path.split('/')[3];
      return [id, { id, test: test as string }];
    })
    .sort(([a], [b]) => a.localeCompare(b))
);

export async function loadPuzzles(): Promise<Record<string, Puzzle>> {
  return puzzlesData;
}