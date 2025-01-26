import React, { useEffect, useState } from "react";
import InputField from "../Input/InputField";
import { colors } from "@/utils";

const HexFielld = ({ selectedColor }: { selectedColor: string }) => {
  const [hexValue, setHexValue] = useState(colors.rgbToHex(selectedColor));

  useEffect(() => {
    setHexValue(colors.rgbToHex(selectedColor));
  }, [selectedColor]);

  return (
    <div className="mb-4 mt-2">
      <InputField
        isSimple
        variant="small"
        layer={2}
        maxLength={7}
        value={hexValue}
        onChange={(e) => {
          setHexValue(e.target.value);
          const hex = colors.hexToRgb(e.target.value);
          if (isNaN(hex[0]) || isNaN(hex[1]) || isNaN(hex[2])) return;
        }}
      />
    </div>
  );
};

export default HexFielld;
