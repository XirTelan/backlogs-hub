"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Carousel = <T,>({
  data,
  getKey,
  renderActive,
  renderThumbnail,
}: {
  data: T[];
  getKey: (item: T) => string;
  renderActive: (item: T) => React.ReactNode;
  renderThumbnail: (item: T) => React.ReactNode;
}) => {
  const [active, setActive] = useState(0);
  const n = data.length;

  const increase = () => {
    const newVal = active + 1;
    setActive(newVal >= n ? n : newVal);
  };
  const decrease = () => {
    const newVal = active - 1;
    setActive(newVal < 0 ? 0 : newVal);
  };
  return (
    <div className="m-auto flex h-screen max-w-[1536px] flex-col  items-center justify-center p-4 ">
      <div className=" relative flex  h-4/5 w-full items-center justify-center shadow-sm ">
        <div className="absolute inset-0 m-auto flex">
          {renderActive(data[active])}
        </div>
      </div>
      <div className="relative h-1/5  w-[90vw]  ">
        <div className="relative flex h-full items-center justify-center overflow-hidden   px-4   ">
          {data.map((item, indx) => (
            <button
              key={getKey(item)}
              className="absolute z-20 flex h-full w-40 items-center justify-center p-4 shadow-sm transition-all duration-300 ease-in-out md:w-80 md:p-8 2xl:w-[480px]  "
              style={{
                transform: `translate( ${(indx - active) * 100}%)`,
                scale: `${active === indx ? "1.1" : "0.9"}`,
              }}
              onClick={() => setActive(indx)}
            >
              {renderThumbnail(item)}
            </button>
          ))}
        </div>
        {active != 0 && (
          <button
            onClick={decrease}
            className="absolute bottom-0 left-0 top-0 z-40 h-12 w-12  animate-pulse text-primary-btn"
          >
            <FaChevronLeft className="absolute inset-0 " size={48} />
          </button>
        )}
        {active < n - 1 && (
          <button
            onClick={increase}
            className="absolute bottom-0 right-0 top-0 z-40 h-12 w-12 animate-pulse text-primary-btn"
          >
            <FaChevronRight className="absolute inset-0 " size={48} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
