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
      option: {
        to: 0,
        initial: 0,
        duration: 15,
        start:0
      },
    };
  }, []);
  const { currentFrame, setFrames } = useFrameEditor();
  const { animatingText } = useAnimate();
  const [open, setOpen] = useState(false);

  

  function onAddAnimation(animation: FrameAnimation) {
    setFrames((prevFrame) => {
      prevFrame[currentFrame].text[animatingText].animations.push(animation);
      console.log(prevFrame[currentFrame].text[animatingText].animations);
      return cloneDeep(prevFrame);
    });
    
  }
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className="ml-8 mt-2">
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Animation
        </Button>
      </DialogTrigger>
      <AnimationEdit
        animation={newAnimation}
        onDispatchAnimation={onAddAnimation}
        setOpen={setOpen}
      />
    </Dialog>
  );
}
