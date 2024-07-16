import React from "react";
import Title, { TitleProps } from "../Title";

const TopTitle = ({
  title,
  children,
  ...props
}: {
  title: string;
  children?: React.ReactElement | null;
  props?: TitleProps;
}) => {
  return (
    <div className="mb-4 flex w-full  justify-center bg-black">
      <div className="container">
        <Title title={title} {...props}>
          {children}
        </Title>
      </div>
    </div>
  );
};

export default TopTitle;
