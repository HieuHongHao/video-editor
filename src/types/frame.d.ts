import { Dispatch, SetStateAction } from "react";
import type { DragItemText } from "./draggable";
import Animation from "../../node_modules/remotion-animated/dist/animations/Animation"


export interface IFrame {
  text: DragItemText[];
  backgroundColor: string;
  start: number,
  end: number,
  duration: number,
  animations: Animation[]
}

export type GlobalEditorContext = {
  frames: IFrame[];
  setFrames: Dispatch<SetStateAction<IFrame[]>>;
  currentFrame: number,
  setCurrentFrame: Dispatch<SetStateAction<number>>
};

export type AnimationContext = {
  animatingText: number,
  setAnimatingText: Dispatch<SetStateAction<number>>,
}

export interface FramesProps {
    frames: IFrame[];
  }