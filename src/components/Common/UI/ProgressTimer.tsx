import React, { forwardRef, useEffect, useMemo, useState } from "react";
import InputField from "./InputField";
import Timer from "./Timer";
import { parseSeconds, parseToSeconds } from "@/utils";
import ButtonBase from "./ButtonBase";
import { RxLapTimer } from "react-icons/rx";

const ProgressTimer = forwardRef<HTMLDivElement, ProgressTimerProps>(
  ({ label, name, defaultValue, setValue }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [h, m, s] = useMemo(() => {
      return defaultValue.split(":").map(Number);
    }, [defaultValue]);
    const [hh, setHH] = useState(h || 0);
    const [mm, setMM] = useState(m || 0);
    const [ss, setSS] = useState(s || 0);

    const handleTimer = (value: number) => {
      const seconds = parseToSeconds(hh, mm, ss);
      const newTime = parseSeconds(seconds + value);
      setHH(newTime.hh);
      setMM(newTime.mm);
      setSS(newTime.ss);
    };

    useEffect(() => {
      setValue(name, `${hh}:${mm}:${ss}`);
    }, [hh, mm, name, setValue, ss]);

    const currentProgress = (
      <>
        <p>{label}</p>
        <div className="flex items-center">
          <div className="grid grid-cols-3 ">
            <InputField
              placeholder="HH"
              value={hh}
              onChange={(e) => setHH(e.currentTarget.valueAsNumber)}
              min={0}
              type="number"
            />
            <InputField
              placeholder="MM"
              value={mm}
              onChange={(e) => setMM(e.currentTarget.valueAsNumber)}
              type="number"
              min={0}
              max={59}
              maxLength={2}
            />
            <InputField
              placeholder="SS"
              value={ss}
              onChange={(e) => setSS(e.currentTarget.valueAsNumber)}
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
