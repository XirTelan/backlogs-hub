import React, { useState } from "react";
import ButtonBase from "../Common/UI/ButtonBase";
import { MdCheck, MdClose } from "react-icons/md";
import InputField from "../Common/UI/InputField";

const AddItem = ({
  action,
  close,
  disabled,
}: {
  action: (value: string) => void;
  close: () => void;
  disabled: (value: string) => boolean;
}) => {
  const [newFolder, setNewFolder] = useState("");
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
          variant="small"
          value={newFolder}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          onChange={(e) => {
            setNewFolder(e.target.value);
          }}
        />
        <ButtonBase
          variant="secondary"
          aria-description="Add new folder"
          disabled={disabled(newFolder)}
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
