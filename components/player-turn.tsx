"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Player, ScoreCategory } from "@/lib/types"
import { getCategoryOptions } from "@/lib/types"

interface PlayerTurnProps {
  player: Player
  onScoreSubmit: (category: ScoreCategory, points: number) => void
}

export default function PlayerTurn({ player, onScoreSubmit }: PlayerTurnProps) {
  const [selectedCategory, setSelectedCategory] = useState<ScoreCategory | null>(null)
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null)

  const handleSubmit = () => {
    if (selectedCategory !== null && selectedPoints !== null) {
      onScoreSubmit(selectedCategory, selectedPoints)
      setSelectedCategory(null)
      setSelectedPoints(null)
    }
  }

  const getCategoryLabel = (category: ScoreCategory): string => {
    const labels: Record<ScoreCategory, string> = {
      one: "1",
      two: "2",
      three: "3",
      four: "4",
      five: "5",
      six: "6",
      escalera: "Escalera",
      full: "Full",
      poker: "Póker",
      generala: "Generala",
      "": "",  // Empty option
      dobleGenerala: "Generala doble",
    }
    return labels[category]
  }

  const getAvailableCategories = (): ScoreCategory[] => {
    return Object.entries(player.scores)
      .filter(([_, value]) => value === null)
      .map(([key]) => key as ScoreCategory)
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-center">Turno de {player.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          { }
          <div className="space-y-2">
            <RadioGroup
              value={selectedCategory || ""}
              onValueChange={(value) => {
                setSelectedCategory(value as ScoreCategory)
                setSelectedPoints(null)
              }}
            >
              <div className="space-y-2">
                {getAvailableCategories().map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <RadioGroupItem value={category} id={category} />
                    <Label htmlFor={category}>{getCategoryLabel(category)}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          { }
          {selectedCategory && (
            <div className="space-y-2">
              <RadioGroup
                value={selectedPoints?.toString() || ""}
                onValueChange={(value) => setSelectedPoints(Number(value))}
              >
                <div className="space-y-2">
                  {getCategoryOptions(selectedCategory).map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value.toString()} id={`points-${option.value}`} />
                      <Label htmlFor={`points-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={selectedCategory === null || selectedPoints === null}
          className="w-full mt-4"
        >
          Guardar
        </Button>
      </CardContent>
    </Card>
  )
}