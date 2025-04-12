import NotFound from "@/pages_fsd/notFound/NotFound";
import TopTitle from "@/shared/ui/TopTitle";
import ItemsForm from "@/entities/backlogItem/ui/ItemsForm";
import { getBacklogItemById } from "@/shared/api/backlogItem";
import { isAuthorizedBacklogOwner } from "@/shared/api/backlogs";
import { redirect } from "next/navigation";

const EditItem = async (props: { params: Promise<{ itemId: string }> }) => {
  const params = await props.params;

  const { itemId } = params;

  if (!itemId) redirect("/");

  const res = await getBacklogItemById(itemId);
  if (!res.success) redirect("/");

  const { success, data: backlog } = await isAuthorizedBacklogOwner(
    res.data.backlogId,
    "edit"
  );
  if (!success) return <NotFound />;

  return (
    <>
      <TopTitle title="Edit" />
      <main id="maincontent" className=" container self-center px-4">
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
