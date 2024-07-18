import React, { forwardRef, useMemo, useState } from "react";
import InputField from "./InputField";
import Timer from "./Timer";
import { parseSeconds, parseToSeconds } from "@/utils";
import ButtonBase from "./ButtonBase";
import { RxLapTimer } from "react-icons/rx";

const ProgressTimer = forwardRef<HTMLDivElement, ProgressTimerProps>(
  ({ label, name, defaultValue, setValue, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(
      useMemo(() => {
        console.log("cgheck");
        const [hh, mm, ss] = defaultValue.split(":").map(Number);
        return {
          hh,
          mm,
          ss,
        };
      }, [defaultValue]),
    );

    const handleTimer = (value: number) => {
      const seconds = parseToSeconds(time.hh, time.mm, time.ss);
      const newTime = parseSeconds(seconds + value);
      setTime(newTime);
    };

    const onChange = (option: string, value: number) => {
      setTime((prev) => {
        const newVal = {
          ...prev,
          [option]: value,
        };
        setValue(name, `${newVal.hh}:${newVal.mm}:${newVal.ss}`);
        return newVal;
      });
    };

    const currentProgress = (
      <>
        <p>{label}</p>
        <div className="flex items-center">
          <div className="grid grid-cols-3 ">
            <input {...props} className="hidden"></input>
            <InputField
              placeholder="HH"
              value={time.hh}
              onChange={(e) => onChange("hh", e.currentTarget.valueAsNumber)}
              min={0}
              type="number"
            />
            <InputField
              placeholder="MM"
              value={time.mm}
              onChange={(e) => onChange("mm", e.currentTarget.valueAsNumber)}
              type="number"
              min={0}
              max={59}
              maxLength={2}
            />
            <InputField
              placeholder="SS"
              value={time.ss}
              onChange={(e) => onChange("ss", e.currentTarget.valueAsNumber)}
              type="number"
              min={0}
              max={59}
            />
          </div>
          <div className="mt-1 max-w-12">
            <ButtonBase
              type="button"
              variant="secondary"
              icon={<RxLapTimer />}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
      </>
    );
    return (
      <>
        <div ref={ref} className="relative">
          {isOpen ? (
            <Timer close={() => setIsOpen(false)} action={handleTimer} />
          ) : (
            currentProgress
          )}
        </div>
      </>
    );
  },
);
ProgressTimer.displayName = "progressTimer";
export default ProgressTimer;

type ProgressTimerProps = {
  label: string;
  name: string;
  defaultValue: string;
  setValue: (field: string, value: string) => void;
};
