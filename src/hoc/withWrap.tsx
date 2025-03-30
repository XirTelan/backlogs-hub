import React, { ComponentType, FC } from "react";

const withWrap = <T extends object>(Component: ComponentType<T>) => {
  const wrappedComponent: FC<T> = ({ ...props }) => (
    <div className=" flex  w-full flex-col bg-layer-1">
      <Component {...props} />
    </div>
  );
  return wrappedComponent;
};

export default withWrap;
