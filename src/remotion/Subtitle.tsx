import React, { ReactNode } from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
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
  console.log(text?.size)
  return (
    <div
      className={`${text?.size} ${text?.format} w-max absolute`}
      style={{
        top: text?.top + 40,
        left: text?.left ,
      }}
    >
      {text?.text}
    </div>
  );
};
