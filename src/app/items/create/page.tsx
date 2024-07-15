import { getCurrentUserInfo } from "@/auth/utils";
import TopTitle from "@/components/Common/UI/TopTitle";
import ItemsCreateForm from "@/containers/Items/ItemsCreateForm";
import { getUserBacklogBySlug } from "@/services/backlogs";
import { BacklogItemCreationDTO } from "@/zodTypes";
import { redirect } from "next/navigation";

const CreateItem = async ({
  searchParams: { backlog },
}: {
  searchParams: { backlog: string };
}) => {
  const user = await getCurrentUserInfo();
  if (!user || !backlog) redirect("/");

  const backlogInfo = await getUserBacklogBySlug(user.username, backlog, true);
  if (!backlogInfo) redirect("/");

  const defaultValues: BacklogItemCreationDTO = {
    backlogId: backlogInfo._id,
    title: "",
    category: backlogInfo.categories[0].name || "",
    userFields: !backlogInfo.fields
      ? []
      : backlogInfo.fields.map((field) => ({
          name: field.name,
          value: field.type === "select" ? field.data[0] : "",
        })),
  };

  return (
    <>
      <TopTitle title={`Add new item to "${backlogInfo.backlogTitle}"`} />
      <main className="container self-center px-4">
        <ItemsCreateForm
          backlog={{
            fields: backlogInfo.fields || [],
            categories: backlogInfo.categories,
          }}
          defaultValues={defaultValues}
        />
      </main>
    </>
  );
};

export default CreateItem;
