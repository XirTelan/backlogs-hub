import React, { useMemo, useState } from "react";
import ButtonBase from "../Common/UI/ButtonBase";
import { MdCheck, MdClose } from "react-icons/md";
import InputField from "../Common/UI/InputField";

const AddItem = ({
  action,
  close,
  disabled,
  defaultValue = "",
}: {
  action: (value: string) => void;
  close: () => void;
  disabled: (value: string) => boolean;
  defaultValue?: string;
}) => {
  const [newFolder, setNewFolder] = useState(defaultValue);
  const isDisabled = useMemo(() => disabled(newFolder), [disabled, newFolder]);
  const handleSubmit = () => {
    action(newFolder);
    setNewFolder("");
    close();
  };
  return (
    <>
      <div className="flex items-center">
        <InputField
          isSimple
          autoFocus
          helperText={
            isDisabled
              ? {
                  message: "Folder name must be unique",
                  type: "error",
                }
              : undefined
          }
          variant="small"
          value={newFolder}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisabled) handleSubmit();
            if (e.key === "Escape") close();
          }}
          onChange={(e) => {
            setNewFolder(e.target.value);
          }}
        />
        <ButtonBase
          variant="secondary"
          aria-description="Add new folder"
          disabled={isDisabled || newFolder === ""}
          onClick={handleSubmit}
          size="small"
          icon={<MdCheck size={24} />}
        />
        <ButtonBase
          aria-description="Cancel"
          variant="secondary"
          size="small"
          onClick={() => {
            setNewFolder("");
            close();
          }}
          icon={<MdClose size={24} />}
        />
      </div>
    </>
  );
};

export default AddItem;
