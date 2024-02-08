import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { AnimationSelection } from "./AnimationController";



export default function AddAnimation() {
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
      return (
        <Option options={["by", "x", "y", "initial", "initialX", "initialY"]} />
      );
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
