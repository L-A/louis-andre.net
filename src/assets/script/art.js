const mulberry32 = (a) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const palette = ["#48118D", "#309CFF", "#F9B249", "#89B7E1"];

const draw = ({ context, width, height, seed }) => {
  const random = mulberry32(seed);

  context.fillStyle = "#2D244F";
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < 1000; i++) {
    context.fillStyle = palette[Math.floor(random() * palette.length)];
    context.lineWidth = 3 + random() * 12;
    context.beginPath();
    const x = random() * width;
    const y = random() * height;
    const radius = (0.01 + random() * 0.1) * Math.min(width, height);
    context.arc(x, y, radius, Math.PI * Math.random(), Math.PI * Math.random());
    context.fill();
  }
};

const canvas = document.querySelector(".art-canvas");
const context = canvas.getContext("2d");
const seedInput = document.querySelector("#seed");

let width = 0;
let height = 0;
let seed = String(Math.floor(Math.random() * 1e6));
seedInput.value = seed;

const newSeed = () => String(Math.floor(Math.random() * 1e6));

document.querySelector("#seed").addEventListener("input", (e) => {
  seed = e.target.value;
  draw({ context, width, height, seed });
});

// Draw the current generation at the canvas' current size (device pixels)
const resize = () => {
  const rect = canvas.getBoundingClientRect();
  width = Math.max(1, Math.round(rect.width * window.devicePixelRatio));
  height = Math.max(1, Math.round(rect.height * window.devicePixelRatio));
  canvas.width = width;
  canvas.height = height;
  draw({ context, width, height, seed });
};

window.addEventListener("resize", resize);

document.querySelector("#new-generation").addEventListener("click", () => {
  seed = newSeed();
  document.querySelector("#seed").value = seed;
  draw({ context, width, height, seed });
});

// Initial draw on load
resize();
