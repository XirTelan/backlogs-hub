import { getCurrentUserInfo } from "@/auth/utils";
import Title from "@/components/Common/Title";
import ItemsCreateForm from "@/containers/Items/ItemsCreateForm";
import { getUserBacklogBySlug } from "@/services/backlogs";
import { BacklogItemCreationDTO } from "@/types";
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
    category: backlogInfo.categories[0].name.toLowerCase() || "",
    userFields: backlogInfo.fields.map((field) => ({
      name: field.name,
      value: "",
    })),
  };

  return (
    <main className="container px-4">
      <Title title={`Add new item`} />
      <ItemsCreateForm
        backlog={{
          fields: backlogInfo.fields,
          categories: backlogInfo.categories,
        }}
        defaultValues={defaultValues}
      />
    </main>
  );
};

export default CreateItem;
