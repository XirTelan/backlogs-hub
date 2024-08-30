import React from "react";
import { GoogleSignIn } from "./Google/GoogleSignIn";
import DiscordSignIn from "./DiscordSignIn";
import UserLoginForm from "./UserLoginForm";

const SignInForm = () => {
  return (
    <div className="h-full pt-10 lg:mx-4 lg:mb-4 lg:w-80">
      <h1 className=" font-semibol mb-2 text-3xl text-primary-text">
        <span className=" text-primary-link"> Sign In</span> to BacklogsHub
      </h1>
      <div className="mb-4 mt-10 border-t border-border-1 " />
      <div className="flex flex-col gap-4 ">
        <GoogleSignIn />
        <DiscordSignIn />
      </div>
      <div className="flex flex-col">
        <div className="mb-4 mt-4 border-t border-border-1 pt-4">
          <span className=" text-secondary-text">Alternative logins</span>
        </div>

        <UserLoginForm />
      </div>
    </div>
  );
};

export default SignInForm;
