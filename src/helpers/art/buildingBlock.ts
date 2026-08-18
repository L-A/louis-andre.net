import type { Random } from "./random";

export type Block = {
  type: "block";
  x: number;
  y: number;
  width: number;
  height: number;
  grid: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  repeat?: [number, number, number];
  filled: boolean;
  rawValue: number;
  colorIndex: number | undefined;
  circle: boolean;
  surface: number;
};

export interface Config {
  columns: number;
  rows: number;
  margin: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  repeatDirection: "h" | "v";
  fillChance: number;
  repeatChance: number;
  circleChance: number;
}

const SetupPlaceBlock = (
  prng: Random,
  noise: (x: number, y: number, time: number) => number,
  c: Config,
  cellWidth: number,
  cellHeight: number,
) => {
  const placeBlock = (
    centerX: number,
    centerY: number,
    sizeMultiplier: number = 1,
  ): Block => {
    const { range, rangeFloor, chance, pick } = prng;

    const gridWidth = Math.floor(
      range(Math.max(c.columns * c.minWidth, 1), c.maxWidth * c.columns) *
        sizeMultiplier,
    );
    const gridHeight = Math.floor(
      range(Math.max(c.rows * c.minHeight, 1), c.rows * c.maxHeight) *
        sizeMultiplier,
    );

    const gridX = Math.floor(
      Math.max(0, Math.min(c.columns - gridWidth, centerX - gridWidth / 2)),
    );
    const gridY = Math.floor(
      Math.max(0, Math.min(c.rows - gridHeight, centerY - gridHeight / 2)),
    );

    const x = c.margin + gridX * cellWidth;
    const y = c.margin + gridY * cellHeight;

    const rawValue = noise(gridX + gridWidth / 2, gridY + gridHeight / 2, 0);

    const width = gridWidth * cellWidth;
    const height = gridHeight * cellHeight;

    const repeatDelta = pick([-1, 1]);

    const maxRepeats =
      c.repeatDirection == "h"
        ? repeatDelta > 0
          ? c.columns - (gridX + gridWidth)
          : gridX
        : repeatDelta > 0
          ? c.rows - (gridY + gridHeight)
          : gridY;

    const repeat: [number, number, number] = [
      rangeFloor(1, maxRepeats),
      c.repeatDirection == "h" ? repeatDelta * cellWidth : 0,
      c.repeatDirection == "v" ? repeatDelta * cellHeight : 0,
    ];

    const filled = repeat[0] !== 1 || chance(c.fillChance);

    const surface = gridWidth * gridHeight * (filled ? 4 : 1);

    const block: Block = {
      type: "block",
      x,
      y,
      width,
      height,
      filled,
      rawValue,
      colorIndex: 0,
      repeat: chance(c.repeatChance) ? repeat : undefined,
      grid: {
        x: gridX,
        y: gridY,
        width: gridWidth,
        height: gridHeight,
      },
      circle: chance(c.circleChance),
      surface,
    };

    return block;
  };

  return placeBlock;
};

export default SetupPlaceBlock;
