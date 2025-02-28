export const DARTS_NUMBERS = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
] as const;

export const DART_BOARD_RED_COLOR = 0xe3292e;
export const DART_BOARD_GREEN_COLOR = 0x309f6a;
export const DART_BOARD_YELLOW_COLOR = 0xf9dfbc;

export const DART_MULTIPLE_POINTS_COLORS = [
  DART_BOARD_RED_COLOR,
  DART_BOARD_GREEN_COLOR,
] as const;

export const DART_POINTS_COLORS = [0x000000, DART_BOARD_YELLOW_COLOR] as const;

export const possibleDarts = [
  "1", "D1", "T1",
  "2", "D2", "T2",
  "3", "D3", "T3",
  "4", "D4", "T4",
  "5", "D5", "T5",
  "6", "D6", "T6",
  "7", "D7", "T7",
  "8", "D8", "T8",
  "9", "D9", "T9",
  "10", "D10", "T10",
  "11", "D11", "T11",
  "12", "D12", "T12",
  "13", "D13", "T13",
  "14", "D14", "T14",
  "15", "D15", "T15",
  "16", "D16", "T16",
  "17", "D17", "T17",
  "18", "D18", "T18",
  "19", "D19", "T19",
  "20", "D20", "T20",
  "BULL", "OUTER_BULL", "0"
] as const;

export type DartValue = typeof possibleDarts[number];

export const POINTS_MAP = new Map<DartValue, number>([
  ["1", 1], ["D1", 2], ["T1", 3],
  ["2", 2], ["D2", 4], ["T2", 6],
  ["3", 3], ["D3", 6], ["T3", 9],
  ["4", 4], ["D4", 8], ["T4", 12],
  ["5", 5], ["D5", 10], ["T5", 15],
  ["6", 6], ["D6", 12], ["T6", 18],
  ["7", 7], ["D7", 14], ["T7", 21],
  ["8", 8], ["D8", 16], ["T8", 24],
  ["9", 9], ["D9", 18], ["T9", 27],
  ["10", 10], ["D10", 20], ["T10", 30],
  ["11", 11], ["D11", 22], ["T11", 33],
  ["12", 12], ["D12", 24], ["T12", 36],
  ["13", 13], ["D13", 26], ["T13", 39],
  ["14", 14], ["D14", 28], ["T14", 42],
  ["15", 15], ["D15", 30], ["T15", 45],
  ["16", 16], ["D16", 32], ["T16", 48],
  ["17", 17], ["D17", 34], ["T17", 51],
  ["18", 18], ["D18", 36], ["T18", 54],
  ["19", 19], ["D19", 38], ["T19", 57],
  ["20", 20], ["D20", 40], ["T20", 60],
  ["BULL", 50], ["OUTER_BULL", 25], ["0", 0],
]);

export const isDartValue = (value: string): value is DartValue => {
  return possibleDarts.includes(value as DartValue);
}
