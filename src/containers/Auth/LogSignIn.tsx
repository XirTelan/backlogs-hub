import LoginForm from "@/components/LoginForm";
import React from "react";
import { GoogleSignIn } from "./Google/GoogleSignIn";

const LogSignIn = () => {
  return (
    <div className=" ms-12 flex w-80 max-w-xl flex-col self-start rounded bg-neutral-800 p-4">
      <div>
        <GoogleSignIn />
      </div>
      <div className="my-4 flex w-full items-center gap-1">
        <div className="h-0.5 w-1/2 bg-slate-500" />
        <span className=" text-sm text-neutral-300">OR</span>
        <div className="h-0.5 w-1/2 bg-slate-500" />
      </div>
      <LoginForm />
    </div>
  );
};

export default LogSignIn;
