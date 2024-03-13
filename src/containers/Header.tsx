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
      <div className="relative   flex h-12 w-full items-center border-b border-subtle-1 ">
        <span className="hidden md:inline">
          <HomeLink />
        </span>
        {user ? (
          <div className="flex w-full items-center justify-between">
            <NavBar userName={user.username!} />
            <div>
              <UserPanel />
            </div>
          </div>
        ) : (
          <div className="ms-auto">
            <SignInButton />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
