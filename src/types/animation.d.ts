import Animation from "remotion-animated/dist/animations/Animation";



export type AnimationContext = {
  animatingText: number;
  setAnimatingText: Dispatch<SetStateAction<number>>;
};

export enum AnimationSelection {
  Fade = "Fade",
  Scale = "Scale",
  Rotate = "Rotate",
  Size = "Size",
  Move = "Move",
}


type Option =
  | ScaleOptions
  | FadeOptions
  | MoveOptions
  | RotateOptions
  | SizeOptions
  | null;

type FrameAnimation = {
  selection: AnimationSelection;
  animation: Animation;
  option: Option
};
