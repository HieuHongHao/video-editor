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

  return (
    <Player
      component={Frames}
      durationInFrames={300}
      compositionHeight={480}
      compositionWidth={800}
      fps={60}
      controls
      loop
      autoPlay={true}
      className="border-l-0 mt-3 "
      inputProps={inputProps}
    />
  );
}
