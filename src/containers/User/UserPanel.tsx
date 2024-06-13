import { VscAccount } from "react-icons/vsc";
import SignOutButton from "../Auth/SignOutButton";
import SidePanel from "@/components/SidePanel";
import NavLink from "@/components/NavLink";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { routesList } from "@/data";

const UserPanel = async ({ userName }: { userName: string }) => {
  return (
    <>
      <SidePanel icon={<VscAccount />}>
        <ul>
          <NavLink href={`/user/${userName}`} label={"View Profile"}>
            <MdOutlineManageSearch size={24} />
          </NavLink>
          <NavLink href={routesList.manageBacklogs} label={"Manage Backlogs"}>
            <MdOutlineManageSearch size={24} />
          </NavLink>
          <NavLink href={routesList.settings} label={"Settings"}>
            <IoIosSettings size={20} />
          </NavLink>
          <SignOutButton />
        </ul>
      </SidePanel>
    </>
  );
};

export default UserPanel;
