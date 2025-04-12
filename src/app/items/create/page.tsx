import TopTitle from "@/shared/ui/TopTitle";
import { CreateItemForm } from "@/features/backlogItem/createBacklogItem/ui/CreateItemForm";
import { isAuthorizedBacklogOwner } from "@/shared/api/backlogs";
import { redirect } from "next/navigation";

const CreateItem = async (props: {
  searchParams: Promise<{ backlog: string }>;
}) => {
  const searchParams = await props.searchParams;

  const { backlog } = searchParams;

  const { success, data: backlogInfo } = await isAuthorizedBacklogOwner(
    backlog,
    "edit"
  );
  if (!success) redirect("/");

  return (
    <>
      <TopTitle title={`Add new item to "${backlogInfo.backlogTitle}"`} />
      <main id="maincontent" className="container self-center px-4">
        <CreateItemForm backlogInfo={backlogInfo} options={{ view: "page" }} />
      </main>
    </>
  );
};

export default CreateItem;
