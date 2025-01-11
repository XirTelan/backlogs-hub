import { clamp } from "@/utils";
import { RefObject, useCallback, useEffect, useState } from "react";
import useToggle from "./useToggle";

const useCanvasPointer = (
  canvasRef: RefObject<HTMLCanvasElement>,
  defaultColor = "#fff",
) => {
  const [color, setColor] = useState(defaultColor);
  const [cntx, setCntx] = useState<CanvasRenderingContext2D>();
  const { isOpen: isTrack, setOpen: trackOn, setClose: trackOff } = useToggle();
  const [pos, setPos] = useState([0, 0]);

  function changePos({ clientX, clientY }: React.MouseEvent<unknown>) {
    if (!canvasRef?.current) return;
    const { left, top, width, height } =
      canvasRef.current.getBoundingClientRect();

    const leftClamp = clamp(clientX - left, 0, width - 1);
    console.log("max", leftClamp);
    const topClamp = clamp(clientY - top, 0, height - 1);
    if (leftClamp !== pos[0] || topClamp !== pos[1])
      window.requestAnimationFrame(() => setPos([leftClamp, topClamp]));
  }

  function getColor(cntx: CanvasRenderingContext2D, x: number, y: number) {
    const pixel = cntx.getImageData(x, y, 1, 1)["data"];
    const rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    return rgb;
  }

  const updateColor = useCallback(() => {
    if (!cntx) return;
    const newColor = getColor(cntx, pos[0], pos[1]);
    setColor((prev) => (prev === newColor ? prev : newColor));
  }, [cntx, pos]);

  function handleMouseMove(e: React.MouseEvent<unknown>) {
    if (!isTrack) return;
    changePos(e);
    updateColor();
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const cntx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    if (!cntx) return;
    setCntx(cntx);
  }, []);

  return {
    color,
    setColor,
    updateColor,
    pos,
    changePos,
    register: {
      onMouseDown: trackOn,
      onMouseUp: trackOff,
      onMouseMove: handleMouseMove,
      onMouseLeave: trackOff,
    },
  };
};

export default useCanvasPointer;
