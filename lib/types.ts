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
  | "generalaServida"
  | "dobleGenerala"

export interface Player {
  name: string
  scores: Record<ScoreCategory, number | null>
}

