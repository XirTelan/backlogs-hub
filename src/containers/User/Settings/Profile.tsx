"use client";
import React from "react";
import Setting from "./Setting";
import { UserDTO } from "@/zodTypes";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { FaChevronRight } from "react-icons/fa6";
import { ModalProps } from "../UserSettings";

const Profile = ({
  data,
  setModal,
}: {
  data: Partial<UserDTO>;
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}) => {
  console.log(data);
  return (
    <div>
      <Setting label={"Display Name"}>
        <ButtonBase
          onClick={() =>
            setModal({
              isOpen: true,
              title: "Change display name",
              option: "displayName",
              optionType: "general",
              value: data.displayName || "",
              type: "text",
            })
          }
          variant="ghost"
          icon={<FaChevronRight size={18} />}
        />
      </Setting>
      <Setting label={"About description"}>
        <ButtonBase
          onClick={() =>
            setModal({
              isOpen: true,
              title: "About me",
              option: "description",
              optionType: "general",
              value: data.description || "",
              type: "textArea",
            })
          }
          variant="ghost"
          icon={<FaChevronRight size={18} />}
        />
      </Setting>
    </div>
  );
};

export default Profile;
