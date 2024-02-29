import React from "react";
import Title from "./Common/Title";
import ButtonBase from "./Common/UI/ButtonBase";

const FieldsBlock = (props: FieldsBlockProps) => {
  return (
    <div className={`   bg-layer-1`}>
      {props.title && (
        <div className="border-b border-subtle-1">
          <Title variant={2} title={props.title}>
            {props.status == "active" ? (
              <ButtonBase
                text="Add field"
                type="button"
                variant="secondary"
                onClick={() => props.append()}
              />
            ) : null}
          </Title>
        </div>
      )}
      <div className="mb-4 flex-wrap rounded  p-4">
        <ul className=" grid max-h-[calc(100vh-40rem)] grid-cols-4 flex-col gap-1  ">
          {props.children}
        </ul>
      </div>
    </div>
  );
};

export default FieldsBlock;

type FieldsBlockProps = {
  title?: string;
  children: React.ReactElement;
} & (FieldsBlockRead | FieldsBlockEdit) &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type FieldsBlockRead = {
  status: "disabled";
};
type FieldsBlockEdit = {
  status: "active";
  append: () => void;
};
