import { VscAccount } from "react-icons/vsc";
import SignOutButton from "../Auth/SignOutButton";
import SidePanel from "@/components/SidePanel";

const UserPanel = async () => {
  return (
    <>
      <SidePanel icon={<VscAccount />}>
        <ul>
          <SignOutButton />
        </ul>
      </SidePanel>
    </>
  );
};

export default UserPanel;
