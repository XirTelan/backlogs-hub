import React from "react";
import InputField from "../Input/InputField";

const ColorRgbField = ({
  color,
  onChange,
}: {
  color: string[];
  onChange: (value: string, colorPart: string) => void;
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const colorPart = e.target.dataset.type || "";
    onChange(e.target.value, colorPart);
  }

  return (
    <div className="mb-4 mt-2 flex justify-evenly gap-1 text-sm *:w-14">
      {[0, 1, 2].map((val) => {
        return (
          <InputField
            key={val}
            isSimple
            onChange={handleChange}
            variant="small"
            layer={2}
            value={color[val]}
            data-type={`${val}`}
            style={{}}
          />
        );
      })}
    </div>
  );
};

export default ColorRgbField;
