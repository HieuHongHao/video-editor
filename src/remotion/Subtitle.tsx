import React, { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useMemo } from "react";

interface SubtitleProps {
  text?: String;
  backgroundColor?: String;
}

export const Subtitle: React.FC<SubtitleProps> = ({
  text,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();

  

  const textSize = useMemo(() => {
    return "text-9xl"
  }, []);

  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  

  return (
    <AbsoluteFill className="bg-white" style={{ backgroundColor }}>
      <div
        className={`text-zinc-900 font-semibold tracking-tighter mt-auto mb-auto ml-auto mr-auto ${textSize}`}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
