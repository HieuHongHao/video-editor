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
  
type FrameAnimation = {
    selection: AnimationSelection,
    animation: Animation
}