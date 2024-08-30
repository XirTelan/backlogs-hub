import NotFound from "@/components/Common/NotFound";
import TopTitle from "@/components/Common/UI/TopTitle";
import ItemsForm from "@/containers/Items/ItemsForm";
import { getBacklogItemById } from "@/services/backlogItem";
import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { redirect } from "next/navigation";

const EditItem = async ({
  params: { itemId },
}: {
  params: { itemId: string };
}) => {
  if (!itemId) redirect("/");

  const res = await getBacklogItemById(itemId);
  if (!res.success) redirect("/");

  const { success, data: backlog } = await isAuthorizedBacklogOwner(
    res.data.backlogId,
    "edit",
  );
  if (!success) return <NotFound />;

  return (
    <>
      <TopTitle title="Edit" />
      <main className=" container self-center px-4">
        <ItemsForm
          backlog={{
            backlogFields: backlog.fields || [],
            categories: backlog.categories,
            modifiers: backlog.modifiers,
            tags: backlog.tags,
          }}
          defaultValues={res.data}
          type="edit"
        />
      </main>
    </>
  );
};

export default EditItem;
