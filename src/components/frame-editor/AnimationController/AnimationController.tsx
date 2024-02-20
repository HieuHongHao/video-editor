import useAnimate from "@/hooks/useAnimate";
import useFrameEditor from "@/hooks/useFrameEditor";
import AddAnimation from "./AddAnimation";
import AnimationDisplay from "./AnimationDisplay";



export default function AnimationController() {
  const { animatingText } = useAnimate();
  const { currentFrame, frames } = useFrameEditor();

  return (
    <div className="w-max border border-r-0 mt-0 border-t-0 border-l-0 h-2/5 flex flex-col">
      <div className="font-semibold text-2xl mt-2 ml-5">Animations</div>
      {animatingText === -1 ? (
        <div className="mt-1 ml-5 text-[0.8125rem]">
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
