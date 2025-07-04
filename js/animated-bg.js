// Floating SVG tech shapes background
const svgNS = "http://www.w3.org/2000/svg";
const colors = ["#00bfff", "#00fff7", "#ffffff", "#0ff1ce", "#1e90ff"];
const shapes = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createShape() {
  const type = ["hex", "circle", "line"][Math.floor(Math.random() * 3)];
  const size = random(30, 80);
  const x = random(0, window.innerWidth);
  const y = random(0, window.innerHeight);
  const color = colors[Math.floor(Math.random() * colors.length)];
  const opacity = random(0.12, 0.28);
  const speed = random(0.2, 0.7);
  let el;

  if (type === "hex") {
    el = document.createElementNS(svgNS, "polygon");
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push(
        (size * Math.cos(angle) + size) + "," + (size * Math.sin(angle) + size)
      );
    }
    el.setAttribute("points", points.join(" "));
    el.setAttribute("fill", color);
    el.setAttribute("opacity", opacity);
    el.setAttribute("transform", `translate(${x},${y})`);
  } else if (type === "circle") {
    el = document.createElementNS(svgNS, "circle");
    el.setAttribute("cx", size);
    el.setAttribute("cy", size);
    el.setAttribute("r", size * 0.7);
    el.setAttribute("fill", color);
    el.setAttribute("opacity", opacity);
    el.setAttribute("transform", `translate(${x},${y})`);
  } else if (type === "line") {
    el = document.createElementNS(svgNS, "rect");
    el.setAttribute("x", 0);
    el.setAttribute("y", size/2);
    el.setAttribute("width", size * 2);
    el.setAttribute("height", 3);
    el.setAttribute("fill", color);
    el.setAttribute("opacity", opacity * 0.7);
    el.setAttribute("rx", 2);
    el.setAttribute("transform", `translate(${x},${y}) rotate(${random(0,360)})`);
  }
  return {el, x, y, size, speed, type, dx: random(-0.3,0.3), dy: random(-0.2,0.2)};
}

function animateShapes(svg) {
  shapes.forEach(s => {
    s.x += s.dx * s.speed;
    s.y += s.dy * s.speed;
    // Wrap around
    if (s.x > window.innerWidth + 100) s.x = -100;
    if (s.x < -100) s.x = window.innerWidth + 100;
    if (s.y > window.innerHeight + 100) s.y = -100;
    if (s.y < -100) s.y = window.innerHeight + 100;
    s.el.setAttribute("transform", `translate(${s.x},${s.y})`);
  });
  requestAnimationFrame(() => animateShapes(svg));
}

function setupAnimatedBg() {
  let svg = document.getElementById("animated-bg-svg");
  if (svg) svg.remove();
  svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("id", "animated-bg-svg");
  svg.style.position = "fixed";
  svg.style.top = 0;
  svg.style.left = 0;
  svg.style.width = "100vw";
  svg.style.height = "100vh";
  svg.style.zIndex = 0;
  svg.style.pointerEvents = "none";
  svg.style.overflow = "visible";
  document.body.prepend(svg);
  shapes.length = 0;
  for (let i = 0; i < 22; i++) {
    const s = createShape();
    shapes.push(s);
    svg.appendChild(s.el);
  }
  animateShapes(svg);
}

window.addEventListener('DOMContentLoaded', setupAnimatedBg);
window.addEventListener('resize', setupAnimatedBg); 