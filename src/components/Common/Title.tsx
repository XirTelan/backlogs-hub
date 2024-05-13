import React from "react";

const Title = ({ title, variant = 1, description, children }: TitleProps) => {
  const fonts = {
    1: "text-3xl font-semibold",
    2: "text-2xl",
    3: "text-xl",
    4: "",
    5: "",
    6: "",
  };

  const sizes = {
    1: "my-10",
    2: "my-4",
    3: "my-2",
    4: "",
    5: "",
    6: "",
  };
  const Tag: keyof JSX.IntrinsicElements = `h${variant}`;
  return (
    <div className={`${sizes[variant]} flex w-full items-center  `}>
      <div>
        <Tag className={`${fonts[variant]} flex`}>{title}</Tag>
        {description && <p className=" text-secondary-text ">{description}</p>}
      </div>
      <div className="ms-auto">{children}</div>
    </div>
  );
};
type TitleProps = {
  title: string;
  description?: string;
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactElement | null;
};
export default Title;
