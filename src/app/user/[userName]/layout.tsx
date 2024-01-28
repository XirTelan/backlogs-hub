import UserBacklogs from "@/containers/UserBacklogs";
import React from "react";

// export const metadata: Metadata = {
//   title: "BacklogsHub",
//   description: "All backlogs in one place",
// };

export default function Layout({
  params: { userName, children },
}: {
  params: {
    userName: string;
    children: React.ReactNode;
  };
}) {
  return (
    <>
      <section className="flex w-full  flex-col items-center">
        <div className="flex w-full max-w-5xl flex-col p-4">
          <div className=" flex w-full justify-between">
            {userName}
            <UserBacklogs userName={userName} />
          </div>
          {children}
        </div>
      </section>
    </>
  );
}
