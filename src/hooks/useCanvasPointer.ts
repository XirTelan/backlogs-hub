import { clamp } from "@/utils";
import { RefObject, useCallback, useEffect, useState } from "react";
import useToggle from "./useToggle";

const useCanvasPointer = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  defaultColor = "#fff",
  isUpdateColorOnPosChange = false,
) => {
  const [color, setColor] = useState(defaultColor);
  const [cntx, setCntx] = useState<CanvasRenderingContext2D>();
  const { isOpen: isTrack, setOpen: trackOn, setClose: trackOff } = useToggle();
  const [pos, setPos] = useState([0, 0]);

  function changePos({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) {
    if (!canvasRef?.current) return;
    const { left, top, width, height } =
      canvasRef.current.getBoundingClientRect();

    const leftClamp = clamp(clientX - left, 0, width - 1);
    const topClamp = clamp(clientY - top, 0, height);
    if (leftClamp !== pos[0] || topClamp !== pos[1])
      window.requestAnimationFrame(() => setPos([leftClamp, topClamp]));
  }

  function getColor(cntx: CanvasRenderingContext2D, x: number, y: number) {
    const pixel = cntx.getImageData(x, y, 1, 1)["data"];
    return Array.from(pixel);
  }

  function getColorByPos(x: number, y: number) {
    if (!cntx) return [0, 0, 0];
    return getColor(cntx, x, y);
  }

  const updateColor = useCallback(() => {
    if (!cntx || isNaN(pos[0]) || isNaN(pos[1])) return;
    const newColor = getColor(cntx, pos[0], pos[1]);
    const rgbString = `rgb(${newColor[0]},${newColor[1]},${newColor[2]})`;
    setColor((prev) => (prev === rgbString ? prev : rgbString));
  }, [cntx, pos]);

  function handleMouseMove(e: React.MouseEvent<unknown>) {
    if (!isTrack) return;
    changePos(e);
    updateColor();
  }

  useEffect(() => {
    if (!isUpdateColorOnPosChange) return;
    updateColor();
  }, [canvasRef, isUpdateColorOnPosChange, pos, updateColor]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cntx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    if (!cntx) return;
    setCntx(cntx);
  }, [canvasRef]);

  return {
    color,
    setColor,
    getColorByPos,
    updateColor,
    pos,
    changePos,
    setPos,
    register: {
      onMouseDown: trackOn,
      onMouseUp: trackOff,
      onMouseMove: handleMouseMove,
      onMouseLeave: trackOff,
    },
  };
};

export default useCanvasPointer;
