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
      <header className="relative   flex h-12 w-full items-center border-b border-subtle-1 ">
        {user ? (
          <div className="flex w-full items-center justify-between">
            <NavBar userName={user.username!} />
            <div>
              <UserPanel userName={user.username!} />
            </div>
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
