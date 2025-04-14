"use client";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { GrLogout } from "react-icons/gr";

export const SignOutButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex h-8 w-full items-center justify-between hover:bg-layer-1-hover hover:not-[:disabled]:cursor-pointer "
      onClick={async () => {
        await fetch("/api/auth/signOut", {
          method: "POST",
        });

        mutate("/api/auth/session");
        router.refresh();
      }}
    >
      <div className="mx-4 text-text-secondary">Sign Out</div>
      <GrLogout size={18} className="me-3" />
    </button>
  );
};
