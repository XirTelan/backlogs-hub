import LogSignIn from "@/containers/LogSignIn";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen  w-full flex-col items-center justify-center">
      <div className="w-full">
        <LogSignIn />
      </div>
      <Link href={"/user/test/"}>My Profile</Link>
      <div></div>
    </main>
  );
}
