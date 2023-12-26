import { FrameContext } from "@/components/VideoEditor";
import { useContext } from "react";

export default function useFrameEditor() {
  const { frames, setFrames } = useContext(FrameContext);

  return { frames, setFrames };
}
