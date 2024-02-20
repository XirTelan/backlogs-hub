import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Title from "./Common/Title";
import ButtonBase from "./Common/UI/ButtonBase";

const FieldsBlock = (props: FieldsBlockProps) => {
  return (
    <div className={`${props.className} border-subtle-1 bg-layer-1`}>
      {props.title && (
        <Title variant={2} title={props.title}>
          {props.status == "active" ? (
            <ButtonBase
              text="Add field"
              type="button"
              variant="secondary"
              onClick={() => props.append({ name: "", color: "#00ff00" })}
            />
          ) : null}
        </Title>
      )}
      <div className="  mb-4 flex-wrap rounded  p-4">
        <ul>{props.children}</ul>
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
  append: (obj: { [key: string]: string }) => void;
};
