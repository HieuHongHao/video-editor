import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { Subtitle } from "./Subtitle";
import type { FramesProps } from "../types/frame";
import { AbsoluteFill } from "remotion";
import Animated from "../../node_modules/remotion-animated/dist/Animated";
import Scale from "../../node_modules/remotion-animated/dist/animations/Scale";
import Fade from "../../node_modules/remotion-animated/dist/animations/Fade";
import Move from "../../node_modules/remotion-animated/dist/animations/Move";
import Size from "../../node_modules/remotion-animated/dist/animations/Size";

export const Frames: React.FC<FramesProps> = ({ frames }) => {
  return (
    <TransitionSeries>
      {frames.map((frame, idx) => {
        return (
          <TransitionSeries.Sequence
            durationInFrames={frame.duration}
            key={idx}
            style={
              frame.backgroundColor.startsWith("linear")
                ? {
                    backgroundImage: frame.backgroundColor,
                  }
                : {
                    backgroundColor: frame.backgroundColor,
                  }
            }
          >
            
              {frame.text.map((text) => {
                return (
                  <Animated
                    key={text.id}
                    animations={[
                      Fade({ to: 1, initial: 0 }),
                      Move({ x: 40, start: 40 }),
                      Fade({ to: 0, start: 160 }),
                      Scale({ by: 0, start: 160, mass: 75 }),
                    ]}
                  >
                    <Subtitle text={text} />
                  </Animated>
                );
              })}
            
          </TransitionSeries.Sequence>
        );
      })}
    </TransitionSeries>
  );
};
