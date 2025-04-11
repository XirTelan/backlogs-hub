import { getCurrentUserInfo } from "@/features/auth/utils/utils";
import NotAvailable from "@/components/Common/NotAvailable";
import NotFound from "@/components/Common/NotFound";
import UserProfile from "@/containers/User/UserProfile";
import { getUserData } from "@/shared/api/user";
import { UserDB } from "@/zodTypes";
import React from "react";

type Params = Promise<{ userName: string; backlog: string }>;
const Page = async ({ params }: { params: Params }) => {
  const { userName } = await params;

  const [curerntUser, user] = await Promise.all([
    getCurrentUserInfo(),
    getUserData(userName, "all"),
  ]);
  if (!user.success) return <NotFound />;
  if (
    curerntUser?.username !== userName &&
    user.data.config?.profileVisibility === "private"
  )
    return <NotAvailable />;

  return (
    <>
      <main id="maincontent" className="container ">
        <UserProfile data={user.data as UserDB} />
      </main>
    </>
  );
};

export default Page;
