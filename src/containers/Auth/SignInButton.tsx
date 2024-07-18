"use client";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import Modal from "@/components/Common/Modal";
import { usePathname } from "next/navigation";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { GrLogin } from "react-icons/gr";

const SignInButton = () => {
  const [showForm, setShowForm] = useState(false);
  const pathName = usePathname();
  if (pathName === "/") return;
  return (
    <div>
      <ButtonBase
        variant="tertiary"
        onClick={() => setShowForm(true)}
        text="Sign In"
        icon={<GrLogin size={18} className="me-3" />}
      />
      {showForm ? (
        <Modal setClose={() => setShowForm(false)}>
          <div className="px-4 pb-4" style={{ background: "#161616" }}>
            <SignInForm />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInButton;
