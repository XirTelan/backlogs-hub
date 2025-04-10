"use client";
import React, { useState } from "react";
import Privacy from "./Settings/Privacy";
import Account from "./Settings/Account";
import Preferences from "./Settings/Preferences";
import { UserDB } from "@/zodTypes";
import Profile from "./Settings/Profile";
import Modal from "@/components/Common/Modal";
import { updateUserInfo } from "@/shared/services/api/user";
import InputField from "@/shared/ui/Input/InputField";
import { toastCustom } from "@/shared/lib/toast";
import Title from "@/components/Common/Title";
import TextAreaInput from "@/shared/ui/TextAreaInput";
import { ButtonBaseProps } from "@/types";

const TABS = {
  account: Account,
  privacy: Privacy,
  profile: Profile,
  preferences: Preferences,
};
export type TabsType = keyof typeof TABS;

type UserSettingsProps = {
  data: Partial<UserDB>;
  tab: TabsType;
};

export type SettingModalProps =
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
  data: Partial<UserDB>;
  setModal: React.Dispatch<React.SetStateAction<SettingModalProps>>;
};

const renderTab = (
  TabComponent: React.ComponentType<TabProps>,
  data: Partial<UserDB>,
  setModal: React.Dispatch<React.SetStateAction<SettingModalProps>>
) => {
  return <TabComponent data={data} setModal={setModal} />;
};

const defaultValue: SettingModalProps = {
  isOpen: false,
};

const modalTypes = {
  confirm: () => {
    return <div> Are you sure ?</div>;
  },
  text: (
    defaultValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
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
    setValue: React.Dispatch<React.SetStateAction<string>>
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
  const [modalData, setModalData] = useState<SettingModalProps>(defaultValue);
  const [value, setValue] = useState("");
  const handleUpdate = async () => {
    if (!modalData.isOpen || modalData.type !== "text") return;
    const res = await updateUserInfo(
      modalData.option.name,
      value,
      modalData.option.optionType
    );
    if (res.success) toastCustom.success("Changed");
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
              action={
                modalData.type === "confirm" ? modalData.action : handleUpdate
              }
              actionOptions={{
                showActions: true,
                confirmBtn: {
                  clrVariant:
                    (modalData.type === "confirm" && modalData.actionType) ||
                    undefined,
                },
              }}
              setClose={() => setModalData(defaultValue)}
            >
              <div className=" max-w-sm bg-bg-main p-4 text-white md:max-w-xl">
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
