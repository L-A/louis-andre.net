import type { Random } from "./random";
import { fieldNoiseCycle } from "./simplex";
import MakeGrid from "./grid";
import Pen from "./fake-plotter";
import SetupPlaceBlock, { type Block } from "./buildingBlock";
import { Palettes, type PalettesType } from "./palettes";

export type Traits = {
  "Grid Scale": "Large" | "Medium" | "Small";
  Palette: keyof PalettesType;
  Symmetry: "Yes" | "Imperfect";
  "Draw Count": "Sparse" | "Normal" | "Busy";
};

interface DrawParameters {
  width: number;
  height: number;
  traits: Traits;
}

export type Floor = {
  left: number;
  right: number;
  y: number;
  z: number;
};

interface DrawOptions {
  outlines: boolean;
  grayscale: boolean;
  flat: boolean;
  slow: boolean;
}

const Setup = (
  context: CanvasRenderingContext2D,
  prng: Random,
  { traits }: DrawParameters,
) => {
  const { value, range, rangeFloor, pick, chance, gaussian } = prng;

  const repeatDirection = pick(["h", "v"]) as "h" | "v";

  const c = {
    // Grid
    margin: 0,
    columns: { Large: 20, Medium: 40, Small: 60 }[traits["Grid Scale"]],
    rows: { Large: 20, Medium: 40, Small: 60 }[traits["Grid Scale"]],

    // Main drawing
    blockSteps: { Busy: 180, Sparse: 70, Normal: 120 }[traits["Draw Count"]],
    stdFromCenter: range(0.12, 0.18),
    fillChance: pick([3 / 4, 4 / 5, 19 / 20]),
    minWidth: range(1 / 20, 1 / 10),
    minHeight: range(1 / 20, 1 / 10),
    maxWidth: range(1 / 3, 2 / 3),
    maxHeight: range(1 / 3, 2 / 3),
    repeatChance: 1 / rangeFloor(4, 8),
    repeatDivision: 1 / rangeFloor(4, 6),
    repeatDirection,
    circleChance: pick([1 / 4, 1 / 3, 1 / 2]),

    // Noise properties
    reflectedPositionXchance: { Yes: 1, Imperfect: 7 / 8 }[traits["Symmetry"]],
    reflectedPositionYchance: pick([1, 7 / 8, 1 / 2, 1 / 8, 1 / 16]),

    // Palette
    steps: rangeFloor(20, 24),
  };

  // Noise
  const noiseSource = fieldNoiseCycle(value, 0.1, 1);

  const noise = (x: number, y: number, time: number) => {
    return noiseSource(x, y, time);
  };

  // Palette
  const palette = Palettes[traits.Palette];

  const [bg, ...fgs] = palette;

  // Utilities
  const map = (
    value: number,
    min: number,
    max: number,
    newMin = 0,
    newMax = 1,
  ) => ((value - min) / (max - min)) * (newMax - newMin) + newMin;

  const { cellHeight, cellWidth } = MakeGrid({
    width: 1,
    height: 1,
    margin: c.margin,
    columns: c.columns,
    rows: c.rows,
  });

  const buildNewBlocks = () => {
    const placeBlock = SetupPlaceBlock(prng, noise, c, cellWidth, cellHeight);

    let blocks: Block[] = [];

    const position = {
      x: Math.floor(value() * c.rows),
      y: Math.floor(value() * c.columns),
    };

    // Drawing blocks
    for (let step = 0; step < c.blockSteps; step++) {
      const dX = pick([1, 2, 3]);
      const dY = pick([1, 2, 4]);

      position.x = (position.x + dX + c.columns * 2) % c.columns;
      position.y = (position.y + dY + c.rows * 2) % c.rows;

      const sizeMultiplier = gaussian(0.15, 0.75, true);

      const block = placeBlock(position.x, position.y, sizeMultiplier);
      if (block) blocks.push(block);

      const reflectX = chance(c.reflectedPositionXchance);
      const reflectY = chance(c.reflectedPositionYchance);

      if (reflectX) {
        const reflectedBlock = Object.assign({}, block);
        reflectedBlock.x =
          c.margin + (c.columns - block.grid.x - block.grid.width) * cellWidth;
        if (block.repeat)
          reflectedBlock.repeat = [
            block.repeat[0],
            -block.repeat[1],
            block.repeat[2],
          ];
        blocks.push(reflectedBlock);
        step++;
      }

      if (reflectY) {
        const reflectedBlock = Object.assign({}, block);
        reflectedBlock.y =
          c.margin + (c.rows - block.grid.y - block.grid.height) * cellHeight;
        if (block.repeat)
          reflectedBlock.repeat = [
            block.repeat[0],
            block.repeat[1],
            -block.repeat[2],
          ];
        blocks.push(reflectedBlock);
        step++;
      }

      if (reflectX && reflectY) {
        const reflectedBlock = Object.assign({}, block);
        reflectedBlock.x =
          c.margin + (c.columns - block.grid.x - block.grid.width) * cellWidth;
        reflectedBlock.y =
          c.margin + (c.rows - block.grid.y - block.grid.height) * cellHeight;
        if (reflectedBlock.repeat)
          reflectedBlock.repeat = [
            block.repeat[0],
            -block.repeat[1],
            -block.repeat[2],
          ];
        blocks.push(reflectedBlock);
        step++;
      }
    }

    // Preparing all shapes
    const minValue = Math.min(
      0.2,
      blocks.reduce((min, { rawValue }) => Math.min(min, rawValue), 1),
    );

    const maxValue = Math.max(
      0.8,
      blocks.reduce((max, { rawValue }) => Math.max(max, rawValue), 0),
    );

    blocks = blocks
      .sort((a, b) => b.surface - a.surface)
      .map((item) => {
        const adjustedValue = map(item.rawValue, minValue, maxValue, 0, 0.999);
        return {
          ...item,
          colorIndex: Math.floor(adjustedValue * fgs.length),
        };
      });

    return blocks;
  };

  // Generate
  let blocks = buildNewBlocks();

  // Drawing controls
  let iteration = -1;

  const Reset = () => (iteration = -1);

  const Cycle = () => {
    blocks = buildNewBlocks();
    Reset();
  };

  let drawBlock = (
    position: number,
    pen: Pen,
    margin: number,
    xAt: (x: number) => number,
    yAt: (y: number) => number,
    { outlines, grayscale, flat }: DrawOptions,
  ) => {
    const { x, y, height, width, filled, colorIndex, repeat, circle } =
      blocks[position];

    context.strokeStyle = flat ? fgs[0] : grayscale ? "#ccc" : fgs[colorIndex];

    if (filled && !outlines) {
      if (circle)
        pen.fillCircle(
          margin + xAt(x + width / 2),
          margin + yAt(y + height / 2),
          Math.min(xAt(width), yAt(height)) / 2,
        );
      else
        pen.fillRect(margin + xAt(x), margin + yAt(y), xAt(width), yAt(height));
    }

    if (!filled || outlines || flat || grayscale) {
      if (grayscale || flat)
        context.strokeStyle = flat ? fgs[fgs.length - 2] : "#000d3a";
      if (circle)
        pen.circle(
          margin + xAt(x + width / 2),
          margin + yAt(y + height / 2),
          Math.min(xAt(width), yAt(height)) / 2,
        );
      else pen.rect(margin + xAt(x), margin + yAt(y), xAt(width), yAt(height));
    }

    if (repeat) {
      const [steps, dX, dY] = repeat;
      for (let step = 1; step < steps; step++) {
        if (circle)
          pen.circle(
            margin + xAt(x + dX * step + width / 2),
            margin + yAt(y + dY * step + height / 2),
            Math.min(xAt(width), yAt(height)) / 2,
          );
        else {
          pen.rect(
            margin + xAt(x + dX * step),
            margin + yAt(y + dY * step),
            xAt(width),
            yAt(height),
          );
        }
      }
    }
  };

  const Draw = (
    doneCallback: () => void,
    width: number,
    height: number,
    drawOptions: DrawOptions,
  ) => {
    // True dimensions
    const margin = c.margin * Math.min(width, height);
    const xAt = (x: number) => x * (width - margin * 2);
    const yAt = (y: number) => y * (height - margin * 2);

    // Track time
    const start = Date.now();

    // Drawing
    const pen = new Pen(
      context,
      (x: number, y: number) => noise(x, y, 0),
      range,
    );
    pen.lineWidth = width / 600;

    // First frame
    if (iteration == -1) {
      context.fillStyle = drawOptions.grayscale
        ? drawOptions.flat
          ? fgs[fgs.length - 1]
          : "#fff"
        : bg;
      context.fillRect(0, 0, width, height);
      iteration++;
    }

    // Drawing done
    if (iteration >= blocks.length) {
      if (iteration == blocks.length) doneCallback();
      iteration++;
      return;
    }

    const drawLimit = drawOptions.slow ? 1 : Infinity;
    let drawn = 0;

    while (
      Date.now() - start < 14 &&
      drawn++ < drawLimit &&
      iteration < blocks.length
    ) {
      if (!drawOptions.grayscale && !drawOptions.flat) {
        context.globalCompositeOperation = "hard-light";
        context.fillStyle = bg + pick(["00", "01", "02"]);
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = "source-over";
      }
      drawBlock(iteration, pen, margin, xAt, yAt, drawOptions);
      iteration++;
    }
  };

  return { Draw, Reset, Cycle, Config: c };
};

export default Setup;
