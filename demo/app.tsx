import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import loop, { Start } from "raf-loop";
import imgSrc from "url:../img/demo.jpg";
import { useControls } from "leva";
import Gaussian from "../src";

type Props = {
  radius: number;
  speed: number;
  iterations: number;
  animate: boolean;
};

function Blur({
  radius = 1,
  iterations = 8,
  speed = 1,
  animate = true,
}: Props) {
  useEffect(() => {
    const canvas = document.querySelector("canvas")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = new Image();
    img.src = imgSrc;

    let blur: Gaussian;
    let rafId: Start;
    img.onload = () => {
      blur = new Gaussian(canvas, img);
      blur.draw(iterations, radius);
      let time = 0;
      function render(dt: number) {
        time += (dt * speed) / 1000;
        const anim = Math.sin(time) * 0.5 + 0.5;
        blur.draw(iterations, anim);
      }
      if (animate) {
        rafId = loop(render).start();
      }
    };

    return () => {
      blur?.destroy();
      rafId?.stop();
    };
  });

  return <div />;
}

function Demo() {
  const controls = useControls({
    animate: true,
    radius: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    speed: {
      value: 2,
      min: 1,
      max: 10,
      step: 1,
    },
    iterations: {
      value: 8,
      min: 1,
      max: 10,
      step: 1,
    },
  });

  return <Blur {...controls} />;
}

ReactDOM.render(<Demo />, document.querySelector("#root"));
