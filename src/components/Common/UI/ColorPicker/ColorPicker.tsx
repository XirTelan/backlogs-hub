import useCanvasPointer from "@/hooks/useCanvasPointer";
import useToggle from "@/hooks/useToggle";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ColorRgbField from "./ColorRgbField";
import { clamp, colors, math } from "@/utils";
import HexFielld from "./HexFielld";

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

const ColorPicker = () => {
  const { isOpen } = useToggle(true); //wip
  const [colorTypeSwitch, setColorTypeSwitch] = useState<ColorType>("RGB");
  const colorCanvas = useRef<HTMLCanvasElement>(null);
  const {
    color: selectedColor,
    setColor,
    pos: selectedPos,
    setPos: setSelectedPos,
    changePos: changeSelectedPos,
    register: registerSelectedClr,
  } = useCanvasPointer(colorCanvas);
  const hueCanvas = useRef<HTMLCanvasElement>(null);
  const {
    color: hueColor,
    pos: huePos,
    changePos: changeHuePos,
    setPos: setHuePos,
    register: registerHueClr,
  } = useCanvasPointer(hueCanvas, undefined, false);

  const drawSelectedClrCanvas = useCallback(
    (cntx: CanvasRenderingContext2D) => {
      if (!isOpen || !colorCanvas.current) return;
      const gradientV = cntx.createLinearGradient(0, 0, 0, cntx.canvas.height);
      cntx.clearRect(0, 0, cntx.canvas.width, cntx.canvas.height);
      gradientV.addColorStop(0.01, "rgba(0,0,0,0)");
      gradientV.addColorStop(0.99, "#000");
      cntx.fillStyle = gradientV;
      cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
      cntx.globalCompositeOperation = "multiply";
      const gradientH = cntx.createLinearGradient(0, 0, cntx.canvas.width, 0);
      gradientH.addColorStop(0.01, "#fff");
      gradientH.addColorStop(0.99, hueColor);
      cntx.fillStyle = gradientH;
      cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
    },
    [hueColor, isOpen],
  );

  const drawBaseClrBar = useCallback((cntx: CanvasRenderingContext2D) => {
    const gradientH = cntx.createLinearGradient(0, 0, cntx.canvas.width, 0);
    COLOR_STOPS.forEach(({ val, hsl }) => {
      gradientH.addColorStop(val, hsl);
    });

    cntx.fillStyle = gradientH;
    cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
  }, []);

  useEffect(() => {
    if (!colorCanvas?.current) return;
    const cntx = colorCanvas.current.getContext("2d");
    if (!cntx) return;
    drawSelectedClrCanvas(cntx);
  }, [hueColor, drawSelectedClrCanvas, isOpen]);

  useEffect(() => {
    if (!hueCanvas.current) return;
    const cntxBar = hueCanvas.current.getContext("2d");
    if (!cntxBar) return;
    drawBaseClrBar(cntxBar);
  }, [drawBaseClrBar]);

  function switchColorType() {
    setColorTypeSwitch((prev) => (prev === "RGB" ? "HEX" : "RGB"));
  }

  function colorChangeByRGBInput(value: string, part: string) {
    setColor((prev) => {
      const newColor = colors.rgbStringToArray(prev);
      newColor[Number(part)] = clamp(Number(value), 0, 255);
      calcDistance(newColor);
      return `rgb(${newColor.join(",")})`;
    });
  }

  function renderTextColorInput(colorType: ColorType) {
    switch (colorType) {
      case "HEX":
        return <HexFielld selectedColor={selectedColor} />;
        break;
      case "RGB":
        {
          const colorArr = selectedColor
            .slice(4, selectedColor.length - 1)
            .split(",");
          return (
            <ColorRgbField color={colorArr} onChange={colorChangeByRGBInput} />
          );
        }
        break;
    }
  }

  async function calcDistance(e: number[]) {
    const newColor = e;
    const { h, s, l } = colors.rgbToHsl(newColor);
    const xPos = math.mapRange(s, 0, 100, 0, 230);
    const yPos = math.mapRange(l, 0, 100, 0, 150);
    const huePos2 = (math.mapRange(h, 0, 360, 0, 150) + 150) % 150;
    setHuePos((prev) => [150 - huePos2, prev[1]]);
    setSelectedPos([xPos, 150 - yPos]);
  }

  return (
    <div className="max-w-64">
      <div className="relative flex w-60" {...registerSelectedClr}>
        <canvas
          ref={colorCanvas}
          height="150"
          width={"230"}
          id="selectedcolor_canvas"
          onClick={changeSelectedPos}
        ></canvas>
        <div
          className=" absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white  bg-transparent  "
          style={{
            background: `${selectedColor}`,
            transform: `translate(calc(${selectedPos[0]}px - 50%), calc(${selectedPos[1]}px - 50%))`,
          }}
        ></div>
      </div>
      <div className="mt-4 flex w-60 items-center gap-4">
        <div
          className="h-8 w-8 rounded-full border border-white "
          style={{
            backgroundColor: `${selectedColor}`,
          }}
        ></div>
        <div className="relative " {...registerHueClr}>
          <canvas
            ref={hueCanvas}
            onClick={changeHuePos}
            width="150px"
            height="20px"
            id="basecolor_canvas"
          ></canvas>
          <div
            className=" absolute top-0 h-full w-1 -translate-x-1/2  rounded bg-transparent  "
            style={{
              transform: `translate(${huePos[0]}px)`,
              boxShadow: "0 0 0 1px white, 0 0 0 2px black",
            }}
          />
        </div>
      </div>
      <div>
        {renderTextColorInput(colorTypeSwitch)}
        <button
          type="button"
          onClick={switchColorType}
          className=" flex w-full justify-evenly bg-white text-black"
        >
          {colorTypeSwitch === "RGB" ? (
            <>
              <p>{colorTypeSwitch[0]}</p>
              <p>{colorTypeSwitch[1]}</p>
              <p>{colorTypeSwitch[2]}</p>
            </>
          ) : (
            <p>{colorTypeSwitch}</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
