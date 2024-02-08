import useAnimate from "@/hooks/useAnimate";
import useFrameEditor from "@/hooks/useFrameEditor";
import AddAnimation from "./AddAnimation";

export enum AnimationSelection {
  Fade = "Fade",
  Scale = "Scale",
  Rotate = "Rotate",
  Size = "Size",
  Move = "Move",
}

export enum AnimationActionType {
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
        <div className="flex flex-row">
          {frames[currentFrame].animations.map((animation,idx) => {
            return <AnimationDisplay animation={animation}/>
          })}
          <AddAnimation />
        </div>
        
      )}
    </div>
  );
}


