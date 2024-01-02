export type DragItemText = {
  id: number;
  left: number;
  top: number;
  relativeTop: number;
  relativeLeft: number;
  text: string;
  size?: FontSize;
  format?: Format;
  color?: string;
};

export enum Format {
  bold = "font-bold",
  semibold = "font-semibold",
  normal = "font-normal",
  medium = "font-medium",
  black = "font-black",
  extrabold = "font-extrabold",
}

export enum FontSize {
  "xs" = "text-xs",
  "sm" = "text-sm",
  "base" = "text-base",
  "lg" = "text-lg",
  "xl" = "text-xl",
  "2xl" = "text-2xl",
  "3xl" = "text-3xl",
  "4xl" = "text-4xl",
  "5xl" = "text-5xl",
  "6xl" = "text-6xl",
  "7xl" = "text-7xl",
  "8xl" = "text-8xl",
  "9xl" = "text-9xl",
}

export enum FontSizeSideBar {
  "text-xs" = "text-[0.1875rem]",
  "text-sm" = "text-[0.21875rem]",
  "text-base" = "text-[0.25rem]",
  "text-lg" = "text-[0.28125rem]",
  "text-xl" = "text-[0.3125rem]",
  "text-2xl" = "text-[0.375rem]",
  "text-3xl" = "text-[0.46875rem]",
  "text-4xl" = "text-[0.5625rem]",
  "text-5xl" = "text-[0.75rem]",
  "text-6xl" = "text-[0.9375rem]",
  "text-7xl" = "text-[1.125rem]",
  "text-8xl" = "text-[1.5rem]",
  "text-9xl" = "text-[2rem]",
}
