"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PlayerTurn from "@/components/player-turn"
import ScoreTable from "@/components/score-table"
import ConfirmDialog from "@/components/confirm-dialog"
import type { Player, ScoreCategory } from "@/lib/types"

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([])
  const [playerInput, setPlayerInput] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [showScoreTable, setShowScoreTable] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  // Load game state from localStorage on initial render
  useEffect(() => {
    const savedGame = localStorage.getItem("generalaGame")
    if (savedGame) {
      const gameData = JSON.parse(savedGame)
      setPlayers(gameData.players)
      setGameStarted(gameData.gameStarted)
      setCurrentPlayerIndex(gameData.currentPlayerIndex)
    }
  }, [])

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem(
        "generalaGame",
        JSON.stringify({
          players,
          gameStarted,
          currentPlayerIndex,
        }),
      )
    }
  }, [players, gameStarted, currentPlayerIndex])

  const handleStartGame = () => {
    if (playerInput.trim()) {
      const playerNames = playerInput
        .replace(/\n/g, " ") // Replace all line breaks with spaces
        .split(" ") // Split by spaces
        .filter((name) => name.trim() !== "")
        .map((name) => name.trim())

      if (playerNames.length > 0) {
        const newPlayers = playerNames.map((name) => ({
          name,
          scores: {
            one: null,
            two: null,
            three: null,
            four: null,
            five: null,
            six: null,
            escalera: null,
            full: null,
            poker: null,
            generala: null,
            generalaServida: null,
            dobleGenerala: null,
          },
        }))

        setPlayers(newPlayers)
        setGameStarted(true)
      }
    }
  }

  const handleScoreSubmit = (category: ScoreCategory, points: number) => {
    const updatedPlayers = [...players]
    updatedPlayers[currentPlayerIndex].scores[category] = points

    setPlayers(updatedPlayers)
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)
  }

  const updatePlayerScore = (playerIndex: number, category: ScoreCategory, points: number | null) => {
    const updatedPlayers = [...players]
    updatedPlayers[playerIndex].scores[category] = points
    setPlayers(updatedPlayers)
  }

  const resetGame = () => {
    localStorage.removeItem("generalaGame")
    setPlayers([])
    setPlayerInput("")
    setGameStarted(false)
    setCurrentPlayerIndex(0)
  }

  return (
    <main className="container max-w-md mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6">Generala tracker</h1>

      {!gameStarted ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ingresa los jugadores (separados por espacios o enters)</p>
            </div>
            <Input
              id="players"
              as="textarea"
              className="min-h-[150px]"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              placeholder="Messi DePaul Dybala Paredes..."
            />
          </div>
          <Button onClick={handleStartGame} className="w-full">
            Comenzar
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <PlayerTurn player={players[currentPlayerIndex]} onScoreSubmit={handleScoreSubmit} />

          <div className="mt-auto pt-4">
            <Button variant="outline" className="w-full" onClick={() => setShowScoreTable(!showScoreTable)}>
              {showScoreTable ? "Ocultar tablero" : "Ver tablero"}
            </Button>
          </div>

          {showScoreTable && (
            <div className="fixed inset-0 bg-background/95 z-50 overflow-y-auto pt-16 pb-20 px-4">
              <div className="max-w-md mx-auto">
                <ScoreTable
                  players={players}
                  updateScore={updatePlayerScore}
                  onClose={() => setShowScoreTable(false)}
                />
              </div>
            </div>
          )}

          <div className="mt-4">
            <Button variant="destructive" size="sm" onClick={() => setShowResetConfirm(true)} className="w-full">
              Reiniciar
            </Button>
          </div>

          <ConfirmDialog
            open={showResetConfirm}
            onOpenChange={setShowResetConfirm}
            onConfirm={resetGame}
            title="¿Seguro?"
            confirmText="Sí"
            cancelText="Cancelar"
          />
        </div>
      )}
    </main>
  )
}

