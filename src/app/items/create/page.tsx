import { getCurrentUserInfo } from "@/auth/utils";
import ItemsCreateForm from "@/containers/Items/ItemsCreateForm";
import { getUserBacklogBySlug } from "@/services/backlogs";
import { BacklogItemCreationDTO } from "@/types";
import { cleanParamString } from "@/utils";
import { redirect } from "next/navigation";

const CreateItem = async ({
  searchParams: { backlog },
}: {
  searchParams: { backlog: string };
}) => {
  const user = await getCurrentUserInfo();
  if (!user || !user.username || !backlog) redirect("/");

  const backlogInfo = await getUserBacklogBySlug(user.username, backlog, true);
  if (!backlogInfo) redirect("/");

  const defaultValues: BacklogItemCreationDTO = {
    title: "",
    category: backlogInfo.categories[0].name.toLowerCase() || "",
    userFields: backlogInfo.fields.map((field) => ({
      name: field.name,
      value: "",
    })),
  };
  const id = cleanParamString(JSON.stringify(backlogInfo._id));
  return (
    <main className="container">
      <ItemsCreateForm backlogId={id} defaultValues={defaultValues} />
    </main>
  );
};

export default CreateItem;
