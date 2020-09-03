import Gaussian from './'
import imgSrc from './demo.jpg'

(async () => {
  const blur = new Gaussian()
  await blur.setImage(imgSrc);
  let blurRadius = 0;
  blur.changeBlurRadius(blurRadius);

  const slider = document.querySelector('input');
  const output = document.getElementById('output');
  output.innerHTML = `Blur radius: ${blurRadius}`;

  slider.oninput = function() {
    blurRadius = this.value * 0.1
    output.innerHTML = `Blur radius: ${Math.round(blurRadius * 10) * 0.1}`;
    blur.changeBlurRadius(blurRadius);
  };
})()
