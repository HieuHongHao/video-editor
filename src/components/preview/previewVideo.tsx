import { Player, PlayerRef } from "@remotion/player";
import { useState, useMemo, useRef, RefObject } from "react";
import type { IFrame, FramesProps } from "@/types/frame";
import { Frames } from "@/remotion/Frames";
import useFrameEditor from "@/hooks/useFrameEditor";




export default function PreviewVideo({
  playerRef,
}: {
  playerRef: RefObject<PlayerRef>;
}) {
  const { frames } = useFrameEditor();
    const inputProps: FramesProps = useMemo(() => {
    return {
      frames,
    };
  }, [frames]);

  return (
    <Player
      component={Frames}
      durationInFrames={180}
      compositionHeight={480}
      compositionWidth={960}
      fps={30}
      controls
      loop
      autoPlay={true}
      className="w-max h-max rounded-2xl ml-6 object-cover border mt-4"
      inputProps={inputProps}
      ref={playerRef}
    />
  );
}
