import React, { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useMemo } from "react";
import { DragItemText } from "@/types/draggable";

interface SubtitleProps {
  text?: DragItemText;
  backgroundColor?: String;
}

export const Subtitle: React.FC<SubtitleProps> = ({
  text,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();

  const textSize = useMemo(() => {
    return text?.size;
  }, [text]);

  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  

  return (
    <div className={`${text?.size} ${text?.format} w-max absolute`} style={{
      top: text?.top,
      left: text?.left
    }}>
      {text?.text}
    </div>
  );
};
