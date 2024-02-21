import useAnimate from "@/hooks/useAnimate";
import useFrameEditor from "@/hooks/useFrameEditor";
import AddAnimation from "./AddAnimation";
import AnimationDisplay from "./AnimationDisplay";



export default function AnimationController() {
  const { animatingText } = useAnimate();
  const { currentFrame, frames } = useFrameEditor();

  return (
    <div className="w-max flex flex-col">
      <div className="font-semibold text-xl mt-1 ml-8">Animations</div>
      {animatingText === -1 ? (
        <div className="mt-1 ml-8 text-[0.8125rem]">
          Right click an element in the editor to edit animation sequence
        </div>
      ) : (
        <div className="flex flex-row">
          {frames[currentFrame].text[animatingText].animations.map(
            (animation, idx) => {
              return <AnimationDisplay animation={animation} idx={idx} key={idx}/>;
            }
          )}
          <AddAnimation />
        </div>
      )}
    </div>
  );
}
