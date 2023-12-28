import { PlayerRef } from "@remotion/player";
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
import FrameEditor from "./frame-editor/FrameEditor";
import PreviewVideo from "./preview/previewVideo";
import type { GlobalEditorContext } from "@/types/frame";



export const FrameContext = createContext<GlobalEditorContext>({
  frames: [],
  setFrames: () => [],
  currentFrame: 0,
  setCurrentFrame: () => 0
});

export default function VideoEditor() {
  const [frames, setFrames] = useState<IFrame[]>([{
    backgroundColor: "#FFFFFF",
    text: []
  }]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const playerRef = useRef<PlayerRef>(null);

  return (
    <FrameContext.Provider value={{ frames, setFrames, currentFrame, setCurrentFrame }}>
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
              <PreviewVideo playerRef={playerRef} />
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
