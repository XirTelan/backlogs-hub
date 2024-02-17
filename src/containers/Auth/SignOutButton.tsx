"use client";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={async () => {
          await fetch("/api/auth/signOut", {
            method: "POST",
          });

          mutate("/api/auth/session");
          router.refresh();
        }}
      >
        SignOut
      </button>
    </div>
  );
};

export default SignOutButton;
