import Title from "@/components/Common/Title";
import ItemsEditForm from "@/containers/Items/ItemsEditForm";
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
  if (res.status === "error") redirect("/");

  const { status: isAuthorize, backlog } = await isAuthorizedBacklogOwner(
    res.data.backlogId,
    "edit",
  );
  if (!isAuthorize) redirect("/");
  return (
    <main className=" container px-4">
      <Title title="Edit" />
      <ItemsEditForm
        backlog={{
          fields: backlog.fields || [],
          categories: backlog.categories,
        }}
        defaultValues={res.data}
      />
    </main>
  );
};

export default EditItem;
