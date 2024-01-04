import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FontSizeSideBar } from "../../../types/draggable.d.ts";
import useFrameEditor from "@/hooks/useFrameEditor";
import { IFrame } from "@/types/frame";


export default function FramesList() {
  const { frames } = useFrameEditor();

  return (
    <ScrollArea className="flex flex-col h-screen w-1/5 border rounded-md ml-2">
      <div className="w-[100px] font-semibold text-2xl ml-5 mt-2">Frames</div>
      <div className="text-[0.8125rem] font-normal ml-6 mt-2">
        Choose a frame to edit or see preview
      </div>
      {frames.map((frame, idx) => {
        return <FrameView frame={frame} key={idx} />;
      })}
      <Button className="ml-20 mt-4" size={"sm"} variant={"outline"}>
        <Plus className="w-4 h-4 mr-1"/>
        New frame
      </Button>
    </ScrollArea>
  );
}

function FrameView({ frame }: { frame: IFrame }) {
  return (
    <div
      className="border rounded-2xl ml-6 object-cover mt-4 flex flex-col h-[125px] w-[225px]  hover:border-2 hover:border-black relative"
      style={
        frame.backgroundColor.startsWith("linear")
          ? {
              backgroundImage: frame.backgroundColor,
            }
          : {
              backgroundColor: frame.backgroundColor,
            }
      }
    >
      {frame.text.map((text) => {
        const fontSize = FontSizeSideBar[text.size!];
        return (
          <div
            className={`w-max absolute ${fontSize} font-medium`}
            style={{
              top: `${text.top / 4}px`,
              left: `${text.left / 4}px`,
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
