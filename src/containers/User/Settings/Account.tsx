"useClient";
import React, { useMemo } from "react";
import Setting from "./Setting";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { FaChevronRight } from "react-icons/fa";
import { UserDTO } from "@/zodTypes";
import { ModalProps } from "../UserSettings";
import { toastCustom } from "@/lib/toast";

import DeleteAccount from "./DeleteAccount";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";

type AccountType = {
  provider: string;
  _id: string;
};

const isType = (arr: unknown[]): arr is AccountType[] => {
  return arr.every((item) => {
    if (
      item &&
      typeof item === "object" &&
      Object.prototype.hasOwnProperty.call(item, "provider") &&
      Object.prototype.hasOwnProperty.call(item, "_id")
    ) {
      return true;
    }
    return false;
  });
};

const Account = ({
  data,
  setModal,
}: {
  data: Partial<UserDTO>;
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}) => {
  const { accounts } = data;
  const providers = useMemo(() => {
    if (!accounts || !isType(accounts)) return new Map<string, string>();
    return accounts?.reduce((acc, item: AccountType) => {
      acc.set(item.provider, item._id);
      return acc;
    }, new Map<string, string>());
  }, [accounts]);
  return (
    <>
      <section>
        <Title title={"General"} variant={2} />
        <div>
          <Setting label={"Email"} value={data.email || ""} />
          {data.provider === "credentials" && (
            <Setting label={"Password"}>
              <ButtonBase variant="ghost" icon={<FaChevronRight size={18} />} />
            </Setting>
          )}
        </div>
      </section>
      <section>
        <Title title={"Account authorization"} variant={2} />
        <div>
          {providerButton(providers, "google", "Google")}
          {providerButton(providers, "discord", "Discord")}
        </div>
      </section>
      <section>
        <Title title={"Advanced"} variant={2} />
        <div>
          <Setting label={"Delete account"}>
            <ButtonBase
              variant="ghost"
              icon={<FaChevronRight size={18} />}
              onClick={() => {
                setModal({
                  isOpen: true,
                  title: "",
                  type: "custom",
                  component: DeleteAccount,
                });
              }}
            />
          </Setting>
        </div>
      </section>
    </>
  );
};

const providerButton = (
  providers: Map<string, string>,
  provider: string,
  label: string,
) => {
  const button = providers?.has(provider) ? (
    <Setting label={label}>
      <ButtonBase
        text="Disconnect"
        variant="tertiary"
        style={{ width: "10rem" }}
        onClick={async () => {
          const id = providers.get(provider);
          if (!id) return;
          const res = await fetch(`/api/accounts/${id}`, {
            method: "DELETE",
          });

          if (res.ok) toastCustom.success("Disconnected");
        }}
        icon={<FaChevronRight size={18} />}
      />
    </Setting>
  ) : (
    <Setting label={label}>
      <LinkWithBtnStyle
        href={process.env.NEXT_PUBLIC_DISCORDOAUTH!}
        icon={<FaChevronRight size={18} />}
        variant="tertiary"
      >
        Connect
      </LinkWithBtnStyle>
    </Setting>
  );
  return button;
};

export default Account;
