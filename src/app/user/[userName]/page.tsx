import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import { UserProfile } from "@/entities/user";
import NotAvailable from "@/pages_fsd/notAvailable/NotAvailable";
import NotFound from "@/pages_fsd/notFound/NotFound";
import { getUserData } from "@/shared/api/user";
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
        <UserProfile data={user.data} />
      </main>
    </>
  );
};

export default Page;
