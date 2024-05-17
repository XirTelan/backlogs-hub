import HomeLink from "@/components/HomeLink";
import NavLink from "@/components/NavLink";
import SidePanel from "@/components/SidePanel";
import React from "react";

const NavBar = ({ userName }: { userName: string }) => {
  const BASE = `/user/${userName}`;
  const links = [
    {
      title: "Profile",
      pathname: "/",
    },
    {
      title: "Backlogs",
      pathname: `${BASE}/backlogs`,
    },
    {
      title: "Templates",
      pathname: `/templates`,
    }
  ];

  const hamburgerMenu = (
    <>
      <div className="flex h-5 flex-col justify-center gap-0.5 ">
        <div className=" h-[3px] w-full bg-red-600"></div>
        <div className=" h-[3px] w-full bg-red-600"></div>
        <div className=" h-[3px] w-full bg-red-600"></div>
        <div className=" h-[3px] w-full bg-red-600"></div>
      </div>
    </>
  );
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
        <SidePanel position="left" icon={hamburgerMenu}>
          {navList}
        </SidePanel>
        <HomeLink />
      </span>
      <span className=" hidden md:flex">
        <div className="flex py-3 pe-4">
          <div className="h-6  w-[1px] grow bg-subtle-1 "></div>
        </div>
        {navList}
      </span>
    </nav>
  );
};

export default NavBar;
