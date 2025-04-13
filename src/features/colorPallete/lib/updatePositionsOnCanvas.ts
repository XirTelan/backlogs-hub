import { math } from "@/shared/lib/utils";
import { colors } from "./utils";
import { ColorPickerValue, ColorRGB } from "../types/types";

export function updatePositionsOnCanvas(
  color: ColorRGB,
  canvasSizeWidth: number,
  canvasSizeHeight: number,
  hueCanvasWidth: number,
  setHueAll: (
    color: ColorRGB,
    pos: [number, number],
    initiator: ColorPickerValue["initiator"]
  ) => void,
  setAll: (
    color: ColorRGB,
    pos: [number, number],
    initiator: ColorPickerValue["initiator"]
  ) => void
) {
  if (!color) return;

  const { hueColor, huePos, selectedColor, selectedPos } = getNewColorAndPos(
    color,
    canvasSizeWidth,
    canvasSizeHeight,
    hueCanvasWidth
  );
  setHueAll({ r: hueColor.r, g: hueColor.g, b: hueColor.b }, huePos, "input");
  setAll(selectedColor, selectedPos, "input");
}

export function getNewColorAndPos(
  color: ColorRGB,
  canvasSizeWidth: number,
  canvasSizeHeight: number,
  hueCanvasWidth: number
): {
  hueColor: ColorRGB;
  huePos: [number, number];
  selectedColor: ColorRGB;
  selectedPos: [number, number];
} {
  const { hue, sat, v } = colors.rgbToHsv(color);

  const xPos = canvasSizeWidth * (sat / 100);
  const yPos = canvasSizeHeight * (v / 100);
  const huePos =
    (math.mapRange(hue, 0, 360, 0, hueCanvasWidth) + hueCanvasWidth) %
    hueCanvasWidth;
  const newHueColor = colors.hsvToRgb({ h: hue, s: 1, v: 1 });
  return {
    hueColor: { r: newHueColor[0], g: newHueColor[1], b: newHueColor[2] },
    huePos: [hueCanvasWidth - huePos, 0],
    selectedColor: color,
    selectedPos: [xPos, canvasSizeHeight - yPos],
  };
}
