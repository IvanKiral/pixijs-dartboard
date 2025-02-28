import { POINTS_MAP, type DartValue } from "./constants";
import { sum } from "./math";

export type GameModeRules = {
  id: string;
  initialScore: number;
  numberOfRounds: number;
  calculateNewScore: (score: number, darts: ReadonlyArray<DartValue>) => number;
  winCondition: (score: number, darts: ReadonlyArray<DartValue>) => boolean;
};

export type GameMode = "501" | "301" | "Free";

export const gameModes: Record<GameMode, GameModeRules> = {
  "501": {
    id: "501",
    initialScore: 501,
    numberOfRounds: 15,
    calculateNewScore: (score: number, darts: ReadonlyArray<DartValue>) =>
      score - sum(darts.map((d: DartValue) => POINTS_MAP.get(d) ?? 0)),
    winCondition: (score: number, darts: ReadonlyArray<DartValue>) => 
      score === 0 && darts[darts.length - 1].startsWith('D'),
  },
  "301": {
    id: "301",
    initialScore: 301,
    numberOfRounds: 15,
    calculateNewScore: (score: number, darts: ReadonlyArray<DartValue>) =>
      score - sum(darts.map((d: DartValue) => POINTS_MAP.get(d) ?? 0)),
    winCondition: (score: number, darts: ReadonlyArray<DartValue>) => 
      score === 0 && darts[darts.length - 1].startsWith('D'),
  },
  "Free": {
    id: "Free",
    initialScore: 0,
    numberOfRounds: 0,
    calculateNewScore: (score: number, darts: ReadonlyArray<DartValue>) =>
      score + sum(darts.map((d: DartValue) => POINTS_MAP.get(d) ?? 0)),
    winCondition: () => false,
  },
};

export const updateGameModeRules = (ruleset: GameModeRules, updates: Partial<GameModeRules>) => {
  return {
    ...ruleset,
    ...updates,
  };
};
