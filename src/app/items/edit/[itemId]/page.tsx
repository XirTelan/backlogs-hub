import { getCurrentUserInfo } from "@/auth/utils";
import ItemsEditForm from "@/containers/Items/ItemsEditForm";
import { getBacklogItemById } from "@/services/backlogItem";
import { cleanParamString } from "@/utils";
import { redirect } from "next/navigation";

const EditItem = async ({
  params: { itemId },
}: {
  params: { itemId: string };
}) => {
  const user = await getCurrentUserInfo();
  if (!user || !user.username || !itemId) redirect("/");

  const itemData = await getBacklogItemById(itemId);
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
