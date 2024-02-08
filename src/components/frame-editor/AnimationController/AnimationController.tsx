import useAnimate from "@/hooks/useAnimate";
import useFrameEditor from "@/hooks/useFrameEditor";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReducer, useState } from "react";

enum AnimationSelection {
  Fade = "Fade",
  Scale = "Scale",
  Rotate = "Rotate",
  Size = "Size",
  Move = "Move",
}

enum AnimationActionType {
  setFade,
  setScale,
  setRotate,
  setSize,
  setMove,
}

type AnimationAction = {
  type: AnimationActionType;
};

export default function AnimationController() {
  const { animatingText } = useAnimate();
  const { currentFrame, frames } = useFrameEditor();

  return (
    <div className="w-full border rounded-md mt-3 h-2/5 flex flex-col">
      <div className="font-semibold text-2xl mt-2 ml-5">Animations</div>
      {animatingText === -1 ? (
        <div className="mt-1 ml-5 text-[0.8125rem]">
          Right click an element in the editor to edit animation sequence
        </div>
      ) : (
        <AddAnimation />
      )}
    </div>
  );
}

function reducer(state: AnimationSelection, action: AnimationAction) {
  switch (action.type) {
    case AnimationActionType.setFade:
      return AnimationSelection.Fade;

    case AnimationActionType.setMove:
      return AnimationSelection.Move;

    case AnimationActionType.setRotate:
      return AnimationSelection.Rotate;

    case AnimationActionType.setScale:
      return AnimationSelection.Scale;
    default:
      return AnimationSelection.Size;
  }
}

function AddAnimation() {
  const [currentAnimation, setCurrentAnimation] = useState(
    AnimationSelection.Fade
  );
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Add animation</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-[350px]">
        <DialogTitle>Animation Selection</DialogTitle>
        <DialogDescription>Select an animation to edit</DialogDescription>

        <Select
          onValueChange={(value: AnimationSelection) => {
            setCurrentAnimation(value);
          }}
        >
          <SelectTrigger className=" mt-2 h-max">
            <SelectValue placeholder={AnimationSelection.Fade} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AnimationSelection.Fade}>
              {AnimationSelection.Fade}
            </SelectItem>
            <SelectItem value={AnimationSelection.Move}>
              {AnimationSelection.Move}
            </SelectItem>
            <SelectItem value={AnimationSelection.Scale}>
              {AnimationSelection.Scale}
            </SelectItem>
            <SelectItem value={AnimationSelection.Rotate}>
              {AnimationSelection.Rotate}
            </SelectItem>
            <SelectItem value={AnimationSelection.Size}>
              {AnimationSelection.Size}
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-1">
          <AnimationOption animation={currentAnimation} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AnimationOption({ animation }: { animation: AnimationSelection }) {
  switch (animation) {
    case AnimationSelection.Fade:
      return <Option options={["to", "initial"]} />;

      case AnimationSelection.Scale:
        return <Option options={["by", "x", "y", "initial", "initialX", "initialY"]} />;
      default:
      break;
  }
}

function Option({ options }: { options: string[] }) {
  return (
    <div className="flex flex-col space-y-3">
      {options.map((option, idx) => {
        return (
          <div className="flex flex-col" key={idx}>
            <div className="flex flex-row">
              <div className="font-medium text-sm">{option}</div>
              <div className="ml-auto mr-2">0</div>
            </div>
            <Slider defaultValue={[0]} max={100} step={1} className="mt-1" />
          </div>
        );
      })}
    </div>
  );
}
