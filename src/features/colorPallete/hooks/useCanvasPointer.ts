import { clamp } from "@/shared/lib/utils";
import { RefObject, useCallback, useEffect, useState } from "react";
import { produce } from "immer";

import { useToggle } from "@/shared/hooks";
import { ColorRGB, ColorPickerValue } from "../types/types";
import { useThrottleCallback } from "@/shared/hooks/useThrottleCallback";

const useCanvasPointer = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  startColor: ColorRGB,
  startPos: [number, number]
) => {
  const [colorState, setColorState] = useState<ColorPickerValue>({
    color: startColor,
    pos: startPos,
    initiator: "init",
  });

  const [cntx, setCntx] = useState<CanvasRenderingContext2D>();
  const { isOpen: isTrack, setOpen: trackOn, setClose: trackOff } = useToggle();

  useEffect(() => {
    if (!canvasRef.current) return;
    const cntx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    if (!cntx) return;
    setCntx(cntx);
  }, [canvasRef]);

  const getColorByPos = useCallback(
    (x: number, y: number) => {
      if (!cntx) return [0, 0, 0];
      const pixel = cntx.getImageData(x, y, 1, 1)["data"];
      return Array.from(pixel);
    },
    [cntx]
  );

  const setPos = useCallback(
    (
      x: number,
      y: number,
      initiator: ColorPickerValue["initiator"] = "pointer"
    ) => {
      setColorState(
        produce((draft) => {
          draft.pos = [x, y];
          const [r, g, b] = getColorByPos(x, y);

          if (draft.initiator !== "input") draft.color = { r, g, b };

          draft.initiator = initiator;
        })
      );
    },
    [getColorByPos]
  );

  const changePos = useCallback(
    ({ clientX, clientY }: { clientX: number; clientY: number }) => {
      if (!canvasRef?.current) return;

      const { left, top, width, height } =
        canvasRef.current.getBoundingClientRect();

      const leftClamp = clamp(clientX - left, 0, width - 1);
      const topClamp = clamp(clientY - top, 0, height);

      if (leftClamp === colorState.pos[0] && topClamp === colorState.pos[1])
        return;
      setPos(leftClamp, topClamp, "pointer");
    },
    [canvasRef, colorState.pos, setPos]
  );

  const updateColor = useCallback(
    (initiator: ColorPickerValue["initiator"]) => {
      setColorState(
        produce((draft) => {
          const [r, g, b] = getColorByPos(draft.pos[0], draft.pos[1]);
          draft.color = { r, g, b };
          draft.initiator = initiator;
        })
      );
    },
    [getColorByPos]
  );

  const setAll = useCallback(
    (
      color: ColorRGB,
      pos: [number, number],
      initiator: ColorPickerValue["initiator"]
    ) => {
      setColorState(
        produce((draft) => {
          draft.color = color;
          draft.pos = pos;
          draft.initiator = initiator;
        })
      );
    },
    []
  );

  const handleMouseMove = useThrottleCallback(
    (e: React.MouseEvent<unknown>) => {
      if (!isTrack) return;
      changePos(e);
    },
    100
  );

  return {
    color: colorState,
    isTrack,
    setAll,
    updateColor,
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
