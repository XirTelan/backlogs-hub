import { getCurrentUserInfo } from "@/auth/utils";
import { getUserVisibility } from "@/services/user";
import React from "react";

// export const metadata: Metadata = {
//   title: "BacklogsHub",
//   description: "All backlogs in one place",
// };

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { userName: string };
}) {
  const user = await getCurrentUserInfo();
  const profileVisibility = await getUserVisibility(params.userName);
  if (
    (!user || user.username !== params.userName) &&
    profileVisibility === "private"
  ) {
    return <div>Access denied</div>;
  }

  return (
    <div className="flex w-full grow">
      <aside className=" hidden h-full w-80 self-start px-4 pt-4 lg:block ">
        <nav></nav>
      </aside>
      <>{children}</>
    </div>
  );
}
