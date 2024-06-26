import React from "react";
import Setting from "./Setting";
import InputField from "@/components/Common/UI/InputField";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { FaChevronRight } from "react-icons/fa";
import { UserDTO } from "@/zodTypes";
import { ModalProps } from "../UserSettings";

const Account = ({
  data,
  setModal,
}: {
  data: Partial<UserDTO>;
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}) => {
  return (
    <>
      <section>
        <Title title={"General"} variant={2} />
        <div>
          <Setting
            action={() => {
              return;
            }}
            label={"Email"}
          >
            <div className="flex items-center">
              <span>{data.email}</span>
              <ButtonBase variant="ghost" icon={<FaChevronRight size={18} />} />
            </div>
          </Setting>
          <Setting label={"Password"}>
            <ButtonBase variant="ghost" icon={<FaChevronRight size={18} />} />
          </Setting>
          <Setting label={"Gender"}>
            <InputField isSimple variant="small" readOnly />
          </Setting>
        </div>
      </section>
      <section>
        <Title title={"Account authorization"} variant={2} />
        <div>
          <Setting label={"Google"}>
            <ButtonBase
              text="Connect"
              variant="tertiary"
              icon={<FaChevronRight size={18} />}
            />
          </Setting>
          <Setting label={"Discord"}>
            <ButtonBase
              text="Connect"
              variant="tertiary"
              icon={<FaChevronRight size={18} />}
            />
          </Setting>
        </div>
      </section>
      <section>
        <Title title={"Advanced"} variant={2} />
        <div>
          <Setting label={"Delete account"}>
            <InputField isSimple variant="small" readOnly />
          </Setting>
        </div>
      </section>
    </>
  );
};

export default Account;
