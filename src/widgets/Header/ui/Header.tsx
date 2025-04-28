import React from "react";
import NavBar from "./NavBar";
import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import ThemeSwitch from "@/shared/ui/ThemeSwitch";
import { UserPanel } from "@/entities/user";
import { HomeLink } from "@/shared/ui";
import { SignInButton } from "@/entities/auth";
import SignInForm from "@/widgets/SignInForm/ui/SignInForm";
import Link from "next/link";
import { routesList } from "@/shared/constants";

export const Header = async () => {
  const user = await getCurrentUserInfo();
  return (
    <>
      <header className="sticky top-0 z-20 w-full  h-12   border-b border-border-subtle-1 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-bg-main/60">
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
            <div className=" flex  items-center justify-between m-auto ">
              <HomeLink />

              <nav className="hidden md:flex items-center gap-8">
                <Link
                  href="#features"
                  className="text-sm font-medium transition-colors hover:text-[#0353e9]"
                >
                  Features
                </Link>
                <Link
                  href={routesList.faq}
                  className="text-sm font-medium transition-colors hover:text-[#0353e9]"
                >
                  FAQ
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <ThemeSwitch />
                <SignInButton>
                  <SignInForm />
                </SignInButton>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
