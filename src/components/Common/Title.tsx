import React from "react";

const Title = ({ title, children }: TitleProps) => {
  return (
    <div className="my-2 flex items-center border-b border-neutral-800 py-2  ">
      <h2 className=" text-2xl font-bold">{title}</h2>
      <div className="ms-auto">{children}</div>
    </div>
  );
};
type TitleProps = {
  title: string;
  children: React.ReactElement;
};
export default Title;
