import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarSub,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "@/components/ui/menubar";

import { GradientPicker } from "./GradientPicker";
import useFrameEditor from "@/hooks/useFrameEditor";
import { cloneDeep } from "lodash";
export default function EditorMenuBar() {
  const { setFrames, currentFrame } = useFrameEditor();

  return (
    <Menubar className="w-max ml-10">
      <MenubarMenu>
        <MenubarTrigger>Text</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() =>
              setFrames((prev) => {
                prev[currentFrame].text = [
                  ...prev[currentFrame].text,
                  {
                    id: prev[currentFrame].text.length,
                    top: 384,
                    left: 384,
                    text: "Enter your text here",
                  },
                ];
                console.log(prev);
                return cloneDeep(prev);
              })
            }
          >
            New Text
          </MenubarItem>
          <MenubarItem>Font Size</MenubarItem>
          <MenubarItem>Text Color</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Format</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Bold</MenubarItem>
              <MenubarItem>Italic</MenubarItem>
              <MenubarItem>Underline</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Background</MenubarTrigger>
        <MenubarContent>
          <GradientPicker />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
