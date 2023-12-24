import React, { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface SubtitleProps {
  text?: String;
}

export const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-white">
      <div
        className="text-zinc-900 font-semibold text-3xl tracking-tighter"
        style={{ opacity }}
      >
        {text}
      </div>
      
    </AbsoluteFill>
  );
};
