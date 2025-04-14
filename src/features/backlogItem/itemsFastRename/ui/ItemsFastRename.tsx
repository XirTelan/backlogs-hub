"use client";
import { ButtonBase, InputField } from "@/shared/ui";
import { useToggle } from "@/shared/hooks";
import { apiRoutesList } from "@/shared/constants/routesList";
import { toastCustom } from "@/shared/lib/toast";
import { ReactElement, useState, type JSX } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useSWRConfig } from "swr";
import { BacklogItemDTO, InputFieldProps } from "@/shared/model";

type ItemFastRenameItemFastRenameProps = {
  item: Pick<BacklogItemDTO, "_id" | "title">;
  color: string;
  inputProps?: InputFieldProps;
  textProps?: {
    tag: keyof JSX.IntrinsicElements;
    className?: string;
    render?: ReactElement;
  };
  type?: "click" | "doubleClick" | "button";
};

export const ItemFastRename = ({
  item,
  color,
  inputProps,
  textProps = {
    tag: "p",
  },
  type = "click",
}: ItemFastRenameItemFastRenameProps) => {
  const [value, setValue] = useState(item.title);
  const { isOpen, setOpen, setClose } = useToggle();
  const { cache, mutate } = useSWRConfig();
  const handleSubmit = async () => {
    const newItem: Partial<BacklogItemDTO> = { _id: item._id, title: value };

    const res = await fetch(`${apiRoutesList.items}/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    if (res.ok) {
      handleClose();
      toastCustom.success("Saved");
      [...cache.keys()]
        .filter(
          (key) =>
            key.includes(`${item._id}`) ||
            key.startsWith(`${apiRoutesList.items}`)
        )
        .forEach((key) => mutate(key));
    } else {
      toastCustom.error(res.statusText);
    }
  };

  const Tag: keyof JSX.IntrinsicElements = `${textProps.tag}`;
  const handleDoubleClick = () => {
    if (type !== "doubleClick") return;
    setOpen();
  };
  const handleClick = () => {
    if (type !== "click") return;
    setOpen();
  };
  const handleClose = () => {
    setValue(item.title ?? "");
    setClose();
  };

  const textBlock = textProps.render ? (
    textProps.render
  ) : (
    <Tag
      className=" min-w-fit  cursor-pointer hover:underline  "
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{ color: color }}
      {...textProps}
    >
      {item.title}
    </Tag>
  );

  return (
    <>
      {isOpen ? (
        <InputField
          placeholder="New title"
          variant="small"
          layer={2}
          autoFocus
          isSimple
          {...inputProps}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") handleClose();
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleClose}
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
        <>
          {type !== "button" ? (
            textBlock
          ) : (
            <div className="group flex w-full flex-1 items-center">
              {textBlock}
              <div className=" opacity-0 group-hover:opacity-100">
                <ButtonBase
                  variant="ghost"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen();
                  }}
                  icon={<MdEdit />}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
