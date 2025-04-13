import { TbSwitchVertical } from "react-icons/tb";
import { ButtonBase } from "@/shared/ui";
import { ColorRGB } from "../types/types";
import { useColorPicker } from "../hooks/useColorPicker";
import { TextColorInput } from "./TextColorInput";

const SIZES = {
  width: 220,
  height: 120,
  hueWidth: 150,
  hueHeight: 10,
};

const ColorPicker = ({
  value,
  onChange,
}: {
  value: ColorRGB;
  onChange: (value: string) => void;
}) => {
  const {
    selectedColor,
    hueColor,
    colorTypeSwitch,
    switchColorType,
    colorCanvas,
    hueCanvas,
    changeSelectedPos,
    changeHuePos,
    registerSelectedClr,
    registerHueClr,
    updatePositionsOnCanvas,
  } = useColorPicker(
    value,
    SIZES.width,
    SIZES.height,
    SIZES.hueWidth,
    onChange
  );

  return (
    <div className=" w-fit rounded-t-lg overflow-hidden ">
      <div className="relative flex " {...registerSelectedClr}>
        <canvas
          ref={colorCanvas}
          height={`${SIZES.height}px`}
          width={`${SIZES.width}px`}
          id="selectedcolor_canvas"
          onClick={changeSelectedPos}
        ></canvas>
        <div
          className=" absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white  bg-transparent  "
          style={{
            background: `rgb(${selectedColor.color.r},${selectedColor.color.g},${selectedColor.color.b})`,
            transform: `translate(calc(${selectedColor.pos[0]}px), calc(${selectedColor.pos[1]}px))`,
          }}
        ></div>
      </div>
      <div className="mt-4 flex  items-center justify-center gap-4">
        <div
          className="h-6 w-6 rounded-full border border-white "
          style={{
            backgroundColor: `rgb(${selectedColor.color.r},${selectedColor.color.g},${selectedColor.color.b})`,
          }}
        ></div>
        <div className="relative " {...registerHueClr}>
          <canvas
            ref={hueCanvas}
            onClick={changeHuePos}
            width={`${SIZES.hueWidth}px`}
            height={`${SIZES.hueHeight}px`}
            id="basecolor_canvas"
          ></canvas>
          <div
            className=" absolute top-0 h-full w-1 -translate-x-1/2  rounded   "
            style={{
              background: `rgb(${hueColor.color.r},${hueColor.color.g},${hueColor.color.b})`,
              transform: `translate(${hueColor.pos[0]}px)`,
              boxShadow: "0 0 0 1px white, 0 0 0 2px black",
            }}
          />
        </div>
      </div>
      <div className="justify-center flex">
        <div className="w-[176px] mb-4 mt-2">
          <TextColorInput
            colorType={colorTypeSwitch}
            selectedColor={selectedColor}
            hueColor={hueColor}
            onChange={updatePositionsOnCanvas}
          />
        </div>
      </div>
      <ButtonBase
        size="small"
        type="button"
        variant="secondary"
        onClick={switchColorType}
      >
        <div className="flex pointer-events-none justify-evenly relative w-full">
          {colorTypeSwitch === "RGB" ? (
            <>
              <p>{colorTypeSwitch[0]}</p>
              <p>{colorTypeSwitch[1]}</p>
              <p>{colorTypeSwitch[2]}</p>
            </>
          ) : (
            <p>{colorTypeSwitch}</p>
          )}
          <div className="absolute my-auto right-0 me-2 top-0 bottom-0 content-center">
            <TbSwitchVertical />
          </div>
        </div>
      </ButtonBase>
    </div>
  );
};

export default ColorPicker;
