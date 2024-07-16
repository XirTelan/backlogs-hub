"use client";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { GrLogout } from "react-icons/gr";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex h-12 w-full items-center justify-between hover:bg-subtle-3/15 "
      onClick={async () => {
        await fetch("/api/auth/signOut", {
          method: "POST",
        });

        mutate("/api/auth/session");
        router.refresh();
      }}
    >
      <div className="mx-4 text-secondary-text">Sign Out</div>
      <GrLogout size={18} className="me-3" />
    </button>
  );
};

export default SignOutButton;
