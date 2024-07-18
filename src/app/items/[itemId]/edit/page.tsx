import TopTitle from "@/components/Common/UI/TopTitle";
import ItemsFormTypeWrapper from "@/containers/Items/ItemsFormTypeWrapper";
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
  if (!res.isSuccess) redirect("/");

  const { isSuccess, data: backlog } = await isAuthorizedBacklogOwner(
    res.data.backlogId,
    "edit",
  );
  if (!isSuccess) redirect("/");
  return (
    <>
      <TopTitle title="Edit" />
      <main className=" container self-center px-4">
        <ItemsFormTypeWrapper
          backlog={{
            fields: backlog.fields || [],
            categories: backlog.categories,
          }}
          defaultValues={res.data}
          type="edit"
        />
      </main>
    </>
  );
};

export default EditItem;
