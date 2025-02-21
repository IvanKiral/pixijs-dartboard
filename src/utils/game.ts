import { createSignal } from "solid-js";

const [gameState, setGameState] = createSignal<GameState | null>(null);

export type GameState = {
  gameMode: "501" | "301" | "Free";
  currentPlayer: number;
  players: ReadonlyArray<string>;
  paused: boolean;
};

export const createGame = (
  players: string[],
  gameMode: GameState["gameMode"]
): GameState =>
  setGameState({
    gameMode,
    currentPlayer: 0,
    players,
    paused: false,
  });

export const getGameState = () => gameState();
