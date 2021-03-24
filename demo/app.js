"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const raf_loop_1 = __importDefault(require("raf-loop"));
const demo_jpg_1 = __importDefault(require("url:../img/demo.jpg"));
const src_1 = __importDefault(require("../src"));
(async () => {
    const canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const img = new Image();
    img.src = demo_jpg_1.default;
    await new Promise((resolve) => {
        img.onload = resolve;
    });
    const blur = new src_1.default(canvas, img);
    blur.draw(2);
    const slider = document.querySelector("input");
    const output = document.getElementById("output");
    const blurRadius = 0;
    output.innerHTML = `Blur radius: ${blurRadius}`;
    let speed = 1;
    slider.oninput = () => {
        speed = parseInt(slider.value, 10);
    };
    let time = 0;
    function render(dt) {
        time += (dt * speed) / 1000;
        const anim = Math.sin(time) * 0.5 + 0.5;
        const iterations = 8;
        blur.draw(iterations, anim);
    }
    raf_loop_1.default(render).start();
})();
