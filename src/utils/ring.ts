import * as PIXI from "pixi.js";
import { range } from "./common";
import { DARTS_NUMBERS } from "./constants";

type CircleParams = {
  startX: number;
  startY: number;
  radius: number;
  width?: number;
  colors: ReadonlyArray<number>;
  parts: number;
  throwPrefix: "" | "D" | "T";
  angularShift?: number;
  onClick?: (clicked: string) => void;
};

export const createDartPointsCircle = ({
  startX,
  startY,
  radius,
  width,
  colors,
  parts,
  onClick,
  throwPrefix,
  angularShift = 0,
}: CircleParams) => {
  const result = new PIXI.Container();
  const angle = (3 * Math.PI) / 2;
  range(0, parts - 1).forEach((i) => {
    const startAngle = angle + i * ((2 * Math.PI) / parts) + angularShift;
    const endAngle = angle + (i + 1) * ((2 * Math.PI) / parts) + angularShift;

    const circlePart = width
      ? createRingPart(startX, startY, radius, width, startAngle, endAngle)
      : createCirclePart(startX, startY, radius, startAngle, endAngle);

    circlePart.tint = colors[i % colors.length];

    circlePart.eventMode = "static";

    circlePart.on("mouseover", () => {
      circlePart.tint = 0xd3d3d3;
    });

    circlePart.on("mouseleave", () => {
      circlePart.tint = colors[i % colors.length];
    });

    circlePart.on("click", () => {
      console.log(i);
      onClick?.(`${throwPrefix}${DARTS_NUMBERS[i]}`);
    });

    result.addChild(circlePart);
  });

  return result;
};

const createCirclePart = (
  startX: number,
  startY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) =>
  new PIXI.Graphics()
    .moveTo(startX, startY)
    .arc(startX, startY, radius, startAngle, endAngle)
    .lineTo(startX, startY)
    .fill(0xffffff);

const createRingPart = (
  startX: number,
  startY: number,
  radius: number,
  width: number,
  startAngle: number,
  endAngle: number
) =>
  new PIXI.Graphics()
    .arc(startX, startY, radius, startAngle, endAngle)
    .arc(startX, startY, radius - width, endAngle, startAngle, true)
    .closePath()
    .fill(0xffffff);
