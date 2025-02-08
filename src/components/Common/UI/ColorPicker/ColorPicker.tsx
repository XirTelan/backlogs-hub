import useCanvasPointer from "@/hooks/useCanvasPointer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ColorRgbField from "./ColorRgbField";
import { colors, math } from "@/utils";
import HexFielld from "./HexFielld";
import { ColorRGB } from "@/types";
import { TbSwitchVertical } from "react-icons/tb";
import ButtonBase from "../ButtonBase";

type ColorType = "RGB" | "HEX";

const COLOR_STOPS = [
  { val: 0.01, hsl: "hsl(360,100%,50%)", color: "#f00", rgb: [0, 255, 0] },
  { val: 0.17, hsl: "hsl(300,100%,50%)", color: "#ff0", rgb: [255, 255, 0] },
  { val: 0.33, hsl: "hsl(240,100%,50%)", color: "#bfff00", rgb: [191, 255, 0] },
  { val: 0.5, hsl: "hsl(180,100%,50%)", color: "#00FFFF", rgb: [0, 255, 255] },
  { val: 0.66, hsl: "hsl(120,100%,50%)", color: "#00f", rgb: [0, 0, 255] },
  { val: 0.83, hsl: "hsl(60,100%,50%)", color: "#f0f", rgb: [255, 0, 255] },
  { val: 0.99, hsl: "hsl(0,100%,50%)", color: "#f00", rgb: [255, 0, 0] },
];

const ColorPicker = ({
  value,
  onChange,
}: {
  value: ColorRGB;
  onChange: (value: string) => void;
}) => {
  const [colorTypeSwitch, setColorTypeSwitch] = useState<ColorType>("RGB");
  const colorCanvas = useRef<HTMLCanvasElement>(null);
  const hueCanvas = useRef<HTMLCanvasElement>(null);

  const {
    color: hueColor,
    isTrack: hueTrack,
    setAll: setHueAll,
    changePos: changeHuePos,
    register: registerHueClr,
  } = useCanvasPointer(hueCanvas, { r: 255, g: 0, b: 0 });

  const {
    color: selectedColor,
    isTrack: colorTrack,
    setAll,
    updateColor,
    changePos: changeSelectedPos,
    register: registerSelectedClr,
  } = useCanvasPointer(colorCanvas, { r: 255, g: 255, b: 255 });

  const drawSelectedClrCanvas = useCallback(
    (cntx: CanvasRenderingContext2D, hueColor: ColorRGB) => {
      if (!colorCanvas.current) return;
      const gradientV = cntx.createLinearGradient(0, 0, 0, cntx.canvas.height);
      cntx.clearRect(0, 0, cntx.canvas.width, cntx.canvas.height);
      gradientV.addColorStop(0.01, "rgba(0,0,0,0)");
      gradientV.addColorStop(0.99, "#000");
      cntx.fillStyle = gradientV;
      cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
      cntx.globalCompositeOperation = "multiply";
      const gradientH = cntx.createLinearGradient(0, 0, cntx.canvas.width, 0);
      gradientH.addColorStop(0.01, "#fff");
      const { r, g, b } = hueColor;
      gradientH.addColorStop(0.99, `rgb(${r},${g},${b})`);
      cntx.fillStyle = gradientH;
      cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
    },
    [hueColor],
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
  }, [selectedColor.color, colorTrack, hueTrack]);

  useEffect(() => {
    updatePositionsOnCanvas(value);
  }, []);

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
  }, [hueColor.color, drawSelectedClrCanvas]);

  useEffect(() => {}, [hueColor.color, drawSelectedClrCanvas]);

  useEffect(() => {
    if (!hueCanvas.current) return;
    const cntxBar = hueCanvas.current.getContext("2d");
    if (!cntxBar) return;
    drawHueClrBar(cntxBar);
  }, [drawHueClrBar]);

  function switchColorType() {
    setColorTypeSwitch((prev) => (prev === "RGB" ? "HEX" : "RGB"));
  }

  function renderTextColorInput(colorType: ColorType) {
    switch (colorType) {
      case "HEX":
        return (
          <HexFielld
            selectedColor={selectedColor}
            hueColor={hueColor}
            onChange={updatePositionsOnCanvas}
          />
        );
        break;
      case "RGB":
        {
          return (
            <ColorRgbField
              color={selectedColor.color}
              onChange={updatePositionsOnCanvas}
            />
          );
        }
        break;
    }
  }

  function getCanvasSize(canvas: React.RefObject<HTMLCanvasElement | null>) {
    if (!canvas.current) return { width: 0, height: 0 };
    const { width, height } = canvas.current.getBoundingClientRect();
    return { width, height };
  }

  function updatePositionsOnCanvas(color: ColorRGB) {
    if (!color) return;
    const { hue, sat, v } = colors.rgbToHsv(color);

    const canvasSize = getCanvasSize(colorCanvas);
    const { width: hueCanvasWidth } = getCanvasSize(hueCanvas);

    const xPos = canvasSize.width * (sat / 100);
    const yPos = canvasSize.height * (v / 100);
    const huePos =
      (math.mapRange(hue, 0, 360, 0, hueCanvasWidth) + hueCanvasWidth) %
      hueCanvasWidth;
    const newHueColor = colors.hsvToRgb({ h: hue, s: 1, v: 1 });

    setHueAll(
      { r: newHueColor[0], g: newHueColor[1], b: newHueColor[2] },
      [hueCanvasWidth - huePos, 0],
      "input",
    );
    setAll(color, [xPos, canvasSize.height - yPos], "input");
  }

  return (
    <div className=" w-fit rounded-t-lg overflow-hidden ">
      <div className="relative flex " {...registerSelectedClr}>
        <canvas
          ref={colorCanvas}
          height="120"
          width={"220"}
          id="selectedcolor_canvas"
          onClick={changeSelectedPos}
        ></canvas>
        <div
          className=" absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white  bg-transparent  "
          style={{
            background: `rgb(${selectedColor.color.r},${selectedColor.color.g},${selectedColor.color.b})`,
            transform: `translate(calc(${selectedColor.pos[0]}px), calc(${selectedColor.pos[1]}px))`,
          }}
        ></div>
      </div>
      <div className="mt-4 flex  items-center justify-center gap-4">
        <div
          className="h-6 w-6 rounded-full border border-white "
          style={{
            backgroundColor: `rgb(${selectedColor.color.r},${selectedColor.color.g},${selectedColor.color.b})`,
          }}
        ></div>
        <div className="relative " {...registerHueClr}>
          <canvas
            ref={hueCanvas}
            onClick={changeHuePos}
            width="150px"
            height="10px"
            id="basecolor_canvas"
          ></canvas>
          <div
            className=" absolute top-0 h-full w-1 -translate-x-1/2  rounded   "
            style={{
              background: `rgb(${hueColor.color.r},${hueColor.color.g},${hueColor.color.b})`,
              transform: `translate(${hueColor.pos[0]}px)`,
              boxShadow: "0 0 0 1px white, 0 0 0 2px black",
            }}
          />
        </div>
      </div>
      <div className="justify-center flex">
        <div className="w-[176px] mb-4 mt-2">
          {renderTextColorInput(colorTypeSwitch)}
        </div>
      </div>
      <ButtonBase
        size="small"
        type="button"
        variant="secondary"
        onClick={switchColorType}
      >
        <div className="flex pointer-events-none justify-evenly relative w-full">
          {colorTypeSwitch === "RGB" ? (
            <>
              <p>{colorTypeSwitch[0]}</p>
              <p>{colorTypeSwitch[1]}</p>
              <p>{colorTypeSwitch[2]}</p>
            </>
          ) : (
            <p>{colorTypeSwitch}</p>
          )}
          <div className="absolute my-auto right-0 me-2 top-0 bottom-0 content-center">
            <TbSwitchVertical />
          </div>
        </div>
      </ButtonBase>
    </div>
  );
};

export default ColorPicker;
