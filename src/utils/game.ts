import { createSignal } from "solid-js";
import type { DartValue } from "./constants";
import type { GameModeRules } from "./gameModes";

const [gameState, setGameStateInternal] = createSignal<GameState | null>(null);

export type Round = {
  dartsThrown: ReadonlyArray<DartValue>;
  score: number;
};

export type Player = {
  id: number;
  name: string;
  rounds: ReadonlyArray<Round>;
};

export type GameState = {
  ruleset: GameModeRules;
  currentPlayer: number;
  players: ReadonlyArray<Player>;
  state: "playing" | "paused" | "finished";
  winner: Player | null;
};

export const createGame = (
  playersNames: string[],
  ruleset: GameModeRules
): GameState =>
  setGameStateInternal({
    ruleset,
    currentPlayer: 0,
    players: playersNames.map((name, index) => ({
      id: index,
      name,
      rounds: [{ dartsThrown: [], score: ruleset.initialScore }],
    })),
    state: "playing",
    winner: null,
  });

export const getGameState = () => gameState();

export const handleThrow = (
  dartValue: ReadonlyArray<DartValue>,
  gameState: GameState
) => {
  if (gameState.state !== "playing" || gameState.winner) {
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayer];

  console.log(gameState.ruleset.numberOfRounds, currentPlayer.rounds.length);

  if (
    gameState.ruleset.numberOfRounds > 0 &&
    currentPlayer.rounds.length === gameState.ruleset.numberOfRounds + 1
  ) {
    setGameStateInternal({
      ...gameState,
      state: "finished",
    });

    return;
  }

  const currentRound = currentPlayer.rounds[currentPlayer.rounds.length - 1];

  const calculatedNewScore = gameState.ruleset.calculateNewScore(
    currentRound.score,
    dartValue
  );
  const newScore =
    calculatedNewScore >= 0 ||
    gameState.ruleset.winCondition(calculatedNewScore, dartValue)
      ? calculatedNewScore
      : currentRound.score;

  const newRound = {
    dartsThrown: [...currentRound.dartsThrown, ...dartValue],
    score: newScore,
  };

  setGameState({
    ...gameState,
    currentPlayer: (gameState.currentPlayer + 1) % gameState.players.length,
    players: gameState.players.map(p =>
      p.id === currentPlayer.id ? { ...p, rounds: [...p.rounds, newRound] } : p
    ),
    winner: gameState.ruleset.winCondition(newScore, newRound.dartsThrown)
      ? currentPlayer
      : null,
    state: gameState.ruleset.winCondition(newScore, newRound.dartsThrown)
      ? "finished"
      : "playing",
  });
};

export const setGameState = setGameStateInternal;
