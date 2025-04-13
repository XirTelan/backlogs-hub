export type ColorRGB = { r: number; g: number; b: number };
export type ColorPickerValue = {
  color: ColorRGB;
  pos: [number, number];
  initiator: "init" | "pointer" | "input" | "hueChange";
};

export type ColorType = "RGB" | "HEX";
