import BacklogEditForm from "@/containers/Backlogs/BacklogEditForm";

const EditBacklog = ({ params: { id } }: { params: { id: string } }) => {
  return (

      <BacklogEditForm id={id} />
  );
};

export default EditBacklog;
