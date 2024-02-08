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
      compositionHeight={360}
      compositionWidth={720}
      fps={60}
      controls
      loop
      autoPlay={true}
      className="ml-3 mt-4"
      inputProps={inputProps}
    />
  );
}
