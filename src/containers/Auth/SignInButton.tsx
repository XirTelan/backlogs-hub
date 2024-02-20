"use client";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import Modal from "@/components/Common/Modal";

const SignInButton = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <button onClick={() => setShowForm(true)}>Login</button>
      {showForm ? (
        <Modal setClose={() => setShowForm(false)}>
          <SignInForm />
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInButton;
