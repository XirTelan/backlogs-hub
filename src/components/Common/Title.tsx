import React, { CSSProperties } from "react";

const Title = ({
  title,
  variant = 1,
  description,
  style,
  width = "100%",
  titleOffset = 0,
  children,
}: TitleProps) => {
  const fonts = {
    1: "text-3xl font-semibold ",
    2: "text-2xl",
    3: "text-xl",
    4: "",
    5: "",
    6: "",
  };

  const sizes = {
    1: "py-6 px-4 bg-black",
    2: "my-2",
    3: "my-1",
    4: "",
    5: "",
    6: "",
  };
  const Tag: keyof JSX.IntrinsicElements = `h${variant}`;
  return (
    <div
      className={`${sizes[variant]} flex  items-center`}
      style={
        style
          ? style
          : {
              width: width,
            }
      }
    >
      <div>
        <Tag
          className={`${fonts[variant]} flex`}
          style={{ marginLeft: titleOffset }}
        >
          {title}
        </Tag>
        {description && (
          <p className=" pe-2 text-secondary-text">{description}</p>
        )}
      </div>
      {children && <div className="ms-auto">{children}</div>}
    </div>
  );
};
export type TitleProps = {
  title: string;
  description?: string;
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  titleOffset?: number | string;
  children?: React.ReactElement | null;
  style?: CSSProperties;
  width?: string | number;
};
export default Title;
