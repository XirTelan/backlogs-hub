import { ColorRGB } from "../types/types";

export function drawSelectedClrCanvas(
  cntx: CanvasRenderingContext2D,
  hueColor: ColorRGB
) {
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
}
