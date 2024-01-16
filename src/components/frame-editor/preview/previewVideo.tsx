import { Player} from "@remotion/player";
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
      durationInFrames={180}
      compositionHeight={400}
      compositionWidth={700}
      fps={60}
      controls
      loop
      autoPlay={true}
      className="w-max h-max rounded-2xl ml-6 object-cover border mt-4"
      inputProps={inputProps}
    />
  );
}
