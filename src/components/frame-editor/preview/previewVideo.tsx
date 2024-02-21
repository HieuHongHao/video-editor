import { Player } from "@remotion/player";
import { useMemo } from "react";
import type { FramesProps, IFrame } from "@/types/frame";
import { Frames } from "@/remotion/Frames";

export default function PreviewVideo({ frames }: { frames: IFrame[] }) {
  const inputProps: FramesProps = useMemo(() => {
    return {
      frames,
    };
  }, [frames]);

  const totalframeDuration: number = useMemo(() => {
    return frames.reduce((duration, frame) => {
      return duration + frame.duration;
    }, 0);
  }, [frames]);

  return (
    <Player
      component={Frames}
      durationInFrames={totalframeDuration}
      compositionHeight={480}
      compositionWidth={800}
      fps={60}
      controls
      loop
      autoPlay={true}
      className="border rounded-md ml-10"
      inputProps={inputProps}
    />
  );
}
