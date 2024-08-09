import TopTitle from "@/components/Common/UI/TopTitle";
import ItemsFormTypeWrapper from "@/containers/Items/ItemsFormTypeWrapper";
import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { BacklogItemCreationDTO } from "@/zodTypes";
import { redirect } from "next/navigation";

const CreateItem = async ({
  searchParams: { backlog },
}: {
  searchParams: { backlog: string };
}) => {
  const { success, data: backlogInfo } = await isAuthorizedBacklogOwner(
    backlog,
    "edit",
  );
  if (!success) redirect("/");

  const defaultValues: BacklogItemCreationDTO = {
    backlogId: backlogInfo._id,
    title: "",
    category: backlogInfo.categories[0].name || "",
    userFields: !backlogInfo.fields
      ? []
      : backlogInfo.fields.map((field) => ({
          backlogFieldId: field._id || "",
          value: field.type === "select" ? field.data[0] : "",
        })),
    modifiersFields: {},
  };
  return (
    <>
      <TopTitle title={`Add new item to "${backlogInfo.backlogTitle}"`} />
      <main className="container self-center px-4">
        <ItemsFormTypeWrapper
          backlog={{
            backlogFields: backlogInfo.fields || [],
            categories: backlogInfo.categories,
            modifiers: backlogInfo.modifiers,
          }}
          defaultValues={defaultValues}
          type="create"
        />
      </main>
    </>
  );
};

export default CreateItem;
