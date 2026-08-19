import { createRandom } from "../../helpers/art/random";
import Setup from "../../helpers/art/art";
import { Palettes } from "../../helpers/art/palettes";

const canvas = document.querySelector(".art-canvas");
const context = canvas.getContext("2d");
const seedInput = document.querySelector("#seed");
const newGenerationButton = document.querySelector("#new-generation");
const speedButton = document.querySelector("#speed");
const shuffleButton = document.querySelector("#shuffle");
const gridButton = document.querySelector("#grid-scale");
const paletteButton = document.querySelector("#palette");

const newSeed = () => String(Math.floor(Math.random() * 1e6));

const traitOptions = {
  "Grid Scale": ["Large", "Medium", "Small"],
  Palette: Object.keys(Palettes),
  Symmetry: ["Yes", "Imperfect"],
  "Draw Count": ["Sparse", "Normal", "Busy"],
};

const randomTraits = (random) => ({
  "Grid Scale": random.pick(traitOptions["Grid Scale"]),
  Palette: random.pick(traitOptions.Palette),
  Symmetry: random.chance(9 / 10) ? "Yes" : "Imperfect",
  "Draw Count": random.chance(9 / 10)
    ? "Normal"
    : random.chance()
      ? "Sparse"
      : "Busy",
});

let drawOptions = {
  outlines: false,
  grayscale: false,
  flat: false,
  slow: true,
};

let width = 0;
let height = 0;
let seed = newSeed();
seedInput.value = seed;

let traits = randomTraits(createRandom(seed));

const cycleTrait = (trait) => {
  const options = traitOptions[trait];
  const current = options.indexOf(traits[trait]);
  const next = (current + 1) % options.length;
  traits = { ...traits, [trait]: options[next] };
  regenerate();
  startAnimation();
  updateButtonStates();
};

const updateButtonStates = () => {
  if (traits.slow) {
    speedButton.querySelector(".speed-icon").classList.add("slow");
  } else {
    speedButton.querySelector(".speed-icon").classList.remove("slow");
  }
  gridButton.querySelector(".icon").dataset.size = traits["Grid Scale"];

  const [color1, color2, color3, color4, color5, color6, color7] =
    Palettes[traits["Palette"]];
  paletteButton.querySelector(".icon").style =
    `--color-1: ${color1}; --color-2: ${color4}; --color-3: ${color7};`;
};

const shuffleAll = () => {
  seed = newSeed();
  seedInput.value = seed;
  traits = randomTraits(createRandom(seed));
  regenerate();
  startAnimation();
  updateButtonStates();
};

let art;
let frameId;
let complete = true;

const regenerate = () => {
  art = Setup(context, createRandom(seed), { traits });
};

const tick = () => {
  art.Draw(() => (complete = true), width, height, drawOptions);
  if (!complete) frameId = requestAnimationFrame(tick);
};

const startAnimation = () => {
  complete = false;
  cancelAnimationFrame(frameId);
  frameId = requestAnimationFrame(tick);
};

const resize = () => {
  const rect = canvas.getBoundingClientRect();
  width = Math.max(1, Math.round(rect.width * window.devicePixelRatio));
  height = Math.max(1, Math.round(rect.height * window.devicePixelRatio));
  canvas.width = width;
  canvas.height = height;
  art?.Reset();
  startAnimation();
};

seedInput.addEventListener("input", (e) => {
  seed = e.target.value;
  regenerate();
  startAnimation();
});

shuffleButton.addEventListener("click", () => {
  shuffleAll();
  regenerate();
  startAnimation();
});

speedButton.addEventListener("click", () => {
  drawOptions.slow = !drawOptions.slow;
  speedButton.querySelector(".speed-icon").classList.toggle("fast");
  regenerate();
  startAnimation();
});

gridButton.addEventListener("click", () => {
  cycleTrait("Grid Scale");
  regenerate();
  startAnimation();
});

paletteButton.addEventListener("click", () => {
  cycleTrait("Palette");
  regenerate();
  startAnimation();
});

newGenerationButton.addEventListener("click", () => {
  seed = newSeed();
  seedInput.value = seed;
  regenerate();
  startAnimation();
});

window.addEventListener("resize", resize);

regenerate();
resize();
updateButtonStates();
