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
          >
            <AbsoluteFill
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
                    animations={text.animations.map(textAnimation => textAnimation.animation)}
                  >
                    <Subtitle text={text} />
                  </Animated>
                );
              })}
            </AbsoluteFill>
          </TransitionSeries.Sequence>
        );
      })}
    </TransitionSeries>
  );
};
