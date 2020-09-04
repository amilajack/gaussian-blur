export default class GaussianBlur {
    private imageSrc;
    private blurRadius;
    private targetElement;
    private glContext;
    private imageUri;
    private image;
    private gl;
    constructor(opts?: {
        blurRadius?: number;
        targetElement?: 'string' | Element;
    });
    private setParameters;
    private getBase64FromImageUrl;
    setImage(url: string): Promise<void>;
    /**
     * Animate the blur from one radius to another. Resolve the promise when animation is done
     * @TODO: Add the args `opts?: { animate: bool } = { animate: true }`
     */
    changeBlurRadius(blurRadius: number): void;
}
