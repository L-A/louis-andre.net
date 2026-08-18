const createGenerator = (value: () => number) => {
  const chance = (n = 0.5) => value() < n;
  const bool = chance;

  const range = (min: number, max: number) => {
    const delta = max - min;
    return value() * delta + min;
  };

  const rangeFloor = (min: number, max: number) => Math.floor(range(min, max));

  const pick = <T>(array: T[]): T => array[rangeFloor(0, array.length)];

  const weighted = (weights: number[]) => {
    const totalWeight = weights.reduce((a, b) => a + b);

    let random = value() * totalWeight;
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        return i;
      }
      random -= weights[i];
    }
    return 0;
  };

  const gaussian = (stdev = 0.5, mean = 0.5, clamp = false): number => {
    const u = 1 - value();
    const v = value();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    const result = z * stdev + mean;
    if (clamp && (result < 0 || result > 1))
      return gaussian(stdev, mean, clamp);
    return result;
  };

  return {
    value,
    chance,
    bool,
    range,
    rangeFloor,
    pick,
    weighted,
    gaussian,
  };
};

export type Random = ReturnType<typeof createGenerator>;

export const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const hashSeed = (seed: string): number => {
  let hash = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(hash ^ seed.charCodeAt(i), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
  hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
  hash ^= hash >>> 16;
  return hash >>> 0;
};

export const createRandom = (seed: string): Random =>
  createGenerator(mulberry32(hashSeed(seed)));

export default createGenerator;
