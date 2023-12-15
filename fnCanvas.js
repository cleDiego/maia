const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

var width = window.innerWidth;
var height = window.innerHeight;
var wCenter = width / 2;
var hCenter = height / 2;

canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  wCenter = width / 2;
  hCenter = height / 2;
  canvas.width = width;
  canvas.height = height;
});

function rand() {
  return Math.random();
}

function cos(a) {
  return Math.cos(a);
}

function sin(a) {
  return Math.sin(a);
}

function pi() {
  return Math.PI;
}

function pi2() {
  return 2 * pi();
}

function angle(a) {
  return pi() / 180 * a;
}

function randNumberBetween(a, b, c = false) {
  return c
    ? Math.round(a + Math.random() * (b - a))
    : a + Math.random() * (b - a);
}

function randP() {
  return {
    x: rand() * width,
    y: rand() * height,
  };
}

function randPosRadius(r) {
  const a = rand() * 2 * Math.PI;
  const x = wCenter + r * Math.cos(a);
  const y = hCenter + r * Math.sin(a);
  return { x: x, y: y };
}

function randPRP(pos, r) {
  const a = rand() * 2 * Math.PI;
  const x = pos.x + r * Math.cos(a);
  const y = pos.y + r * Math.sin(a);
  return { x: x, y: y };
}

function arc(ctx, x, y, r, sa, ea, styleType, style) {
  ctx.beginPath();
  ctx.arc(x, y, r, sa, ea);

  switch(styleType) {
    case 'fill':
      ctx.fillStyle = style;
      ctx.fill();
      break;
    case 'stroke':
      ctx.strokeStyle = style;
      ctx.stroke();
      break;
  }
  ctx.closePath();
}
