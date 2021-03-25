declare module "*.glsl" {
  export default string;
}

declare module "url:*" {
  export default string;
}

declare module "raf-loop" {
  export type Start = {
    start: () => void;
    stop: () => void;
    tick: () => void;
  };
  declare function loop(
    fn: (time: number) => void
  ): {
    start: () => Start;
  };
  export default loop;
}

declare module "array-range" {
  declare function range(split: number): number[];
  export default range;
}
