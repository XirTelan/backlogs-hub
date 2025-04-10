import React, { useEffect, useState } from "react";
import InputField from "../../../components/Common/UI/Input/InputField";
import { colors } from "@/utils";
import { ColorPickerValue, ColorRGB } from "@/types";
import { FiHash } from "react-icons/fi";

const HexFielld = ({
  selectedColor,
  hueColor,
  onChange,
}: {
  selectedColor: ColorPickerValue;
  hueColor: ColorPickerValue;
  onChange: (color: ColorRGB) => void;
}) => {
  const [hexValue, setHexValue] = useState(
    colors.rgbToHex(selectedColor.color)
  );

  useEffect(() => {
    if (
      selectedColor.initiator === "input" ||
      selectedColor.initiator === "hueChange"
    )
      return;
    const handle = window.requestAnimationFrame(() =>
      setHexValue(colors.rgbToHex(selectedColor.color))
    );
    return () => window.cancelAnimationFrame(handle);
  }, [selectedColor.color]);

  useEffect(() => {
    if (hueColor.initiator === "hueChange" || hueColor.initiator == "input")
      return;
    const handle = window.requestAnimationFrame(() =>
      setHexValue(colors.rgbToHex(selectedColor.color))
    );
    return () => window.cancelAnimationFrame(handle);
  }, [hueColor.color]);

  return (
    <InputField
      isSimple
      variant="small"
      layer={2}
      maxLength={6}
      value={hexValue.replace("#", "")}
      onChange={(e) => {
        setHexValue(e.target.value);
        const hex = colors.hexToRgb(e.target.value);
        if (Object.values(hex).some(isNaN)) return;
        onChange(hex);
      }}
      style={{
        textAlign: "center",
      }}
    >
      <span className="absolute w-10  left-[2px] top-[2px] bottom-[2px]  bg-layer-3 justify-center items-center  inline-flex">
        <FiHash />
      </span>
    </InputField>
  );
};

export default HexFielld;
