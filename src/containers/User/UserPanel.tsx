import { VscAccount } from "react-icons/vsc";
import SignOutButton from "../Auth/SignOutButton";
import SidePanel from "@/components/SidePanel";
import NavLink from "@/components/NavLink";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

const UserPanel = async () => {
  return (
    <>
      <SidePanel icon={<VscAccount />}>
        <ul>
          <NavLink href={`/manage-backlogs`} label={"Manage Backlogs"}>
            <MdOutlineManageSearch size={24} />
          </NavLink>
          <NavLink href={`/settings`} label={"Settings"}>
            <IoIosSettings size={20} />
          </NavLink>
          <SignOutButton />
        </ul>
      </SidePanel>
    </>
  );
};

export default UserPanel;
