"use client";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import Modal from "@/components/Common/Modal";
import { usePathname } from "next/navigation";

const SignInButton = () => {
  const [showForm, setShowForm] = useState(false);
  const pathName = usePathname();
  if (pathName === "/") return;
  return (
    <div>
      <button onClick={() => setShowForm(true)}>Login</button>
      {showForm ? (
        <Modal setClose={() => setShowForm(false)}>
          <div style={{ background: "#161616" }}>
            <SignInForm />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInButton;
