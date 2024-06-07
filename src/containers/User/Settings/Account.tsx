import React from "react";
import Setting from "./Setting";
import InputField from "@/components/Common/UI/InputField";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { FaChevronRight } from "react-icons/fa";

const Account = () => {
  return (
    <>
      <section>
        <Title title={"General"} variant={2} />
        <div>
          <Setting label={"Email"}>
            <InputField isSimple variant="small" readOnly />
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
            <ButtonBase variant="ghost" icon={<FaChevronRight size={18} />} />
          </Setting>
          <Setting label={"Discord"}>
            <ButtonBase variant="ghost" icon={<FaChevronRight size={18} />} />
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
