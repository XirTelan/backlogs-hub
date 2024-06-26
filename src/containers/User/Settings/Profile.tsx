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
      <Setting
        action={() =>
          setModal({
            isOpen: true,
            title: "Change display name",
            option: "displayName",
            optionType: "general",
            value: data.displayName || "",
            type: "text",
          })
        }
        label={"Display Name"}
      >
        <ButtonBase variant="ghost" icon={<FaChevronRight size={18} />} />
      </Setting>
      <Setting
        action={() =>
          setModal({
            isOpen: true,
            title: "About me",
            option: "description",
            optionType: "general",
            value: data.description || "",
            type: "textArea",
          })
        }
        label={"About description"}
      >
        <ButtonBase variant="ghost" icon={<FaChevronRight size={18} />} />
      </Setting>
    </div>
  );
};

export default Profile;
