import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { Subtitle } from "./Subtitle";
import { slide } from "@remotion/transitions/slide";
import type { FramesProps} from '../types/frame'



export const Frames: React.FC<FramesProps> = ({ frames }) => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <Subtitle text={"What is love"} backgroundColor={"#ff75c3"}/>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Subtitle text={"Baby dont hurt me"} backgroundColor={"#9fff5b"} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
