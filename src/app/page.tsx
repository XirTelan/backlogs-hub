import LogSignIn from "@/containers/LogSignIn";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen  w-full flex-col items-center justify-center">
      <div className="w-full">
        <SignInButton />
      </div>
      <Link href={"/user/test/"}>My Profile</Link>
    </main>
  );
}
