import EmailSignIn from "@/containers/Auth/EmailSignIn";
import React from "react";
import { GoogleSignIn } from "./Google/GoogleSignIn";
import Link from "next/link";
import DiscordSignIn from "./DiscordSignIn";

const SignInForm = () => {
  return (
    <div className="h-full ps-4  pt-10">
      <h1 className=" font-semibol mb-2 text-3xl">Sign in to BacklogsHub</h1>
      <span className="inline-flex w-full border-b border-subtle-1 pb-12 ">
        Don&apos;t have an account?&nbsp; <Link href={"/"}>Create here</Link>
      </span>
      <div className="mt-4 flex flex-col">
        <EmailSignIn />
        <div className="mb-4 mt-10 border-t border-subtle-1 pt-4">
          <span className=" text-secondary-text">Alternative logins</span>
        </div>
        <div className="mt-4 flex flex-col gap-4 border-b border-subtle-1 pb-8">
          <GoogleSignIn />
          <DiscordSignIn />
        </div>
        <div className="mt-4 text-secondary-text">
          Need help?&nbsp; <Link href={""}>Contact us</Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
