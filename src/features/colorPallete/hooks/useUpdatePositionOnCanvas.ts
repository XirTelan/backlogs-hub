import { useCallback } from "react";
import { updatePositionsOnCanvas } from "../lib/updatePositionsOnCanvas";
import { ColorPickerValue, ColorRGB } from "../types/types";

export function useUpdatePositionsOnCanvas(
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
  return useCallback(
    (color: ColorRGB) => {
      updatePositionsOnCanvas(
        color,
        canvasSizeWidth,
        canvasSizeHeight,
        hueCanvasWidth,
        setHueAll,
        setAll
      );
    },
    [canvasSizeWidth, canvasSizeHeight, hueCanvasWidth, setAll, setHueAll]
  );
}
