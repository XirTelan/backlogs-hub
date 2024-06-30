import React from "react";
import Title from "./Common/Title";
import ButtonBase from "./Common/UI/ButtonBase";

const FieldsBlock = (props: FieldsBlockProps) => {
  return (
    <section className=" flex flex-col">
      {props.title && (
        <div className="border-b border-subtle-1">
          <Title variant={3} title={props.title}>
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
        <ul className=" xs:grid-cols-4 grid grid-cols-1 gap-4 overflow-auto md:grid-cols-8 lg:grid-cols-12 ">
          {props.children}
        </ul>
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
