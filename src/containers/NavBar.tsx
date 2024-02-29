import NavLink from "@/components/NavLink";
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
    },
    {
      title: "Options",
      pathname: `/options`,
    },
  ];
  return (
    <nav className="flex items-center">
      <div className="flex py-3 pe-4">
        <div className="h-6  w-[1px] grow bg-subtle-1 "></div>
      </div>
      <ul className="flex">
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
    </nav>
  );
};

export default NavBar;
