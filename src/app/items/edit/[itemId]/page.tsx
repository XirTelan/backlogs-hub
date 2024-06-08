import ItemsEditForm from "@/containers/Items/ItemsEditForm";
import { getBacklogItemById } from "@/services/backlogItem";
import { cleanParamString } from "@/utils";
import { redirect } from "next/navigation";

const EditItem = async ({
  params: { itemId },
}: {
  params: { itemId: string };
}) => {
  if (!itemId) redirect("/");

  const res = await getBacklogItemById(itemId);
  if (res.status === "error") redirect("/");
  const backlogId = cleanParamString(res.data.backlogId);

  return (
    <div>
      <ItemsEditForm backlogId={backlogId} defaultValues={res.data} />
    </div>
  );
};

export default EditItem;
