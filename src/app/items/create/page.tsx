import TopTitle from "@/components/Common/UI/TopTitle";
import { CreateItemForm } from "@/containers/Items/CreateItemForm";
import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { redirect } from "next/navigation";

const CreateItem = async ({
  searchParams: { backlog },
}: {
  searchParams: { backlog: string };
}) => {
  const { success, data: backlogInfo } = await isAuthorizedBacklogOwner(
    backlog,
    "edit",
  );
  if (!success) redirect("/");

  return (
    <>
      <TopTitle title={`Add new item to "${backlogInfo.backlogTitle}"`} />
      <main className="container self-center px-4">
        <CreateItemForm backlogInfo={backlogInfo} options={{ view: "page" }} />
      </main>
    </>
  );
};

export default CreateItem;
