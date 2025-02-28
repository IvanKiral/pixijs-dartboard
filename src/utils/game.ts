import { createSignal } from "solid-js";
import { POINTS_MAP, type DartValue } from "./constants";
import { sum } from "./math";

const [gameState, setGameState] = createSignal<GameState | null>(null);

export type Round = {
  dartsThrown: ReadonlyArray<DartValue>;
  score: number;
};

export type Player = {
  id: number;
  name: string;
  score: number;
  rounds: ReadonlyArray<Round>;
};

export type GameState = {
  gameMode: "501" | "301" | "Free";
  currentPlayer: number;
  players: ReadonlyArray<Player>;
  paused: boolean;
};

export const createGame = (
  playersNames: string[],
  gameMode: GameState["gameMode"]
): GameState =>
  setGameState({
    gameMode,
    currentPlayer: 0,
    players: playersNames.map((name, index) => ({
      id: index,
      name,
      score: gameMode === "Free" ? 0 : +gameMode,
      rounds: [{ dartsThrown: [], score: gameMode === "Free" ? 0 : +gameMode }],
    })),
    paused: false,
  });

export const getGameState = () => gameState();

export const handleThrow = (dartValue: ReadonlyArray<DartValue>) => {
  const gameState = getGameState();

  if (!gameState) {
    throw new Error("Game state is not set");
  }

  const currentPlayer = gameState.players[gameState.currentPlayer];
  const currentRound = currentPlayer.rounds[currentPlayer.rounds.length - 1];

  const newRound = {
    dartsThrown: [...currentRound.dartsThrown, ...dartValue],
    score:
      currentRound.score - sum(dartValue.map((d) => POINTS_MAP.get(d) ?? 0)),
  };

  setGameState({
    ...gameState,
    currentPlayer: (gameState.currentPlayer + 1) % gameState.players.length,
    players: gameState.players.map((p) =>
      p.id === currentPlayer.id ? { ...p, rounds: [...p.rounds, newRound] } : p
    ),
  });
};
