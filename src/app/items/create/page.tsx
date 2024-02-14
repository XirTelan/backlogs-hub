import ItemsCreateForm from "@/containers/Items/ItemsCreateForm";
import { getUserBacklogBySlug } from "@/services/backlogs";
import { BacklogItemCreationDTO, PageDefaultProps } from "@/types";
import { cleanParamString } from "@/utils";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CreateItem = async ({ searchParams: { backlog } }: PageDefaultProps) => {
  const user = await currentUser();
  if (!user || !user.username || !backlog) redirect("/");

  const backlogInfo = await getUserBacklogBySlug({
    userName: user.username,
    backlogSlug: backlog as string,
  });
  if (!backlog) redirect("/");

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
