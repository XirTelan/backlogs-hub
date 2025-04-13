import React from "react";
import { clamp } from "@/shared/lib/utils";
import { InputField } from "@/shared/ui";
import { ColorRGB } from "../types/types";

const ColorRgbField = ({
  color,
  onChange,
}: {
  color: ColorRGB;
  onChange: (color: ColorRGB) => void;
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const colorPart = e.target.dataset.type as keyof ColorRGB;
    const newColor = { ...color };
    let toNumber = Number(e.target.value);
    if (isNaN(toNumber)) toNumber = 0;

    toNumber = clamp(toNumber, 0, 255);

    newColor[colorPart] = toNumber;
    onChange(newColor);
  }

  return (
    <div className=" flex  gap-1 text-sm *:w-14">
      {Object.entries(color).map(([key, value]) => {
        return (
          <InputField
            key={key}
            isSimple
            onChange={handleChange}
            variant="small"
            layer={2}
            value={value ?? 0}
            data-type={`${key}`}
            style={{
              textAlign: "center",
            }}
          />
        );
      })}
    </div>
  );
};

export default ColorRgbField;
