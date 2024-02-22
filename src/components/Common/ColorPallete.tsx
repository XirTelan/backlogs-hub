import React, { useEffect, useRef, useState } from "react";
import { IoIosColorPalette } from "react-icons/io";
import ButtonBase from "./UI/ButtonBase";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";

const defaultColors = [
  "FF6900",
  "FCB900",
  "7BDCB5",
  "00D084",
  "8ED1FC",
  "0693E3",
  "ABB8C3",
  "EB144C",
  "F78DA7",
  "9900EF",
];

const ColorPallete = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClickReg(isOpen, ref, () => setIsOpen(false));

  useEffect(() => {
    setCurrentColor(value);
  }, [value]);
  return (
    <div className="relative">
      <ButtonBase
        type="button"
        variant="secondary"
        size="small"
        style={{ backgroundColor: currentColor }}
        onClick={() => setIsOpen((prevValue) => !prevValue)}
      >
        <IoIosColorPalette />
      </ButtonBase>
      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-full z-10 flex h-auto gap-1  border border-subtle-1 bg-layer-1  p-2"
        >
          {defaultColors.map((color, index) => (
            <div
              key={index}
              className="h-6 w-6 cursor-pointer rounded"
              style={{ backgroundColor: `#${color}` }}
              onClick={() => {
                onChange(`#${color}`);
                setIsOpen(false);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPallete;
