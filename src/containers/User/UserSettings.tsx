"use client";
import React, { useState } from "react";
import Privacy from "./Settings/Privacy";
import Account from "./Settings/Account";
import Preferences from "./Settings/Preferences";
import {  UserDTO } from "@/zodTypes";
import Profile from "./Settings/Profile";
import Modal from "@/components/Common/Modal";
import { updateUserInfo } from "@/services/user";
import InputField from "@/components/Common/UI/InputField";
import { toastCustom } from "@/lib/toast";
import Title from "@/components/Common/Title";
import TextAreaInput from "@/components/Common/TextAreaInput";

const TABS = {
  account: Account,
  privacy: Privacy,
  profile: Profile,
  preferences: Preferences,
};
export type TabsType = keyof typeof TABS;

type UserSettingsProps = {
  data: Partial<UserDTO>;
  tab: TabsType;
};

export type ModalProps =
  | { isOpen: false }
  | {
      isOpen: true;
      type: "text" | "textArea";
      title: string;
      option: string;
      optionType: "general" | "config";
      value: string;
    };
type TabProps = {
  data: Partial<UserDTO>;
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
};

const renderTab = (
  TabComponent: React.ComponentType<TabProps>,
  data: Partial<UserDTO>,
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>,
) => {
  return <TabComponent data={data} setModal={setModal} />;
};

const defaultValue: ModalProps = {
  isOpen: false,
};

const modalTypes = {
  text: (
    defaultValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return (
      <InputField
        defaultValue={defaultValue}
        isSimple
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  textArea: (
    defaultValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return (
      <TextAreaInput
        defaultValue={defaultValue}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
const UserSettings = ({ data, tab }: UserSettingsProps) => {
  const [modalData, setModalData] = useState<ModalProps>(defaultValue);
  const [value, setValue] = useState("");

  const handleUpdate = async () => {
    if (!modalData.isOpen) return;
    const res = await updateUserInfo(
      modalData.option,
      value,
      modalData.optionType,
    );
    if (res.isSuccess) toastCustom.success("Changed");
    else toastCustom.error("Nope");
  };
  return (
    <>
      {renderTab(TABS[tab], data, setModalData)}
      {modalData.isOpen && (
        <div>
          <Modal
            showActions
            action={handleUpdate}
            setClose={() => setModalData(defaultValue)}
          >
            <div className=" bg-layer-1 px-4 py-8 text-white">
              <Title variant={3} title={modalData.title} />
              {modalTypes[modalData.type](modalData.value, setValue)}
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default UserSettings;
