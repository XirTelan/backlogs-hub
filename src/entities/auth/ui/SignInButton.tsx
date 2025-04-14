"use client";
import React, { useState } from "react";
import { Modal, ButtonBase } from "@/shared/ui";
import { usePathname } from "next/navigation";
import { GrLogin } from "react-icons/gr";

export const SignInButton = ({
  formSlot: SignInForm,
}: {
  formSlot: React.FC;
}) => {
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
          <div className="px-4 pb-4 bg-bg-main">
            <SignInForm />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
