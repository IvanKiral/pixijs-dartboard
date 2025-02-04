export const calculatePointOnCircle = (
  x: number,
  y: number,
  radius: number,
  angle: number
) => {
  const updatedAngle = (3 / 2) * Math.PI + angle;
  const pointX = x + radius * Math.cos(updatedAngle);
  const pointY = y + radius * Math.sin(updatedAngle);

  return [pointX, pointY] as const;
};
