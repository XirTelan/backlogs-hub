import { getCurrentUserInfo } from "@/auth/utils";
import UserNav from "@/containers/User/UserNav";
import { getUserVisibility } from "@/services/user";
import { PageDefaultProps } from "@/types";
import React from "react";

// export const metadata: Metadata = {
//   title: "BacklogsHub",
//   description: "All backlogs in one place",
// };

export default async function Layout({ children, params }: PageDefaultProps) {
  const user = await getCurrentUserInfo();
  const profileVisibility = await getUserVisibility(params.userName);
  if (
    (!user || user.username !== params.userName) &&
    profileVisibility === "private"
  ) {
    return <div>Access denied</div>;
  }

  return (
    <>
      <div className="container w-full">
        <div>
          UserProfile: {profileVisibility.profileVisibility}/
          {JSON.stringify(profileVisibility)}
        </div>
        <UserNav userName={params.userName} />
      </div>
      <>{children}</>
    </>
  );
}
