import { getCurrentUserInfo } from "@/auth/utils";
import ManageWrapper from "@/containers/DragAndDrop/ManageWrapper";
import { getBacklogsByFolder } from "@/services/backlogs";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async () => {
  const user = await getCurrentUserInfo();
  if (!user) return redirect("/");

  const items = await getBacklogsByFolder(user.username);
  return (
    <>
      <main className="container flex w-full flex-col ">
        <ManageWrapper items={items} />
      </main>
    </>
  );
};

export default Page;
