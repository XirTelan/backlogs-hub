import { useState, useRef, useCallback, useEffect } from "react";
import { colors } from "../lib/utils";
import { ColorRGB, ColorType } from "../types/types";
import useCanvasPointer from "./useCanvasPointer";
import { useUpdatePositionsOnCanvas } from "./useUpdatePositionOnCanvas";
import { drawSelectedClrCanvas } from "../lib/drawSelectedClrCanvas";
import { getNewColorAndPos } from "../lib/updatePositionsOnCanvas";

const COLOR_STOPS = [
  { val: 0.01, hsl: "hsl(360,100%,50%)" },
  { val: 0.17, hsl: "hsl(300,100%,50%)" },
  { val: 0.33, hsl: "hsl(240,100%,50%)" },
  { val: 0.5, hsl: "hsl(180,100%,50%)" },
  { val: 0.66, hsl: "hsl(120,100%,50%)" },
  { val: 0.83, hsl: "hsl(60,100%,50%)" },
  { val: 0.99, hsl: "hsl(0,100%,50%)" },
];

export function useColorPicker(
  value: ColorRGB,
  colorWidth: number,
  colorHeight: number,
  hueWidth: number,
  onChange: (value: string) => void
) {
  const [colorTypeSwitch, setColorTypeSwitch] = useState<ColorType>("RGB");

  const colorCanvas = useRef<HTMLCanvasElement>(null);
  const hueCanvas = useRef<HTMLCanvasElement>(null);

  const {
    hueColor: startHueColor,
    huePos: startHuePos,
    selectedColor: startSelectedColor,
    selectedPos: startSelectedPos,
  } = getNewColorAndPos(value, colorWidth, colorHeight, hueWidth);

  const {
    color: hueColor,
    isTrack: hueTrack,
    setAll: setHueAll,
    changePos: changeHuePos,
    register: registerHueClr,
  } = useCanvasPointer(hueCanvas, startHueColor, startHuePos);

  const {
    color: selectedColor,
    isTrack: colorTrack,
    setAll,
    updateColor,
    changePos: changeSelectedPos,
    register: registerSelectedClr,
  } = useCanvasPointer(colorCanvas, startSelectedColor, startSelectedPos);

  const updatePositionsOnCanvas = useUpdatePositionsOnCanvas(
    colorWidth,
    colorHeight,
    hueWidth,
    setHueAll,
    setAll
  );

  const redrawSelectColorCanvas = useCallback((hueColor: ColorRGB) => {
    if (!colorCanvas?.current) return;
    const cntx = colorCanvas.current.getContext("2d");
    if (!cntx) return;
    drawSelectedClrCanvas(cntx, hueColor);
  }, []);

  const drawHueClrBar = useCallback((cntx: CanvasRenderingContext2D) => {
    const gradientH = cntx.createLinearGradient(0, 0, cntx.canvas.width, 0);
    COLOR_STOPS.forEach(({ val, hsl }) => {
      gradientH.addColorStop(val, hsl);
    });

    cntx.fillStyle = gradientH;
    cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
  }, []);

  useEffect(() => {
    if (colorTrack || hueTrack) return;

    onChange(colors.rgbToHex(selectedColor.color));
  }, [selectedColor.color, colorTrack, hueTrack, onChange]);

  useEffect(() => {
    const handle = window.requestAnimationFrame(() => {
      redrawSelectColorCanvas(hueColor.color);
      if (!["input", "init"].includes(hueColor.initiator)) {
        updateColor("hueChange");
      }
    });

    return () => {
      window.cancelAnimationFrame(handle);
    };
  }, [
    hueColor.color,
    redrawSelectColorCanvas,
    hueColor.initiator,
    updateColor,
  ]);

  useEffect(() => {
    if (!hueCanvas.current) return;
    const cntxBar = hueCanvas.current.getContext("2d");
    if (!cntxBar) return;
    drawHueClrBar(cntxBar);
  }, [drawHueClrBar]);

  const switchColorType = useCallback(() => {
    setColorTypeSwitch((prev) => (prev === "RGB" ? "HEX" : "RGB"));
  }, []);

  return {
    selectedColor,
    hueColor,
    colorCanvas,
    hueCanvas,
    colorTypeSwitch,
    registerHueClr,
    registerSelectedClr,
    changeHuePos,
    changeSelectedPos,
    switchColorType,
    updatePositionsOnCanvas,
  };
}
