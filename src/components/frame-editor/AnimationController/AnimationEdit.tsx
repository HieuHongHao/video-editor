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
  [AnimationSelection.Fade]: ["to", "initial", "duration", "start"],
  [AnimationSelection.Size]: [
    "width",
    "height",
    "initialWidth",
    "initialHeight",
    "start"
  ],
  [AnimationSelection.Scale]: [
    "by",
    "x",
    "y",
    "initial",
    "initialX",
    "initialY",
    "start"
  ],
  [AnimationSelection.Rotate]: ["degrees", "initial", "start"],
  [AnimationSelection.Move]: ["x", "y", "initial", "initialX", "initialY", "start"],
};

const animationRender = {
  [AnimationSelection.Fade]: Fade,
  [AnimationSelection.Scale]: Scale,
  [AnimationSelection.Move]: Move,
  [AnimationSelection.Size]: Size,
  [AnimationSelection.Rotate]: Rotate,
};

const springOptions = {
  mass: 1,
  damping: 10,
  stiffness: 100,
  overshootClamping: false,
  duration: 15,
};

export default function AnimationEdit({
  animation,
  onDispatchAnimation,
  setOpen,
}: {
  animation: FrameAnimation;
  onDispatchAnimation: (animation: FrameAnimation) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentAnimation, setCurrentAnimation] =
    useState<FrameAnimation>(animation);

  return (
    <DialogContent className="flex flex-col w-[500px] h-max">
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
            option: animationConfiguration,
          });
        }}
      >
        <SelectTrigger className=" mt-2 h-max">
          <SelectValue placeholder={animation.selection} />
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
      <div className="flex flex-row mt-1 flex-wrap">
        {currentAnimation.selection !== AnimationSelection.Fade &&
          Object.entries(springOptions).map((entry, idx) => {
            return (
              <div className="flex flex-col w-1/3 mr-3 mt-2 ml-3" key={idx}>
                <div className="font-medium text-sm">{entry[0]}</div>
                <Input
                  placeholder={`${entry[1]}`}
                  className="mt-1"
                  onChange={(e) => {
                    setCurrentAnimation((prev) => {
                      prev.option = {
                        ...prev.option,
                        [entry[0]]: parseFloat(e.currentTarget.value),
                      };
                      return { ...prev };
                    });
                  }}
                />
              </div>
            );
          })}
        {animationOptions[currentAnimation.selection].map((config, idx) => {
          return (
            <div className="flex flex-col w-1/3 mr-3 mt-2 ml-3" key={idx}>
              <div className="font-medium text-sm">{config}</div>

              <Input
                placeholder={`${currentAnimation.option[config]}`}
                className="mt-1"
                onChange={(e) => {
                  setCurrentAnimation((prev) => {
                    prev.option = {
                      ...prev.option,
                      [config]: parseFloat(e.currentTarget.value),
                    };
                    return { ...prev };
                  });
                }}
              />
            </div>
          );
        })}
      </div>
      <Button
        type="submit"
        onClick={() => {
          const newAnimation = {
            ...currentAnimation,
            animation: animationRender[currentAnimation.selection](
              currentAnimation.option
            ),
          };
          console.log(currentAnimation.option);
          console.log(currentAnimation.selection);
          onDispatchAnimation(newAnimation);
          setOpen(false);
        }}
      >
        Save changes
      </Button>
    </DialogContent>
  );
}
