import React from "react";
import Title from "./Common/Title";
import ButtonBase from "./Common/UI/ButtonBase";

const FieldsBlock = (props: FieldsBlockProps) => {
  return (
    <section className=" flex flex-col">
      {props.title && (
        <div className="border-b border-subtle-1">
          <Title variant={3} style={{ margin: ".5rem 0" }} title={props.title}>
            {props.status == "active" ? (
              <ButtonBase
                style={{ width: "8rem" }}
                text="Add category"
                type="button"
                variant="tertiary"
                onClick={() => props.append()}
              />
            ) : null}
          </Title>
        </div>
      )}
      <div className="flex-wrap  rounded  py-4">
        <ul className="grid  gap-4 overflow-auto">{props.children}</ul>
      </div>
    </section>
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
