import React from "react";
import Title, { TitleProps } from "../Title";

const TopTitle = ({
  title,
  ...props
}: {
  title: string;
  props?: TitleProps;
}) => {
  return (
    <div className="mb-4 flex w-full  justify-center bg-black">
      <div className="container">
        <Title title={title} {...props}></Title>
      </div>
    </div>
  );
};

export default TopTitle;
