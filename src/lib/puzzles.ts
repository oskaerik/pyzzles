export interface Puzzle {
  id: string;
  test: string;
}

export function loadPuzzles(): Record<string, Puzzle> {
  const puzzles: Record<string, Puzzle> = {
    "identity-crisis": {
      id: "identity-crisis",
      test: `from solution import X

def test():
    a = X()
    b = X()

    assert a is not b
    assert id(a) == id(b)`
    }
  };

  return puzzles;
}