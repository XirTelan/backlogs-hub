import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    setCurrentColor(value);
  }, [value]);
  return (
    <div
      className={`bg relative h-6 min-h-6 w-6 min-w-6 cursor-pointer rounded-full`}
      style={{ backgroundColor: currentColor }}
      onClick={() => setIsOpen((prevValue) => !prevValue)}
    >
      {isOpen && (
        <div className="absolute left-0 top-full z-10 flex h-auto gap-1 rounded border border-neutral-700 bg-neutral-800 p-1">
          {defaultColors.map((color, index) => (
            <div
              key={index}
              className="h-6 w-6 cursor-pointer rounded"
              style={{ backgroundColor: `#${color}` }}
              onClick={() => {
                onChange(`#${color}`);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPallete;
