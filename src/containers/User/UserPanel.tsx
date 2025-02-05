import { VscAccount } from "react-icons/vsc";
import SignOutButton from "../Auth/SignOutButton";
import SidePanel from "@/components/SidePanel";
import NavLink from "@/components/NavLink";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { routesList } from "@/lib/routesList";
import Divider from "@/components/Common/UI/Divider";

const links = [
  {
    href: routesList.manageBacklogs,
    label: "Manage Backlogs",
    icon: <MdOutlineManageSearch size={24} />,
  },
  {
    href: routesList.settings,
    label: "Settings",
    icon: <IoIosSettings size={20} />,
  },
];

const UserPanel = async ({ userName }: { userName: string }) => {
  return (
    <>
      <SidePanel
        icon={<VscAccount />}
        buttonProps={{ "aria-label": "Right menu toggle" }}
      >
        <>
          <div className="flex items-center gap-2 p-2 ">
            <div className="flex h-8 w-8 shrink-0 items-center   justify-center rounded-full bg-btn-primary  ">
              <span>{userName[0].toUpperCase()}</span>
            </div>
            <div className=" break-all">{userName}</div>
          </div>
          <NavLink
            text="secondary"
            variant="simple"
            href={`/user/${userName}`}
            label={"View profile"}
          ></NavLink>
          <Divider />
          <ul>
            {links.map((link, indx) => (
              <NavLink
                text="secondary"
                key={indx}
                variant="simple"
                href={link.href}
                label={link.label}
              ></NavLink>
            ))}
            <Divider />
            <SignOutButton />
          </ul>
        </>
      </SidePanel>
    </>
  );
};

export default UserPanel;
