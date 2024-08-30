import BacklogEditForm from "@/containers/Backlogs/BacklogEditForm";
export const dynamic = "force-dynamic";

const EditBacklog = ({ params: { id } }: { params: { id: string } }) => {
  return <BacklogEditForm id={id} />;
};

export default EditBacklog;
