import { useVideoConfig } from "remotion"
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { Subtitle } from "./Subtitle";
import type { FramesProps } from "../types/frame";
import { AbsoluteFill } from "remotion";
import Animated from "../../node_modules/remotion-animated/dist/Animated";
import Scale from "../../node_modules/remotion-animated/dist/animations/Scale";
import Fade from "../../node_modules/remotion-animated/dist/animations/Fade";
import Size from "../../node_modules/remotion-animated/dist/animations/Size";
import Move from "../../node_modules/remotion-animated/dist/animations/Move";

export const Frames: React.FC<FramesProps> = ({ frames }) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  console.log(width); // 1920
  console.log(height); // 1080
  console.log(fps); // 30;
  console.log(durationInFrames); // 30
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
              className="relative"
            >
              {frame.text.map((text) => {
                return (
                  <Animated
                    key={text.id}
                    animations={text.animations.map(
                      (textAnimation) => textAnimation.animation
                    )}
                    // animations={[
                    //   Fade({ start: 10, duration: 30, initial: 0, to: 1}),
                    // ]}
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
