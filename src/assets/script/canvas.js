import { createRandom } from "../../helpers/art/random";
import Setup from "../../helpers/art/art";
import { Palettes } from "../../helpers/art/palettes";

const canvas = document.querySelector(".art-canvas");
const context = canvas.getContext("2d");
const seedInput = document.querySelector("#seed");
const newGenerationButton = document.querySelector("#new-generation");
const speedButton = document.querySelector("#speed");
const shuffleButton = document.querySelector("#shuffle");
const traitButtons = document.querySelectorAll("[data-trait]");

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
const applyTraits = (next) => {
  traits = next;
  for (const button of traitButtons)
    button.innerText = traits[button.dataset.trait];
};
applyTraits(traits);

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

for (const button of traitButtons) {
  button.addEventListener("click", () => {
    const name = button.dataset.trait;
    const options = traitOptions[name];
    const next = options[(options.indexOf(traits[name]) + 1) % options.length];
    applyTraits({ ...traits, [name]: next });
    regenerate();
    startAnimation();
  });
}

seedInput.addEventListener("input", (e) => {
  seed = e.target.value;
  regenerate();
  startAnimation();
});

shuffleButton.addEventListener("click", () => {
  applyTraits(randomTraits(createRandom(newSeed())));
  regenerate();
  startAnimation();
});

speedButton.addEventListener("click", () => {
  drawOptions.slow = !drawOptions.slow;
  speedButton.innerText = drawOptions.slow ? "Slow" : "Fast";
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
