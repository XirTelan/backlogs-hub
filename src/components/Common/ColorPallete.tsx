import React, { useEffect, useRef, useState } from "react";
import { IoIosColorPalette } from "react-icons/io";
import ButtonBase from "./UI/ButtonBase";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import useToggle from "@/hooks/useToggle";

const defaultColors = [
  "0043CE",
  "6929C4",
  "4D5358",
  "0E6027",
  "00539A",
  "A2191F",
  "005D5D",
  "9F1853",
  "FFFFFF",
];

const ColorPallete = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const { isOpen, setClose, setOpen } = useToggle();
  const ref = useRef(null);

  useOutsideClickReg(isOpen, ref, setClose);

  useEffect(() => {
    setCurrentColor(value);
  }, [value]);

  return (
    <div>
      <ButtonBase
        type="button"
        variant="secondary"
        size="small"
        style={{ backgroundColor: currentColor }}
        onClick={setOpen}
        icon={<IoIosColorPalette />}
      />

      {isOpen && (
        <div ref={ref} className="absolute inset-0 z-10 flex  w-fit">
          <div className=" fixed  flex h-auto gap-1  border border-subtle-1 bg-layer-1  p-2">
            {defaultColors.map((color, index) => (
              <div
                key={index}
                className="z-40 h-6 w-6 cursor-pointer rounded "
                style={{ backgroundColor: `#${color}` }}
                onClick={() => {
                  onChange(`#${color}`);
                  setClose();
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPallete;
