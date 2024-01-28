import LogSignIn from "@/containers/LogSignIn";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignInButton, auth, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  console.log("user", user);
  if (user) {
    redirect(`/user/${user.username}`);
  }

  return (
    <section className="flex min-h-screen  w-full flex-col items-center justify-center"></section>
  );
}
