import { useCallback, useMemo } from "react";
import useFrameEditor from "./useFrameEditor";
import { IFrame } from "@/types/frame";
import { cloneDeep } from "lodash";

type EditCallBack = (frame: IFrame) => void;

export default function useEditFrame() {
  const { currentFrame, setFrames, frames } = useFrameEditor();

  const frame = useMemo(() => {
    return frames.find((frame) => frame.id === currentFrame)!
  }, [currentFrame, frames])

  const editFrame = useCallback(editCurrentFrame, [currentFrame, setFrames]);

  function editCurrentFrame(callback: EditCallBack) {
    setFrames((prevFrames) => {
      const frame = prevFrames.find((frame) => frame.id === currentFrame)!;
      callback(frame);
      return cloneDeep(prevFrames);
    });
  }

  return {frame, editFrame}
}
