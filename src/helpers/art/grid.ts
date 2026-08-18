export type GridCell = {
  x: number;
  y: number;
  center: { x: number; y: number };
  width: number;
  height: number;
  size?: number;
};

export type Grid = {
  grid: GridCell[][];
  iterableGrid: GridCell[];
  cellWidth: number;
  cellHeight: number;
  mergeCells: (x: number, y: number, xSpan?: number, ySpan?: number) => void;
};

const MakeGrid = ({
  width = 1,
  height = 1,
  rows = 10,
  columns = 10,
  margin = 0,
  spacing = 0,
}: {
  width?: number;
  height?: number;
  rows?: number;
  columns?: number;
  margin?: number;
  spacing?: number;
}): Grid => {
  const iterableGrid: GridCell[] = [];
  const grid: GridCell[][] = new Array(columns);
  const xOffset = (width - spacing * (columns - 1) - margin * 2) / columns;
  const yOffset = (height - spacing * (rows - 1) - margin * 2) / rows;
  const xInnerOffset = xOffset / 2;
  const yInnerOffset = yOffset / 2;

  for (let x = 0; x < grid.length; x++) {
    grid[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      const xCoord = margin + (xOffset + spacing) * x;
      const yCoord = margin + (yOffset + spacing) * y;
      const cell: GridCell = {
        x: xCoord,
        y: yCoord,
        center: { x: xCoord + xInnerOffset, y: yCoord + yInnerOffset },
        width: xOffset,
        height: yOffset,
      };
      grid[x][y] = cell;
      iterableGrid.push(cell);
    }
  }

  const mergeCells = (x: number, y: number, xSpan = 2, ySpan = 2) => {
    if (x + xSpan > columns) return;
    if (y + ySpan > rows) return;

    for (let xIndex = x; xIndex < x + xSpan; xIndex++) {
      for (let yIndex = y; yIndex < y + ySpan; yIndex++) {
        if (grid[xIndex][yIndex].size) return;
      }
    }
    const rootCell = grid[x][y];
    rootCell.width = xOffset * xSpan + spacing * (xSpan - 1);
    rootCell.height = yOffset * ySpan + spacing * (ySpan - 1);
    rootCell.center = {
      x: rootCell.x + rootCell.width / 2,
      y: rootCell.y + rootCell.height / 2,
    };
    rootCell.size = xSpan * ySpan;
    for (let xIndex = x; xIndex < x + xSpan; xIndex++) {
      for (let yIndex = y; yIndex < y + ySpan; yIndex++) {
        grid[xIndex][yIndex] = rootCell;
      }
    }
  };

  return {
    grid,
    iterableGrid,
    cellWidth: xOffset,
    cellHeight: yOffset,
    mergeCells,
  };
};

export default MakeGrid;
