import { useParams } from "next/navigation";
import React from "react";
import { backlogs } from "../../../mock/data";
import NavItem from "@/components/NavItem";

// export const metadata: Metadata = {
//   title: "BacklogsHub",
//   description: "All backlogs in one place",
// };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  return (
    <>
      <main className="flex w-full  flex-col items-center">
        {JSON.stringify(params)}
        <div className="flex w-full max-w-5xl flex-col p-4">
          <div className=" flex w-full justify-between">
            <div className="flex">
              {backlogs.map((backlog) => (
                <NavItem
                  key={backlog.title}
                  href={`/user/${params.userName}/backlogs/${backlog.title}`}
                  label={backlog.title}
                />
              ))}
            </div>
            <button>Create Backlog</button>
          </div>
          {children};
        </div>
      </main>
    </>
  );
}
