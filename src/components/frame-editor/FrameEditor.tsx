import EditorMenuBar from "./menubar/EditorMenuBar";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Editor from "./editor/Editor";
import FramesList from "./frames-list/framesListSideBarView";

export default function FrameEditor() {
  return (
    <div className="flex flex-row h-screen">
      <FramesList />
      <div className="flex flex-col h-full w-2/3 ml-10">
        <EditorMenuBar />
        <DndProvider backend={HTML5Backend}>
          <Editor />
        </DndProvider>
      </div>
    </div>
  );
}
