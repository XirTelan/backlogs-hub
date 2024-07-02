import { getCurrentUserInfo } from "@/auth/utils";
import UserProfile from "@/containers/User/UserProfile";
import { getUserData } from "@/services/user";
import React from "react";

const Page = async ({
  params: { userName },
}: {
  params: { userName: string; backlog: string };
}) => {
  const [curerntUser, user] = await Promise.all([
    getCurrentUserInfo(),
    getUserData(userName, "all"),
  ]);
  if (!user.isSuccess) return <div>Error</div>;
  if (
    curerntUser?.username !== userName &&
    user.data.config?.profileVisibility === "private"
  )
    return <div>Error</div>;

  return (
    <>
      <main className="container ">
        <UserProfile data={user.data} />
      </main>
    </>
  );
};

export default Page;
