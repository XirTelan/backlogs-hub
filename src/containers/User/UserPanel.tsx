import { VscAccount } from "react-icons/vsc";
import SignOutButton from "../Auth/SignOutButton";
import SidePanel from "@/components/SidePanel";
import NavLink from "@/components/NavLink";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { routesList } from "@/data";

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
      <SidePanel icon={<VscAccount />}>
        <>
          <>
            <div className="flex items-center gap-2 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center  justify-center rounded-full bg-primary-btn  ">
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
          </>
          <div className=" bg-border h-[1px]  w-full  "></div>
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
            <div className=" bg-border h-[1px]  w-full  "></div>
            <SignOutButton />
          </ul>
        </>
      </SidePanel>
    </>
  );
};

export default UserPanel;
