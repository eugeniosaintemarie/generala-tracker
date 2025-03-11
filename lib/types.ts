export type ScoreCategory =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "escalera"
  | "full"
  | "poker"
  | "generala"
  | "dobleGenerala"

export interface Player {
  name: string
  scores: Record<ScoreCategory, number | null>
}

export interface CategoryOption {
  value: number
  label: string
}

export const getCategoryOptions = (category: ScoreCategory): CategoryOption[] => {
  const baseOptions: CategoryOption[] = [
    { value: 0, label: "-" },
    { value: 0, label: "X" },
  ]

  const categorySpecificOptions: Record<ScoreCategory, CategoryOption[]> = {
    one: [1, 2, 3, 4, 5].map((n) => ({ value: n, label: n.toString() })),
    two: [2, 4, 6, 8, 10].map((n) => ({ value: n, label: n.toString() })),
    three: [3, 6, 9, 12, 15].map((n) => ({ value: n, label: n.toString() })),
    four: [4, 8, 12, 16, 20].map((n) => ({ value: n, label: n.toString() })),
    five: [5, 10, 15, 20, 25].map((n) => ({ value: n, label: n.toString() })),
    six: [6, 12, 18, 24, 30].map((n) => ({ value: n, label: n.toString() })),
    escalera: [
      { value: 20, label: "20 (armada)" },
      { value: 25, label: "25 (servida)" },
    ],
    full: [
      { value: 30, label: "30 (armada)" },
      { value: 35, label: "35 (servida)" },
    ],
    poker: [
      { value: 40, label: "40 (armada)" },
      { value: 45, label: "45 (servida)" },
    ],
    generala: [
      { value: 50, label: "50 (armada)" },
      { value: 55, label: "55 (servida)" },
    ],
    dobleGenerala: [
      { value: 100, label: "100 (armada)" },
      { value: 105, label: "105 (servida)" },
    ],
  }

  return [...baseOptions, ...categorySpecificOptions[category]]
}

