import { Dispatch, SetStateAction } from "react";
import type { DragItemText } from "./draggable";




export interface IFrame {
  text: DragItemText[];
  backgroundColor: string;
  start: number;
  end: number;
  duration: number;
}

export type GlobalEditorContext = {
  frames: IFrame[];
  setFrames: Dispatch<SetStateAction<IFrame[]>>;
  currentFrame: number;
  setCurrentFrame: Dispatch<SetStateAction<number>>;
};

export interface FramesProps {
  frames: IFrame[];
}
