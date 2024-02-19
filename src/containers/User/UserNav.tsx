import NavItem from "@/components/NavItem";
import React from "react";

const UserNav = ({ userName }: { userName: string }) => {
  return (
    <nav
      className="bg-surface-container-3 text-on-surface-variant  my-4 flex w-full flex-col items-left  p-2"
      aria-label="User profile nav"
    >
      <ul>
        <li>
          <NavItem href={`/user/${userName}`} label="Profile" mode="equal" />
          <NavItem href={`/user/${userName}/backlogs`} label="Backlogs" />
          <NavItem href={`/user/${userName}/options`} label="Options" />
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
