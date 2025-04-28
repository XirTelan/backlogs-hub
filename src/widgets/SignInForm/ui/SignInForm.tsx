import { DiscordSignIn } from "@/entities/auth";
import { GoogleSignIn } from "@/entities/auth";
import { UserLoginForm } from "@/features/auth/signInByPassword";
import React from "react";

const SignInForm = () => {
  return (
    <div className="h-full lg:mb-4 lg:w-80 xl:w-100 bg-white  dark:bg-black  border border-border-subtle-1 p-4">
      <h1 className=" font-semibol mb-2 text-3xl text-text-primary">
        <span className=" text-link-primary"> Sign In</span> to BacklogsHub
      </h1>
      <div className="mb-4 mt-10 border-t border-border-subtle-1 " />
      <div className="flex flex-col gap-4 ">
        <GoogleSignIn />
        <DiscordSignIn />
      </div>
      <div className="flex flex-col">
        <div className="relative my-4">
          <div className="absolute inset-0 flex  items-center">
            <span className="w-full h-[1px] bg-border-subtle-1 "></span>
          </div>
          <div className="relative   flex justify-center text-xs uppercase">
            <span className=" bg-white  dark:bg-black px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <UserLoginForm />
      </div>
    </div>
  );
};

export default SignInForm;
