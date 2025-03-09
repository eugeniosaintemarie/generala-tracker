"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Player, ScoreCategory } from "@/lib/types"

interface PlayerTurnProps {
  player: Player
  onScoreSubmit: (category: ScoreCategory, points: number) => void
}

export default function PlayerTurn({ player, onScoreSubmit }: PlayerTurnProps) {
  const [selectedCategory, setSelectedCategory] = useState<ScoreCategory | null>(null)
  const [points, setPoints] = useState<string>("")

  const handleSubmit = () => {
    if (selectedCategory && points) {
      onScoreSubmit(selectedCategory, Number.parseInt(points, 10))
      setSelectedCategory(null)
      setPoints("")
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
      generalaServida: "Generala servida",
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
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <RadioGroup
            value={selectedCategory || ""}
            onValueChange={(value) => setSelectedCategory(value as ScoreCategory)}
          >
            <div className="grid grid-cols-2 gap-2">
              {getAvailableCategories().map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={category} />
                  <Label htmlFor={category}>{getCategoryLabel(category)}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {selectedCategory && (
          <div className="space-y-2">
            <Input
              id="points"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Puntos"
            />
          </div>
        )}

        <Button onClick={handleSubmit} disabled={!selectedCategory || !points} className="w-full">
          Guardar
        </Button>
      </CardContent>
    </Card>
  )
}

