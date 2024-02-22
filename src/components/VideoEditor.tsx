import { createContext, useRef, useState } from "react";
import type { IFrame } from "@/types/frame";
import FrameEditor from "./frame-editor/FrameEditor";
import type { GlobalEditorContext } from "@/types/frame";
import { FontSize, Format } from "../types/draggable.d.ts";
import { nanoid } from 'nanoid'


export const FrameContext = createContext<GlobalEditorContext>({
  frames: [],
  setFrames: () => [],
  currentFrame: "",
  setCurrentFrame: () => 0,
});

export default function VideoEditor() {
  const [frames, setFrames] = useState<IFrame[]>([
    {
      backgroundColor: "#FFFFFF",
      text: [
        {
          id: 0,
          top: 175,
          left: 250,
          relativeLeft: 0,
          relativeTop: 0,
          text: "Enter your text here",
          size: FontSize["3xl"],
          format: Format.medium,
          animations: []
        },
      ],
      start: 0,
      duration: 240,
      end: 60,
      id: nanoid()
    },
    {
      backgroundColor: "#FFFFFF",
      text: [
        {
          id: 0,
          top: 175,
          left: 250,
          relativeLeft: 0,
          relativeTop: 0,
          text: "Enter your text here",
          size: FontSize["3xl"],
          format: Format.medium,
          animations: []
        },
      ],
      start: 0,
      duration: 240,
      end: 60,
      id: nanoid()
    },
    {
      backgroundColor: "#FFFFFF",
      text: [
        {
          id: 0,
          top: 175,
          left: 250,
          relativeLeft: 0,
          relativeTop: 0,
          text: "Enter your text here",
          size: FontSize["3xl"],
          format: Format.medium,
          animations: []
        },
      ],
      start: 0,
      duration: 240,
      end: 60,
      id: nanoid()
    },
    {
      backgroundColor: "#FFFFFF",
      text: [
        {
          id: 0,
          top: 175,
          left: 250,
          relativeLeft: 0,
          relativeTop: 0,
          text: "Enter your text here",
          size: FontSize["3xl"],
          format: Format.medium,
          animations: []
        },
      ],
      start: 0,
      duration: 240,
      end: 60,
      id: nanoid()
    }
  ]);
  const [currentFrame, setCurrentFrame] = useState(frames[0].id);

  
  
  return (
    <FrameContext.Provider
      value={{ frames, setFrames, currentFrame, setCurrentFrame }}
    >
      <FrameEditor />
    </FrameContext.Provider>
  );
}
