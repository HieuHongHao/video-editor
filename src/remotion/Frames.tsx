import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { Subtitle } from "./Subtitle";
import type { FramesProps } from "../types/frame";
import { AbsoluteFill } from "remotion";

export const Frames: React.FC<FramesProps> = ({ frames }) => {
  return (
    <TransitionSeries>
      {frames.map((frame, idx) => {
        return (
          <TransitionSeries.Sequence
            durationInFrames={frame.duration}
            key={idx}
          >
            <AbsoluteFill className="relative object-cover flex flex-col">
              {frame.text.map((text) => {
                
                return <Subtitle text={text} key={text.id} />;
              })}
            </AbsoluteFill>
            
          </TransitionSeries.Sequence>
        );
      })}
    </TransitionSeries>
  );
};
