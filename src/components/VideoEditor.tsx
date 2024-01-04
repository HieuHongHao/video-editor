import { PlayerRef } from "@remotion/player";
import {
  createContext,
  useRef,
  useState,
} from "react";
import type {IFrame } from "@/types/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeDisplay } from "./TimeDisplay";
import FrameEditor from "./frame-editor/FrameEditor";
import PreviewVideo from "./preview/previewVideo";
import type { GlobalEditorContext } from "@/types/frame";
import { FontSize, Format } from "../types/draggable.d.ts";

export const FrameContext = createContext<GlobalEditorContext>({
  frames: [],
  setFrames: () => [],
  currentFrame: 0,
  setCurrentFrame: () => 0,
});

export default function VideoEditor() {
  const [frames, setFrames] = useState<IFrame[]>([
    {
      backgroundColor: "#FFFFFF",
      text: [{
        id: 0,
        top: 250,
        left: 380,
        relativeLeft: 0,
        relativeTop: 0,
        text: "Enter your text here",
        size: FontSize.sm,
        format: Format.medium
      }],
      start: 0,
      duration: 60,
      end: 60
    },
  ]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const playerRef = useRef<PlayerRef>(null);

  return (
    <FrameContext.Provider
      value={{ frames, setFrames, currentFrame, setCurrentFrame }}
    >
      <div className="flex flex-col">
        <Tabs defaultValue="video" className="rounded-md">
          <TabsList className="mt-4 ml-4 px-2 py-2">
            <TabsTrigger value="frame">Editor</TabsTrigger>
            <TabsTrigger value="video">Preview</TabsTrigger>
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
