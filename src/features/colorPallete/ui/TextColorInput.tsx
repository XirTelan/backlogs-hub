import { ColorType, ColorPickerValue, ColorRGB } from "../types/types";
import ColorRgbField from "./ColorRgbField";
import HexFielld from "./HexFielld";

type TextColorInputProps = {
  colorType: ColorType;
  selectedColor: ColorPickerValue;
  hueColor: ColorPickerValue;
  onChange: (color: ColorRGB) => void;
};

export function TextColorInput({
  colorType,
  selectedColor,
  hueColor,
  onChange,
}: TextColorInputProps) {
  return colorType == "HEX" ? (
    <HexFielld
      selectedColor={selectedColor}
      hueColor={hueColor}
      onChange={onChange}
    />
  ) : (
    <ColorRgbField color={selectedColor.color} onChange={onChange} />
  );
}
