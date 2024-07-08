"use client";
import React, { useState } from "react";
import Privacy from "./Settings/Privacy";
import Account from "./Settings/Account";
import Preferences from "./Settings/Preferences";
import { UserDTO } from "@/zodTypes";
import Profile from "./Settings/Profile";
import Modal from "@/components/Common/Modal";
import { updateUserInfo } from "@/services/user";
import InputField from "@/components/Common/UI/InputField";
import { toastCustom } from "@/lib/toast";
import Title from "@/components/Common/Title";
import TextAreaInput from "@/components/Common/TextAreaInput";
import { ButtonBaseProps } from "@/types";

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
  | ({ isOpen: true; title: string } & (
      | {
          type: "text" | "textArea";
          value: string;
          option: {
            name: string;
            optionType?: "general" | "config";
          };
        }
      | {
          type: "confirm";
          action: () => void;
          actionType: ButtonBaseProps["variant"];
        }
      | {
          type: "custom";
          component: React.ComponentType;
        }
    ));
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
  confirm: () => {
    return <div> Are you sure ?</div>;
  },
  text: (
    defaultValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return (
      <InputField
        defaultValue={defaultValue}
        isSimple
        variant="small"
        layer={2}
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
    if (!modalData.isOpen || modalData.type !== "text") return;
    const res = await updateUserInfo(
      modalData.option.name,
      value,
      modalData.option.optionType,
    );
    if (res.isSuccess) toastCustom.success("Changed");
    else toastCustom.error("Nope");
  };
  return (
    <>
      {renderTab(TABS[tab], data, setModalData)}
      {modalData.isOpen && (
        <div>
          {modalData.type === "custom" ? (
            <Modal setClose={() => setModalData(defaultValue)}>
              {<modalData.component />}
            </Modal>
          ) : (
            <Modal
              showActions
              action={
                modalData.type === "confirm" ? modalData.action : handleUpdate
              }
              actionType={
                (modalData.type === "confirm" && modalData.actionType) ||
                undefined
              }
              setClose={() => setModalData(defaultValue)}
            >
              <div className=" max-w-sm bg-background p-4 text-white md:max-w-xl">
                <Title variant={3} title={modalData.title} />
                {modalData.type === "confirm"
                  ? modalTypes[modalData.type]()
                  : modalTypes[modalData.type](modalData.value, setValue)}
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default UserSettings;
