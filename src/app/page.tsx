import { redirect } from "next/navigation";

import {  currentUser } from "@clerk/nextjs";

export default async function Home() {
  
  const user = await currentUser();
  if (user) {
    redirect(`/user/${user.username}`);
  }

  return (
    <section className="flex min-h-screen  w-full flex-col items-center justify-center"></section>
  );
}
