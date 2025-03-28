import InputField from "@/components/Common/UI/Input/InputField";
import { RiDeleteBack2Line } from "react-icons/ri";

import { ListItemInput as ListItemProps } from "@/types";
import React from "react";
const ListItemInput = ({ onDelete, ref, ...props }: ListItemProps) => {
  return (
    <div className="relative flex items-center">
      <InputField {...props} ref={ref} />
      {!props.disabled && (
        <button
          className="relative right-8  font-bold hover:text-red-800 active:text-red-600 "
          onClick={onDelete}
        >
          <RiDeleteBack2Line size={24} />
        </button>
      )}
    </div>
  );
};
export default ListItemInput;
