"use client";
import React from "react";
import InputField from "../../components/Common/UI/InputField";
import { FaArrowRight } from "react-icons/fa6";
import ButtonBase from "../../components/Common/UI/ButtonBase";

const EmailSignIn = () => {
  return (
    <>
      <InputField placeholder="mail@example.com" label="Continue with email" />
      <ButtonBase text="Continue">
        <FaArrowRight size={16} />
      </ButtonBase>
    </>
  );
};

export default EmailSignIn;
