import UserBacklogs from "@/containers/User/UserBacklogs";
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
      <section className=" container my-4 flex  w-full flex-col items-center">
        <div>UserProfile</div>
        <UserNav userName={params.userName} />
      </section>
      <section>{children}</section>
    </>
  );
}
