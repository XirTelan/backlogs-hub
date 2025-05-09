import React, { JSX, useEffect, useMemo, useState } from "react";
import Timer from "./ui/Timer";
import { parseSeconds, parseToSeconds } from "@/shared/lib/utils";
import { RxLapTimer } from "react-icons/rx";
import { InputField, ButtonBase } from "@/shared/ui";

const ProgressTimer = ({
  label,
  layer = 1,
  name,
  defaultValue,
  setValue,
  ref,
  ...props
}: ProgressTimerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(
    useMemo(() => {
      if (!defaultValue)
        return {
          hh: 0,
          mm: 0,
          ss: 0,
        };
      const [hh, mm, ss] = defaultValue.split(":").map(Number);
      return {
        hh,
        mm,
        ss,
      };
    }, [defaultValue])
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
      return newVal;
    });
  };

  useEffect(() => {
    setValue(
      name,
      `${time.hh < 10 ? `0${time.hh}` : time.hh}:${time.mm < 10 ? `0${time.mm}` : time.mm}:${time.ss < 10 ? `0${time.ss}` : time.ss}`
    );
  }, [name, setValue, time]);

  const currentProgress = (
    <>
      <p>{label}</p>
      <div className="flex items-center">
        <div className="grid grid-cols-3 ">
          <input {...props} aria-hidden className="hidden"></input>
          <InputField
            layer={layer}
            placeholder="HH"
            variant="small"
            value={time.hh}
            onChange={(e) => onChange("hh", e.currentTarget.valueAsNumber)}
            min={0}
            type="number"
          />
          <InputField
            layer={layer}
            placeholder="MM"
            value={time.mm}
            variant="small"
            onChange={(e) => onChange("mm", e.currentTarget.valueAsNumber)}
            type="number"
            min={0}
            max={59}
            maxLength={2}
          />
          <InputField
            layer={layer}
            placeholder="SS"
            variant="small"
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
            size="small"
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
};
export default ProgressTimer;

type ProgressTimerProps = {
  label: string;
  name: string;
  layer?: 1 | 2 | 3;
  defaultValue: string;
  ref?: JSX.IntrinsicElements["div"]["ref"];
  setValue: (field: string, value: string) => void;
};
