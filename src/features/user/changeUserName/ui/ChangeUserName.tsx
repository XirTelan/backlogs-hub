import ChangeNameForm from "@/features/user/changeUserName/ui/ChangeNameForm";

import { updateUserInfo } from "@/shared/api/user";
import { ButtonBase, Modal } from "@/shared/ui";
import React, { useState } from "react";

const ChangeUserName = () => {
  const [isOpen, setIsOpen] = useState(false);

  const keepUserName = async () => {
    await updateUserInfo("canChangeUserName", false);
  };

  return (
    <>
      <div>You can change your user name</div>
      <div className=" flex">
        <ButtonBase
          onClick={keepUserName}
          variant="secondary"
          text="Keep current username"
        />
        <ButtonBase onClick={() => setIsOpen(true)} text="Change user name" />
      </div>
      {isOpen && (
        <Modal setClose={() => setIsOpen(false)}>
          <ChangeNameForm />
        </Modal>
      )}
    </>
  );
};

export default ChangeUserName;
