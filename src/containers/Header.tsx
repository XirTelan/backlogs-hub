import React from "react";
import SignInButton from "./Auth/SignInButton";
import NavBar from "./NavBar";
import { getCurrentUserInfo } from "@/auth/utils";
import UserPanel from "./User/UserPanel";
import HomeLink from "@/components/HomeLink";

const Header = async () => {
  const user = await getCurrentUserInfo();
  return (
    <>
      <header className="border-border-subtle-1 fixed z-20 flex  bg-bg-main    h-12 w-full items-center border-b ">
        {user ? (
          <div className="flex  w-full items-center justify-between">
            <NavBar userName={user.username!} />
            <UserPanel userName={user.username!} />
          </div>
        ) : (
          <>
            <HomeLink />
            <div className="ms-auto">
              <SignInButton />
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
