import React from "react";
import { Title } from "./Title";
import { TitleProps } from "./title.types";

export const TopTitle = ({
  title,
  children,
  ...props
}: {
  title: string;
  children?: React.ReactElement | null;
  props?: TitleProps;
}) => {
  return (
    <div className="mb-4 flex w-full  justify-center bg-black  text-text-on-color ">
      <div className="container">
        <Title title={title} {...props}>
          <div>{children}</div>
        </Title>
      </div>
    </div>
  );
};
