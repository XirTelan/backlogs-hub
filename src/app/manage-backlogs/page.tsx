import { getCurrentUserInfo } from "@/auth/utils";
import TopTitle from "@/components/Common/UI/TopTitle";
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
      <TopTitle title="Manage" />
      <main className="container flex w-full flex-col self-center ">
        <ManageWrapper items={items} />
      </main>
    </>
  );
};

export default Page;
