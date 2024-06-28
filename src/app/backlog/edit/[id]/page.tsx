import BacklogEditForm from "@/containers/Backlogs/BacklogEditForm";

const EditBacklog = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <main className="container px-4">
      <BacklogEditForm id={id} />
    </main>
  );
};

export default EditBacklog;
