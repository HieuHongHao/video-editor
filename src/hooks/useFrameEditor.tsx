import { FrameContext } from "@/components/VideoEditor";
import { useContext } from "react";

export default function useFrameEditor() {
  const { frames, setFrames, currentFrame, setCurrentFrame } = useContext(FrameContext);
  
  return { frames, setFrames, currentFrame, setCurrentFrame };
}
