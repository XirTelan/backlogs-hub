import useCanvasPointer from "@/hooks/useCanvasPointer";
import useToggle from "@/hooks/useToggle";
import React, { useCallback, useEffect, useRef } from "react";
import InputField from "./UI/Input/InputField";

const ColorPicker = () => {
  const { isOpen } = useToggle(true); //wip
  const colorCanvas = useRef<HTMLCanvasElement>(null);
  const {
    color: selectedColor,
    setColor,
    updateColor,
    pos: selectedPos,
    changePos: changeSelectedPos,
    register: registerSelectedClr,
  } = useCanvasPointer(colorCanvas);
  const hueCanvas = useRef<HTMLCanvasElement>(null);
  const {
    color: baseColor,
    pos: basePos,
    changePos: changeBasePos,
    register: registerBaseClr,
  } = useCanvasPointer(hueCanvas);

  const drawSelectedClrCanvas = useCallback(
    (cntx: CanvasRenderingContext2D) => {
      if (!isOpen || !colorCanvas.current) return;
      const gradientV = cntx.createLinearGradient(0, 0, 0, cntx.canvas.height);
      cntx.clearRect(0, 0, cntx.canvas.width, cntx.canvas.height);
      gradientV.addColorStop(0, "rgba(0,0,0,0)");
      gradientV.addColorStop(1, "#000");
      cntx.fillStyle = gradientV;
      cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
      cntx.globalCompositeOperation = "darken";
      const gradientH = cntx.createLinearGradient(0, 0, cntx.canvas.width, 0);
      gradientH.addColorStop(0, "#fff");
      console.log("basecolor", baseColor);
      gradientH.addColorStop(1, baseColor);
      cntx.fillStyle = gradientH;
      cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
      console.log("canvasRect", colorCanvas.current.getClientRects());
      console.log(
        "canvasRectBound",
        colorCanvas.current.getBoundingClientRect(),
      );
    },
    [baseColor, isOpen],
  );

  const drawBaseClrBar = useCallback((cntx: CanvasRenderingContext2D) => {
    const gradientH = cntx.createLinearGradient(0, 0, cntx.canvas.width, 0);
    gradientH.addColorStop(0, "#f00");
    gradientH.addColorStop(0.17, "#ff0");
    gradientH.addColorStop(0.33, "#bfff00");
    gradientH.addColorStop(0.5, "#00FFFF");
    gradientH.addColorStop(0.66, "#00f");
    gradientH.addColorStop(0.83, "#f0f");
    gradientH.addColorStop(1, "#f00");
    cntx.fillStyle = gradientH;
    cntx.fillRect(0, 0, cntx.canvas.width, cntx.canvas.height);
  }, []);

  useEffect(() => {
    if (!colorCanvas?.current) return;
    const cntx = colorCanvas.current.getContext("2d");
    if (!cntx) return;
    drawSelectedClrCanvas(cntx);
  }, [baseColor, drawSelectedClrCanvas, isOpen]);

  useEffect(() => {
    if (!hueCanvas.current) return;
    const cntxBar = hueCanvas.current.getContext("2d");
    if (!cntxBar) return;
    drawBaseClrBar(cntxBar);
  }, [drawBaseClrBar]);

  useEffect(() => {
    updateColor();
  }, [baseColor, updateColor]);

  // \(([^()]+)\)

  return (
    <div className=" max-w-60">
      <div className="relative flex w-60" {...registerSelectedClr}>
        <canvas
          ref={colorCanvas}
          width="200px"
          height="150px"
          id="selectedcolor_canvas"
          onClick={changeSelectedPos}
        ></canvas>
        <div
          className=" absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white  bg-transparent  "
          style={{
            background: `${selectedColor}`,
            left: selectedPos[0],
            top: selectedPos[1],
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
        <div className="relative " {...registerBaseClr}>
          <canvas
            ref={hueCanvas}
            onClick={changeBasePos}
            width="150px"
            height="20px"
            id="basecolor_canvas"
          ></canvas>
          <div
            className=" absolute top-0 h-full w-1 -translate-x-1/2  rounded bg-transparent  "
            style={{
              left: basePos[0],
              boxShadow: "0 0 0 1px white, 0 0 0 2px black",
            }}
          ></div>
        </div>
      </div>
      <div>
        <InputField
          variant="small"
          value={selectedColor}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
