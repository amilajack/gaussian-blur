import loop from "raf-loop";
import Gaussian from "../src";
import imgSrc from "../img/demo.jpg";

(async () => {
  const canvas = document.querySelector("canvas")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const img = new Image();
  img.src = imgSrc;
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const blur = new Gaussian(canvas, img);
  blur.draw(2);

  const slider = document.querySelector("input") as HTMLInputElement;
  const output = document.getElementById("output") as HTMLInputElement;
  const blurRadius = 0;
  output.innerHTML = `Blur radius: ${blurRadius}`;

  let speed = 1;

  slider.oninput = () => {
    speed = parseInt(slider.value);
  };

  let time = 0;

  function render(dt: number) {
    time += (dt * speed) / 1000;
    const anim = Math.sin(time) * 0.5 + 0.5;
    const iterations = 8;
    blur.draw(iterations, anim);
  }

  loop(render).start();
})();
