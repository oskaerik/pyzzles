import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export interface Puzzle {
  id: string;
  test: string;
}

export function loadPuzzles(): Record<string, Puzzle> {
  const puzzlesDir = join(process.cwd(), 'src/puzzles');
  const puzzleDirs = readdirSync(puzzlesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const puzzles: Record<string, Puzzle> = {};
  
  for (const dir of puzzleDirs) {
    const testPath = join(puzzlesDir, dir, 'test_solution.py');
    const test = readFileSync(testPath, 'utf-8');
    puzzles[dir] = { id: dir, test };
  }

  return puzzles;
}