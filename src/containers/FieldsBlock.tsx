import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const FieldsBlock = (props: FieldsBlockProps) => {
  return (
    <>
      {props.title && (
        <div className=" left-0 top-0  w-full  rounded-t border-t  border-green-700 bg-green-800">
          <h2 className="ms-4 p-2">{props.title}</h2>
        </div>
      )}
      <div className="  mb-4 rounded border border-neutral-800 bg-neutral-900 p-4">
        <ul>{props.children}</ul>
        {props.status == "active" && (
          <div className="my-4 flex w-full items-center gap-1">
            <div className="h-0.5 w-1/2 bg-slate-500" />
            <button
              type="button"
              className=" hover:text-purple-800"
              onClick={() => props.append({ name: "", color: "#00ff00" })}
            >
              <IoIosAddCircleOutline size={28} />
            </button>
            <div className="h-0.5 w-1/2 bg-slate-500" />
          </div>
        )}
      </div>
    </>
  );
};

export default FieldsBlock;

type FieldsBlockProps = {
  title?: string;
  children: React.ReactElement;
} & (FieldsBlockRead | FieldsBlockEdit);

type FieldsBlockRead = {
  status: "disabled";
};
type FieldsBlockEdit = {
  status: "active";
  append: (obj: { [key: string]: string }) => void;
};
