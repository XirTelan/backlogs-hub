"use client";
import React from "react";
import Setting from "./Setting";
import { UserDB } from "@/zodTypes";
import ButtonBase from "@/shared/ui/ButtonBase";
import { FaChevronRight } from "react-icons/fa6";
import { SettingModalProps } from "../UserSettings";
import ChangeUserName from "./ChangeUserName";

const Profile = ({
  data,
  setModal,
}: {
  data: Partial<UserDB>;
  setModal: React.Dispatch<React.SetStateAction<SettingModalProps>>;
}) => {
  return (
    <div>
      {data.config?.canChangeUserName && <ChangeUserName />}
      <Setting label={"Display Name"}>
        <ButtonBase
          onClick={() =>
            setModal({
              isOpen: true,
              title: "Change display name",
              option: {
                name: "displayName",
                optionType: "general",
              },
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
              option: {
                name: "description",
                optionType: "general",
              },
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
