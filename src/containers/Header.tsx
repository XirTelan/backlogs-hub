import Link from "next/link";
import React from "react";
import SignInButton from "./Auth/SignInButton";
import NavBar from "./NavBar";
import { getCurrentUserInfo } from "@/auth/utils";
import UserPanel from "./User/UserPanel";

const Header = async () => {
  const user = await getCurrentUserInfo();
  return (
    <>
      <div className="relative   flex h-12 w-full items-center border-b border-subtle-1 ">
        <Link
          href={"/"}
          className=" hidden py-[15px] pe-8 ps-4 text-sm leading-[18px] text-primary-text lg:block"
        >
          BacklogsHub
        </Link>
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
