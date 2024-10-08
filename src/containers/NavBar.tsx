import HomeLink from "@/components/HomeLink";
import NavLink from "@/components/NavLink";
import SidePanel from "@/components/SidePanel";
import { routesList } from "@/lib/routesList";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = ({ userName }: { userName: string }) => {
  const BASE = `/user/${userName}`;
  const links = [
    {
      title: "Backlogs",
      pathname: `${BASE}/backlogs`,
    },
    {
      title: "Templates",
      pathname: routesList.templates,
    },
  ];

  const navList = (
    <ul className="flex flex-col md:flex-row">
      {links.map((link) => {
        return (
          <NavLink
            key={link.title}
            href={`${link.pathname}`}
            label={link.title}
          />
        );
      })}
    </ul>
  );
  return (
    <nav className="flex items-center">
      <span className=" flex md:hidden">
        <SidePanel position="left" icon={<GiHamburgerMenu />}>
          {navList}
        </SidePanel>
        <HomeLink />
      </span>
      <span className=" hidden md:flex md:items-center">
        <HomeLink />
        <div className="flex py-3 pe-4">
          <div className="bg-border-1  h-6 w-[1px] grow "></div>
        </div>
        {navList}
      </span>
    </nav>
  );
};

export default NavBar;
