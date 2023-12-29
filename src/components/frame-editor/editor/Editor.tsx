import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSubTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";

import { useDrag, useDrop } from "react-dnd";
import type { DragItemText } from "../../../types/draggable";
import { cloneDeep } from "lodash";
import useFrameEditor from "@/hooks/useFrameEditor";

import { GradientPicker } from "../menubar/GradientPicker";
import { fontSizeArray, formatArray } from "../../../utils/text-edit";

const Draggable = {
  TEXT: "text",
};

type XYCoord = {
  x: number;
  y: number;
};
export default function Editor() {
  const { frames, setFrames, currentFrame } = useFrameEditor();

  const { backgroundColor, textBoxes } = useMemo(() => {
    return {
      backgroundColor: frames[currentFrame].backgroundColor,
      textBoxes: frames[currentFrame].text,
    };
  }, [frames, currentFrame]);

  const moveBox = useCallback(
    (id: number, left: number, top: number) => {
      setFrames((prev) => {
        prev[currentFrame].text[id].top = top;
        prev[currentFrame].text[id].left = left;
        return cloneDeep(prev);
      });
    },
    [setFrames, currentFrame]
  );

  const [, drop] = useDrop(
    () => ({
      accept: Draggable.TEXT,
      drop(item: DragItemText, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <div
      className="border w-4/5 h-3/4 rounded-2xl ml-6 object-cover mt-4 hover:border-black hover:border-2 flex flex-col"
      style={
        backgroundColor.startsWith("linear")
          ? {
              backgroundImage: backgroundColor,
            }
          : {
              backgroundColor,
            }
      }
      ref={drop}
    >
      {textBoxes.map((textBox) => {
        return (
          <DraggableText
            id={textBox.id}
            left={textBox.left}
            top={textBox.top}
            text={textBox.text}
            key={textBox.id}
          />
        );
      })}
    </div>
  );
}

function DraggableText({ id, left, top, text }: DragItemText) {
  const [isEditing, setisEditing] = useState(false);

  const { setFrames, currentFrame } = useFrameEditor();

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: Draggable.TEXT,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  }, [id, left, top]);

  const positionStyle = useMemo(
    () => ({
      top: `${top}px`,
      left: `${left}px`,
    }),
    [left, top]
  );

  const onClickOutsideListener = () => {
    setisEditing(false);
    document.removeEventListener("click", onClickOutsideListener);
  };

  if (isDragging) {
    return <div ref={drag} />;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger onClick={() => setisEditing(true)}>
        {isEditing ? (
          <Input
            placeholder={text}
            ref={drag}
            className="w-max absolute"
            style={positionStyle}
            key={id}
            onChange={(e) => {
              setFrames((prev) => {
                prev[currentFrame].text[id].text = e.target.value;
                return cloneDeep(prev);
              });
            }}
            onMouseLeave={() => {
              document.addEventListener("click", onClickOutsideListener);
            }}
          />
        ) : (
          <div
            ref={drag}
            className="w-max absolute text-sm font-medium "
            style={positionStyle}
            key={id}
          >
            {text === "" ? "Enter your text here" : text}
          </div>
        )}
      </ContextMenuTrigger>
      <ContextMenuContent className="left-96">
        <ContextMenuSub>
          <ContextMenuSubTrigger>Font Size</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {fontSizeArray.map((size, idx) => {
              let processedFontSize = size.replace("text-","");
              processedFontSize = processedFontSize.charAt(0).toUpperCase() + processedFontSize.slice(1);
              return <ContextMenuItem key={idx}>{processedFontSize}</ContextMenuItem>;
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger>Text Color</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Black</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger>Format</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {formatArray.map((format, idx) => {
              let processedFormat = format.replace("font-", "");
              processedFormat = processedFormat.charAt(0).toUpperCase() + processedFormat.slice(1);
              return <ContextMenuItem key={idx}>{processedFormat}</ContextMenuItem>;
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
