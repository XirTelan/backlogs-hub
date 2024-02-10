import UserNav from "@/containers/User/UserNav";
import { PageDefaultProps } from "@/types";
import React from "react";

// export const metadata: Metadata = {
//   title: "BacklogsHub",
//   description: "All backlogs in one place",
// };

export default function Layout({ children, params }: PageDefaultProps) {
  return (
    <>
      <div className="container my-4 flex w-full flex-col items-center rounded border border-neutral-800  bg-neutral-900 px-2 pb-2">
        <div>UserProfile</div>
        <UserNav userName={params.userName} />
      </div>
      <>{children}</>
    </>
  );
}
