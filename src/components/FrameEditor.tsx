import {
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";
import EditorMenuBar from "./EditorMenuBar";
import VideoTimeLine from "./VideoTimeLine";
import { Input } from "@/components/ui/input";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import type { DragItemText } from "../types/draggable";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cloneDeep, divide } from "lodash";

const Draggable = {
  TEXT: "text",
};

type XYCoord = {
  x: number;
  y: number;
};

type GlobalEditorContext = {
  textBoxes: DragItemText[];
  setTextBoxes: Dispatch<SetStateAction<DragItemText[]>>;
};

export const FrameEditorContext = createContext<GlobalEditorContext>({
  textBoxes: [],
  setTextBoxes: () => [],
});

export default function FrameEditor() {
  const [textBoxes, setTextBoxes] = useState<DragItemText[]>([]);

  return (
    <FrameEditorContext.Provider value={{ textBoxes, setTextBoxes }}>
      <div className="flex flex-col h-screen">
        <EditorMenuBar />

        <DndProvider backend={HTML5Backend}>
          <Editor />
        </DndProvider>

        <VideoTimeLine />
      </div>
    </FrameEditorContext.Provider>
  );
}

function Editor() {
  const { textBoxes, setTextBoxes } = useContext(FrameEditorContext);

  const moveBox = useCallback(
    (id: number, left: number, top: number) => {
      setTextBoxes((prev) => {
        const item = prev[id];
        item.top = top;
        item.left = left;
        return cloneDeep(prev);
      });
    },
    [setTextBoxes]
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
      className="border w-3/5 h-3/4 rounded-2xl ml-6 object-cover mt-4 hover:border-indigo-500 hover:border-2 flex flex-col"
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

  const { setTextBoxes } = useContext(FrameEditorContext);

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
    document.removeEventListener("click", onClickOutsideListener)
  }

  if (isDragging) {
    return <div ref={drag} />;
  }

  return (
    <div onClick={() => setisEditing(true)}>
      {isEditing ? (
        <Input
          placeholder={text}
          ref={drag}
          className="w-max absolute"
          style={positionStyle}
          key={id}
          onChange={(e) => {
            setTextBoxes((prev) => {
              prev[id].text = e.target.value;
              return cloneDeep(prev);
            });
          }}
          onMouseLeave={() => {
            document.addEventListener("click", onClickOutsideListener)
          }}
        />
      ) : (
        <div
          ref={drag}
          className="w-max absolute text-sm font-medium "
          style={positionStyle}
          key={id}
        >
          {text}
        </div>
      )}
    </div>
  );
}
