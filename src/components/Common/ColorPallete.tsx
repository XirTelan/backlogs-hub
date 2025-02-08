import React, { useEffect, useRef, useState } from "react";
import { IoIosColorPalette } from "react-icons/io";
import ButtonBase from "./UI/ButtonBase";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import useToggle from "@/hooks/useToggle";
import ColorPicker from "./UI/ColorPicker/ColorPicker";
import { colors } from "@/utils";
import { createPortal } from "react-dom";
import classNames from "classnames";

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
  const { isOpen, setClose, setOpen } = useToggle();
  const [pos, setPos] = useState([0, 0]);

  const ref = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);

  useOutsideClickReg(isOpen, ref, setClose);

  useEffect(() => {
    if (!refContainer.current) return;
    const container = refContainer.current.getBoundingClientRect();
    setPos([container.right, container.top + window.scrollY]);
  }, [refContainer.current]);

  return (
    <div ref={refContainer} className="">
      <ButtonBase
        type="button"
        variant="secondary"
        size="small"
        style={{ backgroundColor: value }}
        onClick={setOpen}
        icon={<IoIosColorPalette />}
      />

      {isOpen &&
        createPortal(
          <div
            ref={ref}
            className={classNames(
              "absolute mt-8  z-10 flex w-[220px] border rounded-t-lg bg-layer-1   border-border-tile-1  flex-col ",
            )}
            style={{
              left: `calc(${pos[0]}px - 220px)`,
              top: pos[1],
            }}
          >
            <ColorPicker value={colors.hexToRgb(value)} onChange={onChange} />
            <div id="colorpallete" className="  flex    p-2">
              {/* <ButtonBase title="asd" text="Custom"></ButtonBase>
            <ColorPicker /> */}
              <div className=" flex gap-1 flex-wrap">
                {defaultColors.map((color, index) => (
                  <div
                    key={index}
                    className="z-40 h-6 w-6 cursor-pointer rounded-sm "
                    style={{ backgroundColor: `#${color}` }}
                    onClick={() => {
                      onChange(`#${color}`);
                      setClose();
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ColorPallete;
