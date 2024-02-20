import React from "react";

const Title = ({ title, variant = 1, children }: TitleProps) => {
  const fonts = {
    1: "text-3xl font-semibold",
    2: "text-2xl",
    3: "",
    4: "",
    5: "",
    6: "",
  };

  const sizes = {
    1: "my-10",
    2: "my-4",
    3: "",
    4: "",
    5: "",
    6: "",
  };
  const Tag: keyof JSX.IntrinsicElements = `h${variant}`;
  return (
    <div className={`${sizes[variant]} flex w-full items-center  `}>
      <Tag className={`${fonts[variant]} flex  ps-4`}>{title}</Tag>
      <div className="ms-auto">{children}</div>
    </div>
  );
};
type TitleProps = {
  title: string;
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactElement | null;
};
export default Title;
