export interface IFrame {
    text?: String;
    backgroundColor?: String;
    start?: number,
    end?: number
  }



export interface FramesProps {
    frames: IFrame[];
  }