import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import {
  AnimationSelection,
  FrameAnimation,
} from "../../../types/animation.d.ts";
import Scale, {
  ScaleOptions,
} from "../../../../node_modules/remotion-animated/dist/animations/Scale";
import Fade, {
  FadeOptions,
} from "../../../../node_modules/remotion-animated/dist/animations/Fade";
import Move, {
  MoveOptions,
} from "../../../../node_modules/remotion-animated/dist/animations/Move";
import Rotate, {
  RotateOptions,
} from "../../../../node_modules/remotion-animated/dist/animations/Rotate";
import Size, {
  SizeOptions,
} from "../../../../node_modules/remotion-animated/dist/animations/Size";
import { useState } from "react";
import useFrameEditor from "@/hooks/useFrameEditor";

type Option =
  | ScaleOptions
  | FadeOptions
  | MoveOptions
  | RotateOptions
  | SizeOptions
  | null;

const animationOptions = {
  [AnimationSelection.Fade]: ["to", "initial"],
  [AnimationSelection.Size]: [
    "width",
    "height",
    "initialWidth",
    "initialHeight",
  ],
  [AnimationSelection.Scale]: [
    "by",
    "x",
    "y",
    "initial",
    "initialX",
    "initialY",
  ],
  [AnimationSelection.Rotate]: ["degrees", "initial"],
  [AnimationSelection.Move]: ["x", "y", "initial", "initialX", "initialY"],
};

const animationRender = {
  [AnimationSelection.Fade]: Fade,
  [AnimationSelection.Scale]: Scale,
  [AnimationSelection.Move]: Move,
  [AnimationSelection.Size]: Size,
  [AnimationSelection.Rotate]: Rotate,
};

export default function AnimationEdit({
  animation,
  onDispatchAnimation,
}: {
  animation: FrameAnimation;
  onDispatchAnimation: (animation: FrameAnimation) => void;
}) {
  const [currentAnimation, setCurrentAnimation] =
    useState<FrameAnimation>(animation);
  const [option, setOption] = useState<Option>(null);

  return (
    <DialogContent className="flex flex-col w-[400px] h-max">
      <DialogTitle>Animation Selection</DialogTitle>
      <DialogDescription>Select an animation to edit</DialogDescription>

      <Select
        onValueChange={(value: AnimationSelection) => {
          const animationConfiguration = {} as Option;
          for (const config of animationOptions[value]) {
            animationConfiguration[config] = 0;
          }
          setCurrentAnimation({
            selection: value,
            animation: animationRender[value](animationConfiguration),
          });
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
      <div className="flex flex-col space-y-3 mt-1">
        {animationOptions[currentAnimation.selection].map((option, idx) => {
          return (
            <div className="flex flex-col" key={idx}>
              <div className="font-medium text-sm">{option}</div>

              <Input
                placeholder={`Enter ${option} value`}
                className="mt-1"
                onChange={(e) => {
                  setOption((prev) => {
                    if (!prev) {
                      const temp = {};
                      temp[`${option}`] = parseInt(e.target.value);
                      return temp;
                    }
                    prev[`${option}`] = parseInt(e.target.value);
                    return { ...prev };
                  });
                }}
              />
            </div>
          );
        })}
        <Button
          type="submit"
          onClick={() => {
            onDispatchAnimation({
              selection: currentAnimation.selection,
              animation: animationRender[currentAnimation.selection](option),
            });
          }}
        >
          Save changes
        </Button>
      </div>
    </DialogContent>
  );
}