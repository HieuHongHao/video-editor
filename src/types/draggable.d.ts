export type DragItemText = {
  id: number;
  left: number;
  top: number;
  text: string;
  size?: FontSize;
  format?: Format;
  color?: string
}

export enum Format {
  bold = "font-bold",
  semibold = "font-semibold",
  normal = "font-normal",
  medium = "font-medium",
  black = "font-black",
  extrabold = "font-extrabold"
}

export enum FontSize {
  'xs' = 'text-xs',
  'sm' = 'text-sm',
  'base' = 'text-base',
  'lg' = 'text-lg',
  'xl' = 'text-xl',
  '2xl' = 'text-2xl',
  '3xl' = 'text-3xl',
  '4xl' = 'text-4xl',
  '5xl' = 'text-5xl',
  '6xl' = 'text-6xl',
  '7xl' = 'text-7xl',
  '8xl' = 'text-8xl',
  '9xl' = 'text-9xl',
}


