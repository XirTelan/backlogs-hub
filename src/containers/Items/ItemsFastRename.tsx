"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import InputField from "@/components/Common/UI/Input/InputField";
import useToggle from "@/hooks/useToggle";
import { apiRoutesList } from "@/lib/routesList";
import { toastCustom } from "@/lib/toast";
import { BacklogItemDTO } from "@/zodTypes";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useSWRConfig } from "swr";

const ItemFastRename = ({
  item,
  color,
}: {
  item: BacklogItemDTO;
  color: string;
}) => {
  const [value, setValue] = useState(item.title);
  const { isOpen, setOpen, setClose } = useToggle();
  const { cache, mutate } = useSWRConfig();
  const handleSubmit = async () => {
    const newItem: BacklogItemDTO = { ...item, title: value };
    
    const res = await fetch(`${apiRoutesList.items}/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    if (res.ok) {
      setClose();
      toastCustom.success("Saved");
      [...cache.keys()]
        .filter((key) => key.startsWith(`${apiRoutesList.items}?`))
        .forEach((key) => mutate(key));
    } else {
      toastCustom.error(res.statusText);
    }
  };
  return (
    <div>
      {isOpen ? (
        <InputField
          placeholder="New title"
          variant="small"
          layer={2}
          autoFocus
          isSimple
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") setClose();
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={setClose}
        >
          <div
            className="absolute bottom-0 right-0 top-0 w-8"
            onMouseDown={(e) => e.preventDefault()}
          >
            <ButtonBase
              size="small"
              variant="ghost"
              className="absolute bottom-0 right-0 top-0 bg-red-500"
              icon={<FaCheck />}
              onClick={handleSubmit}
            />
          </div>
        </InputField>
      ) : (
        <p
          className=" cursor-pointer hover:underline  "
          onDoubleClick={setOpen}
          style={{ color: color }}
        >
          {item.title}
        </p>
      )}
    </div>
  );
};

export default ItemFastRename;
