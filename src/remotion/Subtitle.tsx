import React, { ReactNode } from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
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
  
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      mass: 75
    }
  });

  

  const textSize = useMemo(() => {
    return text?.size;
  }, [text]);

  const opacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  

  return (
    <div
      className={`${text?.size} ${text?.format} w-max absolute`}
      style={{
        top: text?.top,
        left: text?.left,
        transform: `scale(${scale})`,
        opacity
      }}
    >
      {text?.text}
    </div>
  );
};
