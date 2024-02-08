import ItemsCreateForm from "@/containers/Items/ItemsCreateForm";
import { getUserBacklogByTitle } from "@/services/backlogs";
import { BacklogItemCreationDTO, PageDefaultProps } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CreateItem = async ({
  searchParams: { backlogTitle },
}: PageDefaultProps) => {
  const user = await currentUser();
  if (!user || !user.username || !backlogTitle) redirect("/");

  const backlog = await getUserBacklogByTitle({
    userName: user.username,
    backlogTitle: backlogTitle as string,
  });

  const defaultValues: BacklogItemCreationDTO = {
    title: "",
    category: backlog.categories[0].name || "",
    userFields: backlog.fields.map((field) => ({
      name: field.name,
      value: "",
    })),
  };

  return (
    <div>
      <ItemsCreateForm
        backlogId={JSON.stringify(backlog._id)}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default CreateItem;
