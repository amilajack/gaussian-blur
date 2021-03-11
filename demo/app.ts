import Gaussian, { getBase64FromImageUrl } from "../src";
import imgSrc from "../img/demo.jpg";

(async () => {
  const canvas = document.querySelector("canvas")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const img = new Image();
  img.src = imgSrc;
  await new Promise(resolve => {
    img.onload = resolve
  });

  const blur = new Gaussian(canvas, img);
  blur.draw(12);

  const slider = document.querySelector("input") as HTMLInputElement;
  const output = document.getElementById("output") as HTMLInputElement;
  let blurRadius = 0;
  output.innerHTML = `Blur radius: ${blurRadius}`;

  slider.oninput = () => {
    blurRadius = Number(slider.value) * 0.1;
    output.innerHTML = `Blur radius: ${Math.round(blurRadius * 10) * 0.1}`;
    blur.setBlur(parseInt(blurRadius));
    blur.draw(12);
  };
})();
