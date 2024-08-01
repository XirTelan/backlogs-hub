import React, { useCallback, useEffect, useState } from "react";
import ButtonBase from "../../components/Common/UI/ButtonBase";
import { parseSeconds } from "@/utils";
import { CgClose } from "react-icons/cg";

const Timer = ({
  close,
  action,
}: {
  close: () => void;
  action: (value: number) => void;
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isPause, setIsPause] = useState(true);

  useEffect(() => {
    let timer = undefined;
    if (isPause) {
      clearInterval(timer);
      return;
    }
    timer = setInterval(() => {
      setSeconds((prev) => ++prev);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPause]);
  const { hh, mm, ss } = parseSeconds(seconds);

  const formated = `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss}`;

  const reset = useCallback(() => setSeconds(0), []);
  const handleSubmit = () => {
    action(seconds);
    close();
  };

  return (
    <div className="flex flex-col  ">
      <p>Timer</p>
      <div className=" flex items-center">
        <div
          className={`flex h-12 w-full place-content-center bg-layer-2 p-2 text-xl ${isPause ? "text-white" : " text-primary-link "}`}
        >
          {formated}
        </div>
        <div className="w-12">
          <ButtonBase
            type="button"
            variant="secondary"
            onClick={close}
            icon={<CgClose />}
          />
        </div>
      </div>
      <div className="flex">
        <ButtonBase
          type="button"
          variant="tertiary"
          onClick={reset}
          text={"Reset"}
        />
        <ButtonBase
          type="button"
          variant="tertiary"
          onClick={() => setIsPause((prev) => !prev)}
          text={isPause ? "Start" : "Pause"}
        />

        <ButtonBase
          type="button"
          variant="accent"
          onClick={handleSubmit}
          text={"Add"}
        />
      </div>
    </div>
  );
};

export default Timer;
