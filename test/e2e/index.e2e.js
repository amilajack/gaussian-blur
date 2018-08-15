fixture`Basic`.page('./index.html');

test('it should initialize', async t => {
  await t.eval(() => {
    // eslint-disable-next-line
    const blur = new GaussianBlur();
    blur
      .setImage('../../src/demo.jpg')
      .then(() => {
        let blurRadius = 0;
        blur.changeBlurRadius(blurRadius);

        const slider = document.querySelector('input');
        const output = document.getElementById('output');
        output.innerHTML = `Blur radius: ${blurRadius}`;

        slider.oninput = function oninput() {
          blurRadius = this.value * 0.1;
          output.innerHTML = `Blur radius: ${Math.round(blurRadius * 10) *
            0.1}`;
          blur.changeBlurRadius(blurRadius);
        };

        slider.value = 5;

        return blur;
      })
      .catch(console.log);
  });
});
