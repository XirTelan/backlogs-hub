import UserBacklogs from "@/containers/UserBacklogs";
import React from "react";

// export const metadata: Metadata = {
//   title: "BacklogsHub",
//   description: "All backlogs in one place",
// };

export default function Layout({ children, params }) {
  return (
    <>
      <section className="flex w-full  flex-col items-center">
        <div className="flex w-full max-w-5xl flex-col p-4">
          <UserBacklogs userName={params.userName} />
          <div>
            <p>So...{JSON.stringify(params)}</p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
