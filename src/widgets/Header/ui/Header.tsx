import React from "react";
import SignInButton from "../../../entities/auth/ui/SignInButton";
import NavBar from "./NavBar";
import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import UserPanel from "../../../entities/user/ui/UserPanel";
import HomeLink from "@/shared/ui/HomeLink";
import ThemeSwitch from "@/shared/ui/ThemeSwitch";

const Header = async () => {
  const user = await getCurrentUserInfo();
  return (
    <>
      <header className="border-border-subtle-1 fixed z-20 flex  bg-bg-main    h-12 w-full items-center border-b ">
        {user ? (
          <div className="flex  w-full items-center justify-between">
            <NavBar userName={user.username!} />
            <div className="flex">
              <ThemeSwitch />
              <UserPanel userName={user.username!} />
            </div>
          </div>
        ) : (
          <>
            <HomeLink />
            <div className="ms-auto flex">
              <ThemeSwitch />
              <SignInButton />
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
