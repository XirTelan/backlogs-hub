import ItemsEditForm from "@/containers/Items/ItemsEditForm";
import { getBacklogItemById } from "@/services/backlogItem";
import { PageDefaultProps } from "@/types";
import { cleanParamString } from "@/utils";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const EditItem = async ({ params: { itemId } }: PageDefaultProps) => {
  const user = await currentUser();
  if (!user || !user.username || !itemId) redirect("/");

  const itemData = await getBacklogItemById({
    itemId,
  });
  const backlogId = cleanParamString(itemData.backlogId);
  const defaultValues = JSON.stringify(itemData);
  if (!itemId) redirect("/");

  return (
    <div>
      <ItemsEditForm
        backlogId={backlogId}
        defaultValues={JSON.parse(defaultValues)}
      />
    </div>
  );
};

export default EditItem;
