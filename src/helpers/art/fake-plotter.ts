type NoiseFunction = (x?: number, y?: number, time?: number) => number;
type RangeFunction = (min: number, max: number) => number;

const sq = (num: number) => num * num;
const distance = (
  start: { x: number; y: number },
  end: { x: number; y: number },
) => Math.sqrt(sq(start.x - end.x) + sq(start.y - end.y));
const lineProportionatePosition = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  ratio: number,
) => ({
  x: start.x + (end.x - start.x) * ratio,
  y: start.y + (end.y - start.y) * ratio,
});

let drynessStep = 0;

export default class Pen {
  private noise: NoiseFunction;
  private range: RangeFunction;
  private context: CanvasRenderingContext2D;

  currentPosition = { x: 0, y: 0 };
  scale = 1;

  lineWidth = 1;
  scatter = 0.5;
  dryness = 0.02;
  sizeJitter = 0.5;
  drynessStrengthOnSize = 0.2;
  recording = false;
  history: [number, number][][] = [];

  constructor(
    context: CanvasRenderingContext2D,
    noise: NoiseFunction,
    range: RangeFunction,
  ) {
    if (!context) throw "No context provided";
    this.noise = noise;
    this.range = range;
    this.context = context;
  }

  moveTo(x: number, y: number) {
    this.currentPosition = { x: x, y: y };
    if (this.recording) this.history.push([[x, y]]);
  }

  lineTo(destinationX: number, destinationY: number) {
    if (this.lineWidth == 0) return;
    const x1 = this.currentPosition.x,
      y1 = this.currentPosition.y,
      x2 = destinationX,
      y2 = destinationY;
    const distance = Math.sqrt(sq(x1 - x2) + sq(y2 - y1));
    const steps = distance / this.lineWidth;
    const xIncrement = (x2 - x1) / steps;
    const yIncrement = (y2 - y1) / steps;
    if (distance == 0) return;

    this.context.save();
    this.context.beginPath();
    for (let step = 0; step <= steps; step++) {
      const drynessNoise = this.noise(drynessStep++) * 0.5 + 0.5;
      const size =
        (this.lineWidth +
          this.range(-0.5, 0.5) * this.lineWidth * this.sizeJitter) *
        (1 - drynessNoise * this.drynessStrengthOnSize);
      const scatterX = this.range(-0.5, 0.5) * size * this.scatter;
      const scatterY = this.range(-0.5, 0.5) * size * this.scatter;
      this.context.ellipse(
        x1 + xIncrement * step + scatterX,
        y1 + yIncrement * step + scatterY,
        size,
        size,
        0,
        0,
        Math.PI * 2,
      );
    }
    this.context.fillStyle = this.context.strokeStyle;
    this.context.fill();
    this.context.restore();

    this.currentPosition = { x: destinationX, y: destinationY };
    if (this.recording)
      this.history[this.history.length - 1].push([destinationX, destinationY]);
  }

  circle(x: number, y: number, radius: number) {
    const startingPosition = this.currentPosition;
    this.moveTo(x + radius, y);
    const steps = (radius * 2 * Math.PI) / this.lineWidth;
    for (let i = 0; i <= 1.01; i += 1 / steps) {
      const xPos = x + Math.cos(i * Math.PI * 2) * radius;
      const yPos = y + Math.sin(i * Math.PI * 2) * radius;
      this.lineTo(xPos, yPos);
    }
    this.currentPosition = startingPosition;
  }

  fillCircle(x: number, y: number, radius: number) {
    this.context.beginPath();
    this.context.fillStyle = this.context.strokeStyle;
    this.context.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
    this.context.fill();
    this.circle(x, y, radius);
  }

  rect(x: number, y: number, width: number, height: number) {
    this.moveTo(x, y);
    this.lineTo(x + width, y);
    this.lineTo(x + width, y + height);
    this.lineTo(x, y + height);
    this.lineTo(x, y);
  }

  fillRect(x: number, y: number, width: number, height: number) {
    this.context.fillStyle = this.context.strokeStyle;
    this.context.fillRect(x, y, width, height);
    this.rect(x, y, width, height);
  }

  curve(points: { x: number; y: number }[]) {
    const centerPoints = points.slice(0, -1).map((p, i) => {
      const x = (p.x + points[i + 1].x) / 2;
      const y = (p.y + points[i + 1].y) / 2;
      return { x, y };
    });

    centerPoints.slice(0, -1).forEach((point, i) => {
      const controlPoint = points[i + 1];
      const nextPoint = centerPoints[i + 1];

      const numberOfSegments = Math.floor(
        distance(point, nextPoint) / this.lineWidth,
      );

      this.moveTo(point.x, point.y);
      for (let r = 0; r < 1 + 1 / numberOfSegments; r += 1 / numberOfSegments) {
        const controlStart = lineProportionatePosition(point, controlPoint, r);
        const controlEnd = lineProportionatePosition(
          controlPoint,
          nextPoint,
          r,
        );
        const position = lineProportionatePosition(controlStart, controlEnd, r);
        this.lineTo(position.x, position.y);
      }
    });
  }
}
