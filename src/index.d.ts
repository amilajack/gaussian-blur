export default class Gaussian {
    gl: WebGL2RenderingContext;
    private shader;
    private texture;
    private fboA;
    private fboB;
    constructor(canvas: HTMLCanvasElement, img: HTMLImageElement);
    draw(iterations: number, radiusDelta?: number): void;
}
