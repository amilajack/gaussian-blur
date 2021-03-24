declare module "*.glsl" {
  export default string;
}

declare module "url:*" {
  export default string;
}

declare module "raf-loop" {
  declare function loop(
    fn: (time: number) => void
  ): {
    start: () => void;
  };
  export default loop;
}

declare module "array-range" {
  declare function range(split: number): number[];
  export default range;
}
