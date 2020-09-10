import Gaussian from "../src";
import imgSrc from "../img/demo.jpg";

(async () => {
  const blur = new Gaussian();
  await blur.setImage(imgSrc);
  let blurRadius = 0;
  blur.changeBlurRadius(blurRadius);

  const slider = document.querySelector("input") as HTMLInputElement;
  const output = document.getElementById("output") as HTMLInputElement;
  output.innerHTML = `Blur radius: ${blurRadius}`;

  slider.oninput = () => {
    blurRadius = Number(slider.value) * 0.1;
    output.innerHTML = `Blur radius: ${Math.round(blurRadius * 10) * 0.1}`;
    blur.changeBlurRadius(blurRadius);
  };
})();
