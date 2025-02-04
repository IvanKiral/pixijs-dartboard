import * as PIXI from "pixi.js";
import { createDartPointsCircle } from "./utils/ring";
import { calculatePointOnCircle } from "./utils/math";

import * as PIXIFILTERS from "pixi-filters";

const DARTS_NUMBERS = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
] as const;

const PARTS_NUMBER = DARTS_NUMBERS.length;
const POLYGON_ANGLE = (2 * Math.PI) / PARTS_NUMBER;

const DART_BOARD_RED_COLOR = 0xe3292e;
const DART_BOARD_GREEN_COLOR = 0x309f6a;
const DART_BOARD_YELLOW_COLOR = 0xf9dfbc;

const DART_MULTIPLE_POINTS_COLORS = [0xe3292e, 0x309f6a] as const;
const DART_POINTS_COLORS = [0x000000, DART_BOARD_YELLOW_COLOR] as const;

const createDartBorder = (x: number, y: number, radius: number) => {
  const resultContainer = new PIXI.Container();

  const outerCircle = new PIXI.Graphics().circle(x, y, radius).fill(0x000000);

  const dropShadowFilter = new PIXIFILTERS.DropShadowFilter({
    color: 0x000000,
    alpha: 0.5,
    blur: 6,
  });
  dropShadowFilter.antialias = "inherit";

  outerCircle.filters = [dropShadowFilter];

  resultContainer.addChild(outerCircle);

  DARTS_NUMBERS.forEach((number, index) => {
    const [textX, textY] = calculatePointOnCircle(
      x,
      y,
      radius - (1 / 20) * radius,
      index * POLYGON_ANGLE
    );

    const text = new PIXI.Text({
      text: number,
      style: {
        fontFamily: "short-stack",
        fill: 0xffffff,
        fontSize: (1 / 10) * radius,
      },
      x: textX,
      y: textY,
      anchor: { x: 0.5, y: 0.5 },
      rotation: index * ((2 * Math.PI) / 20),
    });

    resultContainer.addChild(text);
  });
  return resultContainer;
};

export const createDartBoard = (x: number, y: number, radius: number) => {
  const container = new PIXI.Container();
  const dartBorder = createDartBorder(x, y, radius);

  const innerCircle = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (5 / 6) * radius,
    colors: DART_POINTS_COLORS,
    parts: 20,
    angularShift: -(POLYGON_ANGLE / 2),
  });

  const triplePointsRing = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (5 / 6) * radius,
    width: (1 / 20) * radius,
    colors: DART_MULTIPLE_POINTS_COLORS,
    parts: 20,
    angularShift: -(POLYGON_ANGLE / 2),
  });

  const doublePointsRing = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (1 / 2) * radius,
    width: (1 / 20) * radius,
    colors: DART_MULTIPLE_POINTS_COLORS,
    parts: 20,
    angularShift: -(POLYGON_ANGLE / 2),
  });

  const outerBullCircle = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (1 / 5) * radius,
    colors: [DART_BOARD_GREEN_COLOR],
    parts: 1,
  });

  const bullCircle = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (1 / 9) * radius,
    colors: [DART_BOARD_RED_COLOR],
    parts: 1,
  });

  container.addChild(dartBorder);
  container.addChild(innerCircle);
  container.addChild(triplePointsRing);
  container.addChild(doublePointsRing);
  container.addChild(outerBullCircle);
  container.addChild(bullCircle);

  return container;
};
