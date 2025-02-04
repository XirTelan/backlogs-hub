"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import AddItem from "@/components/dnd/AddItem";
import useToggle from "@/hooks/useToggle";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const ActionsBlock = ({
  addNewItem,
  disabled,
  handleSave,
  saveStrategy,
}: ActionsBlockProps) => {
  const { isOpen, setOpen, setClose } = useToggle(false);

  if (isOpen)
    return (
      <div>
        <AddItem action={addNewItem} close={setClose} disabled={disabled} />
      </div>
    );

  return (
    <div className="group flex h-fit items-center">
      <ButtonBase
        variant="secondary"
        size="medium"
        text="Create new folder"
        onClick={setOpen}
        icon={<IoMdAdd />}
      />
      {saveStrategy === "manual" && (
        <ButtonBase text="Save changes" size="medium" onClick={handleSave} />
      )}
    </div>
  );
};

export default ActionsBlock;

type ActionsBlockProps = {
  saveStrategy: "manual" | "onChange";
  disabled: (value: string) => boolean;
  addNewItem: (newItem: string) => void;
  handleSave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
