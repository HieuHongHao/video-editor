import { Dispatch, SetStateAction } from "react";
import type { DragItemText } from "./draggable";




export interface IFrame {
  text: DragItemText[];
  backgroundColor: string;
  start: number;
  end: number;
  duration: number;
  id: string
}

export type GlobalEditorContext = {
  frames: IFrame[];
  setFrames: Dispatch<SetStateAction<IFrame[]>>;
  currentFrame: string;
  setCurrentFrame: Dispatch<SetStateAction<string>>;
};


export interface FramesProps {
  frames: IFrame[];
}
