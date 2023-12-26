import { Player, PlayerRef } from "@remotion/player";
import { Still } from "remotion";
import { Frames } from "../remotion/Frames";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FramesProps, IFrame } from "@/types/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeDisplay } from "./TimeDisplay";
import VideoTimeLine from "./VideoTimeLine";
import { Subtitle } from "@/remotion/Subtitle";
import FrameEditor from "./FrameEditor";

type GlobalFrameContext = {
  frames: IFrame[];
  setFrames: Dispatch<SetStateAction<IFrame[]>>;
};

export const FrameContext = createContext<GlobalFrameContext>({
  frames: [],
  setFrames: () => [],
});

export default function VideoEditor() {
  const [frames, setFrames] = useState<IFrame[]>([]);
  
  const inputProps: FramesProps = useMemo(() => {
    return {
      frames,
    };
  }, [frames]);

  const playerRef = useRef<PlayerRef>(null);
  

  return (
    <FrameContext.Provider value={{frames, setFrames}}>
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
    </FrameContext.Provider>
  );
}
