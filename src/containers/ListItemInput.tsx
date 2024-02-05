import InputField from "@/components/InputField";
import { RiDeleteBack2Line } from "react-icons/ri";

import { ListItemInput } from "@/types";
import React from "react";

const ListItemInput = React.forwardRef<HTMLInputElement, ListItemInput>(
  ({ onDelete, ...props }, ref) => {
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
  },
);
ListItemInput.displayName = "ListItemInput";
export default ListItemInput;
