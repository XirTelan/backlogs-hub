import BacklogEditForm from "@/features/backlog/editBacklog/ui/BacklogEditForm";
export const dynamic = "force-dynamic";

const EditBacklog = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const { id } = params;

  return <BacklogEditForm id={id} />;
};

export default EditBacklog;
