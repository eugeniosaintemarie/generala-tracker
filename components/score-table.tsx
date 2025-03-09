"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X } from "lucide-react"
import type { Player, ScoreCategory } from "@/lib/types"

interface ScoreTableProps {
  players: Player[]
  updateScore: (playerIndex: number, category: ScoreCategory, points: number | null) => void
  onClose: () => void
}

export default function ScoreTable({ players, updateScore, onClose }: ScoreTableProps) {
  const [editMode, setEditMode] = useState<{ playerIndex: number; category: ScoreCategory } | null>(null)
  const [editValue, setEditValue] = useState<string>("")

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

  const calculateTotal = (player: Player): number => {
    return Object.values(player.scores).reduce((sum, score) => sum + (score || 0), 0)
  }

  const handleCellClick = (playerIndex: number, category: ScoreCategory, currentValue: number | null) => {
    setEditMode({ playerIndex, category })
    setEditValue(currentValue === null ? "" : currentValue.toString())
  }

  const handleSaveEdit = () => {
    if (editMode) {
      const { playerIndex, category } = editMode
      const newValue = editValue === "" ? null : Number.parseInt(editValue, 10)
      updateScore(playerIndex, category, newValue)
      setEditMode(null)
    }
  }

  const getRankings = (): { name: string; total: number; rank: number }[] => {
    const totals = players.map((player, index) => ({
      name: player.name,
      total: calculateTotal(player),
      originalIndex: index,
    }))

    totals.sort((a, b) => b.total - a.total)

    let currentRank = 1
    let currentTotal = totals[0]?.total || 0
    let tied = 0

    return totals.map((player, index) => {
      if (player.total < currentTotal) {
        currentRank += tied + 1
        currentTotal = player.total
        tied = 0
      } else if (player.total === currentTotal && index > 0) {
        tied++
      }

      return {
        name: player.name,
        total: player.total,
        rank: currentRank,
      }
    })
  }

  const categories: ScoreCategory[] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "escalera",
    "full",
    "poker",
    "generala",
    "generalaServida",
    "dobleGenerala",
  ]

  return (
    <div className="bg-background rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tablero</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] sticky left-0 z-10 bg-background text-right"></TableHead>
                {players.map((player, index) => (
                  <TableHead key={index} className="text-center">
                    {player.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category}>
                  <TableCell className="font-medium sticky left-0 z-10 bg-background text-right">
                    {getCategoryLabel(category)}
                  </TableCell>
                  {players.map((player, playerIndex) => (
                    <TableCell key={playerIndex} className="text-center">
                      {editMode?.playerIndex === playerIndex && editMode?.category === category ? (
                        <div className="flex">
                          <Input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-16 mx-auto text-center"
                            autoFocus
                            onBlur={handleSaveEdit}
                            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => handleCellClick(playerIndex, category, player.scores[category])}
                          className="cursor-pointer hover:bg-muted rounded px-2 py-1"
                        >
                          {player.scores[category] === null ? "-" : player.scores[category]}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow className="font-bold">
                <TableCell className="sticky left-0 z-10 bg-background text-right">TOTAL</TableCell>
                {players.map((player, index) => (
                  <TableCell key={index} className="text-center">
                    {calculateTotal(player)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Posiciones</h3>
        <Table>
          <TableBody>
            {getRankings().map((ranking, index) => (
              <TableRow key={index}>
                <TableCell>{ranking.rank}°</TableCell>
                <TableCell>{ranking.name}</TableCell>
                <TableCell className="text-right">{ranking.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

