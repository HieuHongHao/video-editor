import { Dispatch, SetStateAction, useState, createContext } from "react";
import EditorMenuBar from "./menubar/EditorMenuBar";
import VideoTimeLine from "./timeline/VideoTimeLine";
import { DndProvider } from "react-dnd";
import type { DragItemText } from "../../types/draggable";
import { HTML5Backend } from "react-dnd-html5-backend";
import Editor from "./editor/Editor";



export default function FrameEditor() {
  return (
    <div className="flex flex-col h-screen">
      <EditorMenuBar />

      <DndProvider backend={HTML5Backend}>
        <Editor />
      </DndProvider>

      <VideoTimeLine />
    </div>
  );
}
