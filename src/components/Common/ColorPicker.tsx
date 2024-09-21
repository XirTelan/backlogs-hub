import useToggle from "@/hooks/useToggle";
import React, { useEffect, useRef } from "react";

const ColorPicker = () => {
  const { isOpen } = useToggle();

  const colorCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen || !colorCanvas.current) return;
    const colorCtx = colorCanvas.current.getContext("2d");
    if (!colorCtx) return;
    const gradientV = colorCtx.createLinearGradient(0, 0, 0, 300);
    gradientV.addColorStop(0, "rgba(0,0,0,0)");
    gradientV.addColorStop(1, "#000");
    colorCtx.fillStyle = gradientV;
    colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);
    colorCtx.globalCompositeOperation = "darken";
    const color = "#0000ff";
    const gradientH = colorCtx.createLinearGradient(
      0,
      0,
      colorCtx.canvas.width,
      0,
    );
    gradientH.addColorStop(0, "#fff");
    gradientH.addColorStop(1, color);
    colorCtx.fillStyle = gradientH;
    colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);
    colorCanvas.current.addEventListener(
      "click",
      function ({ clientX, clientY }) {
        const pixel = colorCtx.getImageData(clientX, clientY, 1, 1)["data"]; // Read pixel Color
        const rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        document.body.style.background = rgb; //testing
      },
    );
  }, [isOpen, colorCanvas]);

  return (
    <div>
      <canvas
        ref={colorCanvas}
        width="300px"
        height="300px"
        id="color_canvas"
      ></canvas>
    </div>
  );
};

export default ColorPicker;
