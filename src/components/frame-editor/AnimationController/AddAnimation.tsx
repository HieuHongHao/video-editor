import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import useFrameEditor from "@/hooks/useFrameEditor";
import useAnimate from "@/hooks/useAnimate";
import {
  AnimationSelection,
  FrameAnimation,
} from "../../../types/animation.d.ts";

import { Plus } from "lucide-react";
import AnimationEdit from "./AnimationEdit";
import Fade from "../../../../node_modules/remotion-animated/dist/animations/Fade";
import { cloneDeep } from "lodash";

export default function AddAnimation() {
  const newAnimation = useMemo(() => {
    return {
      selection: AnimationSelection.Fade,
      animation: Fade({
        to: 0,
        initial: 0,
      }),
    }
  }, []);
  const { currentFrame, setFrames } = useFrameEditor();
  const { animatingText } = useAnimate();

  function onAddAnimation(animation:FrameAnimation){
    setFrames(prevFrame => {
      prevFrame[currentFrame].text[animatingText].animations.push(animation)
      return cloneDeep(prevFrame);
    })
  }
  return (
    <Dialog>
      <DialogTrigger className="ml-4 mt-2">
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Animation
        </Button>
      </DialogTrigger>
      <AnimationEdit animation={newAnimation} onDispatchAnimation={onAddAnimation}/>
    </Dialog>
  );
}
