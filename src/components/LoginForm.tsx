"use client";
import React from "react";
import InputField from "./Common/InputField";

const LoginForm = () => {
  return (
    <div>
      <div className="flex flex-col">
        <InputField label="Login" placeholder="Login" />
        <InputField label="Password" placeholder="Passwprd" type="password" />
      </div>
      <button type="submit">Log In</button>
    </div>
  );
};

export default LoginForm;
