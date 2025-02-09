import { onCleanup, onMount } from "solid-js";
import { useApplication } from "./PixiApplication";
import { createDartPointsCircle } from "./utils/ring";
import { calculatePointOnCircle } from "./utils/math";

import * as PIXIFILTERS from "pixi-filters";
import {
  DART_BOARD_GREEN_COLOR,
  DART_BOARD_RED_COLOR,
  DART_MULTIPLE_POINTS_COLORS,
  DART_POINTS_COLORS,
  DARTS_NUMBERS,
} from "./utils/constants";
import * as PIXI from "pixi.js";

type PixiDartsProps = {
  onClick?: (clicked: string) => void;
};

export const PixiDarts = (props: PixiDartsProps) => {
  const app = useApplication();
  let dartBoard = new PIXI.Container();

  onMount(() => {
    const { x, y, radius } = calculateDartProps(app);
    dartBoard = createDartBoard(x, y, radius, props.onClick);
    app?.stage.addChild(dartBoard);

    window?.addEventListener?.("resize", resizeHandle);
  });

  onCleanup(() => {
    window.removeEventListener("resize", resizeHandle);
    app?.stage.removeChild(dartBoard);
  });

  const resizeHandle = () => {
    app?.stage.removeChild(dartBoard);

    const { x, y, radius } = calculateDartProps(app);
    dartBoard = createDartBoard(x, y, radius, props.onClick);

    app?.stage.addChild(dartBoard);
  };

  return null;
};

const calculateDartProps = (
  app: PIXI.Application<PIXI.Renderer> | undefined
) => {
  const x = ((app?.screen.width ?? 0) - 5) / 2;
  const y = ((app?.screen.height ?? 0) - 5) / 2;
  const radius = Math.min(x, y) - 10;

  return { x, y, radius };
};

const PARTS_NUMBER = DARTS_NUMBERS.length;
const POLYGON_ANGLE = (2 * Math.PI) / PARTS_NUMBER;

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

const createDartBoard = (
  x: number,
  y: number,
  radius: number,
  onClick?: (clicked: string) => void
) => {
  const container = new PIXI.Container();
  const dartBorder = createDartBorder(x, y, radius);

  const innerCircle = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (5 / 6) * radius,
    colors: DART_POINTS_COLORS,
    parts: 20,
    angularShift: -(POLYGON_ANGLE / 2),
    throwPrefix: "",
    onClick,
  });

  const doublePointsRing = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (5 / 6) * radius,
    width: (1 / 20) * radius,
    colors: DART_MULTIPLE_POINTS_COLORS,
    parts: 20,
    angularShift: -(POLYGON_ANGLE / 2),
    throwPrefix: "D",
    onClick,
  });

  const triplePointsRing = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (1 / 2) * radius,
    width: (1 / 20) * radius,
    colors: DART_MULTIPLE_POINTS_COLORS,
    parts: 20,
    angularShift: -(POLYGON_ANGLE / 2),
    throwPrefix: "T",
    onClick,
  });

  const outerBullCircle = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (1 / 5) * radius,
    colors: [DART_BOARD_GREEN_COLOR],
    parts: 1,
    throwPrefix: "",
  });

  const bullCircle = createDartPointsCircle({
    startX: x,
    startY: y,
    radius: (1 / 9) * radius,
    colors: [DART_BOARD_RED_COLOR],
    parts: 1,
    throwPrefix: "",
  });

  container.addChild(dartBorder);
  container.addChild(innerCircle);
  container.addChild(triplePointsRing);
  container.addChild(doublePointsRing);
  container.addChild(outerBullCircle);
  container.addChild(bullCircle);

  return container;
};
