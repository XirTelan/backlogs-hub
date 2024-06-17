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
  const isAuthorize = await isAuthorizedBacklogOwner(
    res.data.backlogId,
    "edit",
  );
  if (!isAuthorize) redirect("/");
  return (
    <main className=" container">
      <ItemsEditForm defaultValues={res.data} />
    </main>
  );
};

export default EditItem;
