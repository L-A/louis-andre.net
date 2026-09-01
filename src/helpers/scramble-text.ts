const REVEAL_RATE = 30; // 30 characters revealed per second
const SETTLE_DURATION = 200; // ms before the wave starts
const SETTLE_RATE = 45; // scrambles per second
const DEFAULT_CHARS = "a-zA-Z0-9!%#_";

export interface ScrambleTextOptions {
  text?: string;
  chars?: string;
  onChange?: (text: string, progress: number) => void;
}

type Handle = { cancel: () => void };

// Expand char ranges, e.g. "a-cD-F" → "abcDEF".
// "-" makes it a range. Inspired by anime.js
const expandRanges = (str: string): string => {
  let out = "";
  for (let i = 0, l = str.length; i < l; i++) {
    if (
      i + 2 < l &&
      str[i + 1] === "-" &&
      str.charCodeAt(i) < str.charCodeAt(i + 2)
    ) {
      for (let c = str.charCodeAt(i); c <= str.charCodeAt(i + 2); c++)
        out += String.fromCharCode(c);
      i += 2;
    } else out += str[i];
  }
  return out;
};

// Random integer in [min, max].
const rnd = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// A new animation on an element cancels the previous one.
const running = new WeakMap<HTMLElement, Handle>();

export const scrambleText = (
  element: HTMLElement,
  options: ScrambleTextOptions = {},
): Handle => {
  const { text, chars, onChange } = options;
  running.get(element)?.cancel();

  const characters = expandRanges(chars || DEFAULT_CHARS);
  const startingText = element.textContent ?? "";
  const targetText = text ?? startingText;
  const startLength = startingText.length;
  const endLength = targetText.length;

  // Growing text reveals left→right, shrinking text right→left.
  const animLength = Math.max(startLength, endLength);
  const ref = endLength < startLength ? startLength - 1 : 0;
  const order = Array.from({ length: animLength }, (_, i) => i).sort(
    (a, b) => Math.abs(a - ref) - Math.abs(b - ref),
  );

  const animDuration =
    (animLength - 1) * (1000 / REVEAL_RATE) + SETTLE_DURATION;
  const duration = Math.round(animDuration);
  const settleRatio = SETTLE_DURATION / animDuration;
  const settleSpacing = (1 - settleRatio) / animLength;
  const stepRatio = 1000 / (SETTLE_RATE * duration);

  // Per-character enter and settle times along the animation.
  const charStarts = new Float32Array(animLength);
  const charEnds = new Float32Array(animLength);
  order.forEach((i, n) => {
    charStarts[i] = n * settleSpacing;
    charEnds[i] =
      Math.ceil((charStarts[i] + settleRatio) / stepRatio) * stepRatio;
  });

  // Live scramble characters
  const charCache = new Array<string>(animLength);
  for (let c = 0; c < animLength; c++)
    charCache[c] = characters[rnd(0, characters.length - 1)];

  // Initial state: everything scrambled, spaces preserved.
  let fill = "";
  for (let c = 0; c < startLength; c++)
    fill += startingText[c] === " " ? " " : charCache[c];

  let lastValue = -1;
  let lastStep = -1;
  let lastBuilt = "";

  // Compose the text shown at given progress (0..1).
  const build = (v: number): string => {
    if (v === lastValue) return lastBuilt;
    lastValue = v;
    if (v >= 1) return targetText;
    if (v <= 0) return fill;

    const step = (v / stepRatio) | 0;
    const refresh = step !== lastStep;
    if (refresh) lastStep = step;

    const scramble = (c: number) => {
      if (refresh) charCache[c] = characters[rnd(0, characters.length - 1)];
      return charCache[c];
    };

    let scrambled = "";
    for (let c = 0; c < animLength; c++) {
      if (v >= charEnds[c]) {
        // Settled: The character is dropped if it's outside of the result's length
        if (c < endLength) scrambled += targetText[c];
      } else if (v < charStarts[c]) {
        if (c < startLength)
          scrambled += startingText[c] === " " ? " " : scramble(c);
      } else {
        // Active zone: scramble, but keep spaces
        const space =
          (c < endLength && targetText[c] === " ") ||
          (c < startLength && startingText[c] === " ");
        scrambled += space ? " " : scramble(c);
      }
    }
    return scrambled;
  };

  let frame: number | null = null;
  const startTime = performance.now();

  const handle: Handle = {
    cancel: () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      if (running.get(element) === handle) running.delete(element);
    },
  };
  running.set(element, handle);

  const render = (now: number) => {
    if (frame === null) return; // cancelled
    const v = Math.min(1, (now - startTime) / duration);
    const next = build(v);
    element.textContent = next;
    onChange?.(next, v);
    if (v < 1) frame = requestAnimationFrame(render);
    else frame = null;
  };

  // Paint the initial scramble synchronously, then animate.
  element.textContent = build(0);
  frame = requestAnimationFrame(render);

  return handle;
};
