import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { SelectAction } from "../FrameEditor";

export default function PreviewSelector({
  select,
}: {
  select: Dispatch<SetStateAction<SelectAction>>;
}) {
  return (
    <div className="flex flex-col ml-auto mr-6">
      <Select
        onValueChange={(value) => {
          select(value as SelectAction);
        }}
      >
        <SelectTrigger className="w-[200px] ml-auto">
          <SelectValue placeholder="Editor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={SelectAction.Edit}>Editor</SelectItem>
          <SelectItem value={SelectAction.Frame}>Play Frame</SelectItem>
          <SelectItem value={SelectAction.Video}>Play Video</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
