import Link from "next/link";
import React from "react";
import SignInButton from "./Auth/SignInButton";
import SignOutButton from "./Auth/SignOutButton";
import NavBar from "./NavBar";
import { getCurrentUserInfo } from "@/auth/utils";

const Header = async () => {
  const user = await getCurrentUserInfo();
  return (
    <>
      <div className="border-subtle-1 relative flex h-12 w-full border-b ">
        <Link
          href={"/"}
          className="text-primary-text py-[15px] pe-8 ps-2 text-sm leading-[18px]"
        >
          BacklogsHub
        </Link>
        {user ? (
          <>
            <NavBar userName={user.username!} />
            <SignOutButton />
          </>
        ) : (
          <SignInButton />
        )}

        {/* <div className=" absolute bottom-0 h-[1px] w-full bg-white"></div> */}
      </div>
    </>
  );
};

export default Header;
