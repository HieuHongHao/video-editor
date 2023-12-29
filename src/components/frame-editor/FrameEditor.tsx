import EditorMenuBar from "./menubar/EditorMenuBar";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Editor from "./editor/Editor";

export default function FrameEditor() {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/4 font-semibold text-2xl ml-5 mt-2">Frames</div>
      <div className="flex flex-col h-full w-full">
        <EditorMenuBar />

        <DndProvider backend={HTML5Backend}>
          <Editor />
        </DndProvider>
      </div>
    </div>
  );
}
