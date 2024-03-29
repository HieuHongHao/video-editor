import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FontSizeSideBar } from "../../../types/draggable.d.ts";
import useFrameEditor from "@/hooks/useFrameEditor";
import { IFrame } from "@/types/frame";

export default function FramesList() {
  const { frames } = useFrameEditor();

  return (
    <ScrollArea className="flex flex-col h-screen w-1/4 border ">
      <div className="w-[100px] font-semibold text-xl ml-5 mt-2">Frames</div>
      <div className="text-[0.8125rem] font-normal ml-6 mt-2">
        Choose a frame to edit or see preview
      </div>
      {frames.map((frame) => {
        return <FrameView frame={frame} key={frame.id} />;
      })}
      <Button className="ml-28 mt-4 mb-4" size={"sm"} variant={"outline"}>
        <Plus className="w-4 h-4 mr-1" />
        Frame
      </Button>
    </ScrollArea>
  );
}

function FrameView({ frame }: { frame: IFrame }) {
  const { setCurrentFrame, currentFrame } = useFrameEditor();

  return (
    <div
      className={`border rounded-2xl object-cover mt-4 ml-auto mr-auto flex flex-col h-[144px] w-[288px] hover:border-2 hover:border-black relative ${currentFrame === frame.id && "border-2 border-black"}`}
      style={
        frame.backgroundColor.startsWith("linear")
          ? {
              backgroundImage: frame.backgroundColor,
            }
          : {
              backgroundColor: frame.backgroundColor,
            }
      }
      onClick={() => {
        setCurrentFrame(frame.id);
      }}
    >
      {frame.text.map((text) => {
        const fontSize = FontSizeSideBar[text.size!];
        return (
          <div
            className={`w-max absolute ${fontSize} font-medium `}
            style={{
              top: `${text.top / 2.5}px`,
              left: `${text.left / 2.5}px`,
            }}
            key={text.id}
          >
            {text.text}
          </div>
        );
      })}
    </div>
  );
}
