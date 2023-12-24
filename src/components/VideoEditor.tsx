import { Player, PlayerRef } from "@remotion/player";
import { Still } from "remotion";
import { Frames } from "../remotion/Frames";
import { useMemo, useRef, useState } from "react";
import type { FramesProps } from "@/types/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeDisplay } from "./TimeDisplay";
import VideoTimeLine from "./VideoTimeLine";
import { Subtitle } from "@/remotion/Subtitle";
import FrameEditor from "./FrameEditor";

export default function VideoEditor() {
  const inputProps: FramesProps = useMemo(() => {
    return {
      frames: [{ text: "What is love" }],
    };
  }, []);

  const playerRef = useRef<PlayerRef>(null);

  return (
    <div className="flex flex-col">
      <Tabs defaultValue="video" className="rounded-md">
        <TabsList className="mt-4 ml-4 px-2 py-2">
          <TabsTrigger value="video">Preview</TabsTrigger>
          <TabsTrigger value="frame">Frame</TabsTrigger>
        </TabsList>
        <TabsContent value="video">
          <div className="mt-1">
            <div className="font-semibold text-2xl tracking-tight mt-4 ml-6">
              Video
            </div>

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
            <div className="mt-1">
              <TimeDisplay playerRef={playerRef} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="frame" className="flex flex-col">
          <FrameEditor />

          
        </TabsContent>
      </Tabs>
    </div>
  );
}
