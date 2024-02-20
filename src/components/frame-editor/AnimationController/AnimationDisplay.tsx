import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AnimationEdit from "./AnimationEdit";
import { FrameAnimation } from "@/types/animation";
import { useState } from "react";
import useAnimate from "@/hooks/useAnimate";
import useFrameEditor from "@/hooks/useFrameEditor";
import { cloneDeep } from "lodash";

export default function AnimationDisplay({
  animation,
  idx,
}: {
  animation: FrameAnimation;
  idx: number;
}) {
  const { animatingText } = useAnimate();
  const { currentFrame, setFrames } = useFrameEditor();
  const [open, setOpen] = useState(false);

  function onEditAnimation(animation: FrameAnimation) {
    setFrames((prevFrames) => {
      prevFrames[currentFrame].text[animatingText].animations[idx] = animation;
      return cloneDeep(prevFrames);
    });
    
  }
  
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className="ml-4 mt-2">
        <Button variant="outline">{animation.selection}</Button>
      </DialogTrigger>
      <AnimationEdit
        animation={animation}
        onDispatchAnimation={onEditAnimation}
        setOpen={setOpen}
      />
    </Dialog>
  );
}
